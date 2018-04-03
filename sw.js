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
  );
});





self.addEventListener('fetch', function(event) {
	// request.mode = navigate isn't supported in all browsers
	// so include a check for Accept: text/html header.
	if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
		event.respondWith(
			fetch(event.request.url).catch(error => {
			// Return the offline page
				return caches.match('/offline/');
			})
	);
	}
	else {
			// Respond with everything else if we can
		event.respondWith(caches.match(event.request)
			.then(function (response) {
				return response || fetch(event.request);
			})
			.catch(error => new Error(error))
		);
	}
});





// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pwa-workshop'];

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
