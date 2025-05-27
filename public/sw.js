self.addEventListener("install", () => {
  console.log("[Service Worker] Zainstalowany");
});

self.addEventListener("activate", () => {
  console.log("[Service Worker] Aktywowany");
});
