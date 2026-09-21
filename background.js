// The Babylon Portfolio – background service worker.
// All game routes are verified against the Capital Rift client API directory
// (2026-09-17 snapshot). The playerId is resolved at runtime from GET /api/me —
// game API access is scoped to the signed-in account, so a hardcoded id would
// 401/403 for anyone else.
const ORIGIN = 'https://play.capitalrift.com/api';
const PID_KEY = 'babylon_player_id';
const JSON_HEADERS = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

let PLAYER_ID = null;
async function ensurePlayerId() {
  if (PLAYER_ID) return PLAYER_ID;
  try {
    const cached = await chrome.storage.local.get(PID_KEY);
    if (cached && cached[PID_KEY]) { PLAYER_ID = cached[PID_KEY]; return PLAYER_ID; }
  } catch (e) { /* fall through to network resolve */ }
  const res = await fetch(`${ORIGIN}/me`, { method: 'GET', credentials: 'include', headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Cannot resolve player id (HTTP ${res.status}). Sign in at play.capitalrift.com first.`);
  const me = await res.json();
  const pid = me?.playerId || me?.player?.id || me?.id || me?.uuid || null;
  if (!pid) throw new Error('Player id missing from /api/me response');
  PLAYER_ID = pid;
  try { await chrome.storage.local.set({ [PID_KEY]: pid }); } catch (e) {}
  return PLAYER_ID;
}
// Absolute URL for a per-player game route, e.g. await gameUrl('/shares/listings')
async function gameUrl(suffix = '') { return `${ORIGIN}/game/${await ensurePlayerId()}${suffix}`; }

// Absolute (non player-scoped) read endpoints.
const MARKET_PUBLIC_API = `${ORIGIN}/market`;   // GET /api/market/{book,history,ticker}
const ACCESS_API = `${ORIGIN}/access`;          // /api/access/*
const STORE_PUBLIC_API = `${ORIGIN}/store`;     // GET /api/store?ref=&chunk=

const STORAGE_KEYS = {
  PORTFOLIO: 'babylon_portfolio',
  DIVIDENDS: 'babylon_dividends',
  TRANSACTIONS: 'babylon_transactions',
  SETTINGS: 'babylon_settings',
  LAST_API: 'babylon_last_api',
  IPO_OFFERINGS: 'babylon_ipo_offerings',
  BANK_TRANSACTIONS: 'babylon_bank_transactions',
  PREVIOUS_HOLDINGS: 'babylon_previous_holdings',
  PREVIOUS_ORDERS: 'babylon_previous_orders',
  PREVIOUS_IPO_BIDS: 'babylon_previous_ipo_bids',
  BUILD: 'babylon_build',
  DIAG: 'babylon_diag'
};

// Bump on every detection change. Written to storage at worker start so the
// popup can show which build is actually live (a stale unpacked extension is
// otherwise indistinguishable from a broken one).
const DETECTION_BUILD = 'v2 · 2026-09-20';
let portfolioCache = null, dividendsCache = null, transactionsCache = null, settingsCache = null, lastApiCache = null, ipoCache = null, bankTransactionsCache = null;
let previousHoldingsMap = null;
let previousOrders = null;
let previousIpoBids = null;        // listingId -> {qty, price, name}
let diagState = null;              // last detection run summary, persisted for the popup
let lastDiagWrite = 0;
const DIAG_INTERVAL = 60000;       // throttle routine diag writes; baseline/error/change always write
let storageReady = false;

// Record what the detection engine just saw. Throttled so the 30s poll does not
// hammer storage, forced on any event a human would want to see immediately.
async function writeDiag(patch, force){
  const now = Date.now();
  if (!force && now - lastDiagWrite < DIAG_INTERVAL) return;
  lastDiagWrite = now;
  diagState = {...(diagState || {}), ...patch, build: DETECTION_BUILD, updatedAt: now};
  try { await chrome.storage.local.set({[STORAGE_KEYS.DIAG]: diagState}); } catch(e) {}
}
async function initStorage(){
  const result = await chrome.storage.local.get(Object.values(STORAGE_KEYS));
  portfolioCache = result[STORAGE_KEYS.PORTFOLIO] || {};
  dividendsCache = result[STORAGE_KEYS.DIVIDENDS] || {};
  transactionsCache = result[STORAGE_KEYS.TRANSACTIONS] || [];
  lastApiCache = result[STORAGE_KEYS.LAST_API] || null;
  ipoCache = result[STORAGE_KEYS.IPO_OFFERINGS] || [];
  bankTransactionsCache = result[STORAGE_KEYS.BANK_TRANSACTIONS] || [];
  previousHoldingsMap = result[STORAGE_KEYS.PREVIOUS_HOLDINGS] || null;
  previousOrders = result[STORAGE_KEYS.PREVIOUS_ORDERS] || null;
  previousIpoBids = result[STORAGE_KEYS.PREVIOUS_IPO_BIDS] || null;
  diagState = result[STORAGE_KEYS.DIAG] || null;
  const liveBuild = result[STORAGE_KEYS.BUILD];
  if (!liveBuild || liveBuild.version !== DETECTION_BUILD) {
    await chrome.storage.local.set({[STORAGE_KEYS.BUILD]: {version: DETECTION_BUILD, startedAt: Date.now()}});
  }
  // Pre-alarm baselines have no orders snapshot; re-baseline instead of risking
  // a flood of false "shares bought" alerts against an empty/partial map.
  if (previousOrders === null) { previousHoldingsMap = null; previousIpoBids = null; }
  if(!result[STORAGE_KEYS.SETTINGS]){
    settingsCache = {autoRefresh:true, refreshInterval:30000, showUsd:true, showPercentage:true};
    await chrome.storage.local.set({[STORAGE_KEYS.SETTINGS]: settingsCache});
  } else {
    settingsCache = result[STORAGE_KEYS.SETTINGS];
  }
}
async function ensureStorageReady(){
  if (storageReady) return;
  await initStorage();
  storageReady = true;
}
async function fetchApi(){
  const res = await fetch(await gameUrl('/shares/listings'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  lastApiCache = data;
  await chrome.storage.local.set({[STORAGE_KEYS.LAST_API]: data});
  return data;
}
async function fetchIpo(){
  const res = await fetch(await gameUrl('/ipo/offerings'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`IPO HTTP ${res.status}`);
  const data = await res.json();
  ipoCache = data;
  await chrome.storage.local.set({[STORAGE_KEYS.IPO_OFFERINGS]: data});
  return data;
}

// Bank/dividend transactions are part of the player's game state. There is no
// dedicated bank-read endpoint; POST /bank/transfer is a money MUTATION and must
// never be used to read, so this GETs /api/game/{id} and extracts bank accounts.
async function fetchBankTransactions(){
  try {
    const res = await fetch(await gameUrl(''), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
    if(!res.ok) throw new Error(`Bank HTTP ${res.status}`);
    const data = await res.json();
    const bank = data?.bank ?? data?.state?.bank ?? data?.company?.bank ?? null;
    // Extract transactions from all accounts
    let allTransactions = [];
    if(bank?.accounts){
      for(const acc of bank.accounts){
        if(acc.transactions){
          allTransactions = allTransactions.concat(acc.transactions.map(t => ({...t, accountId: acc.id, accountKind: acc.kind})));
        }
      }
    }
    // Filter for dividend-related transactions: royalty, and positive transfers that could be dividends
    const dividendKinds = ['royalty'];
    const dividendTransactions = allTransactions.filter(t =>
      dividendKinds.includes(t.kind) ||
      (t.kind === 'transfer' && t.amount > 0 && t.desc && !t.desc.toLowerCase().includes('savings') && !t.desc.toLowerCase().includes('checking'))
    );
    bankTransactionsCache = allTransactions;
    await chrome.storage.local.set({[STORAGE_KEYS.BANK_TRANSACTIONS]: allTransactions});
    return {all: allTransactions, dividends: dividendTransactions};
  } catch(e) {
    console.error('Bank fetch error:', e);
    return {all: bankTransactionsCache || [], dividends: []};
  }
}

// Shares API
async function fetchSharesBook(companyId) {
  const res = await fetch(await gameUrl(`/shares/book/${encodeURIComponent(companyId)}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Shares book HTTP ${res.status}`);
  return res.json();
}
async function fetchSharesHistory(companyId, window = '24h') {
  const res = await fetch(await gameUrl(`/shares/history/${encodeURIComponent(companyId)}?window=${encodeURIComponent(window)}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Shares history HTTP ${res.status}`);
  return res.json();
}
async function fetchSharesListings() {
  const res = await fetch(await gameUrl('/shares/listings'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Shares listings HTTP ${res.status}`);
  return res.json();
}
async function tradeShares(companyId, side, price, qty) {
  const res = await fetch(await gameUrl('/shares/trade'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({companyId, side, price, qty})
  });
  if(!res.ok) throw new Error(`Trade HTTP ${res.status}`);
  const result = await res.json();
  return result;
}
async function cancelShareOrder(orderId) {
  const res = await fetch(await gameUrl('/shares/cancel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({orderId})
  });
  if(!res.ok) throw new Error(`Cancel HTTP ${res.status}`);
  const result = await res.json();
  return result;
}

// IPO API
async function buyIpo(listingId, price, qty) {
  const payload = {listingId, price, qty};
  const res = await fetch(await gameUrl('/ipo/bid'), {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`IPO buy HTTP ${res.status}`);
  const result = await res.json();
  transactionsCache.push({type: 'IPO_BUY', listingId, price, qty, timestamp: Date.now(), result});
  await persistAll();
  return result;
}
async function cancelIpoBid(listingId) {
  const res = await fetch(await gameUrl('/ipo/cancel-bid'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({listingId})
  });
  if(!res.ok) throw new Error(`IPO cancel HTTP ${res.status}`);
  const result = await res.json();
  return result;
}

// Auction API
async function createAuction(ref, chunkId, minBid, increment, hours) {
  const res = await fetch(await gameUrl('/auction/create'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId, minBid, increment, hours})
  });
  if(!res.ok) throw new Error(`Auction create HTTP ${res.status}`);
  return res.json();
}
async function bidAuction(auctionId, amount) {
  const res = await fetch(await gameUrl('/auction/bid'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({auctionId, amount})
  });
  if(!res.ok) throw new Error(`Auction bid HTTP ${res.status}`);
  return res.json();
}
async function cancelAuction(auctionId) {
  const res = await fetch(await gameUrl('/auction/cancel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({auctionId})
  });
  if(!res.ok) throw new Error(`Auction cancel HTTP ${res.status}`);
  return res.json();
}
async function fetchAuctions() {
  const res = await fetch(await gameUrl('/auctions'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Auctions HTTP ${res.status}`);
  return res.json();
}

// Market API
async function fetchMarketBook(commodity, realm) {
  const url = realm ? `${MARKET_PUBLIC_API}/book?commodity=${encodeURIComponent(commodity)}&realm=${encodeURIComponent(realm)}` : `${MARKET_PUBLIC_API}/book?commodity=${encodeURIComponent(commodity)}`;
  const res = await fetch(url, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Market book HTTP ${res.status}`);
  return res.json();
}
async function fetchMarketHistory(commodity, window) {
  const res = await fetch(`${MARKET_PUBLIC_API}/history?commodity=${encodeURIComponent(commodity)}&window=${encodeURIComponent(window)}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Market history HTTP ${res.status}`);
  return res.json();
}
async function fetchMarketTicker() {
  const res = await fetch(`${MARKET_PUBLIC_API}/ticker`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Market ticker HTTP ${res.status}`);
  return res.json();
}
async function placeMarketOrder(commodity, side, price, qty) {
  const res = await fetch(await gameUrl('/market/order'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({commodity, side, price, qty})
  });
  if(!res.ok) throw new Error(`Market order HTTP ${res.status}`);
  return res.json();
}
async function tradeMarket(commodity, side, qty, maxTotal) {
  const res = await fetch(await gameUrl('/market/trade'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({commodity, side, qty, maxTotal})
  });
  if(!res.ok) throw new Error(`Market trade HTTP ${res.status}`);
  return res.json();
}
async function cancelMarketOrder(orderId) {
  const res = await fetch(await gameUrl('/market/cancel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({orderId})
  });
  if(!res.ok) throw new Error(`Market cancel HTTP ${res.status}`);
  return res.json();
}
async function deliverMarket(dest) {
  const res = await fetch(await gameUrl('/market/deliver'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({dest})
  });
  if(!res.ok) throw new Error(`Market deliver HTTP ${res.status}`);
  return res.json();
}
async function fetchSellable(commodity) {
  const res = await fetch(await gameUrl(`/sellable?commodity=${encodeURIComponent(commodity)}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Sellable HTTP ${res.status}`);
  return res.json();
}

// Building API
async function buyBuilding(ref, chunkId) {
  const res = await fetch(await gameUrl('/buy-building'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId})
  });
  if(!res.ok) throw new Error(`Buy building HTTP ${res.status}`);
  return res.json();
}
async function demolishBuilding(ref, chunkId) {
  const res = await fetch(await gameUrl('/building/demolish'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId})
  });
  if(!res.ok) throw new Error(`Demolish HTTP ${res.status}`);
  return res.json();
}
async function setBuildingRoyalty(ref, chunkId, bps) {
  const res = await fetch(await gameUrl('/building/royalty'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId, bps})
  });
  if(!res.ok) throw new Error(`Royalty HTTP ${res.status}`);
  return res.json();
}
async function retireStore(ref, chunkId) {
  const res = await fetch(await gameUrl('/retire-store'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId})
  });
  if(!res.ok) throw new Error(`Retire store HTTP ${res.status}`);
  return res.json();
}
async function fetchBuildingInfo(ref, chunk) {
  const res = await fetch(`${ORIGIN}/building-info?ref=${encodeURIComponent(ref)}&chunk=${encodeURIComponent(chunk)}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Building info HTTP ${res.status}`);
  return res.json();
}

// Land API
async function fetchLand(chunk, owned = false) {
  const res = await fetch(`${ORIGIN}/land?chunk=${encodeURIComponent(chunk)}${owned ? '&owned=1' : ''}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Land HTTP ${res.status}`);
  return res.json();
}
async function buyParcel(parcelId) {
  const res = await fetch(await gameUrl('/buy-parcel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({parcelId})
  });
  if(!res.ok) throw new Error(`Buy parcel HTTP ${res.status}`);
  return res.json();
}
async function buyParcels(parcelIds) {
  const res = await fetch(await gameUrl('/buy-parcel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({parcelIds})
  });
  if(!res.ok) throw new Error(`Buy parcels HTTP ${res.status}`);
  return res.json();
}
async function mergeLand(parcelIds) {
  const res = await fetch(await gameUrl('/land/merge'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({parcelIds})
  });
  if(!res.ok) throw new Error(`Merge land HTTP ${res.status}`);
  return res.json();
}
async function renameLand(parcelId, name) {
  const res = await fetch(await gameUrl('/land/rename'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({parcelId, name})
  });
  if(!res.ok) throw new Error(`Rename land HTTP ${res.status}`);
  return res.json();
}

// Construction API
async function startConstruction(parcelId, buildingType, footprint, floors) {
  const body = {parcelId, buildingType, footprint};
  if (floors !== undefined) body.floors = floors;
  const res = await fetch(await gameUrl('/construction/start'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Construction start HTTP ${res.status}`);
  return res.json();
}
async function cancelConstruction(siteId) {
  const res = await fetch(await gameUrl('/construction/cancel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({siteId})
  });
  if(!res.ok) throw new Error(`Construction cancel HTTP ${res.status}`);
  return res.json();
}
async function forceFinishConstruction(siteId) {
  const res = await fetch(await gameUrl('/construction/force-finish'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({siteId})
  });
  if(!res.ok) throw new Error(`Force finish HTTP ${res.status}`);
  return res.json();
}

// Rental API
async function setListing(payload) {
  const res = await fetch(await gameUrl('/listing/set'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`Listing set HTTP ${res.status}`);
  return res.json();
}
async function bulkListing(payload) {
  const res = await fetch(await gameUrl('/listing/bulk'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`Bulk listing HTTP ${res.status}`);
  return res.json();
}
async function evictTenancy(tenancyId) {
  const res = await fetch(await gameUrl('/listing/evict'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({tenancyId})
  });
  if(!res.ok) throw new Error(`Evict HTTP ${res.status}`);
  return res.json();
}
async function fetchRentMarket(regions) {
  const res = await fetch(await gameUrl(`/rent-market?regions=${encodeURIComponent(regions.join(','))}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Rent market HTTP ${res.status}`);
  return res.json();
}
async function rentUnit(ref, chunkId, unitKey) {
  const res = await fetch(await gameUrl('/rent-unit'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId, unitKey})
  });
  if(!res.ok) throw new Error(`Rent unit HTTP ${res.status}`);
  return res.json();
}
async function endLease(leaseId) {
  const res = await fetch(await gameUrl('/rent/end'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({leaseId})
  });
  if(!res.ok) throw new Error(`End lease HTTP ${res.status}`);
  return res.json();
}
async function roomOffer(ref, chunkId, unitKey, price) {
  const res = await fetch(await gameUrl('/room-offer'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId, unitKey, price})
  });
  if(!res.ok) throw new Error(`Room offer HTTP ${res.status}`);
  return res.json();
}
async function answerRoomOffer(offerId, answer) {
  const res = await fetch(await gameUrl('/room-offer/answer'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({offerId, answer})
  });
  if(!res.ok) throw new Error(`Answer offer HTTP ${res.status}`);
  return res.json();
}
async function mergeUnits(ref, chunkId, unitKeyA, unitKeyB) {
  const res = await fetch(await gameUrl('/unit/merge'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({ref, chunkId, unitKeyA, unitKeyB})
  });
  if(!res.ok) throw new Error(`Merge units HTTP ${res.status}`);
  return res.json();
}

// Machine API
async function setMachineRecipe(placementId, recipe) {
  const res = await fetch(await gameUrl('/machine/recipe'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({placementId, recipe})
  });
  if(!res.ok) throw new Error(`Machine recipe HTTP ${res.status}`);
  return res.json();
}

// Mining API
async function createMiningZone(parcelId, footprint) {
  const res = await fetch(await gameUrl('/mining/zone'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({parcelId, footprint})
  });
  if(!res.ok) throw new Error(`Mining zone HTTP ${res.status}`);
  return res.json();
}
async function focusMiningZone(zoneId, focus) {
  const res = await fetch(await gameUrl('/mining/zone/focus'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({zoneId, focus})
  });
  if(!res.ok) throw new Error(`Mining focus HTTP ${res.status}`);
  return res.json();
}
async function removeMiningZone(zoneId) {
  const res = await fetch(await gameUrl('/mining/zone/remove'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({zoneId})
  });
  if(!res.ok) throw new Error(`Mining remove HTTP ${res.status}`);
  return res.json();
}
async function fetchResourceMap() {
  const res = await fetch(await gameUrl('/resource-map'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Resource map HTTP ${res.status}`);
  return res.json();
}
async function fetchSurvey() {
  const res = await fetch(await gameUrl('/survey'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Survey HTTP ${res.status}`);
  return res.json();
}

// Logistics API
async function fetchLogistics() {
  const res = await fetch(await gameUrl('/logistics'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Logistics HTTP ${res.status}`);
  return res.json();
}
async function fetchLogisticsHistory(window, items = []) {
  const params = new URLSearchParams({window});
  if (items.length > 0) params.set('items', items.join(','));
  const res = await fetch(await gameUrl(`/logistics/history?${params.toString()}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Logistics history HTTP ${res.status}`);
  return res.json();
}
async function manageLogisticsLane(payload) {
  const res = await fetch(await gameUrl('/logistics/lane'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`Logistics lane HTTP ${res.status}`);
  return res.json();
}
async function enableLogisticsLane(laneId, enabled) {
  const res = await fetch(await gameUrl('/logistics/lane/enable'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({laneId, enabled})
  });
  if(!res.ok) throw new Error(`Enable lane HTTP ${res.status}`);
  return res.json();
}
async function removeLogisticsLane(laneId) {
  const res = await fetch(await gameUrl('/logistics/lane/remove'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({laneId})
  });
  if(!res.ok) throw new Error(`Remove lane HTTP ${res.status}`);
  return res.json();
}
async function fetchLogisticsPads() {
  const res = await fetch(await gameUrl('/logistics/pads'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Logistics pads HTTP ${res.status}`);
  return res.json();
}

// Dock API
async function cancelDockBuild(buildId) {
  const res = await fetch(await gameUrl('/dock/cancel-build'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({buildId})
  });
  if(!res.ok) throw new Error(`Dock cancel HTTP ${res.status}`);
  return res.json();
}
async function layDownShip(dockId, edgeIdx, model, paint = 0) {
  const res = await fetch(await gameUrl('/dock/lay-down'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({dockId, edgeIdx, model, paint})
  });
  if(!res.ok) throw new Error(`Lay down HTTP ${res.status}`);
  return res.json();
}
async function setDockSettings(dockId, settings) {
  const res = await fetch(await gameUrl('/dock/settings'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({dockId, ...settings})
  });
  if(!res.ok) throw new Error(`Dock settings HTTP ${res.status}`);
  return res.json();
}
async function fetchBerthSize(dockId, edgeIdx) {
  const res = await fetch(await gameUrl(`/berth/${encodeURIComponent(dockId)}/${encodeURIComponent(edgeIdx)}/size`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Berth size HTTP ${res.status}`);
  return res.json();
}
async function fetchBeds() {
  const res = await fetch(await gameUrl('/beds'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Beds HTTP ${res.status}`);
  return res.json();
}
async function fastTravel(fromBedId, toBedId) {
  const res = await fetch(await gameUrl('/fast-travel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({fromBedId, toBedId})
  });
  if(!res.ok) throw new Error(`Fast travel HTTP ${res.status}`);
  return res.json();
}
async function startJourney(path, legs) {
  const res = await fetch(await gameUrl('/journey'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({path, legs})
  });
  if(!res.ok) throw new Error(`Journey HTTP ${res.status}`);
  return res.json();
}
async function planJourney(lon, lat) {
  const res = await fetch(await gameUrl(`/journey-plan?lon=${encodeURIComponent(lon)}&lat=${encodeURIComponent(lat)}`), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Journey plan HTTP ${res.status}`);
  return res.json();
}
async function movePlayer(lon, lat, spawnAvatar = false, cartId) {
  const body = {lon, lat};
  if (spawnAvatar) body.spawnAvatar = true;
  if (cartId) body.cartId = cartId;
  const res = await fetch(await gameUrl('/move'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Move HTTP ${res.status}`);
  return res.json();
}
async function lootPackage() {
  const res = await fetch(await gameUrl('/package/loot'), {method:'POST', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Package loot HTTP ${res.status}`);
  return res.json();
}
async function sendPackage(tag) {
  const res = await fetch(await gameUrl('/package/send'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({tag})
  });
  if(!res.ok) throw new Error(`Package send HTTP ${res.status}`);
  return res.json();
}
async function setParkingFee(spotId, fee) {
  const res = await fetch(await gameUrl('/parking/fee'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({spotId, fee})
  });
  if(!res.ok) throw new Error(`Parking fee HTTP ${res.status}`);
  return res.json();
}
async function setParkingFeeAll(fee) {
  const res = await fetch(await gameUrl('/parking/fee-all'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({fee})
  });
  if(!res.ok) throw new Error(`Parking fee all HTTP ${res.status}`);
  return res.json();
}

// Cart API
async function placeCart(lon, lat, fromPlacementId, cuisine) {
  const body = {lon, lat};
  if (fromPlacementId) body.fromPlacementId = fromPlacementId;
  if (cuisine) body.cuisine = cuisine;
  const res = await fetch(await gameUrl('/cart/place'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Place cart HTTP ${res.status}`);
  return res.json();
}
async function restockCart(cartId) {
  const res = await fetch(await gameUrl('/cart/restock'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({cartId})
  });
  if(!res.ok) throw new Error(`Restock HTTP ${res.status}`);
  return res.json();
}
async function withdrawCart(commodity, qty, cartId) {
  const res = await fetch(await gameUrl('/cart/withdraw'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({commodity, qty, cartId})
  });
  if(!res.ok) throw new Error(`Withdraw HTTP ${res.status}`);
  return res.json();
}
async function cleanCart(cleaned, cartId) {
  const res = await fetch(await gameUrl('/clean'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({cleaned, cartId})
  });
  if(!res.ok) throw new Error(`Clean HTTP ${res.status}`);
  return res.json();
}
async function cookCart(perfect, total, instaSold, cartId) {
  const res = await fetch(await gameUrl('/cook'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({perfect, total, instaSold, cartId})
  });
  if(!res.ok) throw new Error(`Cook HTTP ${res.status}`);
  return res.json();
}
async function setCartPrice(price, cartId) {
  const res = await fetch(await gameUrl('/price'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({price, cartId})
  });
  if(!res.ok) throw new Error(`Price HTTP ${res.status}`);
  return res.json();
}
async function renameCart(name, cartId) {
  const res = await fetch(await gameUrl('/rename'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({name, cartId})
  });
  if(!res.ok) throw new Error(`Rename HTTP ${res.status}`);
  return res.json();
}
async function upgradeCart(id, cartId) {
  const res = await fetch(await gameUrl('/upgrade'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({id, cartId})
  });
  if(!res.ok) throw new Error(`Upgrade HTTP ${res.status}`);
  return res.json();
}
async function buyCommodity(commodity, qty) {
  const res = await fetch(await gameUrl('/buy'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({commodity, qty})
  });
  if(!res.ok) throw new Error(`Buy commodity HTTP ${res.status}`);
  return res.json();
}

// Ranch API
async function createRanchPen(name, footprint, capacity, species, placementId) {
  const res = await fetch(await gameUrl('/ranch/pen'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({name, footprint, capacity, species, placementId})
  });
  if(!res.ok) throw new Error(`Ranch pen HTTP ${res.status}`);
  return res.json();
}
async function removeRanchPen(penId) {
  const res = await fetch(await gameUrl('/ranch/pen/remove'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({penId})
  });
  if(!res.ok) throw new Error(`Remove pen HTTP ${res.status}`);
  return res.json();
}
async function renameRanchPen(penId, name) {
  const res = await fetch(await gameUrl('/ranch/pen/rename'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({penId, name})
  });
  if(!res.ok) throw new Error(`Rename pen HTTP ${res.status}`);
  return res.json();
}
async function pickupRanch(penId, species, count, toPlacementId) {
  const body = {penId, species, count};
  if (toPlacementId) body.toPlacementId = toPlacementId;
  const res = await fetch(await gameUrl('/ranch/pickup'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Pickup HTTP ${res.status}`);
  return res.json();
}
async function sellRanch(penId, species, count, price) {
  const body = {penId, species, count};
  if (price !== undefined) body.price = price;
  const res = await fetch(await gameUrl('/ranch/sell'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`Sell ranch HTTP ${res.status}`);
  return res.json();
}
async function fetchRanchWorld(chunk) {
  const res = await fetch(`${ORIGIN}/ranch/world?chunk=${encodeURIComponent(chunk)}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Ranch world HTTP ${res.status}`);
  return res.json();
}

// Shop API
// The API directory has no GET shop-shelf read; the store read (GET /api/store)
// is the real inventory source, so the shelf read is served from it.
async function fetchShopShelf(placementId, chunk) {
  const res = await fetch(`${STORE_PUBLIC_API}?ref=${encodeURIComponent(placementId)}&chunk=${encodeURIComponent(chunk)}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Shop shelf HTTP ${res.status}`);
  return res.json();
}
async function updateShopShelf(placementId, settings) {
  const res = await fetch(await gameUrl('/shop/shelf'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({placementId, ...settings})
  });
  if(!res.ok) throw new Error(`Update shelf HTTP ${res.status}`);
  return res.json();
}
async function fetchStore(storeId, chunk) {
  const res = await fetch(`${STORE_PUBLIC_API}?ref=${encodeURIComponent(storeId)}&chunk=${encodeURIComponent(chunk)}`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Store HTTP ${res.status}`);
  return res.json();
}
async function checkoutStore(storeId, items) {
  const res = await fetch(await gameUrl('/store/checkout'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({storeId, items})
  });
  if(!res.ok) throw new Error(`Store checkout HTTP ${res.status}`);
  return res.json();
}

// Unique Items API
async function fetchUnique() {
  const res = await fetch(await gameUrl('/unique'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Unique HTTP ${res.status}`);
  return res.json();
}
async function fetchUniqueBoard() {
  const res = await fetch(await gameUrl('/unique/board'), {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Unique board HTTP ${res.status}`);
  return res.json();
}
async function bidUnique(listingId, amount) {
  const res = await fetch(await gameUrl('/unique/bid'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({listingId, amount})
  });
  if(!res.ok) throw new Error(`Unique bid HTTP ${res.status}`);
  return res.json();
}
async function buyUnique(listingId) {
  const res = await fetch(await gameUrl('/unique/buy'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({listingId})
  });
  if(!res.ok) throw new Error(`Unique buy HTTP ${res.status}`);
  return res.json();
}
async function cancelUnique(listingId) {
  const res = await fetch(await gameUrl('/unique/cancel'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({listingId})
  });
  if(!res.ok) throw new Error(`Unique cancel HTTP ${res.status}`);
  return res.json();
}
async function listUnique(uniqueItemId, minBid, increment, hours, buyNow) {
  const res = await fetch(await gameUrl('/unique/list'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({uniqueItemId, minBid, increment, hours, buyNow})
  });
  if(!res.ok) throw new Error(`Unique list HTTP ${res.status}`);
  return res.json();
}
async function displayUnique(pieceId, itemId) {
  const res = await fetch(await gameUrl('/unique/platform/display'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({pieceId, itemId})
  });
  if(!res.ok) throw new Error(`Unique display HTTP ${res.status}`);
  return res.json();
}
async function growUniquePlatform(pieceId) {
  const res = await fetch(await gameUrl('/unique/platform/grow'), {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({pieceId})
  });
  if(!res.ok) throw new Error(`Unique grow HTTP ${res.status}`);
  return res.json();
}

// Access API
async function fetchAccessMe() {
  const res = await fetch(`${ACCESS_API}/me`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Access me HTTP ${res.status}`);
  return res.json();
}
async function fetchAccessLoyalty() {
  const res = await fetch(`${ACCESS_API}/loyalty`, {method:'GET', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Access loyalty HTTP ${res.status}`);
  return res.json();
}
async function grantLoyalty(points) {
  const res = await fetch(`${ACCESS_API}/loyalty/grant`, {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({points})
  });
  if(!res.ok) throw new Error(`Grant loyalty HTTP ${res.status}`);
  return res.json();
}
async function updatePrefs(prefs) {
  const res = await fetch(`${ACCESS_API}/prefs`, {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify(prefs)
  });
  if(!res.ok) throw new Error(`Update prefs HTTP ${res.status}`);
  return res.json();
}
async function checkoutAccess() {
  const res = await fetch(`${ACCESS_API}/checkout`, {method:'POST', credentials:'include', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(`Checkout HTTP ${res.status}`);
  return res.json();
}
async function confirmCheckout(sessionId) {
  const res = await fetch(`${ACCESS_API}/checkout/confirm`, {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({sessionId})
  });
  if(!res.ok) throw new Error(`Confirm checkout HTTP ${res.status}`);
  return res.json();
}
async function deleteAccount() {
  const res = await fetch(`${ACCESS_API}/delete`, {
    method:'POST', credentials:'include', headers:JSON_HEADERS,
    body: JSON.stringify({confirm: 'DELETE'})
  });
  if(!res.ok) throw new Error(`Delete account HTTP ${res.status}`);
  return res.json();
}
async function exportAccount() {
  const res = await fetch(`${ACCESS_API}/export`, {method:'GET', credentials:'include'});
  if(!res.ok) throw new Error(`Export HTTP ${res.status}`);
  return res.blob();
}
// NOTE: localStorage is unavailable in an MV3 service worker; the referral code
// is read from extension storage instead.
async function recordAttribution(who) {
  let storedRef = null;
  try { const s = await chrome.storage.local.get('cr_ref'); storedRef = s?.cr_ref || null; } catch (e) {}
  if (who && storedRef) {
    const res = await fetch(`${ACCESS_API}/referral`, {
      method:'POST', credentials:'include', headers:JSON_HEADERS,
      body: JSON.stringify({code: storedRef})
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok || data.settled) { try { await chrome.storage.local.remove('cr_ref'); } catch (e) {} }
    }
  }
}

function processListings(listings) {
  return listings.map(i => ({
    id: i.companyId,
    name: i.name,
    symbol: i.name,
    currentPrice: Number(i.price),
    backing: Number(i.backing),
    changePct: Number(i.changePct),
    marketCap: Number(i.marketCap),
    sharesOutstanding: Number(i.sharesOutstanding),
    floatBps: Number(i.floatBps),
    listedAt: Number(i.listedAt),
    yieldPct: Number(i.yieldPct),
    holders: Number(i.holders),
    ipoPrice: Number(i.ipoPrice),
    spark: Array.isArray(i.spark) ? i.spark.map(Number) : [],
    youHold: Number(i.youHold||0),
    lastTradeAt: Number(i.lastTradeAt||0)
  }));
}
function buildPortfolio(companies, apiHoldings){
  const merged = {};
  for(const h of apiHoldings){ merged[h.companyId] = Number(h.qty); }
  for(const [cid, qty] of Object.entries(portfolioCache)){ merged[cid] = (merged[cid]||0) + qty; }
  const holdings = [];
  let total = 0;
  for(const c of companies){
    const owned = merged[c.id] || 0;
    if(owned > 0){
      const value = owned * c.currentPrice;
      const pct = c.sharesOutstanding > 0 ? (owned / c.sharesOutstanding) * 100 : 0;
      total += value;
      // Dividend per share = yieldPct * shareValue (currentPrice) / 100
      const dividendPerShare = c.currentPrice * c.yieldPct / 100;
      holdings.push({
        ...c,
        owned,
        value,
        percentage: pct,
        dividendIncome: owned * dividendPerShare,
        dividendPerShare
      });
    }
  }
  return {holdings, totalValue: total};
}
function calculateDividends(bankTransactions, companies){
  const divs = {};
  let total = 0;
  for(const [cid, amt] of Object.entries(dividendsCache)){
    divs[cid] = amt;
    total += amt;
  }
  if (Array.isArray(bankTransactions)) {
    const royalties = bankTransactions.filter(t => t.kind === 'royalty' && Number(t.amount) > 0);
    for (const t of royalties) {
      const amt = Number(t.amount);
      total += amt;
      const desc = (t.desc || '').toLowerCase();
      const match = (companies || []).find(c => desc.includes(c.name.toLowerCase()) || desc.includes((c.symbol || '').toLowerCase()));
      if (match) {
        divs[match.id] = (divs[match.id] || 0) + amt;
      }
    }
  }
  return {dividends: divs, totalDividends: total};
}
async function persistAll(){
  await chrome.storage.local.set({
    [STORAGE_KEYS.PORTFOLIO]: portfolioCache,
    [STORAGE_KEYS.DIVIDENDS]: dividendsCache,
    [STORAGE_KEYS.TRANSACTIONS]: transactionsCache,
    [STORAGE_KEYS.PREVIOUS_HOLDINGS]: previousHoldingsMap,
    [STORAGE_KEYS.PREVIOUS_ORDERS]: previousOrders,
    [STORAGE_KEYS.PREVIOUS_IPO_BIDS]: previousIpoBids
  });
}
// ---- IPO helpers (used by the detection diff) ------------------------------
function ipoIdOf(offer){
  return String(offer?.listingId ?? offer?.id ?? offer?.companyId ?? '');
}
function extractIpoBids(offerings){
  const bids = {};
  for (const o of offerings){
    const id = ipoIdOf(o);
    if (!id || !o?.yourBid) continue;
    bids[id] = { qty: Number(o.yourBid.qty || 0), price: Number(o.yourBid.price || 0), name: o.name || `#${id}` };
  }
  return bids;
}
async function buyShares(companyId, qty, price){
  const payload = {companyId, side: 'buy', qty, price};
  const res = await fetch(await gameUrl('/shares/trade'), {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`Buy HTTP ${res.status}`);
  const result = await res.json();
  portfolioCache[companyId] = (portfolioCache[companyId] || 0) + qty;
  transactionsCache.push({type:'BUY', companyId, qty, price, cost: qty*price, timestamp: Date.now(), result});
  await persistAll();
  return {success:true, result};
}
async function sellShares(companyId, qty, price){
  const owned = (portfolioCache[companyId] || 0) + (lastApiCache?.holdings?.find(h=>h.companyId===companyId)?.qty || 0);
  if(owned < qty) return {success:false, error:'Insufficient shares'};
  const payload = {companyId, side: 'sell', qty, price};
  const res = await fetch(await gameUrl('/shares/trade'), {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error(`Sell HTTP ${res.status}`);
  const result = await res.json();
  portfolioCache[companyId] = (portfolioCache[companyId] || 0) - qty;
  if(portfolioCache[companyId] === 0) delete portfolioCache[companyId];
  transactionsCache.push({type:'SELL', companyId, qty, price, proceeds: qty*price, timestamp: Date.now(), result});
  await persistAll();
  return {success:true, result};
}
async function recordDividend(companyId, amtPerShare, sharesOwned){
  const total = amtPerShare * sharesOwned;
  dividendsCache[companyId] = (dividendsCache[companyId] || 0) + total;
  transactionsCache.push({type:'DIVIDEND', companyId, amountPerShare: amtPerShare, sharesOwned, totalDividend: total, timestamp: Date.now()});
  await persistAll();
  return {success:true};
}
async function getPortfolioData(){
  const api = await fetchApi();
  // IPO fetch is non-fatal: a flaky /ipo/offerings must not kill the whole poll.
  const ipo = await fetchIpo().catch(() => null);
  const bank = await fetchBankTransactions();
  const companies = processListings(api.listings||[]);
  const ipoOfferings = Array.isArray(ipo) ? ipo : (Array.isArray(ipo?.offerings) ? ipo.offerings : null);
  // Detect on every fresh fetch. The popup and the remote viewer must not rely
  // on the background alarm alone to log trades made in the game itself.
  await queueDetection(api, companies, ipoOfferings);
  const {holdings, totalValue} = buildPortfolio(companies, api.holdings||[]);
  const {dividends, totalDividends} = calculateDividends(bank.all, companies);
  return {
    companies,
    holdings,
    totalValue,
    dividends,
    totalDividends,
    portfolio: portfolioCache,
    transactions: transactionsCache.slice(-50),
    orders: api.orders||[],
    rawApi: api,
    ipoOfferings,
    bankTransactions: bank.all || [],
    dividendTransactions: bank.dividends || []
  };
}
async function syncToRemote() {
  try {
    const settings = await chrome.storage.local.get(['remoteAccessEnabled', 'remoteToken', 'remoteApiUrl']);
    if (!settings.remoteAccessEnabled || !settings.remoteToken || !settings.remoteApiUrl) return;

    const data = await getPortfolioData();
    const res = await fetch(settings.remoteApiUrl + '/api/portfolio?token=' + encodeURIComponent(settings.remoteToken), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) console.warn('[Babylon] Remote sync failed:', res.status);
    else console.log('[Babylon] Remote sync OK');
  } catch (e) {
    console.warn('[Babylon] Remote sync error:', e.message);
  }
}

async function setupRemoteToken() {
  const settings = await chrome.storage.local.get(['remoteAccessEnabled', 'remoteToken', 'remoteApiUrl']);
  if (!settings.remoteApiUrl) return;

  try {
    const res = await fetch(settings.remoteApiUrl + '/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set' })
    });
    const json = await res.json();
    if (json.success && json.token) {
      await chrome.storage.local.set({ remoteToken: json.token });
      return json.token;
    }
  } catch (e) {
    console.warn('[Babylon] Token setup error:', e.message);
  }
  return null;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      await ensureStorageReady();
      switch (msg.type) {
        case 'GET_PORTFOLIO':
          { const data = await getPortfolioData();
          syncToRemote().catch(() => {});
          sendResponse({success:true, data}); }
          break;
        case 'GET_PORTFOLIO_DATA':
          const remoteSettings = await chrome.storage.local.get(['remoteAccessEnabled', 'remoteToken']);
          if (!remoteSettings.remoteAccessEnabled || remoteSettings.remoteToken !== msg.token) {
            sendResponse({success:false, error: 'Invalid token or remote access disabled'});
            break;
          }
          const portfolioData = await getPortfolioData();
          sendResponse({success:true, data: portfolioData});
          break;
        case 'BUY_SHARES':
          sendResponse(await buyShares(msg.companyId, msg.quantity, msg.price));
          break;
        case 'SELL_SHARES':
          sendResponse(await sellShares(msg.companyId, msg.quantity, msg.price));
          break;
        case 'RECORD_DIVIDEND':
          sendResponse(await recordDividend(msg.companyId, msg.amountPerShare, msg.sharesOwned));
          break;
        case 'BUY_IPO':
          sendResponse({success:true, result: await buyIpo(msg.listingId, msg.price, msg.quantity)});
          break;
        case 'GET_IPO':
          sendResponse({success:true, ipo: ipoCache});
          break;
        case 'REFRESH':
          sendResponse({success:true, data: await getPortfolioData()});
          break;
        case 'SITE_TICK':
          // Heartbeat from the game tab: run a poll even if alarms are throttled.
          await pollPortfolio();
          sendResponse({success:true});
          break;
        case 'GET_TRANSACTIONS':
          sendResponse({success:true, transactions: transactionsCache});
          break;
        case 'GET_BANK_TRANSACTIONS':
          sendResponse({success:true, all: bankTransactionsCache, dividends: bankTransactionsCache.filter(t =>
            t.kind === 'royalty' ||
            (t.kind === 'transfer' && t.amount > 0 && t.desc && !t.desc.toLowerCase().includes('savings') && !t.desc.toLowerCase().includes('checking'))
          )});
          break;
        case 'REFRESH_BANK':
          sendResponse({success:true, data: await fetchBankTransactions()});
          break;
        // Shares API
        case 'FETCH_SHARES_BOOK':
          sendResponse({success:true, data: await fetchSharesBook(msg.companyId)});
          break;
        case 'FETCH_SHARES_HISTORY':
          sendResponse({success:true, data: await fetchSharesHistory(msg.companyId, msg.window)});
          break;
        case 'FETCH_SHARES_LISTINGS':
          sendResponse({success:true, data: await fetchSharesListings()});
          break;
        case 'TRADE_SHARES':
          sendResponse({success:true, result: await tradeShares(msg.companyId, msg.side, msg.price, msg.qty)});
          break;
        case 'CANCEL_SHARE_ORDER':
          sendResponse({success:true, result: await cancelShareOrder(msg.orderId)});
          break;
        // IPO API
        case 'CANCEL_IPO_BID':
          sendResponse({success:true, result: await cancelIpoBid(msg.listingId)});
          break;
        // Auction API
        case 'CREATE_AUCTION':
          sendResponse({success:true, result: await createAuction(msg.ref, msg.chunkId, msg.minBid, msg.increment, msg.hours)});
          break;
        case 'BID_AUCTION':
          sendResponse({success:true, result: await bidAuction(msg.auctionId, msg.amount)});
          break;
        case 'CANCEL_AUCTION':
          sendResponse({success:true, result: await cancelAuction(msg.auctionId)});
          break;
        case 'FETCH_AUCTIONS':
          sendResponse({success:true, data: await fetchAuctions()});
          break;
        // Market API
        case 'FETCH_MARKET_BOOK':
          sendResponse({success:true, data: await fetchMarketBook(msg.commodity, msg.realm)});
          break;
        case 'FETCH_MARKET_HISTORY':
          sendResponse({success:true, data: await fetchMarketHistory(msg.commodity, msg.window)});
          break;
        case 'FETCH_MARKET_TICKER':
          sendResponse({success:true, data: await fetchMarketTicker()});
          break;
        case 'PLACE_MARKET_ORDER':
          sendResponse({success:true, result: await placeMarketOrder(msg.commodity, msg.side, msg.price, msg.qty)});
          break;
        case 'TRADE_MARKET':
          sendResponse({success:true, result: await tradeMarket(msg.commodity, msg.side, msg.qty, msg.maxTotal)});
          break;
        case 'CANCEL_MARKET_ORDER':
          sendResponse({success:true, result: await cancelMarketOrder(msg.orderId)});
          break;
        case 'DELIVER_MARKET':
          sendResponse({success:true, result: await deliverMarket(msg.dest)});
          break;
        case 'FETCH_SELLABLE':
          sendResponse({success:true, data: await fetchSellable(msg.commodity)});
          break;
        // Building API
        case 'BUY_BUILDING':
          sendResponse({success:true, result: await buyBuilding(msg.ref, msg.chunkId)});
          break;
        case 'DEMOLISH_BUILDING':
          sendResponse({success:true, result: await demolishBuilding(msg.ref, msg.chunkId)});
          break;
        case 'SET_BUILDING_ROYALTY':
          sendResponse({success:true, result: await setBuildingRoyalty(msg.ref, msg.chunkId, msg.bps)});
          break;
        case 'RETIRE_STORE':
          sendResponse({success:true, result: await retireStore(msg.ref, msg.chunkId)});
          break;
        case 'FETCH_BUILDING_INFO':
          sendResponse({success:true, data: await fetchBuildingInfo(msg.ref, msg.chunk)});
          break;
        // Land API
        case 'FETCH_LAND':
          sendResponse({success:true, data: await fetchLand(msg.chunk, msg.owned)});
          break;
        case 'BUY_PARCEL':
          sendResponse({success:true, result: await buyParcel(msg.parcelId)});
          break;
        case 'BUY_PARCELS':
          sendResponse({success:true, result: await buyParcels(msg.parcelIds)});
          break;
        case 'MERGE_LAND':
          sendResponse({success:true, result: await mergeLand(msg.parcelIds)});
          break;
        case 'RENAME_LAND':
          sendResponse({success:true, result: await renameLand(msg.parcelId, msg.name)});
          break;
        // Construction API
        case 'START_CONSTRUCTION':
          sendResponse({success:true, result: await startConstruction(msg.parcelId, msg.buildingType, msg.footprint, msg.floors)});
          break;
        case 'CANCEL_CONSTRUCTION':
          sendResponse({success:true, result: await cancelConstruction(msg.siteId)});
          break;
        case 'FORCE_FINISH_CONSTRUCTION':
          sendResponse({success:true, result: await forceFinishConstruction(msg.siteId)});
          break;
        // Rental API
        case 'SET_LISTING':
          sendResponse({success:true, result: await setListing(msg.payload)});
          break;
        case 'BULK_LISTING':
          sendResponse({success:true, result: await bulkListing(msg.payload)});
          break;
        case 'EVICT_TENANCY':
          sendResponse({success:true, result: await evictTenancy(msg.tenancyId)});
          break;
        case 'FETCH_RENT_MARKET':
          sendResponse({success:true, data: await fetchRentMarket(msg.regions)});
          break;
        case 'RENT_UNIT':
          sendResponse({success:true, result: await rentUnit(msg.ref, msg.chunkId, msg.unitKey)});
          break;
        case 'END_LEASE':
          sendResponse({success:true, result: await endLease(msg.leaseId)});
          break;
        case 'ROOM_OFFER':
          sendResponse({success:true, result: await roomOffer(msg.ref, msg.chunkId, msg.unitKey, msg.price)});
          break;
        case 'ANSWER_ROOM_OFFER':
          sendResponse({success:true, result: await answerRoomOffer(msg.offerId, msg.answer)});
          break;
        case 'MERGE_UNITS':
          sendResponse({success:true, result: await mergeUnits(msg.ref, msg.chunkId, msg.unitKeyA, msg.unitKeyB)});
          break;
        // Machine API
        case 'SET_MACHINE_RECIPE':
          sendResponse({success:true, result: await setMachineRecipe(msg.placementId, msg.recipe)});
          break;
        // Mining API
        case 'CREATE_MINING_ZONE':
          sendResponse({success:true, result: await createMiningZone(msg.parcelId, msg.footprint)});
          break;
        case 'FOCUS_MINING_ZONE':
          sendResponse({success:true, result: await focusMiningZone(msg.zoneId, msg.focus)});
          break;
        case 'REMOVE_MINING_ZONE':
          sendResponse({success:true, result: await removeMiningZone(msg.zoneId)});
          break;
        case 'FETCH_RESOURCE_MAP':
          sendResponse({success:true, data: await fetchResourceMap()});
          break;
        case 'FETCH_SURVEY':
          sendResponse({success:true, data: await fetchSurvey()});
          break;
        // Logistics API
        case 'FETCH_LOGISTICS':
          sendResponse({success:true, data: await fetchLogistics()});
          break;
        case 'FETCH_LOGISTICS_HISTORY':
          sendResponse({success:true, data: await fetchLogisticsHistory(msg.window, msg.items)});
          break;
        case 'MANAGE_LOGISTICS_LANE':
          sendResponse({success:true, result: await manageLogisticsLane(msg.payload)});
          break;
        case 'ENABLE_LOGISTICS_LANE':
          sendResponse({success:true, result: await enableLogisticsLane(msg.laneId, msg.enabled)});
          break;
        case 'REMOVE_LOGISTICS_LANE':
          sendResponse({success:true, result: await removeLogisticsLane(msg.laneId)});
          break;
        case 'FETCH_LOGISTICS_PADS':
          sendResponse({success:true, data: await fetchLogisticsPads()});
          break;
        // Dock API
        case 'CANCEL_DOCK_BUILD':
          sendResponse({success:true, result: await cancelDockBuild(msg.buildId)});
          break;
        case 'LAY_DOWN_SHIP':
          sendResponse({success:true, result: await layDownShip(msg.dockId, msg.edgeIdx, msg.model, msg.paint)});
          break;
        case 'SET_DOCK_SETTINGS':
          sendResponse({success:true, result: await setDockSettings(msg.dockId, msg.settings)});
          break;
        case 'FETCH_BERTH_SIZE':
          sendResponse({success:true, data: await fetchBerthSize(msg.dockId, msg.edgeIdx)});
          break;
        case 'FETCH_BEDS':
          sendResponse({success:true, data: await fetchBeds()});
          break;
        case 'FAST_TRAVEL':
          sendResponse({success:true, result: await fastTravel(msg.fromBedId, msg.toBedId)});
          break;
        case 'START_JOURNEY':
          sendResponse({success:true, result: await startJourney(msg.path, msg.legs)});
          break;
        case 'PLAN_JOURNEY':
          sendResponse({success:true, result: await planJourney(msg.lon, msg.lat)});
          break;
        case 'MOVE_PLAYER':
          sendResponse({success:true, result: await movePlayer(msg.lon, msg.lat, msg.spawnAvatar, msg.cartId)});
          break;
        case 'LOOT_PACKAGE':
          sendResponse({success:true, result: await lootPackage()});
          break;
        case 'SEND_PACKAGE':
          sendResponse({success:true, result: await sendPackage(msg.tag)});
          break;
        case 'SET_PARKING_FEE':
          sendResponse({success:true, result: await setParkingFee(msg.spotId, msg.fee)});
          break;
        case 'SET_PARKING_FEE_ALL':
          sendResponse({success:true, result: await setParkingFeeAll(msg.fee)});
          break;
        // Cart API
        case 'PLACE_CART':
          sendResponse({success:true, result: await placeCart(msg.lon, msg.lat, msg.fromPlacementId, msg.cuisine)});
          break;
        case 'RESTOCK_CART':
          sendResponse({success:true, result: await restockCart(msg.cartId)});
          break;
        case 'WITHDRAW_CART':
          sendResponse({success:true, result: await withdrawCart(msg.commodity, msg.qty, msg.cartId)});
          break;
        case 'CLEAN_CART':
          sendResponse({success:true, result: await cleanCart(msg.cleaned, msg.cartId)});
          break;
        case 'COOK_CART':
          sendResponse({success:true, result: await cookCart(msg.perfect, msg.total, msg.instaSold, msg.cartId)});
          break;
        case 'SET_CART_PRICE':
          sendResponse({success:true, result: await setCartPrice(msg.price, msg.cartId)});
          break;
        case 'RENAME_CART':
          sendResponse({success:true, result: await renameCart(msg.name, msg.cartId)});
          break;
        case 'UPGRADE_CART':
          sendResponse({success:true, result: await upgradeCart(msg.id, msg.cartId)});
          break;
        case 'BUY_COMMODITY':
          sendResponse({success:true, result: await buyCommodity(msg.commodity, msg.qty)});
          break;
        // Ranch API
        case 'CREATE_RANCH_PEN':
          sendResponse({success:true, result: await createRanchPen(msg.name, msg.footprint, msg.capacity, msg.species, msg.placementId)});
          break;
        case 'REMOVE_RANCH_PEN':
          sendResponse({success:true, result: await removeRanchPen(msg.penId)});
          break;
        case 'RENAME_RANCH_PEN':
          sendResponse({success:true, result: await renameRanchPen(msg.penId, msg.name)});
          break;
        case 'PICKUP_RANCH':
          sendResponse({success:true, result: await pickupRanch(msg.penId, msg.species, msg.count, msg.toPlacementId)});
          break;
        case 'SELL_RANCH':
          sendResponse({success:true, result: await sellRanch(msg.penId, msg.species, msg.count, msg.price)});
          break;
        case 'FETCH_RANCH_WORLD':
          sendResponse({success:true, data: await fetchRanchWorld(msg.chunk)});
          break;
        // Shop API
        case 'FETCH_SHOP_SHELF':
          sendResponse({success:true, data: await fetchShopShelf(msg.placementId, msg.chunk)});
          break;
        case 'UPDATE_SHOP_SHELF':
          sendResponse({success:true, result: await updateShopShelf(msg.placementId, msg.settings)});
          break;
        case 'FETCH_STORE':
          sendResponse({success:true, data: await fetchStore(msg.storeId, msg.chunk)});
          break;
        case 'CHECKOUT_STORE':
          sendResponse({success:true, result: await checkoutStore(msg.storeId, msg.items)});
          break;
        // Unique Items API
        case 'FETCH_UNIQUE':
          sendResponse({success:true, data: await fetchUnique()});
          break;
        case 'FETCH_UNIQUE_BOARD':
          sendResponse({success:true, data: await fetchUniqueBoard()});
          break;
        case 'BID_UNIQUE':
          sendResponse({success:true, result: await bidUnique(msg.listingId, msg.amount)});
          break;
        case 'BUY_UNIQUE':
          sendResponse({success:true, result: await buyUnique(msg.listingId)});
          break;
        case 'CANCEL_UNIQUE':
          sendResponse({success:true, result: await cancelUnique(msg.listingId)});
          break;
        case 'LIST_UNIQUE':
          sendResponse({success:true, result: await listUnique(msg.uniqueItemId, msg.minBid, msg.increment, msg.hours, msg.buyNow)});
          break;
        case 'DISPLAY_UNIQUE':
          sendResponse({success:true, result: await displayUnique(msg.pieceId, msg.itemId)});
          break;
        case 'GROW_UNIQUE_PLATFORM':
          sendResponse({success:true, result: await growUniquePlatform(msg.pieceId)});
          break;
        // Access API
        case 'FETCH_ACCESS_ME':
          sendResponse({success:true, data: await fetchAccessMe()});
          break;
        case 'FETCH_ACCESS_LOYALTY':
          sendResponse({success:true, data: await fetchAccessLoyalty()});
          break;
        case 'GRANT_LOYALTY':
          sendResponse({success:true, result: await grantLoyalty(msg.points)});
          break;
        case 'UPDATE_PREFS':
          sendResponse({success:true, result: await updatePrefs(msg.prefs)});
          break;
        case 'CHECKOUT_ACCESS':
          sendResponse({success:true, result: await checkoutAccess()});
          break;
        case 'CONFIRM_CHECKOUT':
          sendResponse({success:true, result: await confirmCheckout(msg.sessionId)});
          break;
        case 'DELETE_ACCOUNT':
          sendResponse({success:true, result: await deleteAccount()});
          break;
        case 'EXPORT_ACCOUNT':
          sendResponse({success:true, result: await exportAccount()});
          break;
        case 'RECORD_ATTRIBUTION':
          sendResponse({success:true, result: await recordAttribution(msg.who)});
          break;
        case 'SYNC_REMOTE':
          await syncToRemote();
          sendResponse({success:true});
          break;
        case 'SETUP_REMOTE_TOKEN':
          { const token = await setupRemoteToken();
          sendResponse({success: !!token, token}); }
          break;
        default:
          sendResponse({success:false, error:'Unknown'});
      }
    } catch (e) {
      sendResponse({success:false, error: e.message});
    }
  })();
  return true;
});
const POLL_ALARM = 'babylon-poll';

// One poll tick: detect + alert. Runs on every alarm wake, which is the only
// thing that survives the MV3 service worker being shut down.
async function pollPortfolio() {
  try {
    await ensureStorageReady();
    // Self-heal: keep polling even if the alarm was cleared or never created.
    chrome.alarms.get(POLL_ALARM, (a) => { if (!a) chrome.alarms.create(POLL_ALARM, { periodInMinutes: 0.5 }); });
    if (settingsCache?.autoRefresh) {
      // getPortfolioData runs the holdings/orders/IPO diff itself.
      const data = await getPortfolioData();
      chrome.runtime.sendMessage({type:'PORTFOLIO_UPDATED'}).catch(()=>{});
    } else {
      // Auto-refresh off still has to run the diff or the Transactions tab
      // goes blind to trades made on the website.
      const api = await fetchApi();
      const ipo = await fetchIpo().catch(() => null);
      await detectTradeEvents(api, processListings(api.listings || []), Array.isArray(ipo) ? ipo : null);
    }
  } catch (e) {
    console.warn('[Babylon] Poll failed:', e.message);
  }
}

async function startAutoRefresh() {
  await ensureStorageReady();
  chrome.alarms.get(POLL_ALARM, (alarm) => {
    if (!alarm) {
      chrome.alarms.create(POLL_ALARM, { periodInMinutes: 0.5 });
      console.log('[Babylon] Poll alarm created (30s)');
    }
  });
}

// Must be registered synchronously at the top level to catch alarm wake-ups.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === POLL_ALARM) pollPortfolio();
});

startAutoRefresh();
chrome.runtime.onStartup.addListener(() => startAutoRefresh());
chrome.runtime.onInstalled.addListener(() => startAutoRefresh());

// Warm the player-id cache as soon as the worker starts so the first popup open
// does not pay the /api/me round-trip.
ensurePlayerId().catch(e => console.warn('[Babylon] player id warm-up failed:', e.message));

// Detection is driven from several fetch paths (alarm poll, popup load, remote
// viewer, site heartbeat). Serialize the diffs so two overlapping fetches
// cannot both report the same fill.
let detectionChain = Promise.resolve();
function queueDetection(rawApi, companies, ipoOfferings){
  detectionChain = detectionChain
    .then(() => detectTradeEvents(rawApi, companies, ipoOfferings))
    .catch(async (e) => {
      console.warn('[Babylon] Detection failed:', e.message);
      await writeDiag({lastError: `${e.name || 'Error'}: ${e.message}`.slice(0, 200), lastErrorAt: Date.now()}, true);
    });
  return detectionChain;
}

// Diffs the live market against the persisted snapshot and records every
// execution, order and IPO bid change as a transaction for the Transactions tab.
async function detectTradeEvents(rawApi, companies, ipoOfferings) {
  if (!rawApi) return;

  const currentHoldings = {};
  for (const h of (rawApi.holdings || [])) {
    currentHoldings[h.companyId] = Number(h.qty);
  }
  const currentOrders = Array.isArray(rawApi.orders) ? rawApi.orders : [];
  // null (not {}) when IPO data is unavailable — a failed fetch must never
  // touch the IPO baseline.
  const currentIpoBids = Array.isArray(ipoOfferings) ? extractIpoBids(ipoOfferings) : null;
  const currentOfferingIds = Array.isArray(ipoOfferings) ? new Set(ipoOfferings.map(ipoIdOf)) : null;

  // First successful poll after install (or baseline loss): record state, no events.
  if (previousHoldingsMap === null) {
    previousHoldingsMap = currentHoldings;
    previousOrders = currentOrders;
    if (currentIpoBids !== null) previousIpoBids = currentIpoBids;
    await chrome.storage.local.set({
      [STORAGE_KEYS.PREVIOUS_HOLDINGS]: previousHoldingsMap,
      [STORAGE_KEYS.PREVIOUS_ORDERS]: previousOrders,
      [STORAGE_KEYS.PREVIOUS_IPO_BIDS]: previousIpoBids
    });
    console.log('[Babylon] Baseline recorded: holdings=', Object.keys(currentHoldings).length, 'orders=', currentOrders.length, 'ipoBids=', previousIpoBids ? Object.keys(previousIpoBids).length : 'n/a');
    await writeDiag({
      lastRunAt: Date.now(),
      holdings: Object.keys(currentHoldings).length,
      orders: currentOrders.length,
      ipoBids: previousIpoBids ? Object.keys(previousIpoBids).length : null,
      events: 0, baseline: true, lastError: null
    }, true);
    return;
  }

  const companyMap = {};
  for (const c of (companies || [])) {
    companyMap[c.id] = c;
  }
  const now = Date.now();
  const txnsBefore = (transactionsCache || []).length;
  let changed = false;

  /* ---- Executions: holdings diff ---- */
  const holdingIds = new Set([...Object.keys(previousHoldingsMap), ...Object.keys(currentHoldings)]);
  for (const companyId of holdingIds) {
    const prevQty = previousHoldingsMap[companyId] || 0;
    const curQty = currentHoldings[companyId] || 0;
    if (curQty === prevQty) continue;

    const delta = curQty - prevQty;
    const qty = Math.abs(delta);
    const isBuy = delta > 0;
    changed = true;

    const price = Number(companyMap[companyId]?.currentPrice || 0);

    // Don't double-log a fill the extension already recorded optimistically.
    const alreadyLogged = (transactionsCache || []).some(t =>
      t.source !== 'detected' && t.companyId === companyId &&
      t.type === (isBuy ? 'BUY' : 'SELL') && Number(t.qty) === qty &&
      (now - (t.timestamp || 0)) < 10 * 60 * 1000
    );
    if (!alreadyLogged) {
      transactionsCache.push({
        type: isBuy ? 'BUY' : 'SELL',
        companyId, qty, price,
        ...(isBuy ? {cost: qty * price} : {proceeds: qty * price}),
        timestamp: now, source: 'detected'
      });
    }
  }

  /* ---- Orders: snapshot diff ---- */
  const orderKey = (o, i) => String(o?.id ?? o?.orderId ?? o?.order_id ?? `idx-${i}`);
  const prevOrderIds = new Set((Array.isArray(previousOrders) ? previousOrders : []).map(orderKey));
  const curOrderIds = new Set(currentOrders.map(orderKey));
  if (prevOrderIds.size !== curOrderIds.size ||
      [...curOrderIds].some(k => !prevOrderIds.has(k))) changed = true;

  /* ---- IPO bids: compare by listingId ---- */
  if (currentIpoBids !== null) {
    if (previousIpoBids === null) {
      // First poll that carried IPO data (fresh install or post-upgrade):
      // record silently so pre-existing bids are not logged as new.
      previousIpoBids = currentIpoBids;
      changed = true;
    } else {
      const offeringById = new Map((Array.isArray(ipoOfferings) ? ipoOfferings : []).map(o => [ipoIdOf(o), o]));
      const allBidIds = new Set([...Object.keys(previousIpoBids), ...Object.keys(currentIpoBids)]);
      for (const id of allBidIds) {
        const prevBid = previousIpoBids[id];
        const curBid = currentIpoBids[id];
        if (!prevBid && !curBid) continue;
        if (prevBid && curBid && prevBid.qty === curBid.qty && prevBid.price === curBid.price) continue;
        changed = true;

        const offering = offeringById.get(id);
        const name = curBid?.name || prevBid?.name || `#${id}`;
        const alreadyLogged = (transactionsCache || []).some(t =>
          t.source !== 'detected' && t.type === 'IPO_BUY' && String(t.listingId) === id &&
          Number(t.qty) === curBid?.qty && Number(t.price) === curBid?.price &&
          (now - (t.timestamp || 0)) < 10 * 60 * 1000
        );

        if (curBid) {
          // Placed or resized — both log the bid's current state.
          if (!alreadyLogged) {
            transactionsCache.push({
              type: 'IPO_BUY', listingId: id, companyId: offering?.companyId,
              name, qty: curBid.qty, price: curBid.price, timestamp: now, source: 'detected'
            });
          }
        } else {
          // Bid gone. If the offering itself left the board it concluded and
          // the holdings diff reports the allocation — stay silent.
          if (currentOfferingIds && !currentOfferingIds.has(id)) continue;
          transactionsCache.push({
            type: 'IPO_CANCEL', listingId: id, companyId: offering?.companyId,
            name, qty: prevBid.qty, price: prevBid.price, timestamp: now, source: 'detected'
          });
        }
      }
    }
  }

  previousHoldingsMap = currentHoldings;
  previousOrders = currentOrders;
  if (currentIpoBids !== null) previousIpoBids = currentIpoBids;
  if (changed) {
    await chrome.storage.local.set({
      [STORAGE_KEYS.PREVIOUS_HOLDINGS]: previousHoldingsMap,
      [STORAGE_KEYS.PREVIOUS_ORDERS]: previousOrders,
      [STORAGE_KEYS.PREVIOUS_IPO_BIDS]: previousIpoBids,
      [STORAGE_KEYS.TRANSACTIONS]: transactionsCache
    });
  }
  await writeDiag({
    lastRunAt: now,
    holdings: Object.keys(currentHoldings).length,
    orders: currentOrders.length,
    ipoBids: currentIpoBids ? Object.keys(currentIpoBids).length : null,
    events: (transactionsCache || []).length - txnsBefore,
    baseline: false, lastError: null
  }, changed);
}
