document.addEventListener("DOMContentLoaded", () => {
    
    // --- Lógica de Navegación ---
    const botonesNav = document.querySelectorAll(".nav-btn");
    const secciones = document.querySelectorAll(".contenido-seccion");

    botonesNav.forEach(boton => {
        boton.addEventListener("click", () => {
            secciones.forEach(seccion => seccion.classList.add("hidden"));
            botonesNav.forEach(btn => btn.classList.remove("active"));
            
            const targetId = boton.getAttribute("data-target");
            const seccionActiva = document.getElementById(targetId);
            if (seccionActiva) {
                seccionActiva.classList.remove("hidden");
            }
            boton.classList.add("active");
        });
    });

    // --- Funciones de Ayuda (Criterios) ---
    function esDivisiblePor(num, divisor) {
        return num % divisor === 0;
    }

    function sumarCifras(num) {
        return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    // --- LÓGICA SECCIÓN 1: EJEMPLOS DINÁMICOS ---

    // Función principal para generar ejemplos
    function generarEjemploCriterio(criterio) {
        let html = "";
        let numDiv, numNoDiv, num1, num2;

        switch (criterio) {
            case '2':
                numDiv = Math.floor(Math.random() * 50) * 2 + 100; // Par
                numNoDiv = Math.floor(Math.random() * 50) * 2 + 101; // Impar
                html = `<span class="ejemplo-si"><strong>${numDiv}</strong> (termina en ${numDiv % 10}) ✔️</span>
                        <span class="ejemplo-no"><strong>${numNoDiv}</strong> (termina en ${numNoDiv % 10}) ❌</span>`;
                if (document.getElementById('dynamic-example-2')) {
                    document.getElementById('dynamic-example-2').innerHTML = html;
                }
                break;
            case '3':
                num1 = (Math.floor(Math.random() * 30) + 10) * 3; // Divisible
                num2 = num1 + 1; // No divisible
                let suma1 = sumarCifras(num1);
                let suma2 = sumarCifras(num2);
                html = `<span class="ejemplo-si"><strong>${num1}</strong> → ${num1.toString().split('').join('+')} = ${suma1} (Múltiplo de 3) ✔️</span>
                        <span class="ejemplo-no"><strong>${num2}</strong> → ${num2.toString().split('').join('+')} = ${suma2} (No múltiplo) ❌</span>`;
                if (document.getElementById('dynamic-example-3')) {
                    document.getElementById('dynamic-example-3').innerHTML = html;
                }
                break;
            case '5':
                numDiv = (Math.floor(Math.random() * 20) + 10) * 5; // Termina en 0 o 5
                numNoDiv = numDiv + 2; // No termina en 0 o 5
                html = `<span class="ejemplo-si"><strong>${numDiv}</strong> (termina en ${numDiv % 10}) ✔️</span>
                        <span class="ejemplo-no"><strong>${numNoDiv}</strong> (termina en ${numNoDiv % 10}) ❌</span>`;
                if (document.getElementById('dynamic-example-5')) {
                    document.getElementById('dynamic-example-5').innerHTML = html;
                }
                break;
            // Casos 4, 6, 9, 10 eliminados
        }
    }

    // Generar solo los ejemplos que existen en el HTML
    ['2', '3', '5'].forEach(criterio => {
        generarEjemploCriterio(criterio);
    });

    // --- Lógica de la Sección 2: Verificador Interactivo ---
    const btnVerificar = document.getElementById("btn-verificar-criterio");
    const inputNumero = document.getElementById("input-numero-criterio");
    const divResultado = document.getElementById("resultado-criterio");

    if (btnVerificar && inputNumero && divResultado) {
        btnVerificar.addEventListener("click", () => {
            const num = parseInt(inputNumero.value);
            
            if (isNaN(num)) {
                divResultado.innerHTML = `<div class="criterio-resultado-item criterio-no"><span class="emoji">❌</span> Por favor, ingresa un número válido.</div>`;
                return;
            }

            let html = `<h4>Resultados para el número ${num}:</h4>`;
            const ultCifra = num % 10;
            const sumaCifras = sumarCifras(num);

            // Criterio del 2
            if (esDivisiblePor(num, 2)) {
                html += `<div class="criterio-resultado-item criterio-si"><span class="emoji">✔️</span> <strong>Divisible por 2</strong> <span class="explicacion">Porque termina en ${ultCifra} (par).</span></div>`;
            } else {
                html += `<div class="criterio-resultado-item criterio-no"><span class="emoji">❌</span> <strong>NO Divisible por 2</strong> <span class="explicacion">Porque termina en ${ultCifra} (impar).</span></div>`;
            }
            
            // Criterio del 3
            if (esDivisiblePor(sumaCifras, 3)) {
                html += `<div class="criterio-resultado-item criterio-si"><span class="emoji">✔️</span> <strong>Divisible por 3</strong> <span class="explicacion">Suma de cifras: ${sumaCifras} (es múltiplo de 3).</span></div>`;
            } else {
                html += `<div class="criterio-resultado-item criterio-no"><span class="emoji">❌</span> <strong>NO Divisible por 3</strong> <span class="explicacion">Suma de cifras: ${sumaCifras} (no es múltiplo de 3).</span></div>`;
            }

            // Criterio del 5
            if (esDivisiblePor(num, 5)) {
                html += `<div class="criterio-resultado-item criterio-si"><span class="emoji">✔️</span> <strong>Divisible por 5</strong> <span class="explicacion">Porque termina en ${ultCifra}.</span></div>`;
            } else {
                html += `<div class="criterio-resultado-item criterio-no"><span class="emoji">❌</span> <strong>NO Divisible por 5</strong> <span class="explicacion">Porque no termina en 0 o 5.</span></div>`;
            }

            // Checks para 4, 6, 9, 10 eliminados

            divResultado.innerHTML = html;
        });
    }

    // --- Lógica de la Sección 3: Examen ---
    const listaExamen = document.getElementById("lista-examen-criterios");
const btnCalificar = document.getElementById("btn-calificar-examen");
const btnNuevoExamen = document.getElementById("btn-nuevo-examen");
const divResultadoExamen = document.getElementById("resultado-examen");
// Ocultar los botones que ya no se usan en el modo dinámico
if (btnCalificar) btnCalificar.style.display = "none";
if (btnNuevoExamen) btnNuevoExamen.style.display = "none";

let preguntasExamen = [];
let indiceActual = 0;
let puntaje = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function genPregunta(criterio) {
  let pregunta = "", opciones = [], respuestaCorrecta = "";
  let numDiv, numNoDiv, numNoDiv2, numNoDiv3;

  switch (criterio) {
    case 2:
      pregunta = "Selecciona el número que SÍ es divisible por 2:";
      numDiv = Math.floor(Math.random() * 50) * 2;
      numNoDiv = numDiv + 1;
      numNoDiv2 = numDiv + 3;
      numNoDiv3 = numDiv + 5;
      opciones = [numDiv, numNoDiv, numNoDiv2, numNoDiv3];
      respuestaCorrecta = numDiv;
      break;
    case 3:
      pregunta = "Selecciona el número que SÍ es divisible por 3:";
      numDiv = (Math.floor(Math.random() * 30) + 10) * 3;
      numNoDiv = numDiv + 1;
      numNoDiv2 = numDiv + 2;
      numNoDiv3 = numDiv + 4;
      opciones = [numDiv, numNoDiv, numNoDiv2, numNoDiv3];
      respuestaCorrecta = numDiv;
      break;
    case 5:
      pregunta = "Selecciona el número que NO es divisible por 5:";
      numDiv = (Math.floor(Math.random() * 20) + 10) * 5;
      numDiv2 = (Math.floor(Math.random() * 20) + 10) * 10;
      numDiv3 = (Math.floor(Math.random() * 20) + 10) * 5 + 5;
      numNoDiv = numDiv + 1;
      opciones = [numDiv, numDiv2, numNoDiv, numDiv3];
      respuestaCorrecta = numNoDiv;
      break;
  }

  opciones = shuffleArray(opciones);
  return { pregunta, opciones, respuestaCorrecta: respuestaCorrecta.toString() };
}

function generarExamenCriterios() {
  preguntasExamen = [];
  const criterios = [2, 3, 5, 2, 3, 5, 2, 3, 5, 3];
  const criteriosBarajados = shuffleArray(criterios);

  for (let i = 0; i < 10; i++) {
    preguntasExamen.push(genPregunta(criteriosBarajados[i]));
  }

  indiceActual = 0;
  puntaje = 0;
  divResultadoExamen.classList.add("hidden");
  mostrarPreguntaActual();
}

function mostrarPreguntaActual() {
  listaExamen.innerHTML = "";

  if (indiceActual < preguntasExamen.length) {
    const pregunta = preguntasExamen[indiceActual];

    const contenedor = document.createElement("div");
    contenedor.className = "pregunta-dinamica";

    contenedor.innerHTML = `
      <h5><strong>${indiceActual + 1}.</strong> ${pregunta.pregunta}</h5>
      ${pregunta.opciones
        .map(
          (op, idx) => `
        <label class="opcion-label">
          <input type="radio" name="respuesta" value="${op}">
          ${op}
        </label>
      `
        )
        .join("")}
      <button id="btn-siguiente" class="btn btn-primary mt-3 w-100">Responder</button>
      <div id="feedback" class="mt-3"></div>
    `;

    listaExamen.appendChild(contenedor);

    document
      .getElementById("btn-siguiente")
      .addEventListener("click", evaluarPregunta);
  } else {
    mostrarResultadoFinal();
  }
}

function evaluarPregunta() {
  const seleccion = document.querySelector('input[name="respuesta"]:checked');
  const feedback = document.getElementById("feedback");

  if (!seleccion) {
    feedback.textContent = "⚠️ Selecciona una opción antes de continuar.";
    feedback.className = "text-warning";
    return;
  }

  const pregunta = preguntasExamen[indiceActual];
  if (seleccion.value === pregunta.respuestaCorrecta) {
    puntaje++;
    feedback.innerHTML = "✅ ¡Correcto!";
    feedback.className = "text-success";
  } else {
    feedback.innerHTML = `❌ Incorrecto. La respuesta era <strong>${pregunta.respuestaCorrecta}</strong>.`;
    feedback.className = "text-danger";
  }

  // Esperar 1.5 segundos antes de pasar a la siguiente
  setTimeout(() => {
    indiceActual++;
    mostrarPreguntaActual();
  }, 1500);
}

function mostrarResultadoFinal() {
  listaExamen.innerHTML = "";
  divResultadoExamen.classList.remove("hidden");

  divResultadoExamen.innerHTML = `
    <h4>Resultado Final</h4>
    <p>Tu puntaje: <strong>${puntaje} / ${preguntasExamen.length}</strong></p>
    <button id="btn-reiniciar" class="btn btn-secondary mt-3 w-100">Reiniciar Examen</button>
  `;

  document.getElementById("btn-reiniciar").addEventListener("click", generarExamenCriterios);
}

if (listaExamen && divResultadoExamen) {
  generarExamenCriterios();
}
    // --- Inicialización ---
    if (listaExamen && btnCalificar && btnNuevoExamen && divResultadoExamen) {
        btnCalificar.addEventListener("click", calificarExamen);
        btnNuevoExamen.addEventListener("click", generarExamenCriterios);

        // Generar el primer examen al cargar
        generarExamenCriterios();
    } else {
        console.error("Error: No se encontraron los elementos del examen (lista, botones o resultado).");
    }
});
