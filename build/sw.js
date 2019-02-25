var cacheFiles = [
	'/offline/',
	'/background-sync/',
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
	// request.mode = navigate isn't supported in all browsers
	// so include a check for Accept: text/html header.

	if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {

		if(event.request.url.indexOf('background-sync') !== -1 || event.request.url.indexOf('background-sync/passed') !== -1) {
			event.respondWith(
				caches.match(event.request)
				.then(function (response) {
					return response || fetch(event.request);
				})
				.catch(error => new Error(error))
			);
		} else {
			event.respondWith(
				fetch(event.request.url).catch(error => {
				// Return the offline page
					return caches.match('/offline/');
				})
			);
		}

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

self.addEventListener('sync', function (event) {

	if (event.tag === 'sync-test') {
    event.waitUntil(showNotification());
  }
});

self.addEventListener('notificationclick', function (event) {

	if(event.notification.actions.filter(type => type.action === 'view-order').length > 0) {

		var promise = new Promise(function(resolve) {
			return clients.openWindow('/background-sync/passed/');
		})
		.catch((error) => {
				console.error(error);
		});

		event.waitUntil(promise);
	}

	event.notification.close();
});
