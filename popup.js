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
    marketFilter: document.getElementById('marketFilter'),
    marketScanBtn: document.getElementById('marketScanBtn'),
    marketScanStatus: document.getElementById('marketScanStatus'),
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
  let chartInstances = {}; // companyId -> {chart, series}
  let portfolioChartInstance = null; // {chart, series}
  let lwLoaded = false;
  let lastLoadSignature = null; // JSON of the last rendered payload; identical payload skips the render pass
  let lastLoadAt = 0; // epoch ms of the last successful GET_PORTFOLIO response
  let chartsSignature = '';     // structure key of the charts currently drawn in the analytics grid
  let chartBuildGeneration = 0; // bumped to abandon an in-flight progressive chart build
  let chartBuild = null;        // {generation, sig, list, chartType} while charts stream in
  let overviewSortState = { key: null, asc: true };
  let overviewFilterValue = 'value';
  let overviewSearchTerm = '';
  let holdingsSortState = { key: null, asc: true };
  let holdingsSearchTerm = '';

  // Helpers
  function sendMessage(msg) {
    return new Promise(resolve => chrome.runtime.sendMessage(msg, resolve));
  }

  function showToast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    els.toastContainer.appendChild(t);
    setTimeout(() => { t.style.animation = 'toastIn .2s ease reverse'; setTimeout(() => t.remove(), 200); }, 3000);
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
    els.detailOverlay.classList.add('hidden');
  }
  els.detailClose.addEventListener('click', closeDetail);
  els.detailOverlay.addEventListener('click', e => { if (e.target === els.detailOverlay) closeDetail(); });

  // Tabs
  els.tabBtns.forEach(btn => btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    els.tabBtns.forEach(b => b.classList.toggle('active', b === btn));
    els.panels.forEach(p => p.classList.toggle('active', p.id === `panel-${tab}`));
  }));

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
        <td class="price-cell">$${c.currentPrice.toLocaleString()}</td>
        <td class="change-cell ${changeClass}">${c.changePct >= 0 ? '+' : ''}${c.changePct.toFixed(2)}%</td>
        <td>${c.yieldPct.toFixed(1)}%</td>
        <td>${h ? fmtNum(h.owned) : '—'}</td>
        <td class="value-cell">${h ? fmt(h.value) : '—'}</td>
        <td class="pct-cell">${h ? fmtPct(h.percentage) : '—'}</td>
      </tr>`;
    }).join('');
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
      return `<tr data-name="${h.name.toLowerCase()}" data-symbol="${(h.symbol || '').toLowerCase()}" data-owned="${h.owned}" data-price="${h.currentPrice}" data-backing="${h.backing}" data-value="${h.value}" data-pct="${h.percentage}" data-yield="${h.yieldPct}" data-div="${h.dividendIncome || 0}">
      <td><span class="company-name">${h.name}</span><span class="company-symbol">${h.symbol}</span><span class="own-badge">OWN</span></td>
      <td>${fmtNum(h.owned)}</td>
      <td class="price-cell">$${h.currentPrice.toLocaleString()}</td>
      <td>$${h.backing.toLocaleString()}</td>
      <td class="value-cell">${fmt(h.value)}</td>
      <td class="pct-cell">${fmtPct(h.percentage)}</td>
      <td>${h.yieldPct.toFixed(1)}%</td>
      <td class="div-cell">${fmt(h.dividendIncome)} (${fmt(divPerShare)}/share)</td>
    </tr>`;
    }).join('');
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

      // A build for this same structure may still be streaming charts in; keep
      // it running with the fresher list instead of cancelling and restarting.
      if (chartBuild && chartBuild.sig === sig) {
        chartBuild.list = companies;
        companies.forEach(c => { if (chartInstances[c.id]) refreshChartCard(c); });
        return;
      }

      const reusable = sig === chartsSignature
        && Object.keys(chartInstances).length === companies.length
        && companies.every(c => chartInstances[c.id]?.chartContainer?.isConnected);
      if (reusable) {
        companies.forEach(c => refreshChartCard(c));
        return;
      }
      clearChartGrid();
      chartsSignature = sig;
      startChartBuild(sig, companies, chartType);
    }
  }

  // Tear down every chart card and instance, and abandon any in-flight build.
  function clearChartGrid() {
    chartBuildGeneration++;
    chartBuild = null;
    Object.keys(chartInstances).forEach(id => {
      if (chartInstances[id].chart) chartInstances[id].chart.remove();
      delete chartInstances[id];
    });
    els.analyticsChartsGrid.innerHTML = '';
    chartsSignature = '';
  }

  // Building every chart in one pass blocks the popup for a second or more at
  // real market size (each LightweightCharts instance costs several ms), so the
  // card shells go in with a single DOM write and the charts themselves stream
  // in short slices that hand the main thread back between batches.
  function startChartBuild(sig, companies, chartType) {
    if (typeof LightweightCharts === 'undefined') return;
    const generation = ++chartBuildGeneration;
    chartBuild = { generation, sig, list: companies, chartType, width: 0, height: 0 };

    els.analyticsChartsGrid.innerHTML = companies.map(chartCardHtml).join('');

    let i = 0;
    const step = () => {
      if (generation !== chartBuildGeneration) return;
      // Measure at most once per build: reading clientWidth forces a layout
      // flush, and there is nothing to flush mid-build anyway (the new canvases
      // are only painted after the build yields). The resize handler zeroes
      // width so a mid-build resize re-measures on the next slice.
      if (!chartBuild.width) {
        const wrap = els.analyticsChartsGrid.querySelector('.chart-canvas-wrap');
        chartBuild.width = wrap?.clientWidth || 0;
        chartBuild.height = wrap?.clientHeight || (document.body.classList.contains('fulltab') ? 364 : 284);
      }
      const deadline = performance.now() + 16;
      while (i < chartBuild.list.length && performance.now() < deadline) {
        createChartFor(chartBuild.list[i], chartBuild.chartType, chartBuild.width, chartBuild.height);
        i++;
      }
      if (i < chartBuild.list.length) {
        setTimeout(step, 0);
      } else {
        chartBuild = null;
        attachChartClicks();
      }
    };
    step();
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
    const chartType = els.analyticsChartType?.value || 'candlestick';
    const tf = els.analyticsTimeframe?.value || '24h';
    return `${chartType}|${tf}|${Math.floor(Date.now() / 3600000)}|${(company.spark || []).join(',')}`;
  }

  // In-place refresh of an existing chart card: same structure, new numbers.
  function refreshChartCard(company) {
    const inst = chartInstances[company.id];
    if (!inst) return;
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
      <div class="chart-card">
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
    els.totalValue.textContent = fmt(totalValue);
    els.expectedAnnualDiv.textContent = fmt(expectedAnnual);
    els.holdingsCount.textContent = holdings.length;
    els.ordersCount.textContent = ordersCount;

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

  async function loadDataNow(force) {
    try {
      const resp = await sendMessage({ type: 'GET_PORTFOLIO', force: !!force });
      if (!resp.success) { showToast('Load failed: ' + resp.error, 'error'); return; }
      const data = resp.data;
      lastLoadAt = Date.now();
      const { companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings } = data;
      // Signature covers only what the popup renders — the payload used to be
      // stringified whole, including the raw API dump, on every tick.
      const sig = JSON.stringify([companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings]);
      if (sig === lastLoadSignature) return;
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
      renderSummary(totalValue, holdings, lastData.orders.length);
      renderVisiblePanels();
    } catch (e) { console.error(e); showToast('Load error: ' + e.message, 'error'); }
  }

  els.refreshBtn.addEventListener('click', async () => {
    els.refreshBtn.disabled = true; els.refreshBtn.textContent = 'Loading…';
    await loadData({ force: true });
    els.refreshBtn.disabled = false; els.refreshBtn.textContent = 'Refresh';
    showToast('Refreshed', 'info');
  });


  // Analytics Refresh
  els.analyticsRefreshBtn.addEventListener('click', async () => {
    els.analyticsRefreshBtn.disabled = true;
    els.analyticsRefreshBtn.textContent = 'Loading…';
    await loadData({ force: true });
    els.analyticsRefreshBtn.disabled = false;
    els.analyticsRefreshBtn.textContent = 'Refresh';
    showToast('Analytics refreshed', 'info');
  });

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
        const rows = Array.from(tbody.querySelectorAll('tr'));
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
      // A resize during a streaming chart build invalidates its cached size.
      if (chartBuild) chartBuild.width = 0;
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
  let marketSearchTerm = '';

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
    return `<tr data-id="${escapeText(item.id)}" data-name="${escapeText(String(item.label).toLowerCase())}"
      data-price="${item.price}" data-daypct="${item.dayPct}" data-base="${n.base}" data-spread="${n.spread}"
      data-npcbid="${n.npcBid == null ? -1 : n.npcBid}" data-npcask="${n.npcAsk == null ? -1 : n.npcAsk}"
      data-bestbid="${n.bestBid}" data-biddepth="${n.bidDepth}" data-bestask="${n.bestAsk}"
      data-askdepth="${n.askDepth}" data-trend="${n.trend}" data-volume="${n.volume}" data-held="${n.held}"
      data-hasasks="${n.asks.length ? 1 : 0}" data-hasbids="${n.bids.length ? 1 : 0}"
      data-npc="${n.npcBid != null || n.npcAsk != null ? 1 : 0}" data-flat="${item.flat ? 1 : 0}">
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
    els.marketBody.querySelectorAll('tr').forEach(row => {
      const d = row.dataset;
      let match = !needle || (d.name || '').includes(needle) || (d.id || '').toLowerCase().includes(needle);
      if (match && marketFilterValue === 'asks') match = d.hasasks === '1';
      else if (match && marketFilterValue === 'bids') match = d.hasbids === '1';
      else if (match && marketFilterValue === 'held') match = Number(d.held) > 0;
      else if (match && marketFilterValue === 'npc') match = d.npc === '1';
      else if (match && marketFilterValue === 'flat') match = d.flat === '1';
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (els.marketEmpty) {
      const hasRows = els.marketBody.querySelectorAll('tr').length > 0;
      els.marketEmpty.style.display = hasRows && visible === 0 ? 'block' : 'none';
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
      return;
    }
    els.marketBody.innerHTML = scan.items.map(marketRowHtml).join('');
    renderMarketSummary();
    applyMarketFilter();
    renderEconomyPulse();
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
  if (els.marketScanBtn) {
    els.marketScanBtn.addEventListener('click', () => startMarketScan());
  }
  if (els.marketDetailClose) {
    els.marketDetailClose.addEventListener('click', () => els.marketDetailOverlay.classList.add('hidden'));
    els.marketDetailOverlay.addEventListener('click', e => {
      if (e.target === els.marketDetailOverlay) els.marketDetailOverlay.classList.add('hidden');
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

  async function refreshEconomy() {
    if (economyBusy) return;
    economyBusy = true;
    if (els.economyRefreshBtn) { els.economyRefreshBtn.disabled = true; els.economyRefreshBtn.textContent = 'Refreshing…'; }
    showEconomyStatus('Fetching economy snapshot…', false);
    let resp = null;
    try { resp = await sendMessage({ type: 'FETCH_ECONOMY' }); } catch (e) { resp = null; }
    economyBusy = false;
    if (els.economyRefreshBtn) { els.economyRefreshBtn.disabled = false; els.economyRefreshBtn.textContent = 'Refresh'; }
    if (!resp?.success || !resp.data) {
      showEconomyStatus('Economy refresh failed: ' + escapeText(marketStaleHint(resp)), true);
      return;
    }
    currentEconomy = resp.data;
    renderEconomy();
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

  function renderEconomySummary() {
    const eco = currentEconomy;
    const r = eco.rates;
    const w = eco.world || {};
    const costs = r ? r.ingredientCostPerMin + r.wagePerMin + r.rentPerMin + r.logisticsWagePerMin : 0;
    const win = economyFlowWindow(eco);
    els.economySummary.innerHTML = statCards([
      ['Game Day', w.day == null ? '—' : fmtNum(w.day)],
      ['Cash', fmt(w.cash)],
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
})();