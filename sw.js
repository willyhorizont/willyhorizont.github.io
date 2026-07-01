const CACHE_NAME = "willyhorizont.github.io#2.2.5"; 
const ASSETS = [
    "./style.css",

    "./runtime/utils.js",
    "./runtime/utils-web.js",
    "./runtime/utils-date.js",
    "./runtime/utils-zyx.js",

    "./",
    "./index.html",

    "./portfolio/",
    "./portfolio/index.html",

    "./cv/",
    "./cv/index.html",

    "./about/",
    "./about/index.html",

    "./links/",
    "./links/index.html",

    "./support/",
    "./support/index.html",

    "./contact/",
    "./contact/index.html",

    "./portfolio/expense-tracker/",
    "./portfolio/expense-tracker/index.html",

    "./portfolio/kalender-libur-advisor/",
    "./portfolio/kalender-libur-advisor/index.html",

    "./portfolio/remove-duplicate-list-item/",
    "./portfolio/remove-duplicate-list-item/index.html",

    "./portfolio/replace-any-line-break/",
    "./portfolio/replace-any-line-break/index.html",

    "./portfolio/score-counter/",
    "./portfolio/score-counter/index.html",

    "./photo.jpg",

    "./component/component-navbar.js",
    "./component/component-footer.js",
    "./component/component-github-programming-languages-card.js",
    "./component/component-sw.js",
];
const IS_IN_DEVELOPMENT_MODE = ((self.location.hostname === "localhost") || (self.location.hostname === "127.0.0.1"));

self.addEventListener("install", (event) => {
    self.skipWaiting(); 
    if (IS_IN_DEVELOPMENT_MODE) return;

    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        const secureRequests = ASSETS.map(url => new Request(url, { redirect: "follow" }));
        return Promise.all(secureRequests.map((request) => {
            return cache.add(request).catch((err) => {
                console.error(`Failed to cache: ${request.url}`, err);
            });
        }));
    }));
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
        if (event.request.mode === "navigate") {
            let urlPath = new URL(event.request.url).pathname;
            if (!urlPath.endsWith("index.html")) {
                let exactCacheKey = urlPath.endsWith("/") ? `${urlPath}index.html` : `${urlPath}/index.html`;
                return caches.match(exactCacheKey).then((fallbackResponse) => {
                    if (fallbackResponse) return fallbackResponse;
                    return fetch(event.request);
                });
            }
        }

        return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || (networkResponse.status !== 200)) {
                return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
            });
            return networkResponse;
        }).catch((e) => {
        });
    }));
});
