const CACHE_NAME = 'agritalia-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo.png',
    // dodaj ovde i ostale statične fajlove kao CSS i JS ako ih imaš
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

