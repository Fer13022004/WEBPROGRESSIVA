// Funcionalidad específica para la página de múltiples
class MultiplesPage {
  constructor() {
    this.currentNumber = 5;
    this.userStats = {
      correct: 0,
      total: 0,
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStats();
    this.generateNewExercise();
    console.log("Página de múltiples inicializada");
  }

  setupEventListeners() {
    // Calculadora de múltiples
    const calculateBtn = document.getElementById("calculateBtn");
    const numberInput = document.getElementById("numberInput");

    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        this.calculateMultiples();
      });
    }

    if (numberInput) {
      numberInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.calculateMultiples();
        }
      });

      numberInput.addEventListener("input", () => {
        this.clearResults();
      });
    }

    // Botón de nuevo ejercicio
    const newExerciseBtn = document.getElementById("newExerciseBtn");
    if (newExerciseBtn) {
      newExerciseBtn.addEventListener("click", () => {
        this.generateNewExercise();
      });
    }

    // Toggle de tema
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }

  calculateMultiples() {
    const numberInput = document.getElementById("numberInput");
    const resultsDiv = document.getElementById("results");

    if (!numberInput || !resultsDiv) return;

    const number = parseInt(numberInput.value);

    if (!number || number < 1 || number > 100) {
      resultsDiv.innerHTML = `
                <div class="error-message">
                    <p>❌ Por favor, ingresa un número válido entre 1 y 100</p>
                </div>
            `;
      return;
    }

    // Calcular los primeros 10 múltiples
    const multiples = [];
    for (let i = 1; i <= 10; i++) {
      multiples.push(number * i);
    }

    // Mostrar resultados con animación
    resultsDiv.innerHTML = `
            <h3>Los primeros 10 múltiples de ${number} son:</h3>
            <div class="multiples-list">
                ${multiples
                  .map(
                    (multiple, index) =>
                      `<span class="multiple-item" style="animation-delay: ${
                        index * 0.1
                      }s">${multiple}</span>`
                  )
                  .join("")}
            </div>
            <p class="calculation-info">
                <strong>Fórmula:</strong> ${number} × n = múltiplo (donde n = 1, 2, 3, ...)
            </p>
        `;

    // Mostrar toast de éxito
    if (window.Utils) {
      window.Utils.showToast(
        `Múltiples de ${number} calculados correctamente`,
        "success"
      );
    }
  }

  clearResults() {
    const resultsDiv = document.getElementById("results");
    if (resultsDiv) {
      resultsDiv.innerHTML = "";
    }
  }

  generateNewExercise() {
    // Generar número aleatorio entre 2 y 12
    this.currentNumber = Math.floor(Math.random() * 11) + 2;

    // Actualizar la pregunta
    const exerciseNumber = document.getElementById("exerciseNumber");
    if (exerciseNumber) {
      exerciseNumber.textContent = this.currentNumber;
    }

    // Generar opciones (múltiples y no múltiples)
    const options = this.generateExerciseOptions(this.currentNumber);
    this.displayExerciseOptions(options);

    // Limpiar feedback
    const feedback = document.getElementById("exerciseFeedback");
    if (feedback) {
      feedback.innerHTML = "";
      feedback.className = "exercise-feedback";
    }
  }

  generateExerciseOptions(number) {
    const options = [];

    // Agregar 3-4 múltiples correctos
    const correctCount = Math.floor(Math.random() * 2) + 3; // 3 o 4
    const multiples = [];

    for (let i = 1; i <= 20; i++) {
      multiples.push(number * i);
    }

    // Seleccionar múltiples aleatorios
    const shuffledMultiples = multiples.sort(() => Math.random() - 0.5);
    for (let i = 0; i < correctCount; i++) {
      options.push({
        value: shuffledMultiples[i],
        isCorrect: true,
      });
    }

    // Agregar números incorrectos
    const incorrectCount = 6 - correctCount;
    for (let i = 0; i < incorrectCount; i++) {
      let incorrectNumber;
      do {
        incorrectNumber = Math.floor(Math.random() * (number * 10)) + 1;
      } while (
        incorrectNumber % number === 0 ||
        options.some((opt) => opt.value === incorrectNumber)
      );

      options.push({
        value: incorrectNumber,
        isCorrect: false,
      });
    }

    // Mezclar opciones
    return options.sort(() => Math.random() - 0.5);
  }

  displayExerciseOptions(options) {
    const optionsContainer = document.getElementById("exerciseOptions");
    if (!optionsContainer) return;

    optionsContainer.innerHTML = options
      .map(
        (option) => `
            <div class="option" data-value="${option.value}" data-correct="${option.isCorrect}">
                ${option.value}
            </div>
        `
      )
      .join("");

    // Agregar event listeners a las opciones
    optionsContainer.querySelectorAll(".option").forEach((optionEl) => {
      optionEl.addEventListener("click", () => {
        this.handleOptionClick(optionEl);
      });
    });
  }

  handleOptionClick(optionEl) {
    const isCorrect = optionEl.dataset.correct === "true";
    const allOptions = document.querySelectorAll(".option");

    // Deshabilitar todas las opciones
    allOptions.forEach((opt) => {
      opt.style.pointerEvents = "none";
      if (opt.dataset.correct === "true") {
        opt.classList.add("correct");
      } else if (opt === optionEl && !isCorrect) {
        opt.classList.add("incorrect");
      }
    });

    // Mostrar feedback
    this.showExerciseFeedback(isCorrect);

    // Actualizar estadísticas
    this.updateStats(isCorrect);

    // Generar nuevo ejercicio después de 3 segundos
    setTimeout(() => {
      this.generateNewExercise();
    }, 3000);
  }

  showExerciseFeedback(isCorrect) {
    const feedback = document.getElementById("exerciseFeedback");
    if (!feedback) return;

    if (isCorrect) {
      feedback.innerHTML = `
                <div class="feedback-content">
                    <h4>🎉 ¡Excelente!</h4>
                    <p>Has identificado correctamente un múltiple de ${this.currentNumber}.</p>
                    <p><strong>Recuerda:</strong> Un número es múltiplo de ${this.currentNumber} si al dividirlo entre ${this.currentNumber} el resultado es un número entero.</p>
                </div>
            `;
      feedback.className = "exercise-feedback correct";
    } else {
      const correctMultiples = Array.from(
        document.querySelectorAll('.option[data-correct="true"]')
      )
        .map((opt) => opt.dataset.value)
        .join(", ");

      feedback.innerHTML = `
                <div class="feedback-content">
                    <h4>❌ No es correcto</h4>
                    <p>Ese número no es múltiplo de ${this.currentNumber}.</p>
                    <p><strong>Los múltiples correctos eran:</strong> ${correctMultiples}</p>
                    <p><strong>Consejo:</strong> Para verificar si un número es múltiplo de ${this.currentNumber}, divídelo entre ${this.currentNumber}. Si el resultado es un número entero, entonces es un múltiplo.</p>
                </div>
            `;
      feedback.className = "exercise-feedback incorrect";
    }
  }

  updateStats(isCorrect) {
    if (isCorrect) {
      this.userStats.correct++;
    }
    this.userStats.total++;

    this.saveStats();
    this.displayStats();
  }

  displayStats() {
    const correctEl = document.getElementById("correctAnswers");
    const totalEl = document.getElementById("totalAttempts");
    const accuracyEl = document.getElementById("accuracy");
    const progressFill = document.getElementById("progressFill");

    if (correctEl) correctEl.textContent = this.userStats.correct;
    if (totalEl) totalEl.textContent = this.userStats.total;

    const accuracy =
      this.userStats.total > 0
        ? Math.round((this.userStats.correct / this.userStats.total) * 100)
        : 0;

    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;

    if (progressFill) {
      progressFill.style.width = `${Math.min(accuracy, 100)}%`;
    }
  }

  saveStats() {
    localStorage.setItem("multiplos-stats", JSON.stringify(this.userStats));
  }

  loadStats() {
    const saved = localStorage.getItem("multiplos-stats");
    if (saved) {
      this.userStats = JSON.parse(saved);
    }
    this.displayStats();
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.textContent = newTheme === "light" ? "🌙" : "☀️";
    }
  }

  // Método para verificar si un número es múltiplo de otro
  static isMultiple(number, base) {
    return number % base === 0;
  }

  // Método para obtener múltiples de un número
  static getMultiples(number, count = 10) {
    const multiples = [];
    for (let i = 1; i <= count; i++) {
      multiples.push(number * i);
    }
    return multiples;
  }
}

// Utilidades específicas para múltiples
const MultiplesUtils = {
  // Generar múltiples en un rango
  getMultiplesInRange(number, min, max) {
    const multiples = [];
    let multiple = number;
    let multiplier = 1;

    while (multiple <= max) {
      if (multiple >= min) {
        multiples.push(multiple);
      }
      multiplier++;
      multiple = number * multiplier;
    }

    return multiples;
  },

  // Verificar si un número es múltiplo común de varios números
  isCommonMultiple(number, bases) {
    return bases.every((base) => number % base === 0);
  },

  // Encontrar el MCM de dos números (para futuras secciones)
  lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b);
  },

  // Encontrar el MCD de dos números (algoritmo de Euclides)
  gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  },
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";
  }

  // Inicializar la página
  window.multiplesPage = new MultiplesPage();
});

// Exportar para uso global
window.MultiplesUtils = MultiplesUtils;
