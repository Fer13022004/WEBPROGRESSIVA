// Módulo para Números Primos y Compuestos
class PrimosCompuestosModule {
  constructor() {
    this.primesList = [];
    this.foundPrimes = new Set();
    this.dynamicExamples = {
      primos: [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
        71, 73, 79, 83, 89, 97,
      ],
      compuestos: [
        4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30,
        32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50,
      ],
      gemelos: [
        [3, 5],
        [5, 7],
        [11, 13],
        [17, 19],
        [29, 31],
        [41, 43],
        [59, 61],
        [71, 73],
      ],
      goldbach: [
        { num: 4, sumas: ["2+2"] },
        { num: 6, sumas: ["3+3"] },
        { num: 8, sumas: ["3+5"] },
        { num: 10, sumas: ["3+7", "5+5"] },
        { num: 12, sumas: ["5+7"] },
        { num: 14, sumas: ["7+7", "3+11"] },
        { num: 16, sumas: ["3+13", "5+11"] },
        { num: 18, sumas: ["5+13", "7+11"] },
        { num: 20, sumas: ["3+17", "7+13"] },
      ],
    };

    // Banco de curiosidades dinámicas
    this.curiosidadesBank = [
      {
        emoji: "🔢",
        titulo: "Números Primos Gemelos",
        descripcion: "Son pares de primos que difieren en 2 unidades:",
        ejemplo: "(3,5), (5,7), (11,13), (17,19), (29,31)...",
        cita: "(Burton, 2017, p. 112)",
      },
      {
        emoji: "🎯",
        titulo: "Conjetura de Goldbach",
        descripcion:
          "Todo número par mayor que 2 puede expresarse como la suma de dos primos:",
        ejemplo: "4=2+2, 6=3+3, 8=3+5, 10=3+7, 12=5+7...",
        cita: "(Rosen, 2019, p. 248)",
      },
      {
        emoji: "🏆",
        titulo: "El Primo más Grande Conocido",
        descripcion:
          "El número primo más grande conocido tiene más de 24 millones de dígitos y es un primo de Mersenne:",
        ejemplo: "2^82,589,933 - 1",
        cita: "(Great Internet Mersenne Prime Search, 2023)",
      },
      {
        emoji: "📊",
        titulo: "Distribución de Primos",
        descripcion:
          "Los primos se vuelven menos frecuentes a medida que los números crecen, pero nunca se agotan (Teorema de Euclides).",
        ejemplo:
          "Entre 1-10: 4 primos, Entre 1-100: 25 primos, Entre 1-1000: 168 primos",
        cita: "(Burton, 2017, p. 95)",
      },
      {
        emoji: "🔍",
        titulo: "Criba de Eratóstenes",
        descripcion:
          "Método antiguo para encontrar todos los primos hasta un número dado, eliminando múltiplos sucesivamente:",
        ejemplo: "Para encontrar primos hasta 30: 2,3,5,7,11,13,17,19,23,29",
        cita: "(Rosen, 2019, p. 241)",
      },
      {
        emoji: "🌟",
        titulo: "Primo de Mersenne",
        descripcion:
          "Primos de la forma 2^p - 1 donde p también es primo. Son muy raros y especiales:",
        ejemplo: "2^2-1=3, 2^3-1=7, 2^5-1=31, 2^7-1=127...",
        cita: "(Burton, 2017, p. 201)",
      },
    ];

    this.init();
  }

  init() {
    this.setupCalculator();
    this.setupDynamicExercises();
    this.setupPrimeFinder();
    this.generatePrimesUpTo(100);
    this.generateDynamicExamples();
    this.generateDynamicCuriosity();
    this.setupRefreshButton();
  }

  // Configurar sistema de ejercicios dinámicos
  setupDynamicExercises() {
    this.exerciseData = {
      currentExercise: 1,
      correctAnswers: 0,
      answeredQuestions: 0,
      exercises: [],
    };

    this.generateExerciseBank();
    this.startDynamicExercises();
  }

  // Generar banco de ejercicios
  generateExerciseBank() {
    const exercises = [];

    // Ejercicios de clasificación (5)
    const classificationNumbers = [
      ...this.getRandomElements(
        this.dynamicExamples.primos.filter((p) => p > 10 && p < 100),
        3
      ),
      ...this.getRandomElements(
        this.dynamicExamples.compuestos.filter((c) => c > 10 && c < 100),
        2
      ),
    ];

    classificationNumbers.forEach((num) => {
      const isPrime = this.isPrime(num);
      exercises.push({
        type: "classification",
        question: `¿El número ${num} es primo o compuesto?`,
        number: num,
        correctAnswer: isPrime ? "primo" : "compuesto",
        options: [
          { text: "Primo", value: "primo", class: "primo-option" },
          { text: "Compuesto", value: "compuesto", class: "compuesto-option" },
        ],
      });
    });

    // Ejercicios de verdadero/falso (5)
    const trueFalseQuestions = [
      {
        question: "Todos los números impares son primos",
        answer: false,
        explanation: "Falso. Contraejemplo: 9 = 3×3 es impar pero compuesto.",
      },
      {
        question: "El número 2 es el único primo par",
        answer: true,
        explanation: "Verdadero. Todos los demás pares son divisibles por 2.",
      },
      {
        question: "Todo número compuesto puede factorizarse en primos",
        answer: true,
        explanation:
          "Verdadero. Según el Teorema Fundamental de la Aritmética, todo número compuesto puede escribirse como producto de números primos. Por ejemplo: 12 = 2 × 2 × 3, donde 2 y 3 son primos.",
      },
      {
        question: "El número 1 es primo",
        answer: false,
        explanation: "Falso. El 1 no es primo ni compuesto por definición.",
      },
      {
        question: "Existen infinitos números primos",
        answer: true,
        explanation: "Verdadero. Demostrado por Euclides.",
      },
      {
        question: "Todos los números primos mayores que 2 son impares",
        answer: true,
        explanation: "Verdadero. Si fueran pares, serían divisibles por 2.",
      },
    ];

    const selectedTrueFalse = this.getRandomElements(trueFalseQuestions, 5);
    selectedTrueFalse.forEach((tf) => {
      exercises.push({
        type: "trueFalse",
        question: tf.question,
        correctAnswer: tf.answer,
        explanation: tf.explanation,
        options: [
          { text: "Verdadero", value: true, class: "true-option" },
          { text: "Falso", value: false, class: "false-option" },
        ],
      });
    });

    // Mezclar ejercicios
    this.exerciseData.exercises = exercises.sort(() => 0.5 - Math.random());
  }

  // Iniciar ejercicios dinámicos
  startDynamicExercises() {
    this.exerciseData.currentExercise = 1;
    this.exerciseData.correctAnswers = 0;
    this.exerciseData.answeredQuestions = 0;
    this.updateExerciseHeader();
    this.showCurrentExercise();
    this.setupExerciseButtons();
  }

  // Mostrar ejercicio actual
  showCurrentExercise() {
    const exercise =
      this.exerciseData.exercises[this.exerciseData.currentExercise - 1];
    const container = document.getElementById("exerciseContainer");

    if (!container || !exercise) return;

    // Generar explicación del procedimiento ANTES de mostrar la pregunta
    let procedureExplanation = "";
    if (exercise.type === "classification") {
      procedureExplanation = this.generatePreExerciseProcedure(exercise.number);
    } else if (exercise.type === "trueFalse") {
      // Generar explicación específica según el contenido de la pregunta
      procedureExplanation = this.generateSpecificTrueFalseExplanation(
        exercise.question
      );
    }

    // Comenzar con la explicación del procedimiento
    let exerciseHTML = procedureExplanation;

    // Agregar separador visual
    exerciseHTML += `<div class="question-separator">📋 PREGUNTA A RESOLVER:</div>`;

    // Agregar la pregunta principal (más destacada)
    exerciseHTML += `<div class="exercise-question">${exercise.question}</div>`;

    if (exercise.type === "classification") {
      exerciseHTML += `<div class="exercise-number">${exercise.number}</div>`;
    }

    exerciseHTML += `
      <div class="exercise-options">
        ${exercise.options
          .map(
            (option) => `
          <button class="exercise-btn ${option.class}" data-value="${option.value}">
            ${option.text}
          </button>
        `
          )
          .join("")}
      </div>
    `;

    container.innerHTML = exerciseHTML;

    // Ocultar feedback y botón siguiente
    document.getElementById("exerciseFeedback").classList.add("hidden");
    document.getElementById("nextExerciseBtn").classList.add("hidden");
  }

  // Configurar botones de ejercicios
  setupExerciseButtons() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("exercise-btn")) {
        this.handleExerciseAnswer(e.target);
      }

      if (e.target.id === "nextExerciseBtn") {
        this.nextExercise();
      }

      if (e.target.id === "restartExerciseBtn") {
        this.restartExercises();
      }
    });
  }

  // Manejar respuesta del ejercicio
  handleExerciseAnswer(button) {
    const exercise =
      this.exerciseData.exercises[this.exerciseData.currentExercise - 1];
    const userAnswer = button.dataset.value;
    const isCorrect = this.checkAnswer(exercise, userAnswer);

    // Deshabilitar todos los botones
    document.querySelectorAll(".exercise-btn").forEach((btn) => {
      btn.disabled = true;
    });

    // Marcar respuesta
    if (isCorrect) {
      button.style.background = "#2ecc71";
      this.exerciseData.correctAnswers++;
    } else {
      button.style.background = "#e74c3c";
      // Resaltar respuesta correcta
      document.querySelectorAll(".exercise-btn").forEach((btn) => {
        if (this.checkAnswer(exercise, btn.dataset.value)) {
          btn.style.background = "#2ecc71";
        }
      });
    }

    this.exerciseData.answeredQuestions++;
    this.showFeedback(exercise, isCorrect);
    this.updateExerciseHeader();

    // Mostrar botón siguiente para continuar (sin límite)
    setTimeout(() => {
      document.getElementById("nextExerciseBtn").classList.remove("hidden");
    }, 1500);
  }

  // Verificar respuesta
  checkAnswer(exercise, userAnswer) {
    if (exercise.type === "classification") {
      return userAnswer === exercise.correctAnswer;
    } else if (exercise.type === "trueFalse") {
      return userAnswer === exercise.correctAnswer.toString();
    }
    return false;
  }

  // Mostrar feedback
  showFeedback(exercise, isCorrect) {
    const feedbackDiv = document.getElementById("exerciseFeedback");
    const message = isCorrect ? "¡Correcto! ✅" : "¡Incorrecto! ❌";

    let explanation = "";

    // Solo mostrar respuesta correcta de forma simple
    if (exercise.type === "classification") {
      const correctAnswer = exercise.correctAnswer;
      explanation = `<br><small>La respuesta correcta es: <strong>${correctAnswer.toUpperCase()}</strong></small>`;
    } else if (exercise.explanation) {
      explanation = `<br><small>${exercise.explanation}</small>`;
    }

    // Calcular puntuación actual
    const totalAnswered = this.exerciseData.answeredQuestions;
    const correctAnswers = this.exerciseData.correctAnswers;
    const percentage = Math.round((correctAnswers / totalAnswered) * 100);

    // Crear mensaje de puntuación en tiempo real
    const scoreMessage = `
      <div class="real-time-score">
        <strong>📊 Puntuación actual:</strong><br>
        Respondiste ${totalAnswered} ejercicio${totalAnswered > 1 ? "s" : ""}, 
        ${correctAnswers} correct${correctAnswers === 1 ? "o" : "os"}.<br>
        <span class="score-highlight">Tu puntuación: ${correctAnswers}/${totalAnswered} (${percentage}%)</span>
      </div>
    `;

    feedbackDiv.innerHTML = `
      <div class="feedback-${isCorrect ? "correct" : "incorrect"}">
        ${message}${explanation}
      </div>
      ${scoreMessage}
    `;
    feedbackDiv.classList.remove("hidden");
  }

  // Generar explicación del procedimiento para números primos/compuestos
  generateProcedureExplanation(number, divisors) {
    const isPrime = divisors.length === 2;

    let steps = `
      <div class="procedure-explanation">
        <h5>🔍 Procedimiento de resolución:</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>Paso 1:</strong> Encontrar todos los divisores de ${number}
          </div>
          <div class="step">
            <strong>Paso 2:</strong> Dividir ${number} entre números desde 1 hasta ${number}
          </div>
    `;

    // Mostrar algunos pasos del cálculo
    let calculationSteps = "";
    for (let i = 1; i <= Math.min(number, 10); i++) {
      if (number % i === 0) {
        calculationSteps += `<div class="calculation">📌 ${number} ÷ ${i} = ${
          number / i
        } (divisible)</div>`;
      } else if (i <= 5) {
        calculationSteps += `<div class="calculation">❌ ${number} ÷ ${i} = ${(
          number / i
        ).toFixed(2)} (no divisible)</div>`;
      }
    }

    if (number > 10) {
      calculationSteps += `<div class="calculation">... (continuamos hasta ${number})</div>`;
    }

    steps += `
          <div class="step">
            <strong>Paso 3:</strong> Verificar divisibilidad:
            <div class="calculation-box">
              ${calculationSteps}
            </div>
          </div>
          <div class="step">
            <strong>Paso 4:</strong> Contar divisores encontrados: ${divisors.join(
              ", "
            )}
          </div>
          <div class="step">
            <strong>Conclusión:</strong> Como ${number} tiene ${
      divisors.length
    } divisores, 
            es un número <strong>${isPrime ? "PRIMO" : "COMPUESTO"}</strong>
            ${
              isPrime
                ? "(solo divisible por 1 y sí mismo)"
                : "(divisible por más de 2 números)"
            }
          </div>
        </div>
      </div>
    `;

    return steps;
  }

  // Generar explicación del procedimiento para verdadero/falso
  generateTrueFalseProcedure(exercise) {
    return `
      <div class="procedure-explanation">
        <h5>🤔 Procedimiento de resolución:</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>Paso 1:</strong> Leer y analizar cuidadosamente la afirmación
          </div>
          <div class="step">
            <strong>Paso 2:</strong> Recordar las definiciones y propiedades de números primos
          </div>
          <div class="step">
            <strong>Paso 3:</strong> Buscar contraejemplos (si la afirmación es falsa)
          </div>
          <div class="step">
            <strong>Paso 4:</strong> Aplicar teoremas conocidos (si la afirmación es verdadera)
          </div>
          <div class="step">
            <strong>Razonamiento:</strong> ${exercise.explanation}
          </div>
        </div>
      </div>
    `;
  }

  // Generar explicación ANTES del ejercicio de clasificación
  generatePreExerciseProcedure(number) {
    return `
      <div class="pre-exercise-explanation">
        <h5>📚 ¿Cómo determinar si un número es primo o compuesto?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>Paso 1:</strong> Encuentra todos los divisores del número ${number}
            <div class="tip">💡 Un divisor es un número que divide exactamente (sin residuo)</div>
          </div>
          <div class="step">
            <strong>Paso 2:</strong> Divide ${number} entre todos los números desde 1 hasta ${number}
            <div class="tip">💡 Si el resultado es un número entero, entonces es divisor</div>
          </div>
          <div class="step">
            <strong>Paso 3:</strong> Cuenta cuántos divisores encontraste
            <div class="tip">💡 Anota todos los números que dividen exactamente</div>
          </div>
          <div class="step">
            <strong>Paso 4:</strong> Aplica la regla:
            <div class="rule-box">
              📌 <strong>PRIMO:</strong> Solo tiene 2 divisores (1 y el mismo número)<br>
              📌 <strong>COMPUESTO:</strong> Tiene más de 2 divisores
            </div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Ahora intenta con el número ${number}:</strong>
        </div>
      </div>
    `;
  }

  // Generar explicación ANTES del ejercicio verdadero/falso
  generateTrueFalsePreProcedure() {
    return `
      <div class="pre-exercise-explanation">
        <h5>🧠 ¿Cómo evaluar afirmaciones sobre números primos?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>Paso 1:</strong> Lee la afirmación cuidadosamente
            <div class="tip">💡 Identifica las palabras clave como "todos", "ningún", "siempre"</div>
          </div>
          <div class="step">
            <strong>Paso 2:</strong> Recuerda las definiciones básicas
            <div class="rule-box">
              📌 <strong>Primo:</strong> Solo divisible por 1 y sí mismo<br>
              📌 <strong>Compuesto:</strong> Tiene más divisores<br>
              📌 <strong>El 1:</strong> No es primo ni compuesto<br>
              📌 <strong>Factorización:</strong> Escribir un número como producto de primos<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Ejemplo: 12 = 2 × 2 × 3
            </div>
          </div>
          <div class="step">
            <strong>Paso 3:</strong> Busca contraejemplos (para demostrar que es falsa)
            <div class="tip">💡 Un solo contraejemplo hace falsa una afirmación universal</div>
          </div>
          <div class="step">
            <strong>Paso 4:</strong> Usa teoremas conocidos (para confirmar que es verdadera)
            <div class="tip">💡 Teorema Fundamental: Todo compuesto se puede factorizar en primos</div>
          </div>
          <div class="step">
            <strong>Ejemplos útiles para recordar:</strong>
            <div class="rule-box">
              ✅ <strong>Factorizaciones:</strong><br>
              • 4 = 2 × 2 (compuesto)<br>
              • 6 = 2 × 3 (compuesto)<br>
              • 8 = 2 × 2 × 2 (compuesto)<br>
              • 9 = 3 × 3 (compuesto)<br>
              • 15 = 3 × 5 (compuesto)
            </div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Ahora evalúa la siguiente afirmación:</strong>
        </div>
      </div>
    `;
  }

  // Generar explicación específica según el tipo de pregunta verdadero/falso
  generateSpecificTrueFalseExplanation(question) {
    if (
      question.includes("factorizarse en primos") ||
      question.includes("factorizar")
    ) {
      return this.generateFactorizationExplanation();
    } else if (
      question.includes("números impares") ||
      question.includes("impar")
    ) {
      return this.generateOddNumbersExplanation();
    } else if (
      question.includes("único primo par") ||
      question.includes("primo par")
    ) {
      return this.generateEvenPrimeExplanation();
    } else if (
      question.includes("infinitos números primos") ||
      question.includes("infinitos")
    ) {
      return this.generateInfinitePrimesExplanation();
    } else if (
      question.includes("número 1") ||
      question.includes("1 es primo")
    ) {
      return this.generateNumberOneExplanation();
    } else {
      return this.generateTrueFalsePreProcedure();
    }
  }

  // Explicación específica para factorización
  generateFactorizationExplanation() {
    return `
      <div class="pre-exercise-explanation">
        <h5>🔢 ¿Qué significa "factorizar en primos"?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>🎯 Definición:</strong> Factorizar significa escribir un número como producto (multiplicación) de números primos
            <div class="tip">💡 Es como "desarmar" un número en sus piezas básicas (los primos)</div>
          </div>
          <div class="step">
            <strong>📝 Ejemplos prácticos:</strong>
            <div class="rule-box">
              • <strong>12</strong> = 2 × 2 × 3 = 2² × 3<br>
              • <strong>15</strong> = 3 × 5<br>
              • <strong>20</strong> = 2 × 2 × 5 = 2² × 5<br>
              • <strong>30</strong> = 2 × 3 × 5<br>
              • <strong>36</strong> = 2 × 2 × 3 × 3 = 2² × 3²
            </div>
          </div>
          <div class="step">
            <strong>🏛️ Teorema Fundamental de la Aritmética:</strong>
            <div class="tip">📚 Todo número compuesto se puede escribir de UNA sola manera como producto de primos</div>
          </div>
          <div class="step">
            <strong>❓ Pregunta clave:</strong> ¿TODOS los números compuestos se pueden factorizar?
            <div class="tip">💭 Piensa en cualquier número compuesto... ¿siempre podrás encontrar sus factores primos?</div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Ahora evalúa la afirmación sobre factorización:</strong>
        </div>
      </div>
    `;
  }

  // Explicación para números impares
  generateOddNumbersExplanation() {
    return `
      <div class="pre-exercise-explanation">
        <h5>🔍 ¿Todos los números impares son primos?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>📚 Recuerda:</strong>
            <div class="rule-box">
              📌 <strong>Impar:</strong> No es divisible por 2 (termina en 1,3,5,7,9)<br>
              📌 <strong>Primo:</strong> Solo divisible por 1 y sí mismo
            </div>
          </div>
          <div class="step">
            <strong>🤔 Estrategia:</strong> Busca contraejemplos
            <div class="tip">💡 Si encuentras UN número impar que NO sea primo, la afirmación es falsa</div>
          </div>
          <div class="step">
            <strong>🔍 Examina estos números impares:</strong>
            <div class="rule-box">
              • <strong>1:</strong> No es primo (por definición)<br>
              • <strong>3:</strong> ¿Es primo? Divisores: 1, 3<br>
              • <strong>5:</strong> ¿Es primo? Divisores: 1, 5<br>
              • <strong>7:</strong> ¿Es primo? Divisores: 1, 7<br>
              • <strong>9:</strong> ¿Es primo? Divisores: 1, 3, 9 ← ¡Contraejemplo!
            </div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Con esta información, evalúa la afirmación:</strong>
        </div>
      </div>
    `;
  }

  // Explicación para el único primo par
  generateEvenPrimeExplanation() {
    return `
      <div class="pre-exercise-explanation">
        <h5>🎯 ¿El número 2 es el único primo par?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>📚 Conceptos clave:</strong>
            <div class="rule-box">
              📌 <strong>Par:</strong> Divisible por 2 (termina en 0,2,4,6,8)<br>
              📌 <strong>Primo:</strong> Solo divisible por 1 y sí mismo
            </div>
          </div>
          <div class="step">
            <strong>🔍 Analiza los números pares:</strong>
            <div class="rule-box">
              • <strong>2:</strong> Divisores: 1, 2 → ¿Es primo? ✅<br>
              • <strong>4:</strong> Divisores: 1, 2, 4 → ¿Es primo? ❌<br>
              • <strong>6:</strong> Divisores: 1, 2, 3, 6 → ¿Es primo? ❌<br>
              • <strong>8:</strong> Divisores: 1, 2, 4, 8 → ¿Es primo? ❌
            </div>
          </div>
          <div class="step">
            <strong>💡 Razonamiento lógico:</strong>
            <div class="tip">🤔 Si un número par es mayor que 2, ¿puede ser primo? Piensa: ¿será divisible por 2?</div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Ahora evalúa si el 2 es el único primo par:</strong>
        </div>
      </div>
    `;
  }

  // Explicación para infinitos primos
  generateInfinitePrimesExplanation() {
    return `
      <div class="pre-exercise-explanation">
        <h5>♾️ ¿Existen infinitos números primos?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>🏛️ Teorema de Euclides (300 a.C.):</strong>
            <div class="tip">📚 Uno de los teoremas más famosos de las matemáticas</div>
          </div>
          <div class="step">
            <strong>🤔 Razonamiento por contradicción:</strong>
            <div class="rule-box">
              1. Supón que hay un número FINITO de primos<br>
              2. Multiplica todos esos primos y suma 1<br>
              3. Este nuevo número no es divisible por ninguno de los primos originales<br>
              4. ¡Contradicción! Debe haber más primos
            </div>
          </div>
          <div class="step">
            <strong>💡 Ejemplo simple:</strong>
            <div class="tip">Si solo existieran 2, 3, 5 → (2×3×5)+1 = 31, que también es primo</div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Con este conocimiento histórico, evalúa:</strong>
        </div>
      </div>
    `;
  }

  // Explicación para el número 1
  generateNumberOneExplanation() {
    return `
      <div class="pre-exercise-explanation">
        <h5>🔢 ¿El número 1 es primo?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>📚 Definición de número primo:</strong>
            <div class="rule-box">
              📌 Un número primo tiene EXACTAMENTE 2 divisores distintos:<br>
              &nbsp;&nbsp;&nbsp;&nbsp;• El 1<br>
              &nbsp;&nbsp;&nbsp;&nbsp;• Él mismo
            </div>
          </div>
          <div class="step">
            <strong>🔍 Analicemos el número 1:</strong>
            <div class="rule-box">
              • Divisores de 1: solamente {1}<br>
              • ¿Cuántos divisores tiene? 1 divisor<br>
              • ¿Cumple la definición de primo? ❌ (necesita 2 divisores)
            </div>
          </div>
          <div class="step">
            <strong>🏛️ Razón histórica:</strong>
            <div class="tip">📜 Se excluye el 1 para preservar la unicidad de la factorización prima</div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Con esta definición clara, evalúa:</strong>
        </div>
      </div>
    `;
  }

  // Siguiente ejercicio
  nextExercise() {
    this.exerciseData.currentExercise++;
    this.updateExerciseHeader();
    this.showCurrentExercise();
  }

  // Actualizar header
  updateExerciseHeader() {
    document.getElementById("currentExercise").textContent =
      this.exerciseData.currentExercise;
    document.getElementById("correctAnswers").textContent =
      this.exerciseData.correctAnswers;
    document.getElementById("answeredQuestions").textContent =
      this.exerciseData.answeredQuestions;
  }

  // Reiniciar ejercicios
  restartExercises() {
    // Limpiar feedback
    document.getElementById("exerciseFeedback").innerHTML = "";
    document.getElementById("exerciseFeedback").classList.add("hidden");
    document.getElementById("nextExerciseBtn").classList.add("hidden");

    // Reiniciar datos
    this.exerciseData = {
      currentExercise: 1,
      correctAnswers: 0,
      answeredQuestions: 0,
      exercises: [],
    };

    this.generateExerciseBank();
    this.startDynamicExercises();
  }

  // Configurar botón de refresh
  setupRefreshButton() {
    const refreshBtn = document.getElementById("refreshExamples");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.generateDynamicExamples();
        this.generateDynamicCuriosity();
        this.setupPrimeFinder();

        // Reiniciar ejercicios dinámicos
        if (this.exerciseData) {
          this.restartExercises();
        }

        // Feedback visual
        refreshBtn.style.transform = "rotate(360deg)";
        setTimeout(() => {
          refreshBtn.style.transform = "";
        }, 600);

        // Mostrar toast de confirmación si existe la función
        if (window.Utils && window.Utils.showToast) {
          window.Utils.showToast(
            "¡Nuevos ejemplos y curiosidad generados!",
            "success"
          );
        }
      });
    }

    // Configurar botón de refresh de curiosidad
    const curiosityRefreshBtn = document.getElementById("refreshCuriosity");
    if (curiosityRefreshBtn) {
      curiosityRefreshBtn.addEventListener("click", () => {
        this.generateDynamicCuriosity();

        // Feedback visual
        curiosityRefreshBtn.style.transform = "rotate(360deg)";
        setTimeout(() => {
          curiosityRefreshBtn.style.transform = "";
        }, 600);
      });
    }
  }

  // Generar curiosidad dinámica
  generateDynamicCuriosity() {
    const curiosityContainer = document.getElementById("dynamicCuriosity");
    if (!curiosityContainer) return;

    // Seleccionar una curiosidad aleatoria
    const randomCuriosity = this.getRandomElements(this.curiosidadesBank, 1)[0];

    // Generar el HTML de la curiosidad
    curiosityContainer.innerHTML = `
      <h4>${randomCuriosity.emoji} ${randomCuriosity.titulo}</h4>
      <p>${randomCuriosity.descripcion}</p>
      <div class="example-box">
        ${randomCuriosity.ejemplo}
      </div>
      <div class="citation">
        <em>${randomCuriosity.cita}</em>
      </div>
    `;

    // Agregar animación de entrada
    curiosityContainer.style.opacity = "0";
    curiosityContainer.style.transform = "translateY(20px)";

    setTimeout(() => {
      curiosityContainer.style.transition = "all 0.5s ease";
      curiosityContainer.style.opacity = "1";
      curiosityContainer.style.transform = "translateY(0)";
    }, 100);
  }

  // Generar ejemplos dinámicos al cargar la página
  generateDynamicExamples() {
    this.updatePrimosExamples();
    this.updateCompuestosExamples();
    this.updateGemelosExamples();
    this.updateGoldbachExamples();
    this.updateAnalysisExamples();
    this.updateMethodSteps();
  }

  // Actualizar pasos del método dinámicamente
  updateMethodSteps() {
    const methodSteps = [
      {
        number: "1",
        title: "Verificar si es mayor que 1",
        description:
          "Solo los números mayores que 1 pueden ser primos o compuestos",
      },
      {
        number: "2",
        title: "Buscar divisores",
        description: "Probar la divisibilidad desde 2 hasta √n",
      },
      {
        number: "3",
        title: "Clasificar",
        description:
          "Si solo tiene divisores 1 y él mismo → Primo | Si tiene más divisores → Compuesto",
      },
      {
        number: "4",
        title: "Verificar casos especiales",
        description:
          "El 1 no es primo ni compuesto, el 2 es el único primo par",
      },
      {
        number: "5",
        title: "Aplicar reglas de divisibilidad",
        description: "Usar reglas conocidas (pares, múltiplos de 3, 5, etc.)",
      },
      {
        number: "6",
        title: "Confirmar resultado",
        description:
          "Revisar todos los divisores encontrados para clasificar correctamente",
      },
    ];

    // Seleccionar un paso aleatorio
    const randomStep = this.getRandomElements(methodSteps, 1)[0];

    // Actualizar el contenedor de pasos
    const methodStepsContainer = document.querySelector(".method-steps");
    if (methodStepsContainer) {
      methodStepsContainer.innerHTML = `
        <div class="method-step">
          <span class="step-number">${randomStep.number}</span>
          <div class="step-content">
            <strong>${randomStep.title}</strong> - ${randomStep.description}
          </div>
        </div>
      `;
    }
  }

  // Actualizar ejemplos de números primos
  updatePrimosExamples() {
    const examples = this.getRandomElements(this.dynamicExamples.primos, 8);
    const primosExampleBox = document.querySelector(
      ".definition-item:first-child .example-box"
    );
    if (primosExampleBox) {
      primosExampleBox.innerHTML = `<strong>Ejemplos:</strong> ${examples.join(
        ", "
      )}...`;
    }
  }

  // Actualizar ejemplos de números compuestos
  updateCompuestosExamples() {
    const examples = this.getRandomElements(this.dynamicExamples.compuestos, 8);
    const compuestosExampleBox = document.querySelector(
      ".definition-item:last-child .example-box"
    );
    if (compuestosExampleBox) {
      compuestosExampleBox.innerHTML = `<strong>Ejemplos:</strong> ${examples.join(
        ", "
      )}...`;
    }
  }

  // Actualizar ejemplos de primos gemelos
  updateGemelosExamples() {
    const examples = this.getRandomElements(this.dynamicExamples.gemelos, 5);
    const gemelosExampleBox = document.querySelector(
      ".curiosity-card:first-child .example-box"
    );
    if (gemelosExampleBox) {
      const formatted = examples
        .map((pair) => `(${pair[0]},${pair[1]})`)
        .join(", ");
      gemelosExampleBox.textContent = `${formatted}...`;
    }
  }

  // Actualizar ejemplos de Goldbach
  updateGoldbachExamples() {
    const examples = this.getRandomElements(this.dynamicExamples.goldbach, 5);
    const goldbachExampleBox = document.querySelector(
      ".curiosity-card:nth-child(2) .example-box"
    );
    if (goldbachExampleBox) {
      const formatted = examples
        .map((item) => `${item.num}=${item.sumas[0]}`)
        .join(", ");
      goldbachExampleBox.textContent = `${formatted}...`;
    }
  }

  // Actualizar ejemplos de análisis paso a paso
  updateAnalysisExamples() {
    // Decidir aleatoriamente si mostrar un primo o un compuesto
    const showPrimo = Math.random() < 0.5;

    if (showPrimo) {
      // Ejemplo primo aleatorio
      const randomPrimo = this.getRandomElements(
        this.dynamicExamples.primos.filter((p) => p > 10 && p < 50),
        1
      )[0];
      const exampleContainer = document.querySelector(
        ".example-item:first-child"
      );
      if (exampleContainer) {
        const sqrt = Math.floor(Math.sqrt(randomPrimo));
        exampleContainer.innerHTML = `
          <h4>Ejemplo: ¿Es ${randomPrimo} primo o compuesto?</h4>
          <div class="step">1. Es mayor que 1 ✓</div>
          <div class="step">2. Probar divisibilidad: √${randomPrimo} ≈ ${sqrt}</div>
          ${this.generateDivisionSteps(randomPrimo, sqrt)}
          <div class="step conclusion">
            ✅ <strong>${randomPrimo} es PRIMO</strong> (solo divisores: 1 y ${randomPrimo})
          </div>
        `;
      }
    } else {
      // Ejemplo compuesto aleatorio
      const randomCompuesto = this.getRandomElements(
        this.dynamicExamples.compuestos.filter((c) => c > 10 && c < 50),
        1
      )[0];
      const exampleContainer = document.querySelector(
        ".example-item:first-child"
      );
      if (exampleContainer) {
        const divisors = this.findDivisors(randomCompuesto);
        const firstDivisor = divisors.find((d) => d > 1 && d < randomCompuesto);
        exampleContainer.innerHTML = `
          <h4>Ejemplo: ¿Es ${randomCompuesto} primo o compuesto?</h4>
          <div class="step">1. Es mayor que 1 ✓</div>
          <div class="step">2. Probar divisibilidad: √${randomCompuesto} ≈ ${Math.floor(
          Math.sqrt(randomCompuesto)
        )}</div>
          <div class="step">3. Probar: ${randomCompuesto} ÷ ${firstDivisor} = ${
          randomCompuesto / firstDivisor
        } ✓ (sí es entero)</div>
          <div class="step conclusion">
            ❌ <strong>${randomCompuesto} es COMPUESTO</strong> (divisores: ${divisors.join(
          ", "
        )})
          </div>
        `;
      }
    }

    // Ocultar el segundo y tercer ejemplo
    const secondExample = document.querySelector(".example-item:nth-child(2)");
    const thirdExample = document.querySelector(".example-item:nth-child(3)");

    if (secondExample) {
      secondExample.style.display = "none";
    }
    if (thirdExample) {
      thirdExample.style.display = "none";
    }
  }

  // Generar pasos de división para número primo
  generateDivisionSteps(number, sqrt) {
    let steps = "";
    for (let i = 2; i <= sqrt; i++) {
      const result = (number / i).toFixed(2);
      steps += `<div class="step">${
        i + 1
      }. Probar: ${number} ÷ ${i} = ${result} (no es entero)</div>`;
    }
    return steps;
  }

  // Función auxiliar para obtener elementos aleatorios
  getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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

  // Configurar ejercicios interactivos (LEGACY - Ya no se usa)
  /*
  setupExercises() {
    this.generateDynamicClassificationExercise();
    this.generateDynamicTrueFalseExercise();
    this.setupClassificationExercise();
    this.setupTrueFalseExercise();
  }
  */

  // Generar ejercicio de clasificación dinámico
  generateDynamicClassificationExercise() {
    const numberClassification = document.querySelector(
      ".number-classification"
    );
    if (!numberClassification) return;

    // Generar números aleatorios (2 primos y 2 compuestos)
    const primos = this.getRandomElements(
      this.dynamicExamples.primos.filter((p) => p > 10 && p < 100),
      2
    );
    const compuestos = this.getRandomElements(
      this.dynamicExamples.compuestos.filter((c) => c > 10 && c < 100),
      2
    );

    const numbers = [
      ...primos.map((p) => ({ num: p, type: "primo" })),
      ...compuestos.map((c) => ({ num: c, type: "compuesto" })),
    ];

    // Mezclar números
    numbers.sort(() => 0.5 - Math.random());

    numberClassification.innerHTML = numbers
      .map(
        (item) => `
      <div class="number-item" data-number="${item.num}" data-type="${item.type}">
        <span class="number">${item.num}</span>
        <div class="classification-buttons">
          <button class="classify-btn primo-btn" data-answer="primo">P</button>
          <button class="classify-btn compuesto-btn" data-answer="compuesto">C</button>
        </div>
        <div class="feedback hidden"></div>
      </div>
    `
      )
      .join("");
  }

  // Generar ejercicio verdadero/falso dinámico
  generateDynamicTrueFalseExercise() {
    const trueFalseSection = document.querySelector(".true-false-section");
    if (!trueFalseSection) return;

    const statements = [
      {
        text: "Todos los números impares son primos",
        answer: "false",
        feedback:
          "<strong>Falso.</strong> Contraejemplo: 9 = 3×3 es impar pero compuesto.",
      },
      {
        text: "El número 2 es el único primo par",
        answer: "true",
        feedback:
          "<strong>Verdadero.</strong> Todos los demás pares son divisibles por 2.",
      },
      {
        text: "Todo número compuesto puede factorizarse en primos",
        answer: "true",
        feedback:
          "<strong>Verdadero.</strong> Teorema Fundamental de la Aritmética.",
      },
      {
        text: "Existen infinitos números primos",
        answer: "true",
        feedback:
          "<strong>Verdadero.</strong> Demostrado por Euclides en el siglo III a.C.",
      },
      {
        text: "El número 1 es primo",
        answer: "false",
        feedback:
          "<strong>Falso.</strong> El 1 no es primo ni compuesto por definición.",
      },
      {
        text: "Todos los números primos mayores que 2 son impares",
        answer: "true",
        feedback:
          "<strong>Verdadero.</strong> Si fueran pares, serían divisibles por 2.",
      },
    ];

    // Seleccionar 3 statements aleatorios
    const selectedStatements = this.getRandomElements(statements, 3);

    trueFalseSection.innerHTML = selectedStatements
      .map(
        (statement) => `
      <div class="statement" data-answer="${statement.answer}">
        <p>"${statement.text}"</p>
        <div class="tf-buttons">
          <button class="tf-btn" data-answer="true">Verdadero</button>
          <button class="tf-btn" data-answer="false">Falso</button>
        </div>
        <div class="tf-feedback hidden">
          ${statement.feedback}
        </div>
      </div>
    `
      )
      .join("");
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

    // Generar rango aleatorio de números (20 números consecutivos)
    const startNumber = Math.floor(Math.random() * 20) + 1; // Entre 1 y 20
    const endNumber = startNumber + 19; // 20 números consecutivos

    // Actualizar el texto de instrucciones
    const instructionText = document.querySelector(".prime-finder p");
    if (instructionText) {
      instructionText.textContent = `Encuentra todos los números primos entre ${startNumber} y ${endNumber}:`;
    }

    // Contar cuántos primos hay en el rango para actualizar el contador
    let primesInRange = 0;
    for (let i = startNumber; i <= endNumber; i++) {
      if (this.isPrime(i)) {
        primesInRange++;
      }
    }

    // Actualizar el contador
    const counterElement = document.querySelector(".prime-counter");
    if (counterElement) {
      counterElement.innerHTML = `<span id="foundPrimes">0</span> / ${primesInRange} primos encontrados`;
    }

    // Limpiar grid anterior
    numberGrid.innerHTML = "";

    // Generar números en el rango
    for (let i = startNumber; i <= endNumber; i++) {
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
        this.togglePrimeSelection(
          numberButton,
          document.getElementById("foundPrimes")
        );
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
