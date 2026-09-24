// The Babylon Portfolio – Popup Script
// Premium Quest Trade–inspired UI with real API data, sparkline charts, full company metrics

(() => {
  // DOM refs
  const els = {
    totalValue: document.getElementById('totalValue'),
    totalValueProgress: document.getElementById('totalValueProgress'),
    expectedAnnualDiv: document.getElementById('expectedAnnualDiv'),
    holdingsCount: document.getElementById('holdingsCount'),
    ordersCount: document.getElementById('ordersCount'),
    liquidBar: document.getElementById('liquidBar'),
    liquidTotal: document.getElementById('liquidTotal'),
    liquidMeta: document.getElementById('liquidMeta'),
    liquidTrack: document.getElementById('liquidTrack'),
    liquidLegend: document.getElementById('liquidLegend'),
    marketTape: document.getElementById('marketTape'),
    marketTapeRun: document.getElementById('marketTapeRun'),
    marketTapeMeta: document.getElementById('marketTapeMeta'),
    tapeMark: document.getElementById('tapeMark'),
    overviewBody: document.getElementById('overviewBody'),
    overviewEmpty: document.getElementById('overviewEmpty'),
    overviewSearch: document.getElementById('overviewSearch'),
    holdingsBody: document.getElementById('holdingsBody'),
    holdingsEmpty: document.getElementById('holdingsEmpty'),
    holdingsSearch: document.getElementById('holdingsSearch'),
    dividendsBody: document.getElementById('dividendsBody'),
    dividendsEmpty: document.getElementById('dividendsEmpty'),
    analyticsChartsGrid: document.getElementById('analyticsChartsGrid'),
    analyticsEmpty: document.getElementById('analyticsEmpty'),
    analyticsTimeframe: document.getElementById('analyticsTimeframe'),
    analyticsChartType: document.getElementById('analyticsChartType'),
    analyticsRefreshBtn: document.getElementById('analyticsRefreshBtn'),
    sectorMapSection: document.getElementById('sectorMapSection'),
    sectorMap: document.getElementById('sectorMap'),
    sectorMapLegend: document.getElementById('sectorMapLegend'),
    sectorMapNote: document.getElementById('sectorMapNote'),
    marketStatsSection: document.getElementById('marketStatsSection'),
    marketStats: document.getElementById('marketStats'),
    marketSectorTable: document.getElementById('marketSectorTable'),
    marketStatsNote: document.getElementById('marketStatsNote'),
    refreshBtn: document.getElementById('refreshBtn'),
    ordersBody: document.getElementById('ordersBody'),
    ordersEmpty: document.getElementById('ordersEmpty'),
    transactionsBody: document.getElementById('transactionsBody'),
    transactionsEmpty: document.getElementById('transactionsEmpty'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    panels: document.querySelectorAll('.panel'),
    toastContainer: document.getElementById('toastContainer'),
    // Detail overlay
    detailOverlay: document.getElementById('detailOverlay'),
    detailName: document.getElementById('detailName'),
    detailSymbol: document.getElementById('detailSymbol'),
    detailPrice: document.getElementById('detailPrice'),
    detailChange: document.getElementById('detailChange'),
    detailGrid: document.getElementById('detailGrid'),
    detailSpark: document.getElementById('detailSpark'),
    detailDivPer: document.getElementById('detailDivPer'),
    detailClose: document.getElementById('detailClose'),
    detailHoldingInfo: document.getElementById('detailHoldingInfo'),
    detailHoldingContent: document.getElementById('detailHoldingContent'),
    orderBookBids: document.getElementById('orderBookBids'),
    orderBookAsks: document.getElementById('orderBookAsks'),
    orderBookSpread: document.getElementById('orderBookSpread'),
    analyticsCompanyFilter: document.getElementById('analyticsCompanyFilter'),
    portfolioChart: document.getElementById('portfolioChart'),
    portfolioChartEmpty: document.getElementById('portfolioChartEmpty'),
    portfolioChartTimeframe: document.getElementById('portfolioChartTimeframe'),
    portfolioProgress: document.getElementById('portfolioProgress'),
    ipoList: document.getElementById('ipoList'),
    ipoEmpty: document.getElementById('ipoEmpty'),
    // Remote Access
    remoteAccessEnabled: document.getElementById('remoteAccessEnabled'),
    remoteApiUrl: document.getElementById('remoteApiUrl'),
    remoteLinkContainer: document.getElementById('remoteLinkContainer'),
    remoteLinkUrl: document.getElementById('remoteLinkUrl'),
    copyRemoteLinkBtn: document.getElementById('copyRemoteLinkBtn'),
    openRemoteLinkBtn: document.getElementById('openRemoteLinkBtn'),
    regenerateRemoteLinkBtn: document.getElementById('regenerateRemoteLinkBtn'),
    remoteStatus: document.getElementById('remoteStatus'),
    // Market Analysis
    marketSearch: document.getElementById('marketSearch'),
    marketSectorFilter: document.getElementById('marketSectorFilter'),
    marketFilter: document.getElementById('marketFilter'),
    marketScanBtn: document.getElementById('marketScanBtn'),
    marketScanStatus: document.getElementById('marketScanStatus'),
    marketMapWrap: document.getElementById('marketMapWrap'),
    marketTableWrap: document.getElementById('marketTableWrap'),
    marketTreemap: document.getElementById('marketTreemap'),
    marketSummary: document.getElementById('marketSummary'),
    marketBody: document.getElementById('marketBody'),
    marketEmpty: document.getElementById('marketEmpty'),
    marketDetailOverlay: document.getElementById('marketDetailOverlay'),
    marketDetailName: document.getElementById('marketDetailName'),
    marketDetailSub: document.getElementById('marketDetailSub'),
    marketDetailPrice: document.getElementById('marketDetailPrice'),
    marketDetailChange: document.getElementById('marketDetailChange'),
    marketDetailClose: document.getElementById('marketDetailClose'),
    marketDetailGrid: document.getElementById('marketDetailGrid'),
    marketDetailSpark: document.getElementById('marketDetailSpark'),
    marketDetailHistoryMeta: document.getElementById('marketDetailHistoryMeta'),
    marketDetailBookMeta: document.getElementById('marketDetailBookMeta'),
    marketDetailBids: document.getElementById('marketDetailBids'),
    marketDetailAsks: document.getElementById('marketDetailAsks'),
    marketDetailHistoryPoints: document.getElementById('marketDetailHistoryPoints'),
    // Economy
    economySearch: document.getElementById('economySearch'),
    economyDays: document.getElementById('economyDays'),
    economyRefreshBtn: document.getElementById('economyRefreshBtn'),
    economyStatus: document.getElementById('economyStatus'),
    economySummary: document.getElementById('economySummary'),
    economyWorldMeta: document.getElementById('economyWorldMeta'),
    economyWorld: document.getElementById('economyWorld'),
    economyQuotesSearch: document.getElementById('economyQuotesSearch'),
    economyQuotesBody: document.getElementById('economyQuotesBody'),
    economyQuotesEmpty: document.getElementById('economyQuotesEmpty'),
    economyRatesMeta: document.getElementById('economyRatesMeta'),
    economyRates: document.getElementById('economyRates'),
    economyFlowMeta: document.getElementById('economyFlowMeta'),
    economyFlowChart: document.getElementById('economyFlowChart'),
    economyFlowBody: document.getElementById('economyFlowBody'),
    economyFlowEmpty: document.getElementById('economyFlowEmpty'),
    economySourcesMeta: document.getElementById('economySourcesMeta'),
    economySourcesBody: document.getElementById('economySourcesBody'),
    economySourcesEmpty: document.getElementById('economySourcesEmpty'),
    economyPayrollMeta: document.getElementById('economyPayrollMeta'),
    economyPayrollCards: document.getElementById('economyPayrollCards'),
    economyPayrollBody: document.getElementById('economyPayrollBody'),
    economyPayrollEmpty: document.getElementById('economyPayrollEmpty'),
    economyBankMeta: document.getElementById('economyBankMeta'),
    economyBankBody: document.getElementById('economyBankBody'),
    economyBankEmpty: document.getElementById('economyBankEmpty'),
    economyBankTxBody: document.getElementById('economyBankTxBody'),
    economyBankTxEmpty: document.getElementById('economyBankTxEmpty'),
    economyCompaniesMeta: document.getElementById('economyCompaniesMeta'),
    economyCompanies: document.getElementById('economyCompanies'),
    economyLbMeta: document.getElementById('economyLbMeta'),
    economyLbSearch: document.getElementById('economyLbSearch'),
    economyLbBody: document.getElementById('economyLbBody'),
    economyLbEmpty: document.getElementById('economyLbEmpty'),
    economyLoyaltyMeta: document.getElementById('economyLoyaltyMeta'),
    economyLoyaltyBody: document.getElementById('economyLoyaltyBody'),
    economyPulseMeta: document.getElementById('economyPulseMeta'),
    economyPulse: document.getElementById('economyPulse'),
    economyGainersBody: document.getElementById('economyGainersBody'),
    economyLosersBody: document.getElementById('economyLosersBody')
  };

  let currentCompanies = [];
  let currentHoldings = [];
  let currentOrders = [];
  let currentTransactions = [];
  let currentIpoOfferings = [];
  let currentDetailCompany = null;
  let chartInstances = {}; // companyId -> {chart, series}; only cards near the viewport hold one
  let portfolioChartInstance = null; // {chart, series}
  let lwLoaded = false;
  let lastLoadSignature = null; // JSON of the last rendered payload; identical payload skips the render pass
  let lastLoadAt = 0; // epoch ms of the last successful GET_PORTFOLIO response
  let chartsSignature = '';     // structure key of the cards currently placed in the analytics grid
  let chartCompanyById = new Map(); // companyId -> company for the cards currently in the grid
  let chartSizeCache = { width: 0, height: 0 }; // measured card size; zeroed on resize
  let chartObserver = null;     // mounts charts as cards scroll in, releases them as they scroll out
  let chartMountQueue = [];     // ids waiting to mount, drained in 16 ms slices
  let chartMountDraining = false;
  const chartDisposeTimers = new Map(); // id -> deferred dispose, so edge jitter can't thrash
  let overviewSortState = { key: null, asc: true };
  let overviewFilterValue = 'value';
  let overviewSearchTerm = '';
  let holdingsSortState = { key: null, asc: true };
  let holdingsSearchTerm = '';

  // Helpers
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

  // Every request funnels through sendMessage, so this is the one place that
  // has to know when the popup is waiting on the worker. The hairline appears
  // only after 150 ms in flight and lingers 300 ms past the last reply, so a
  // burst of quick calls reads as a single sweep instead of flicker.
  let inflight = 0, activityShowTimer = null, activityHideTimer = null;
  function trackActivity(delta) {
    inflight = Math.max(0, inflight + delta);
    if (inflight > 0) {
      clearTimeout(activityHideTimer); activityHideTimer = null;
      if (!activityShowTimer && !document.body.classList.contains('busy')) {
        activityShowTimer = setTimeout(() => {
          activityShowTimer = null;
          if (inflight > 0) document.body.classList.add('busy');
        }, 150);
      }
    } else {
      if (activityShowTimer) { clearTimeout(activityShowTimer); activityShowTimer = null; }
      if (document.body.classList.contains('busy')) {
        activityHideTimer = setTimeout(() => {
          activityHideTimer = null;
          document.body.classList.remove('busy');
        }, 300);
      }
    }
  }
  // silent marks work the user didn't ask for (background polls): it still goes
  // through chrome.runtime, but it must not light the topbar hairline, or a 5 s
  // poll would sweep the bar across the UI every few seconds.
  function sendMessage(msg, opts) {
    const silent = opts?.silent === true;
    if (!silent) trackActivity(1);
    return new Promise(resolve => chrome.runtime.sendMessage(msg, resp => {
      if (!silent) trackActivity(-1);
      resolve(resp);
    }));
  }

  // A stale paint means the worker answered from its last snapshot and is still
  // fetching. Holding the hairline until the fresh payload lands makes the
  // numbers read as "catching up" instead of leaving the user to guess whether
  // what they see is current. The window closes early on the fresh reply and
  // has a hard cap so a dead worker can never leave the bar running.
  let revalidating = false, revalidateTimer = null;
  function markRevalidating(on) {
    if (on === revalidating) return;
    revalidating = on;
    trackActivity(on ? 1 : -1);
    clearTimeout(revalidateTimer); revalidateTimer = null;
    if (on) revalidateTimer = setTimeout(() => markRevalidating(false), 15000);
  }

  // Toasts carry a life bar, but timers decide dismissal — the bar collapses to
  // a single frame under prefers-reduced-motion, so it must never own the
  // lifecycle. Hovering pauses both.
  const TOAST_ICONS = { success: '✓', error: '✕', info: 'i' };
  const TOAST_LIFE = { success: 2600, info: 3200, error: 5200 };
  const TOAST_MAX = 4;
  function dismissToast(t) {
    if (!t || t.dataset.leaving) return;
    t.dataset.leaving = '1';
    clearTimeout(t.__timer);
    t.classList.add('leaving');
    const done = () => t.remove();
    if (reducedMotion) return done();
    t.addEventListener('animationend', done, { once: true });
    setTimeout(done, 400);
  }
  function armToast(t, ms) {
    t.__life = ms;
    t.__startedAt = performance.now();
    clearTimeout(t.__timer);
    t.__timer = setTimeout(() => dismissToast(t), ms);
  }
  function showToast(msg, type = 'info') {
    if (!els.toastContainer) return;
    const life = TOAST_LIFE[type] || 3200;
    const key = `${type}|${msg}`;
    const prior = [...els.toastContainer.children].find(t => t.dataset.key === key && !t.dataset.leaving);
    if (prior) {
      // Same message again — restart its life bar instead of stacking a twin.
      const bar = prior.querySelector('.toast-bar');
      if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; bar.style.animationDuration = life + 'ms'; }
      armToast(prior, life);
      return;
    }
    while (els.toastContainer.children.length >= TOAST_MAX) els.toastContainer.firstElementChild.remove();
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.dataset.key = key;
    t.setAttribute('role', type === 'error' ? 'alert' : 'status');
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = TOAST_ICONS[type] || 'i';
    const body = document.createElement('span');
    body.className = 'toast-msg';
    body.textContent = msg;
    const bar = document.createElement('i');
    bar.className = 'toast-bar';
    bar.style.animationDuration = life + 'ms';
    t.append(icon, body, bar);
    t.addEventListener('mouseenter', () => {
      clearTimeout(t.__timer);
      t.__life -= performance.now() - t.__startedAt;
      bar.style.animationPlayState = 'paused';
    });
    t.addEventListener('mouseleave', () => {
      bar.style.animationPlayState = 'running';
      armToast(t, Math.max(800, t.__life));
    });
    els.toastContainer.appendChild(t);
    armToast(t, life);
  }

  // Stat numbers roll to their new value in 320 ms. The WeakMap keeps one
  // running tween per element so overlapping polls can't fight over the text.
  const numberTweens = new WeakMap();
  function tweenNumber(el, to, format) {
    if (!el) return;
    const target = Number(to) || 0;
    const active = numberTweens.get(el);
    if (active) cancelAnimationFrame(active.raf);
    const start = active ? active.value : (el.__tweenValue ?? target);
    el.__tweenValue = target;
    if (reducedMotion || start === target) { numberTweens.delete(el); el.textContent = format(target); return; }
    const t0 = performance.now(), dur = 320;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (target - start) * eased;
      el.textContent = format(v);
      if (p < 1) numberTweens.set(el, { raf: requestAnimationFrame(step), value: v });
      else { numberTweens.delete(el); el.textContent = format(target); }
    };
    numberTweens.set(el, { raf: requestAnimationFrame(step), value: start });
  }
  function fmtCount(n) { return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }); }

  // Rows are rebuilt on every render, so the flash diff compares against the
  // previous payload rather than the previous DOM.
  const cellSnapshots = new Map();
  function flashChangedCells(tbody, snapshotKey) {
    if (!tbody) return;
    const prev = cellSnapshots.get(snapshotKey);
    const next = new Map();
    for (const tr of tbody.children) {
      const key = tr.dataset.companyId || tr.dataset.name;
      if (!key) continue;
      const price = Number(tr.dataset.price);
      const value = Number(tr.dataset.value);
      next.set(key, { price, value });
      const before = prev?.get(key);
      if (!before || reducedMotion) continue;
      const priceCell = tr.querySelector('[data-cell="price"]');
      const valueCell = tr.querySelector('[data-cell="value"]');
      if (priceCell && isFinite(price) && isFinite(before.price) && price !== before.price) {
        priceCell.classList.add(price > before.price ? 'flash-up' : 'flash-down');
      }
      if (valueCell && isFinite(value) && isFinite(before.value) && value !== before.value) {
        valueCell.classList.add(value > before.value ? 'flash-up' : 'flash-down');
      }
    }
    cellSnapshots.set(snapshotKey, next);
  }

  function paintSkeletonRows(tbody, cols, rows = 6) {
    if (!tbody) return;
    tbody.innerHTML = Array.from({ length: rows }, () =>
      `<tr class="skel-row">${Array.from({ length: cols }, (_, i) =>
        `<td><span class="skel-bar" style="width:${i === 1 ? 132 : 46 + (i % 4) * 16}px"></span></td>`).join('')}</tr>`
    ).join('');
  }

  // Async buttons keep their label and swap in a stepped spinner, so a row of
  // controls never reflows mid-click.
  async function withBusy(btn, fn) {
    if (!btn) return;
    const wasDisabled = btn.disabled;
    btn.disabled = true;
    btn.classList.add('busy');
    try { return await fn(); }
    finally { btn.classList.remove('busy'); btn.disabled = wasDisabled; }
  }

  // Overlays fade the scrim and drop the panel on open; closing runs the
  // reverse before the element is hidden, so a click never snaps the panel away.
  function openOverlay(el) {
    if (!el) return;
    el.classList.remove('closing');
    el.classList.remove('hidden');
  }
  function closeOverlay(el) {
    if (!el || el.classList.contains('hidden') || el.classList.contains('closing')) return;
    if (reducedMotion) { el.classList.add('hidden'); return; }
    el.classList.add('closing');
    const finish = () => {
      if (!el.classList.contains('closing')) return;
      el.classList.remove('closing');
      el.classList.add('hidden');
    };
    el.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 320);
  }

  function fmt(n) {
    n = Number(n);
    if (!isFinite(n)) return '—';
    if (n >= 1e9) return '$' + (n/1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
    if (n >= 1e3) return '$' + (n/1e3).toFixed(2) + 'K';
    return '$' + n.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  function fmtPct(n) { return (Number(n) || 0).toFixed(2) + '%'; }
  function fmtNum(n) { return Number(n || 0).toLocaleString(); }
  function timeAgo(ts) {
    if (!ts) return '—';
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return s + 's ago';
    const m = Math.floor(s / 60);
    if (m < 60) return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    return new Date(ts).toLocaleDateString();
  }

  // Draw sparkline on canvas
  function drawSpark(canvas, data, color = '#4ade80') {
    if (!data || !data.length) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width = canvas.clientWidth * dpr;
    const h = canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * cw;
      const y = ch - ((v - min) / range) * ch;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    // last point dot
    const lx = cw, ly = ch - ((data[data.length-1] - min) / range) * ch;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(lx, ly, 2.5, 0, Math.PI*2); ctx.fill();
  }

  // Detail panel
  function openDetail(company) {
    currentDetailCompany = company;
    // Unhide first: drawSpark sizes the canvas from clientWidth, which is 0
    // while the overlay is still display:none.
    els.detailOverlay.classList.remove('hidden');
    els.detailOverlay.classList.remove('closing');
    els.detailName.textContent = company.name;
    els.detailSymbol.textContent = company.symbol || '';
    els.detailPrice.textContent = '$' + company.currentPrice.toLocaleString();
    const changeClass = company.changePct >= 0 ? 'positive' : 'negative';
    els.detailChange.className = 'detail-value ' + changeClass;
    els.detailChange.textContent = (company.changePct >= 0 ? '+' : '') + company.changePct.toFixed(2) + '%';

    const divPerShare = company.currentPrice * company.yieldPct / 100;
    const marketCap = company.currentPrice * company.sharesOutstanding;
    els.detailGrid.innerHTML = `
      <div class="detail-item"><div class="detail-label">Yield</div><div class="detail-value gold">${company.yieldPct.toFixed(2)}%</div></div>
      <div class="detail-item"><div class="detail-label">Market Cap</div><div class="detail-value">${fmt(marketCap)}</div></div>
      <div class="detail-item"><div class="detail-label">Shares Outstanding</div><div class="detail-value">${fmtNum(company.sharesOutstanding)}</div></div>
      <div class="detail-item"><div class="detail-label">Backing</div><div class="detail-value">${fmt(company.backing)}</div></div>
      <div class="detail-item"><div class="detail-label">Float (bps)</div><div class="detail-value">${company.floatBps}</div></div>
      <div class="detail-item"><div class="detail-label">Holders</div><div class="detail-value">${fmtNum(company.holders)}</div></div>
      <div class="detail-item"><div class="detail-label">IPO Price</div><div class="detail-value">$${company.ipoPrice.toLocaleString()}</div></div>
      <div class="detail-item"><div class="detail-label">Listed</div><div class="detail-value">${new Date(company.listedAt).toLocaleDateString()}</div></div>
    `;
    if (company.spark && company.spark.length > 1) {
      drawSpark(els.detailSpark, company.spark, company.changePct >= 0 ? '#4ade80' : '#f87171');
    } else {
      const ctx = els.detailSpark.getContext('2d');
      ctx.clearRect(0, 0, els.detailSpark.width, els.detailSpark.height);
    }
    els.detailDivPer.textContent = fmt(divPerShare);

    const holding = currentHoldings.find(h => h.id === company.id);
    if (holding) {
      els.detailHoldingInfo.style.display = 'block';
      const hDivPerShare = holding.dividendPerShare || divPerShare;
      els.detailHoldingContent.innerHTML = `
        <div><div class="detail-label">Owned</div><div class="detail-value">${fmtNum(holding.owned)}</div></div>
        <div><div class="detail-label">Avg Cost</div><div class="detail-value">$${(holding.avgCost || 0).toLocaleString()}</div></div>
        <div><div class="detail-label">Value</div><div class="detail-value gold">${fmt(holding.value)}</div></div>
        <div><div class="detail-label">P/L</div><div class="detail-value ${(holding.value - (holding.avgCost || 0) * holding.owned) >= 0 ? 'positive' : 'negative'}">${fmt(holding.value - (holding.avgCost || 0) * holding.owned)}</div></div>
        <div><div class="detail-label">Div Income</div><div class="detail-value positive">${fmt(holding.dividendIncome || 0)}</div></div>
        <div><div class="detail-label">Annual Est</div><div class="detail-value gold">${fmt(holding.owned * divPerShare)}</div></div>
      `;
    } else {
      els.detailHoldingInfo.style.display = 'none';
    }

    els.detailOverlay.classList.remove('hidden');
    loadOrderBook(company.id);
  }

  async function loadOrderBook(companyId) {
    els.orderBookBids.innerHTML = '<tr><td colspan="2" style="text-align:center;color:var(--bone-muted);padding:12px;">Loading…</td></tr>';
    els.orderBookAsks.innerHTML = '<tr><td colspan="2" style="text-align:center;color:var(--bone-muted);padding:12px;">Loading…</td></tr>';
    els.orderBookSpread.textContent = '';
    try {
      const resp = await sendMessage({ type: 'FETCH_SHARES_BOOK', companyId });
      if (!resp.success) throw new Error(resp.error);
      const book = resp.data;
      const bids = Array.isArray(book.bids) ? book.bids : [];
      const asks = Array.isArray(book.asks) ? book.asks : [];
      const bestBid = bids.length ? Math.max(...bids.map(b => Number(b.price))) : 0;
      const bestAsk = asks.length ? Math.min(...asks.map(a => Number(a.price))) : 0;
      const spread = bestBid && bestAsk ? bestAsk - bestBid : 0;
      const spreadPct = bestBid && bestAsk ? ((spread / bestBid) * 100).toFixed(2) : '—';
      if (bestBid && bestAsk) {
        els.orderBookSpread.innerHTML = `Spread: <strong>$${spread.toFixed(2)}</strong> (${spreadPct}%) &nbsp;|&nbsp; Best Bid: $${bestBid.toLocaleString()} &nbsp;|&nbsp; Best Ask: $${bestAsk.toLocaleString()}`;
      } else {
        els.orderBookSpread.textContent = 'No orders on the book';
      }
      els.orderBookBids.innerHTML = bids.length
        ? bids.sort((a, b) => Number(b.price) - Number(a.price)).map(b => `<tr><td class="change-cell positive">$${Number(b.price).toLocaleString()}</td><td>${fmtNum(b.qty)}</td></tr>`).join('')
        : '<tr><td colspan="2" style="text-align:center;color:var(--bone-muted);padding:12px;">No bids</td></tr>';
      els.orderBookAsks.innerHTML = asks.length
        ? asks.sort((a, b) => Number(a.price) - Number(b.price)).map(a => `<tr><td class="change-cell negative">$${Number(a.price).toLocaleString()}</td><td>${fmtNum(a.qty)}</td></tr>`).join('')
        : '<tr><td colspan="2" style="text-align:center;color:var(--bone-muted);padding:12px;">No asks</td></tr>';
    } catch (e) {
      els.orderBookBids.innerHTML = '<tr><td colspan="2" style="text-align:center;color:#f87171;padding:12px;">Failed to load</td></tr>';
      els.orderBookAsks.innerHTML = '<tr><td colspan="2" style="text-align:center;color:#f87171;padding:12px;">Failed to load</td></tr>';
      els.orderBookSpread.textContent = '';
    }
  }

  function closeDetail() {
    closeOverlay(els.detailOverlay);
  }
  els.detailClose.addEventListener('click', closeDetail);
  els.detailOverlay.addEventListener('click', e => { if (e.target === els.detailOverlay) closeDetail(); });

  // Tabs
  function activateTab(tab, { focusBtn = false } = {}) {
    const btn = [...els.tabBtns].find(b => b.dataset.tab === tab);
    if (!btn) return;
    els.tabBtns.forEach(b => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    els.panels.forEach(p => p.classList.toggle('active', p.id === `panel-${tab}`));
    if (typeof btn.scrollIntoView === 'function') {
      try { btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' }); }
      catch (e) { btn.scrollIntoView(); }
    }
    const main = document.querySelector('.main');
    if (main) main.scrollTop = 0;
    if (focusBtn) btn.focus({ preventScroll: true });
  }
  els.tabBtns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  // Keyboard layer — tab semantics, arrow-key cycling, "/" search, Escape
  els.tabBtns.forEach(btn => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
  });
  els.panels.forEach(p => p.setAttribute('role', 'tabpanel'));
  const tabStrip = document.querySelector('.tabs');
  if (tabStrip && tabStrip.setAttribute) tabStrip.setAttribute('role', 'tablist');

  const PANEL_SEARCH = { overview: 'overviewSearch', holdings: 'holdingsSearch', market: 'marketSearch', economy: 'economySearch' };

  function activeTabName() {
    return document.querySelector('.tab-btn.active')?.dataset.tab || 'overview';
  }

  function cycleTab(step) {
    const list = [...els.tabBtns];
    if (!list.length) return;
    const i = Math.max(0, list.findIndex(b => b.classList.contains('active')));
    const next = list[(i + step + list.length) % list.length];
    if (next) activateTab(next.dataset.tab, { focusBtn: true });
  }

  function focusPanelSearch() {
    const id = PANEL_SEARCH[activeTabName()];
    const input = id && document.getElementById(id);
    if (!input || input.getClientRects().length === 0) return false;
    input.focus();
    if (typeof input.select === 'function') input.select();
    return true;
  }

  function openOverlayEl() {
    return [els.detailOverlay, els.marketDetailOverlay]
      .find(el => el && !el.classList.contains('hidden')) || null;
  }

  document.addEventListener('keydown', e => {
    const t = e.target;
    const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable === true);

    if (e.key === 'Escape') {
      const ov = openOverlayEl();
      if (ov) { e.preventDefault(); closeOverlay(ov); return; }
      // Panel searches clear themselves on Escape; a second press leaves the field.
      if (typing && !t.value) t.blur();
      return;
    }

    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;

    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && t && t.classList && t.classList.contains('tab-btn')) {
      e.preventDefault();
      cycleTab(e.key === 'ArrowRight' ? 1 : -1);
      return;
    }

    if (e.key === '/' && focusPanelSearch()) e.preventDefault();
  });

  // Topbar elevation while content scrolls beneath it
  const scrollHost = document.querySelector('.main');
  const topbarEl = document.querySelector('.topbar');
  if (scrollHost && topbarEl) {
    const syncElevation = () => topbarEl.classList.toggle('elevated', scrollHost.scrollTop > 2);
    scrollHost.addEventListener('scroll', syncElevation, { passive: true });
    syncElevation();
  }

  /* ── Live market tape ───────────────────────────────────────────────
     Ticker sign, name, price and 24h change for every listed company,
     crawling across the top of the UI. It rides the existing portfolio
     poll instead of adding a fetch of its own: prices are patched in place
     because rebuilding the run would restart the crawl animation. */
  const TAPE_SPEED = 26;                     // px per second — the resting crawl
  const TAPE_SPEED_MAX = 120;                // ceiling, above which a ticker is a blur
  const TAPE_SWEEP_S = 45;                   // every listing must pass once within this
  const TAPE_STEP = 4;                       // px per frame — the 8-bit stutter
  const TAPE_STALE_MS = 90000;
  const tapePrices = new Map();
  let tapeSig = '';

  // The game exposes no ticker field (symbol mirrors the name), so the tape
  // derives the sign from the name the way an exchange board does.
  function tickerOf(name) {
    const words = String(name || '').match(/[A-Za-z0-9]+/g) || [];
    if (!words.length) return '—';
    return (words.length > 1 ? words.map(w => w[0]).join('') : words[0]).slice(0, 5).toUpperCase();
  }

  function tapePriceText(c) {
    return `$${Number(c.currentPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function tapeChangeText(c) {
    const pct = Number(c.changePct || 0);
    return `${pct > 0 ? '▲ +' : (pct < 0 ? '▼ ' : '· ')}${pct.toFixed(2)}%`;
  }

  function tapeDir(c) {
    const pct = Number(c.changePct || 0);
    return pct > 0 ? 'up' : (pct < 0 ? 'down' : 'flat');
  }

  function tapeItemHtml(c) {
    return `<span class="ti ti-${tapeDir(c)}" data-cid="${escapeText(String(c.id))}">`
      + `<b>${escapeText(tickerOf(c.name))}</b>`
      + `<span class="ti-nm">${escapeText(c.name || '')}</span>`
      + `<span class="ti-px">${escapeText(tapePriceText(c))}</span>`
      + `<em class="ti-ch">${escapeText(tapeChangeText(c))}</em>`
      + `</span><span class="ti-sep">¦</span>`;
  }

  // Two identical sets let the run crawl to translateX(-50%) and wrap without
  // a seam; the set itself repeats enough times to always cover the window.
  function fitTape() {
    const run = els.marketTapeRun;
    const list = currentCompanies;
    if (!run || !list.length) return;
    const sig = list.map(c => c.id).join('|');
    const view = run.parentElement;
    const group = list.map(tapeItemHtml).join('');
    run.innerHTML = `<span class="tape-set">${group}</span>`;
    const groupW = run.firstElementChild?.offsetWidth || 0;
    // The signature is only committed once the run has actually been measured:
    // a hidden topbar reports 0, and claiming the fit then would leave a single,
    // unscrolling set on screen for the rest of the session.
    if (!groupW) return;
    const reps = Math.max(1, Math.ceil((view.clientWidth || 640) / groupW));
    const setHtml = `<span class="tape-set">${group.repeat(reps)}</span>`;
    run.innerHTML = setHtml + setHtml;
    const setW = run.firstElementChild?.offsetWidth || 0;
    if (!setW) return;
    tapeSig = sig;
    // Pace the crawl off one complete board (groupW), not off the padded set: a
    // fixed px-per-second made a real-sized market take minutes per pass, so most
    // listings never crossed the window during a session. Wider boards now run
    // faster, up to the point where a ticker stops being readable.
    const pxPerSec = Math.min(TAPE_SPEED_MAX, Math.max(TAPE_SPEED, groupW / TAPE_SWEEP_S));
    run.style.animationDuration = `${(setW / pxPerSec).toFixed(2)}s`;
    run.style.animationTimingFunction = `steps(${Math.max(16, Math.round(setW / TAPE_STEP))}, end)`;
    if (reducedMotion) els.marketTape.classList.add('hold');
  }

  function patchTapePrices(list) {
    const run = els.marketTapeRun;
    if (!run.children.length) return;
    const byId = new Map(list.map(c => [String(c.id), c]));
    const moved = [];
    for (const el of run.querySelectorAll('.ti')) {
      const c = byId.get(el.dataset.cid);
      if (!c) continue;
      const price = el.querySelector('.ti-px');
      const change = el.querySelector('.ti-ch');
      const next = tapePriceText(c);
      const prev = tapePrices.get(String(c.id));
      if (price && price.textContent !== next) {
        price.textContent = next;
        if (change) change.textContent = tapeChangeText(c);
        el.className = `ti ti-${tapeDir(c)}`;
        if (prev !== undefined && prev !== c.currentPrice) moved.push([el, prev < c.currentPrice ? 'rgba(74,222,128,.34)' : 'rgba(248,113,113,.34)']);
      }
      tapePrices.set(String(c.id), c.currentPrice);
    }
    // Element.animate rather than a class: the flash must re-fire on every
    // change, and a forced reflow to restart a CSS animation would stutter the
    // crawl on every copy of the set.
    if (!reducedMotion) for (const [el, color] of moved) el.animate([{ backgroundColor: color }, { backgroundColor: 'rgba(0,0,0,0)' }], { duration: 900, easing: 'steps(3,end)' });
  }

  function syncTapeMark() {
    const live = !!lastLoadAt && Date.now() - lastLoadAt < TAPE_STALE_MS;
    els.tapeMark.textContent = live ? 'LIVE' : 'STALE';
    els.marketTape.classList.toggle('stale', !live);
    if (!els.marketTapeMeta) return;
    const up = currentCompanies.filter(c => Number(c.changePct) > 0).length;
    const down = currentCompanies.filter(c => Number(c.changePct) < 0).length;
    els.marketTapeMeta.textContent = `${currentCompanies.length} listed · ${up} up · ${down} down`;
  }

  function renderTape() {
    if (!els.marketTape || !els.marketTapeRun) return;
    if (!currentCompanies.length) {
      els.marketTape.style.display = 'none';
      els.marketTapeRun.innerHTML = '';
      tapeSig = '';
      return;
    }
    els.marketTape.style.display = 'flex';
    // The label column shares the row with the viewport, so its text has to be
    // final before fitTape measures how much width the crawl actually gets.
    syncTapeMark();
    const sig = currentCompanies.map(c => c.id).join('|');
    if (sig !== tapeSig) fitTape();
    patchTapePrices(currentCompanies);
  }

  // The LIVE / STALE badge has to age even when a poll comes back identical,
  // so it gets its own cheap tick instead of waiting for a re-render.
  if (els.marketTape) setInterval(() => {
    if (currentCompanies.length && els.marketTape.style.display !== 'none') syncTapeMark();
  }, 5000);

  // The sets are sized from the width of whatever face is painted at fit time.
  // If a webfont lands later and is narrower, the sets can end up shorter than
  // the window, which shows as a gap mid-crawl — so re-fit once they settle.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
    if (currentCompanies.length && els.marketTape.style.display !== 'none') fitTape();
  });

  function populateCompanies(companies) {
    currentCompanies = companies;
  }

  // Click handler for company rows - open detail
  // Row clicks are delegated from the tbody containers, which persist across
  // renders. The old attachRowClick() re-bound every row after each of the
  // three table renders per load, stacking up to three listeners on the same
  // row — one click then opened the detail overlay (and its order-book fetch)
  // three times.
  function rowClickHandler(e) {
    const row = e.target.closest('tr');
    if (!row || !row.dataset) return;
    const c = row.dataset.companyId
      ? currentCompanies.find(x => x.id === row.dataset.companyId)
      : currentCompanies.find(x => x.name === row.querySelector('.company-name')?.textContent);
    if (c) openDetail(c);
  }
  [els.overviewBody, els.holdingsBody, els.dividendsBody].forEach(tb => {
    if (!tb) return;
    tb.style.cursor = 'pointer';
    tb.addEventListener('click', rowClickHandler);
  });

  // Attach click on analytics chart cards (called after charts render)
  function attachChartClicks() {
    els.analyticsChartsGrid.querySelectorAll('.chart-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const name = card.querySelector('.chart-title')?.textContent;
        const c = currentCompanies.find(x => x.name === name);
        if (c) openDetail(c);
      });
    });
  }

  // Render Overview (all companies with key metrics)
  function renderOverview(companies, holdings) {
    const heldById = new Map(holdings.map(h => [h.id, h]));
    resetEmpty(els.overviewEmpty);
    if (!companies.length) { els.overviewBody.innerHTML = ''; els.overviewEmpty.style.display = 'block'; return; }
    els.overviewEmpty.style.display = 'none';
    els.overviewBody.innerHTML = companies.map((c, i) => {
      const h = heldById.get(c.id);
      const changeClass = c.changePct >= 0 ? 'positive' : 'negative';
      const marketCap = c.currentPrice * c.sharesOutstanding;
      const holdingValue = h ? h.value : 0;
      return `<tr data-company-id="${c.id}" data-name="${c.name.toLowerCase()}" data-symbol="${(c.symbol || '').toLowerCase()}" data-price="${c.currentPrice}" data-change="${c.changePct}" data-yield="${c.yieldPct}" data-owned="${h ? h.owned : 0}" data-value="${h ? h.value : 0}" data-pct="${h ? h.percentage : 0}" data-mcap="${marketCap}" style="cursor:pointer;">
        <td><span class="company-name">${c.name}</span>${h ? '<span class="own-badge">OWN</span>' : ''}</td>
        <td class="price-cell" data-cell="price">$${c.currentPrice.toLocaleString()}</td>
        <td class="change-cell ${changeClass}">${c.changePct >= 0 ? '+' : ''}${c.changePct.toFixed(2)}%</td>
        <td>${c.yieldPct.toFixed(1)}%</td>
        <td>${h ? fmtNum(h.owned) : '—'}</td>
        <td class="value-cell" data-cell="value">${h ? fmt(h.value) : '—'}</td>
        <td class="pct-cell">${h ? fmtPct(h.percentage) : '—'}</td>
      </tr>`;
    }).join('');
    flashChangedCells(els.overviewBody, 'overview');
    restoreOverviewSort();
    restoreOverviewFilter();
    applySearch(els.overviewBody, els.overviewEmpty, overviewSearchTerm);
  }

  function restoreOverviewSort() {
    if (!overviewSortState.key) return;
    const table = document.querySelector('#panel-overview table');
    if (!table) return;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const key = overviewSortState.key;
    const toAsc = overviewSortState.asc;
    rows.sort((a, b) => {
      if (key === 'name') {
        const av = (a.dataset.name || '').toLowerCase();
        const bv = (b.dataset.name || '').toLowerCase();
        return toAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      const av = parseFloat(a.dataset[key] || 0);
      const bv = parseFloat(b.dataset[key] || 0);
      return toAsc ? av - bv : bv - av;
    });
    rows.forEach(r => tbody.appendChild(r));
    thead.querySelectorAll('th.sortable').forEach(x => x.classList.remove('sorted-asc', 'sorted-desc'));
    const activeTh = thead.querySelector(`th[data-sort="${key}"]`);
    if (activeTh) activeTh.classList.add(toAsc ? 'sorted-asc' : 'sorted-desc');
  }

  function restoreHoldingsSort() {
    if (!holdingsSortState.key) return;
    // Lightweight Charts injects its own <table> into the panel, so scope to the holdings table itself
    const table = els.holdingsBody.closest('table');
    if (!table) return;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const key = holdingsSortState.key;
    const toAsc = holdingsSortState.asc;
    rows.sort((a, b) => {
      if (key === 'name') {
        const av = (a.dataset.name || '').toLowerCase();
        const bv = (b.dataset.name || '').toLowerCase();
        return toAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      const av = parseFloat(a.dataset[key] || 0);
      const bv = parseFloat(b.dataset[key] || 0);
      return toAsc ? av - bv : bv - av;
    });
    rows.forEach(r => tbody.appendChild(r));
    thead.querySelectorAll('th.sortable').forEach(x => x.classList.remove('sorted-asc', 'sorted-desc'));
    const activeTh = thead.querySelector(`th[data-sort="${key}"]`);
    if (activeTh) activeTh.classList.add(toAsc ? 'sorted-asc' : 'sorted-desc');
  }

  // ── Table search (Overview + Holdings) ───────────
  // Empty-state markup is swapped for a "no matches" note while a search is
  // active, so the original text is kept to restore on clear.
  const emptyDefaults = {};
  function rememberEmptyState() {
    if (els.overviewEmpty) emptyDefaults.overviewEmpty = els.overviewEmpty.innerHTML;
    if (els.holdingsEmpty) emptyDefaults.holdingsEmpty = els.holdingsEmpty.innerHTML;
    ['economySourcesEmpty', 'economyPayrollEmpty', 'economyLbEmpty', 'economyQuotesEmpty'].forEach(key => {
      if (els[key]) emptyDefaults[key] = els[key].innerHTML;
    });
  }
  function resetEmpty(el) {
    if (!el) return;
    const original = emptyDefaults[el.id];
    if (original !== undefined) el.innerHTML = original;
  }
  function escapeText(s) {
    return String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  }
  function applySearch(tbody, emptyEl, term) {
    const needle = (term || '').trim().toLowerCase();
    let visible = 0;
    tbody.querySelectorAll('tr').forEach(row => {
      const haystack = `${row.dataset.name || ''} ${row.dataset.symbol || ''}`;
      const match = !needle || haystack.includes(needle);
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (!emptyEl || !tbody.querySelectorAll('tr').length) return visible;
    if (visible === 0) {
      emptyEl.innerHTML = `<strong>NO MATCHES</strong>Nothing matches “${escapeText(term.trim())}”`;
      emptyEl.style.display = 'block';
    } else {
      resetEmpty(emptyEl);
      emptyEl.style.display = 'none';
    }
    return visible;
  }
  rememberEmptyState();

  function restoreOverviewFilter() {
    const filterEl = document.getElementById('overviewFilter');
    if (filterEl) filterEl.value = overviewFilterValue;
    if (overviewFilterValue && overviewFilterValue !== 'value') {
      const key = overviewFilterValue === 'value' ? 'mcap' : overviewFilterValue;
      const rows = Array.from(document.querySelectorAll('#overviewBody tr'));
      rows.sort((a, b) => {
        const aVal = parseFloat(a.dataset[key] || 0);
        const bVal = parseFloat(b.dataset[key] || 0);
        return bVal - aVal;
      });
      const tbody = document.getElementById('overviewBody');
      if (tbody) {
        tbody.innerHTML = '';
        rows.forEach(r => tbody.appendChild(r));
      }
    }
  }

  // Render Holdings detail
  function renderHoldings(holdings) {
    currentHoldings = holdings;
    resetEmpty(els.holdingsEmpty);
    if (!holdings.length) { els.holdingsBody.innerHTML = ''; els.holdingsEmpty.style.display = 'block'; return; }
    els.holdingsEmpty.style.display = 'none';
    els.holdingsBody.innerHTML = holdings.map(h => {
      const divPerShare = h.dividendPerShare || (h.currentPrice * h.yieldPct / 100);
      const chg = Number(h.changePct) || 0;
      const chgCls = chg >= 0 ? 'positive' : 'negative';
      return `<tr data-name="${h.name.toLowerCase()}" data-symbol="${(h.symbol || '').toLowerCase()}" data-owned="${h.owned}" data-price="${h.currentPrice}" data-change="${chg}" data-backing="${h.backing}" data-value="${h.value}" data-pct="${h.percentage}" data-yield="${h.yieldPct}" data-div="${h.dividendIncome || 0}">
      <td><span class="company-name">${h.name}</span><span class="company-symbol">${h.symbol}</span><span class="own-badge">OWN</span></td>
      <td>${fmtNum(h.owned)}</td>
      <td class="price-cell" data-cell="price">$${h.currentPrice.toLocaleString()}</td>
      <td class="change-cell ${chgCls}" title="24h price change · ${fmt(Math.abs(h.owned * h.currentPrice * chg / (100 + chg)))} on your position">${chg >= 0 ? '▲' : '▼'} ${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%</td>
      <td>$${h.backing.toLocaleString()}</td>
      <td class="value-cell" data-cell="value">${fmt(h.value)}</td>
      <td class="pct-cell">${fmtPct(h.percentage)}</td>
      <td>${h.yieldPct.toFixed(1)}%</td>
      <td class="div-cell">${fmt(h.dividendIncome)} (${fmt(divPerShare)}/share)</td>
    </tr>`;
    }).join('');
    flashChangedCells(els.holdingsBody, 'holdings');
    restoreHoldingsSort();
    applySearch(els.holdingsBody, els.holdingsEmpty, holdingsSearchTerm);
    renderPortfolioChart();
  }

  // Render Portfolio Value Chart
  async function renderPortfolioChart() {
    const holdingsPanel = document.getElementById('panel-holdings');
    if (!holdingsPanel || !holdingsPanel.classList.contains('active')) return;
    if (!els.portfolioChart) {
      console.log('[Babylon] Portfolio chart skipped: missing container');
      if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
      return;
    }

    // Load Lightweight Charts library if not already loaded
    if (!lwLoaded) {
      try {
        await loadLightweightCharts();
        lwLoaded = true;
      } catch (e) {
        console.error('[Babylon] Failed to load charts library for portfolio', e);
        if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
        return;
      }
    }

    if (!currentHoldings.length) {
      console.log('[Babylon] Portfolio chart: no holdings');
      if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
      if (els.portfolioProgress) els.portfolioProgress.style.display = 'none';
      if (portfolioChartInstance) {
        portfolioChartInstance.chart.remove();
        portfolioChartInstance = null;
      }
      return;
    }

    if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'none';

    const tf = els.portfolioChartTimeframe?.value || '30d';
    const tfHours = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 };
    const maxPoints = tfHours[tf] || 720;

    // Build portfolio value history from holdings + spark data. Times are
    // anchored to the current hour (like the analytics charts) so the series
    // is stable within an hour and a refresh can call setData in place — or
    // skip entirely when nothing moved — instead of recreating the chart on
    // every 30s poll.
    const companyById = new Map(currentCompanies.map(c => [c.id, c]));
    const portfolioHistory = {};
    for (const h of currentHoldings) {
      const company = companyById.get(h.id);
      if (!company || !company.spark || company.spark.length < 2) continue;
      const spark = company.spark.length > maxPoints ? company.spark.slice(-maxPoints) : company.spark;
      const anchor = Math.floor(Date.now() / 3600000) * 3600;
      for (let i = 0; i < spark.length; i++) {
        const time = anchor - (spark.length - 1 - i) * 3600;
        const value = h.owned * spark[i];
        portfolioHistory[time] = (portfolioHistory[time] || 0) + value;
      }
    }

    const data = Object.entries(portfolioHistory)
      .map(([time, value]) => ({ time: parseInt(time), value }))
      .sort((a, b) => a.time - b.time);

    if (!data.length) {
      if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
      if (els.portfolioProgress) els.portfolioProgress.style.display = 'none';
      if (portfolioChartInstance) {
        portfolioChartInstance.chart.remove();
        portfolioChartInstance = null;
      }
      return;
    }

    const dataSig = tf + '|' + data.map(d => d.time + ':' + d.value).join(',');
    if (portfolioChartInstance && portfolioChartInstance.dataSig === dataSig) return;

    const progressHtml = (() => {
      if (data.length < 2) return null;
      const startValue = data[0].value;
      const endValue = data[data.length - 1].value;
      const changePct = ((endValue - startValue) / startValue) * 100;
      return { positive: changePct >= 0, text: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%` };
    })();

    try {
      if (portfolioChartInstance) {
        portfolioChartInstance.series.setData(data);
        const spanKey = `${data[0].time}|${data[data.length - 1].time}`;
        if (spanKey !== portfolioChartInstance.spanKey) {
          portfolioChartInstance.spanKey = spanKey;
          portfolioChartInstance.chart.timeScale().fitContent();
        }
        portfolioChartInstance.dataSig = dataSig;
      } else {
        const chart = LightweightCharts.createChart(els.portfolioChart, {
          layout: { background: { type: 'solid', color: 'transparent' }, textColor: '#a8a4a0', fontSize: 10 },
          grid: { vertLines: { color: '#232323' }, horzLines: { color: '#232323' } },
          rightPriceScale: { borderColor: '#232323', scaleMargins: { top: 0.1, bottom: 0.1 } },
          timeScale: { borderColor: '#232323', timeVisible: true, secondsVisible: false },
          crosshair: { mode: 0 },
        });

        const series = chart.addAreaSeries({
          topColor: 'rgba(201, 168, 76, 0.4)',
          bottomColor: 'rgba(201, 168, 76, 0.0)',
          lineColor: '#c9a84c',
          lineWidth: 2,
          priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
        });

        series.setData(data);
        chart.timeScale().fitContent();

        portfolioChartInstance = { chart, series, dataSig, spanKey: `${data[0].time}|${data[data.length - 1].time}` };
      }

      // Calculate and display progress indicator
      if (els.portfolioProgress) {
        if (progressHtml) {
          els.portfolioProgress.style.display = 'block';
          els.portfolioProgress.style.color = progressHtml.positive ? '#4ade80' : '#f87171';
          els.portfolioProgress.style.borderColor = progressHtml.positive ? 'var(--green)' : 'var(--red)';
          els.portfolioProgress.textContent = progressHtml.text;
        } else {
          els.portfolioProgress.style.display = 'none';
        }
      }
    } catch (e) {
      console.error('[Babylon] Portfolio chart error:', e);
      if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
    }
  }

  // Render Dividends
  function renderDividends(companies, dividends, totalDividends, holdings) {
    const divSummary = document.getElementById('dividendSummary');
    const divFoot = document.getElementById('dividendsFoot');
    let expectedAnnual = 0;
    if (Array.isArray(holdings)) {
      for (const h of holdings) {
        expectedAnnual += h.owned * (h.currentPrice * h.yieldPct / 100);
      }
    }
    if (divSummary) {
      divSummary.innerHTML = `
        <div class="div-summary-card"><div class="detail-label">TOTAL DIVIDENDS RECEIVED</div><div class="detail-value positive">${fmt(totalDividends || 0)}</div></div>
        <div class="div-summary-card"><div class="detail-label">EXPECTED ANNUAL</div><div class="detail-value gold">${fmt(expectedAnnual)}</div></div>
        <div class="div-summary-card"><div class="detail-label">COMPANIES PAYING</div><div class="detail-value">${Object.keys(dividends).filter(k => dividends[k] > 0).length}</div></div>
      `;
    }
    const companyById = new Map(companies.map(c => [c.id, c]));
    const rows = Object.entries(dividends).map(([cid, total]) => {
      const c = companyById.get(cid);
      if (!c) return '';
      const divPerShare = c.currentPrice * c.yieldPct / 100;
      return `<tr>
        <td><span class="company-name">${c.name}</span><span class="company-symbol">${c.symbol}</span></td>
        <td class="div-cell">${fmt(total)}</td>
        <td>$${divPerShare.toFixed(4)}</td>
        <td>${fmtPct(c.yieldPct)}</td>
      </tr>`;
    }).filter(Boolean).join('');
    if (!rows) { els.dividendsBody.innerHTML = ''; els.dividendsEmpty.style.display = 'block'; if(divFoot) divFoot.innerHTML = ''; }
    else {
      els.dividendsEmpty.style.display = 'none';
      els.dividendsBody.innerHTML = rows;
      if (divFoot) {
        divFoot.innerHTML = `<tr><td>TOTAL</td><td>${fmt(totalDividends || 0)}</td><td></td><td></td></tr>`;
      }
    }
  }

  /* ── Sector Map ────────────────────────────────────────────────────
     The game API exposes no sector/industry field, so companies are
     classified by keywords in their name. Layout is a squarified
     treemap: sector blocks sized by combined market cap, tiles sized by
     each company's own market cap — the reference infographic's read. */
  const SECTOR_DEFS = [
    { key: 'energy', label: 'Energy', color: '#d9a441', kw: ['energy','oil','petrol','gas','solar','power','coal','fuel','nuclear','wind','hydro'] },
    { key: 'materials', label: 'Materials', color: '#8e9296', kw: ['mining','mine','ore','iron','steel','metal','gold','silver','copper','lumber','timber','wood','cement','stone','chem','mineral','quarry','aluminium','aluminum'] },
    { key: 'agriculture', label: 'Agriculture', color: '#6fae4e', kw: ['farm','agri','crop','ranch','cattle','dairy','grain','food','harvest','fish','livestock','poultry','orchard','vineyard','brew','coffee','meat','milk','wheat','corn','barley','soy','rice','sugar','cocoa','tea','spice','seed','fruit','tobacco','rubber','cotton'] },
    { key: 'manufacturing', label: 'Manufacturing', color: '#bf6b3a', kw: ['manufactur','factor','industri','works','motor','auto','machine','tool','gear','textile','smith','forge','mill','arms','parts','craft'] },
    { key: 'technology', label: 'Technology', color: '#5f8fd8', kw: ['tech','cyber','data','soft','system','electron','robot','digital','compute','network','code','quantum','chip','circuit'] },
    { key: 'financials', label: 'Financials', color: '#4fb3a6', kw: ['bank','capital','financ','invest','fund','trust','credit','insur','broker','equity','holdings','exchange','asset','wealth','mortgage'] },
    { key: 'retail', label: 'Retail', color: '#cf6fa8', kw: ['retail','mart','market','shop','store','goods','trad','sales','outlet','mall','commerce','supply'] },
    { key: 'realestate', label: 'Real Estate', color: '#a07fd8', kw: ['realt','estate','property','land','housing','home','builder','construct','architect','rent'] },
    { key: 'logistics', label: 'Logistics', color: '#d16a5a', kw: ['logistic','freight','ship','cargo','transport','truck','rail','courier','delivery','port','airline','express','haul'] },
  ];
  const SECTOR_OTHER = { key: 'other', label: 'Other', color: '#4d4d56', kw: [], dark: true };
  // Word-boundary match at the keyword start only, so "Ironworks" counts as
  // 'iron' while "Store" does not count as 'ore'.
  SECTOR_DEFS.forEach(s => { s.re = new RegExp(`\\b(${s.kw.join('|')})`); });
  // Last set handed to the map, so a resize can re-lay the treemap without a full reload.
  let lastSectorCompanies = [];
  // Last tile HTML actually written, so a poll that moved nothing skips the
  // ~100-element parse + layout entirely.
  let lastSectorHtml = null;

  function sectorOf(c) {
    const hay = `${c.name || ''} ${c.symbol || ''}`.toLowerCase();
    for (const s of SECTOR_DEFS) if (s.re.test(hay)) return s;
    return SECTOR_OTHER;
  }
  function sectorCap(c) {
    const cap = Number(c.marketCap) || 0;
    if (cap > 0) return cap;
    return Math.max(0, (Number(c.currentPrice) || 0) * (Number(c.sharesOutstanding) || 0));
  }

  // Squarified treemap: [{weight, e}] -> [{e, x, y, w, h}]
  function squarify(entries, x, y, w, h) {
    const rects = [];
    const items = entries.filter(e => e.weight > 0).sort((a, b) => b.weight - a.weight);
    const total = items.reduce((s, e) => s + e.weight, 0);
    if (!items.length || total <= 0 || w <= 1 || h <= 1) return rects;
    const scale = (w * h) / total;
    const rest = items.map(e => ({ e: e.e, area: e.weight * scale }));
    const worst = (row, side) => {
      const s = row.reduce((a, r) => a + r.area, 0);
      if (s <= 0 || side <= 0) return Infinity;
      const maxA = Math.max(...row.map(r => r.area));
      const minA = Math.min(...row.map(r => r.area));
      return Math.max((side * side * maxA) / (s * s), (s * s) / (side * side * minA));
    };
    let rx = x, ry = y, rw = w, rh = h;
    while (rest.length && rw > 1 && rh > 1) {
      const side = Math.min(rw, rh);
      const row = [rest.shift()];
      while (rest.length && worst(row.concat(rest[0]), side) <= worst(row, side)) row.push(rest.shift());
      const rowSum = row.reduce((a, r) => a + r.area, 0);
      if (rw >= rh) {
        const cw = Math.min(rw, rowSum / rh);
        let cy = ry;
        row.forEach(r => {
          const ch = cw > 0 ? Math.min(rh - (cy - ry), r.area / cw) : 0;
          if (ch > 0) rects.push({ e: r.e, x: rx, y: cy, w: cw, h: ch });
          cy += ch;
        });
        rx += cw; rw -= cw;
      } else {
        const chh = Math.min(rh, rowSum / rw);
        let cx = rx;
        row.forEach(r => {
          const cw2 = chh > 0 ? Math.min(rw - (cx - rx), r.area / chh) : 0;
          if (cw2 > 0) rects.push({ e: r.e, x: cx, y: ry, w: cw2, h: chh });
          cx += cw2;
        });
        ry += chh; rh -= chh;
      }
    }
    return rects;
  }

  function renderSectorMap(companies) {
    if (!els.sectorMap) return;
    lastSectorCompanies = companies;
    const map = els.sectorMap;
    const items = (companies || []).map(c => ({ c, cap: sectorCap(c) }));

    // One flat treemap of every company; sectors only colour the tiles and key the legend.
    const groups = new Map();
    items.forEach(i => {
      const s = sectorOf(i.c);
      if (!groups.has(s.key)) groups.set(s.key, { def: s, total: 0 });
      groups.get(s.key).total += i.cap;
    });
    const sectors = [...groups.values()].sort((a, b) => b.total - a.total);
    const grand = sectors.reduce((a, s) => a + s.total, 0) || 1;

    if (els.sectorMapSection) els.sectorMapSection.style.display = items.length ? '' : 'none';
    if (els.sectorMapLegend) {
      els.sectorMapLegend.innerHTML = sectors.map(s =>
        `<span class="sector-legend-item"><span class="sector-legend-swatch" style="background:${s.def.color};"></span>${s.def.label} ${Math.round((s.total / grand) * 100)}%</span>`
      ).join('');
    }
    if (els.sectorMapNote) {
      els.sectorMapNote.textContent = items.length
        ? 'Tile size = market cap · colour = sector · gold border = held · click a tile for details · sectors inferred from company names (the game API exposes no sector field)'
        : '';
    }

    const W = map.clientWidth, H = map.clientHeight;
    if (!items.length || W < 40 || H < 40) { map.innerHTML = ''; lastSectorHtml = ''; return; }

    const owned = new Set((currentHoldings || []).map(h => h.id));
    const cells = squarify(items.map(i => ({ weight: i.cap > 0 ? i.cap : 1, e: i })), 0, 0, W, H);
    let html = '';
    cells.forEach(r => {
      const c = r.e.c;
      const s = sectorOf(c);
      const x0 = Math.round(r.x), y0 = Math.round(r.y);
      const tw = Math.max(0, Math.round(r.x + r.w) - x0 - 2);
      const th = Math.max(0, Math.round(r.y + r.h) - y0 - 2);
      if (tw < 4 || th < 4) return;
      const size = tw >= 110 && th >= 72 ? 'xl' : tw >= 78 && th >= 40 ? 'lg' : tw >= 48 && th >= 26 ? 'md' : 'sm';
      const chg = Number(c.changePct) || 0;
      const capTxt = r.e.cap > 0 ? fmt(r.e.cap) : '—';
      const title = `${c.name} · ${s.label} · mkt cap ${capTxt} · $${(Number(c.currentPrice) || 0).toLocaleString()} · ${chg >= 0 ? '+' : ''}${chg.toFixed(2)}% · yield ${(Number(c.yieldPct) || 0).toFixed(1)}%`;
      html += `<div class="sector-tile ${size}${s.dark ? ' dark' : ''}${owned.has(c.id) ? ' owned' : ''}" data-id="${escapeText(String(c.id))}" title="${escapeText(title)}" style="left:${x0}px;top:${y0}px;width:${tw}px;height:${th}px;background:${s.color};">
        <span class="sector-tile-name">${escapeText(c.name)}</span>
        <span class="sector-tile-cap">${capTxt}</span>
        <span class="sector-tile-chg ${chg >= 0 ? 'up' : 'down'}">${chg >= 0 ? '▲ +' : '▼ '}${chg.toFixed(1)}%</span>
      </div>`;
    });
    if (html === lastSectorHtml) return;
    lastSectorHtml = html;
    map.innerHTML = html;
  }
  // Tile clicks are delegated from the map container (which persists across
  // rebuilds), so a re-lay never has to re-bind a listener per tile.
  if (els.sectorMap) {
    els.sectorMap.addEventListener('click', e => {
      const t = e.target.closest('.sector-tile');
      if (!t) return;
      const c = currentCompanies.find(x => String(x.id) === t.dataset.id);
      if (c) openDetail(c);
    });
  }

  /* ── Stock Market Info ─────────────────────────────────────────────
     Whole-market aggregates shown under the sector map, always computed
     over every listed company regardless of the chart filter: totals,
     the player's share of market cap, breadth, and a per-sector table.
     Both blocks are diffed against the last write — the 30s poll must not
     re-parse identical cards/rows while the tab sits open. */
  let lastMarketStatsHtml = null;
  let lastSectorTableHtml = null;
  function renderMarketStats() {
    if (!els.marketStats || !els.marketStatsSection) return;
    const companies = (currentCompanies || []).filter(c => sectorCap(c) > 0 || Number(c.currentPrice) > 0);
    if (!companies.length) {
      els.marketStatsSection.style.display = 'none';
      els.marketStats.innerHTML = '';
      if (els.marketSectorTable) els.marketSectorTable.innerHTML = '';
      if (els.marketStatsNote) els.marketStatsNote.textContent = '';
      lastMarketStatsHtml = '';
      lastSectorTableHtml = '';
      return;
    }
    els.marketStatsSection.style.display = '';

    const holdingValue = h => Number(h.value) || (Number(h.owned) || 0) * (Number(h.currentPrice) || 0);
    const heldById = new Map((currentHoldings || []).map(h => [String(h.id), h]));
    const sectorAgg = new Map();
    let totalCap = 0, totalShares = 0, totalHolders = 0, totalBacking = 0;
    let chgSum = 0, yieldCap = 0, gainers = 0, losers = 0;
    let topGainer = null, topLoser = null, largest = null;

    companies.forEach(c => {
      const cap = sectorCap(c);
      const chg = Number(c.changePct) || 0;
      totalCap += cap;
      totalShares += Number(c.sharesOutstanding) || 0;
      totalHolders += Number(c.holders) || 0;
      totalBacking += Number(c.backing) || 0;
      chgSum += chg;
      yieldCap += (Number(c.yieldPct) || 0) * cap;
      if (chg > 0) gainers++; else if (chg < 0) losers++;
      if (!topGainer || chg > topGainer.chg) topGainer = { name: c.name, chg };
      if (!topLoser || chg < topLoser.chg) topLoser = { name: c.name, chg };
      if (!largest || cap > largest.cap) largest = { name: c.name, cap };

      const s = sectorOf(c);
      if (!sectorAgg.has(s.key)) sectorAgg.set(s.key, { def: s, cap: 0, count: 0, you: 0 });
      const agg = sectorAgg.get(s.key);
      agg.cap += cap;
      agg.count++;
      const h = heldById.get(String(c.id));
      if (h) agg.you += holdingValue(h);
    });

    const holdings = (currentHoldings || []).filter(h => (Number(h.owned) || 0) > 0);
    const ownedValue = holdings.reduce((s, h) => s + holdingValue(h), 0);
    const ownShare = totalCap > 0 ? (ownedValue / totalCap) * 100 : 0;
    const avgChg = chgSum / companies.length;
    const mktYield = totalCap > 0 ? yieldCap / totalCap : 0;
    // Sub-0.01% stakes are typical early on, so keep four decimals rather than
    // rounding a real position down to "0.00%".
    const fmtShare = v => v >= 0.01 ? v.toFixed(2) + '%' : v > 0 ? v.toFixed(4) + '%' : '0.00%';
    const chgCls = v => v > 0 ? 'positive' : v < 0 ? 'negative' : '';
    const cards = [
      ['Total Market Cap', fmt(totalCap), ''],
      ['Your Share of Market Cap', fmtShare(ownShare), 'gold'],
      ['Your Holdings Value', fmt(ownedValue), ''],
      ['Listed Companies', fmtNum(companies.length), ''],
      ['Companies Owned', `${fmtNum(holdings.length)} / ${fmtNum(companies.length)}`, ''],
      ['24h Avg Change', `${avgChg >= 0 ? '+' : ''}${avgChg.toFixed(2)}%`, chgCls(avgChg)],
      ['Gainers / Losers', `${fmtNum(gainers)} / ${fmtNum(losers)}`, ''],
      ['Market Yield (cap-wtd)', fmtPct(mktYield), ''],
      ['Total Shares', fmtNum(totalShares), ''],
      ['Total Investors', fmtNum(totalHolders), ''],
      ['Total Backing', fmt(totalBacking), ''],
      [`Largest · ${largest.name}`, fmt(largest.cap), ''],
      [`Top Gainer · ${topGainer.name}`, `+${topGainer.chg.toFixed(2)}%`, 'positive'],
      [`Top Loser · ${topLoser.name}`, `${topLoser.chg.toFixed(2)}%`, 'negative']
    ];
    const statsHtml = cards.map(([label, value, cls]) =>
      `<div class="stat-card" title="${escapeText(label)}"><div class="stat-label">${escapeText(label)}</div><div class="stat-value ${cls}">${value}</div></div>`
    ).join('');
    if (statsHtml !== lastMarketStatsHtml) {
      lastMarketStatsHtml = statsHtml;
      els.marketStats.innerHTML = statsHtml;
    }

    if (els.marketSectorTable) {
      const sectors = [...sectorAgg.values()].sort((a, b) => b.cap - a.cap);
      const row = (name, count, cap, share, you, stake, cls) => `<div class="market-sector-row${cls}">
        <span>${name}</span>
        <span class="num">${count}</span>
        <span class="num">${cap}</span>
        <span class="num">${share}</span>
        <span class="num${you !== '—' ? ' you' : ''}">${you}</span>
        <span class="num${you !== '—' ? ' you' : ''}">${stake}</span>
      </div>`;
      const tableHtml =
        row('Sector', 'Cos', 'Market Cap', 'Share', 'Your Value', 'Your Stake', ' market-sector-head-row') +
        sectors.map(s => row(
          `<span class="sec-swatch" style="background:${s.def.color};"></span>${escapeText(s.def.label)}`,
          fmtNum(s.count),
          fmt(s.cap),
          (totalCap > 0 ? (s.cap / totalCap) * 100 : 0).toFixed(1) + '%',
          s.you > 0 ? fmt(s.you) : '—',
          s.you > 0 ? fmtShare(s.cap > 0 ? (s.you / s.cap) * 100 : 0) : '—',
          ''
        )).join('') +
        row('<span class="sec-swatch" style="background:var(--gold);"></span>TOTAL', fmtNum(companies.length), fmt(totalCap), '100.0%', fmt(ownedValue), fmtShare(ownShare), ' market-sector-total-row');
      if (tableHtml !== lastSectorTableHtml) {
        lastSectorTableHtml = tableHtml;
        els.marketSectorTable.innerHTML = tableHtml;
      }
    }
    if (els.marketStatsNote) {
      els.marketStatsNote.textContent = 'Market totals cover every listed company, independent of the chart filter · your stake = portfolio value at current prices ÷ total market cap';
    }
  }

  // Render Analytics (Advanced Charts)
  function renderAnalytics(companies) {
    const analyticsPanel = document.getElementById('panel-analytics');
    if (!analyticsPanel || !analyticsPanel.classList.contains('active')) return;

    // Market-wide totals — independent of the chart filter, so they render
    // even when the filter leaves the map/charts with nothing to show.
    renderMarketStats();

    const filterVal = els.analyticsCompanyFilter?.value || 'all';
    let filtered = companies.filter(c => c.spark && c.spark.length > 1);
    if (filterVal === 'owned') {
      const ownedIds = new Set(currentHoldings.map(h => h.id));
      filtered = filtered.filter(c => ownedIds.has(c.id));
    }

    if (!filtered.length) {
      renderSectorMap([]);
      clearChartGrid();
      els.analyticsEmpty.style.display = 'block';
      return;
    }
    els.analyticsEmpty.style.display = 'none';
    renderSectorMap(filtered);

    if (!lwLoaded) {
      loadLightweightCharts().then(() => {
        lwLoaded = true;
        drawCharts(filtered);
      }).catch(e => {
        console.error('[Babylon] Failed to load charts', e);
        els.analyticsEmpty.style.display = 'block';
      });
    } else {
      drawCharts(filtered);
    }

    function drawCharts(companies) {
      const chartType = els.analyticsChartType?.value || 'candlestick';
      const tf = els.analyticsTimeframe?.value || '24h';
      const fulltab = document.body.classList.contains('fulltab') ? 1 : 0;
      // Structure key: which companies, in which order, drawn how. Prices are
      // deliberately excluded — a price tick must only refit series data, never
      // tear down and rebuild every LightweightCharts instance.
      const sig = `${chartType}|${tf}|${fulltab}|${companies.map(c => c.id).join(',')}`;

      // Same structure → the cards already in the grid are the right ones. Push
      // the fresh numbers into them and leave the DOM (and every mounted chart)
      // exactly where it is.
      const reusable = sig === chartsSignature
        && chartCompanyById.size === companies.length
        && companies.every(c => !!document.getElementById(`chart-${c.id}`));
      if (reusable) {
        companies.forEach(c => refreshChartCard(c));
        return;
      }
      clearChartGrid();
      chartsSignature = sig;
      startChartBuild(sig, companies);
    }
  }

  // Tear down every chart card and instance, drop the observer and any queued
  // mount or dispose work, so nothing can resurrect a chart for a dead grid.
  function clearChartGrid() {
    if (chartObserver) { chartObserver.disconnect(); chartObserver = null; }
    chartMountQueue.length = 0;
    chartDisposeTimers.forEach(t => clearTimeout(t));
    chartDisposeTimers.clear();
    Object.keys(chartInstances).forEach(id => {
      if (chartInstances[id].chart) chartInstances[id].chart.remove();
      delete chartInstances[id];
    });
    chartCompanyById = new Map();
    chartSizeCache.width = 0;
    els.analyticsChartsGrid.innerHTML = '';
    chartsSignature = '';
  }

  // A LightweightCharts instance costs several canvases and a few ms to build,
  // so at real market size the grid only keeps instances for the cards near the
  // viewport: the shells go in with one DOM write, an observer rooted on the
  // scroll host mounts what is in range, and cards that scroll far out release
  // theirs. A 60-company grid then holds ~6 live charts instead of 60.
  const CHART_MOUNT_MARGIN = '1500px 0px';
  const CHART_DISPOSE_GRACE_MS = 900;

  function currentChartType() { return els.analyticsChartType?.value || 'candlestick'; }

  function measuredChartSize() {
    if (!chartSizeCache.width) {
      const wrap = els.analyticsChartsGrid.querySelector('.chart-canvas-wrap');
      chartSizeCache.width = wrap?.clientWidth || 0;
      chartSizeCache.height = wrap?.clientHeight || (document.body.classList.contains('fulltab') ? 364 : 284);
    }
    return chartSizeCache;
  }

  function startChartBuild(sig, companies) {
    if (typeof LightweightCharts === 'undefined') return;
    els.analyticsChartsGrid.innerHTML = companies.map(chartCardHtml).join('');
    chartCompanyById = new Map(companies.map(c => [c.id, c]));
    chartSizeCache.width = 0;
    const observer = ensureChartObserver();
    els.analyticsChartsGrid.querySelectorAll('.chart-card').forEach(card => observer.observe(card));
    attachChartClicks();
  }

  function ensureChartObserver() {
    if (chartObserver) return chartObserver;
    chartObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.dataset.chartId;
        if (!id) return;
        entry.target.dataset.near = entry.isIntersecting ? '1' : '';
        if (entry.isIntersecting) {
          const timer = chartDisposeTimers.get(id);
          if (timer) { clearTimeout(timer); chartDisposeTimers.delete(id); }
          queueChartMount(id);
        } else if (chartInstances[id] && !chartDisposeTimers.has(id)) {
          // Grace period: a one-row overshoot or a scroll jitter at the band
          // edge must not dispose a chart the user is about to scroll back to.
          chartDisposeTimers.set(id, setTimeout(() => {
            chartDisposeTimers.delete(id);
            if (entry.target.dataset.near !== '1') unmountChart(id);
          }, CHART_DISPOSE_GRACE_MS));
        }
      });
    }, { root: document.querySelector('.main') || null, rootMargin: CHART_MOUNT_MARGIN, threshold: 0 });
    return chartObserver;
  }

  // Mounts run in short slices: one observer batch can hand over a screenful of
  // cards, and building them all in a single task would drop the frame.
  function queueChartMount(id) {
    if (chartInstances[id] || chartMountQueue.includes(id)) return;
    chartMountQueue.push(id);
    if (chartMountDraining) return;
    chartMountDraining = true;
    const slice = () => {
      const deadline = performance.now() + 14;
      while (chartMountQueue.length && performance.now() < deadline) mountChart(chartMountQueue.shift());
      if (chartMountQueue.length) setTimeout(slice, 0);
      else chartMountDraining = false;
    };
    slice();
  }

  function mountChart(id) {
    const company = chartCompanyById.get(id);
    const card = document.getElementById(`chart-${id}`)?.closest('.chart-card');
    if (!company || !card || chartInstances[id] || card.dataset.near !== '1') return;
    const size = measuredChartSize();
    if (!size.width) return;
    createChartFor(company, currentChartType(), size.width, size.height);
  }

  function unmountChart(id) {
    const inst = chartInstances[id];
    if (!inst) return;
    delete chartInstances[id];
    const card = inst.card || document.getElementById(`chart-${id}`)?.closest('.chart-card');
    if (card) { delete card.dataset.mounted; card.classList.add('chart-idle'); }
    try { inst.chart.remove(); } catch (e) { /* already removed */ }
  }

  let lwScriptPromise = null;
  function loadLightweightCharts() {
    if (!lwScriptPromise) {
      lwScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('lib/lightweight-charts.standalone.production.js');
        script.onload = () => { console.log('[Babylon] Lightweight Charts loaded'); resolve(); };
        script.onerror = () => reject(new Error('Failed to load Lightweight Charts'));
        document.head.appendChild(script);
      });
    }
    return lwScriptPromise;
  }

  // Parse the charts library during idle time after first paint: opening the
  // Advanced Analytics or Holdings tab later then only pays chart-creation
  // cost, not a ~450KB parse on the click.
  setTimeout(() => {
    if (!lwLoaded) loadLightweightCharts().then(() => { lwLoaded = true; }).catch(() => {});
  }, 1500);

  // Stable pseudo-random in [0,1) seeded by a string: synthesized candle wicks
  // stay identical between refreshes so in-place updates don't shimmer.
  function seededUnit(key) {
    let h = 2166136261;
    for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
    h ^= h >>> 15; h = Math.imul(h, 2246822519); h ^= h >>> 13;
    return (h >>> 0) / 4294967296;
  }

  // Spark values are hourly closes with no timestamps of their own, so they are
  // anchored to the current hour: the axis stays stable within an hour, which is
  // what lets a refresh call series.setData() instead of recreating the chart.
  function buildChartSeriesData(company, chartTypeOverride) {
    const chartType = chartTypeOverride || els.analyticsChartType?.value || 'candlestick';
    const tf = els.analyticsTimeframe?.value || '24h';
    const tfHours = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 };
    const maxPoints = tfHours[tf] || 24;
    const fullSpark = company.spark || [];
    const spark = fullSpark.length > maxPoints ? fullSpark.slice(-maxPoints) : fullSpark;
    const anchor = Math.floor(Date.now() / 3600000) * 3600;
    const data = [];
    for (let i = 0; i < spark.length; i++) {
      const close = spark[i];
      const time = anchor - (spark.length - 1 - i) * 3600;
      if (chartType === 'candlestick') {
        const prevClose = i > 0 ? spark[i-1] : close;
        const open = prevClose;
        const high = Math.max(open, close) * (1 + seededUnit(company.id + 'h' + i) * 0.005);
        const low = Math.min(open, close) * (1 - seededUnit(company.id + 'l' + i) * 0.005);
        data.push({time, open, high, low, close});
      } else {
        data.push({time, value: close});
      }
    }
    return data;
  }

  // What the series would be built from: chart shape, timeframe, the hour
  // anchor, and the spark itself. Unchanged → the canvas is left alone, so a
  // poll where nothing moved costs no chart redraws at all.
  function chartDataSig(company) {
    const tf = els.analyticsTimeframe?.value || '24h';
    return `${currentChartType()}|${tf}|${Math.floor(Date.now() / 3600000)}|${(company.spark || []).join(',')}`;
  }

  // In-place refresh of a chart card: same structure, new numbers. The header
  // updates for every card; only mounted cards touch a chart instance, and the
  // rest pick the fresh company up from chartCompanyById when they mount.
  function refreshChartCard(company) {
    chartCompanyById.set(company.id, company);
    try {
      const priceEl = document.getElementById(`price-${company.id}`);
      if (priceEl) priceEl.textContent = '$' + company.currentPrice.toLocaleString();
      const changeEl = document.getElementById(`change-${company.id}`);
      if (changeEl) {
        changeEl.textContent = `${company.changePct >= 0 ? '+' : ''}${company.changePct.toFixed(2)}%`;
        changeEl.className = `chart-change ${company.changePct >= 0 ? 'positive' : 'negative'}`;
      }
      const yieldEl = document.getElementById(`yield-${company.id}`);
      if (yieldEl) yieldEl.textContent = `Yield: ${company.yieldPct.toFixed(2)}%`;

      const inst = chartInstances[company.id];
      if (!inst) return;
      const sig = chartDataSig(company);
      if (sig === inst.dataSig) return;
      inst.dataSig = sig;
      const data = buildChartSeriesData(company);
      inst.series.setData(data);
      const spanKey = data.length ? `${data[0].time}|${data[data.length - 1].time}` : '';
      // Only refit when the time window itself shifted (hour rollover, new
      // point); otherwise the user's zoom/pan survives the refresh.
      if (spanKey !== inst.spanKey) {
        inst.spanKey = spanKey;
        inst.chart.timeScale().fitContent();
      }
    } catch (e) {
      console.error('[Babylon] Chart update error for', company.name, e);
    }
  }

  function chartCardHtml(company) {
    return `
      <div class="chart-card chart-idle" data-chart-id="${company.id}">
        <div class="chart-header">
          <div>
            <div class="chart-title">${company.name}</div>
            <div class="chart-symbol">${company.symbol}</div>
          </div>
          <div style="text-align:right">
            <div class="chart-price" id="price-${company.id}">$${company.currentPrice.toLocaleString()}</div>
            <div class="chart-change ${company.changePct >= 0 ? 'positive' : 'negative'}" id="change-${company.id}">${company.changePct >= 0 ? '+' : ''}${company.changePct.toFixed(2)}%</div>
            <div class="chart-yield" id="yield-${company.id}">Yield: ${company.yieldPct.toFixed(2)}%</div>
          </div>
        </div>
        <div class="chart-canvas-wrap">
          <div id="chart-${company.id}" style="width:100%;height:100%;"></div>
        </div>
      </div>`;
  }

  function createChartFor(company, chartType, width, height) {
    const chartContainer = document.getElementById(`chart-${company.id}`);
    if (!chartContainer || typeof LightweightCharts === 'undefined') {
      console.error('[Babylon] Chart container or LightweightCharts not available');
      return;
    }
    const card = chartContainer.closest('.chart-card');

    try {
      const chart = LightweightCharts.createChart(chartContainer, {
        layout: {background: {type: 'solid', color: '#121212'}, textColor: '#E8E6E1'},
        grid: {vertLines: {color: '#232323'}, horzLines: {color: '#232323'}},
        rightPriceScale: {borderColor: '#232323', scaleMargins: {top: 0.1, bottom: 0.1}},
        timeScale: {borderColor: '#232323', timeVisible: true, secondsVisible: false},
        crosshair: {mode: LightweightCharts.CrosshairMode.Normal, vertLine: {color: '#3A3A3F', width: 1, style: 2}, horzLine: {color: '#3A3A3F', width: 1, style: 2}},
        handleScroll: {mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true},
        handleScale: {mouseWheel: true, pinch: true, axisPressedMouseMove: {time: true, price: true}},
        width,
        height,
      });

      let series;
      const data = buildChartSeriesData(company, chartType);

      // Create appropriate series type
      if (chartType === 'candlestick') {
        series = chart.addCandlestickSeries({
          upColor: '#4ade80', downColor: '#f87171',
          borderUpColor: '#4ade80', borderDownColor: '#f87171',
          wickUpColor: '#4ade80', wickDownColor: '#f87171',
          priceFormat: {type: 'price', precision: 2, minMove: 0.01},
        });
      } else if (chartType === 'line') {
        series = chart.addLineSeries({
          color: '#4ade80',
          lineWidth: 2,
          priceFormat: {type: 'price', precision: 2, minMove: 0.01},
        });
      } else if (chartType === 'area') {
        series = chart.addAreaSeries({
          topColor: 'rgba(74, 222, 128, 0.4)',
          bottomColor: 'rgba(74, 222, 128, 0.0)',
          lineColor: '#4ade80',
          lineWidth: 2,
          priceFormat: {type: 'price', precision: 2, minMove: 0.01},
        });
      }

      series.setData(data);
      chart.timeScale().fitContent();

      chartInstances[company.id] = {chart, series, card, chartContainer, dataSig: chartDataSig(company), spanKey: data.length ? `${data[0].time}|${data[data.length - 1].time}` : ''};
      if (card) { card.classList.remove('chart-idle'); card.dataset.mounted = '1'; }
    } catch (e) {
      console.error('[Babylon] Chart error for', company.name, e);
    }
  }

  // Render Orders
  function renderOrders(orders) {
    currentOrders = orders;
    if (!orders.length) { els.ordersBody.innerHTML = ''; els.ordersEmpty.style.display = 'block'; return; }
    els.ordersEmpty.style.display = 'none';
    els.ordersBody.innerHTML = orders.map(o => `<tr data-order-id="${o.id || ''}">
      <td>${o.name || o.companyName || o.companyId || '—'}</td>
      <td><span class="txn-type order">${(o.side || '').toUpperCase()}</span></td>
      <td>$${Number(o.price || 0).toLocaleString()}</td>
      <td>${fmtNum(o.qty)}</td>
      <td>${fmtNum(o.filled)}</td>
      <td>${timeAgo(o.createdAt)}</td>
    </tr>`).join('');
  }

  // Render Transactions
  function renderTransactions(txns) {
    if (!txns.length) {
      els.transactionsBody.innerHTML = '';
      els.transactionsEmpty.style.display = 'block';
      const hint = document.getElementById('transactionsEmptyHint');
      if (hint) {
        hint.textContent = 'Trade activity will appear here';
        // An empty list on a stale build looks identical to a quiet portfolio —
        // say which one it is.
        chrome.storage.local.get(['babylon_build'], r => {
          if (!r.babylon_build && els.transactionsEmpty.style.display === 'block') {
            hint.innerHTML = '<span style="color:#f87171;">Detection engine not loaded — reload the extension at opera://extensions</span>';
          }
        });
      }
      return;
    }
    els.transactionsEmpty.style.display = 'none';
    const companyById = new Map(currentCompanies.map(c => [c.id, c]));
    els.transactionsBody.innerHTML = txns.slice().reverse().map(t => {
      const c = companyById.get(t.companyId);
      const name = c ? c.name : (t.name || t.companyId || t.listingId || '—');
      const qty = t.qty != null ? t.qty : t.quantity;
      const price = t.price != null ? `$${Number(t.price).toLocaleString()}` : '—';
      let cls = '', total = '', tcls = '';
      if (t.type === 'BUY') { cls='buy'; total=`-${fmt(t.cost)}`; tcls='negative'; }
      else if (t.type === 'SELL') { cls='sell'; total=`+${fmt(t.proceeds)}`; tcls='positive'; }
      else if (t.type === 'DIVIDEND') { cls='dividend'; total=`+${fmt(t.totalDividend)}`; tcls='positive'; }
      else if (t.type === 'IPO_BUY') { cls='buy'; total=`-${fmt((Number(t.price)||0) * (Number(qty)||0))}`; tcls='negative'; }
      else { cls='order'; total=`${t.side || ''}`; tcls=''; }
      return `<tr>
        <td><span class="txn-type ${cls}">${t.type}</span></td>
        <td>${name}</td>
        <td>${fmtNum(qty)}</td>
        <td>${price}</td>
        <td class="${tcls}">${total}</td>
        <td>${timeAgo(t.timestamp)}</td>
      </tr>`;
    }).join('');
  }

  // Render IPO offerings
  function renderIpo(offerings) {
    currentIpoOfferings = offerings;
    if (!offerings.length) { els.ipoList.innerHTML = ''; els.ipoEmpty.style.display = 'block'; return; }
    els.ipoEmpty.style.display = 'none';
    els.ipoList.innerHTML = offerings.map(o => `
      <div class="ipo-item">
        <div class="ipo-row"><span class="ipo-name">${o.name}</span><span>${o.listingId.slice(0,8)}</span></div>
        <div class="ipo-row"><span>Floor Price</span><span>$${o.floorPrice.toLocaleString()}</span></div>
        <div class="ipo-row"><span>Shares Offered</span><span>${fmtNum(o.sharesOffered)}</span></div>
        <div class="ipo-row"><span>Float (bps)</span><span>${o.floatBps}</span></div>
        <div class="ipo-row"><span>Book Value</span><span>${fmt(o.bookValueAtFiling)}</span></div>
        <div class="ipo-row"><span>Demand</span><span>${fmtNum(o.demand)} shares (${o.bidders} bidders)</span></div>
        <div class="ipo-row"><span>Ends</span><span>${new Date(o.endsAt).toLocaleString()}</span></div>
        ${o.yourBid ? `<div class="ipo-row"><span class="detail-value gold">Your Bid: ${fmtNum(o.yourBid.qty)} @ $${o.yourBid.price.toLocaleString()}</span></div>` : ''}
      </div>
    `).join('');

  }


  // Render summary cards
  function renderSummary(totalValue, holdings, ordersCount) {
    let expectedAnnual = 0;
    if (Array.isArray(holdings)) {
      for (const h of holdings) {
        expectedAnnual += h.owned * (h.currentPrice * h.yieldPct / 100);
      }
    }
    tweenNumber(els.totalValue, totalValue, fmt);
    tweenNumber(els.expectedAnnualDiv, expectedAnnual, fmt);
    tweenNumber(els.holdingsCount, holdings.length, fmtCount);
    tweenNumber(els.ordersCount, ordersCount, fmtCount);

    // Calculate 24h portfolio value change
    if (els.totalValueProgress && Array.isArray(holdings) && holdings.length > 0) {
      const companyById = new Map(currentCompanies.map(c => [c.id, c]));
      const portfolioHistory = {};
      const maxPoints = 24; // 24 hours
      
      for (const h of holdings) {
        const company = companyById.get(h.id);
        if (!company || !company.spark || company.spark.length < 2) continue;
        
        const spark = company.spark.length > maxPoints ? company.spark.slice(-maxPoints) : company.spark;
        const now = Date.now();
        
        for (let i = 0; i < spark.length; i++) {
          const time = Math.floor((now - (spark.length - 1 - i) * 3600 * 1000) / 1000);
          const value = h.owned * spark[i];
          if (!portfolioHistory[time]) portfolioHistory[time] = 0;
          portfolioHistory[time] += value;
        }
      }

      const data = Object.entries(portfolioHistory)
        .map(([time, value]) => ({ time: parseInt(time), value }))
        .sort((a, b) => a.time - b.time);

      if (data.length >= 2) {
        const startValue = data[0].value;
        const endValue = data[data.length - 1].value;
        const change = endValue - startValue;
        const changePct = (change / startValue) * 100;
        const isPositive = change >= 0;
        
        els.totalValueProgress.style.display = 'block';
        els.totalValueProgress.style.color = isPositive ? '#4ade80' : '#f87171';
        els.totalValueProgress.textContent = `${isPositive ? '▲' : '▼'} ${Math.abs(changePct).toFixed(2)}%`;
      } else {
        els.totalValueProgress.style.display = 'none';
      }
    } else if (els.totalValueProgress) {
      els.totalValueProgress.style.display = 'none';
    }
  }

  // Load all data. The background broadcasts PORTFOLIO_UPDATED on a 30s tick
  // (and again on the game tab's heartbeat), so an unchanged payload skips the
  // whole render pass — re-rendering identical data is pure churn.
  let loadInFlight = null;
  function loadData(opts) {
    // One fetch at a time: a tab click racing the open-time load (or the tick)
    // must not fire a second three-request fetch storm at the game API. A
    // forced load (Refresh button, post-trade) chains behind an in-flight one
    // so it still gets its own fresh fetch.
    const force = !!(opts && opts.force);
    if (!loadInFlight) {
      loadInFlight = loadDataNow(force).finally(() => { loadInFlight = null; });
    } else if (force) {
      const run = () => loadDataNow(true);
      loadInFlight = loadInFlight.then(run, run).finally(() => { loadInFlight = null; });
    }
    return loadInFlight;
  }

  // Only the visible tab is rendered per load; the rest are marked dirty and
  // rendered from the cached payload when their tab is opened. Rebuilding all
  // seven data panels every 30s — six of them hidden — was most of the
  // periodic jank.
  const DATA_TABS = ['overview', 'holdings', 'dividends', 'analytics', 'orders', 'transactions', 'ipo'];
  const dirtyTabs = new Set();
  let lastData = null;
  function activeTabId() {
    return document.querySelector('.tab-btn.active')?.dataset.tab || 'overview';
  }
  function renderTab(tab) {
    if (!lastData) return;
    const { companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings } = lastData;
    switch (tab) {
      case 'overview': renderOverview(companies, holdings); break;
      case 'holdings': renderHoldings(holdings); break;
      case 'dividends': renderDividends(companies, dividends, totalDividends, holdings); break;
      case 'analytics': renderAnalytics(companies); break;
      case 'orders': renderOrders(orders); break;
      case 'transactions': renderTransactions(transactions); break;
      case 'ipo': renderIpo(ipoOfferings); break;
    }
    dirtyTabs.delete(tab);
  }
  function renderVisiblePanels() {
    const tab = activeTabId();
    DATA_TABS.forEach(t => { if (t !== tab) dirtyTabs.add(t); });
    if (DATA_TABS.includes(tab)) renderTab(tab);
  }

  // First paint only: if the worker takes longer than a blink, hold the table
  // behind pixel skeletons rather than an empty state that reads as "no data".
  const SKELETON_COLS = { overview: 7, holdings: 9 };
  let skeletonTimer = null;
  function paintSkeletons() {
    document.body.dataset.skeleton = '1';
    const tab = activeTabId();
    const cols = SKELETON_COLS[tab];
    if (!cols) return;
    const tbody = tab === 'overview' ? els.overviewBody : els.holdingsBody;
    const emptyEl = tab === 'overview' ? els.overviewEmpty : els.holdingsEmpty;
    if (emptyEl) emptyEl.style.display = 'none';
    paintSkeletonRows(tbody, cols);
  }
  function clearSkeletons() {
    if (!document.body.dataset.skeleton) return;
    delete document.body.dataset.skeleton;
    const tab = activeTabId();
    if (SKELETON_COLS[tab]) {
      const tbody = tab === 'overview' ? els.overviewBody : els.holdingsBody;
      if (tbody) tbody.innerHTML = '';
    }
  }

  async function loadDataNow(force) {
    if (!lastData && !reducedMotion) skeletonTimer = setTimeout(paintSkeletons, 180);
    try {
      const resp = await sendMessage({ type: 'GET_PORTFOLIO', force: !!force });
      clearTimeout(skeletonTimer); skeletonTimer = null;
      if (!resp.success) { clearSkeletons(); markRevalidating(false); showToast('Load failed: ' + resp.error, 'error'); return; }
      // Paint first, catch up behind: a stale reply is the snapshot while the
      // worker refetches. The PORTFOLIO_UPDATED broadcast reloads this view.
      markRevalidating(!!resp.stale);
      const data = resp.data;
      lastLoadAt = Date.now();
      const { companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings } = data;
      // Signature covers only what the popup renders — the payload used to be
      // stringified whole, including the raw API dump, on every tick.
      const sig = JSON.stringify([companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings]);
      if (sig === lastLoadSignature) { clearSkeletons(); return; }
      lastLoadSignature = sig;
      lastData = {
        companies, holdings, totalValue, dividends, totalDividends,
        transactions: transactions || [], orders: orders || [], ipoOfferings: ipoOfferings || []
      };
      // State reads happen from every panel (sector map owned-set, detail
      // overlay, market stats), so they update even while a tab is hidden.
      currentTransactions = lastData.transactions;
      currentHoldings = holdings;
      currentOrders = lastData.orders;
      currentIpoOfferings = lastData.ipoOfferings;
      populateCompanies(companies);
      // Called from the load path, not from populateCompanies: the read-only
      // builds strip that function down to its state assignment.
      renderTape();
      renderSummary(totalValue, holdings, lastData.orders.length);
      renderVisiblePanels();
      clearSkeletons();
    } catch (e) {
      clearTimeout(skeletonTimer); skeletonTimer = null;
      clearSkeletons();
      markRevalidating(false);
      console.error(e); showToast('Load error: ' + e.message, 'error');
    }
  }

  els.refreshBtn.addEventListener('click', () => withBusy(els.refreshBtn, async () => {
    await loadData({ force: true });
    showToast('Refreshed', 'info');
  }));


  // Analytics Refresh
  els.analyticsRefreshBtn.addEventListener('click', () => withBusy(els.analyticsRefreshBtn, async () => {
    await loadData({ force: true });
    showToast('Analytics refreshed', 'info');
  }));

  // Timeframe change — re-render charts with sliced data
  els.analyticsTimeframe.addEventListener('change', () => {
    renderAnalytics(currentCompanies);
  });

  // Chart type change — re-render charts
  els.analyticsChartType.addEventListener('change', () => {
    renderAnalytics(currentCompanies);
  });

  // Company filter change — re-render charts
  if (els.analyticsCompanyFilter) {
    els.analyticsCompanyFilter.addEventListener('change', () => {
      renderAnalytics(currentCompanies);
    });
  }

  // Portfolio chart timeframe change
  if (els.portfolioChartTimeframe) {
    els.portfolioChartTimeframe.addEventListener('change', () => {
      renderPortfolioChart();
    });
  }

  // Click a column header to sort (filter) that table by the column
  function attachTableSort(table) {
    if (!table) return;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;
    thead.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const toAsc = th.classList.contains('sorted-desc');
        thead.querySelectorAll('th.sortable').forEach(x => x.classList.remove('sorted-asc', 'sorted-desc'));
        th.classList.add(toAsc ? 'sorted-asc' : 'sorted-desc');
        const allRows = Array.from(tbody.querySelectorAll('tr'));
        // Check if this table has sector headers (market tab).
        const hasSectorHeaders = allRows.some(r => r.classList.contains('market-sector-header'));
        if (hasSectorHeaders) {
          // Group rows by sector: header + its data rows, sort data rows within each group.
          const groups = [];
          let currentGroup = null;
          allRows.forEach(r => {
            if (r.classList.contains('market-sector-header')) {
              currentGroup = { header: r, dataRows: [] };
              groups.push(currentGroup);
            } else if (currentGroup) {
              currentGroup.dataRows.push(r);
            }
          });
          groups.forEach(g => {
            g.dataRows.sort((a, b) => {
              if (key === 'name') {
                const av = (a.dataset.name || '').toLowerCase();
                const bv = (b.dataset.name || '').toLowerCase();
                return toAsc ? av.localeCompare(bv) : bv.localeCompare(av);
              }
              const av = parseFloat(a.dataset[key] || 0);
              const bv = parseFloat(b.dataset[key] || 0);
              return toAsc ? av - bv : bv - av;
            });
          });
          // Re-append in order: header, then its sorted data rows.
          groups.forEach(g => {
            tbody.appendChild(g.header);
            g.dataRows.forEach(r => tbody.appendChild(r));
          });
        } else {
          // Original flat sort for tables without sector headers.
          allRows.sort((a, b) => {
            if (key === 'name') {
              const av = (a.dataset.name || '').toLowerCase();
              const bv = (b.dataset.name || '').toLowerCase();
              return toAsc ? av.localeCompare(bv) : bv.localeCompare(av);
            }
            const av = parseFloat(a.dataset[key] || 0);
            const bv = parseFloat(b.dataset[key] || 0);
            return toAsc ? av - bv : bv - av;
          });
          allRows.forEach(r => tbody.appendChild(r));
        }
        if (table.closest('#panel-overview')) {
          overviewSortState = { key, asc: toAsc };
        } else if (table.closest('#panel-holdings')) {
          holdingsSortState = { key, asc: toAsc };
        }
      });
    });
  }
  attachTableSort(els.overviewBody.closest('table'));
  attachTableSort(els.holdingsBody.closest('table'));

  // Search boxes for Overview and Holdings (Esc clears)
  function wireSearch(input, tbody, emptyEl, onTerm) {
    if (!input) return;
    input.addEventListener('input', () => {
      onTerm(input.value);
      applySearch(tbody, emptyEl, input.value);
    });
    input.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      input.value = '';
      onTerm('');
      applySearch(tbody, emptyEl, '');
    });
  }
  wireSearch(els.overviewSearch, els.overviewBody, els.overviewEmpty, v => { overviewSearchTerm = v; });
  wireSearch(els.holdingsSearch, els.holdingsBody, els.holdingsEmpty, v => { holdingsSearchTerm = v; });

  // Overview quick filter (Top Share Value = market cap, Top Yield)
  const overviewFilter = document.getElementById('overviewFilter');
  if (overviewFilter) {
    overviewFilterValue = overviewFilter.value || 'value';
    overviewFilter.addEventListener('change', () => {
      overviewFilterValue = overviewFilter.value;
      const key = overviewFilter.value === 'value' ? 'mcap' : overviewFilter.value;
      const rows = Array.from(document.querySelectorAll('#overviewBody tr'));
      rows.sort((a, b) => {
        const aVal = parseFloat(a.dataset[key] || 0);
        const bVal = parseFloat(b.dataset[key] || 0);
        return bVal - aVal;
      });
      const tbody = document.getElementById('overviewBody');
      tbody.innerHTML = '';
      rows.forEach(r => tbody.appendChild(r));
    });
  }

  // Tab switch handler for analytics
  els.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Panels skipped while hidden render from the cached payload on open.
      if (dirtyTabs.has(btn.dataset.tab)) renderTab(btn.dataset.tab);
      if (btn.dataset.tab === 'analytics') {
        // Render straight from cached data so the panel is never blank while a
        // fetch round-trips; refetch only when the last load is stale — the 30s
        // tick and its broadcast keep the payload fresh, and every
        // GET_PORTFOLIO costs three live game-API fetches plus a detection pass.
        setTimeout(() => {
          renderAnalytics(currentCompanies);
          if (Date.now() - lastLoadAt > 10000) loadData();
        }, 50);
      } else if (btn.dataset.tab === 'holdings') {
        setTimeout(() => renderPortfolioChart(), 50);
      } else if (btn.dataset.tab === 'settings') {
        setTimeout(() => loadDetectionStatus(), 50);
      } else if (btn.dataset.tab === 'market') {
        setTimeout(() => ensureMarketData(), 50);
      } else if (btn.dataset.tab === 'economy') {
        setTimeout(() => ensureEconomyData(), 50);
      }
    });
  });

  // Shows which detection build the background worker is running. If these
  // markers are missing entirely, the loaded extension predates the fix and
  // needs a Reload at opera://extensions.
  function loadDetectionStatus() {
    const box = document.getElementById('detectStatus');
    if (!box) return;
    chrome.storage.local.get(['babylon_build', 'babylon_diag'], result => {
      const build = result.babylon_build;
      const diag = result.babylon_diag;
      const line = (label, value, color) =>
        `<div style="display:flex;justify-content:space-between;gap:10px;"><span>${label}</span><span style="color:${color};">${value}</span></div>`;
      if (!build || !diag) {
        box.style.borderColor = 'var(--red,#f87171)';
        box.innerHTML =
          line('Engine', 'NOT LOADED', '#f87171') +
          line('Build', build ? build.version : 'none', '#f87171') +
          `<div style="margin-top:6px;color:#f87171;">Reload the extension at opera://extensions to activate the current build.</div>`;
        return;
      }
      const fresh = diag.lastRunAt && (Date.now() - diag.lastRunAt) < 10 * 60 * 1000;
      box.style.borderColor = '';
      box.innerHTML =
        line('Engine', 'ACTIVE', '#4ade80') +
        line('Build', build.version, 'var(--bone,#e8e6e3)') +
        line('Last check', diag.lastRunAt ? timeAgo(diag.lastRunAt) : 'pending', fresh ? '#4ade80' : '#facc15') +
        line('Watching', `${diag.holdings ?? '—'} holdings · ${diag.orders ?? '—'} orders · ${diag.ipoBids ?? '—'} IPO bids`, 'var(--bone-muted,#9a968f)') +
        (diag.baseline ? line('Baseline', 'recorded — trades from now on will be detected', '#facc15') : '') +
        line('Events logged', String(diag.events ?? 0), 'var(--bone,#e8e6e3)') +
        (diag.lastError ? `<div style="margin-top:6px;color:#f87171;word-break:break-word;">⚠ ${diag.lastError}</div>` : '');
    });
  }
  loadDetectionStatus();

  // Remote Access Functions
  function showRemoteStatus(msg, ok) {
    if (!els.remoteStatus) return;
    els.remoteStatus.style.display = 'block';
    els.remoteStatus.className = `status-msg ${ok ? 'success' : 'error'}`;
    els.remoteStatus.textContent = msg;
    setTimeout(() => { els.remoteStatus.style.display = 'none'; }, 5000);
  }

  function generateRemoteToken() {
    return 'bp-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async function loadRemoteAccessSettings() {
    return new Promise(resolve => {
      chrome.storage.local.get(['remoteAccessEnabled', 'remoteToken', 'remoteApiUrl'], result => {
        resolve({
          enabled: result.remoteAccessEnabled === true,
          token: result.remoteToken || '',
          apiUrl: result.remoteApiUrl || ''
        });
      });
    });
  }

  async function updateRemoteAccessUI() {
    const settings = await loadRemoteAccessSettings();
    if (els.remoteAccessEnabled) els.remoteAccessEnabled.checked = settings.enabled;
    if (els.remoteApiUrl) els.remoteApiUrl.value = settings.apiUrl;
    if (els.remoteLinkContainer) {
      els.remoteLinkContainer.style.display = settings.enabled && settings.token && settings.apiUrl ? 'block' : 'none';
    }
    if (els.remoteLinkUrl && settings.token && settings.apiUrl) {
      const hostedUrl = settings.apiUrl.replace(/\/$/, '') + `/?token=${settings.token}`;
      els.remoteLinkUrl.value = hostedUrl;
    }
  }

  if (els.remoteAccessEnabled) {
    els.remoteAccessEnabled.addEventListener('change', async () => {
      const enabled = els.remoteAccessEnabled.checked;
      if (enabled) {
        let settings = await loadRemoteAccessSettings();
        if (!settings.apiUrl) {
          showRemoteStatus('Enter your Vercel API URL first', false);
          els.remoteAccessEnabled.checked = false;
          return;
        }
        chrome.storage.local.set({ remoteAccessEnabled: true, remoteApiUrl: settings.apiUrl });
        try {
          const resp = await sendMessage({ type: 'SETUP_REMOTE_TOKEN' });
          if (resp?.success && resp.token) {
            showRemoteStatus('Remote access enabled & token created', true);
          } else {
            const token = generateRemoteToken();
            await chrome.storage.local.set({ remoteToken: token });
            showRemoteStatus('Remote access enabled (local token)', true);
          }
        } catch (e) {
          const token = generateRemoteToken();
          await chrome.storage.local.set({ remoteToken: token });
          showRemoteStatus('Remote access enabled (local token fallback)', true);
        }
      } else {
        chrome.storage.local.set({ remoteAccessEnabled: false });
        showRemoteStatus('Remote access disabled', true);
      }
      await updateRemoteAccessUI();
    });
  }

  if (els.remoteApiUrl) {
    els.remoteApiUrl.addEventListener('change', async () => {
      const url = els.remoteApiUrl.value.trim().replace(/\/$/, '');
      els.remoteApiUrl.value = url;
      await chrome.storage.local.set({ remoteApiUrl: url });
      showRemoteStatus('API URL saved', true);
      await updateRemoteAccessUI();
    });
  }

  if (els.copyRemoteLinkBtn) {
    els.copyRemoteLinkBtn.addEventListener('click', async () => {
      const url = els.remoteLinkUrl?.value || '';
      if (!url) return showRemoteStatus('No link to copy', false);
      try {
        await navigator.clipboard.writeText(url);
        showRemoteStatus('Link copied to clipboard', true);
      } catch (err) {
        showRemoteStatus('Failed to copy link', false);
      }
    });
  }

  if (els.openRemoteLinkBtn) {
    els.openRemoteLinkBtn.addEventListener('click', () => {
      const url = els.remoteLinkUrl?.value || '';
      if (!url) return showRemoteStatus('No link to open', false);
      chrome.tabs.create({ url });
    });
  }

  if (els.regenerateRemoteLinkBtn) {
    els.regenerateRemoteLinkBtn.addEventListener('click', async () => {
      const settings = await loadRemoteAccessSettings();
      if (!settings.apiUrl) return showRemoteStatus('Set API URL first', false);
      try {
        const resp = await sendMessage({ type: 'SETUP_REMOTE_TOKEN' });
        if (resp?.success && resp.token) {
          els.remoteLinkUrl.value = settings.apiUrl.replace(/\/$/, '') + `/?token=${resp.token}`;
          showRemoteStatus('Link regenerated', true);
          await updateRemoteAccessUI();
        } else {
          throw new Error('No token from server');
        }
      } catch (e) {
        const token = generateRemoteToken();
        await chrome.storage.local.set({ remoteToken: token });
        els.remoteLinkUrl.value = settings.apiUrl.replace(/\/$/, '') + `/?token=${token}`;
        showRemoteStatus('Link regenerated (local token)', true);
        await updateRemoteAccessUI();
      }
    });
  }

  // Load remote access settings on startup
  updateRemoteAccessUI();

  chrome.runtime.onMessage.addListener(m => { if (m.type === 'PORTFOLIO_UPDATED') loadData(); });

  // Full browser-tab mode: enlarge layout when the popup is opened as a tab
  function applyFullTabMode() {
    if (window.innerWidth > 820) document.body.classList.add('fulltab');
    else document.body.classList.remove('fulltab');
  }
  applyFullTabMode();

  const openTabBtn = document.getElementById('openTabBtn');
  if (openTabBtn) {
    openTabBtn.addEventListener('click', () => {
      if (chrome.tabs?.create) chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
    });
  }

  // Keep charts fitted to their containers when the window resizes
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    const wasFull = document.body.classList.contains('fulltab');
    applyFullTabMode();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // A resize invalidates the cached card size; mounted charts are resized
      // in place, and cards that mount later re-measure.
      chartSizeCache.width = 0;
      Object.values(chartInstances).forEach(inst => {
        if (inst.chart && inst.chartContainer) {
          inst.chart.resize(inst.chartContainer.clientWidth, inst.chartContainer.clientHeight);
        }
      });
      // The treemap is laid out in pixels, so it has to be re-laid whenever its
      // container changes size (popup <-> full tab, or any window resize).
      if (document.getElementById('panel-analytics')?.classList.contains('active')) {
        renderSectorMap(lastSectorCompanies);
      }
      // Column count changed between popup/full-tab → re-render analytics if visible
      if (wasFull !== document.body.classList.contains('fulltab')) {
        if (document.getElementById('panel-analytics')?.classList.contains('active')) loadData();
      }
      if (document.getElementById('panel-economy')?.classList.contains('active')) renderEconomyFlow();
      // The tape's crawl is measured in pixels from the live font size, and
      // full-tab raises it, so the sets have to be re-fitted to cover again.
      if (els.marketTape.style.display !== 'none') fitTape();
    }, 150);
  });

  /* ── Market Analysis ──────────────────────────────────────────────
     Read-only listing of every commodity on the exchange. The scan itself runs
     in the background worker and publishes progress plus the finished snapshot
     to storage, so the popup only polls and renders — closing it mid-scan is
     harmless, and a completed scan renders instantly on later opens. */
  let currentMarketScan = null;
  let marketPollTimer = null;
  let marketStaleTimer = null;
  let marketFilterValue = 'all';
  let marketSectorFilter = 'all';
  let marketSearchTerm = '';
  let marketViewMode = 'table'; // 'table' or 'map'

  /* Commodity sectors: the game API exposes no category field, so items are
     classified by keywords in their label/id. Layout groups items by sector,
     sorted by 24h volume within each sector. */
  const COMMODITY_SECTOR_DEFS = [
    { key: 'resources', label: 'Raw Resources', color: '#8e9296', kw: ['ore','wood','stone','sand','clay','dirt','rock','mineral','raw','log','timber','lumber','iron','copper','gold','silver','coal'] },
    { key: 'agriculture', label: 'Agriculture', color: '#6fae4e', kw: ['wheat','corn','rice','barley','oat','soy','cotton','sugar','coffee','tea','cocoa','fruit','vegetable','potato','tomato','apple','berry','grain','crop','farm','food','meat','fish','milk','egg','wool','leather','hide','tobacco','spice','herb','rubber'] },
    { key: 'energy', label: 'Energy', color: '#d9a441', kw: ['oil','gas','petrol','fuel','coal','power','energy','solar','wind','nuclear','uranium','plutonium','battery','cell'] },
    { key: 'materials', label: 'Materials', color: '#bf6b3a', kw: ['steel','cement','concrete','brick','glass','plastic','chemical','chem','fiber','fabric','textile','cloth','paper','pulp','aluminum','aluminium','copper','wire','pipe','beam','plate','sheet','metal','alloy'] },
    { key: 'goods', label: 'Consumer Goods', color: '#cf6fa8', kw: ['bread','flour','beer','wine','liquor','alcohol','clothing','cloth','garment','furniture','chair','table','tool','weapon','ammo','bullet','explosive','medicine','drug','pharma','health','electronics','device','machine','part','component'] },
    { key: 'luxury', label: 'Luxury', color: '#a07fd8', kw: ['jewel','diamond','gem','art','painting','sculpture','luxury','premium','rare','exotic','perfume','watch','jewelry','gold','silver','platinum'] },
  ];
  const COMMODITY_SECTOR_OTHER = { key: 'other', label: 'Other', color: '#4d4d56', kw: [], dark: true };
  COMMODITY_SECTOR_DEFS.forEach(s => { s.re = new RegExp(`\\b(${s.kw.join('|')})`, 'i'); });

  function commoditySectorOf(item) {
    const hay = `${item.label || ''} ${item.id || ''} ${item.kind || ''}`.toLowerCase();
    for (const s of COMMODITY_SECTOR_DEFS) if (s.re.test(hay)) return s;
    return COMMODITY_SECTOR_OTHER;
  }

  function marketMetrics(item) {
    const book = item.book || {};
    const bids = Array.isArray(book.bids) ? book.bids : [];
    const asks = Array.isArray(book.asks) ? book.asks : [];
    const bestBid = bids.length ? Math.max(...bids.map(b => Number(b.price) || 0)) : 0;
    const bestAsk = asks.length ? Math.min(...asks.map(a => Number(a.price) || 0)) : 0;
    const depth = list => list.reduce((s, x) => s + (Number(x.qty) || 0), 0);
    const value = list => list.reduce((s, x) => s + (Number(x.price) || 0) * (Number(x.qty) || 0), 0);
    const hist = item.history || {};
    return {
      bids, asks, bestBid, bestAsk,
      bidDepth: depth(bids), askDepth: depth(asks),
      bidValue: value(bids), askValue: value(asks),
      base: Number(book.base) || 0,
      spread: book.spread == null ? 0 : Number(book.spread),
      npcBid: book.npcBid == null ? null : Number(book.npcBid),
      npcAsk: book.npcAsk == null ? null : Number(book.npcAsk),
      held: Number(book.youHold) || 0,
      trend: Number(hist.trendPct) || 0,
      volume: Number(hist.volume) || 0,
      last: hist.last == null ? null : Number(hist.last),
      points: Array.isArray(hist.points) ? hist.points : [],
      bucketMin: Number(hist.bucketMin) || 0,
      firstBucketMs: Number(hist.firstBucketMs) || 0
    };
  }

  function marketRowHtml(item) {
    const n = marketMetrics(item);
    const dayClass = item.dayPct >= 0 ? 'positive' : 'negative';
    const trendClass = n.trend >= 0 ? 'positive' : 'negative';
    const tags = (n.held > 0 ? `<span class="market-tag held">Held ${fmtNum(n.held)}</span>` : '')
      + (item.flat ? '<span class="market-tag flat">Flat</span>' : '');
    const npc = v => v == null ? '<span style="color:var(--bone-muted);">—</span>' : fmt(v);
    const sector = commoditySectorOf(item);
    return `<tr data-id="${escapeText(item.id)}" data-name="${escapeText(String(item.label).toLowerCase())}"
      data-price="${item.price}" data-daypct="${item.dayPct}" data-base="${n.base}" data-spread="${n.spread}"
      data-npcbid="${n.npcBid == null ? -1 : n.npcBid}" data-npcask="${n.npcAsk == null ? -1 : n.npcAsk}"
      data-bestbid="${n.bestBid}" data-biddepth="${n.bidDepth}" data-bestask="${n.bestAsk}"
      data-askdepth="${n.askDepth}" data-trend="${n.trend}" data-volume="${n.volume}" data-held="${n.held}"
      data-hasasks="${n.asks.length ? 1 : 0}" data-hasbids="${n.bids.length ? 1 : 0}"
      data-npc="${n.npcBid != null || n.npcAsk != null ? 1 : 0}" data-flat="${item.flat ? 1 : 0}"
      data-sector="${sector.key}">
      <td><span class="market-name-cell">${escapeText(item.label)}</span>${tags}<span class="market-kind">${escapeText(item.id)}</span></td>
      <td>${fmt(item.price)}</td>
      <td class="change-cell ${dayClass}">${item.dayPct >= 0 ? '+' : ''}${item.dayPct.toFixed(2)}%</td>
      <td>${fmt(n.base)}</td>
      <td>${fmt(n.spread)}</td>
      <td>${npc(n.npcBid)}</td>
      <td>${npc(n.npcAsk)}</td>
      <td class="change-cell positive">${n.bestBid ? fmt(n.bestBid) : '—'}</td>
      <td>${n.bidDepth ? fmtNum(n.bidDepth) : '—'}</td>
      <td class="change-cell negative">${n.bestAsk ? fmt(n.bestAsk) : '—'}</td>
      <td>${n.askDepth ? fmtNum(n.askDepth) : '—'}</td>
      <td class="change-cell ${trendClass}">${n.trend >= 0 ? '+' : ''}${n.trend.toFixed(2)}%</td>
      <td>${n.volume ? fmtNum(n.volume) : '—'}</td>
      <td>${n.held ? fmtNum(n.held) : '—'}</td>
    </tr>`;
  }

  function renderMarketSummary() {
    if (!els.marketSummary) return;
    const scan = currentMarketScan;
    if (!scan) { els.marketSummary.innerHTML = ''; return; }
    const items = scan.items || [];
    const metrics = items.map(marketMetrics);
    const sellers = metrics.filter(n => n.asks.length).length;
    const buyers = metrics.filter(n => n.bids.length).length;
    const held = metrics.filter(n => n.held > 0).length;
    const npc = metrics.filter(n => n.npcBid != null || n.npcAsk != null).length;
    const askValue = metrics.reduce((s, n) => s + n.askValue, 0);
    const bidValue = metrics.reduce((s, n) => s + n.bidValue, 0);
    const cards = [
      ['Items Listed', fmtNum(items.length)],
      ['Has Sellers', fmtNum(sellers)],
      ['Has Buyers', fmtNum(buyers)],
      ['You Hold', fmtNum(held)],
      ['NPC Quoted', fmtNum(npc)],
      ['Ask Value', fmt(askValue)],
      ['Bid Value', fmt(bidValue)],
      ['Failures', fmtNum(scan.errors || 0)]
    ];
    els.marketSummary.innerHTML = cards.map(([label, value]) =>
      `<div class="stat-card"><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`
    ).join('');
  }

  function applyMarketFilter() {
    if (!els.marketBody) return 0;
    const needle = marketSearchTerm.trim().toLowerCase();
    let visible = 0;
    const sectorHeaderVisibility = new Map();
    // First pass: determine which item rows match the filter.
    els.marketBody.querySelectorAll('tr:not(.market-sector-header)').forEach(row => {
      const d = row.dataset;
      let match = !needle || (d.name || '').includes(needle) || (d.id || '').toLowerCase().includes(needle);
      if (match && marketFilterValue === 'asks') match = d.hasasks === '1';
      else if (match && marketFilterValue === 'bids') match = d.hasbids === '1';
      else if (match && marketFilterValue === 'held') match = Number(d.held) > 0;
      else if (match && marketFilterValue === 'npc') match = d.npc === '1';
      else if (match && marketFilterValue === 'flat') match = d.flat === '1';
      // Sector filter.
      if (match && marketSectorFilter !== 'all') match = d.sector === marketSectorFilter;
      row.style.display = match ? '' : 'none';
      if (match) {
        visible++;
        const sec = d.sector;
        sectorHeaderVisibility.set(sec, true);
      }
    });
    // Second pass: show/hide sector headers based on whether any items in that sector are visible.
    els.marketBody.querySelectorAll('tr.market-sector-header').forEach(header => {
      const sec = header.dataset.sector;
      header.style.display = sectorHeaderVisibility.has(sec) ? '' : 'none';
    });
    if (els.marketEmpty) {
      const hasRows = els.marketBody.querySelectorAll('tr:not(.market-sector-header)').length > 0;
      els.marketEmpty.style.display = hasRows && visible === 0 ? 'block' : 'none';
    }
    // Only update treemap if in map view and container is visible.
    if (marketViewMode === 'map' && els.marketMapWrap && els.marketMapWrap.style.display !== 'none') {
      renderMarketTreemap();
    }
    return visible;
  }

  function renderMarket() {
    if (!els.marketBody) return;
    const scan = currentMarketScan;
    if (!scan || !Array.isArray(scan.items) || !scan.items.length) {
      els.marketBody.innerHTML = '';
      if (els.marketSummary) els.marketSummary.innerHTML = '';
      if (els.marketEmpty) els.marketEmpty.style.display = 'none';
      if (els.marketTreemap) els.marketTreemap.innerHTML = '<div style="padding:20px;text-align:center;color:var(--bone-muted);">No market data</div>';
      return;
    }
    // Populate sector filter dropdown with sectors that have items.
    if (els.marketSectorFilter) {
      const sectorCounts = new Map();
      scan.items.forEach(item => {
        const s = commoditySectorOf(item);
        sectorCounts.set(s.key, (sectorCounts.get(s.key) || 0) + 1);
      });
      const opts = ['<option value="all">All Sectors</option>'];
      COMMODITY_SECTOR_DEFS.forEach(s => {
        if (sectorCounts.has(s.key)) {
          opts.push(`<option value="${s.key}">${s.label} (${sectorCounts.get(s.key)})</option>`);
        }
      });
      if (sectorCounts.has(COMMODITY_SECTOR_OTHER.key)) {
        opts.push(`<option value="${COMMODITY_SECTOR_OTHER.key}">Other (${sectorCounts.get(COMMODITY_SECTOR_OTHER.key)})</option>`);
      }
      els.marketSectorFilter.innerHTML = opts.join('');
      // Restore the current selection if it still exists.
      if (marketSectorFilter !== 'all' && !sectorCounts.has(marketSectorFilter)) {
        marketSectorFilter = 'all';
      }
      els.marketSectorFilter.value = marketSectorFilter;
    }
    // Sort by sector, then by 24h volume (descending) within each sector.
    const sectorOrder = new Map(COMMODITY_SECTOR_DEFS.map((s, i) => [s.key, i]));
    sectorOrder.set(COMMODITY_SECTOR_OTHER.key, COMMODITY_SECTOR_DEFS.length);
    const sorted = [...scan.items].sort((a, b) => {
      const sa = commoditySectorOf(a), sb = commoditySectorOf(b);
      const oi = (sectorOrder.get(sa.key) || 99) - (sectorOrder.get(sb.key) || 99);
      if (oi !== 0) return oi;
      const va = marketMetrics(a).volume, vb = marketMetrics(b).volume;
      return vb - va;
    });
    // Build HTML with sector header rows.
    let html = '';
    let lastSector = null;
    sorted.forEach(item => {
      const sector = commoditySectorOf(item);
      if (sector.key !== lastSector) {
        const sectorItems = sorted.filter(i => commoditySectorOf(i).key === sector.key);
        const totalVol = sectorItems.reduce((s, i) => s + marketMetrics(i).volume, 0);
        const avgChange = sectorItems.reduce((s, i) => s + (Number(i.dayPct) || 0), 0) / sectorItems.length;
        html += `<tr class="market-sector-header" data-sector="${sector.key}">
          <td colspan="14">
            <span class="sector-swatch" style="background:${sector.color};"></span>
            <span class="sector-label">${sector.label}</span>
            <span class="sector-count">${sectorItems.length} items</span>
            <span class="sector-stats">Vol ${fmtNum(totalVol)} · Avg ${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%</span>
          </td>
        </tr>`;
        lastSector = sector.key;
      }
      html += marketRowHtml(item);
    });
    els.marketBody.innerHTML = html;
    renderMarketSummary();
    applyMarketFilter();
    renderEconomyPulse();
    // Only render treemap if in map view and container is visible.
    if (marketViewMode === 'map' && els.marketMapWrap && els.marketMapWrap.style.display !== 'none') {
      renderMarketTreemap();
    }
  }

  // Treemap layout: binary slice-and-dice with near-half splits.
  function treemapLayout(items, x, y, w, h) {
    const total = items.reduce((s, i) => s + i.value, 0);
    if (!items.length || total <= 0 || w <= 0 || h <= 0) return [];
    const rects = [];
    function layout(list, x, y, w, h, total) {
      if (!list.length || w <= 0 || h <= 0) return;
      if (list.length === 1) {
        rects.push({ item: list[0], x, y, w, h });
        return;
      }
      // Find the split point closest to half the total. Never take the whole
      // list (that would recurse with identical arguments forever).
      let sum = 0, splitIdx = 0;
      for (let i = 0; i < list.length - 1; i++) {
        sum += list[i].value;
        if (sum >= total / 2) { splitIdx = i + 1; break; }
      }
      if (splitIdx === 0) splitIdx = 1;
      const left = list.slice(0, splitIdx);
      const right = list.slice(splitIdx);
      let leftTotal = left.reduce((s, i) => s + i.value, 0);
      let rightTotal = total - leftTotal;
      // Degenerate weights (all zero on one side): split evenly by count.
      if (leftTotal <= 0 || rightTotal <= 0) {
        leftTotal = left.length;
        rightTotal = right.length;
        total = list.length;
      }
      const isHorizontal = w >= h;
      if (isHorizontal) {
        const leftW = (leftTotal / total) * w;
        layout(left, x, y, leftW, h, leftTotal);
        layout(right, x + leftW, y, w - leftW, h, rightTotal);
      } else {
        const leftH = (leftTotal / total) * h;
        layout(left, x, y, w, leftH, leftTotal);
        layout(right, x, y + leftH, w, h - leftH, rightTotal);
      }
    }
    layout(items, x, y, w, h, total);
    return rects;
  }

  function changeColor(pct) {
    if (pct > 2) return '#00ff00';
    if (pct > 0) return '#90ee90';
    if (pct === 0) return '#808080';
    if (pct > -2) return '#ff9999';
    return '#ff0000';
  }

  function renderMarketTreemap() {
    const container = els.marketTreemap;
    if (!container) return;
    const scan = currentMarketScan;
    if (!scan || !Array.isArray(scan.items) || !scan.items.length) {
      container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--bone-muted);">No market data</div>';
      return;
    }
    // Group items by sector.
    const sectorGroups = new Map();
    scan.items.forEach(item => {
      const sector = commoditySectorOf(item);
      if (!sectorGroups.has(sector.key)) sectorGroups.set(sector.key, { sector, items: [] });
      sectorGroups.get(sector.key).items.push(item);
    });
    // Sort sectors by total volume.
    const sectors = Array.from(sectorGroups.values()).map(sg => {
      const totalVol = sg.items.reduce((s, i) => s + marketMetrics(i).volume, 0);
      return { ...sg, totalVol };
    }).sort((a, b) => b.totalVol - a.totalVol);
    // Apply filters.
    const needle = marketSearchTerm.trim().toLowerCase();
    const filteredSectors = sectors.map(sg => {
      const items = sg.items.filter(item => {
        let match = !needle || (item.label || '').toLowerCase().includes(needle) || (item.id || '').toLowerCase().includes(needle);
        if (match && marketSectorFilter !== 'all') match = commoditySectorOf(item).key === marketSectorFilter;
        return match;
      });
      return { ...sg, items };
    }).filter(sg => sg.items.length > 0);
    // Layout sectors.
    const rect = container.getBoundingClientRect();
    const W = rect.width || 800;
    const H = rect.height || 500;
    const totalVol = filteredSectors.reduce((s, sg) => s + sg.totalVol, 0);
    if (totalVol <= 0) {
      container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--bone-muted);">No volume data</div>';
      return;
    }
    const sectorRects = treemapLayout(filteredSectors.map(sg => ({ sg, value: sg.totalVol })), 0, 0, W, H);
    let html = '';
    sectorRects.forEach(({ item: sgItem, x, y, w, h }) => {
      const sg = sgItem.sg;
      html += `<div class="treemap-sector" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-color:${sg.sector.color};">`;
      if (w > 60 && h > 20) {
        html += `<div class="treemap-sector-label" style="color:${sg.sector.color};">${sg.sector.label}</div>`;
      }
      // Layout items within sector, biggest volume first.
      const volOf = i => marketMetrics(i).volume || 0;
      const sorted = sg.items.slice().sort((a, b) => volOf(b) - volOf(a));
      const itemRects = treemapLayout(sorted.map(i => ({ item: i, value: volOf(i) || 1 })), 0, 0, w, h);
      itemRects.forEach(({ item: iItem, x: ix, y: iy, w: iw, h: ih }) => {
        const item = iItem.item;
        const metrics = marketMetrics(item);
        const dayPct = Number(item.dayPct) || 0;
        const color = changeColor(dayPct);
        const showLabel = iw > 40 && ih > 15;
        const showPrice = iw > 50 && ih > 25;
        html += `<div class="treemap-item" data-id="${escapeText(item.id)}" style="left:${ix}px;top:${iy}px;width:${iw}px;height:${ih}px;background:${color};">`;
        if (showLabel) html += `<div class="treemap-item-name">${escapeText(item.label)}</div>`;
        if (showPrice) {
          html += `<div class="treemap-item-price">${fmt(metrics.last || item.price)}</div>`;
          html += `<div class="treemap-item-change">${dayPct >= 0 ? '+' : ''}${dayPct.toFixed(2)}%</div>`;
        }
        html += `</div>`;
      });
      html += `</div>`;
    });
    container.innerHTML = html;
    // Click handlers for items.
    container.querySelectorAll('.treemap-item').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.id) openMarketDetail(el.dataset.id);
      });
    });
  }

  function showMarketStatus(html, isError) {
    if (!els.marketScanStatus) return;
    els.marketScanStatus.innerHTML = html;
    els.marketScanStatus.className = 'market-status' + (isError ? ' error' : '');
    els.marketScanStatus.style.display = 'block';
  }

  // The popup is re-read from disk on every open, but a service worker keeps the
  // build it was loaded with until the extension is reloaded, so a fresh popup
  // can be talking to a worker that predates the market scan and answers with a
  // bare "Unknown".
  function marketStaleHint(resp) {
    const err = resp && resp.error ? String(resp.error) : '';
    if (!resp || /^Unknown/.test(err)) return 'background script is out of date — reload the extension at opera://extensions, then reopen this popup.';
    return err || 'no response';
  }

  function showMarketProgress(progress) {
    const done = progress?.done || 0;
    const total = progress?.total || 0;
    const pct = total ? Math.round((done / total) * 100) : 0;
    showMarketStatus(
      `<div class="market-status-head"><span class="market-status-title">Scanning exchange…</span>
        <span>${fmtNum(done)} / ${fmtNum(total)} requests · ${pct}%</span></div>
      <div class="market-progress-track"><div class="market-progress-fill" style="width:${pct}%"></div></div>`,
      false
    );
  }

  function stopMarketPolling() {
    if (marketPollTimer) { clearInterval(marketPollTimer); marketPollTimer = null; }
  }

  function setMarketScanning(busy) {
    if (!els.marketScanBtn) return;
    els.marketScanBtn.disabled = busy;
    els.marketScanBtn.classList.toggle('busy', busy);
    els.marketScanBtn.textContent = busy ? 'Scanning…' : 'Scan Market';
  }

  function startMarketPolling() {
    stopMarketPolling();
    setMarketScanning(true);
    marketPollTimer = setInterval(async () => {
      let resp;
      try { resp = await sendMessage({ type: 'GET_MARKET_SCAN' }); }
      catch (e) { return; }
      if (!resp?.success) return;
      const { scan, progress } = resp.data || {};
      if (progress?.running) {
        showMarketProgress(progress);
        return;
      }
      stopMarketPolling();
      setMarketScanning(false);
      if (progress?.error) showMarketStatus(`Scan failed: ${escapeText(progress.error)}`, true);
      else if (scan) {
        currentMarketScan = scan;
        renderMarket();
        showMarketStatus(`Scanned <strong>${fmtNum(scan.itemCount)}</strong> items in ${(scan.durationMs / 1000).toFixed(1)}s · ${new Date(scan.scannedAt).toLocaleTimeString()}${scan.errors ? ` · ${scan.errors} item(s) failed` : ''}`, false);
        setTimeout(() => { if (els.marketScanStatus && !marketPollTimer) els.marketScanStatus.style.display = 'none'; }, 6000);
      } else {
        showMarketStatus('Scan finished without data', true);
      }
    }, 700);
  }

  async function startMarketScan() {
    const resp = await sendMessage({ type: 'SCAN_MARKET' });
    if (!resp?.success) { showMarketStatus('Could not start scan: ' + escapeText(marketStaleHint(resp)), true); return; }
    if (resp.data?.running) showMarketStatus('A scan is already running…', false);
    else showMarketStatus('Starting scan…', false);
    startMarketPolling();
  }

  async function ensureMarketData() {
    stopMarketPolling();
    if (marketStaleTimer) { clearTimeout(marketStaleTimer); marketStaleTimer = null; }
    let resp;
    try { resp = await sendMessage({ type: 'GET_MARKET_SCAN' }); }
    catch (e) { resp = null; }
    if (!resp?.success) { showMarketStatus('Could not read cached scan: ' + escapeText(marketStaleHint(resp)), true); return; }
    const { scan, progress } = resp.data || {};
    if (scan) { currentMarketScan = scan; renderMarket(); }

    if (progress?.running) {
      const age = Date.now() - (progress.startedAt || 0);
      if (age > 180000) {
        showMarketStatus('Previous scan was interrupted — run a new scan.', true);
        setMarketScanning(false);
      } else {
        showMarketProgress(progress);
        startMarketPolling();
      }
      return;
    }
    if (!scan) { await startMarketScan(); return; }
    if (progress?.error) { showMarketStatus(`Last scan failed: ${escapeText(progress.error)}`, true); return; }
    showMarketStatus(`Cached scan · <strong>${fmtNum(scan.itemCount)}</strong> items · ${timeAgo(scan.scannedAt)} · ${scan.errors ? `${scan.errors} failed` : 'no failures'}`, false);
    marketStaleTimer = setTimeout(() => { if (els.marketScanStatus) els.marketScanStatus.style.display = 'none'; }, 6000);
  }

  function openMarketDetail(itemId) {
    const item = (currentMarketScan?.items || []).find(m => m.id === itemId);
    if (!item || !els.marketDetailOverlay) return;
    // Unhide first: drawSpark sizes the canvas from clientWidth, which is 0
    // while the overlay is still display:none.
    els.marketDetailOverlay.classList.remove('hidden');
    els.marketDetailOverlay.classList.remove('closing');
    renderMarketDetail(item);
  }

  function renderMarketDetail(item) {
    const n = marketMetrics(item);
    els.marketDetailName.textContent = item.label;
    els.marketDetailSub.textContent = `${item.id}${item.kind ? ' · ' + item.kind : ''}`;
    els.marketDetailPrice.textContent = fmt(item.price);
    els.marketDetailChange.className = 'detail-value ' + (item.dayPct >= 0 ? 'positive' : 'negative');
    els.marketDetailChange.textContent = `${item.dayPct >= 0 ? '+' : ''}${item.dayPct.toFixed(2)}% today`;

    const cell = (label, value, cls) =>
      `<div class="detail-item"><div class="detail-label">${label}</div><div class="detail-value${cls ? ' ' + cls : ''}">${value}</div></div>`;
    els.marketDetailGrid.innerHTML = [
      cell('Ticker Price', fmt(item.price)),
      cell('24h Change', `${item.dayPct >= 0 ? '+' : ''}${item.dayPct.toFixed(2)}%`, item.dayPct >= 0 ? 'positive' : 'negative'),
      cell('Base Price', fmt(n.base)),
      cell('Quoted Spread', fmt(n.spread)),
      cell('NPC Bid', n.npcBid == null ? '—' : fmt(n.npcBid)),
      cell('NPC Ask', n.npcAsk == null ? '—' : fmt(n.npcAsk)),
      cell('Best Bid', n.bestBid ? fmt(n.bestBid) : '—', 'positive'),
      cell('Best Ask', n.bestAsk ? fmt(n.bestAsk) : '—', 'negative'),
      cell('Bid Depth', n.bidDepth ? fmtNum(n.bidDepth) : '—'),
      cell('Ask Depth', n.askDepth ? fmtNum(n.askDepth) : '—'),
      cell('Bid Value', fmt(n.bidValue)),
      cell('Ask Value', fmt(n.askValue)),
      cell('You Hold', n.held ? fmtNum(n.held) : '—', n.held ? 'gold' : ''),
      cell('Price vs Base', n.base ? `${(((item.price - n.base) / n.base) * 100).toFixed(2)}%` : '—')
    ].join('');

    if (n.points.length > 1) drawSpark(els.marketDetailSpark, n.points, n.trend >= 0 ? '#4ade80' : '#f87171');
    else els.marketDetailSpark.getContext('2d').clearRect(0, 0, els.marketDetailSpark.width, els.marketDetailSpark.height);

    els.marketDetailHistoryMeta.innerHTML = [
      cell('Trend', `${n.trend >= 0 ? '+' : ''}${n.trend.toFixed(2)}%`, n.trend >= 0 ? 'positive' : 'negative'),
      cell('24h Volume', n.volume ? fmtNum(n.volume) : '—'),
      cell('Buckets', fmtNum(n.points.length)),
      cell('Bucket Size', n.bucketMin ? `${n.bucketMin} min` : '—'),
      cell('Last Bucket', n.last == null ? '—' : fmt(n.last)),
      cell('First Bucket', n.firstBucketMs ? new Date(n.firstBucketMs).toLocaleTimeString() : '—')
    ].join('');

    els.marketDetailBookMeta.innerHTML = n.bids.length || n.asks.length
      ? `Levels: <strong>${n.bids.length}</strong> bids / <strong>${n.asks.length}</strong> asks &nbsp;|&nbsp; Best Bid: <strong>${n.bestBid ? fmt(n.bestBid) : '—'}</strong> &nbsp;|&nbsp; Best Ask: <strong>${n.bestAsk ? fmt(n.bestAsk) : '—'}</strong>`
      : 'No open orders on the book';

    const bookRows = (list, cls, empty) => list.length
      ? list.slice().sort((a, b) => cls === 'positive' ? Number(b.price) - Number(a.price) : Number(a.price) - Number(b.price))
          .map(l => `<tr><td class="change-cell ${cls}">${fmt(Number(l.price))}</td><td>${fmtNum(l.qty)}</td><td>${fmt((Number(l.price) || 0) * (Number(l.qty) || 0))}</td></tr>`).join('')
      : `<tr><td colspan="3" style="text-align:center;color:var(--bone-muted);padding:12px;">${empty}</td></tr>`;
    els.marketDetailBids.innerHTML = bookRows(n.bids, 'positive', 'No bids');
    els.marketDetailAsks.innerHTML = bookRows(n.asks, 'negative', 'No asks');

    els.marketDetailHistoryPoints.innerHTML = n.points.length
      ? n.points.map(p => `<span class="history-point">${fmt(Number(p))}</span>`).join('')
      : '<span class="history-point">No history points</span>';
  }

  if (els.marketBody) {
    els.marketBody.addEventListener('click', e => {
      const row = e.target.closest('tr');
      if (row?.dataset.id) openMarketDetail(row.dataset.id);
    });
    els.marketBody.style.cursor = 'pointer';
    attachTableSort(els.marketBody.closest('table'));
  }
  if (els.marketSearch) {
    els.marketSearch.addEventListener('input', () => { marketSearchTerm = els.marketSearch.value; applyMarketFilter(); });
    els.marketSearch.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      els.marketSearch.value = '';
      marketSearchTerm = '';
      applyMarketFilter();
    });
  }
  if (els.marketFilter) {
    els.marketFilter.addEventListener('change', () => { marketFilterValue = els.marketFilter.value; applyMarketFilter(); });
  }
  if (els.marketSectorFilter) {
    els.marketSectorFilter.addEventListener('change', () => { marketSectorFilter = els.marketSectorFilter.value; applyMarketFilter(); if (marketViewMode === 'map' && els.marketMapWrap && els.marketMapWrap.style.display !== 'none') renderMarketTreemap(); });
  }
  // View toggle (table/map).
  const viewBtns = document.querySelectorAll('.view-btn');
  if (viewBtns.length) {
    // Set initial active state based on marketViewMode.
    viewBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.view === marketViewMode);
    });
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        marketViewMode = btn.dataset.view;
        if (els.marketMapWrap) els.marketMapWrap.style.display = marketViewMode === 'map' ? 'block' : 'none';
        if (els.marketTableWrap) els.marketTableWrap.style.display = marketViewMode === 'table' ? 'block' : 'none';
        if (marketViewMode === 'map') {
          // Force layout so getBoundingClientRect returns correct dimensions.
          if (els.marketMapWrap) els.marketMapWrap.offsetHeight;
          renderMarketTreemap();
        }
      });
    });
  }
  if (els.marketScanBtn) {
    els.marketScanBtn.addEventListener('click', () => startMarketScan());
  }
  if (els.marketDetailClose) {
    els.marketDetailClose.addEventListener('click', () => closeOverlay(els.marketDetailOverlay));
    els.marketDetailOverlay.addEventListener('click', e => {
      if (e.target === els.marketDetailOverlay) closeOverlay(els.marketDetailOverlay);
    });
  }

  /* ── Economy ──────────────────────────────────────────────────────
     The background worker assembles a bounded read-only digest of the
     player's economy (rates, income sources, payroll, bank, companies,
     leaderboard) into storage. The popup renders the cached digest the
     moment the tab opens and asks for a refresh only when it is stale. */
  const ECONOMY_FRESH_MS = 120000;
  const ECONOMY_SOURCE_ROWS = 100;
  const ECONOMY_STAFF_ROWS = 100;
  let currentEconomy = null;
  let economyFlowCache = null;
  let economyDays = 30;
  let economySearchTerm = '';
  let economyLbSearchTerm = '';
  let economyQuotesTerm = '';
  let economyBusy = false;
  let economyStatusTimer = null;

  function showEconomyStatus(html, isError) {
    if (!els.economyStatus) return;
    if (economyStatusTimer) { clearTimeout(economyStatusTimer); economyStatusTimer = null; }
    els.economyStatus.innerHTML = html;
    els.economyStatus.className = 'market-status' + (isError ? ' error' : '');
    els.economyStatus.style.display = 'block';
  }

  function hideEconomyStatusSoon(ms = 6000) {
    economyStatusTimer = setTimeout(() => { if (els.economyStatus) els.economyStatus.style.display = 'none'; }, ms);
  }

  async function ensureEconomyData() {
    let resp;
    try { resp = await sendMessage({ type: 'GET_ECONOMY' }); }
    catch (e) { resp = null; }
    if (!resp?.success) { showEconomyStatus('Could not read economy snapshot: ' + escapeText(marketStaleHint(resp)), true); return; }
    if (resp.data) { currentEconomy = resp.data; renderEconomy(); }
    if (currentEconomy && Date.now() - (currentEconomy.fetchedAt || 0) < ECONOMY_FRESH_MS) {
      showEconomyStatus(`Cached snapshot · updated ${timeAgo(currentEconomy.fetchedAt)}`, false);
      if (!(currentEconomy.errors || []).length) hideEconomyStatusSoon();
      return;
    }
    await refreshEconomy();
  }

  async function refreshEconomy(silent) {
    if (economyBusy) return;
    economyBusy = true;
    if (!silent && els.economyRefreshBtn) { els.economyRefreshBtn.disabled = true; els.economyRefreshBtn.textContent = 'Refreshing…'; }
    if (!silent) showEconomyStatus('Fetching economy snapshot…', false);
    let resp = null;
    try { resp = await sendMessage({ type: 'FETCH_ECONOMY' }, { silent: !!silent }); } catch (e) { resp = null; }
    economyBusy = false;
    if (!silent && els.economyRefreshBtn) { els.economyRefreshBtn.disabled = false; els.economyRefreshBtn.textContent = 'Refresh'; }
    if (!resp?.success || !resp.data) {
      if (!silent) showEconomyStatus('Economy refresh failed: ' + escapeText(marketStaleHint(resp)), true);
      return;
    }
    currentEconomy = resp.data;
    renderEconomy();
    if (silent) return;
    const errs = currentEconomy.errors || [];
    if (errs.length) {
      showEconomyStatus(`Snapshot · ${timeAgo(currentEconomy.fetchedAt)} · ${errs.length} section(s) failed: ${escapeText(errs.join(' · '))}`, true);
    } else {
      showEconomyStatus(`Snapshot · ${fmtNum((currentEconomy.history?.rows || []).length)} history rows · updated ${timeAgo(currentEconomy.fetchedAt)}`, false);
      hideEconomyStatusSoon();
    }
  }

  // Windowed cash-flow totals, recomputed only when the digest or window changes.
  function economyFlowWindow(eco) {
    const key = `${eco.fetchedAt}|${economyDays}`;
    if (economyFlowCache && economyFlowCache.key === key) return economyFlowCache;
    const stored = Array.isArray(eco.history?.rows) ? eco.history.rows : [];
    const all = stored.length
      ? stored
      : (Array.isArray(eco.history?.daily) ? eco.history.daily : []).map(d => ({ t: d.t, kind: 'other', inflow: d.inflow, outflow: d.outflow }));
    const cutoff = Date.now() - economyDays * 86400000;
    const byKind = {};
    const byDay = {};
    const totals = { inflow: 0, outflow: 0 };
    let count = 0;
    for (const row of all) {
      const t = Number(row.t) || 0;
      if (t < cutoff) continue;
      count++;
      const inflow = Number(row.inflow) || 0;
      const outflow = Number(row.outflow) || 0;
      const kind = row.kind || 'other';
      const kb = byKind[kind] || (byKind[kind] = { inflow: 0, outflow: 0, count: 0 });
      kb.inflow += inflow; kb.outflow += outflow; kb.count += 1;
      const day = Math.floor(t / 86400000) * 86400000;
      const db = byDay[day] || (byDay[day] = { t: day, inflow: 0, outflow: 0 });
      db.inflow += inflow; db.outflow += outflow;
      totals.inflow += inflow; totals.outflow += outflow;
    }
    economyFlowCache = {
      key,
      count,
      totals: { ...totals, net: totals.inflow - totals.outflow },
      byKind: Object.entries(byKind)
        .map(([kind, v]) => ({ kind, inflow: v.inflow, outflow: v.outflow, count: v.count, net: v.inflow - v.outflow }))
        .sort((a, b) => Math.abs(b.net) - Math.abs(a.net)),
      daily: Object.values(byDay).sort((a, b) => a.t - b.t).map(d => ({ ...d, net: d.inflow - d.outflow }))
    };
    return economyFlowCache;
  }

  function statCards(cards) {
    return cards.map(([label, value, cls]) =>
      `<div class="stat-card"><div class="stat-label">${label}</div><div class="stat-value${cls ? ' ' + cls : ''}">${value}</div></div>`
    ).join('');
  }

  function renderEconomy() {
    if (!currentEconomy || !els.economySummary) return;
    renderLiquidBar();
    renderEconomySummary();
    renderEconomyWorld();
    renderEconomyRates();
    renderEconomyFlow();
    renderEconomySources();
    renderEconomyPayroll();
    renderEconomyBank();
    renderEconomyCompanies();
    renderEconomyLeaderboard();
    renderEconomyPulse();
  }

  /* Liquid Money bar (topbar): personal checking + parked savings accounts +
     the main and bank pools of every company the player founded — the same
     definition the game uses for its MONEY figure, where savings count as
     liquid. Read-only projection of the economy digest — no extra game-API
     calls. */
  const LIQUID_SEG_COLORS = ['#d9a441', '#5f8fd8', '#6fae4e', '#cf6fa8', '#a07fd8', '#4fb3a6', '#d16a5a', '#bf6b3a', '#8e9296'];

  function liquidSources(eco) {
    const liq = eco?.liquid || null;
    const accounts = Array.isArray(liq?.personalAccounts) ? liq.personalAccounts : null;
    const parked = accounts ? accounts.filter(a => !a?.isPrimary) : [];
    const primary = accounts ? accounts.find(a => a?.isPrimary) : null;
    const checking = Number(liq ? liq.personalCash : eco?.world?.cash) || 0;
    const savings = liq
      ? Number(liq.bankTotal) || 0
      : (Array.isArray(eco?.bank?.accounts)
          ? eco.bank.accounts.filter(a => !a?.isPrimary && a?.kind !== 'revenue').reduce((s, a) => s + (Number(a?.balance) || 0), 0)
          : Number(eco?.bank?.total) || 0);
    const cos = liq
      ? (Array.isArray(liq.companies) ? liq.companies : [])
      : (Array.isArray(eco?.companies) ? eco.companies.filter(c => c?.isFounder) : []);
    // The savings chip carries the exact per-account rows the game's MONEY
    // tooltip lists under Savings (e.g. "Savings … · Loan repayment plan …").
    const srcs = [
      {
        label: 'Checking',
        value: checking,
        color: LIQUID_SEG_COLORS[0],
        detail: primary?.name && String(primary.name).toLowerCase() !== 'checking' ? String(primary.name) : null
      },
      {
        label: 'Savings',
        value: savings,
        color: LIQUID_SEG_COLORS[1],
        detail: parked.length ? parked.map(a => `${a?.name || 'Account'} ${fmt(a?.balance)}`).join(' · ') : null
      }
    ];
    cos.forEach((c, i) => {
      const main = Number(c?.mainBalance) || 0;
      const rev = Number(c?.revenueBalance) || 0;
      const bank2 = Number(c?.bankBalance) || 0;
      const accts = Array.isArray(c?.bankAccounts) ? c.bankAccounts : [];
      // Company bank accounts are only served while that company is piloted,
      // so a figure can be live, projected from the last pilot read, or
      // unknown if the extension has never seen them.
      const seen = c?.bankLive ? 'live' : (c?.bankTs ? `seen ${timeAgo(c.bankTs)}` : 'pilot company to track');
      const parts = [`Main ${fmt(main)}`, `Revenue ${fmt(rev)}`, `Savings ${fmt(bank2)} (${seen})`];
      if (accts.length) parts.push(accts.length === 1 ? '1 savings acct' : `${accts.length} savings accts`);
      srcs.push({
        label: c?.name || 'Company',
        value: main + rev + bank2,
        detail: parts.join(' · '),
        color: LIQUID_SEG_COLORS[(i + 2) % LIQUID_SEG_COLORS.length]
      });
    });
    return { srcs, companyCount: cos.length, personal: checking + savings };
  }

  function renderLiquidBar() {
    if (!els.liquidBar) return;
    if (!currentEconomy) {
      els.liquidTotal.textContent = '—';
      els.liquidMeta.textContent = 'Awaiting economy snapshot…';
      els.liquidTrack.innerHTML = '';
      els.liquidLegend.innerHTML = '<span class="liquid-note">Liquid assets appear once the economy snapshot loads.</span>';
      return;
    }
    const { srcs, companyCount, personal } = liquidSources(currentEconomy);
    const total = srcs.reduce((s, x) => s + x.value, 0);
    const at = Number(currentEconomy.liquidAt) || Number(currentEconomy.fetchedAt) || 0;
    const live = at > 0 && Date.now() - at < LIQUID_POLL_MS * 3;
    tweenNumber(els.liquidTotal, total, fmt);
    // The meta line is rewritten only when its content changes: a fresh innerHTML
    // every 5 s would restart the "live" dot's pulse and read as a flicker.
    const metaSig = `${personal}|${companyCount}|${live}|${at}|${Math.floor((Date.now() - at) / 60000)}`;
    if (els.liquidMeta.__sig !== metaSig) {
      els.liquidMeta.__sig = metaSig;
      els.liquidMeta.innerHTML =
        `Personal ${fmt(personal)} · ${companyCount} founded co${companyCount === 1 ? '' : 's'} · ` +
        (live
          ? '<span class="liquid-live" title="Personal cash and company balances are re-read every 5 s"><i></i>live</span>'
          : `updated ${escapeText(timeAgo(at))}`);
    }
    const visible = srcs.filter(s => s.value > 0);
    const basis = s => (total > 0 ? (s.value / total * 100).toFixed(3) : '0') + '%';
    const keys = visible.map(s => s.label).join('|');
    if (total > 0 && els.liquidTrack.__keys === keys && els.liquidTrack.children.length === visible.length) {
      // Same sources as the last poll — slide the widths instead of rebuilding
      // the bar, so a 5 s refresh reads as the bar rebalancing, not a flicker.
      visible.forEach((s, i) => {
        const seg = els.liquidTrack.children[i];
        seg.style.flexBasis = basis(s);
        seg.title = `${s.label} · ${fmt(s.value)}${s.detail ? ` (${s.detail})` : ''}`;
      });
    } else {
      els.liquidTrack.innerHTML = total > 0
        ? visible.map(s =>
            `<div class="liquid-seg" style="flex:0 0 ${basis(s)};background:${s.color}" title="${escapeText(s.label)} · ${fmt(s.value)}${s.detail ? ` (${escapeText(s.detail)})` : ''}"></div>`
          ).join('')
        : '';
      els.liquidTrack.__keys = total > 0 ? keys : null;
    }
    // Same legend as the last poll → update the existing chips in place. A full
    // innerHTML rewrite every 5 s would discard and rebuild the hovered node.
    const legendKeys = srcs.map(s => s.label).join('|');
    if (els.liquidLegend.__keys === legendKeys && els.liquidLegend.children.length === srcs.length) {
      srcs.forEach((s, i) => {
        const chip = els.liquidLegend.children[i];
        const tip = s.detail || '';
        if (chip.title !== tip) chip.title = tip;
        const nodes = chip.childNodes;
        if (nodes[1]) nodes[1].textContent = s.label;
        if (nodes[2]) nodes[2].nodeValue = ` ${fmt(s.value)} `;
        if (nodes[3]) nodes[3].textContent = total > 0 ? (s.value / total * 100).toFixed(1) + '%' : '0.0%';
      });
    } else {
      els.liquidLegend.innerHTML = srcs.map(s => {
        const pct = total > 0 ? (s.value / total * 100).toFixed(1) + '%' : '0.0%';
        const tip = s.detail ? ` title="${escapeText(s.detail)}"` : '';
        return `<span class="liquid-chip"${tip}><i style="background:${s.color}"></i><span class="liquid-src">${escapeText(s.label)}</span> ${fmt(s.value)} <span class="liquid-pct">${pct}</span></span>`;
      }).join('');
      els.liquidLegend.__keys = legendKeys;
    }
  }

  // Topbar bar bootstraps from the cached digest; a stale or missing snapshot
  // triggers one silent background refresh (no Economy-tab status churn).
  const LIQUID_FRESH_MS = 600000;
  async function loadLiquidMoney() {
    let resp = null;
    try { resp = await sendMessage({ type: 'GET_ECONOMY' }); } catch (e) { resp = null; }
    if (resp?.success && resp.data) currentEconomy = resp.data;
    renderLiquidBar();
    const age = Date.now() - (currentEconomy?.fetchedAt || 0);
    if (age < LIQUID_FRESH_MS) return;
    await refreshEconomy(true);
  }

  // While the popup is open the Liquid Money bar re-reads the live sources on a
  // 5 s cadence: personal cash + accounts and the company main/revenue pools,
  // plus the bank accounts of the piloted company. Company banks that aren't
  // piloted answer 403 not_your_player, so those chips keep tracking the
  // interest-projected snapshot until that company is next piloted. The digest
  // itself still refreshes on its own slower cadence (LIQUID_FRESH_MS).
  const LIQUID_POLL_MS = 5000;
  let liquidPollTimer = null;
  let liquidTickBusy = false;
  let liquidRenderSig = null;

  function liquidTickSignature(data) {
    return JSON.stringify([
      data.liquid.personalCash,
      data.liquid.bankTotal,
      (data.liquid.personalAccounts || []).map(a => [a.name, a.balance]),
      (data.liquid.companies || []).map(c => [c.id, c.mainBalance, c.revenueBalance, c.bankBalance, c.bankLive]),
      data.world?.netWorth,
      data.world?.day
    ]);
  }

  // Fold the live balances into the Bank table and the company cards so the
  // whole Economy tab shows the same numbers as the topbar bar.
  function applyLiquidBalances(eco, data) {
    const rows = Array.isArray(data.bankBalances) ? data.bankBalances : null;
    if (rows && Array.isArray(eco.bank?.accounts)) {
      const byId = new Map();
      const byName = new Map();
      rows.forEach(a => {
        if (a.id != null) byId.set(String(a.id), a);
        if (!byName.has(a.name)) byName.set(a.name, a);
      });
      eco.bank.accounts = eco.bank.accounts.map(a => {
        const live = (a.id != null ? byId.get(String(a.id)) : null) || byName.get(a.name);
        return live ? { ...a, balance: live.balance, rate: live.rate, isPrimary: live.isPrimary } : a;
      });
      eco.bank.total = eco.bank.accounts.reduce((s, a) => s + (Number(a?.balance) || 0), 0);
    }
    const cos = Array.isArray(data.liquid.companies) ? data.liquid.companies : null;
    if (cos && Array.isArray(eco.companies)) {
      const byId = new Map(cos.map(c => [String(c.id), c]));
      eco.companies = eco.companies.map(c => {
        const live = byId.get(String(c.id));
        return live ? { ...c, mainBalance: live.mainBalance, revenueBalance: live.revenueBalance } : c;
      });
    }
  }

  function applyLiquidTick(data) {
    if (!currentEconomy) currentEconomy = { world: {} };
    const eco = currentEconomy;
    if (data.world) eco.world = { ...(eco.world || {}), ...data.world };
    eco.liquid = data.liquid;
    eco.liquidAt = data.at || Date.now();
    applyLiquidBalances(eco, data);
    renderLiquidBar();
    if (!document.getElementById('panel-economy')?.classList.contains('active')) return;
    const sig = liquidTickSignature(data);
    if (sig === liquidRenderSig) return;
    liquidRenderSig = sig;
    renderEconomySummary();
    renderEconomyBank();
    renderEconomyCompanies();
  }

  async function tickLiquidMoney() {
    if (liquidTickBusy) return;
    liquidTickBusy = true;
    try {
      const resp = await sendMessage({ type: 'FETCH_LIQUID' }, { silent: true });
      if (resp?.success && resp.data?.ok) applyLiquidTick(resp.data);
    } catch (e) { /* the next tick retries; the bar keeps the last good figures */ }
    liquidTickBusy = false;
  }

  function startLiquidPolling() {
    if (liquidPollTimer) return;
    liquidPollTimer = setInterval(tickLiquidMoney, LIQUID_POLL_MS);
  }

  function renderEconomySummary() {
    const eco = currentEconomy;
    const r = eco.rates;
    const w = eco.world || {};
    const costs = r ? r.ingredientCostPerMin + r.wagePerMin + r.rentPerMin + r.logisticsWagePerMin : 0;
    const win = economyFlowWindow(eco);
    // Liquid Cash mirrors the game's MONEY figure: checking + parked savings.
    // Prefer the liquid block so this card always tracks the topbar bar.
    const bankAccts = Array.isArray(eco.bank?.accounts) ? eco.bank.accounts : null;
    const parked = Number(eco.liquid?.bankTotal)
      || (bankAccts ? bankAccts.filter(a => !a?.isPrimary && a?.kind !== 'revenue').reduce((s, a) => s + (Number(a?.balance) || 0), 0) : 0);
    const checking = Number(eco.liquid ? eco.liquid.personalCash : w.cash) || 0;
    els.economySummary.innerHTML = statCards([
      ['Game Day', w.day == null ? '—' : fmtNum(w.day)],
      ['Liquid Cash', fmt(checking + parked)],
      ['Net Worth', fmt(w.netWorth)],
      ['Net / Min', r ? fmt(r.netPerMin) : '—', r && r.netPerMin < 0 ? 'negative' : 'positive'],
      ['Gross / Min', r ? fmt(r.grossPerMin) : '—'],
      ['Costs / Min', r ? fmt(costs) : '—'],
      ['Day Revenue', r ? fmt(r.dayRevenue) : '—'],
      [`Net / ${economyDays}d`, fmt(win.totals.net), win.totals.net >= 0 ? 'positive' : 'negative'],
      ['Bank Total', fmt(eco.bank?.total)],
      ['Royalty / Day', fmt(eco.royalty?.pendingDay)],
      ['Listings', w.listings == null ? '—' : fmtNum(w.listings)],
      ['Leases Held', w.leases == null ? '—' : fmtNum(w.leases)]
    ]);
  }

  function renderEconomyWorld() {
    if (!els.economyWorld) return;
    const a = currentEconomy.access || null;
    const quotes = Array.isArray(a?.quotes) ? a.quotes : [];
    if (els.economyWorldMeta) {
      els.economyWorldMeta.textContent = a?.serverNow
        ? `World snapshot · server ${new Date(a.serverNow).toLocaleTimeString()}`
        : 'World snapshot';
    }
    if (!a) {
      els.economyWorld.innerHTML = '<div class="econ-section-note">World economy unavailable.</div>';
      if (els.economyQuotesBody) els.economyQuotesBody.innerHTML = '';
      if (els.economyQuotesEmpty) els.economyQuotesEmpty.style.display = 'block';
      return;
    }
    const online = a.maxPlayers ? `${fmtNum(a.playersOnline)} / ${fmtNum(a.maxPlayers)}` : fmtNum(a.playersOnline);
    els.economyWorld.innerHTML = statCards([
      ['World GDP / 24h', fmt(a.gdp24h), 'positive'],
      ['Combined Net Worth', fmt(a.worldNetWorth)],
      ['Beta Players', fmtNum(a.betaPlayers)],
      ['Players Online', online],
      ['Access Mode', a.mode ? String(a.mode) : '—'],
      ['Entry Price', a.priceCents ? fmt(a.priceCents / 100) : '—']
    ]);
    if (!els.economyQuotesBody) return;
    if (!quotes.length) {
      els.economyQuotesBody.innerHTML = '';
      if (els.economyQuotesEmpty) { resetEmpty(els.economyQuotesEmpty); els.economyQuotesEmpty.style.display = 'block'; }
      return;
    }
    els.economyQuotesBody.innerHTML = quotes.map(q => {
      const value = q.price * q.units;
      return `<tr data-name="${escapeText(`${q.short} ${q.name}`.toLowerCase())}" data-price="${q.price}" data-units="${q.units}" data-value="${value}">
      <td><span class="market-name-cell">${escapeText(q.name)}</span><span class="market-kind">${escapeText(q.short)}</span></td>
      <td>${fmt(q.price)}</td>
      <td>${fmtNum(q.units)}</td>
      <td>${fmt(value)}</td>
    </tr>`;
    }).join('');
    if (economyQuotesTerm) applySearch(els.economyQuotesBody, els.economyQuotesEmpty, economyQuotesTerm);
    else if (els.economyQuotesEmpty) els.economyQuotesEmpty.style.display = 'none';
  }

  function renderEconomyRates() {
    if (!els.economyRates) return;
    const r = currentEconomy.rates;
    if (els.economyRatesMeta) {
      els.economyRatesMeta.textContent = currentEconomy.at
        ? `Income engine as of ${new Date(currentEconomy.at).toLocaleTimeString()}`
        : 'Income engine';
    }
    if (!r) { els.economyRates.innerHTML = '<div class="econ-section-note">Rates unavailable.</div>'; return; }
    const net = v => v < 0 ? 'negative' : 'positive';
    els.economyRates.innerHTML = statCards([
      ['Gross / Min', fmt(r.grossPerMin), 'positive'],
      ['Net / Min', fmt(r.netPerMin), net(r.netPerMin)],
      ['Day Revenue', fmt(r.dayRevenue)],
      ['Ingredients / Min', fmt(r.ingredientCostPerMin), 'negative'],
      ['Wages / Min', fmt(r.wagePerMin), 'negative'],
      ['Rent / Min', fmt(r.rentPerMin), r.rentPerMin ? 'negative' : ''],
      ['Logistics / Min', fmt(r.logisticsWagePerMin), r.logisticsWagePerMin ? 'negative' : ''],
      ['Rent Income / Min', fmt(r.rentIncomePerMin), 'positive'],
      ['Interest / Min', fmt(r.interestPerMin), 'positive']
    ]);
  }

  function drawFlowChart(canvas, daily) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (!cw || !ch) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    const pad = 6;
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, ch / 2);
    ctx.lineTo(cw - pad, ch / 2);
    ctx.stroke();
    if (!daily || !daily.length) return;
    const max = Math.max(...daily.map(d => Math.max(d.inflow, d.outflow)), 1);
    const slot = (cw - pad * 2) / daily.length;
    const barW = Math.max(1, Math.min(10, slot / 2.6));
    daily.forEach((d, i) => {
      const cx = pad + slot * i + slot / 2;
      const inH = (d.inflow / max) * (ch / 2 - pad - 2);
      const outH = (d.outflow / max) * (ch / 2 - pad - 2);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(cx - barW / 2, ch / 2 - inH, barW, inH);
      ctx.fillStyle = '#f87171';
      ctx.fillRect(cx - barW / 2, ch / 2, barW, outH);
    });
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#6b6864';
    ctx.fillText(fmt(max), pad, 2);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(cw - pad - 62, 4, 6, 6);
    ctx.fillStyle = '#6b6864';
    ctx.fillText('in', cw - pad - 52, 2);
    ctx.fillStyle = '#f87171';
    ctx.fillRect(cw - pad - 30, 4, 6, 6);
    ctx.fillStyle = '#6b6864';
    ctx.fillText('out', cw - pad - 20, 2);
  }

  function renderEconomyFlow() {
    if (!els.economyFlowBody || !currentEconomy) return;
    const win = economyFlowWindow(currentEconomy);
    if (els.economyFlowMeta) {
      els.economyFlowMeta.innerHTML = `${fmtNum(win.count)} entries · in <span class="change-cell positive">${fmt(win.totals.inflow)}</span> · out <span class="change-cell negative">${fmt(win.totals.outflow)}</span> · net <span class="change-cell ${win.totals.net >= 0 ? 'positive' : 'negative'}">${fmt(win.totals.net)}</span>`;
    }
    drawFlowChart(els.economyFlowChart, win.daily);
    els.economyFlowBody.innerHTML = win.byKind.map(k => `<tr data-name="${escapeText(String(k.kind).toLowerCase())}" data-inflow="${k.inflow}" data-outflow="${k.outflow}" data-net="${k.net}" data-count="${k.count}">
      <td><span class="market-name-cell">${escapeText(k.kind)}</span></td>
      <td class="change-cell positive">${fmt(k.inflow)}</td>
      <td class="change-cell negative">${fmt(k.outflow)}</td>
      <td class="change-cell ${k.net >= 0 ? 'positive' : 'negative'}">${fmt(k.net)}</td>
      <td>${fmtNum(k.count)}</td>
    </tr>`).join('');
    if (els.economyFlowEmpty) els.economyFlowEmpty.style.display = win.byKind.length ? 'none' : 'block';
  }

  function economySourceRows(eco) {
    const s = eco.sources || {};
    const rows = [];
    const push = (type, list, pick, dayNote) => {
      (Array.isArray(list) ? list : []).forEach((x, i) => {
        const perMin = Number(pick(x)) || 0;
        rows.push({
          type,
          name: x?.name || x?.workerName || x?.label || `${type} #${i + 1}`,
          note: dayNote ? dayNote(x) : '',
          perMin,
          perDay: Number(x?.rentPerDay) || perMin * 1440
        });
      });
    };
    push('Cart', s.carts?.rows, x => x.grossPerMin, x => [x.cuisine, x.workerName, x.idleReason ? `idle: ${x.idleReason}` : ''].filter(Boolean).join(' · '));
    push('Shop', s.shops?.rows, x => x.grossPerMin, x => x.staffing ? `staffing ${x.staffing}` : '');
    push('Restaurant', s.restaurants?.rows, x => x.grossPerMin, x => x.staffing ? `staffing ${x.staffing}` : '');
    push('Lease', s.leases?.rows, x => x.perMin, x => [x.label, x.buildingLabel].filter(Boolean).join(' · '));
    push('Rent Income', s.rentIncome?.rows, x => x.perMin, x => [x.tenantName, x.kind].filter(Boolean).join(' · '));
    push('Savings', s.savings?.rows, x => x.perMin, x => x.num ? `account ${x.num}` : '');
    if (s.freight && (s.freight.earnedPerMin || s.freight.dayEarned || s.freight.paidPerMin)) {
      rows.push({ type: 'Freight', name: 'Freight contracts', note: `paid ${fmt(s.freight.paidPerMin)}/min`, perMin: Number(s.freight.earnedPerMin) || 0, perDay: Number(s.freight.dayEarned) || 0 });
    }
    return rows;
  }

  function renderEconomySources() {
    if (!els.economySourcesBody || !currentEconomy) return;
    const s = currentEconomy.sources || {};
    const all = economySourceRows(currentEconomy).sort((a, b) => b.perMin - a.perMin);
    const shown = all.slice(0, ECONOMY_SOURCE_ROWS);
    if (els.economySourcesMeta) {
      const counts = [
        ['Carts', s.carts?.count], ['Shops', s.shops?.count], ['Restaurants', s.restaurants?.count],
        ['Leases', s.leases?.count], ['Rent units', s.rentIncome?.count], ['Savings', s.savings?.count]
      ].filter(([, c]) => c != null).map(([k, c]) => `${k} <strong>${fmtNum(c)}</strong>`);
      if (all.length > shown.length) counts.push(`showing top ${shown.length} of ${fmtNum(all.length)} by $/min`);
      els.economySourcesMeta.innerHTML = counts.join(' · ');
    }
    els.economySourcesBody.innerHTML = shown.map(r => `<tr data-name="${escapeText(`${r.type} ${r.name}`.toLowerCase())}" data-permin="${r.perMin}" data-perday="${r.perDay}">
      <td><span class="market-name-cell">${escapeText(r.name)}</span>${r.note ? `<span class="market-kind">${escapeText(r.note)}</span>` : ''}</td>
      <td>${escapeText(r.type)}</td>
      <td class="change-cell ${r.perMin >= 0 ? 'positive' : 'negative'}">${fmt(r.perMin)}</td>
      <td>${fmt(r.perDay)}</td>
    </tr>`).join('');
    if (els.economySourcesEmpty) els.economySourcesEmpty.style.display = shown.length ? 'none' : 'block';
  }

  function renderEconomyPayroll() {
    if (!els.economyPayrollBody || !currentEconomy) return;
    const eco = currentEconomy;
    const p = eco.payroll || {};
    if (els.economyPayrollCards) {
      els.economyPayrollCards.innerHTML = statCards([
        ['Crew Wages / Min', fmt(p.crewWagePerMin)],
        ['Driver Wages / Min', fmt(p.driverWagePerMin)],
        ['Cart Wages / Min', fmt(p.cartWagePerMin)],
        ['Shop Wages / Min', fmt(p.shopWagePerMin)],
        ['Ingredients / Min', fmt(p.ingredientCostPerMin)],
        ['Rent / Min', fmt(p.rentPerMin)],
        ['Logistics / Min', fmt(p.logisticsWagePerMin)],
        ['Staff Total / Min', fmt((Number(p.crewWagePerMin) || 0) + (Number(p.driverWagePerMin) || 0))]
      ]);
    }
    const rows = [];
    (eco.sources?.crews?.rows || []).forEach(c => rows.push({
      name: c.workerName || '—', role: c.role || 'crew',
      wage: Number(c.wagePerMin) || 0, extra: c.active ? 'active' : 'idle'
    }));
    (eco.sources?.drivers?.rows || []).forEach(d => rows.push({
      name: d.workerName || '—', role: 'driver',
      wage: Number(d.wagePerMin) || 0,
      extra: [d.vehicleName, d.utilization != null ? `util ${(Number(d.utilization) * 100).toFixed(0)}%` : '', `eff ${fmt(d.effectivePerMin)}/min`].filter(Boolean).join(' · ')
    }));
    rows.sort((a, b) => b.wage - a.wage);
    const shown = rows.slice(0, ECONOMY_STAFF_ROWS);
    if (els.economyPayrollMeta) {
      const parts = [`${fmtNum(eco.sources?.crews?.count || 0)} crew`, `${fmtNum(eco.sources?.drivers?.count || 0)} drivers`];
      if (rows.length > shown.length) parts.push(`showing top ${shown.length} by wage`);
      els.economyPayrollMeta.textContent = parts.join(' · ');
    }
    els.economyPayrollBody.innerHTML = shown.map(r => `<tr data-name="${escapeText(`${r.name} ${r.role}`.toLowerCase())}" data-wage="${r.wage}">
      <td><span class="market-name-cell">${escapeText(r.name)}</span></td>
      <td>${escapeText(r.role)}</td>
      <td class="change-cell negative">${fmt(r.wage)}</td>
      <td>${escapeText(r.extra)}</td>
    </tr>`).join('');
    if (els.economyPayrollEmpty) els.economyPayrollEmpty.style.display = shown.length ? 'none' : 'block';
  }

  function renderEconomyBank() {
    if (!els.economyBankBody || !currentEconomy) return;
    const bank = currentEconomy.bank || { total: 0, accounts: [] };
    const accounts = Array.isArray(bank.accounts) ? bank.accounts : [];
    if (els.economyBankMeta) {
      els.economyBankMeta.innerHTML = `${fmtNum(accounts.length)} account(s) · total <strong>${fmt(bank.total)}</strong>`;
    }
    els.economyBankBody.innerHTML = accounts.map(a => `<tr>
      <td><span class="market-name-cell">${escapeText(a.name)}</span>${a.isPrimary ? '<span class="market-tag held">Primary</span>' : ''}</td>
      <td>${escapeText(a.kind || '—')}</td>
      <td>${a.num ? escapeText(a.num) : '—'}</td>
      <td class="change-cell positive">${fmt(a.balance)}</td>
      <td>${a.rate ? (Number(a.rate) * 100).toFixed(4) + '%' : '—'}</td>
      <td>${a.earnedSession ? fmt(a.earnedSession) : '—'}</td>
      <td>${fmtNum(a.txCount)}</td>
    </tr>`).join('');
    if (els.economyBankEmpty) els.economyBankEmpty.style.display = accounts.length ? 'none' : 'block';

    const txs = [];
    accounts.forEach(a => (a.txRecent || []).forEach(t => txs.push({ ...t, account: a.name })));
    txs.sort((a, b) => (Number(b.ts) || 0) - (Number(a.ts) || 0));
    const shown = txs.slice(0, 40);
    if (els.economyBankTxBody) {
      els.economyBankTxBody.innerHTML = shown.map(t => `<tr>
        <td>${t.ts ? new Date(t.ts).toLocaleString() : '—'}</td>
        <td>${escapeText(t.account)}</td>
        <td>${escapeText(t.desc || '—')}</td>
        <td>${escapeText(t.kind || '—')}</td>
        <td class="change-cell ${t.amount >= 0 ? 'positive' : 'negative'}">${fmt(t.amount)}</td>
      </tr>`).join('');
    }
    if (els.economyBankTxEmpty) els.economyBankTxEmpty.style.display = shown.length ? 'none' : 'block';
  }

  function renderEconomyCompanies() {
    if (!els.economyCompanies || !currentEconomy) return;
    const list = currentEconomy.companies || [];
    if (els.economyCompaniesMeta) {
      els.economyCompaniesMeta.textContent = `${fmtNum(list.length)} companies`;
    }
    if (!list.length) { els.economyCompanies.innerHTML = '<div class="econ-section-note">No companies on file.</div>'; return; }
    const metric = (label, value) => `<div class="econ-metric"><div class="econ-metric-label">${label}</div><div class="econ-metric-value">${value}</div></div>`;
    els.economyCompanies.innerHTML = list.map(c => `
      <div class="econ-card">
        <div class="econ-card-head">
          <div class="econ-card-name">${escapeText(c.name)}${c.isFounder ? '<span class="market-tag held">Founder</span>' : ''}</div>
          <div class="econ-card-meta">${[c.status, `holders ${fmtNum(c.holderCount)}`, `members ${fmtNum(c.memberCount)}`].filter(Boolean).map(escapeText).join(' · ')}</div>
        </div>
        <div class="econ-metrics">
          ${metric('Book Value', fmt(c.bookValue))}
          ${metric('Share Price', fmt(c.price))}
          ${metric('Market Cap', fmt(c.marketCap))}
          ${metric('Shares Out', fmtNum(c.sharesOutstanding))}
          ${metric('Float', c.floatBps ? (Number(c.floatBps) / 100).toFixed(1) + '%' : '—')}
          ${metric('Treasury', fmt(c.treasury))}
          ${metric('Clearing Price', fmt(c.clearingPrice))}
          ${metric('Min Book', fmt(c.minBookValue))}
          ${metric('Main Balance', fmt(c.mainBalance))}
          ${metric('Revenue Balance', fmt(c.revenueBalance))}
        </div>
        ${(c.topHolders || []).length ? `<div class="econ-card-meta" style="margin-top:8px;">Top holders: ${c.topHolders.map(h => `${escapeText(h.name)} (${fmtNum(h.qty)})`).join(' · ')}</div>` : ''}
      </div>`).join('');
  }

  function renderEconomyLeaderboard() {
    if (!els.economyLbBody || !currentEconomy) return;
    const eco = currentEconomy;
    const lb = eco.leaderboard;
    if (!lb) {
      els.economyLbBody.innerHTML = '';
      if (els.economyLbMeta) els.economyLbMeta.textContent = 'Leaderboard unavailable';
      if (els.economyLbEmpty) els.economyLbEmpty.style.display = 'block';
      if (els.economyLoyaltyBody) els.economyLoyaltyBody.innerHTML = '';
      if (els.economyLoyaltyMeta) els.economyLoyaltyMeta.textContent = 'Loyalty Board';
      return;
    }
    if (els.economyLbMeta) {
      const parts = [`${fmtNum(lb.total)} ranked players`];
      if (lb.you) parts.push(`you #${lb.you.rank} · ${fmt(lb.you.value)}`);
      else if (lb.youReason) parts.push(lb.youReason);
      if (lb.wealthClass) parts.push(`class ${lb.wealthClass}`);
      if (lb.globalRank) parts.push(`#${lb.globalRank} of ${fmtNum(lb.population || 0)}`);
      if (lb.fromRank && lb.toRank) parts.push(`band #${lb.fromRank}–#${lb.toRank}`);
      if (lb.updatedAt) parts.push(`updated ${timeAgo(lb.updatedAt)}`);
      els.economyLbMeta.textContent = parts.join(' · ');
    }
    const isYou = e => !!(e.playerId && eco.playerId && e.playerId === eco.playerId);
    els.economyLbBody.innerHTML = (lb.board || []).map(e => `<tr data-rank="${e.rank == null ? 0 : e.rank}" data-name="${escapeText(String(e.name || '').toLowerCase())}" data-value="${e.value}">
      <td>${e.rank == null ? '—' : '#' + e.rank}</td>
      <td><span class="market-name-cell">${escapeText(e.name)}</span>${isYou(e) ? '<span class="market-tag held">You</span>' : ''}</td>
      <td class="change-cell positive">${fmt(e.value)}</td>
    </tr>`).join('');
    if (els.economyLbEmpty) els.economyLbEmpty.style.display = (lb.board || []).length ? 'none' : 'block';
    applySearch(els.economyLbBody, els.economyLbEmpty, economyLbSearchTerm);

    if (els.economyLoyaltyMeta) {
      const parts = [`Loyalty board · ${fmtNum(lb.loyaltyTotal)} players`];
      if (lb.loyaltyYou) parts.push(`you #${lb.loyaltyYou.rank} · ${fmtNum(lb.loyaltyYou.value)}`);
      els.economyLoyaltyMeta.textContent = parts.join(' · ');
    }
    if (els.economyLoyaltyBody) {
      els.economyLoyaltyBody.innerHTML = (lb.loyalty || []).map(e => `<tr>
        <td>${e.rank == null ? '—' : '#' + e.rank}</td>
        <td><span class="market-name-cell">${escapeText(e.name)}</span>${isYou(e) ? '<span class="market-tag held">You</span>' : ''}</td>
        <td class="change-cell positive">${fmtNum(e.value)}</td>
      </tr>`).join('');
    }
  }

  function renderEconomyPulse() {
    if (!els.economyPulse) return;
    const scan = currentMarketScan;
    const items = (scan?.items || []).filter(i => Number.isFinite(Number(i.dayPct)));
    const bodyEmpty = el => { if (el) el.innerHTML = ''; };
    if (!items.length) {
      els.economyPulse.innerHTML = '';
      if (els.economyPulseMeta) els.economyPulseMeta.textContent = 'No market scan yet — run one from the Market tab';
      bodyEmpty(els.economyGainersBody);
      bodyEmpty(els.economyLosersBody);
      return;
    }
    const adv = items.filter(i => i.dayPct > 0).length;
    const dec = items.filter(i => i.dayPct < 0).length;
    const avg = items.reduce((s, i) => s + Number(i.dayPct), 0) / items.length;
    if (els.economyPulseMeta) {
      els.economyPulseMeta.textContent = `${fmtNum(items.length)} items · scanned ${timeAgo(scan.scannedAt)}`;
    }
    els.economyPulse.innerHTML = statCards([
      ['Items', fmtNum(items.length)],
      ['Advancing', fmtNum(adv), 'positive'],
      ['Declining', fmtNum(dec), 'negative'],
      ['Avg 24h', `${avg >= 0 ? '+' : ''}${avg.toFixed(2)}%`, avg >= 0 ? 'positive' : 'negative']
    ]);
    const rowHtml = i => `<tr>
      <td><span class="market-name-cell">${escapeText(i.label)}</span><span class="market-kind">${escapeText(String(i.id))}</span></td>
      <td>${fmt(i.price)}</td>
      <td class="change-cell ${i.dayPct >= 0 ? 'positive' : 'negative'}">${i.dayPct >= 0 ? '+' : ''}${Number(i.dayPct).toFixed(2)}%</td>
    </tr>`;
    const sorted = items.slice().sort((a, b) => Number(b.dayPct) - Number(a.dayPct));
    if (els.economyGainersBody) els.economyGainersBody.innerHTML = sorted.slice(0, 8).map(rowHtml).join('');
    if (els.economyLosersBody) els.economyLosersBody.innerHTML = sorted.slice(-8).reverse().map(rowHtml).join('');
  }

  if (els.economyRefreshBtn) els.economyRefreshBtn.addEventListener('click', () => refreshEconomy());
  if (els.economyDays) {
    economyDays = Number(els.economyDays.value) || 30;
    els.economyDays.addEventListener('change', () => {
      economyDays = Number(els.economyDays.value) || 30;
      economyFlowCache = null;
      if (!currentEconomy) return;
      renderEconomySummary();
      renderEconomyFlow();
    });
  }
  if (els.economySearch) {
    const applyEconomySearch = () => {
      applySearch(els.economySourcesBody, els.economySourcesEmpty, economySearchTerm);
      applySearch(els.economyPayrollBody, els.economyPayrollEmpty, economySearchTerm);
    };
    els.economySearch.addEventListener('input', () => { economySearchTerm = els.economySearch.value; applyEconomySearch(); });
    els.economySearch.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      els.economySearch.value = '';
      economySearchTerm = '';
      applyEconomySearch();
    });
  }
  if (els.economyLbSearch) {
    const applyLbSearch = () => applySearch(els.economyLbBody, els.economyLbEmpty, economyLbSearchTerm);
    els.economyLbSearch.addEventListener('input', () => { economyLbSearchTerm = els.economyLbSearch.value; applyLbSearch(); });
    els.economyLbSearch.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      els.economyLbSearch.value = '';
      economyLbSearchTerm = '';
      applyLbSearch();
    });
  }
  if (els.economyQuotesSearch) {
    const applyQuotesSearch = () => applySearch(els.economyQuotesBody, els.economyQuotesEmpty, economyQuotesTerm);
    els.economyQuotesSearch.addEventListener('input', () => { economyQuotesTerm = els.economyQuotesSearch.value; applyQuotesSearch(); });
    els.economyQuotesSearch.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      els.economyQuotesSearch.value = '';
      economyQuotesTerm = '';
      applyQuotesSearch();
    });
  }
  attachTableSort(els.economyFlowBody?.closest('table'));
  attachTableSort(els.economySourcesBody?.closest('table'));
  attachTableSort(els.economyPayrollBody?.closest('table'));
  attachTableSort(els.economyLbBody?.closest('table'));
  attachTableSort(els.economyQuotesBody?.closest('table'));

  loadData();
  loadLiquidMoney();
  startLiquidPolling();

  // Boot splash: the CSS timeline runs on its own, so this only has to get the
  // overlay out of the way — after the timeline, or instantly on any input.
  // It is hidden, not removed, so nothing can intercept a click later.
  {
    const splash = document.getElementById('bootSplash');
    if (splash) {
      const BOOT_MS = reducedMotion ? 600 : 5000;
      let ended = false;
      const endBoot = () => {
        if (ended) return;
        ended = true;
        clearTimeout(bootTimer);
        window.removeEventListener('pointerdown', endBoot, true);
        window.removeEventListener('keydown', endBoot, true);
        if (reducedMotion) { splash.classList.add('gone'); return; }
        splash.classList.add('out');
        setTimeout(() => splash.classList.add('gone'), 210);
      };
      const bootTimer = setTimeout(endBoot, BOOT_MS);
      window.addEventListener('pointerdown', endBoot, true);
      window.addEventListener('keydown', endBoot, true);
    }
  }
})();