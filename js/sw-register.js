// ============================================
// REGISTRO DEL SERVICE WORKER - Solo lo esencial
// ============================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log(
        "Service Worker registrado exitosamente:",
        registration.scope
      );

      // Detectar actualizaciones
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.error("Error al registrar Service Worker:", error);
    }
  });
}

function showUpdateNotification() {
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast(
      "Nueva versión disponible. Recarga para actualizar.",
      "info"
    );
  }
}

// Detección de instalación PWA (solo logging)
window.addEventListener("appinstalled", () => {
  console.log("PWA instalada exitosamente");
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast("¡Aplicación instalada correctamente!", "success");
  }
});

// Detección del estado de la red
window.addEventListener("online", () => {
  console.log("Conexión restaurada");
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast("Conexión a internet restaurada", "success");
  }
});

window.addEventListener("offline", () => {
  console.log("Sin conexión a internet");
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast(
      "Sin conexión a internet. Algunas funciones pueden estar limitadas.",
      "warning"
    );
  }
});

// Verificar estado inicial
if (!navigator.onLine) {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.Utils && window.Utils.showToast) {
      window.Utils.showToast(
        "Sin conexión a internet. Modo offline activado.",
        "warning"
      );
    }
  });
}
