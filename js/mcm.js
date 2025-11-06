// ============================================
// SISTEMA DE EJERCICIOS INTERACTIVOS PARA MCM (ALEATORIOS)
// ============================================

// Banco completo de ejercicios
const allExercises = [
  // Ejercicios Básicos (Calcular MCM)
  { id: 1, question: "¿Cuál es el Mínimo Común Múltiplo (MCM) de 3 y 5?", options: ["5", "10", "15", "30"], correctAnswer: "15" },
  { id: 2, question: "¿Cuál es el MCM de 6 y 8?", options: ["12", "24", "36", "48"], correctAnswer: "24" },
  { id: 3, question: "¿Cuál es el MCM de 10 y 15?", options: ["15", "20", "30", "60"], correctAnswer: "30" },
  { id: 4, question: "¿Cuál es el MCM de 7 y 14?", options: ["7", "14", "21", "28"], correctAnswer: "14" },
  { id: 5, question: "¿Cuál es el MCM de 9 y 12?", options: ["18", "27", "36", "72"], correctAnswer: "36" },
  { id: 6, question: "¿Cuál es el MCM de 5 y 8?", options: ["20", "30", "40", "80"], correctAnswer: "40" },
  { id: 7, question: "¿Cuál es el MCM de 15 y 25?", options: ["25", "50", "75", "150"], correctAnswer: "75" },
  { id: 8, question: "¿Cuál es el MCM de 20 y 50?", options: ["50", "100", "200", "1000"], correctAnswer: "100" },
  { id: 9, question: "¿Cuál es el MCM de 8 y 14?", options: ["28", "56", "84", "112"], correctAnswer: "56" },
  { id: 10, question: "¿Cuál es el MCM de 30 y 45?", options: ["45", "60", "90", "135"], correctAnswer: "90" },
  { id: 11, question: "¿Cuál es el MCM de 4 y 10?", options: ["10", "20", "40", "8"], correctAnswer: "20" },
  { id: 12, question: "¿Cuál es el MCM de 6 y 9?", options: ["9", "12", "18", "36"], correctAnswer: "18" },
  { id: 13, question: "¿Cuál es el MCM de 12 y 16?", options: ["16", "24", "32", "48"], correctAnswer: "48" },

  // Ejercicios con 3 números
  { id: 14, question: "¿Cuál es el MCM de 2, 3 y 4?", options: ["6", "8", "12", "24"], correctAnswer: "12" },
  { id: 15, question: "¿Cuál es el MCM de 4, 5 y 6?", options: ["20", "30", "60", "120"], correctAnswer: "60" },
  { id: 16, question: "¿Cuál es el MCM de 3, 6 y 9?", options: ["9", "18", "27", "36"], correctAnswer: "18" },
  { id: 17, question: "¿Cuál es el MCM de 2, 5 y 10?", options: ["10", "20", "30", "50"], correctAnswer: "10" },

  // Problemas de aplicación
  { id: 18, question: "Un faro se enciende cada 12 segundos y otro cada 18 segundos. ¿Después de cuántos segundos coincidirán?", options: ["18 segundos", "24 segundos", "36 segundos", "72 segundos"], correctAnswer: "36 segundos" },
  { id: 19, question: "María come una manzana cada 2 días y un plátano cada 3 días. Si hoy comió ambas frutas, ¿en cuántos días volverá a comer ambas el mismo día?", options: ["4 días", "5 días", "6 días", "12 días"], correctAnswer: "6 días" },
  { id: 20, question: "Un autobús de la ruta A pasa cada 20 minutos y uno de la ruta B cada 30 minutos. Si ambos pasan a las 2:00 PM, ¿a qué hora volverán a coincidir?", options: ["2:30 PM", "2:40 PM", "3:00 PM", "3:20 PM"], correctAnswer: "3:00 PM" },
  { id: 21, question: "Quieres comprar la misma cantidad de lápices (paquetes de 12) y gomas (paquetes de 9). ¿Cuál es la menor cantidad de cada uno que puedes comprar?", options: ["24", "36", "72", "108"], correctAnswer: "36" },
  { id: 22, question: "Tres amigos corren en una pista circular. El primero tarda 10 min, el segundo 12 min y el tercero 15 min en dar una vuelta. Si salen juntos, ¿después de cuántos minutos se encontrarán en la salida?", options: ["30 minutos", "60 minutos", "90 minutos", "120 minutos"], correctAnswer: "60 minutos" },
  { id: 23, question: "Ana riega sus rosales cada 6 días y sus geranios cada 4 días. Si hoy regó ambos, ¿en cuántos días volverá a regar ambos el mismo día?", options: ["8", "10", "12", "24"], correctAnswer: "12" },
  { id: 24, question: "En una parada coinciden dos líneas de autobús, una pasa cada 15 minutos y la otra cada 20 minutos. Si coincidieron a las 10:00 AM, ¿a qué hora volverán a coincidir?", options: ["10:30 AM", "10:45 AM", "11:00 AM", "11:20 AM"], correctAnswer: "11:00 AM" },

  // Propiedades y conceptos (basados en ejercicios anteriores)
  { id: 25, question: "Si los factores primos de dos números son 2² x 3 (12) y 2 x 5 (10), ¿cuál es su MCM?", options: ["30", "60", "12", "10"], correctAnswer: "60" },
  { id: 26, question: "Si un número es múltiplo de otro (ej: 5 y 10), ¿cuál es su MCM?", options: ["El número más pequeño", "El número más grande", "La suma de ambos", "La multiplicación de ambos"], correctAnswer: "El número más grande" },
  { id: 27, question: "Usando a x b = MCM(a,b) x MCD(a,b), si MCD(10, 12) es 2, ¿cuál es el MCM(10, 12)?", options: ["24", "30", "60", "120"], correctAnswer: "60" },
  { id: 28, question: "¿Cuál es el MCM de dos números primos diferentes, como 5 y 7?", options: ["1", "Su suma (12)", "Su producto (35)", "El mayor (7)"], correctAnswer: "Su producto (35)" },
  { id: 29, question: "El MCM de 1 y cualquier número (ej: 1 y 8) es...", options: ["1", "0", "El otro número (8)", "No se puede calcular"], correctAnswer: "El otro número (8)" },
  { id: 30, question: "¿El MCM de dos números puede ser igual a uno de ellos?", options: ["Sí, siempre", "Sí, si uno es múltiplo del otro", "No, nunca", "Solo si son iguales"], correctAnswer: "Sí, si uno es múltiplo del otro" },
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

  // Barajar todos los ejercicios
  shuffleArray(allExercises);

  // Seleccionar los primeros NUM_EXERCISES_TO_DISPLAY
  const displayedExercises = allExercises.slice(0, NUM_EXERCISES_TO_DISPLAY);

  // Limpiar contenedor y respuestas correctas anteriores
  container.innerHTML = '';
  respuestasCorrectas = {};

  // Generar HTML para cada ejercicio seleccionado
  displayedExercises.forEach((exercise, index) => {
    const exerciseNumber = index + 1; // Número secuencial para mostrar (1, 2, 3...)

    // Barajar las opciones de este ejercicio
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
        <!-- El feedback se añadirá aquí -->
      </div>
    `;
    container.innerHTML += exerciseHTML;

    // Guardar la respuesta correcta para este número de ejercicio mostrado
    respuestasCorrectas[exerciseNumber] = exercise.correctAnswer;
  });

  // Añadir listeners a los nuevos botones
  inicializarEjercicios();
}


// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN (Listeners)
// ============================================
function inicializarEjercicios() {
  const todosBotones = document.querySelectorAll('#exercise-container .option-btn');

  todosBotones.forEach(boton => {
    // Asegurarse de no añadir listeners múltiples si se llama de nuevo
    boton.removeEventListener('click', handleButtonClick); // Quitar listener previo si existe
    boton.addEventListener('click', handleButtonClick);    // Añadir nuevo listener
  });
}

// Función separada para manejar el click (evita duplicados)
function handleButtonClick() {
    manejarRespuesta(this);
}

// ============================================
// MANEJAR RESPUESTA DEL ESTUDIANTE
// ============================================
function manejarRespuesta(botonSeleccionado) {
  const ejercicioItem = botonSeleccionado.closest('.exercise-item');
  const todosLosBotones = ejercicioItem.querySelectorAll('.option-btn');
  const preguntaElement = ejercicioItem.querySelector('.exercise-question');
  // Extraer el número del ejercicio mostrado (el que empieza por '1.', '2.', etc.)
  const numeroEjercicioMostrado = parseInt(preguntaElement.textContent.match(/^(\d+)\./)[1]);

  // Evitar responder si ya está deshabilitado
  if (botonSeleccionado.disabled) return;

  // Deshabilitar botones de este ejercicio
  todosLosBotones.forEach(btn => btn.disabled = true);

  const respuestaSeleccionada = botonSeleccionado.textContent.trim();
  // Usar el número mostrado para buscar la respuesta correcta
  const respuestaCorrecta = respuestasCorrectas[numeroEjercicioMostrado];
  const esCorrecta = respuestaSeleccionada === respuestaCorrecta;

  mostrarFeedback(ejercicioItem, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta);

  // Solo contar como resuelto si no lo estaba ya (aunque los botones se deshabilitan)
  if (!ejercicioItem.classList.contains('resuelto')) {
      ejercicioItem.classList.add('resuelto'); // Marcar como resuelto
      ejerciciosResueltos++;
      if (esCorrecta) ejerciciosCorrectos++;
      actualizarProgreso();
  }

  if (esCorrecta) animarExito(botonSeleccionado);
}

// ============================================
// MOSTRAR FEEDBACK (Sin cambios)
// ============================================
function mostrarFeedback(ejercicioItem, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta) {
  let feedbackContainer = ejercicioItem.querySelector('.exercise-feedback');
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'exercise-feedback mt-4';
    // Insertar después de .options
    ejercicioItem.querySelector('.options').insertAdjacentElement('afterend', feedbackContainer);
  }

  if (esCorrecta) {
    botonSeleccionado.classList.add('correct');
    feedbackContainer.innerHTML = `<div class="alert alert-success animate-fade"><strong>¡Excelente! 🎉</strong> Respuesta correcta.</div>`;
  } else {
    botonSeleccionado.classList.add('incorrect');
    todosLosBotones.forEach(btn => {
      if (btn.textContent.trim() === respuestaCorrecta) {
        btn.classList.add('correct'); // Resalta la correcta en verde
      }
    });
    feedbackContainer.innerHTML = `<div class="alert alert-danger animate-fade"><strong>Incorrecto ❌</strong> La respuesta correcta está marcada en verde.</div>`;
  }
}

// ============================================
// BARRA DE PROGRESO (Ajustada para TOTAL_EJERCICIOS dinámico)
// ============================================
function crearBarraProgreso() {
  const ejerciciosSection = document.querySelector('#ejercicios .custom-card'); // Insertar dentro de la tarjeta de título
  if (!ejerciciosSection) return;

  // Evitar crearla si ya existe
  if (document.getElementById('progress-widget')) return;

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
  // Insertar después del párrafo introductorio de la sección de ejercicios
  const leadParagraph = ejerciciosSection.querySelector('p.lead');
  if (leadParagraph) {
      leadParagraph.insertAdjacentHTML('afterend', barraHTML);
  } else {
       ejerciciosSection.insertAdjacentHTML('beforeend', barraHTML); // Fallback
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

  // Si completó todos los ejercicios mostrados
  if (ejerciciosResueltos === TOTAL_EJERCICIOS) {
    mostrarResumenFinal();
  }
}

// ============================================
// MENSAJES MOTIVACIONALES (Ajustado para TOTAL_EJERCICIOS dinámico)
// ============================================
function obtenerMensajeMotivacion(porcentaje, correctos, resueltos) {
  const tasaExito = resueltos > 0 ? Math.round((correctos / resueltos) * 100) : 0;

  if (porcentaje === 0) {
    return '¡Comienza a resolver los ejercicios! 💪';
  } else if (porcentaje < 25) {
    return '¡Buen comienzo! Sigue adelante 🚀';
  } else if (porcentaje < 50) {
    return `¡Vas por buen camino! Llevas el ${porcentaje}% 🌟`;
  } else if (porcentaje < 75) {
    return '¡Excelente progreso! Ya casi llegas a la meta 🎯';
  } else if (porcentaje < 100) {
    return '¡Casi terminas! Solo un poco más 🏆';
  } else {
    // Mensajes cuando se completa el 100%
    if (tasaExito === 100) {
      return `🎉 ¡PERFECTO! Todas las ${TOTAL_EJERCICIOS} respuestas correctas 🌟`;
    } else if (tasaExito >= 80) {
      return `¡Excelente trabajo! ${tasaExito}% de aciertos (${correctos}/${TOTAL_EJERCICIOS}) 👏`;
    } else if (tasaExito >= 60) {
      return `¡Buen esfuerzo! ${tasaExito}% de aciertos (${correctos}/${TOTAL_EJERCICIOS}) 💪`;
    } else {
      return `Completado. Tasa de aciertos: ${tasaExito}% (${correctos}/${TOTAL_EJERCICIOS}). ¡Sigue practicando! 📚`;
    }
  }
}


// ============================================
// ANIMACIÓN Y RESUMEN FINAL (Ajustado para TOTAL_EJERCICIOS dinámico)
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
  particula.style.position = 'fixed';
  particula.style.left = x + 'px';
  particula.style.top = y + 'px';
  particula.style.fontSize = '24px';
  particula.style.pointerEvents = 'none';
  particula.style.zIndex = '9999';
  particula.style.transition = 'all 1s ease-out';
  document.body.appendChild(particula);

  setTimeout(() => {
    particula.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${-100 - Math.random() * 100}px)`;
    particula.style.opacity = '0';
  }, 10);

  setTimeout(() => particula.remove(), 1000);
}

function mostrarResumenFinal() {
  const porcentajeExito = Math.round((ejerciciosCorrectos / TOTAL_EJERCICIOS) * 100);

  // Eliminar modal anterior si existe
  const existingModal = document.getElementById('modalResumen');
  if (existingModal) {
      existingModal.remove();
  }

  const modalHTML = `
    <div class="modal fade" id="modalResumen" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 15px; border: 3px solid #2ecc71;">
          <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px 12px 0 0;">
            <h5 class="modal-title">🎓 ¡Ejercicios Completados!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center p-4">
            <div class="emoji-large">🎉</div><h3>¡Felicidades!</h3>
            <p class="lead">Has completado los ${TOTAL_EJERCICIOS} ejercicios de MCM</p>
            <div class="row mt-4">
              <div class="col-6"><div class="p-3" style="background: #e8f5e9; border-radius: 10px;"><h2 style="color: #2ecc71; margin: 0;">${ejerciciosCorrectos}</h2><small>Correctas</small></div></div>
              <div class="col-6"><div class="p-3" style="background: #ffebee; border-radius: 10px;"><h2 style="color: #e74c3c; margin: 0;">${TOTAL_EJERCICIOS - ejerciciosCorrectos}</h2><small>Incorrectas</small></div></div>
            </div>
            <div class="mt-4 p-3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 10px;">
              <h4 style="color: white; margin: 0;">${porcentajeExito}%</h4><small style="color: white;">Porcentaje de aciertos</small>
            </div>
            <div class="mt-4">
               ${obtenerMensajeFinal(porcentajeExito)}
            </div>
          </div>
          <div class="modal-footer justify-content-center">
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
  // Limpiar modal después de cerrarlo para evitar duplicados si se vuelve a abrir
  modalElement.addEventListener('hidden.bs.modal', function () {
      // No quitar el elemento si queremos poder reintentar
      // this.remove();
  });
}

// ============================================
// MENSAJE FINAL SEGÚN DESEMPEÑO (Ajustado)
// ============================================
function obtenerMensajeFinal(porcentaje) {
  if (porcentaje === 100) {
    return `<div class="alert alert-success"><strong>¡PERFECTO! 🌟</strong><br>¡Has dominado el MCM! Excelente trabajo.</div>`;
  } else if (porcentaje >= 80) {
    return `<div class="alert alert-success"><strong>¡Excelente trabajo! 🎯</strong><br>Tu comprensión del MCM es muy buena.</div>`;
  } else if (porcentaje >= 60) {
    return `<div class="alert alert-warning"><strong>¡Buen esfuerzo! 💪</strong><br>Tienes una buena base. ¡Sigue practicando para mejorar!</div>`;
  } else {
    return `<div class="alert alert-info"><strong>Sigue practicando 📚</strong><br>Revisa los conceptos y vuelve a intentarlo. ¡Puedes lograrlo!</div>`;
  }
}

// ============================================
// FUNCIÓN PARA REINICIAR EJERCICIOS (NUEVA)
// ============================================
function reiniciarEjercicios() {
    // Cerrar el modal si está abierto
    const modalElement = document.getElementById('modalResumen');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }

  // Reiniciar contadores
  ejerciciosResueltos = 0;
  ejerciciosCorrectos = 0;

  // Eliminar barra de progreso existente para recrearla
   const progressWidget = document.getElementById('progress-widget');
   if(progressWidget) progressWidget.remove();

  // Volver a generar ejercicios aleatorios
  generarEjerciciosAleatorios(); // Esto también reinicia listeners y respuestasCorrectas

  // Recrear y actualizar barra de progreso
  crearBarraProgreso();
  actualizarProgreso(); // Para ponerla a 0% visualmente
}

// Hacer la función de reinicio disponible globalmente
window.reiniciarEjercicios = reiniciarEjercicios;

