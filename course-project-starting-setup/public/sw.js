self.addEventListener('install', function(event) {
    console.log('[sw.js] Installing serviceWorker ...', event);
});

self.addEventListener('activate', function(event) {
    console.log('[sw.js] Activating serviceWorker ...', event);
    return self.clients.claim();
});