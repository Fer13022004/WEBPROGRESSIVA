// Configuración de la aplicación (usando CONFIG si existe)
const APP_CONFIG = window.CONFIG?.app || {
  name: "Matemáticas Educativas PWA",
  version: "1.0.0",
  themes: {
    light: "light",
    dark: "dark",
  },
};

// Estado global de la aplicación
const AppState = {
  currentTheme: "light",
  currentSection: "home",
  isMenuOpen: false,
};

// Clase principal de la aplicación
class MathApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupNavigation();
    this.setupTopicCards();
    this.loadUserPreferences();
    console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} iniciado`);
  }

  setupEventListeners() {
    // Menu toggle para móviles
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");

    if (menuToggle && navList) {
      menuToggle.addEventListener("click", () => {
        this.toggleMenu();
      });
    }

    // Navegación suave
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          this.navigateToSection(href.substring(1));
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav") && AppState.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Responsive handling
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
      }
    });
  }

  setupNavigation() {
    // Marcar enlace activo basado en la sección visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.updateActiveNavLink(sectionId);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    // Observar todas las secciones
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  }

  setupTopicCards() {
    document.querySelectorAll(".topic-card").forEach((card) => {
      card.addEventListener("click", () => {
        const topic = card.dataset.topic;
        this.navigateToTopic(topic);
      });

      // Efecto hover mejorado
      card.addEventListener("mouseenter", () => {
        this.animateCard(card, "enter");
      });

      card.addEventListener("mouseleave", () => {
        this.animateCard(card, "leave");
      });
    });
  }

  toggleMenu() {
    const navList = document.getElementById("navList");
    const menuToggle = document.getElementById("menuToggle");

    AppState.isMenuOpen = !AppState.isMenuOpen;

    if (AppState.isMenuOpen) {
      navList.classList.add("active");
      menuToggle.innerHTML = "✕";
    } else {
      navList.classList.remove("active");
      menuToggle.innerHTML = "☰";
    }
  }

  closeMenu() {
    const navList = document.getElementById("navList");
    const menuToggle = document.getElementById("menuToggle");

    if (!navList || !menuToggle) return; // <- evita el error si no existen

    AppState.isMenuOpen = false;
    navList.classList.remove("active");
    menuToggle.innerHTML = "☰";
  }

  navigateToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      AppState.currentSection = sectionId;
      this.closeMenu();
    }
  }

  navigateToTopic(topic) {
    // Aquí se navegaría a la página específica del tema
    // Por ahora, mostraremos una alerta
    this.showTopicPreview(topic);
  }

  showTopicPreview(topic) {
    const topicNames = {
      multiplos: "Múltiples de un número",
      mcm: "Mínimo común múltiplo",
      divisores: "Divisores de un número",
      criterios: "Criterios de divisibilidad por 2, 3 y 5",
      "todos-divisores": "Cálculo de todos los divisores de un número",
      primos: "Números primos y compuestos",
      mcd: "Máximo común divisor",
    };

    const topicName = topicNames[topic] || topic;

    // Crear modal simple
    const modal = this.createModal(`
            <div class="modal-content">
                <h2>🚀 Próximamente</h2>
                <p>La sección <strong>"${topicName}"</strong> estará disponible próximamente.</p>
                <p>Cada sección incluirá:</p>
                <ul>
                    <li>📚 Explicaciones teóricas</li>
                    <li>💡 Ejemplos prácticos</li>
                    <li>🎯 Ejercicios interactivos</li>
                    <li>📊 Seguimiento de progreso</li>
                </ul>
                <button class="btn" onclick="this.closest('.modal').remove()">Entendido</button>
            </div>
        `);

    document.body.appendChild(modal);
  }

  createModal(content) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            ${content}
        `;

    // Agregar estilos del modal si no existen
    if (!document.querySelector("#modal-styles")) {
      const style = document.createElement("style");
      style.id = "modal-styles";
      style.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 500px;
                    margin: 20px;
                    position: relative;
                    z-index: 1001;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .modal-content h2 {
                    margin-bottom: 1rem;
                    color: var(--primary-color);
                }
                .modal-content ul {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                }
                .modal-content li {
                    margin: 0.5rem 0;
                }
            `;
      document.head.appendChild(style);
    }

    return modal;
  }

  updateActiveNavLink(sectionId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

  animateCard(card, type) {
    if (type === "enter") {
      card.style.transform = "translateY(-8px) scale(1.02)";
    } else {
      card.style.transform = "translateY(-4px) scale(1)";
    }
  }

  loadUserPreferences() {
    // Cargar preferencias del localStorage
    const savedTheme = localStorage.getItem("math-app-theme");
    if (savedTheme) {
      AppState.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
  }

  saveUserPreferences() {
    localStorage.setItem("math-app-theme", AppState.currentTheme);
  }

  applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    AppState.currentTheme = theme;
    this.saveUserPreferences();
  }

  // Método para cambiar tema (se puede usar más tarde)
  toggleTheme() {
    const newTheme = AppState.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }
}

// Utilidades globales
const Utils = {
  // Formatear números
  formatNumber(num) {
    return new Intl.NumberFormat("es-ES").format(num);
  },

  // Validar si es un número entero positivo
  isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
  },

  // Generar ID único
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Mostrar notificación toast
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Agregar estilos si no existen
    if (!document.querySelector("#toast-styles")) {
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 4px;
                    color: white;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                }
                .toast.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                .toast-info { 
                    background: #3498db; 
                    color: white; 
                    border-left: 4px solid #2980b9;
                }
                .toast-success { 
                    background: #27ae60; 
                    color: white; 
                    border-left: 4px solid #219a52;
                }
                .toast-error { 
                    background: #e74c3c; 
                    color: white; 
                    border-left: 4px solid #c0392b;
                }
                .toast-warning { 
                    background: #f39c12; 
                    color: white; 
                    border-left: 4px solid #e67e22;
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Mostrar toast
    setTimeout(() => toast.classList.add("show"), 100);

    // Ocultar toast después de 3 segundos
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.mathApp = new MathApp();

  // Verificar si la PWA está siendo ejecutada
  if (window.matchMedia("(display-mode: standalone)").matches) {
    Utils.showToast("¡Aplicación iniciada en modo PWA!", "success");
  }

  // Solicitar permisos de notificación al iniciar
  NotificationManager.init();
});

// Manejar errores globales
window.addEventListener("error", (e) => {
  console.error("Error en la aplicación:", e.error);
  Utils.showToast(
    "Ha ocurrido un error. Por favor, recarga la página.",
    "error"
  );
});

// Gestor de notificaciones
const NotificationManager = {
  init() {
    // Esperar un poco después de cargar para no ser invasivo
    setTimeout(() => {
      this.checkAndRequestPermissions();
    }, 3000);
  },

  async checkAndRequestPermissions() {
    // Verificar si las notificaciones están soportadas
    if (!("Notification" in window)) {
      console.log("🔕 Notificaciones no soportadas en este navegador");
      return;
    }

    // Si ya están permitidas, no molestamos al usuario
    if (Notification.permission === "granted") {
      console.log("✅ Permisos de notificación ya concedidos");
      Utils.showToast("✅ Notificaciones habilitadas", "success");
      return;
    }

    // Si fueron explícitamente denegadas, no insistimos
    if (Notification.permission === "denied") {
      console.log("❌ Permisos de notificación denegados previamente");
      return;
    }

    // Solo preguntar si es la primera vez - USAR POPUP NATIVO
    if (Notification.permission === "default") {
      this.requestNativePermission();
    }
  },

  async requestNativePermission() {
    try {
      // Solo mostrar el popup nativo del navegador, sin mensajes adicionales
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("✅ Notificaciones permitidas");

        // Enviar notificación de prueba
        setTimeout(() => {
          this.sendWelcomeNotification();
        }, 1000);
      } else if (permission === "denied") {
        console.log("❌ Notificaciones denegadas");
      }
    } catch (error) {
      console.error("Error al solicitar permisos:", error);
    }
  },

  async sendWelcomeNotification() {
    try {
      const registration = await navigator.serviceWorker.ready;

      registration.showNotification("🧮 Matemáticas Educativas", {
        body: "¡Bienvenido! Las notificaciones están funcionando correctamente.",
        icon: "/images/icon-192x192.svg",
        badge: "/images/icon-192x192.svg",
        tag: "welcome-notification",
        actions: [
          {
            action: "explore",
            title: "Explorar app",
          },
        ],
      });
    } catch (error) {
      console.error("Error al enviar notificación de bienvenida:", error);
    }
  },
};

// Exportar para uso global
window.AppConfig = APP_CONFIG;
window.AppState = AppState;
window.Utils = Utils;
window.NotificationManager = NotificationManager;
