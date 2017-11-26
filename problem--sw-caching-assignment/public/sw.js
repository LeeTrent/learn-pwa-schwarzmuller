var CACHE_VERSION_STATIC    = 'swca-static-v4';
var CACHE_VERSION_DYNAMIC   = 'swca-dynamic-v4';

self.addEventListener('install', function(event) {
  console.log('[SWCA/main.js] Installing Service Worker ...', event);
  event.waitUntil (
    caches.open(CACHE_VERSION_STATIC)
      .then(function(cache) {
        console.log('BEGIN: [SWCA/sw.js] Pre-caching App Shell ...');
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/fetch.js',       
          '/src/js/main.js',
          '/src/js/material.min.js',
          '/src/js/promise.js',
          '/src/css/app.css',
          '/src/css/main.css',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
        console.log('END: [SWCA/sw.js] Pre-caching App Shell');
    })
  );
 });

 self.addEventListener('activate', function(event) {
    console.log('[SWCA/sw.js] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys()
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if ( key != CACHE_VERSION_STATIC
                  && key != CACHE_VERSION_DYNAMIC ) {
                  console.log('[SWCA/sw.js] Removing old cache ...', key);
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
                return caches.open(CACHE_VERSION_DYNAMIC)
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