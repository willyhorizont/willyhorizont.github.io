const CACHE_NAME = "willyhorizont.github.io#2.1.0"; 
const BASE_ASSETS = [
    "./",
    "./index.html"
];
const IS_IN_DEVELOPMENT_MODE = ((self.location.hostname === "localhost") || (self.location.hostname === "127.0.0.1"));

self.addEventListener("install", (event) => {
    self.skipWaiting(); 
    if (IS_IN_DEVELOPMENT_MODE) return;

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

    if (IS_IN_DEVELOPMENT_MODE) {
        event.respondWith(fetch(event.request));
        return;
    }

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
