
var CACHE_STATIC_NAME  = 'lee-static-v001';
var CACHE_DYNAMIC_NAME = 'lee-dynamic-v001';
var OFFLINE_PAGE_NAME  = '/offline.html';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.html',
          '/offline.html',
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
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {
//               return caches.open(CACHE_STATIC_NAME)
//                 .then(function(cache) {
//                   return cache.match(OFFLINE_PAGE_NAME)
//                 });
//             });
//         }
//       })
//   );
// });

self.addEventListener('fetch', function(event) {
  var url = 'https://httpbin.org/get';
  
  if (event.request.url.indexOf(url) > -1) {
    // CACHE, THEN NETWORK STRATEGY
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
          return fetch(event.request)
            .then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
        })
    );
  } else {
    // CACHE WITH NETWORK FALLBACK STRATEGY
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match(OFFLINE_PAGE_NAME)
                });
            });
        }
      })
    );
  }
});

//////////////////////////////////////////////////
// CACHE ONLY STRATEGY
// (not recommended)
/////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

//////////////////////////////////////////////////
// NETWORK ONLY STRATEGY 
// ( 
//   Not recommended and not needed. 
//   Just disable the service worker and all
//   requests will become network requests
//   from the HTML page, etc.
// )
/////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

//////////////////////////////////////////////////
// NETWORK WITH CACHE FALLBACK STRATEGY
// (not recommended)
/////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith (
//     fetch(event.request)
//       .catch(function(error) {
//         return caches.match(event.request);
//       })
//   );
// });

//////////////////////////////////////////////////
// NETWORK WITH CACHE FALLBACK AND DYNAMIC CACHING
// STRATEGY (not recommended)
/////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith (
//     fetch(event.request)
//       .then(function(resp) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function(cache) {
//                     cache.put(event.request.url, resp.clone());
//                     return resp;
//                   })
//       })
//       .catch(function(error) {
//         return caches.match(event.request);
//       })
//   );
// });