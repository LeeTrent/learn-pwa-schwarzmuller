
var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Registered Service Worker!');
    });
}

button.addEventListener('click', function(event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }
});

// var networkResponseReceived = false;
// var url = 'https://httpbin.org/ip';
// fetch(url)
//   .then(function(res) {
//     return res.json();
//   })
//   .then(function(data) {
//     networkResponseReceived = true;
//     console.log('[main.js] fetch/networkResponseReceived: ' + networkResponseReceived);
//     console.log('[main.js] fetch/data: ' + data);
//     console.log('[main.js] fetch/data.origin: ' + data.origin);
//     box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
//     console.log('box.style.height: ' + box.style.height);
//   });
  
//   ///////////////////////////////
//   // CACHE, THEN NETWORK STRATEGY
//   ///////////////////////////////
//   if ('caches' in window) {
//     caches.match(url)
//     .then(function(response) {
//       if (response) {
//         return response.json();
//       }
//     })
//     .then(function(data) {
//       console.log('[main.js] cache/networkResponseReceived: ' + networkResponseReceived);
//       console.log('[main.js] cache/data: ' + data);
//       if ( ! networkResponseReceived && data) {
//         box.style.height = (data.origin.substr(0, 2) * 20) + 'px';
//         console.log('box.style.height: ' + box.style.height);
//       }
//     });
//   }

var url = 'https://httpbin.org/ip';
var networkResponseReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkResponseReceived = true;
    console.log('[main.js] from network (data): ', data);
    console.log('[main.js] from network (data.origin): ', data.origin);
    console.log(data.origin);
    box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  });

if ('caches' in window) {
  caches.match(url)
    .then(function(res) {
      if (res) {
        return res.json();
      }
    })
    .then(function(data) {
      console.log('[main.js] from cache (networkResponseReceived): ', networkResponseReceived);
      console.log('[main.js] from cache (data): ', data);
      console.log('[main.js] from cache (data.origin): ', data.origin);
      if (!networkResponseReceived) {
        box.style.height = (data.origin.substr(0, 2) * 20) + 'px';
      }
    });
}


// 1) Identify the strategy we currently use in the Service Worker (for caching)
// 2) Replace it with a "Network only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 3) Replace it with a "Cache only" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 4) Replace it with "Network, cache fallback" strategy =>  => Clear Storage (in Dev Tools), reload & try using your app offline
// 5) Replace it with a "Cache, then network" strategy => Clear Storage (in Dev Tools), reload & try using your app offline
// 6) Add "Routing"/ URL Parsing to pick the right strategies: Try to implement "Cache, then network", "Cache with network fallback" and "Cache only" (all of these, with appropriate URL selection)

// Important: Clear your Application Storage first to get rid of the old SW & Cache from the Main Course Project!