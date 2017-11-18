if ( 'serviceWorker' in navigator) {
    console.log('[app.js] serviceWorker supported ...');
    console.log('[app.js] Registering serviceWorker ...');
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('[app.js] serviceWorker registration has completed.');
        });
} else {
    console.log('[app.js] serviceWorker NOT SUPPORTED');
}

var deferredPromptEvent;
window.addEventListener('beforeinstallprompt', function(event) {
    console.log('[app.js] beforeinstallprompt fired ...');
    deferredPromptEvent = event;
    return false;
});

//////////////////////////////////////////////////
// BEGIN: Fetch Example
//////////////////////////////////////////////////
fetch('http://httpbin.org/ip')
.then(function(response) {
    console.log('BEGIN: [app.js/fetch/response]:'); 
    console.log(response); 
    console.log(':END: [app.js/fetch/response]'); 
    return response.json();
})
.then(function(data) {
    console.log('BEGIN: [app.js/fetch/data]:'); 
    console.log(data);
    console.log(':END: [app.js/fetch/data]'); 
})
.catch(function(error) {
    console.log('BEGIN: [app.js/fetch/error]:'); 
    console.log(error);
    console.log(':END: [app.js/fetch/error]'); 
});
//////////////////////////////////////////////////
// END: Fetch Example
//////////////////////////////////////////////////