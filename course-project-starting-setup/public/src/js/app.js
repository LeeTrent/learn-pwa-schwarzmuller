//////////////////////////////
// BEGIN: Add polyfill support 
// if browser does not support
// Javascript Promises and the
// Fetch API
//////////////////////////////
if ( ! window.Promise ) {
    window.Promise = Promise;
}
//////////////////////////////

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
// BEGIN: AJAX GET Example
//////////////////////////////////////////////////
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://httpbin.org/ip');
xhr.responseType = 'json';
xhr.onload = function() {
    console.log('BEGIN: [app.js/ajax/get/onload:'); 
    console.log(xhr.response);
    console.log('END: [app.js/ajax/get/onload:');
};
xhr.onerror = function() {
    console.log('BEGIN: [app.js/ajax/get/onerror:'); 
    console.log(xhr.response);
    console.log('END: [app.js/ajax/get/onerror:');
};
xhr.send();
//////////////////////////////////////////////////
// END: AJAX GET Example
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// BEGIN: Fetch GET Example
//////////////////////////////////////////////////
fetch('http://httpbin.org/ip')
.then(function(response) {
    console.log('BEGIN: [app.js/fetch/get/response]:'); 
    console.log(response); 
    console.log(':END: [app.js/fetch/get/response]'); 
    return response.json();
})
.then(function(data) {
    console.log('BEGIN: [app.js/fetch/get/data]:'); 
    console.log(data);
    console.log(':END: [app.js/fetch/get/data]'); 
})
.catch(function(error) {
    console.log('BEGIN: [app.js/fetch/get/error]:'); 
    console.log(error);
    console.log(':END: [app.js/fetch/get/error]'); 
});
//////////////////////////////////////////////////
// END: Fetch GET Example
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// BEGIN: Fetch POST Example
//////////////////////////////////////////////////
fetch('http://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify (
        { message: 'Does this work?' }
    )
})
.then(function(response) {
    console.log('BEGIN: [app.js/fetch/post/response]:'); 
    console.log(response); 
    console.log(':END: [app.js/fetch/post/response]'); 
    return response.json();
})
.then(function(data) {
    console.log('BEGIN: [app.js/fetch/post/data]:'); 
    console.log(data);
    console.log(':END: [app.js/fetch/post/data]'); 
})
.catch(function(error) {
    console.log('BEGIN: [app.js/fetchpost/post/error]:'); 
    console.log(error);
    console.log(':END: [app.js/fetch/post/error]'); 
});
//////////////////////////////////////////////////
// END: Fetch POST Example
//////////////////////////////////////////////////


