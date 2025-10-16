// ============================================
// SISTEMA DE EJERCICIOS INTERACTIVOS (CRITERIOS - VERSIÓN EXTENDIDA)
// ============================================

// Respuestas correctas para la nueva lista de ejercicios
const respuestasCorrectas = {
  1: "894",
  2: "621",
  3: "3.450",
  4: "Por 2, 3 y 4",
  5: "7.344",
  6: "0",
  7: "Sí, por todos ellos",
  8: "Por 2 y 4",
  9: "202",
  10: "Es divisible por 2 y por 3",
  11: "5.648",
  12: "Por 2, 3, 5, 6 y 10",
  13: "120",
  14: "Por 3 y por 9",
  15: "704",
  16: "Sí, en bolsas de 3 y también en bolsas de 5"
};

// Total de ejercicios actualizado
const totalEjercicios = 16;

// Contadores
let ejerciciosResueltos = 0;
let ejerciciosCorrectos = 0;

// El resto del código JS de la versión anterior es reutilizable y no necesita cambios.
// Se ha copiado aquí para asegurar la funcionalidad completa.

document.addEventListener('DOMContentLoaded', function() {
  inicializarEjercicios();
  crearBarraProgreso();
});

function inicializarEjercicios() {
  const todosLosEjercicios = document.querySelectorAll('.exercise-item');
  
  todosLosEjercicios.forEach((ejercicio, index) => {
    const numeroEjercicio = index + 1;
    ejercicio.dataset.exerciseId = numeroEjercicio;

    const todosBotones = ejercicio.querySelectorAll('.option-btn');
    todosBotones.forEach(boton => {
      boton.addEventListener('click', function() {
        manejarRespuesta(this);
      });
    });
  });
}

function manejarRespuesta(botonSeleccionado) {
  const ejercicioCard = botonSeleccionado.closest('.exercise-item');
  const todosLosBotones = ejercicioCard.querySelectorAll('.option-btn');
  const numeroEjercicio = parseInt(ejercicioCard.dataset.exerciseId);
  
  if (botonSeleccionado.disabled) return;
  
  todosLosBotones.forEach(btn => btn.disabled = true);
  
  const respuestaSeleccionada = botonSeleccionado.textContent.trim();
  const respuestaCorrecta = respuestasCorrectas[numeroEjercicio];
  const esCorrecta = respuestaSeleccionada === respuestaCorrecta;
  
  mostrarFeedback(ejercicioCard, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta);
  
  ejerciciosResueltos++;
  if (esCorrecta) {
    ejerciciosCorrectos++;
    animarExito(botonSeleccionado);
  }
  
  actualizarProgreso();
}

function mostrarFeedback(ejercicioCard, botonSeleccionado, todosLosBotones, esCorrecta, respuestaCorrecta) {
  let feedbackContainer = ejercicioCard.querySelector('.exercise-feedback');
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'exercise-feedback mt-3';
    ejercicioCard.appendChild(feedbackContainer);
  }
  
  if (esCorrecta) {
    botonSeleccionado.classList.add('correct');
    feedbackContainer.innerHTML = `<div class="alert alert-success animate-fade"><strong>¡Correcto! 🎉</strong> ¡Excelente trabajo!</div>`;
  } else {
    botonSeleccionado.classList.add('incorrect');
    todosLosBotones.forEach(btn => {
      if (btn.textContent.trim() === respuestaCorrecta) {
        btn.classList.add('correct');
      }
    });
    feedbackContainer.innerHTML = `<div class="alert alert-danger animate-fade"><strong>Incorrecto.</strong> La respuesta correcta está en verde.</div>`;
  }
}

function crearBarraProgreso() {
  const ejerciciosSection = document.querySelector('#ejercicios');
  if (!ejerciciosSection) return;
  
  const barraHTML = `
    <div class="progress-container mb-4" style="position: sticky; top: 80px; z-index: 100; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div class="d-flex justify-content-between mb-2">
        <span><strong>Tu Progreso:</strong></span>
        <span id="progreso-texto">0/${totalEjercicios} ejercicios completados</span>
      </div>
      <div class="progress" style="height: 25px; border-radius: 15px;">
        <div id="barra-progreso" class="progress-bar progress-bar-custom" role="progressbar" 
             style="width: 0%; background: linear-gradient(90deg, #2ecc71, #4a90e2);" 
             aria-valuenow="0" aria-valuemin="0" aria-valuemax="${totalEjercicios}">
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

function actualizarProgreso() {
  const porcentaje = Math.round((ejerciciosResueltos / totalEjercicios) * 100);
  
  const barraProgreso = document.getElementById('barra-progreso');
  const textoProgreso = document.getElementById('progreso-texto');
  const mensajeMotivacion = document.getElementById('mensaje-motivacion');
  
  if (barraProgreso) {
    barraProgreso.style.width = porcentaje + '%';
    barraProgreso.textContent = porcentaje + '%';
    barraProgreso.setAttribute('aria-valuenow', ejerciciosResueltos);
  }
  
  if (textoProgreso) {
    textoProgreso.textContent = `${ejerciciosResueltos}/${totalEjercicios} ejercicios completados (${ejerciciosCorrectos} correctos)`;
  }

  if (mensajeMotivacion) {
    mensajeMotivacion.innerHTML = obtenerMensajeMotivacion(porcentaje, ejerciciosCorrectos, ejerciciosResueltos);
  }
  
  if (ejerciciosResueltos === totalEjercicios) {
    mostrarResumenFinal();
  }
}

function obtenerMensajeMotivacion(porcentaje, correctos, resueltos) {
  if (porcentaje === 0) return '¡Comienza a resolver los ejercicios! 💪';
  if (porcentaje < 50) return '¡Buen comienzo! Sigue adelante 🚀';
  if (porcentaje < 100) return '¡Excelente progreso! Ya casi llegas a la meta 🎯';
  
  const tasaExito = resueltos > 0 ? Math.round((correctos / resueltos) * 100) : 0;
  if (tasaExito === 100) return '🎉 ¡PERFECTO! Todas las respuestas correctas 🌟';
  if (tasaExito >= 80) return '¡Excelente trabajo! ' + tasaExito + '% de aciertos 👏';
  return 'Completado. Tasa de aciertos: ' + tasaExito + '%. ¡Sigue practicando! 📚';
}

function mostrarResumenFinal() {
  const porcentajeExito = Math.round((ejerciciosCorrectos / totalEjercicios) * 100);
  
  const modalHTML = `
    <div class="modal fade" id="modalResumen" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 15px; border: 3px solid #2ecc71;">
          <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px 12px 0 0;">
            <h5 class="modal-title">🎓 ¡Lección Completada!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center p-4">
            <div class="emoji-large">🎉</div>
            <h3>¡Felicidades!</h3>
            <p class="lead">Has completado todos los ejercicios.</p>
            <div class="row mt-4">
              <div class="col-6"><div class="p-3" style="background: #e8f5e9; border-radius: 10px;"><h2 style="color: #2ecc71; margin: 0;">${ejerciciosCorrectos}</h2><small>Correctas</small></div></div>
              <div class="col-6"><div class="p-3" style="background: #ffebee; border-radius: 10px;"><h2 style="color: #e74c3c; margin: 0;">${totalEjercicios - ejerciciosCorrectos}</h2><small>Incorrectas</small></div></div>
            </div>
            <div class="mt-4 p-3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 10px;">
              <h4 style="color: white; margin: 0;">${porcentajeExito}%</h4>
              <small style="color: white;">Porcentaje de aciertos</small>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary btn-lg" data-bs-dismiss="modal">¡Entendido! 👍</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = new bootstrap.Modal(document.getElementById('modalResumen'));
  modal.show();
  document.getElementById('modalResumen').addEventListener('hidden.bs.modal', function () { this.remove(); });
}

function animarExito(boton) {
  const rect = boton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 5; i++) {
    const particula = document.createElement('div');
    particula.textContent = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
    particula.style.position = 'fixed';
    particula.style.left = centerX + 'px';
    particula.style.top = centerY + 'px';
    particula.style.fontSize = '24px';
    particula.style.pointerEvents = 'none';
    particula.style.zIndex = '9999';
    particula.style.transition = 'all 1s ease-out';
    document.body.appendChild(particula);
    
    setTimeout(() => {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = -100 - Math.random() * 100;
      particula.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.5)`;
      particula.style.opacity = '0';
    }, 10);
    
    setTimeout(() => particula.remove(), 1000);
  }
}

