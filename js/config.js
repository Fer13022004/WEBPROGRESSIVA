// Configuración y constantes de la aplicación
const CONFIG = {
  // Información de la aplicación
  app: {
    name: "Matemáticas Educativas PWA",
    version: "1.0.0",
    description: "Aprende matemáticas de forma interactiva",
    author: "Equipo NOLASCO",
  },

  // Configuración de temas
  themes: {
    light: {
      primary: "#2196F3",
      secondary: "#FFC107",
      accent: "#4CAF50",
      error: "#F44336",
      background: "#FAFAFA",
      surface: "#FFFFFF",
      textPrimary: "#212121",
      textSecondary: "#757575",
    },
    dark: {
      primary: "#2196F3",
      secondary: "#FFC107",
      accent: "#4CAF50",
      error: "#F44336",
      background: "#121212",
      surface: "#1e1e1e",
      textPrimary: "#ffffff",
      textSecondary: "#b3b3b3",
    },
  },

  // Configuración de temas matemáticos
  topics: {
    multiplos: {
      name: "Múltiples de un número",
      icon: "✖️",
      description:
        "Aprende a calcular y identificar múltiples de cualquier número",
      difficulty: "Básico",
      estimatedTime: "15-20 min",
    },
    mcm: {
      name: "Mínimo común múltiplo",
      icon: "🔢",
      description: "Encuentra el MCM de dos o más números paso a paso",
      difficulty: "Intermedio",
      estimatedTime: "20-25 min",
    },
    divisores: {
      name: "Divisores de un número",
      icon: "➗",
      description: "Identifica todos los divisores de cualquier número",
      difficulty: "Básico",
      estimatedTime: "15-20 min",
    },
    criterios: {
      name: "Criterios de divisibilidad por 2, 3 y 5",
      icon: "✅",
      description: "Aprende las reglas de divisibilidad por 2, 3 y 5",
      difficulty: "Básico",
      estimatedTime: "10-15 min",
    },
    "todos-divisores": {
      name: "Cálculo de todos los divisores de un número",
      icon: "📊",
      description: "Método sistemático para encontrar todos los divisores",
      difficulty: "Intermedio",
      estimatedTime: "20-25 min",
    },
    primos: {
      name: "Números primos y compuestos",
      icon: "🎯",
      description: "Distingue entre números primos y compuestos",
      difficulty: "Intermedio",
      estimatedTime: "25-30 min",
    },
    mcd: {
      name: "Máximo común divisor",
      icon: "🏆",
      description: "Calcula el MCD usando diferentes métodos",
      difficulty: "Avanzado",
      estimatedTime: "25-30 min",
    },
  },

  // Configuración de ejercicios
  exercises: {
    defaultCount: 10,
    difficultyLevels: {
      easy: { min: 1, max: 50 },
      medium: { min: 10, max: 100 },
      hard: { min: 50, max: 500 },
    },
    timeouts: {
      feedback: 3000,
      nextQuestion: 1000,
    },
  },

  // Configuración de almacenamiento
  storage: {
    keys: {
      theme: "math-app-theme",
      stats: "math-app-stats",
      progress: "math-app-progress",
      settings: "math-app-settings",
    },
  },

  // URLs y rutas
  urls: {
    base: "./",
    pages: "./pages/",
    assets: "./assets/",
    images: "./images/",
  },

  // Configuración de animaciones
  animations: {
    duration: {
      short: 200,
      medium: 300,
      long: 500,
    },
    easing: "ease-in-out",
  },

  // Configuración de notificaciones
  notifications: {
    duration: 3000,
    positions: ["top-right", "top-left", "bottom-right", "bottom-left"],
  },
};

// Exportar configuración
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
