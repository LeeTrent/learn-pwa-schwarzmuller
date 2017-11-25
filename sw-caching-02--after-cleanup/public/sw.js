var CACHE_VERSION_STATIC    = 'lee-app-shell-v4';
var CACHE_VERSION_DYNAMIC   = 'lee-dynamic';

self.addEventListener('install', function(event) {
  console.log('[lee-sw.js] Installing Service Worker ...', event);
  event.waitUntil (
    caches.open(CACHE_VERSION_STATIC)
      .then(function(cache) {
        console.log('BEGIN: [lee-sw.js] Pre-caching App Shell ...');
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/promise.js',
          '/src/js/fetch.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
        console.log('END: [lee-sw.js] Pre-caching App Shell ...');
    })
  );
 });

self.addEventListener('activate', function(event) {
  console.log('[lee-sw.js] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if ( key != CACHE_VERSION_STATIC
                && key != CACHE_VERSION_DYNAMIC ) {
                console.log('[lee-sw.js] Removing old cache ...', key);
                return caches.delete(key)
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              caches.open(CACHE_VERSION_DYNAMIC)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err ){
            });
        }
      })
  );
});