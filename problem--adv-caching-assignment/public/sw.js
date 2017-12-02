
var CACHE_STATIC_NAME = 'static-v6';
var CACHE_DYNAMIC_NAME = 'dynamic-v6';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

////////////////////////////////////////////////////
// CACHING STRATEGY:
// CACHE WITH NETWORK FALLBACK PLUS DYNAMIC CACHING
////////////////////////////////////////////////////
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
//                 });
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
// });

////////////////////////////////////////////////////
// CACHING STRATEGY:
// NETWORK ONLY  
// ( 
//   Not recommended and not needed. 
//   Just disable the service worker and all
//   requests will become network requests
//   from the HTML page, etc.
// )
////////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

//////////////////////////////////////////////////
// CACHING STRATEGY:
// CACHE ONLY (not recommended)
/////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

////////////////////////////////////////////////////
// CACHING STRATEGY:
// NETWORK WITH CACHE FALLBACK PLUS DYNAMIC CACHING
// (not recommended)
///////////////////////////////////////////////////
self.addEventListener('fetch', function(event) {
  event.respondWith (
    fetch(event.request)
      .then(function(response) {
        return caches.open(CACHE_DYNAMIC_NAME)
          .then(function(cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
      })    
      .catch(function(error) {
        return caches.match(event.request);
      })
  );
});