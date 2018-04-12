var cacheFiles = [
	'/offline/',
	'/background-sync/',
	'main.js',
	'style.css',
	'pwa-lighthouse.png'
];

var cachedVersion = 1;
var cacheName = 'pwa-workshop-v' + cachedVersion;


function showNotification() {
	const title = 'Pizza Order';

  const options = {
    body: `Your pizza order has gone through`,
    icon: 'pwa-lighthouse.png',
		badge: 'pwa-lighthouse.png',
		actions: [
			{ 'action': 'view-order', 'title': 'View Order'}
		]
	};

  self.registration.showNotification(title, options);
}

/*

	STEP 2.1 - INSTALL EVENT

	The install event listener will open up the cache and puts all the urls specified in the cacheFiles into the cache storage.

	- add an install event listener to self with a callback. Remember dont use arrow functions as this code will be ran in the browser. Its not quite there yet.

		- inside the install event it should have a **event** parameter passed into the function.

		- then we need to call a event.waitUntil function where we will open the cache.

			- ** caches ** is a global thing that we can get access to. We need to use the ** open ** function and pass in our cacheName variable

			- The open function is a promise so it will need a then function which will pass the cache down as a parameter.

			- We need to return the cache parameter with an addAll(cacheFiles). This will add all the files in your array to the cache storage. (can test in devtools/Application/Cache storage)

			- After that we need another .then(function() {}) that will return  self.skipWaiting(); This will replace the service worker thats active if there is another version of the service worker waiting to be installed.

			- Make sure you add a catch function on the promise to log any errors.

*/

/*

	STEP 2.2 - ACTIVATE EVENT

	What this function will need to do is to loop through all of the caches and if the cache name does not equal your
	cache name it will be deleted from the cache.

	- add an ** activate ** event listener to self with a callback. Remember dont use arrow functions as this code will be ran in the browser. Its not quite there yet.

		- create a variable (cacheWhiteList) which is an array that contains your cacheName variable inside it.

		- Then create an event.waitUntil function. This needs the event parameter that you pass from the event so make sure it is included.

		- Now we need to get all of the cache names using the .keys() method that is on the caches object. Example of how this works:

		var obj = { pwa-workshop-v1: '', pwa-workshop-v2: '' };

		obj.keys().then(function(cacheNames) { // ['pwa-workshop-v1', 'pwa-workshop-v2'] });

		- we need to map through all of our cacheNames to see if we have any caches we dont need.

		return Promise.all(
			// cacheNames.map(function(cacheName) {
				// does my cache name not exist within cacheWhiteList?
					// return caches.delete(cacheName);
			});
		);

		- After the event.waitUntil we need to return self.clients.claim(); We want this service worker to take control of all clients it controls. We dont have to wait for other service workers to terminate for this one to come into the mix. Its ready to go instantly.

*/

/*

	STEP 2.3 - FETCH EVENT

	When the service worker is installed and the user comes to the site for a second time the service worker will handle the fetch requests on the site.
	Every time a request comes through the service worker will check the cache to see if it exists and if it doesnt then it will fetch that asset from the server.

	- add an ** fetch ** event listener to self with a callback. Remember dont use arrow functions as this code will be ran in the browser. Its not quite there yet.

		- now we need to write an event.respondWith function which will check if the ** request property ** on the event ** macthes ** with anything in the cache.

		- the caches.match function is a promise which returns a response in the then function

		- return the response or fetch the request property

		- Remember you need to catch any errors. For example if '/' does not exist in the cache we need to return caches.match('/offline/');
*/



/*

	Step 3.2 - Background Syncing (Sync Event)

	background sync allows you to sync data to sthe service worker when a user is offline and then fire a sync event when the user has come back online.

	- we need to bind a ** sync ** event to self

		- we need to pass the event parameter down and check ** if ** the event tag property equals the tag you specified.

		- if the condition is met we want to wrap an event.waitUntil function around our  showNotification button.

*/


/*

	Step 3.3 - Background Syncing (Notification Click Event)

	background sync allows you to sync data to sthe service worker when a user is offline and then fire a sync event when the user has come back online.

	- we need to bind a ** notificationclick ** event to self

		- we need to pass the event parameter down and filter the ** notification.actions ** property to see if the action equals our view-order.

		- This will return an array so we need to chec if the length is greater then 0

			- if it is, we create a promise variable which will return clients.openWindow('/background-sync/passed/');

			- Rememeber to add a catch to check for errors in the promise.

			- wrap that promise variable within the event.waitUntil

			- Finally we need to close the notification by just doing event.notification.close();

*/
