// The Babylon Portfolio – Inject Script (Main World)
// Fetches share listings from the Capital Rift API using the signed-in session,
// posts them to the isolated world. The playerId is resolved from /api/me rather
// than hardcoded — game API access is scoped to the current account.

(() => {
  const ORIGIN = 'https://play.capitalrift.com/api';
  const FETCH_INTERVAL = 30000; // 30 seconds
  let playerId = null;

  async function resolvePlayerId() {
    if (playerId) return playerId;
    const res = await fetch(`${ORIGIN}/me`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} resolving player id`);
    const me = await res.json();
    playerId = me?.playerId || me?.player?.id || me?.id || me?.uuid || null;
    if (!playerId) throw new Error('playerId missing from /api/me');
    return playerId;
  }

  async function fetchAndPost() {
    try {
      const pid = await resolvePlayerId();
      const res = await fetch(`${ORIGIN}/game/${encodeURIComponent(pid)}/shares/listings`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      window.postMessage({ __bpt: 'api-response', payload: data }, '*');
    } catch (e) {
      console.error('[Babylon] fetch error:', e);
    }
  }

  // Initial fetch
  fetchAndPost();

  // Periodic fetch
  setInterval(fetchAndPost, FETCH_INTERVAL);

  // Listen for manual trigger from background
  window.addEventListener('message', (e) => {
    if (e.source !== window) return;
    if (e.data && e.data.__bpt === 'TRIGGER_FETCH') fetchAndPost();
  });
})();
