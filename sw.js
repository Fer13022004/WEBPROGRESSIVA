// ============================================
// SERVICE WORKER ESENCIAL - Solo lo necesario
// ============================================

const CACHE_NAME = "matematicas-pwa-v1.1.0";
const isGitHubPages = location.hostname.includes("github.io");
const basePath = isGitHubPages ? "/WEBPROGRESSIVA" : "";

// Archivos esenciales a cachear
const urlsToCache = [
  `${basePath}/`,
  `${basePath}/index.html`,
  `${basePath}/css/styles.css`,
  `${basePath}/js/app.js`,
  `${basePath}/js/config.js`,
  `${basePath}/js/sw-register.js`,
  `${basePath}/js/primos-compuestos.js`,
  `${basePath}/manifest.json`,
  `${basePath}/images/icon-192x192.svg`,
  `${basePath}/images/icon-512x512.svg`,
  `${basePath}/pages/primos-compuestos.html`,
  `${basePath}/pages/multiplos.html`,
  `${basePath}/pages/primos.html`,
];

// Instalación - Cachear archivos
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Archivos cacheados");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Error al cachear archivos:", error);
      })
  );

  self.skipWaiting();
});

// Activación - Limpiar caches antiguos
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Eliminando cache antiguo", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// Interceptar peticiones - Cache First Strategy
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ignorar extensiones y peticiones no-GET
  if (
    url.protocol === "chrome-extension:" ||
    url.protocol === "moz-extension:" ||
    url.protocol === "safari-extension:" ||
    event.request.url.includes("extension") ||
    event.request.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Servir desde cache si existe
      if (response) {
        return response;
      }

      // Si no está en cache, ir a la red
      return fetch(event.request)
        .then((response) => {
          // Verificar respuesta válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cachear si es del mismo origen
          if (url.origin === self.location.origin) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // Offline: servir index.html para páginas
          if (event.request.destination === "document") {
            return caches.match(`${basePath}/index.html`);
          }

          return new Response("Recurso no disponible sin conexión", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" },
          });
        });
    })
  );
});

// Manejar notificaciones push (desde DevTools)
self.addEventListener("push", (event) => {
  console.log("Push recibido:", event);

  const options = {
    body: event.data ? event.data.text() : "¡Notificación push de prueba!",
    icon: `${basePath}/images/icon-192x192.svg`,
    badge: `${basePath}/images/icon-192x192.svg`,
    tag: "push-test",
    actions: [
      {
        action: "explore",
        title: "Explorar app",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("🧮 Matemáticas Educativas", options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener("notificationclick", (event) => {
  console.log("Notificación clickeada:", event.notification.tag);
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow(`${basePath}/`));
  }
});
