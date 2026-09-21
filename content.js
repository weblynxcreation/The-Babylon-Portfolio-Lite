// The Babylon Portfolio – Content Script (Isolated World)
// Injects main world script and relays messages to background

(function() {
  'use strict';
  
  // Inject main world script
  function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.onload = () => script.remove();
    (document.documentElement || document.head || document.body).appendChild(script);
  }
  
  // Wait for DOM if needed
  if (document.documentElement) {
    injectScript();
  } else {
    document.addEventListener('DOMContentLoaded', injectScript);
  }
  
  // Relay messages from main world to background
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (!event.data || event.data.__bpt !== 'api-response') return;
    
    chrome.runtime.sendMessage({
      type: 'API_DATA',
      data: event.data.payload
    }).catch(() => {});
  });
  
  // Forward messages from background to main world
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CONFIG' || message.type === 'TRIGGER_FETCH') {
      window.postMessage({ __bpt: message.type, ...message }, '*');
    }
    return true;
  });

  // Heartbeat while the game tab is open: wakes the worker to poll for trades
  // even when the browser throttles extension alarms.
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    chrome.runtime.sendMessage({ type: 'SITE_TICK' }).catch(() => {});
  }, 30000);
})();
