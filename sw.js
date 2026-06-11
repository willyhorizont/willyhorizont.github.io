const CACHE_NAME = "willyhorizont.github.io:1.0.1"; 
const BASE_ASSETS = [
    "./",
    "./index.html"
];

self.addEventListener("install", (event) => {
    self.skipWaiting(); 
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(BASE_ASSETS)));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim()); 

    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
                console.log("Removing old cache:", cache);
                return caches.delete(cache);
            }
        }));
    }));
});

self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith("http")) return;

    event.respondWith(caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || (networkResponse.status !== 200) || (networkResponse.type !== "basic")) {
                return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
            });
            return networkResponse;
        }).catch(() => caches.match("./index.html"));
    }));
});
