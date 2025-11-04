// Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log(
        "Service Worker registrado exitosamente:",
        registration.scope
      );

      // Verificar actualizaciones
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // Nueva versión disponible
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.error("Error al registrar Service Worker:", error);
    }
  });
}

// Mostrar notificación de actualización
function showUpdateNotification() {
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast(
      "Nueva versión disponible. Recarga para actualizar.",
      "info"
    );
  }
}

// Detectar si la app está siendo instalada
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
  e.preventDefault();

  // Guardar el evento para usarlo después
  window.deferredPrompt = e;

  // Mostrar botón de instalación personalizado si existe
  const installButton = document.getElementById("install-button");
  if (installButton) {
    installButton.style.display = "block";
    installButton.addEventListener("click", showInstallPrompt);
  }
});

// Función para mostrar el prompt de instalación
async function showInstallPrompt() {
  if (window.deferredPrompt) {
    // Mostrar el prompt
    window.deferredPrompt.prompt();

    // Esperar la respuesta del usuario
    const { outcome } = await window.deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Usuario aceptó instalar la PWA");
    } else {
      console.log("Usuario rechazó instalar la PWA");
    }

    // Limpiar el prompt
    window.deferredPrompt = null;

    // Ocultar el botón
    const installButton = document.getElementById("install-button");
    if (installButton) {
      installButton.style.display = "none";
    }
  }
}

// Detectar cuando la app se instala
window.addEventListener("appinstalled", () => {
  console.log("PWA instalada exitosamente");
  if (window.Utils && window.Utils.showToast) {
    window.Utils.showToast("¡Aplicación instalada correctamente!", "success");
  }

  // Limpiar el prompt diferido
  window.deferredPrompt = null;
});

// Detectar cambios en el estado de la red
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

// Verificar estado inicial de la red
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
