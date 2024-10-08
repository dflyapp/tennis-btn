self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Add a call to skipWaiting here if necessary
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  // Handle fetch events
  if (event.request.url.includes('/login')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
