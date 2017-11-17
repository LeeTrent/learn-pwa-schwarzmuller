self.addEventListener('install', function(event) {
    console.log('[sw.js] Installing serviceWorker ...', event);
});

self.addEventListener('activate', function(event) {
    console.log('[sw.js] Activating serviceWorker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('[sw.js] Fetching ...', event);
    event.respondWith(fetch(event.request));
});