// Funcionalidad para la página de números primos y compuestos
class PrimosPage {
  constructor() {
    this.currentNumber = 17;
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
    console.log("Página de números primos inicializada");
  }

  setupEventListeners() {
    // Verificador de números primos
    const checkBtn = document.getElementById("checkBtn");
    const numberInput = document.getElementById("numberInput");

    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        this.checkNumber();
      });
    }

    if (numberInput) {
      numberInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.checkNumber();
        }
      });
    }

    // Criba de Eratóstenes
    const sieveBtn = document.getElementById("sieveBtn");
    if (sieveBtn) {
      sieveBtn.addEventListener("click", () => {
        this.generateSieve();
      });
    }

    // Ejercicios
    const optionBtns = document.querySelectorAll(".option-btn");
    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.handleExerciseAnswer(btn.dataset.answer);
      });
    });

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

  checkNumber() {
    const numberInput = document.getElementById("numberInput");
    const resultsDiv = document.getElementById("results");

    if (!numberInput || !resultsDiv) return;

    const number = parseInt(numberInput.value);

    if (!number || number < 2) {
      resultsDiv.innerHTML = `
                <div class="error-message">
                    <p>❌ Por favor, ingresa un número mayor o igual a 2</p>
                </div>
            `;
      return;
    }

    const isPrime = this.isPrime(number);
    const divisors = this.findDivisors(number);

    resultsDiv.innerHTML = `
            <div class="result-card ${
              isPrime ? "prime-result" : "composite-result"
            }">
                <h3>${isPrime ? "🎯" : "🔢"} El número ${number} es ${
      isPrime ? "PRIMO" : "COMPUESTO"
    }</h3>
                <div class="explanation">
                    <p><strong>Divisores:</strong> ${divisors.join(", ")}</p>
                    <p><strong>Cantidad de divisores:</strong> ${
                      divisors.length
                    }</p>
                    ${
                      isPrime
                        ? "<p>✅ Tiene exactamente 2 divisores (1 y él mismo)</p>"
                        : `<p>❌ Tiene ${divisors.length} divisores (más de 2)</p>`
                    }
                </div>
                ${!isPrime ? this.getPrimeFactorization(number) : ""}
            </div>
        `;
  }

  generateSieve() {
    const limitInput = document.getElementById("sieveLimit");
    const sieveGrid = document.getElementById("sieveGrid");

    if (!limitInput || !sieveGrid) return;

    const limit = parseInt(limitInput.value) || 30;
    const primes = this.sieveOfEratosthenes(limit);

    sieveGrid.innerHTML = "";

    // Crear grid de números
    for (let i = 2; i <= limit; i++) {
      const numberEl = document.createElement("div");
      numberEl.className = `sieve-number ${
        primes.includes(i) ? "prime" : "composite"
      }`;
      numberEl.textContent = i;
      numberEl.title = `${i} es ${primes.includes(i) ? "primo" : "compuesto"}`;
      sieveGrid.appendChild(numberEl);
    }

    // Agregar estilos CSS para la criba si no existen
    if (!document.querySelector("#sieve-styles")) {
      const style = document.createElement("style");
      style.id = "sieve-styles";
      style.textContent = `
                .sieve-controls {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                }
                .sieve-controls input {
                    padding: 0.5rem;
                    border: 1px solid var(--border);
                    border-radius: var(--border-radius);
                }
                .sieve-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                    gap: 0.5rem;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .sieve-number {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }
                .sieve-number:hover {
                    transform: scale(1.1);
                }
                .sieve-number.prime {
                    background: var(--accent-color);
                    color: white;
                }
                .sieve-number.composite {
                    background: var(--error-color);
                    color: white;
                }
                .concept-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                }
                .concept-card {
                    background: #f8f9ff;
                    border: 1px solid var(--primary-color);
                    border-radius: var(--border-radius);
                    padding: 1.5rem;
                }
                .number-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                .number-badge {
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    color: white;
                    font-weight: bold;
                }
                .number-badge.prime {
                    background: var(--accent-color);
                }
                .number-badge.composite {
                    background: var(--error-color);
                }
                .special-case {
                    background: #fff3e0;
                    border: 1px solid var(--secondary-color);
                    border-radius: var(--border-radius);
                    padding: 1.5rem;
                    margin-top: 2rem;
                }
                .exercise-options {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    margin: 2rem 0;
                }
                .option-btn {
                    padding: 1rem 2rem;
                    border: 2px solid var(--border);
                    border-radius: var(--border-radius);
                    background: white;
                    cursor: pointer;
                    font-size: 1.1rem;
                    font-weight: 500;
                    transition: var(--transition);
                }
                .option-btn:hover {
                    border-color: var(--primary-color);
                    background: #f0f7ff;
                }
                .option-btn.correct {
                    background: var(--accent-color);
                    color: white;
                    border-color: var(--accent-color);
                }
                .option-btn.incorrect {
                    background: var(--error-color);
                    color: white;
                    border-color: var(--error-color);
                }
                .result-card {
                    padding: 2rem;
                    border-radius: var(--border-radius);
                    text-align: center;
                }
                .prime-result {
                    background: #e8f5e8;
                    border: 2px solid var(--accent-color);
                }
                .composite-result {
                    background: #ffebee;
                    border: 2px solid var(--error-color);
                }
                .explanation {
                    margin-top: 1rem;
                    text-align: left;
                }
            `;
      document.head.appendChild(style);
    }
  }

  generateNewExercise() {
    // Generar número aleatorio entre 2 y 50
    this.currentNumber = Math.floor(Math.random() * 49) + 2;

    const exerciseNumber = document.getElementById("exerciseNumber");
    if (exerciseNumber) {
      exerciseNumber.textContent = this.currentNumber;
    }

    // Resetear botones
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.className = "option-btn";
      btn.disabled = false;
    });

    // Limpiar feedback
    const feedback = document.getElementById("exerciseFeedback");
    if (feedback) {
      feedback.innerHTML = "";
      feedback.className = "exercise-feedback";
    }
  }

  handleExerciseAnswer(answer) {
    const isPrime = this.isPrime(this.currentNumber);
    const correctAnswer = isPrime ? "primo" : "compuesto";
    const isCorrect = answer === correctAnswer;

    // Deshabilitar botones y mostrar resultado
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.answer === correctAnswer) {
        btn.classList.add("correct");
      } else if (btn.dataset.answer === answer && !isCorrect) {
        btn.classList.add("incorrect");
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

    const divisors = this.findDivisors(this.currentNumber);
    const isPrime = this.isPrime(this.currentNumber);

    if (isCorrect) {
      feedback.innerHTML = `
                <div class="feedback-content">
                    <h4>🎉 ¡Correcto!</h4>
                    <p>El número ${this.currentNumber} es ${
        isPrime ? "primo" : "compuesto"
      }.</p>
                    <p><strong>Divisores:</strong> ${divisors.join(", ")}</p>
                    <p>Tiene ${divisors.length} divisor${
        divisors.length === 1 ? "" : "es"
      }.</p>
                </div>
            `;
      feedback.className = "exercise-feedback correct";
    } else {
      feedback.innerHTML = `
                <div class="feedback-content">
                    <h4>❌ Incorrecto</h4>
                    <p>El número ${this.currentNumber} es ${
        isPrime ? "primo" : "compuesto"
      }.</p>
                    <p><strong>Divisores:</strong> ${divisors.join(", ")}</p>
                    <p>${
                      isPrime
                        ? "Solo tiene 2 divisores, por eso es primo."
                        : `Tiene ${divisors.length} divisores, por eso es compuesto.`
                    }</p>
                </div>
            `;
      feedback.className = "exercise-feedback incorrect";
    }
  }

  // Algoritmos matemáticos
  isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  findDivisors(n) {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i !== n / i) {
          divisors.push(n / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  }

  sieveOfEratosthenes(limit) {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= limit; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= limit; j += i) {
          isPrime[j] = false;
        }
      }
    }

    const primes = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime[i]) primes.push(i);
    }
    return primes;
  }

  getPrimeFactorization(n) {
    const factors = [];
    let num = n;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      while (num % i === 0) {
        factors.push(i);
        num /= i;
      }
    }

    if (num > 1) factors.push(num);

    return `
            <div class="factorization">
                <p><strong>Factorización prima:</strong> ${factors.join(
                  " × "
                )}</p>
            </div>
        `;
  }

  updateStats(isCorrect) {
    if (isCorrect) {
      this.userStats.correct++;
    }
    this.userStats.total++;
    this.saveStats();
  }

  saveStats() {
    localStorage.setItem("primos-stats", JSON.stringify(this.userStats));
  }

  loadStats() {
    const saved = localStorage.getItem("primos-stats");
    if (saved) {
      this.userStats = JSON.parse(saved);
    }
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
}

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
  window.primosPage = new PrimosPage();
});
