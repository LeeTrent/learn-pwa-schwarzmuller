var dbPromise = idb.open('posts-store', 1, function(db) {
    if ( ! db.objectStoreNames.contains('posts') ) {
      db.createObjectStore('posts', {keyPath: 'id'});
    }
    if ( ! db.objectStoreNames.contains('sync-posts') ) {
        db.createObjectStore('sync-posts', {keyPath: 'id'});
      }    
  });

function writeData(dataStore, data) {
   console.log('writeData: ' + dataStore);
   return dbPromise
    .then(function(db) {
        var tx = db.transaction(dataStore, 'readwrite');
        var store = tx.objectStore('posts');
        store.put(data);
        return tx.complete;
    });   
} 
function readAllData(dataStore) {
    console.log('readAllData: ' + dataStore);
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(dataStore, 'readonly');
            var objStore = tx.objectStore(dataStore);
            return objStore.getAll();
        });
}     

function clearAllData(dataStore) {
    console.log('clearAllData: ' + dataStore);
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(dataStore, 'readwrite');
            var objStore = tx.objectStore(dataStore);
            objStore.clear();
            return tx.complete;
        });
}

function deleteDataItem(dataStore, id) {
    console.log('deleteDataItem: ' + dataStore + " / " + id);
    dbPromise
        .then(function(db) {
            var tx = db.transaction(dataStore, 'readwrite');
            var objStore = tx.objectStore(dataStore);
            objStore.delete(id);
            return tx.complete;
        })
        .then(function() {
            console.log("Item with ID of '" + id + "' has been deleted");
        });
}