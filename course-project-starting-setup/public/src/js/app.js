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