// Módulo para Máximo Común Divisor (MCD)
class MCDModule {
  constructor() {
    this.curiosidadesBank = [
      {
        emoji: "🏛️",
        titulo: "El Algoritmo Más Antiguo",
        descripcion:
          "¡El Algoritmo de Euclides para calcular el MCD tiene más de 2,300 años!",
        ejemplo:
          "Fue descrito por Euclides en su libro 'Los Elementos' alrededor del año 300 a.C., y todavía se usa hoy en día en computadoras.",
        cita: "(Euclides, en Burton, 2017, p. 128)",
      },
      {
        emoji: "🧩",
        titulo: "MCD y MCM son Amigos",
        descripcion:
          "¡El MCD y el MCM (Mínimo Común Múltiplo) están conectados por una fórmula mágica!",
        ejemplo:
          "MCD(a,b) × MCM(a,b) = a × b. Por ejemplo: MCD(12,18) × MCM(12,18) = 6 × 36 = 216 = 12 × 18",
        cita: "(Rosen, 2019, p. 160)",
      },
      {
        emoji: "🍕",
        titulo: "Repartir Pizza de Forma Justa",
        descripcion:
          "¡El MCD te ayuda a repartir cosas de manera equitativa!",
        ejemplo:
          "Si tienes 12 rebanadas de pizza y 18 galletas, el MCD(12,18)=6 te dice que puedes hacer 6 bolsas iguales (2 pizzas y 3 galletas en cada una).",
        cita: "(SEP, 2023, p. 54)",
      },
      {
        emoji: "📐",
        titulo: "Simplificar Fracciones",
        descripcion:
          "¡El MCD es tu mejor amigo para simplificar fracciones!",
        ejemplo:
          "Para simplificar 12/18, calculamos MCD(12,18)=6, luego dividimos: 12÷6=2 y 18÷6=3. Resultado: 2/3",
        cita: "(SEP, 2023, p. 55)",
      },
      {
        emoji: "🎨",
        titulo: "Azulejos Perfectos",
        descripcion:
          "¿Quieres cubrir un piso rectangular con azulejos cuadrados? ¡El MCD te dice el tamaño más grande posible!",
        ejemplo:
          "Para un piso de 24cm × 36cm, el MCD(24,36)=12 significa que puedes usar azulejos de 12cm × 12cm sin desperdiciar espacio.",
        cita: "(Burton, 2017, p. 126)",
      },
      {
        emoji: "🔢",
        titulo: "Números Primos Entre Sí",
        descripcion:
          "Cuando el MCD de dos números es 1, se llaman 'primos entre sí' o 'coprimos'",
        ejemplo:
          "MCD(15,28)=1, aunque ni 15 ni 28 son primos, ¡no tienen divisores comunes excepto el 1!",
        cita: "(Rosen, 2019, p. 156)",
      },
    ];

    this.init();
  }

  init() {
    this.setupCalculator();
    this.setupDynamicExercises();
    this.generateDynamicCuriosity();
  }

  // Configurar calculadora interactiva
  setupCalculator() {
    const calculateBtn = document.getElementById("calculateBtn");
    const number1Input = document.getElementById("number1Input");
    const number2Input = document.getElementById("number2Input");

    if (calculateBtn && number1Input && number2Input) {
      calculateBtn.addEventListener("click", () => {
        const num1 = parseInt(number1Input.value);
        const num2 = parseInt(number2Input.value);

        if (!num1 || !num2 || num1 < 1 || num2 < 1) {
          alert("Por favor ingresa dos números válidos mayores que 0");
          return;
        }

        this.calculateAndDisplayMCD(num1, num2);
      });

      // Permitir calcular con Enter
      [number1Input, number2Input].forEach((input) => {
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            calculateBtn.click();
          }
        });
      });
    }
  }

  // Calcular MCD usando el Algoritmo de Euclides
  calculateMCD(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Obtener todos los divisores de un número
  getDivisors(num) {
    const divisors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  // Calcular y mostrar el MCD
  calculateAndDisplayMCD(num1, num2) {
    const mcd = this.calculateMCD(num1, num2);
    const divisors1 = this.getDivisors(num1);
    const divisors2 = this.getDivisors(num2);
    const commonDivisors = divisors1.filter((d) => divisors2.includes(d));

    const resultSection = document.getElementById("resultSection");
    const resultType = document.getElementById("resultType");
    const divisorsList = document.getElementById("divisorsList");
    const explanation = document.getElementById("explanation");

    // Mostrar resultado principal
    resultType.innerHTML = `
      <div class="mcd-result">
        <h3>🎯 Resultado</h3>
        <div class="mcd-value">MCD(${num1}, ${num2}) = ${mcd}</div>
      </div>
    `;

    // Mostrar divisores
    divisorsList.innerHTML = `
      <div class="divisors-section">
        <h4>📊 Análisis de Divisores</h4>
        <div class="divisor-row">
          <strong>Divisores de ${num1}:</strong> ${divisors1.join(", ")}
        </div>
        <div class="divisor-row">
          <strong>Divisores de ${num2}:</strong> ${divisors2.join(", ")}
        </div>
        <div class="divisor-row common">
          <strong>Divisores comunes:</strong> ${commonDivisors.join(", ")}
        </div>
        <div class="divisor-row highlight">
          <strong>Máximo común divisor:</strong> ${mcd} ✅
        </div>
      </div>
    `;

    // Generar explicación con el Algoritmo de Euclides
    const euclidSteps = this.generateEuclidSteps(num1, num2);
    explanation.innerHTML = `
      <div class="explanation-section">
        <h4>🔍 Método del Algoritmo de Euclides</h4>
        <div class="euclid-steps">
          ${euclidSteps}
        </div>
        <div class="interpretation">
          <h4>💡 Interpretación</h4>
          <p>
            ${this.getInterpretation(num1, num2, mcd)}
          </p>
        </div>
      </div>
    `;

    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Generar pasos del Algoritmo de Euclides
  generateEuclidSteps(a, b) {
    let steps = "";
    let stepNum = 1;
    const originalA = a;
    const originalB = b;

    while (b !== 0) {
      const quotient = Math.floor(a / b);
      const remainder = a % b;
      steps += `
        <div class="euclid-step">
          <strong>Paso ${stepNum}:</strong> ${a} = ${b} × ${quotient} + ${remainder}
        </div>
      `;
      a = b;
      b = remainder;
      stepNum++;
    }

    steps += `
      <div class="euclid-step final">
        <strong>Conclusión:</strong> El último divisor diferente de 0 es ${a}, por lo tanto MCD(${originalA}, ${originalB}) = ${a}
      </div>
    `;

    return steps;
  }

  // Obtener interpretación del resultado
  getInterpretation(num1, num2, mcd) {
    if (mcd === 1) {
      return `Los números ${num1} y ${num2} son <strong>primos entre sí</strong> (o coprimos), 
              ya que no tienen divisores comunes excepto el 1. Esto significa que no se pueden 
              simplificar más si fueran una fracción ${num1}/${num2}.`;
    } else if (mcd === Math.min(num1, num2)) {
      const mayor = Math.max(num1, num2);
      const menor = Math.min(num1, num2);
      return `El número ${menor} divide exactamente a ${mayor}, por eso el MCD es ${mcd}. 
              Esto significa que ${mayor} es múltiplo de ${menor} (${mayor} = ${menor} × ${
        mayor / menor
      }).`;
    } else {
      return `El mayor número que divide exactamente a ${num1} y ${num2} es ${mcd}. 
              Esto significa que puedes dividir ambos números en ${mcd} partes iguales, 
              o simplificar la fracción ${num1}/${num2} = ${num1 / mcd}/${num2 / mcd}.`;
    }
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

    // Ejercicios de cálculo de MCD (5)
    const mcdProblems = [
      { num1: 12, num2: 18, answer: 6 },
      { num1: 24, num2: 36, answer: 12 },
      { num1: 15, num2: 25, answer: 5 },
      { num1: 20, num2: 30, answer: 10 },
      { num1: 14, num2: 21, answer: 7 },
      { num1: 16, num2: 24, answer: 8 },
      { num1: 27, num2: 45, answer: 9 },
      { num1: 32, num2: 48, answer: 16 },
    ];

    const selectedMCD = this.getRandomElements(mcdProblems, 5);
    selectedMCD.forEach((problem) => {
      const wrongAnswers = this.generateWrongAnswers(
        problem.num1,
        problem.num2,
        problem.answer
      );
      const allOptions = [problem.answer, ...wrongAnswers]
        .sort(() => 0.5 - Math.random())
        .map((opt) => ({ text: opt.toString(), value: opt }));

      exercises.push({
        type: "mcd",
        question: `¿Cuál es el MCD de ${problem.num1} y ${problem.num2}?`,
        num1: problem.num1,
        num2: problem.num2,
        correctAnswer: problem.answer,
        options: allOptions,
      });
    });

    // Ejercicios de verdadero/falso (5)
    const trueFalseQuestions = [
      {
        question: "El MCD de dos números siempre es menor o igual que ambos números",
        answer: true,
        explanation:
          "¡Verdadero! El MCD es un divisor común, y un divisor siempre es menor o igual al número que divide.",
      },
      {
        question: "Si el MCD de dos números es 1, los números son primos",
        answer: false,
        explanation:
          "¡Falso! Los números son 'primos entre sí' (coprimos), pero no necesariamente primos. Ejemplo: MCD(15,28)=1, pero ni 15 ni 28 son primos.",
      },
      {
        question: "El MCD de dos números iguales es el mismo número",
        answer: true,
        explanation:
          "¡Verdadero! Por ejemplo, MCD(12,12)=12, porque el mayor divisor de un número es él mismo.",
      },
      {
        question: "MCD(a,b) × MCM(a,b) = a × b",
        answer: true,
        explanation:
          "¡Verdadero! Esta es una propiedad importante que relaciona el MCD con el MCM.",
      },
      {
        question: "El MCD de dos números primos siempre es 1",
        answer: true,
        explanation:
          "¡Verdadero! Los números primos solo se dividen por 1 y por sí mismos, así que no tienen divisores comunes excepto el 1.",
      },
      {
        question: "El MCD se puede usar para simplificar fracciones",
        answer: true,
        explanation:
          "¡Verdadero! Dividimos numerador y denominador por su MCD para obtener la fracción simplificada.",
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
          { text: "Verdadero", value: true },
          { text: "Falso", value: false },
        ],
      });
    });

    // Mezclar ejercicios
    this.exerciseData.exercises = exercises.sort(() => 0.5 - Math.random());
  }

  // Generar respuestas incorrectas plausibles
  generateWrongAnswers(num1, num2, correctAnswer) {
    const wrongAnswers = new Set();
    const divisors1 = this.getDivisors(num1);
    const divisors2 = this.getDivisors(num2);
    const commonDivisors = divisors1.filter((d) => divisors2.includes(d));

    // Agregar otros divisores comunes
    commonDivisors.forEach((d) => {
      if (d !== correctAnswer) wrongAnswers.add(d);
    });

    // Agregar MCM como distractor
    const mcm = (num1 * num2) / correctAnswer;
    wrongAnswers.add(mcm);

    // Agregar producto
    wrongAnswers.add(num1 * num2);

    // Convertir a array y tomar 3 elementos
    const wrongArray = Array.from(wrongAnswers);
    return this.getRandomElements(wrongArray, 3);
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

    let exerciseHTML = "";

    // Agregar explicación previa si es ejercicio de MCD
    if (exercise.type === "mcd") {
      exerciseHTML += this.generateMCDProcedure(exercise.num1, exercise.num2);
    }

    // Agregar separador
    exerciseHTML += `<div class="question-separator">📋 PREGUNTA A RESOLVER:</div>`;

    // Agregar la pregunta
    exerciseHTML += `<div class="exercise-question">${exercise.question}</div>`;

    // Agregar opciones
    exerciseHTML += `
      <div class="exercise-options">
        ${exercise.options
          .map(
            (option) => `
          <button class="exercise-btn" data-value="${option.value}">
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

  // Generar procedimiento para calcular MCD
  generateMCDProcedure(num1, num2) {
    return `
      <div class="pre-exercise-explanation">
        <h5>📚 ¿Cómo calcular el MCD de dos números?</h5>
        <div class="procedure-steps">
          <div class="step">
            <strong>Método 1: Listar divisores</strong>
            <div class="tip">💡 Encuentra todos los divisores de cada número</div>
          </div>
          <div class="step">
            <strong>Paso 1:</strong> Divisores de ${num1}
            <div class="tip">Números que dividen exactamente a ${num1}</div>
          </div>
          <div class="step">
            <strong>Paso 2:</strong> Divisores de ${num2}
            <div class="tip">Números que dividen exactamente a ${num2}</div>
          </div>
          <div class="step">
            <strong>Paso 3:</strong> Identifica los divisores comunes
            <div class="tip">Números que aparecen en ambas listas</div>
          </div>
          <div class="step">
            <strong>Paso 4:</strong> El MCD es el mayor de los divisores comunes
            <div class="rule-box">
              📌 <strong>Recuerda:</strong> MCD = Mayor divisor que tienen en común
            </div>
          </div>
        </div>
        <div class="now-try">
          <strong>🎯 Ahora calcula el MCD de ${num1} y ${num2}:</strong>
        </div>
      </div>
    `;
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

    // Mostrar botón siguiente
    setTimeout(() => {
      document.getElementById("nextExerciseBtn").classList.remove("hidden");
    }, 1500);
  }

  // Verificar respuesta
  checkAnswer(exercise, userAnswer) {
    if (exercise.type === "mcd") {
      return parseInt(userAnswer) === exercise.correctAnswer;
    } else if (exercise.type === "trueFalse") {
      return userAnswer === exercise.correctAnswer.toString();
    }
    return false;
  }

  // Mostrar feedback
  showFeedback(exercise, isCorrect) {
    const feedbackDiv = document.getElementById("exerciseFeedback");
    const message = isCorrect ? "¡Muy bien! ✅" : "¡Ups! Inténtalo de nuevo ❌";

    let explanation = "";
    if (exercise.explanation) {
      explanation = `<br><small>${exercise.explanation}</small>`;
    } else if (exercise.type === "mcd") {
      explanation = `<br><small>La respuesta correcta es: <strong>${exercise.correctAnswer}</strong></small>`;
    }

    const totalAnswered = this.exerciseData.answeredQuestions;
    const correctAnswers = this.exerciseData.correctAnswers;
    const percentage = Math.round((correctAnswers / totalAnswered) * 100);

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
    document.getElementById("exerciseFeedback").innerHTML = "";
    document.getElementById("exerciseFeedback").classList.add("hidden");
    document.getElementById("nextExerciseBtn").classList.add("hidden");

    this.exerciseData = {
      currentExercise: 1,
      correctAnswers: 0,
      answeredQuestions: 0,
      exercises: [],
    };

    this.generateExerciseBank();
    this.startDynamicExercises();
  }

  // Generar curiosidad dinámica
  generateDynamicCuriosity() {
    const curiosityContainer = document.getElementById("dynamicCuriosity");
    if (!curiosityContainer) return;

    const curiosity =
      this.curiosidadesBank[
        Math.floor(Math.random() * this.curiosidadesBank.length)
      ];

    curiosityContainer.innerHTML = `
      <div class="curiosity-content">
        <div class="curiosity-emoji">${curiosity.emoji}</div>
        <h3 class="curiosity-title">${curiosity.titulo}</h3>
        <p class="curiosity-description">${curiosity.descripcion}</p>
        <div class="curiosity-example">
          <strong>Ejemplo:</strong> ${curiosity.ejemplo}
        </div>
        <div class="curiosity-citation">
          <em>${curiosity.cita}</em>
        </div>
      </div>
    `;
  }

  // Utilidad: obtener elementos aleatorios de un array
  getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new MCDModule();
});
