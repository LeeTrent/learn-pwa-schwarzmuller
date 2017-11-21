
var button = document.querySelector('#start-button');
var output = document.querySelector('#output');
var output2 = document.querySelector('#output2');

button.addEventListener('click', function() {

  //////////////////////////////////////////////////////
  // BEGIN: 'GET' Request
  //////////////////////////////////////////////////////  
  var promise = new Promise( function(resolve, reject) {
    console.log("'GET' Timeout set ...");
    setTimeout( function() {
      console.log("Resolving url ...");
      resolve('https://swapi.co/api/xxpeople/1');
    }, 3000);
  })
  .then( function(url) {
    console.log("Fetching url ...");
    return fetch(url); // GET Request is the default - no config required
  })
  .then(function(response) {
    console.log("Processing response ...");
    return response.json();
  })
  .then(function(data) {
    console.log("Assigning processed data to to 'output' div tag ...");
    output.textContent = data.name;
  })
  .catch( function(error) {
    console.log("Processing GET error ...");
    console.log(error);
  });
  //////////////////////////////////////////////////////
  // END: 'GET' Request
  //////////////////////////////////////////////////////  

  //////////////////////////////////////////////////////
  // BEGIN: 'PUT' Request
  //////////////////////////////////////////////////////  
  var promise2 = new Promise( function(resolve, reject) {
    console.log("'PUT' Timeout set ...");
    setTimeout( function() {
      console.log("Resolving PUT url ...");
      resolve('https://httpbin.org/puts');
    }, 3000);
  })
  .then( function(url) {
    console.log("Fetching PUT url ...");
    return fetch(url, 
      {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(
          { person: { name: 'Casey', age: 10 } }
        )
      }); // GET Request is the default - no config required
  })
  .then(function(response) {
    console.log("Processing PUT response ...");
    return response.json();
  })
  .then(function(data) {
    console.log("Assigning processed data to to 'output' div tag ...");
    output2.textContent = data.json.person.name + ' / ' + data.json.person.age;
  })
  .catch( function(error) {
    console.log("Processing PUT error ...");
    console.log(error);
  });
  //////////////////////////////////////////////////////
  // END: 'PUT' Request
  //////////////////////////////////////////////////////   
});