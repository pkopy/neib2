var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/main.8acd2373.css',
  '/css/main.8acd2373.css.map',
  '/js/main.f6b7f686.js',
  '/js/main.f6b7f686.js.map',
  '/index.html',
  '/maps.js'
  
  
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});