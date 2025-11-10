document.addEventListener("DOMContentLoaded", () => {
    
    // --- Funciones de Ayuda ---
    
    function mcd(a, b) {
        let c;
        while (b) {
            c = a % b;
            a = b;
            b = c;
        }
        return a;
    }

    function mcm(a, b) {
        return (a * b === 0) ? 0 : Math.abs((a * b) / mcd(a, b));
    }

    /**
     * Función para barajar (revolver) un array.
     * @param {Array} array - El array a barajar.
     * @returns {Array} El array barajado.
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- Lógica de Navegación ---
    
    const botonesNav = document.querySelectorAll(".nav-btn");
    const secciones = document.querySelectorAll(".contenido-seccion");

    botonesNav.forEach(boton => {
        boton.addEventListener("click", () => {
            secciones.forEach(seccion => seccion.classList.add("hidden"));
            botonesNav.forEach(btn => btn.classList.remove("active"));
            
            const targetId = boton.getAttribute("data-target");
            document.getElementById(targetId).classList.remove("hidden");
            boton.classList.add("active");
        });
    });

    // --- Lógica de la Sección 1: Ejemplo Dinámico ---
    
    const divEjemploPasos = document.getElementById("ejemplo-dinamico-pasos");

    function generarEjemploDinamico() {
        const num1 = Math.floor(Math.random() * 10) + 3; // 3-12
        const num2 = Math.floor(Math.random() * 10) + 3; // 3-12
        const resultadoMCM = mcm(num1, num2);
        
        let multiplos1 = [];
        let multiplos2 = [];
        
        for (let i = 1; i <= 10; i++) {
            multiplos1.push(num1 * i);
            multiplos2.push(num2 * i);
        }

        let html = `<h3>Cálculo del MCM(${num1}, ${num2})</h3>`;
        html += `<p><strong>Múltiplos de ${num1}:</strong> ${multiplos1.join(', ')}, ...</p>`;
        html += `<p><strong>Múltiplos de ${num2}:</strong> ${multiplos2.join(', ')}, ...</p>`;
        html += `<p>Buscamos el primer número que aparece en ambas listas. En este caso, es el <strong>${resultadoMCM}</strong>.</p>`;
        html += `<p><strong>Resultado: El MCM(${num1}, ${num2}) = ${resultadoMCM}</strong></p>`;

        divEjemploPasos.innerHTML = html;
    }
    
    // Generar el primer ejemplo automáticamente al cargar
    generarEjemploDinamico();
    // Establecer un intervalo para que se genere solo cada 6 segundos
   

    // --- Lógica de la Sección 2: Calculadora Interactiva ---

    const btnCalcular = document.getElementById("btn-calcular-mcm");
    const inputNumeros = document.getElementById("input-numeros");
    const divResultadoCalc = document.getElementById("calculadora-resultado");

    btnCalcular.addEventListener("click", () => {
        const textoInput = inputNumeros.value;
        if (textoInput.trim() === "") {
            divResultadoCalc.innerHTML = "<p>Por favor, ingresa al menos dos números.</p>";
            divResultadoCalc.classList.remove("hidden");
            return;
        }
        
        const numeros = textoInput.split(',')
                                  .map(n => parseInt(n.trim()))
                                  .filter(n => !isNaN(n) && n > 0);

        if (numeros.length < 2) {
            divResultadoCalc.innerHTML = "<p>Error: Ingresa al menos dos números válidos, positivos y separados por comas.</p>";
            divResultadoCalc.classList.remove("hidden");
            return;
        }

        const resultadoMCM = numeros.reduce(mcm);

        let html = `<h3>Explicación del Método (Factorización Prima)</h3>`;
        html += `<p>El método más común es la descomposición en factores primos simultánea.</p>`;
        html += `<ol>
                    <li>Se colocan los números (${numeros.join(', ')}) en una fila.</li>
                    <li>Se traza una línea vertical y se empieza a dividir por los números primos (2, 3, 5, ...) que dividan a *al menos uno* de los números.</li>
                    <li>Se repite hasta que todos los números sean 1.</li>
                    <li>El MCM es el resultado de <strong>multiplicar todos los divisores primos</strong> que usamos.</li>
                 </ol>`;
        html += `<h3>Resultado</h3>`;
        html += `<p><strong>El Mínimo Común Múltiplo (MCM) de (${numeros.join(', ')}) es: <span style="font-size: 1.5em; font-weight: bold;">${resultadoMCM}</span></strong></p>`;
        
        divResultadoCalc.innerHTML = html;
        divResultadoCalc.classList.remove("hidden");
    });

    // --- Lógica de la Sección 3: Examen (Opción Múltiple) ---
    
    const listaExamen = document.getElementById("lista-examen");
    const btnCalificar = document.getElementById("btn-calificar-examen");
    const btnNuevoExamen = document.getElementById("btn-nuevo-examen");
    const divResultadoExamen = document.getElementById("resultado-examen");
    
    let preguntasExamen = []; // Almacenará {num1, num2, respuestaCorrecta}

    function generarExamen() {
        preguntasExamen = [];
        listaExamen.innerHTML = ""; // Limpiar lista anterior
        divResultadoExamen.classList.add("hidden");
        btnCalificar.classList.remove("hidden");
        btnNuevoExamen.classList.add("hidden");

        for (let i = 0; i < 10; i++) {
            const num1 = Math.floor(Math.random() * 20) + 2; // 2-21
            const num2 = Math.floor(Math.random() * 20) + 2; // 2-21
            const respuestaCorrecta = mcm(num1, num2);
            
            // Guardar la pregunta
            preguntasExamen.push({ num1, num2, respuestaCorrecta });
            
            // --- Generar Opciones Múltiples ---
            let opciones = new Set(); // Usamos Set para evitar duplicados
            opciones.add(respuestaCorrecta);
            opciones.add(mcd(num1, num2)); // Distractor común: el MCD
            opciones.add(num1 * num2); // Distractor común: el producto
            
            // Rellenar con más distractores si es necesario (hasta 4 opciones)
            while (opciones.size < 4) {
                // Añadir un múltiplo cercano pero incorrecto
                let distractor = respuestaCorrecta + (Math.floor(Math.random() * 3) + 1) * (num1 > num2 ? num2 : num1);
                if (distractor === 0) distractor = 42; // Evitar 0 si algo sale mal
                opciones.add(distractor);
            }
            
            // Convertir Set a Array y barajarlo
            let opcionesBarajadas = shuffleArray(Array.from(opciones));
            
            // --- Crear el HTML para la pregunta ---
            const itemLista = document.createElement("li");
            // 1. Añadir el texto de la pregunta
            itemLista.innerHTML = `<label><strong>${i + 1}.</strong> ¿Cuál es el MCM de <strong>${num1}</strong> y <strong>${num2}</strong>?</label>`;
            
            // 2. Crear el contenedor de opciones
            const divOpciones = document.createElement("div");
            divOpciones.className = "opciones-examen";
            
            // 3. Añadir cada opción como un radio button
            opcionesBarajadas.forEach((opcion) => {
                const idOpcion = `p${i}-op${opcion}`; // ID único
                divOpciones.innerHTML += `
                    <label class="opcion-label" for="${idOpcion}">
                        <input type="radio" name="pregunta-${i}" id="${idOpcion}" value="${opcion}">
                        ${opcion}
                    </label>
                `;
            });
            
            itemLista.appendChild(divOpciones);
            
            // 4. Añadir el span para el feedback
            itemLista.innerHTML += `<span id="feedback-${i}" class="feedback-examen"></span>`;
            
            // 5. Añadir la pregunta completa a la lista
            listaExamen.appendChild(itemLista);
        }
    }

    function calificarExamen() {
        let puntaje = 0;
        
        preguntasExamen.forEach((pregunta, index) => {
            const feedbackSpan = document.getElementById(`feedback-${index}`);
            const selectedRadio = document.querySelector(`input[name="pregunta-${index}"]:checked`);
            
            // Deshabilitar todas las opciones de esta pregunta
            document.querySelectorAll(`input[name="pregunta-${index}"]`).forEach(radio => {
                radio.disabled = true;
            });

            if (selectedRadio) {
                const respuestaUsuario = parseInt(selectedRadio.value);
                if (respuestaUsuario === pregunta.respuestaCorrecta) {
                    puntaje++;
                    feedbackSpan.textContent = `¡Correcto! (${pregunta.respuestaCorrecta})`;
                    feedbackSpan.className = "feedback-examen correcto";
                } else {
                    feedbackSpan.textContent = `Incorrecto. La respuesta era ${pregunta.respuestaCorrecta}.`;
                    feedbackSpan.className = "feedback-examen incorrecto";
                }
            } else {
                // Si no se seleccionó nada
                feedbackSpan.textContent = `Sin respuesta. La respuesta era ${pregunta.respuestaCorrecta}.`;
                feedbackSpan.className = "feedback-examen incorrecto";
            }
        });

        // Mostrar puntaje final
        divResultadoExamen.innerHTML = `Puntaje Final: <strong>${puntaje} de 10 correctas</strong>`;
        divResultadoExamen.classList.remove("hidden");
        
        if (puntaje >= 6) {
            divResultadoExamen.className = "resultado-examen aprobado";
        } else {
            divResultadoExamen.className = "resultado-examen reprobado";
        }

        btnCalificar.classList.add("hidden");
        btnNuevoExamen.classList.remove("hidden");
    }

    // Asignar eventos a los botones del examen
    btnCalificar.addEventListener("click", calificarExamen);
    btnNuevoExamen.addEventListener("click", generarExamen);

    // Generar el primer examen al cargar
    generarExamen();
});
