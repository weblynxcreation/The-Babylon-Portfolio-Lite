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
    companySelect: document.getElementById('companySelect'),
    qtyInput: document.getElementById('qtyInput'),
    buyPriceInput: document.getElementById('buyPriceInput'),
    sellPriceInput: document.getElementById('sellPriceInput'),
    tradePrice: document.getElementById('tradePrice'),
    buyBtn: document.getElementById('buyBtn'),
    sellBtn: document.getElementById('sellBtn'),
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
    detailQtyInput: document.getElementById('detailQtyInput'),
    detailBuyPrice: document.getElementById('detailBuyPrice'),
    detailSellPrice: document.getElementById('detailSellPrice'),
    detailBuyBtn: document.getElementById('detailBuyBtn'),
    detailSellBtn: document.getElementById('detailSellBtn'),
    detailTradeInfo: document.getElementById('detailTradeInfo'),
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
    remoteStatus: document.getElementById('remoteStatus')
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

    els.detailQtyInput.value = '';
    els.detailBuyPrice.value = '';
    els.detailSellPrice.value = '';
    els.detailBuyPrice.placeholder = '$' + company.currentPrice.toLocaleString();
    els.detailSellPrice.placeholder = '$' + company.currentPrice.toLocaleString();
    els.detailBuyBtn.disabled = true;
    els.detailSellBtn.disabled = true;
    els.detailTradeInfo.textContent = '';

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

  // Detail trade section
  function updateDetailTradeInfo() {
    if (!currentDetailCompany) return;
    const qty = parseInt(els.detailQtyInput.value, 10);
    const c = currentDetailCompany;
    const buyP = parseFloat(els.detailBuyPrice.value) || c.currentPrice;
    const sellP = parseFloat(els.detailSellPrice.value) || c.currentPrice;
    const holding = currentHoldings.find(h => h.id === c.id);
    const owned = holding ? holding.owned : 0;

    els.detailBuyBtn.disabled = !qty || qty <= 0;
    els.detailSellBtn.disabled = !qty || qty <= 0 || owned < qty;

    if (qty && qty > 0) {
      els.detailTradeInfo.textContent = `Buy: $${(qty * buyP).toLocaleString()} | Sell: $${(qty * sellP).toLocaleString()}`;
    } else {
      els.detailTradeInfo.textContent = '';
    }
  }
  els.detailQtyInput.addEventListener('input', updateDetailTradeInfo);
  els.detailBuyPrice.addEventListener('input', updateDetailTradeInfo);
  els.detailSellPrice.addEventListener('input', updateDetailTradeInfo);

  async function doDetailTrade(type) {
    if (!currentDetailCompany) return;
    const qty = parseInt(els.detailQtyInput.value, 10);
    if (!qty || qty <= 0) return showToast('Enter a quantity', 'error');
    const c = currentDetailCompany;
    const price = type === 'buy'
      ? (parseFloat(els.detailBuyPrice.value) || c.currentPrice)
      : (parseFloat(els.detailSellPrice.value) || c.currentPrice);
    const msg = type === 'buy' ? 'BUY_SHARES' : 'SELL_SHARES';
    const r = await sendMessage({ type: msg, companyId: c.id, quantity: qty, price });
    if (r.success) {
      showToast(`${type.toUpperCase()} ${qty} ${c.name} @ $${price.toLocaleString()}`, 'success');
      closeDetail();
      await loadData();
    } else {
      showToast(r.error || 'Trade failed', 'error');
    }
  }
  els.detailBuyBtn.addEventListener('click', () => doDetailTrade('buy'));
  els.detailSellBtn.addEventListener('click', () => doDetailTrade('sell'));

  // Tabs
  els.tabBtns.forEach(btn => btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    els.tabBtns.forEach(b => b.classList.toggle('active', b === btn));
    els.panels.forEach(p => p.classList.toggle('active', p.id === `panel-${tab}`));
  }));

  // Populate dropdown
  function populateCompanies(companies) {
    currentCompanies = companies;
    const val = els.companySelect.value;
    els.companySelect.innerHTML = '<option value="">Select company…</option>';
    for (const c of companies) {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = `${c.name} — $${c.currentPrice.toLocaleString()}`;
      els.companySelect.appendChild(o);
    }
    if (companies.some(c => c.id === val)) els.companySelect.value = val;
    updateTradePrice();
  }

  function updateTradePrice(){
    const cid = els.companySelect.value;
    const c = currentCompanies.find(x => x.id === cid);
    const qty = parseInt(els.qtyInput.value, 10);
    if (c) {
      const buyPrice = parseFloat(els.buyPriceInput.value) || c.currentPrice;
      const sellPrice = parseFloat(els.sellPriceInput.value) || c.currentPrice;
      els.tradePrice.textContent = `Market: $${c.currentPrice.toLocaleString()}  ×${qty || 1} = $${((qty||1)*c.currentPrice).toLocaleString()}`;
      els.buyBtn.disabled = !qty || qty <= 0;
      const owned = currentHoldings.find(h => h.id === cid)?.owned || 0;
      els.sellBtn.disabled = !qty || qty <= 0 || owned < qty;
      if (!els.buyPriceInput.value) els.buyPriceInput.placeholder = `$${c.currentPrice.toLocaleString()}`;
      if (!els.sellPriceInput.value) els.sellPriceInput.placeholder = `$${c.currentPrice.toLocaleString()}`;
    } else {
      els.tradePrice.textContent = 'Price: $0.00';
      els.buyBtn.disabled = els.sellBtn.disabled = true;
    }
  }
  els.companySelect.addEventListener('change', updateTradePrice);
  els.qtyInput.addEventListener('input', updateTradePrice);
  els.buyPriceInput.addEventListener('input', updateTradePrice);
  els.sellPriceInput.addEventListener('input', updateTradePrice);

  // Click handler for company rows - open detail
  function attachRowClick() {
    // Overview rows - open detail
    els.overviewBody.querySelectorAll('tr').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        const cid = row.dataset.companyId;
        const c = currentCompanies.find(x => x.id === cid);
        if (c) openDetail(c);
      });
    });
    // Holdings rows
    els.holdingsBody.querySelectorAll('tr').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        const name = row.querySelector('.company-name')?.textContent;
        const c = currentCompanies.find(x => x.name === name);
        if (c) openDetail(c);
      });
    });
    // Dividends rows
    els.dividendsBody.querySelectorAll('tr').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        const name = row.querySelector('.company-name')?.textContent;
        const c = currentCompanies.find(x => x.name === name);
        if (c) openDetail(c);
      });
    });
  }

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
    const held = new Set(holdings.map(h => h.id));
    resetEmpty(els.overviewEmpty);
    if (!companies.length) { els.overviewBody.innerHTML = ''; els.overviewEmpty.style.display = 'block'; return; }
    els.overviewEmpty.style.display = 'none';
    els.overviewBody.innerHTML = companies.map((c, i) => {
      const h = holdings.find(x => x.id === c.id);
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
    attachRowClick();
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
    attachRowClick();
    restoreHoldingsSort();
    applySearch(els.holdingsBody, els.holdingsEmpty, holdingsSearchTerm);
    updateTradePrice();
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

    console.log('[Babylon] Portfolio chart: timeframe=', tf, 'maxPoints=', maxPoints, 'holdings=', currentHoldings.length);

    // Build portfolio value history from holdings + spark data
    const portfolioHistory = {};
    for (const h of currentHoldings) {
      const company = currentCompanies.find(c => c.id === h.id);
      if (!company || !company.spark || company.spark.length < 2) {
        console.log('[Babylon] Portfolio chart: skipping', h.name, 'no spark data');
        continue;
      }
      
      const spark = company.spark.length > maxPoints ? company.spark.slice(-maxPoints) : company.spark;
      console.log('[Babylon] Portfolio chart:', h.name, 'spark length=', spark.length, 'owned=', h.owned);
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

    console.log('[Babylon] Portfolio chart: aggregated data points=', data.length);

    if (!data.length) {
      console.log('[Babylon] Portfolio chart: no spark data available for holdings');
      if (els.portfolioChartEmpty) els.portfolioChartEmpty.style.display = 'block';
      if (els.portfolioProgress) els.portfolioProgress.style.display = 'none';
      if (portfolioChartInstance) {
        portfolioChartInstance.chart.remove();
        portfolioChartInstance = null;
      }
      return;
    }

    // Clear existing chart
    if (portfolioChartInstance) {
      portfolioChartInstance.chart.remove();
      portfolioChartInstance = null;
    }

    try {
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

      portfolioChartInstance = { chart, series };
      console.log('[Babylon] Portfolio chart created with', data.length, 'data points');

      // Calculate and display progress indicator
      if (els.portfolioProgress && data.length >= 2) {
        const startValue = data[0].value;
        const endValue = data[data.length - 1].value;
        const change = endValue - startValue;
        const changePct = (change / startValue) * 100;
        const isPositive = change >= 0;
        
        els.portfolioProgress.style.display = 'block';
        els.portfolioProgress.style.color = isPositive ? '#4ade80' : '#f87171';
        els.portfolioProgress.style.borderColor = isPositive ? 'var(--green)' : 'var(--red)';
        els.portfolioProgress.textContent = `${isPositive ? '+' : ''}${changePct.toFixed(2)}%`;
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
    const rows = Object.entries(dividends).map(([cid, total]) => {
      const c = companies.find(x => x.id === cid);
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
    attachRowClick();
  }

  // Render Analytics (Advanced Charts)
  function renderAnalytics(companies) {
    const analyticsPanel = document.getElementById('panel-analytics');
    if (!analyticsPanel || !analyticsPanel.classList.contains('active')) return;

    const filterVal = els.analyticsCompanyFilter?.value || 'all';
    let filtered = companies.filter(c => c.spark && c.spark.length > 1);
    if (filterVal === 'owned') {
      const ownedIds = new Set(currentHoldings.map(h => h.id));
      filtered = filtered.filter(c => ownedIds.has(c.id));
    }

    if (!filtered.length) {
      els.analyticsChartsGrid.innerHTML = '';
      els.analyticsEmpty.style.display = 'block';
      return;
    }
    els.analyticsEmpty.style.display = 'none';

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
      els.analyticsChartsGrid.innerHTML = '';
      Object.keys(chartInstances).forEach(id => {
        if (chartInstances[id].chart) chartInstances[id].chart.remove();
        delete chartInstances[id];
      });
      companies.forEach(c => createChartCard(c));
      attachChartClicks();
    }
  }

  function loadLightweightCharts() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('lib/lightweight-charts.standalone.production.js');
      script.onload = () => { console.log('[Babylon] Lightweight Charts loaded'); resolve(); };
      script.onerror = () => reject(new Error('Failed to load Lightweight Charts'));
      document.head.appendChild(script);
    });
  }

  function createChartCard(company) {
    const card = document.createElement('div');
    card.className = 'chart-card';
    card.innerHTML = `
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
    `;
    els.analyticsChartsGrid.appendChild(card);

    const chartContainer = document.getElementById(`chart-${company.id}`);
    if (!chartContainer || typeof LightweightCharts === 'undefined') {
      console.error('[Babylon] Chart container or LightweightCharts not available');
      return;
    }
    const chartHeight = chartContainer.clientHeight || (document.body.classList.contains('fulltab') ? 364 : 284);

    try {
      const chart = LightweightCharts.createChart(chartContainer, {
        layout: {background: {type: 'solid', color: '#121212'}, textColor: '#E8E6E1'},
        grid: {vertLines: {color: '#232323'}, horzLines: {color: '#232323'}},
        rightPriceScale: {borderColor: '#232323', scaleMargins: {top: 0.1, bottom: 0.1}},
        timeScale: {borderColor: '#232323', timeVisible: true, secondsVisible: false},
        crosshair: {mode: LightweightCharts.CrosshairMode.Normal, vertLine: {color: '#3A3A3F', width: 1, style: 2}, horzLine: {color: '#3A3A3F', width: 1, style: 2}},
        handleScroll: {mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true},
        handleScale: {mouseWheel: true, pinch: true, axisPressedMouseMove: {time: true, price: true}},
        width: chartContainer.clientWidth,
        height: chartHeight,
      });

      // Get chart type from selector
      const chartType = els.analyticsChartType?.value || 'candlestick';

      // Slice spark data based on timeframe
      const tf = els.analyticsTimeframe?.value || '24h';
      const tfHours = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 };
      const maxPoints = tfHours[tf] || 24;
      const fullSpark = company.spark;
      const spark = fullSpark.length > maxPoints ? fullSpark.slice(-maxPoints) : fullSpark;
      let series;
      const data = [];

      // Generate time-series data from spark
      for (let i = 0; i < spark.length; i++) {
        const close = spark[i];
        const time = Math.floor((Date.now() - (spark.length - 1 - i) * 3600 * 1000) / 1000);
        
        if (chartType === 'candlestick') {
          const prevClose = i > 0 ? spark[i-1] : close;
          const open = prevClose;
          const high = Math.max(open, close) * (1 + Math.random() * 0.005);
          const low = Math.min(open, close) * (1 - Math.random() * 0.005);
          data.push({time, open, high, low, close});
        } else {
          data.push({time, value: close});
        }
      }

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

      chartInstances[company.id] = {chart, series, card, chartContainer};
      
      console.log('[Babylon] Chart created for', company.name, 'type:', chartType);
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
      <td><button class="trade-btn sell cancel-order-btn" style="font-size:6px;padding:6px 10px;" ${!o.id ? 'disabled' : ''}>Cancel</button></td>
    </tr>`).join('');
  }

  // Cancel order handler
  els.ordersBody.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('cancel-order-btn')) return;
    const row = e.target.closest('tr');
    const orderId = row?.dataset.orderId;
    if (!orderId) return showToast('No order ID', 'error');
    
    e.target.disabled = true;
    e.target.textContent = 'Canceling…';
    
    try {
      const r = await sendMessage({ type: 'CANCEL_SHARE_ORDER', orderId });
      if (r.success) {
        showToast('Order cancelled', 'success');
        await loadData();
      } else {
        showToast(r.error || 'Cancel failed', 'error');
        e.target.disabled = false;
        e.target.textContent = 'Cancel';
      }
    } catch (err) {
      showToast('Cancel error: ' + err.message, 'error');
      e.target.disabled = false;
      e.target.textContent = 'Cancel';
    }
  });

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
    els.transactionsBody.innerHTML = txns.slice().reverse().map(t => {
      const c = currentCompanies.find(x => x.id === t.companyId);
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
        <button class="ipo-btn" data-listing="${o.listingId}" data-price="${o.floorPrice}">Place Bid @ Floor</button>
      </div>
    `).join('');
    // Attach IPO buy handlers
    els.ipoList.querySelectorAll('.ipo-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const listingId = btn.dataset.listing;
        const price = Number(btn.dataset.price);
        const qty = parseInt(prompt(`How many shares for ${btn.closest('.ipo-item').querySelector('.ipo-name').textContent} @ $${price.toLocaleString()}?`), 10);
        if (!qty || qty <= 0) return;
        try {
          const resp = await sendMessage({ type: 'BUY_IPO', listingId, price, quantity: qty });
          if (resp.success) { showToast(`IPO bid placed: ${qty} shares @ $${price.toLocaleString()}`, 'success'); }
          else showToast(resp.error || 'IPO bid failed', 'error');
        } catch (e) { showToast('IPO error: ' + e.message, 'error'); }
      });
    });
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
      const portfolioHistory = {};
      const maxPoints = 24; // 24 hours
      
      for (const h of holdings) {
        const company = currentCompanies.find(c => c.id === h.id);
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

  // Load all data
  async function loadData() {
    try {
      const resp = await sendMessage({ type: 'GET_PORTFOLIO' });
      if (!resp.success) { showToast('Load failed: ' + resp.error, 'error'); return; }
      const { companies, holdings, totalValue, dividends, totalDividends, transactions, orders, ipoOfferings, bankTransactions, dividendTransactions } = resp.data;
      currentTransactions = transactions || [];
      populateCompanies(companies);
      renderOverview(companies, holdings);
      renderHoldings(holdings);
      renderDividends(companies, dividends, totalDividends, holdings);
      renderAnalytics(companies);
      renderOrders(orders);
      renderTransactions(transactions);
      renderIpo(ipoOfferings || []);
      renderSummary(totalValue, holdings, orders.length);
    } catch (e) { console.error(e); showToast('Load error: ' + e.message, 'error'); }
  }

  // Trade handlers
  async function doTrade(type) {
    const cid = els.companySelect.value;
    const qty = parseInt(els.qtyInput.value, 10);
    if (!cid || isNaN(qty) || qty <= 0) return showToast('Pick company & qty', 'error');
    const c = currentCompanies.find(x => x.id === cid);
    const price = type === 'buy'
      ? (parseFloat(els.buyPriceInput.value) || c.currentPrice)
      : (parseFloat(els.sellPriceInput.value) || c.currentPrice);
    const msg = type === 'buy' ? 'BUY_SHARES' : 'SELL_SHARES';
    const r = await sendMessage({ type: msg, companyId: cid, quantity: qty, price });
    if (r.success) {
      showToast(`${type.toUpperCase()} ${qty} ${c.name} @ $${price.toLocaleString()}`, 'success');
      els.qtyInput.value='';
      await loadData();
    }
    else showToast(r.error || 'Failed', 'error');
  }
  els.buyBtn.addEventListener('click', () => doTrade('buy'));
  els.sellBtn.addEventListener('click', () => doTrade('sell'));
  els.refreshBtn.addEventListener('click', async () => {
    els.refreshBtn.disabled = true; els.refreshBtn.textContent = 'Loading…';
    await loadData();
    els.refreshBtn.disabled = false; els.refreshBtn.textContent = 'Refresh';
    showToast('Refreshed', 'info');
  });


  // Analytics Refresh
  els.analyticsRefreshBtn.addEventListener('click', async () => {
    els.analyticsRefreshBtn.disabled = true;
    els.analyticsRefreshBtn.textContent = 'Loading…';
    await loadData();
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
      if (btn.dataset.tab === 'analytics') {
        setTimeout(() => loadData(), 50);
      } else if (btn.dataset.tab === 'holdings') {
        setTimeout(() => renderPortfolioChart(), 50);
      } else if (btn.dataset.tab === 'settings') {
        setTimeout(() => loadDetectionStatus(), 50);
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
      Object.values(chartInstances).forEach(inst => {
        if (inst.chart && inst.chartContainer) {
          inst.chart.resize(inst.chartContainer.clientWidth, inst.chartContainer.clientHeight);
        }
      });
      // Column count changed between popup/full-tab → re-render analytics if visible
      if (wasFull !== document.body.classList.contains('fulltab')) {
        if (document.getElementById('panel-analytics')?.classList.contains('active')) loadData();
      }
    }, 150);
  });

  loadData();
})();