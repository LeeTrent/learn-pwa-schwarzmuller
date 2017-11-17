var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  
  ///////////////////////////////////////
  // BEGIN: Add app to home screen logic
  ///////////////////////////////////////
  if (deferredPromptEvent) {
    deferredPromptEvent.userChoice.then(function(choiceResult) {
      console.log('[feed.js] ' + choiceResult.outcome)
      if ( choiceResult.outcome === 'dismissed') {
        console.log('[feed.js] User cancelled home screen installation.')
       } else {
        console.log('[feed.js] User completed home screen installation.')
       }
    });
    deferredPromptEvent = null;
  }
  ///////////////////////////////////////
  // END: Add app to home screen logic
  ///////////////////////////////////////  
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
