const s = self, c = "v1";
s.addEventListener("install", (e) => {
  e.waitUntil(
    s.skipWaiting()
  );
});
s.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((t) => Promise.all(
      t.map((n) => {
        if (n !== c)
          return caches.delete(n);
      })
    ))
  );
});
s.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).then((t) => {
      const n = t.clone();
      return e.request.url.includes("/tic-tac-toe") && caches.open(c).then((a) => a.put(e.request, n)), t;
    }).catch(() => caches.match(e.request).then((t) => t))
  );
});
