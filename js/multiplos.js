// ============================================
// SISTEMA DE EJERCICIOS INTERACTIVOS
// ============================================

// Respuestas correctas para cada ejercicio
const respuestasCorrectas = {
  1: "5, 10, 15, 20, 25, 30, 35, 40, 45, 50",
  2: "14, 21, 35, 42, 56",
  3: "24, 40, 56",
  4: "43",
  5: "27, 36, 45, 54, 63",
  6: "2",
  7: "48 chocolates",
  8: "70",
  9: "10 múltiplos",
  10: "3 × 4 = 12",
  11: "Otro múltiplo de 5",
  12: "42",
  13: "12:00 PM y 12:00 AM",
  14: "98",
  15: "Terminan en 0 o 5",
  16: "$90",
  17: "11, 22, 33, 44, 55",
  18: "18",
  19: "56 manzanas",
  20: "10 múltiplos"
};

// Contador de ejercicios resueltos
let ejerciciosResueltos = 0;
let ejerciciosCorrectos = 0;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  inicializarEjercicios();
  crearBarraProgreso();
});

// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================
function inicializarEjercicios() {
  // Seleccionar todos los botones de opciones
  const todosBotones = document.querySelectorAll('.option-btn');
  
  todosBotones.forEach(boton => {
    boton.addEventListener('click', function() {
      manejarRespuesta(this);
    });
  });
}

// ============================================
// MANEJAR RESPUESTA DEL ESTUDIANTE
// ============================================
function manejarRespuesta(botonSeleccionado) {
  // Obtener el contenedor del ejercicio
  const ejercicioCard = botonSeleccionado.closest('.custom-card');
  const todosLosBotones = ejercicioCard.querySelectorAll('.option-btn');
  
  // Obtener el número del ejercicio desde el título
  const tituloEjercicio = ejercicioCard.querySelector('.section-title').textContent;
  const numeroEjercicio = extraerNumeroEjercicio(tituloEjercicio);
  
  // Verificar si ya fue respondido
  if (botonSeleccionado.disabled) {
    return;
  }
  
  // Deshabilitar todos los botones del ejercicio
  todosLosBotones.forEach(btn => {
    btn.disabled = true;
  });
  
  // Obtener la respuesta seleccionada y la correcta
  const respuestaSeleccionada = botonSeleccionado.textContent.trim();
  const respuestaCorrecta = respuestasCorrectas[numeroEjercicio];
  
  // Verificar si es correcta
  const esCorrecta = respuestaSeleccionada === respuestaCorrecta;
  
  // Mostrar feedback
  mostrarFeedback(ejercicioCard, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta);
  
  // Actualizar estadísticas
  ejerciciosResueltos++;
  if (esCorrecta) {
    ejerciciosCorrectos++;
  }
  
  // Actualizar barra de progreso
  actualizarProgreso();
  
  // Guardar progreso en memoria (no en localStorage por restricciones)
  guardarProgresoEnMemoria(numeroEjercicio, esCorrecta);
  
  // Animación de celebración si es correcta
  if (esCorrecta) {
    animarExito(botonSeleccionado);
  }
}

// ============================================
// MOSTRAR FEEDBACK AL ESTUDIANTE
// ============================================
function mostrarFeedback(ejercicioCard, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta) {
  // Crear o encontrar el contenedor de feedback
  let feedbackContainer = ejercicioCard.querySelector('.exercise-feedback');
  
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'exercise-feedback mt-4';
    ejercicioCard.querySelector('.exercise-card').appendChild(feedbackContainer);
  }
  
  if (esCorrecta) {
    // Respuesta correcta
    botonSeleccionado.classList.add('correct');
    feedbackContainer.innerHTML = `
      <div class="alert alert-success animate-fade">
        <strong>¡Excelente! 🎉</strong> Respuesta correcta.
        <br><small>Sigue así, vas muy bien.</small>
      </div>
    `;
  } else {
    // Respuesta incorrecta
    botonSeleccionado.classList.add('incorrect');
    
    // Marcar la respuesta correcta en verde
    todosLosBotones.forEach(btn => {
      if (btn.textContent.trim() === respuestaCorrecta) {
        btn.classList.add('correct');
      }
    });
    
    feedbackContainer.innerHTML = `
      <div class="alert alert-danger animate-fade">
        <strong>Incorrecto ❌</strong>
        <br>La respuesta correcta está marcada en verde. Revísala y aprende de tu error.
      </div>
    `;
  }
}

// ============================================
// EXTRAER NÚMERO DEL EJERCICIO
// ============================================
function extraerNumeroEjercicio(titulo) {
  const match = titulo.match(/Ejercicio (\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// ============================================
// CREAR BARRA DE PROGRESO
// ============================================
function crearBarraProgreso() {
  const ejerciciosSection = document.querySelector('#ejercicios');
  
  if (!ejerciciosSection) return;
  
  const barraHTML = `
    <div class="progress-container mb-4" style="position: sticky; top: 80px; z-index: 100; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div class="d-flex justify-content-between mb-2">
        <span><strong>Tu Progreso:</strong></span>
        <span id="progreso-texto">0/20 ejercicios completados</span>
      </div>
      <div class="progress" style="height: 25px; border-radius: 15px;">
        <div id="barra-progreso" class="progress-bar progress-bar-custom" role="progressbar" 
             style="width: 0%; background: linear-gradient(90deg, #2ecc71, #4a90e2);" 
             aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          0%
        </div>
      </div>
      <div class="mt-2 text-center">
        <small id="mensaje-motivacion">¡Comienza a resolver los ejercicios! 💪</small>
      </div>
    </div>
  `;
  
  ejerciciosSection.insertAdjacentHTML('afterend', barraHTML);
}

// ============================================
// ACTUALIZAR PROGRESO
// ============================================
function actualizarProgreso() {
  const totalEjercicios = 20;
  const porcentaje = Math.round((ejerciciosResueltos / totalEjercicios) * 100);
  
  const barraProgreso = document.getElementById('barra-progreso');
  const textoProgreso = document.getElementById('progreso-texto');
  const mensajeMotivacion = document.getElementById('mensaje-motivacion');
  
  if (barraProgreso) {
    barraProgreso.style.width = porcentaje + '%';
    barraProgreso.textContent = porcentaje + '%';
    barraProgreso.setAttribute('aria-valuenow', porcentaje);
  }
  
  if (textoProgreso) {
    textoProgreso.textContent = `${ejerciciosResueltos}/20 ejercicios completados (${ejerciciosCorrectos} correctos)`;
  }
  
  if (mensajeMotivacion) {
    mensajeMotivacion.innerHTML = obtenerMensajeMotivacion(porcentaje, ejerciciosCorrectos, ejerciciosResueltos);
  }
  
  // Si completó todos los ejercicios
  if (ejerciciosResueltos === totalEjercicios) {
    mostrarResumenFinal();
  }
}

// ============================================
// MENSAJES MOTIVACIONALES
// ============================================
function obtenerMensajeMotivacion(porcentaje, correctos, resueltos) {
  const tasaExito = resueltos > 0 ? Math.round((correctos / resueltos) * 100) : 0;
  
  if (porcentaje === 0) {
    return '¡Comienza a resolver los ejercicios! 💪';
  } else if (porcentaje < 25) {
    return '¡Buen comienzo! Sigue adelante 🚀';
  } else if (porcentaje < 50) {
    return '¡Vas por buen camino! Ya llevas ' + porcentaje + '% 🌟';
  } else if (porcentaje < 75) {
    return '¡Excelente progreso! Ya casi llegas a la meta 🎯';
  } else if (porcentaje < 100) {
    return '¡Casi terminas! Solo un poco más 🏆';
  } else {
    if (tasaExito === 100) {
      return '🎉 ¡PERFECTO! Todas las respuestas correctas 🌟';
    } else if (tasaExito >= 80) {
      return '¡Excelente trabajo! ' + tasaExito + '% de aciertos 👏';
    } else if (tasaExito >= 60) {
      return '¡Buen esfuerzo! ' + tasaExito + '% de aciertos 💪';
    } else {
      return 'Completado. Tasa de aciertos: ' + tasaExito + '%. ¡Sigue practicando! 📚';
    }
  }
}

// ============================================
// ANIMACIÓN DE ÉXITO
// ============================================
function animarExito(boton) {
  // Crear partículas de celebración
  const rect = boton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 5; i++) {
    crearParticula(centerX, centerY);
  }
}

function crearParticula(x, y) {
  const particula = document.createElement('div');
  particula.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
  particula.style.position = 'fixed';
  particula.style.left = x + 'px';
  particula.style.top = y + 'px';
  particula.style.fontSize = '24px';
  particula.style.pointerEvents = 'none';
  particula.style.zIndex = '9999';
  particula.style.transition = 'all 1s ease-out';
  
  document.body.appendChild(particula);
  
  setTimeout(() => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = -100 - Math.random() * 100;
    particula.style.transform = `translate(${randomX}px, ${randomY}px)`;
    particula.style.opacity = '0';
  }, 10);
  
  setTimeout(() => {
    particula.remove();
  }, 1000);
}

// ============================================
// GUARDAR PROGRESO EN MEMORIA
// ============================================
let progresoEjercicios = {};

function guardarProgresoEnMemoria(numeroEjercicio, esCorrecta) {
  progresoEjercicios[numeroEjercicio] = {
    completado: true,
    correcto: esCorrecta,
    fecha: new Date().toISOString()
  };
}

// ============================================
// MOSTRAR RESUMEN FINAL
// ============================================
function mostrarResumenFinal() {
  const totalEjercicios = 20;
  const porcentajeExito = Math.round((ejerciciosCorrectos / totalEjercicios) * 100);
  
  // Crear modal de resumen
  const modalHTML = `
    <div class="modal fade" id="modalResumen" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 15px; border: 3px solid #2ecc71;">
          <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px 12px 0 0;">
            <h5 class="modal-title">🎓 ¡Ejercicios Completados!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center p-4">
            <div class="emoji-large">🎉</div>
            <h3>¡Felicidades!</h3>
            <p class="lead">Has completado todos los ejercicios</p>
            
            <div class="row mt-4">
              <div class="col-6">
                <div class="p-3" style="background: #e8f5e9; border-radius: 10px;">
                  <h2 style="color: #2ecc71; margin: 0;">${ejerciciosCorrectos}</h2>
                  <small>Correctas</small>
                </div>
              </div>
              <div class="col-6">
                <div class="p-3" style="background: #ffebee; border-radius: 10px;">
                  <h2 style="color: #e74c3c; margin: 0;">${totalEjercicios - ejerciciosCorrectos}</h2>
                  <small>Incorrectas</small>
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 10px;">
              <h4 style="color: white; margin: 0;">${porcentajeExito}%</h4>
              <small style="color: white;">Porcentaje de aciertos</small>
            </div>
            
            <div class="mt-4">
              ${obtenerMensajeFinal(porcentajeExito)}
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary btn-lg" data-bs-dismiss="modal">
              ¡Entendido! 👍
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Insertar modal en el documento
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('modalResumen'));
  modal.show();
  
  // Limpiar modal después de cerrarlo
  document.getElementById('modalResumen').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });
}

// ============================================
// MENSAJE FINAL SEGÚN DESEMPEÑO
// ============================================
function obtenerMensajeFinal(porcentaje) {
  if (porcentaje === 100) {
    return `
      <div class="alert alert-success">
        <strong>¡PERFECTO! 🌟</strong><br>
        ¡Has respondido correctamente todos los ejercicios! Tienes un excelente dominio del tema de múltiplos.
      </div>
    `;
  } else if (porcentaje >= 80) {
    return `
      <div class="alert alert-success">
        <strong>¡Excelente trabajo! 🎯</strong><br>
        Tu comprensión del tema es muy buena. Sigue practicando para llegar al 100%.
      </div>
    `;
  } else if (porcentaje >= 60) {
    return `
      <div class="alert alert-warning">
        <strong>¡Buen esfuerzo! 💪</strong><br>
        Tienes una comprensión básica del tema. Te recomendamos revisar los conceptos y practicar más.
      </div>
    `;
  } else {
    return `
      <div class="alert alert-info">
        <strong>Sigue practicando 📚</strong><br>
        Te recomendamos revisar la teoría y volver a intentar los ejercicios. ¡No te rindas!
      </div>
    `;
  }
}

// ============================================
// FUNCIÓN PARA REINICIAR EJERCICIOS
// ============================================
function reiniciarEjercicios() {
  ejerciciosResueltos = 0;
  ejerciciosCorrectos = 0;
  progresoEjercicios = {};
  
  // Reiniciar todos los botones
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'incorrect');
  });
  
  // Limpiar feedbacks
  document.querySelectorAll('.exercise-feedback').forEach(feedback => {
    feedback.innerHTML = '';
  });
  
  // Actualizar progreso
  actualizarProgreso();
}

// Hacer la función disponible globalmente
window.reiniciarEjercicios = reiniciarEjercicios;