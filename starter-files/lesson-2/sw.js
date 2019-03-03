var cacheFiles = [
	'/offline/',
	'main.js',
	'style.css',
	'pwa-lighthouse.png'
];

var cachedVersion = 1;
var cacheName = 'pwa-workshop-v' + cachedVersion;

self.addEventListener('install', function(event) {
	event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
				//console.log('Opened cache');
        return cache.addAll(cacheFiles);
			})
			.then(function() {
				self.skipWaiting();
			})
			.catch(error => console.log(error))
	);
});


// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pwa-workshop-v' + cachedVersion];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

	/**********
	 *
	 *  STEP 2.3
	 *
	 * *********/

	// currently in our fetch event we are check if the request is a GET request and the file is a HTML file.
	// this is just so we return an offline page and the else is to just server our CSS & JS.

	// we need to adjust this a little and add an else if in there to check if the request method is a post request
	// if it is then we need to use the event.respondWith function to fetch for that request
	// our catch event should call our savePostRequest function passing in the events request url & then form_data variable.

	if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
		event.respondWith(
			fetch(event.request.url).catch(error => {
			// Return the offline page
				return caches.match('/offline/');
			})
		);
	}
	else {
			// Respond with everything else if we can
		event.respondWith(
			caches.match(event.request)
			.then(function (response) {
				return response || fetch(event.request);
			})
			.catch(error => new Error(error))
		);
	}
});


/**********
 *
 *  STEP 2.1
 *
 * *********/

let our_db;
let form_data;

function openDatabase () {
	// We need to create an indexDBOpenRequest
	// indexedDB has an open method which takes in two properties
	// name - the name of the indexedDB store
	// version - used for version control so if there is a new an updated version because you have made changes then a new database will be overwrite the previous
	// create a variable with the value of the indexDB open method.

	// next we need to assign an onerror function just to catch any errors with the DB
	// the function has an error parameter that you can just console.error(error);


	// next we need to create a onupgradeneeded function which will create an objectStore for us.
	// this is where we setup all of our tables.
	// inside the function we need to use this.result.createObjectStore method to create a table. It takes the following params:
	// table_name = - we are going to use post_requests for this demo.
	// object - this object has many props but we only need to set autoIncrement: true, keyPath: 'id'


  // Finally we need to fire an onsuccess function where we assign our_db = this.result
}

openDatabase();

/**********
 *
 *  STEP 2.2
 *
 * *********/

self.addEventListener('message', function (event) {
	// console.log('form data', event.data);

	// if event.data has the prop of form_data then assign a variable called form_data(needs to be global scope)
});


/**********
 *
 *  STEP 2.5
 *
 * *********/

// this function just returns a promise with the table name
// storeName: should really be table name
// mode: what you want to do with it? So we will use it for readWrite
function getObjectStore (storeName, mode) {
  // retrieve our object store
  return our_db.transaction(storeName, mode).objectStore(storeName);
}

function savePostRequests (url, payload) {
	// console.log(url, payload);if you need it
	// get object_store and save our payload inside it

	// so now we need to make a variable which calls the getObjectStore function
	// we need to give it two parameters:
	// table name - post_requests
	// permissions parameter to be set to readwrite

	// now our getObjectStore should return a promise with options to do things to that table.
	// we need to use the add method and pass in an object:
	// url
	// payload
	// method


	// next we need to just check if that post request was added to the DB so we can fire a onsuccess function which will
	// just console log that we have saved our data.


	// then we need to do the same as above but for the onerror.
}


/**********
 *
 *  STEP 2.6
 *
 * *********/

self.addEventListener('sync', function (event) {
	// a sync event is fired when a user comes back online.
	// if multiple syncs are registered then the event will be fire multiple times for each tag

	// we need to check if our event.tag === 'sendFormData'

	// if it is then we need to use event.waitUntil(sendPostToServer);
});

/**********
 *
 *  STEP 2.7
 *
 * *********/

function sendPostToServer () {
	// console.log('background sync kicking in');
	const savedRequests = [];

	// create a variable which uses the the getObjectStore function
	// use post_requests as the first param & 'readwrite'
	// after that the getObjectStore will return a method called openCursor() we need to use this.


	// like before we need to now add an onsuccess function which passes down an event parameter.
		// assign a cusror variable which is the event.target.result
		// we need to check if cursor is defined
			// push the value property of cursor to the saveRequests array
			// the continue function property on cursor needs to be called.
			// this will fire another onsuccess function until all requests are pushed into the save request array
		// else
			// else will only ever be fired if there are no more keys in the post_requests store
			// we need to loop through saved requests and then send them off to the server
			// we need to get the { url, payload, method, id } from the item in the loop
			// next we need to make a fetch request passing two params in
				// param 1 url
				// param 2 object { headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, method: method, body: JSON.stringify(payload) }
			// .then we need to handle what comes back from the server. all we want to do is return response.text();
			// .then once the text is returned I just want you to console log the text so we know its worked and we need to delete the post_request in the table
			// to delete we need to call our getObjectStore function which returns a delete method which takes the id of the savedRequest.
		// dont forget to add your .catch ;)
}
