// ==========================
// 📘 Calculadora de Divisores
// ==========================
document.getElementById("analyzeBtn").addEventListener("click", () => {
  const num = parseInt(document.getElementById("numberInput").value);
  const resultSection = document.getElementById("resultSection");
  const divisorsList = document.getElementById("divisorsList");
  const explanation = document.getElementById("explanation");

  if (isNaN(num) || num < 1) {
    divisorsList.innerHTML = "<p>⚠️ Ingresa un número válido mayor que 0.</p>";
    resultSection.style.display = "block";
    explanation.innerHTML = "";
    return;
  }

  const divisors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) divisors.push(i);
  }

  divisorsList.innerHTML = `<strong>Divisores de ${num}:</strong> ${divisors.join(", ")}`;
  explanation.innerHTML = `<p>El número ${num} tiene <strong>${divisors.length}</strong> divisores.</p>`;
  resultSection.style.display = "block";
});

// ==========================
// 🎯 Ejercicios Interactivos
// ==========================
const exercises = [
  { question: "¿Cuántos divisores tiene el número 6?", options: ["2", "3", "4"], answer: "4" },
  { question: "¿Cuál de estos es divisor de 20?", options: ["7", "5", "9"], answer: "5" },
  { question: "¿Qué número solo tiene dos divisores?", options: ["8", "11", "9"], answer: "11" },
  { question: "¿Cuál es el divisor más grande de un número?", options: ["Su raíz cuadrada", "El número mismo", "El doble del número"], answer: "El número mismo" },
];

let current = 0, correct = 0, answered = 0;
const container = document.getElementById("exerciseContainer");
const feedback = document.getElementById("exerciseFeedback");
const nextBtn = document.getElementById("nextExerciseBtn");
const restartBtn = document.getElementById("restartExerciseBtn");

function loadExercise() {
  const ex = exercises[current];
  container.innerHTML = `
    <h3>${ex.question}</h3>
    <div class="options">
      ${ex.options.map(opt => `<button class="option-btn">${opt}</button>`).join("")}
    </div>
  `;
  feedback.classList.add("hidden");
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => checkAnswer(btn.textContent));
  });
}

function checkAnswer(choice) {
  const ex = exercises[current];
  answered++;
  document.getElementById("answeredQuestions").textContent = answered;

  if (choice === ex.answer) {
    correct++;
    feedback.textContent = "✅ ¡Correcto!";
  } else {
    feedback.textContent = `❌ Incorrecto. La respuesta correcta es: ${ex.answer}`;
  }

  document.getElementById("correctAnswers").textContent = correct;
  feedback.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < exercises.length) {
    document.getElementById("currentExercise").textContent = current + 1;
    loadExercise();
    nextBtn.classList.add("hidden");
  } else {
    container.innerHTML = `<p>🎉 Has completado todos los ejercicios.</p>`;
    nextBtn.classList.add("hidden");
  }
});

restartBtn.addEventListener("click", () => {
  current = 0; correct = 0; answered = 0;
  document.getElementById("currentExercise").textContent = 1;
  document.getElementById("correctAnswers").textContent = 0;
  document.getElementById("answeredQuestions").textContent = 0;
  loadExercise();
});

// Inicializar
loadExercise();

// ==========================
// 🌟 Curiosidades Dinámicas
// ==========================
const curiosities = [
  "El número 1 solo tiene un divisor: él mismo.",
  "Los números primos tienen exactamente dos divisores.",
  "El número 12 tiene seis divisores: 1, 2, 3, 4, 6, 12.",
  "El número de divisores está relacionado con la factorización prima del número.",
];

function showCuriosity() {
  const random = curiosities[Math.floor(Math.random() * curiosities.length)];
  document.getElementById("dynamicCuriosity").innerHTML = `<p>${random}</p>`;
}

document.getElementById("refreshCuriosity").addEventListener("click", showCuriosity);
showCuriosity();
