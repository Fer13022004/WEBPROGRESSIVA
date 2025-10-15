const CACHE_NAME = "matematicas-pwa-v1.0.1"; // Incrementar versión para forzar actualización
// Detectar si estamos en GitHub Pages o desarrollo local
const isGitHubPages = location.hostname.includes("github.io");
const basePath = isGitHubPages ? "/WEBPROGRESSIVA" : "";

const urlsToCache = [
  `${basePath}/`,
  `${basePath}/index.html`,
  `${basePath}/css/styles.css`,
  `${basePath}/css/topic-page.css`,
  `${basePath}/js/app.js`,
  `${basePath}/js/config.js`,
  `${basePath}/js/sw-register.js`,
  `${basePath}/manifest.json`,
  `${basePath}/images/icon-192x192.svg`,
  `${basePath}/images/icon-512x512.svg`,
  // Solo páginas que existen
  `${basePath}/pages/multiplos.html`,
  `${basePath}/pages/primos.html`,
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Archivos cacheados");
        return cache.addAll(
          urlsToCache.filter(
            (url) => !url.includes("/pages/") // No cachear páginas que aún no existen
          )
        );
      })
      .catch((error) => {
        console.error("Error al cachear archivos:", error);
      })
  );

  // Forzar la activación inmediata
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar caches antiguos
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Eliminando cache antiguo", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Reclamar control de todas las páginas
  return self.clients.claim();
});

// Interceptar peticiones de red
self.addEventListener("fetch", (event) => {
  // Filtrar peticiones problemáticas
  const url = new URL(event.request.url);

  // Ignorar extensiones de Chrome y otros schemes no válidos
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
      // Devolver desde cache si está disponible
      if (response) {
        return response;
      }

      // Si no está en cache, hacer petición de red
      return fetch(event.request)
        .then((response) => {
          // Verificar si la respuesta es válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Solo cachear si es del mismo origen
          if (url.origin === self.location.origin) {
            // Clonar la respuesta para cachearla
            const responseToCache = response.clone();

            caches
              .open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.warn("Error al cachear:", error);
              });
          }

          return response;
        })
        .catch(() => {
          // Si falla la petición de red, mostrar página offline personalizada
          if (event.request.destination === "document") {
            return caches.match(`${basePath}/index.html`);
          }
        });
    })
  );
});

// Manejar mensajes del cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Sincronización en segundo plano (para futuras funcionalidades)
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Aquí se puede implementar sincronización de datos
  // Por ejemplo, enviar respuestas de ejercicios cuando haya conexión
  console.log("Ejecutando sincronización en segundo plano");
}

// Notificaciones push (para futuras funcionalidades)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nueva notificación disponible",
    icon: "/images/icon-192x192.png",
    badge: "/images/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "explore",
        title: "Ver más",
        icon: "/images/checkmark.png",
      },
      {
        action: "close",
        title: "Cerrar",
        icon: "/images/xmark.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Matemáticas Educativas", options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    // Abrir la aplicación
    event.waitUntil(clients.openWindow(`${basePath}/`));
  }
});

// Manejo de errores
self.addEventListener("error", (event) => {
  console.error("Error en Service Worker:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("Promise rechazada en Service Worker:", event.reason);
  event.preventDefault();
});
