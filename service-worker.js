self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativo");
  return self.clients.claim();
});

self.addEventListener("fetch", () => {});