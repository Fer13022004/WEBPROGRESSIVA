// Módulo para Números Primos y Compuestos
class PrimosCompuestosModule {
  constructor() {
    this.primesList = [];
    this.foundPrimes = new Set();
    this.init();
  }

  init() {
    this.setupCalculator();
    this.setupExercises();
    this.setupPrimeFinder();
    this.generatePrimesUpTo(100);
  }

  // Configurar la calculadora interactiva
  setupCalculator() {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const numberInput = document.getElementById("numberInput");

    if (analyzeBtn && numberInput) {
      analyzeBtn.addEventListener("click", () => {
        this.analyzeNumber();
      });

      numberInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.analyzeNumber();
        }
      });

      // Validación en tiempo real
      numberInput.addEventListener("input", (e) => {
        const value = parseInt(e.target.value);
        if (value && (value < 1 || value > 10000)) {
          e.target.style.borderColor = "#ff6b6b";
        } else {
          e.target.style.borderColor = "";
        }
      });
    }
  }

  // Analizar si un número es primo o compuesto
  analyzeNumber() {
    const numberInput = document.getElementById("numberInput");
    const resultSection = document.getElementById("resultSection");
    const resultType = document.getElementById("resultType");
    const divisorsList = document.getElementById("divisorsList");
    const explanation = document.getElementById("explanation");

    const number = parseInt(numberInput.value);

    if (!number || number < 1 || number > 10000) {
      Utils.showToast("Por favor ingresa un número entre 1 y 10000", "warning");
      return;
    }

    const analysis = this.analyzeNumberDetailed(number);

    // Mostrar resultado
    resultSection.style.display = "block";

    // Tipo de número
    resultType.innerHTML = `
      <div class="result-badge ${analysis.type}">
        <span class="result-number">${number}</span>
        <span class="result-label">es ${analysis.type.toUpperCase()}</span>
      </div>
    `;

    // Lista de divisores
    divisorsList.innerHTML = `
      <div class="divisors-section">
        <h4>🔍 Divisores de ${number}:</h4>
        <div class="divisors-grid">
          ${analysis.divisors
            .map((d) => `<span class="divisor">${d}</span>`)
            .join("")}
        </div>
        <p class="divisors-count">Total: ${
          analysis.divisors.length
        } divisor(es)</p>
      </div>
    `;

    // Explicación detallada
    explanation.innerHTML = `
      <div class="explanation-content">
        <h4>📝 Explicación:</h4>
        <p>${analysis.explanation}</p>
        ${
          analysis.factorization
            ? `<div class="factorization">
          <strong>Factorización prima:</strong> ${analysis.factorization}
        </div>`
            : ""
        }
      </div>
    `;

    // Animación
    resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Análisis detallado de un número
  analyzeNumberDetailed(n) {
    const divisors = this.findDivisors(n);
    let type,
      explanation,
      factorization = null;

    if (n === 1) {
      type = "especial";
      explanation =
        "El número 1 no es primo ni compuesto. Tiene un solo divisor: él mismo.";
    } else if (divisors.length === 2) {
      type = "primo";
      explanation = `El número ${n} es primo porque tiene exactamente dos divisores: 1 y ${n}.`;
    } else {
      type = "compuesto";
      explanation = `El número ${n} es compuesto porque tiene ${
        divisors.length
      } divisores: ${divisors.join(", ")}.`;
      factorization = this.getPrimeFactorization(n);
    }

    return {
      type,
      divisors,
      explanation,
      factorization,
    };
  }

  // Encontrar todos los divisores de un número
  findDivisors(n) {
    const divisors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  // Obtener factorización prima
  getPrimeFactorization(n) {
    const factors = [];
    let temp = n;

    for (let i = 2; i <= temp; i++) {
      while (temp % i === 0) {
        factors.push(i);
        temp = temp / i;
      }
    }

    if (factors.length === 0) return null;

    // Agrupar factores repetidos
    const grouped = {};
    factors.forEach((factor) => {
      grouped[factor] = (grouped[factor] || 0) + 1;
    });

    const factorization = Object.entries(grouped)
      .map(([factor, count]) => (count === 1 ? factor : `${factor}^${count}`))
      .join(" × ");

    return factorization;
  }

  // Verificar si un número es primo
  isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  // Generar lista de primos hasta n
  generatePrimesUpTo(limit) {
    this.primesList = [];
    for (let i = 2; i <= limit; i++) {
      if (this.isPrime(i)) {
        this.primesList.push(i);
      }
    }
  }

  // Configurar ejercicios interactivos
  setupExercises() {
    this.setupClassificationExercise();
    this.setupTrueFalseExercise();
  }

  // Ejercicio de clasificación
  setupClassificationExercise() {
    const numberItems = document.querySelectorAll(".number-item");

    numberItems.forEach((item) => {
      const buttons = item.querySelectorAll(".classify-btn");
      const feedback = item.querySelector(".feedback");
      const correctType = item.dataset.type;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const userAnswer = button.dataset.answer;
          const isCorrect = userAnswer === correctType;

          // Resetear estilos
          buttons.forEach((btn) => {
            btn.classList.remove("correct", "incorrect", "selected");
          });

          // Marcar respuesta
          button.classList.add("selected");
          button.classList.add(isCorrect ? "correct" : "incorrect");

          // Mostrar feedback
          feedback.classList.remove("hidden");
          feedback.innerHTML = this.getClassificationFeedback(
            parseInt(item.dataset.number),
            correctType,
            isCorrect
          );
        });
      });
    });
  }

  // Feedback para clasificación
  getClassificationFeedback(number, correctType, isCorrect) {
    const analysis = this.analyzeNumberDetailed(number);

    if (isCorrect) {
      return `
        <div class="feedback-correct">
          ✅ ¡Correcto! ${number} es ${correctType}.
          <br>Divisores: ${analysis.divisors.join(", ")}
        </div>
      `;
    } else {
      return `
        <div class="feedback-incorrect">
          ❌ Incorrecto. ${number} es ${correctType}, no ${
        correctType === "primo" ? "compuesto" : "primo"
      }.
          <br>Divisores: ${analysis.divisors.join(", ")}
        </div>
      `;
    }
  }

  // Ejercicio verdadero/falso
  setupTrueFalseExercise() {
    const statements = document.querySelectorAll(".statement");

    statements.forEach((statement) => {
      const buttons = statement.querySelectorAll(".tf-btn");
      const feedback = statement.querySelector(".tf-feedback");
      const correctAnswer = statement.dataset.answer;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const userAnswer = button.dataset.answer;
          const isCorrect = userAnswer === correctAnswer;

          // Resetear estilos
          buttons.forEach((btn) => {
            btn.classList.remove("correct", "incorrect", "selected");
          });

          // Marcar respuesta
          button.classList.add("selected");
          button.classList.add(isCorrect ? "correct" : "incorrect");

          // Mostrar feedback
          feedback.classList.remove("hidden");

          if (!isCorrect) {
            feedback.style.color = "#ff6b6b";
          } else {
            feedback.style.color = "#27ae60";
          }
        });
      });
    });
  }

  // Configurar el buscador de primos
  setupPrimeFinder() {
    const numberGrid = document.querySelector(".number-grid");
    const primeCounter = document.getElementById("foundPrimes");

    if (!numberGrid) return;

    // Generar números del 1 al 30
    for (let i = 1; i <= 30; i++) {
      const numberButton = document.createElement("button");
      numberButton.className = "number-button";
      numberButton.textContent = i;
      numberButton.dataset.number = i;

      if (i === 1) {
        numberButton.classList.add("special");
        numberButton.title = "Ni primo ni compuesto";
      } else if (this.isPrime(i)) {
        numberButton.dataset.isPrime = "true";
      }

      numberButton.addEventListener("click", () => {
        this.togglePrimeSelection(numberButton, primeCounter);
      });

      numberGrid.appendChild(numberButton);
    }
  }

  // Manejar selección de primos
  togglePrimeSelection(button, counter) {
    const number = parseInt(button.dataset.number);
    const isPrime = button.dataset.isPrime === "true";

    if (button.classList.contains("selected")) {
      // Deseleccionar
      button.classList.remove("selected", "correct", "incorrect");
      this.foundPrimes.delete(number);
    } else {
      // Seleccionar
      button.classList.add("selected");

      if (isPrime) {
        button.classList.add("correct");
        this.foundPrimes.add(number);
        Utils.showToast(`¡Correcto! ${number} es primo`, "success");
      } else {
        button.classList.add("incorrect");
        Utils.showToast(`${number} no es primo`, "error");

        // Deseleccionar después de 1 segundo
        setTimeout(() => {
          button.classList.remove("selected", "incorrect");
        }, 1000);
      }
    }

    // Actualizar contador
    counter.textContent = this.foundPrimes.size;

    // Verificar si se encontraron todos los primos
    if (this.foundPrimes.size === 10) {
      Utils.showToast("¡Excelente! Encontraste todos los primos", "success");
      this.celebratePrimesFound();
    }
  }

  // Celebración cuando se encuentran todos los primos
  celebratePrimesFound() {
    const numberGrid = document.querySelector(".number-grid");
    numberGrid.classList.add("celebration");

    // Crear efecto de confetti
    this.createConfetti();

    setTimeout(() => {
      numberGrid.classList.remove("celebration");
    }, 2000);
  }

  // Crear efecto de confetti
  createConfetti() {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "-10px";
        confetti.style.borderRadius = "50%";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const animation = confetti.animate(
          [
            { transform: "translateY(0px) rotateZ(0deg)", opacity: 1 },
            {
              transform: `translateY(${
                window.innerHeight + 100
              }px) rotateZ(720deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 3000 + Math.random() * 2000,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }
        );

        animation.onfinish = () => confetti.remove();
      }, i * 100);
    }
  }

  // Método para resetear ejercicios
  resetExercises() {
    // Resetear clasificación
    document.querySelectorAll(".classify-btn").forEach((btn) => {
      btn.classList.remove("correct", "incorrect", "selected");
    });

    document.querySelectorAll(".number-item .feedback").forEach((feedback) => {
      feedback.classList.add("hidden");
    });

    // Resetear verdadero/falso
    document.querySelectorAll(".tf-btn").forEach((btn) => {
      btn.classList.remove("correct", "incorrect", "selected");
    });

    document.querySelectorAll(".tf-feedback").forEach((feedback) => {
      feedback.classList.add("hidden");
    });

    // Resetear buscador de primos
    document.querySelectorAll(".number-button").forEach((btn) => {
      btn.classList.remove("selected", "correct", "incorrect");
    });

    this.foundPrimes.clear();
    const counter = document.getElementById("foundPrimes");
    if (counter) counter.textContent = "0";

    Utils.showToast("Ejercicios reiniciados", "info");
  }

  // Mostrar estadísticas de progreso
  showProgress() {
    const totalClassification =
      document.querySelectorAll(".number-item").length;
    const completedClassification = document.querySelectorAll(
      ".number-item .classify-btn.selected"
    ).length;

    const totalTrueFalse = document.querySelectorAll(".statement").length;
    const completedTrueFalse =
      document.querySelectorAll(".tf-btn.selected").length;

    const primesFound = this.foundPrimes.size;
    const totalPrimes = 10;

    const progressHTML = `
      <div class="modal-content progress-modal">
        <h3>📊 Tu Progreso</h3>
        <div class="progress-item">
          <span>Clasificación:</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (completedClassification / totalClassification) * 100
            }%"></div>
          </div>
          <span>${completedClassification}/${totalClassification}</span>
        </div>
        <div class="progress-item">
          <span>Verdadero/Falso:</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (completedTrueFalse / totalTrueFalse) * 100
            }%"></div>
          </div>
          <span>${completedTrueFalse}/${totalTrueFalse}</span>
        </div>
        <div class="progress-item">
          <span>Primos Encontrados:</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (primesFound / totalPrimes) * 100
            }%"></div>
          </div>
          <span>${primesFound}/${totalPrimes}</span>
        </div>
        <div class="progress-buttons">
          <button onclick="window.primosModule.resetExercises(); this.closest('.modal').remove()">Reiniciar</button>
          <button onclick="this.closest('.modal').remove()">Cerrar</button>
        </div>
      </div>
    `;

    const modal = window.mathApp.createModal(progressHTML);
    document.body.appendChild(modal);
  }
}

// Utilidades específicas para esta página
const PrimosUtils = {
  // Generar ejercicios aleatorios
  generateRandomExercise() {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 50) + 2);
    }
    return numbers;
  },

  // Obtener sugerencia para un número
  getHint(number) {
    if (number === 1) return "El 1 es un caso especial";
    if (number === 2) return "Es el único primo par";
    if (number % 2 === 0) return "Los números pares > 2 son compuestos";
    if (number % 3 === 0) return "Es divisible por 3";
    if (number % 5 === 0) return "Es divisible por 5";
    return "Prueba la divisibilidad hasta √" + number;
  },
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.primosModule = new PrimosCompuestosModule();
  console.log("Módulo de Números Primos y Compuestos cargado");
});

// Exportar para uso global
window.PrimosCompuestosModule = PrimosCompuestosModule;
window.PrimosUtils = PrimosUtils;
