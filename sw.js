const CACHE_NAME = "land-area-calculator-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Offline Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Background Sync
self.addEventListener("sync", event => {
  if (event.tag === "sync-land-data") {
    event.waitUntil(
      console.log("Background Sync Triggered")
    );
  }
});

// Periodic Background Sync
self.addEventListener("periodicsync", event => {
  if (event.tag === "update-data") {
    event.waitUntil(
      console.log("Periodic Sync Triggered")
    );
  }
});

// Push Notifications
self.addEventListener("push", event => {
  const data = event.data ? event.data.text() : "Land Area Calculator";

  event.waitUntil(
    self.registration.showNotification("Land Area Calculator", {
      body: data,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png"
    })
  );
});
