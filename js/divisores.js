/**
 * divisores.js - Mejorado
 * Funcionalidad interactiva para la página de Divisores de un Número
 * Incluye: Ejercicios aleatorios y visualizador dinámico
 */

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

/**
 * Calcula todos los divisores de un número
 * @param {number} num - Número del cual calcular divisores
 * @returns {Array} Array con todos los divisores
 */
function calcularDivisores(num) {
  const divisores = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisores.push(i);
    }
  }
  return divisores;
}

/**
 * Determina el tipo de número según sus divisores
 * @param {number} num - Número a analizar
 * @param {Array} divisores - Array de divisores del número
 * @returns {Object} Objeto con tipo y descripción
 */
function determinarTipoNumero(num, divisores) {
  const sumaDivisoresPropios = divisores
    .filter(d => d !== num)
    .reduce((sum, d) => sum + d, 0);
  
  if (divisores.length === 2) {
    return {
      tipo: 'primo',
      emoji: '🎯',
      texto: 'Número PRIMO',
      descripcion: 'Solo tiene dos divisores: 1 y él mismo'
    };
  }
  
  if (sumaDivisoresPropios === num) {
    return {
      tipo: 'perfecto',
      emoji: '⭐',
      texto: 'Número PERFECTO',
      descripcion: 'La suma de sus divisores propios es igual al número'
    };
  }
  
  if (sumaDivisoresPropios > num) {
    return {
      tipo: 'abundante',
      emoji: '📈',
      texto: 'Número ABUNDANTE',
      descripcion: 'La suma de sus divisores propios es mayor que el número'
    };
  }
  
  return {
    tipo: 'deficiente',
    emoji: '📉',
    texto: 'Número DEFICIENTE',
    descripcion: 'La suma de sus divisores propios es menor que el número'
  };
}

/**
 * Muestra divisores en formato visual
 * @param {Array} divisores - Array de divisores
 * @param {string} containerId - ID del contenedor donde mostrar
 */
function mostrarDivisores(divisores, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  divisores.forEach(divisor => {
    const div = document.createElement('div');
    div.className = 'divisor-badge';
    div.textContent = divisor;
    container.appendChild(div);
  });
}

// ==========================================
// VISUALIZADOR DINÁMICO DE DIVISORES
// ==========================================

function inicializarVisualizador() {
  const vizInput = document.getElementById('vizNumberInput');
  const vizBtn = document.getElementById('vizBtn');
  
  if (!vizInput || !vizBtn) return;
  
  // Visualizar al hacer clic
  vizBtn.addEventListener('click', visualizarDivisores);
  
  // Visualizar al presionar Enter
  vizInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      visualizarDivisores();
    }
  });
  
  // Visualizar número inicial
  visualizarDivisores();
}

function visualizarDivisores() {
  const vizInput = document.getElementById('vizNumberInput');
  const number = parseInt(vizInput.value);
  
  if (!number || number < 2 || number > 100) {
    alert('Por favor, ingresa un número válido entre 2 y 100');
    return;
  }
  
  const divisores = calcularDivisores(number);
  const container = document.getElementById('visualizerContainer');
  const statsDiv = document.getElementById('vizStats');
  const infoDiv = document.getElementById('vizInfo');
  
  if (!container) return;
  
  // Limpiar contenedor
  container.innerHTML = '';
  
  // Crear visualización para cada divisor
  divisores.forEach(divisor => {
    const divGroup = document.createElement('div');
    divGroup.className = 'viz-group';
    
    const label = document.createElement('div');
    label.className = 'viz-label';
    label.textContent = `${number} ÷ ${divisor} = ${number / divisor}`;
    
    const blocksContainer = document.createElement('div');
    blocksContainer.className = 'viz-blocks';
    
    // Crear bloques
    const numGroups = number / divisor;
    for (let i = 0; i < numGroups; i++) {
      const group = document.createElement('div');
      group.className = 'viz-block-group';
      
      for (let j = 0; j < divisor; j++) {
        const block = document.createElement('div');
        block.className = 'viz-block';
        group.appendChild(block);
      }
      
      blocksContainer.appendChild(group);
    }
    
    divGroup.appendChild(label);
    divGroup.appendChild(blocksContainer);
    container.appendChild(divGroup);
  });
  
  // Mostrar estadísticas
  const tipoNumero = determinarTipoNumero(number, divisores);
  infoDiv.innerHTML = `
    El número <strong>${number}</strong> tiene <strong>${divisores.length}</strong> divisores.
    <br>${tipoNumero.emoji} Es un <strong>${tipoNumero.texto}</strong>.
  `;
  
  statsDiv.style.display = 'block';
}

// ==========================================
// INICIALIZACIÓN DE EJEMPLOS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Mostrar divisores en los ejemplos
  const ejemplos = [
    { num: 12, id: 'example1-divisors' },
    { num: 28, id: 'example2-divisors' },
    { num: 17, id: 'example3-divisors' },
    { num: 36, id: 'example4-divisors' }
  ];
  
  ejemplos.forEach(ejemplo => {
    const divisores = calcularDivisores(ejemplo.num);
    mostrarDivisores(divisores, ejemplo.id);
  });
  
  // Inicializar módulos
  inicializarVisualizador();
  inicializarCalculadora();
  generarEjerciciosAleatorios();
});

// ==========================================
// CALCULADORA INTERACTIVA
// ==========================================

function inicializarCalculadora() {
  const numberInput = document.getElementById('numberInput');
  const calculateBtn = document.getElementById('calculateBtn');
  
  if (!numberInput || !calculateBtn) return;
  
  calculateBtn.addEventListener('click', calcularYMostrar);
  
  numberInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calcularYMostrar();
    }
  });
  
  numberInput.addEventListener('input', function() {
    const value = parseInt(this.value);
    if (value < 1) this.value = 1;
    if (value > 10000) this.value = 10000;
  });
}

function calcularYMostrar() {
  const numberInput = document.getElementById('numberInput');
  const number = parseInt(numberInput.value);
  
  if (!number || number < 1 || number > 10000) {
    alert('Por favor, ingresa un número válido entre 1 y 10000');
    return;
  }
  
  const divisores = calcularDivisores(number);
  const suma = divisores.reduce((a, b) => a + b, 0);
  const sumaPropios = suma - number;
  const tipoNumero = determinarTipoNumero(number, divisores);
  
  document.getElementById('numberDisplay').innerHTML = 
    `Número analizado: <strong>${number}</strong>`;
  
  mostrarDivisores(divisores, 'divisorsDisplay');
  
  document.getElementById('countDisplay').textContent = divisores.length;
  document.getElementById('sumDisplay').textContent = suma;
  document.getElementById('properSumDisplay').textContent = sumaPropios;
  
  document.getElementById('typeDisplay').innerHTML = `
    <div class="type-badge ${tipoNumero.tipo}">
      ${tipoNumero.emoji} ${tipoNumero.texto}
    </div>
    <p>${tipoNumero.descripcion}</p>
  `;
  
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.style.display = 'block';
  resultContainer.classList.add('fade-in');
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==========================================
// GENERADOR DE EJERCICIOS ALEATORIOS
// ==========================================

// Pool de preguntas posibles
const poolPreguntas = [
  {
    tipo: 'contar_divisores',
    generar: () => {
      const numeros = [6, 8, 10, 12, 15, 16, 18, 20, 24, 30, 36, 40, 48, 60];
      const num = numeros[Math.floor(Math.random() * numeros.length)];
      const divisores = calcularDivisores(num);
      const correcta = divisores.length;
      
      // Generar opciones incorrectas
      const opciones = [correcta];
      while (opciones.length < 4) {
        const opcion = correcta + (Math.floor(Math.random() * 7) - 3);
        if (opcion > 0 && !opciones.includes(opcion)) {
          opciones.push(opcion);
        }
      }
      
      return {
        pregunta: `¿Cuántos divisores tiene el número ${num}?`,
        opciones: mezclarArray(opciones.map(o => ({ texto: `${o} divisores`, valor: o }))),
        correcta: correcta,
        explicacion: `Los divisores de ${num} son: ${divisores.join(', ')}. Total: ${correcta} divisores.`
      };
    }
  },
  {
    tipo: 'identificar_divisor',
    generar: () => {
      const bases = [24, 30, 36, 40, 45, 48, 54, 60, 72];
      const num = bases[Math.floor(Math.random() * bases.length)];
      const divisores = calcularDivisores(num);
      const correcta = divisores[Math.floor(Math.random() * divisores.length)];
      
      // Generar no divisores
      const noDivisores = [];
      for (let i = 2; i < num; i++) {
        if (!divisores.includes(i)) {
          noDivisores.push(i);
        }
      }
      
      const opciones = [correcta];
      while (opciones.length < 4 && noDivisores.length > 0) {
        const idx = Math.floor(Math.random() * noDivisores.length);
        opciones.push(noDivisores[idx]);
        noDivisores.splice(idx, 1);
      }
      
      return {
        pregunta: `¿Cuál de los siguientes números es un divisor de ${num}?`,
        opciones: mezclarArray(opciones.map(o => ({ texto: o.toString(), valor: o }))),
        correcta: correcta,
        explicacion: `${num} ÷ ${correcta} = ${num / correcta} (división exacta). Por lo tanto, ${correcta} es divisor de ${num}.`
      };
    }
  },
  {
    tipo: 'suma_divisores_propios',
    generar: () => {
      const numeros = [6, 8, 10, 12, 15, 18, 20, 24, 28];
      const num = numeros[Math.floor(Math.random() * numeros.length)];
      const divisores = calcularDivisores(num);
      const divisoresPropios = divisores.filter(d => d !== num);
      const correcta = divisoresPropios.reduce((a, b) => a + b, 0);
      
      const opciones = [correcta];
      while (opciones.length < 4) {
        const opcion = correcta + (Math.floor(Math.random() * 11) - 5);
        if (opcion > 0 && !opciones.includes(opcion)) {
          opciones.push(opcion);
        }
      }
      
      return {
        pregunta: `¿Cuál es la suma de los divisores propios de ${num}? (sin incluir el ${num})`,
        opciones: mezclarArray(opciones.map(o => ({ texto: o.toString(), valor: o }))),
        correcta: correcta,
        explicacion: `Divisores propios de ${num}: ${divisoresPropios.join(', ')}. Suma: ${divisoresPropios.join(' + ')} = ${correcta}`
      };
    }
  },
  {
    tipo: 'identificar_primo',
    generar: () => {
      const primos = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const compuestos = [12, 14, 15, 16, 18, 20, 21, 22, 24, 25];
      
      const esPrimo = Math.random() > 0.5;
      const num = esPrimo ? 
        primos[Math.floor(Math.random() * primos.length)] :
        compuestos[Math.floor(Math.random() * compuestos.length)];
      
      const opciones = [
        { texto: 'Número primo', valor: 'primo' },
        { texto: 'Número compuesto', valor: 'compuesto' },
        { texto: 'Número perfecto', valor: 'perfecto' },
        { texto: 'Número par', valor: 'par' }
      ];
      
      const correcta = esPrimo ? 'primo' : 'compuesto';
      const divisores = calcularDivisores(num);
      
      return {
        pregunta: `¿Qué tipo de número es el ${num}?`,
        opciones: opciones,
        correcta: correcta,
        explicacion: esPrimo ? 
          `${num} solo tiene dos divisores: 1 y ${num}. Por lo tanto, es un número primo.` :
          `${num} tiene más de dos divisores: ${divisores.join(', ')}. Por lo tanto, es un número compuesto.`
      };
    }
  },
  {
    tipo: 'concepto_primo',
    generar: () => {
      const opciones = [
        { texto: 'Un número con exactamente 2 divisores', valor: '2' },
        { texto: 'Un número con más de 2 divisores', valor: 'mas2' },
        { texto: 'Un número divisible por 2', valor: 'div2' },
        { texto: 'Un número que termina en 1, 3, 7 o 9', valor: 'termina' }
      ];
      
      return {
        pregunta: '¿Qué caracteriza a un número primo?',
        opciones: opciones,
        correcta: '2',
        explicacion: 'Un número primo tiene exactamente 2 divisores: 1 y él mismo. Esta es la definición fundamental de los números primos.'
      };
    }
  },
  {
    tipo: 'pares_divisores',
    generar: () => {
      const numeros = [12, 16, 18, 20, 24, 30, 36, 40, 48];
      const num = numeros[Math.floor(Math.random() * numeros.length)];
      const divisores = calcularDivisores(num);
      
      // Encontrar un par de divisores
      const d1 = divisores[Math.floor(Math.random() * divisores.length / 2)];
      const d2 = num / d1;
      
      // Generar pares incorrectos
      const paresIncorrectos = [];
      while (paresIncorrectos.length < 3) {
        const a = divisores[Math.floor(Math.random() * divisores.length)];
        const b = Math.floor(Math.random() * num) + 1;
        if (a * b !== num && !paresIncorrectos.some(p => p[0] === a && p[1] === b)) {
          paresIncorrectos.push([a, b]);
        }
      }
      
      const opciones = [
        { texto: `${d1} y ${d2}`, valor: 'correcto' },
        ...paresIncorrectos.map(p => ({ texto: `${p[0]} y ${p[1]}`, valor: 'incorrecto' }))
      ];
      
      return {
        pregunta: `¿Cuál par de divisores de ${num} tiene como producto ${num}?`,
        opciones: mezclarArray(opciones),
        correcta: 'correcto',
        explicacion: `${d1} × ${d2} = ${num}. Los divisores siempre vienen en pares cuyo producto es el número original.`
      };
    }
  },
  {
    tipo: 'numero_perfecto',
    generar: () => {
      const opciones = [
        { texto: '6', valor: 6 },
        { texto: '12', valor: 12 },
        { texto: '18', valor: 18 },
        { texto: '24', valor: 24 }
      ];
      
      return {
        pregunta: '¿Cuál de los siguientes es un número perfecto?',
        opciones: opciones,
        correcta: 6,
        explicacion: '6 es un número perfecto porque la suma de sus divisores propios (1 + 2 + 3 = 6) es igual al número.'
      };
    }
  },
  {
    tipo: 'divisor_comun',
    generar: () => {
      const pares = [[12, 18], [15, 25], [20, 30], [24, 36], [18, 27]];
      const [a, b] = pares[Math.floor(Math.random() * pares.length)];
      
      const divisoresA = calcularDivisores(a);
      const divisoresB = calcularDivisores(b);
      const comunes = divisoresA.filter(d => divisoresB.includes(d));
      const correcta = comunes[comunes.length - 2] || comunes[comunes.length - 1]; // Evitar el 1
      
      const noComunes = divisoresA.filter(d => !divisoresB.includes(d) && d > 1);
      const opciones = [correcta, ...noComunes.slice(0, 3)];
      
      return {
        pregunta: `¿Cuál es un divisor común de ${a} y ${b}?`,
        opciones: mezclarArray(opciones.map(o => ({ texto: o.toString(), valor: o }))),
        correcta: correcta,
        explicacion: `Los divisores comunes de ${a} y ${b} son: ${comunes.join(', ')}. ${correcta} divide a ambos números.`
      };
    }
  }
];

function mezclarArray(array) {
  const nuevo = [...array];
  for (let i = nuevo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
  }
  return nuevo;
}

let ejerciciosActuales = [];
let puntuacion = 0;
let preguntasRespondidas = new Set();

function generarEjerciciosAleatorios() {
  const container = document.getElementById('exercisesContainer');
  if (!container) return;
  
  container.innerHTML = '';
  ejerciciosActuales = [];
  puntuacion = 0;
  preguntasRespondidas.clear();
  
  // Seleccionar 6 tipos diferentes de preguntas aleatoriamente
  const tiposSeleccionados = mezclarArray([...poolPreguntas]).slice(0, 6);
  
  tiposSeleccionados.forEach((tipoPregunta, index) => {
    const pregunta = tipoPregunta.generar();
    ejerciciosActuales.push(pregunta);
    
    const ejercicioDiv = document.createElement('div');
    ejercicioDiv.className = 'exercise';
    ejercicioDiv.dataset.question = index + 1;
    
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'exercise-question';
    preguntaDiv.innerHTML = `
      <span class="question-number">Pregunta ${index + 1}</span>
      ${pregunta.pregunta}
    `;
    
    const opcionesDiv = document.createElement('div');
    opcionesDiv.className = 'options';
    
    const letras = ['A', 'B', 'C', 'D'];
    pregunta.opciones.forEach((opcion, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.answer = opcion.valor;
      btn.textContent = `${letras[i]} ${opcion.texto}`;
      btn.addEventListener('click', function() {
        verificarRespuesta(index + 1, this, ejercicioDiv);
      });
      opcionesDiv.appendChild(btn);
    });
    
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'exercise-feedback';
    
    ejercicioDiv.appendChild(preguntaDiv);
    ejercicioDiv.appendChild(opcionesDiv);
    ejercicioDiv.appendChild(feedbackDiv);
    container.appendChild(ejercicioDiv);
  });
  
  // Resetear puntuación
  actualizarPuntuacion();
  
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.onclick = generarEjerciciosAleatorios;
  }
}

function verificarRespuesta(questionNum, boton, ejercicio) {
  if (preguntasRespondidas.has(questionNum)) {
    return;
  }
  
  const pregunta = ejerciciosActuales[questionNum - 1];
  const respuestaUsuario = boton.dataset.answer;
  const respuestaCorrecta = pregunta.correcta.toString();
  const feedback = ejercicio.querySelector('.exercise-feedback');
  const opciones = ejercicio.querySelectorAll('.option-btn');
  
  opciones.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  });
  
  preguntasRespondidas.add(questionNum);
  
  const esCorrecta = respuestaUsuario == respuestaCorrecta;
  
  if (esCorrecta) {
    boton.classList.add('correct');
    feedback.className = 'exercise-feedback correct';
    feedback.innerHTML = `
      <strong>¡Correcto! 🎉</strong>
      <p>${pregunta.explicacion}</p>
    `;
    puntuacion++;
  } else {
    boton.classList.add('incorrect');
    feedback.className = 'exercise-feedback incorrect';
    feedback.innerHTML = `
      <strong>Incorrecto ❌</strong>
      <p>${pregunta.explicacion}</p>
    `;
  }
  
  actualizarPuntuacion();
  
  feedback.style.display = 'block';
  feedback.classList.add('fade-in');
}

function actualizarPuntuacion() {
  const scoreValue = document.getElementById('scoreValue');
  const scoreMessage = document.getElementById('scoreMessage');
  const scoreContainer = document.getElementById('scoreContainer');
  
  if (scoreValue) {
    scoreValue.textContent = puntuacion;
  }
  
  if (preguntasRespondidas.size === 6) {
    let mensaje = '';
    const porcentaje = (puntuacion / 6) * 100;
    
    if (porcentaje === 100) {
      mensaje = '¡Perfecto! 🏆 Dominas completamente el tema de divisores.';
    } else if (porcentaje >= 80) {
      mensaje = '¡Excelente! 🌟 Tienes un muy buen conocimiento sobre divisores.';
    } else if (porcentaje >= 60) {
      mensaje = '¡Bien hecho! 👍 Vas por buen camino, sigue practicando.';
    } else {
      mensaje = '💪 Sigue estudiando, puedes mejorar. Revisa la teoría y vuelve a intentar.';
    }
    
    if (scoreMessage) {
      scoreMessage.textContent = mensaje;
      scoreMessage.style.display = 'block';
    }
  }
  
  if (scoreContainer) {
    scoreContainer.style.display = 'block';
    scoreContainer.classList.add('fade-in');
  }
}

// ==========================================
// UTILIDADES Y ANIMACIONES
// ==========================================

function observarAnimaciones() {
  const elementos = document.querySelectorAll('.animate-fade');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elementos.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', observarAnimaciones);

// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ==========================================
// FUNCIONES AUXILIARES MATEMÁTICAS
// ==========================================

function esPrimo(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function calcularMCD(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function calcularMCM(a, b) {
  return Math.abs(a * b) / calcularMCD(a, b);
}

function divisoresComunes(a, b) {
  const divisoresA = calcularDivisores(a);
  const divisoresB = calcularDivisores(b);
  
  return divisoresA.filter(d => divisoresB.includes(d));
}

// ==========================================
// MENSAJES DE CONSOLA
// ==========================================

console.log('%c📊 Divisores de un Número - Versión Mejorada', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Nuevas características: Ejercicios aleatorios y visualizador dinámico', 'color: #28a745; font-size: 12px;');
console.log('Funciones disponibles:', {
  calcularDivisores,
  determinarTipoNumero,
  esPrimo,
  calcularMCD,
  calcularMCM,
  divisoresComunes
});