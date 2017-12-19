var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');
var form = document.querySelector('form');
var titleInput = document.querySelector('#title');
var locationInput = document.querySelector('#location');

function openCreatePostModal() {
  //createPostArea.style.display = 'block';
  //setTimeout(function() {
    createPostArea.style.transform = 'translateY(0)';
  //}, 1);
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.getRegistrations()
  //     .then(function(registrations) {
  //       for (var i = 0; i < registrations.length; i++) {
  //         registrations[i].unregister();
  //       }
  //     })
  // }
}

function closeCreatePostModal() {
  createPostArea.style.transform = 'translateY(100vh)';
  //createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// Currently not in use, allows to save assets in cache on demand otherwise
function onSaveButtonClicked(event) {
  console.log('clicked');
  if ('caches' in window) {
    caches.open('user-requested')
      .then(function(cache) {
        cache.add('https://httpbin.org/get');
        cache.add('/src/images/sf-boat.jpg');
      });
  }
}

function clearCards() {
  while(sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url(' + data.image + ')';
  cardTitle.style.backgroundSize = 'cover';
  //cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color = 'white';
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = 'Save';
  // cardSaveButton.addEventListener('click', onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  //componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function updateUI(data) {
  clearCards();
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

var url = 'https://lee-pwagram.firebaseio.com/posts.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('[feed.js] fetch ...', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });

if ('indexedDB' in window) {
  console.log('[feed.js] Calling readAllData');
  readAllData('posts')
    .then(function(data) {
      if ( !networkDataReceived) {
        console.log('[feed.js/] indexedDB ...', data);
        updateUI(data);
      }
    });
}

function sendData() {
  console.log('[feed.js][sendData]');
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify( {
      id: new Date().toISOString(),
      title: titleInput.value,
      location: locationInput.value,
      image: 'https://firebasestorage.googleapis.com/v0/b/lee-pwagram.appspot.com/o/sf-boat.jpg?alt=media&token=9a0a8dec-3c3a-4f50-848f-d2aed7edd081'
    })
  })
  .then(function(response) {
    console.log('[feed.js][sendData] response', response);
    console.log('[feed.js][sendData] Calling [feed.js][updateUI]');
    updateUI();
  })
}

form.addEventListener('submit', function(event) {
  console.log('[feed.js][submit]');
  event.preventDefault();
  if ( titleInput.value.trim() === ''
        || locationInput.value.trim() == '') {
          alert('Please enter valid data.')
          return;
  }
  closeCreatePostModal();
  if ('serviceWorker' in window && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(function(sw) {
        var post = {
          id: new Date().toISOString(),
          title: titleInput.value,
          location: locationInput.value
        };
        console.log('[feed.js][submit] Calling [utility.js][wrtieData]');
        writeData('sync-posts', post)
          .then(function() {
            console.log('[feed.js][submit] Returned from [utility.js][wrtieData]');
            console.log("[feed.js][submit] sw.sync.register('sync-new-post')");
            return sw.sync.register('sync-new-posts');
          })
          .then(function() {
            console.log('[feed.js][submit] Background sync was successful/updating UI');
            var snackbarContainer = document.querySelector('#confirmation-toast');
            var msg = { message: "Your post have been saved!" };
            snackbarContainer.MaterialSnackbar.showSnackbar(msg);
          })
          .catch(function(error) {
            console.log('[feed.js][submit] Exception encountered');
            console.log(error);
          });
      });
  } else {
    sendData();
  }
});