if ( 'serviceWorker' in navigator) {
    console.log('serviceWorker supported ...');
    console.log('Registering serviceWorker ...');
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('serviceWorker registration has completed.');
        });
} else {
    console.log('serviceWorker NOT SUPPORTED');
}