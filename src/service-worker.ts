/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;
const cacheName = 'v1';

sw.addEventListener('install', e => {
    e.waitUntil(
        sw.skipWaiting()
    );
});

sw.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

sw.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                if (e.request.url.includes('/tic-tac-toe')) {
                    caches
                        .open(cacheName)
                        .then(cache => cache.put(e.request, resClone));
                }
                return res;
            })
            .catch(() => caches.match(e.request).then(res => res as Response))
    )
});