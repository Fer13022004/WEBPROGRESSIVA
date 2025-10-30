// ============================================================
// SISTEMA DE EJERCICIOS INTERACTIVOS PARA CRITERIOS (ALEATORIOS)
// ============================================================

// Banco completo de ejercicios sobre Criterios de Divisibilidad (2, 3, 4, 5, 6, 9, 10)
const allExercises = [
  // Criterio del 2
  { id: 1, question: "¿Cuál de estos números es divisible por 2?", options: ["457", "894", "101", "333"], correctAnswer: "894" },
  { id: 2, question: "Un número par SIEMPRE es divisible por...", options: ["3", "5", "2", "10"], correctAnswer: "2" },
  { id: 3, question: "¿Cuál de estos números NO es divisible por 2?", options: ["1000", "508", "777", "96"], correctAnswer: "777" },

  // Criterio del 3
  { id: 4, question: "¿Cuál de estos números es divisible por 3? (Suma sus cifras)", options: ["621", "104", "701", "554"], correctAnswer: "621" },
  { id: 5, question: "Si la suma de las cifras de un número es 18, ¿es divisible por 3?", options: ["Sí", "No", "A veces", "Solo si es par"], correctAnswer: "Sí" },
  { id: 6, question: "¿Cuál de estos números NO es divisible por 3?", options: ["99", "105", "202", "306"], correctAnswer: "202" },
  { id: 7, question: "¿Es 51 divisible por 3?", options: ["Sí, porque 5+1=6", "No, porque es impar", "No, porque 5+1=6 no es 3", "Sí, porque termina en 1"], correctAnswer: "Sí, porque 5+1=6" },

  // Criterio del 4
  { id: 8, question: "¿Cuál de los siguientes números es divisible por 4?", options: ["1.234", "5.648", "7.710", "3.333"], correctAnswer: "5.648" },
  { id: 9, question: "Un número que termina en 00 es SIEMPRE divisible por...", options: ["3", "4", "6", "9"], correctAnswer: "4" },
  { id: 10, question: "¿Es 5.316 divisible por 4?", options: ["Sí, porque termina en 6", "Sí, porque 16 es divisible por 4", "No, porque 5+3+1+6=15", "No, porque es par"], correctAnswer: "Sí, porque 16 es divisible por 4" },

  // Criterio del 5
  { id: 11, question: "¿Cuál de estos números es divisible por 5?", options: ["901", "552", "108", "3.450"], correctAnswer: "3.450" },
  { id: 12, question: "Para que un número sea divisible por 5, debe terminar en...", options: ["0", "5", "0 o 5", "cualquier número par"], correctAnswer: "0 o 5" },
  { id: 13, question: "¿Cuál de estos números NO es divisible por 5?", options: ["100", "775", "550", "1001"], correctAnswer: "1001" },

  // Criterio del 6
  { id: 14, question: "Un número es divisible por 6 si...", options: ["Es par y termina en 0", "La suma de sus cifras es 6", "Es divisible por 2 y por 3", "Termina en 6"], correctAnswer: "Es divisible por 2 y por 3" },
  { id: 15, question: "¿Es 534 divisible por 6?", options: ["Sí, cumple ambas reglas", "No, porque 5+3+4=12 no es 6", "No, porque termina en 4", "Solo es divisible por 3"], correctAnswer: "Sí, cumple ambas reglas" },
  { id: 16, question: "¿Cuál de estos números NO es divisible por 6?", options: ["636", "704", "810", "912"], correctAnswer: "704" }, // 704 es par, pero 7+0+4=11

  // Criterio del 9
  { id: 17, question: "¿Cuál de los siguientes números es divisible por 9?", options: ["9.001", "1.234", "7.344", "5.553"], correctAnswer: "7.344" }, // 7+3+4+4 = 18
  { id: 18, question: "Si la suma de las cifras de un número es 27, ¿es divisible por 9?", options: ["Sí", "No", "A veces", "Solo si es impar"], correctAnswer: "Sí" },
  { id: 19, question: "¿Cuál de estos números es divisible por 3 pero NO por 9?", options: ["18", "21", "27", "36"], correctAnswer: "21" }, // 2+1=3

  // Criterio del 10
  { id: 20, question: "Para que un número sea divisible por 10, su última cifra debe ser...", options: ["Par", "Impar", "5", "0"], correctAnswer: "0" },
  { id: 21, question: "¿Cuál de estos números es divisible por 10?", options: ["105", "510", "1.001", "505"], correctAnswer: "510" },
  { id: 22, question: "Si un número es divisible por 10, ¿es también divisible por 2 y 5?", options: ["Sí, siempre", "No, nunca", "Solo por 2", "Solo por 5"], correctAnswer: "Sí, siempre" },

  // Combinados
  { id: 23, question: "El número 1.536 es divisible por...", options: ["Solo por 2 y 3", "Por 2, 3 y 4", "Solo por 2", "Por 2, 3, 4 y 6"], correctAnswer: "Por 2, 3, 4 y 6" }, // Es par(2), suma 15(3), 36(4), cumple 2y3(6)
  { id: 24, question: "¿El número 4.350 es divisible por 2, 3, 5, 6 y 10?", options: ["Solo por 2, 5 y 10", "Sí, por todos ellos", "Solo por 3 y 5", "No, solo por 2, 3 y 5"], correctAnswer: "Sí, por todos ellos" }, // Termina en 0(2,5,10), suma 12(3), cumple 2y3(6)
  { id: 25, question: "Si un número termina en 36, ¿por quiénes es siempre divisible?", options: ["Solo por 2", "Solo por 3", "Por 2 y 4", "Solo por 6"], correctAnswer: "Por 2 y 4" }, // Par(2), 36(4). Suma cifras no siempre es mult 3.
  { id: 26, question: "El número 8.130 es divisible por...", options: ["Solo por 2, 5 y 10", "Por 2, 3, 5, 6 y 10", "Solo por 3 y 6", "Por ninguno"], correctAnswer: "Por 2, 3, 5, 6 y 10" }, // Termina 0(2,5,10), suma 12(3), cumple 2y3(6)
  { id: 27, question: "¿Cuál de los siguientes números es divisible por 2, 3, 4, 5 y 6?", options: ["75", "100", "120", "150"], correctAnswer: "120" }, // 120: par(2), suma 3(3), 20(4), acaba 0(5), cumple 2y3(6)
  { id: 28, question: "Si la suma de las cifras de un número es 27, ¿por quién es divisible siempre?", options: ["Solo por 3", "Solo por 9", "Por 3 y por 9", "Por 6"], correctAnswer: "Por 3 y por 9" },
  { id: 29, question: "Tienes 135 galletas. ¿Puedes repartirlas exactamente en bolsas de 3 y/o 5 galletas?", options: ["Solo en bolsas de 3", "Solo en bolsas de 5", "Sí, en bolsas de 3 y también en bolsas de 5", "No, en ninguna de las dos"], correctAnswer: "Sí, en bolsas de 3 y también en bolsas de 5" }, // Suma 9(3), Termina 5(5)
  { id: 30, question: "¿Cuál de estos números es divisible por 4 y por 9?", options: ["108", "126", "504", "612"], correctAnswer: "504" }, // 04(4), suma 9(9)
];

const NUM_EXERCISES_TO_DISPLAY = 15; // Número de ejercicios a mostrar
let TOTAL_EJERCICIOS = NUM_EXERCISES_TO_DISPLAY; // Actualizamos el total

let respuestasCorrectas = {}; // Se llenará dinámicamente
let ejerciciosResueltos = 0;
let ejerciciosCorrectos = 0;

// Función para barajar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  generarEjerciciosAleatorios();
  crearBarraProgreso();
});

// ============================================
// GENERAR EJERCICIOS ALEATORIOS
// ============================================
function generarEjerciciosAleatorios() {
  const container = document.getElementById('exercise-container');
  if (!container) return;

  shuffleArray(allExercises);
  const displayedExercises = allExercises.slice(0, NUM_EXERCISES_TO_DISPLAY);

  container.innerHTML = '';
  respuestasCorrectas = {};

  displayedExercises.forEach((exercise, index) => {
    const exerciseNumber = index + 1;
    shuffleArray(exercise.options);

    let optionsHTML = '';
    exercise.options.forEach(optionText => {
      // Importante: No añadir la clase 'correct' aquí
      optionsHTML += `<button class="option-btn">${optionText}</button>`;
    });

    const exerciseHTML = `
      <div class="custom-card exercise-item mb-4" data-exercise-id="${exercise.id}">
        <div class="exercise-question"><strong>${exerciseNumber}. ${exercise.question}</strong></div>
        <div class="options">${optionsHTML}</div>
      </div>
    `;
    container.innerHTML += exerciseHTML;
    respuestasCorrectas[exerciseNumber] = exercise.correctAnswer;
  });

  inicializarEjercicios();
}

// ============================================
// INICIALIZACIÓN DE LISTENERS
// ============================================
function inicializarEjercicios() {
  const todosBotones = document.querySelectorAll('#exercise-container .option-btn');
  todosBotones.forEach(boton => {
    boton.removeEventListener('click', handleButtonClick);
    boton.addEventListener('click', handleButtonClick);
  });
}

function handleButtonClick() {
    manejarRespuesta(this);
}

// ============================================
// MANEJAR RESPUESTA
// ============================================
function manejarRespuesta(botonSeleccionado) {
  const ejercicioItem = botonSeleccionado.closest('.exercise-item');
  if (!ejercicioItem || botonSeleccionado.disabled) return; // Evita errores si no encuentra el item

  const todosLosBotones = ejercicioItem.querySelectorAll('.option-btn');
  const preguntaElement = ejercicioItem.querySelector('.exercise-question');
  const numeroMatch = preguntaElement.textContent.match(/^(\d+)\./);
  if (!numeroMatch) return; // Salir si no se puede extraer el número
  
  const numeroEjercicioMostrado = parseInt(numeroMatch[1]);

  todosLosBotones.forEach(btn => btn.disabled = true);

  const respuestaSeleccionada = botonSeleccionado.textContent.trim();
  const respuestaCorrecta = respuestasCorrectas[numeroEjercicioMostrado];
  const esCorrecta = respuestaSeleccionada === respuestaCorrecta;

  mostrarFeedback(ejercicioItem, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta);

  if (!ejercicioItem.classList.contains('resuelto')) {
      ejercicioItem.classList.add('resuelto');
      ejerciciosResueltos++;
      if (esCorrecta) ejerciciosCorrectos++;
      actualizarProgreso();
  }

  if (esCorrecta) animarExito(botonSeleccionado);
}

// ============================================
// MOSTRAR FEEDBACK
// ============================================
function mostrarFeedback(ejercicioItem, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta) {
  let feedbackContainer = ejercicioItem.querySelector('.exercise-feedback');
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'exercise-feedback mt-4';
    ejercicioItem.querySelector('.options').insertAdjacentElement('afterend', feedbackContainer);
  }

  if (esCorrecta) {
    botonSeleccionado.classList.add('correct');
    feedbackContainer.innerHTML = `<div class="alert alert-success animate-fade"><strong>¡Correcto! 🎉</strong> Excelente trabajo.</div>`;
  } else {
    botonSeleccionado.classList.add('incorrect');
    todosLosBotones.forEach(btn => {
      if (btn.textContent.trim() === respuestaCorrecta) {
        btn.classList.add('correct');
      }
    });
    feedbackContainer.innerHTML = `<div class="alert alert-danger animate-fade"><strong>Incorrecto ❌</strong> La respuesta correcta es la verde.</div>`;
  }
}

// ============================================
// BARRA DE PROGRESO
// ============================================
function crearBarraProgreso() {
  const ejerciciosSection = document.querySelector('#ejercicios .custom-card');
  if (!ejerciciosSection || document.getElementById('progress-widget')) return;

  const barraHTML = `
    <div id="progress-widget" class="progress-container mb-4 mt-4" style="background: #f8f9fa; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div class="d-flex justify-content-between mb-2">
        <span><strong>Tu Progreso:</strong></span>
        <span id="progreso-texto">0/${TOTAL_EJERCICIOS} ejercicios completados</span>
      </div>
      <div class="progress" style="height: 25px; border-radius: 15px;">
        <div id="barra-progreso" class="progress-bar progress-bar-custom" role="progressbar" style="width: 0%; background: linear-gradient(90deg, #2ecc71, #4a90e2);" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
      </div>
      <div class="mt-2 text-center">
        <small id="mensaje-motivacion">¡Comienza a resolver los ejercicios! 💪</small>
      </div>
    </div>
  `;
  const leadParagraph = ejerciciosSection.querySelector('p.lead');
  if (leadParagraph) {
      leadParagraph.insertAdjacentHTML('afterend', barraHTML);
  } else {
       ejerciciosSection.insertAdjacentHTML('beforeend', barraHTML);
  }
}

function actualizarProgreso() {
  const porcentaje = Math.round((ejerciciosResueltos / TOTAL_EJERCICIOS) * 100);
  const barraProgreso = document.getElementById('barra-progreso');
  const textoProgreso = document.getElementById('progreso-texto');
  const mensajeMotivacion = document.getElementById('mensaje-motivacion');

  if (barraProgreso) {
    barraProgreso.style.width = porcentaje + '%';
    barraProgreso.textContent = porcentaje + '%';
    barraProgreso.setAttribute('aria-valuenow', porcentaje);
  }
  if (textoProgreso) {
    textoProgreso.textContent = `${ejerciciosResueltos}/${TOTAL_EJERCICIOS} ejercicios completados (${ejerciciosCorrectos} correctos)`;
  }
  if (mensajeMotivacion) {
    mensajeMotivacion.innerHTML = obtenerMensajeMotivacion(porcentaje, ejerciciosCorrectos, ejerciciosResueltos);
  }

  if (ejerciciosResueltos === TOTAL_EJERCICIOS) {
    mostrarResumenFinal();
  }
}

// ============================================
// MENSAJES MOTIVACIONALES
// ============================================
function obtenerMensajeMotivacion(porcentaje, correctos, resueltos) {
    const tasaExito = resueltos > 0 ? Math.round((correctos / resueltos) * 100) : 0;
    if (porcentaje === 0) return '¡Comienza a resolver los ejercicios! 💪';
    if (porcentaje < 25) return '¡Buen comienzo! Sigue adelante 🚀';
    if (porcentaje < 50) return `¡Vas por buen camino! Llevas el ${porcentaje}% 🌟`;
    if (porcentaje < 75) return '¡Excelente progreso! Ya casi llegas a la meta 🎯';
    if (porcentaje < 100) return '¡Casi terminas! Solo un poco más 🏆';
    // Mensajes al completar
    if (tasaExito === 100) return `🎉 ¡PERFECTO! Todas las ${TOTAL_EJERCICIOS} respuestas correctas 🌟`;
    if (tasaExito >= 80) return `¡Excelente trabajo! ${tasaExito}% de aciertos (${correctos}/${TOTAL_EJERCICIOS}) 👏`;
    if (tasaExito >= 60) return `¡Buen esfuerzo! ${tasaExito}% de aciertos (${correctos}/${TOTAL_EJERCICIOS}) 💪`;
    return `Completado. Aciertos: ${tasaExito}% (${correctos}/${TOTAL_EJERCICIOS}). ¡Sigue practicando! 📚`;
}

// ============================================
// ANIMACIÓN Y RESUMEN FINAL
// ============================================
function animarExito(boton) {
    const rect = boton.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        crearParticula(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
}

function crearParticula(x, y) {
    const particula = document.createElement('div');
    particula.textContent = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
    particula.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; font-size: 24px; pointer-events: none; z-index: 9999; transition: all 1s ease-out;`;
    document.body.appendChild(particula);
    setTimeout(() => {
        particula.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${-100 - Math.random() * 100}px)`;
        particula.style.opacity = '0';
    }, 10);
    setTimeout(() => particula.remove(), 1000);
}

function mostrarResumenFinal() {
    const porcentajeExito = Math.round((ejerciciosCorrectos / TOTAL_EJERCICIOS) * 100);
    const existingModal = document.getElementById('modalResumen');
    if (existingModal) existingModal.remove();

    const modalHTML = `
      <div class="modal fade" id="modalResumen" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="border-radius: 15px; border: 3px solid #2ecc71;">
            <div class="modal-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0;">
              <h5 class="modal-title">🎓 ¡Ejercicios Completados!</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center p-4">
              <div class="emoji-large">🎉</div><h3>¡Felicidades!</h3>
              <p class="lead">Has completado los ${TOTAL_EJERCICIOS} ejercicios de Criterios de Divisibilidad</p>
              <div class="row mt-4">
                <div class="col-6"><div class="p-3 bg-light border rounded"><h2 class="text-success m-0">${ejerciciosCorrectos}</h2><small>Correctas</small></div></div>
                <div class="col-6"><div class="p-3 bg-light border rounded"><h2 class="text-danger m-0">${TOTAL_EJERCICIOS - ejerciciosCorrectos}</h2><small>Incorrectas</small></div></div>
              </div>
              <div class="mt-4 p-3 text-white rounded" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                <h4 class="m-0">${porcentajeExito}%</h4><small>Porcentaje de aciertos</small>
              </div>
              <div class="mt-4">${obtenerMensajeFinal(porcentajeExito)}</div>
            </div>
            <div class="modal-footer justify-content-center border-top-0 pt-0">
              <button type="button" class="btn btn-secondary" onclick="reiniciarEjercicios()">Volver a intentar</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar 👍</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalElement = document.getElementById('modalResumen');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    modalElement.addEventListener('hidden.bs.modal', function () { /* No remover si queremos reintentar */ });
}

function obtenerMensajeFinal(porcentaje) {
    if (porcentaje === 100) return `<div class="alert alert-success"><strong>¡PERFECTO! 🌟</strong><br>¡Dominas los criterios! Excelente.</div>`;
    if (porcentaje >= 80) return `<div class="alert alert-success"><strong>¡Excelente trabajo! 🎯</strong><br>Muy buena comprensión.</div>`;
    if (porcentaje >= 60) return `<div class="alert alert-warning"><strong>¡Buen esfuerzo! 💪</strong><br>Buena base. ¡Sigue practicando!</div>`;
    return `<div class="alert alert-info"><strong>Sigue practicando 📚</strong><br>Revisa los conceptos e inténtalo de nuevo. ¡Tú puedes!</div>`;
}

// ============================================
// REINICIAR EJERCICIOS
// ============================================
function reiniciarEjercicios() {
    const modalElement = document.getElementById('modalResumen');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
    }
    ejerciciosResueltos = 0;
    ejerciciosCorrectos = 0;
    const progressWidget = document.getElementById('progress-widget');
    if(progressWidget) progressWidget.remove();
    generarEjerciciosAleatorios();
    crearBarraProgreso();
    actualizarProgreso();
}
window.reiniciarEjercicios = reiniciarEjercicios;


