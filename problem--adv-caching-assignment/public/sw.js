
var CACHE_STATIC_NAME = 'lee-static-v12';
var CACHE_DYNAMIC_NAME = 'lee-dynamic-v12';
var STATIC_FILES = [
  '/',
  '/index.html',
  '/src/css/app.css',
  '/src/css/main.css',
  '/src/js/main.js',
  '/src/js/material.min.js',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll(STATIC_FILES);
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

//////////////////////////////////////////////////////
// CACHING STRATEGY:
// NETWORK WITH CACHE FALLBACK (PLUS DYNAMIC CACHING)
// (not recommended)
/////////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith (
//     fetch(event.request)
//       .then(function(response) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//           .then(function(cache) {
//             cache.put(event.request.url, response.clone());
//             return response;
//           });
//       })    
//       .catch(function(error) {
//         return caches.match(event.request);
//       })
//   );
// });

//////////////////////////////////////////////////////
// CACHING STRATEGY:
// DYNAMIC CACHING FOR 'CACHE, THEN NETWORK' STRATEGY
/////////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   event.respondWith (
//     caches.open(CACHE_DYNAMIC_NAME)
//       .then(function(cache) {
//         return fetch(event.request)
//           .then(function(response) {
//             cache.put(event.request.url, response.clone());
//             return response;
//           })
//       })
//   );
// });

/////////////////////////////////////////////////////
// CACHING STRATEGY:
//  - Cache, then network 
//  - Cache with network fallback 
//  - Cache only 
// (all of these, with appropriate URL selection)
/////////////////////////////////////////////////////
// self.addEventListener('fetch', function(event) {
//   var url = 'https://httpbin.org/get';
  
//   if (event.request.url.indexOf(url) > -1) {
//     // CACHE, THEN NETWORK STRATEGY
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function(cache) {
//           return fetch(event.request)
//             .then(function(response) {
//               cache.put(event.request, response.clone());
//               return response;
//             });
//         })
//     );
//   } else if ( isInArray(event.request.url, STATIC_FILES) ) {
//     event.respondWith(
//       caches.match(event.request)
//     );
//   } else {
//     // CACHE WITH NETWORK FALLBACK STRATEGY
//     event.respondWith(
//       caches.match(event.request)
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
//               // return caches.open(CACHE_STATIC_NAME)
//               //   .then(function(cache) {
//               //     if (event.request.url.indexOf(HELP_URI)) {
//               //       return cache.match(OFFLINE_PAGE_NAME)
//               //     }
//               //   });
//             });
//         }
//       })
//     );
//   }
// });

/////////////////////////////////////////////////////
// CACHING STRATEGY:
//  - Cache, then network 
//  - Cache with network fallback 
//  - Cache only 
// (all of these, with appropriate URL selection)
/////////////////////////////////////////////////////
// self.addEventListener('fetch', function (event) {
//   if (event.request.url.indexOf('https://httpbin.org/ip') > -1) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function (cache) {
//           return fetch(event.request)
//             .then(function (res) {
//               cache.put(event.request.url, res.clone());
//               return res;
//             })
//         })
//     );
//   } else if (isInArray(event.request.url, STATIC_FILES)) {
//     event.respondWith(
//       caches.match(event.request)
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function (response) {
//           if (response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function (cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   });
//               })
//               .catch(function (err) {
//                 console.log("[sw.js] Exception caught in fetch: " + err);
//               });
//           }
//         })
//     );
//   }
// });

/////////////////////////////////////////////////////
// CACHING STRATEGY:
//  - Cache, then network 
//  - Cache with network fallback 
//  - Cache only 
// (all of these, with appropriate URL selection)
/////////////////////////////////////////////////////
self.addEventListener('fetch', function (event) {
  var url = 'https://httpbin.org/get';
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
        .then(function (cache) {
          return fetch(event.request)
            .then(function (res) {
              cache.put(event.request, res.clone());
              return res;
            });
        })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(
      caches.match(event.request)
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function (res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function (cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function (err) {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function (cache) {
                    if (event.request.headers.get('accept').includes('text/html')) {
                      return cache.match('/offline.html');
                    }
                  });
              });
          }
        })
    );
  }
});

function isInArray(string, array) {
  // console.log("BEGIN: isInArray()");
  // console.log("self.origin: " + self.origin);
  // console.log("string: " + string);
  var cachePath;
  if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log('matched ', string);
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  // console.log("cachePath: " + cachePath);
  // console.log("END: isInArray() / returning " + array.indexOf(cachePath) > -1 );
  return array.indexOf(cachePath) > -1;
}