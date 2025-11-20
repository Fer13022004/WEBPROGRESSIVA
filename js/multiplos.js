// ============================================
// DATOS PARA EJEMPLOS ALEATORIOS
// ============================================

const ejemplosCajas = [
  { obj: "manzanas", cant: 3, cajas: [1, 2, 3] },
  { obj: "galletas", cant: 4, cajas: [1, 2, 3] },
  { obj: "lápices", cant: 5, cajas: [1, 2, 3] },
  { obj: "caramelos", cant: 6, cajas: [1, 2, 3] },
  { obj: "naranjas", cant: 2, cajas: [1, 2, 3] }
];

const numerosEjemplo = [3, 4, 5, 6, 7, 8];
const numerosTablas = [4, 5, 6, 7, 8, 9];
const numerosGrids = [3, 4, 5, 6];

const aplicacionesVidaReal = [
  { emoji: "🛒", titulo: "En el Supermercado", texto: "Los productos vienen en paquetes. Si compras 3 paquetes de 6 galletas, tienes 18 galletas (múltiplo de 6)." },
  { emoji: "🎵", titulo: "Música y Ritmo", texto: "En música, los compases se repiten en múltiplos de tiempos (4/4, 3/4, etc.)." },
  { emoji: "⏰", titulo: "Horarios", texto: "Los relojes marcan los minutos en múltiplos de 5 (5, 10, 15, 20...)." },
  { emoji: "🚌", titulo: "Autobuses", texto: "Un autobús pasa cada 15 minutos. ¿En qué minutos pasará? En los minutos 15, 30, 45, 60 (múltiplos de 15)" },
  { emoji: "💰", titulo: "Dinero", texto: "Si ahorras $20 cada semana, tendrás múltiplos de 20: $20, $40, $60, $80..." },
  { emoji: "🎂", titulo: "Fiestas", texto: "Si pones 8 sillas en cada mesa, necesitas múltiplos de 8: 8, 16, 24, 32, 40..." },
  { emoji: "📅", titulo: "Calendario", texto: "Los días de la semana se repiten cada 7 días. Si hoy es lunes, en 7, 14, 21 días también será lunes." },
  { emoji: "🏃", titulo: "Ejercicio", texto: "Si corres 3 km cada día, en varios días recorrerás múltiplos de 3: 3, 6, 9, 12 km..." }
];

// ============================================
// BANCO DE EJERCICIOS CON EXPLICACIONES
// ============================================

const bancoEjercicios = [
  {
    pregunta: "Escribe los primeros 10 múltiplos de {num}:",
    tipo: "multiplos",
    nums: [2, 3, 4, 5, 6, 7, 8, 9],
    generarOpciones: function (num) {
      const correcta = Array.from({ length: 10 }, (_, i) => num * (i + 1)).join(', ');
      return [
        correcta,
        Array.from({ length: 10 }, (_, i) => num * (i + 1) + 1).join(', '),
        Array.from({ length: 8 }, (_, i) => num * (i + 1)).join(', '),
        Array.from({ length: 10 }, (_, i) => num * (i + 2)).join(', ')
      ];
    },
    respuestaCorrecta: 0,
    explicacion: function(num) {
      return `
        <div class="explanation-step">
          <strong>📝 Paso 1:</strong> Para encontrar los múltiplos de ${num}, debemos multiplicar ${num} por números consecutivos (1, 2, 3, 4...)
        </div>
        <div class="explanation-step">
          <strong>🔢 Paso 2:</strong> Realizamos las multiplicaciones:<br>
          ${num} × 1 = ${num}<br>
          ${num} × 2 = ${num*2}<br>
          ${num} × 3 = ${num*3}<br>
          ${num} × 4 = ${num*4}<br>
          ${num} × 5 = ${num*5}<br>
          ${num} × 6 = ${num*6}<br>
          ${num} × 7 = ${num*7}<br>
          ${num} × 8 = ${num*8}<br>
          ${num} × 9 = ${num*9}<br>
          ${num} × 10 = ${num*10}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> Los primeros 10 múltiplos de ${num} son: ${Array.from({ length: 10 }, (_, i) => num * (i + 1)).join(', ')}
        </div>
      `;
    }
  },
  {
    pregunta: "¿Cuáles de los siguientes números son múltiplos de {num}?",
    tipo: "identificar",
    nums: [3, 4, 5, 6, 7, 8],
    generarOpciones: function (num) {
      const multiplos = [num * 2, num * 3, num * 5, num * 7];
      const noMultiplos = [num * 2 + 1, num * 3 + 2];
      const todos = [...multiplos, ...noMultiplos].sort((a, b) => a - b);
      this.extra = `Números: ${todos.join(', ')}`;
      this.todosNumeros = todos;
      this.multiplosList = multiplos;
      return [
        multiplos.join(', '),
        todos.slice(0, 4).join(', '),
        [...multiplos.slice(0, 2), ...noMultiplos].sort((a, b) => a - b).join(', '),
        'Todos son múltiplos de ' + num
      ];
    },
    respuestaCorrecta: 0,
    explicacion: function(num, ej) {
      const todos = ej.todosNumeros;
      const verificaciones = todos.map(n => {
        const division = n / num;
        const esMultiplo = n % num === 0;
        return `${n} ÷ ${num} = ${division}${esMultiplo ? ' ✅ (División exacta, SÍ es múltiplo)' : ' ❌ (División inexacta, NO es múltiplo)'}`;
      }).join('<br>');
      
      return `
        <div class="explanation-step">
          <strong>📝 Concepto:</strong> Para saber si un número es múltiplo de ${num}, debemos dividirlo entre ${num}. Si la división es exacta (sin residuo), entonces SÍ es múltiplo.
        </div>
        <div class="explanation-step">
          <strong>🔍 Verificamos cada número:</strong><br>
          ${verificaciones}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> Los múltiplos de ${num} son: ${ej.multiplosList.join(', ')}
        </div>
      `;
    }
  },
  {
    pregunta: "Completa la secuencia de múltiplos de {num}: {num}, {num2}, ___, {num4}, ___, {num6}, ___, {num8}",
    tipo: "secuencia",
    nums: [4, 5, 6, 7, 8],
    generarOpciones: function (num) {
      const seq = [num * 3, num * 5, num * 7];
      this.secuenciaCompleta = seq;
      return [
        seq.join(', '),
        [num * 3 + 1, num * 5 + 1, num * 7 + 1].join(', '),
        [num * 3, num * 4, num * 7].join(', '),
        [num * 2, num * 5, num * 8].join(', ')
      ];
    },
    respuestaCorrecta: 0,
    procesarPregunta: function (num) {
      return this.pregunta
        .replace(/{num8}/g, num * 8)
        .replace(/{num6}/g, num * 6)
        .replace(/{num4}/g, num * 4)
        .replace(/{num2}/g, num * 2)
        .replace(/{num}/g, num);
    },
    explicacion: function(num) {
      return `
        <div class="explanation-step">
          <strong>📝 Concepto:</strong> Una secuencia de múltiplos sigue un patrón constante. Cada número se obtiene sumando el valor base.
        </div>
        <div class="explanation-step">
          <strong>🔍 Analizamos el patrón:</strong><br>
          ${num} → ${num*2} (sumamos ${num})<br>
          ${num*2} → ? → ${num*4} (faltan ${num} entre cada salto)<br>
          La diferencia entre números consecutivos siempre es ${num}
        </div>
        <div class="explanation-step">
          <strong>🔢 Completamos:</strong><br>
          ${num}, ${num*2}, <strong>${num*3}</strong>, ${num*4}, <strong>${num*5}</strong>, ${num*6}, <strong>${num*7}</strong>, ${num*8}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> Los números que faltan son: ${num*3}, ${num*5}, ${num*7}
        </div>
      `;
    }
  },
  {
    pregunta: "¿Cuál de estos números NO es múltiplo de {num}?",
    tipo: "no_multiplo",
    nums: [3, 4, 5, 6],
    generarOpciones: function (num) {
      const multiplos = [num * 3, num * 4, num * 6];
      const noMultiplo = num * 3 + 2;
      const opciones = [...multiplos, noMultiplo];
      this.respuestaCorrecta = opciones.indexOf(noMultiplo);
      this.noMultiploNum = noMultiplo;
      this.todosNumeros = opciones;
      return opciones.sort(() => Math.random() - 0.5);
    },
    respuestaCorrecta: -1,
    explicacion: function(num, ej) {
      const verificaciones = ej.todosNumeros.map(n => {
        const division = n / num;
        const resto = n % num;
        const esMultiplo = resto === 0;
        return `${n} ÷ ${num} = ${division.toFixed(2)}${esMultiplo ? ' ✅ (Resto = 0, SÍ es múltiplo)' : ` ❌ (Resto = ${resto}, NO es múltiplo)`}`;
      }).join('<br>');
      
      return `
        <div class="explanation-step">
          <strong>📝 Método:</strong> Dividimos cada número entre ${num}. El que tenga resto diferente de cero NO es múltiplo.
        </div>
        <div class="explanation-step">
          <strong>🔍 Verificamos:</strong><br>
          ${verificaciones}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> El número ${ej.noMultiploNum} NO es múltiplo de ${num}
        </div>
      `;
    }
  },
  {
    pregunta: "Los números pares son múltiplos de:",
    tipo: "concepto",
    generarOpciones: function () {
      return ['2', '5', '10', '3'];
    },
    respuestaCorrecta: 0,
    explicacion: function() {
      return `
        <div class="explanation-step">
          <strong>📝 Concepto de números pares:</strong> Los números pares son aquellos que se pueden dividir exactamente entre 2.
        </div>
        <div class="explanation-step">
          <strong>🔢 Ejemplos de números pares:</strong><br>
          2, 4, 6, 8, 10, 12, 14, 16, 18, 20...
        </div>
        <div class="explanation-step">
          <strong>🔍 Verificación:</strong><br>
          2 = 2 × 1 ✅<br>
          4 = 2 × 2 ✅<br>
          6 = 2 × 3 ✅<br>
          8 = 2 × 4 ✅<br>
          Todos se obtienen multiplicando 2 por otro número
        </div>
        <div class="explanation-step">
          <strong>✅ Conclusión:</strong> Los números pares son múltiplos de 2
        </div>
      `;
    }
  },
  {
    pregunta: "María tiene cajas con {num} chocolates cada una. Si tiene {cajas} cajas, ¿cuántos chocolates tiene en total?",
    tipo: "problema",
    nums: [4, 5, 6, 8],
    generarOpciones: function (num) {
      const cajas = Math.floor(Math.random() * 5) + 5;
      this.pregunta = this.pregunta.replace('{cajas}', cajas);
      const correcto = num * cajas;
      this.numCajas = cajas;
      this.totalChocolates = correcto;
      return [
        correcto - 6 + ' chocolates',
        correcto + ' chocolates',
        correcto + 6 + ' chocolates',
        correcto - 12 + ' chocolates'
      ];
    },
    respuestaCorrecta: 1,
    explicacion: function(num, ej) {
      return `
        <div class="explanation-step">
          <strong>📝 Datos del problema:</strong><br>
          • Cada caja tiene: ${num} chocolates<br>
          • Número de cajas: ${ej.numCajas}
        </div>
        <div class="explanation-step">
          <strong>🔍 Estrategia:</strong> Como cada caja tiene la misma cantidad, multiplicamos:
        </div>
        <div class="explanation-step">
          <strong>🔢 Operación:</strong><br>
          ${num} chocolates × ${ej.numCajas} cajas = ${ej.totalChocolates} chocolates
        </div>
        <div class="explanation-step">
          <strong>💡 Relación con múltiplos:</strong> ${ej.totalChocolates} es un múltiplo de ${num}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> María tiene ${ej.totalChocolates} chocolates en total
        </div>
      `;
    }
  },
  {
    pregunta: "¿Cuál es el {ord} múltiplo de {num}?",
    tipo: "posicion",
    nums: [5, 7, 10, 12],
    generarOpciones: function (num) {
      const pos = Math.floor(Math.random() * 5) + 5;
      const ordinal = ['quinto', 'sexto', 'séptimo', 'octavo', 'noveno'][pos - 5];
      this.pregunta = this.pregunta.replace('{ord}', ordinal);
      const correcto = num * pos;
      this.posicion = pos;
      this.resultado = correcto;
      return [
        (correcto - num) + '',
        correcto + '',
        (correcto + num) + '',
        (correcto - num * 2) + ''
      ];
    },
    respuestaCorrecta: 1,
    explicacion: function(num, ej) {
      const pasos = [];
      for(let i = 1; i <= ej.posicion; i++) {
        pasos.push(`${i}° múltiplo: ${num} × ${i} = ${num * i}${i === ej.posicion ? ' ← Este es el que buscamos' : ''}`);
      }
      return `
        <div class="explanation-step">
          <strong>📝 Concepto:</strong> El primer múltiplo es ${num}×1, el segundo es ${num}×2, y así sucesivamente.
        </div>
        <div class="explanation-step">
          <strong>🔢 Calculamos los múltiplos:</strong><br>
          ${pasos.join('<br>')}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> El múltiplo que buscamos es ${ej.resultado}
        </div>
      `;
    }
  },
  {
    pregunta: "¿Cuántos múltiplos de {num} hay entre 10 y 50?",
    tipo: "contar",
    nums: [3, 4, 5, 6],
    generarOpciones: function (num) {
      let count = 0;
      const multiplosEnRango = [];
      for (let i = 10; i <= 50; i++) {
        if (i % num === 0) {
          count++;
          multiplosEnRango.push(i);
        }
      }
      this.multiplosList = multiplosEnRango;
      this.cantidadTotal = count;
      return [
        (count - 2) + ' múltiplos',
        count + ' múltiplos',
        (count + 1) + ' múltiplos',
        (count + 2) + ' múltiplos'
      ];
    },
    respuestaCorrecta: 1,
    explicacion: function(num, ej) {
      return `
        <div class="explanation-step">
          <strong>📝 Método:</strong> Identificamos todos los múltiplos de ${num} que están entre 10 y 50 (inclusive).
        </div>
        <div class="explanation-step">
          <strong>🔍 Buscamos los múltiplos:</strong><br>
          ${ej.multiplosList.join(', ')}
        </div>
        <div class="explanation-step">
          <strong>🔢 Contamos:</strong><br>
          Hay ${ej.cantidadTotal} números en total
        </div>
        <div class="explanation-step">
          <strong>💡 Tip:</strong> Otra forma es usar división:<br>
          • Primer múltiplo ≥ 10: dividir 10 entre ${num} y redondear hacia arriba<br>
          • Último múltiplo ≤ 50: dividir 50 entre ${num} y redondear hacia abajo<br>
          • Restar las posiciones
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> Hay ${ej.cantidadTotal} múltiplos de ${num} entre 10 y 50
        </div>
      `;
    }
  },
  {
    pregunta: "Si {num1} es múltiplo de {num2}, ¿qué operación lo demuestra?",
    tipo: "operacion",
    generarOpciones: function () {
      const base = Math.floor(Math.random() * 5) + 3;
      const mult = Math.floor(Math.random() * 4) + 2;
      const resultado = base * mult;
      this.pregunta = this.pregunta.replace('{num1}', resultado).replace('{num2}', base);
      this.numBase = base;
      this.multiplicador = mult;
      this.numResultado = resultado;
      return [
        `${base} × ${mult} = ${resultado}`,
        `${resultado} ÷ ${base} = ${mult}`,
        `${base} + ${resultado - base} = ${resultado}`,
        `${resultado} - ${base} = ${resultado - base}`
      ];
    },
    respuestaCorrecta: 0,
    explicacion: function(num, ej) {
      return `
        <div class="explanation-step">
          <strong>📝 Concepto:</strong> Un número es múltiplo de otro cuando se obtiene al multiplicar ese número por un entero.
        </div>
        <div class="explanation-step">
          <strong>🔍 Análisis:</strong><br>
          Queremos demostrar que ${ej.numResultado} es múltiplo de ${ej.numBase}
        </div>
        <div class="explanation-step">
          <strong>🔢 Operación correcta:</strong><br>
          ${ej.numBase} × ${ej.multiplicador} = ${ej.numResultado} ✅<br><br>
          Esto demuestra que ${ej.numResultado} se obtiene multiplicando ${ej.numBase} por ${ej.multiplicador}
        </div>
        <div class="explanation-step">
          <strong>❌ ¿Por qué las otras son incorrectas?</strong><br>
          • La división solo verifica, pero no demuestra la relación de multiplicación<br>
          • Las sumas y restas no definen múltiplos
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> ${ej.numBase} × ${ej.multiplicador} = ${ej.numResultado}
        </div>
      `;
    }
  },
  {
    pregunta: "Si sumas dos múltiplos de {num}, ¿qué obtienes?",
    tipo: "propiedad",
    nums: [3, 5, 7],
    generarOpciones: function (num) {
      return [
        'Otro múltiplo de ' + num,
        'Un número impar',
        'Un divisor de ' + num,
        'Siempre un número par'
      ];
    },
    respuestaCorrecta: 0,
    explicacion: function(num) {
      const mult1 = num * 3;
      const mult2 = num * 5;
      const suma = mult1 + mult2;
      return `
        <div class="explanation-step">
          <strong>📝 Propiedad de los múltiplos:</strong> La suma de dos múltiplos de un número es también múltiplo de ese número.
        </div>
        <div class="explanation-step">
          <strong>🔍 Ejemplo con ${num}:</strong><br>
          Tomemos dos múltiplos de ${num}: ${mult1} y ${mult2}
        </div>
        <div class="explanation-step">
          <strong>🔢 Verificación:</strong><br>
          ${mult1} + ${mult2} = ${suma}<br><br>
          ¿Es ${suma} múltiplo de ${num}?<br>
          ${suma} ÷ ${num} = ${suma/num} ✅ (División exacta)
        </div>
        <div class="explanation-step">
          <strong>💡 ¿Por qué funciona?</strong><br>
          Si a = ${num} × m y b = ${num} × n, entonces:<br>
          a + b = ${num} × m + ${num} × n = ${num} × (m + n)<br>
          Por lo tanto, la suma es múltiplo de ${num}
        </div>
        <div class="explanation-step">
          <strong>✅ Respuesta:</strong> Al sumar dos múltiplos de ${num}, obtienes otro múltiplo de ${num}
        </div>
      `;
    }
  }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ejerciciosResueltos = 0;
let ejerciciosCorrectos = 0;
let progresoEjercicios = {};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function seleccionarAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================
// GENERACIÓN DE CONTENIDO DINÁMICO
// ============================================

function generarEjemploCajas() {
  const ej = seleccionarAleatorio(ejemplosCajas);
  const html = `Imagina que tienes cajas con ${ej.cant} ${ej.obj} cada una. Si tienes 1 caja, tienes ${ej.cant} ${ej.obj}. 
    Si tienes 2 cajas, tienes ${ej.cant * 2} ${ej.obj}. Si tienes 3 cajas, tienes ${ej.cant * 3} ${ej.obj}.<br>
    Entonces: ${ej.cant}, ${ej.cant * 2}, ${ej.cant * 3}... ¡son múltiplos de ${ej.cant}!`;
  document.querySelector('.ejemplo-texto').innerHTML = html;
}

function generarEjemplosBasicos() {
  const numeros = [];
  while (numeros.length < 4) {
    const num = seleccionarAleatorio([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    if (!numeros.includes(num)) numeros.push(num);
  }

  const html = numeros.map(num => {
    const multiplos = Array.from({ length: 10 }, (_, i) => num * (i + 1)).join(', ');
    return `
      <div class="col-md-3">
        <div class="calculation-step">
          <strong>Múltiplos de ${num}:</strong><br>
          ${multiplos}...
        </div>
      </div>
    `;
  }).join('');

  document.querySelector('.ejemplo-multiplos-container').innerHTML = html;
}

function generarEjemploCompleto() {
  const num = seleccionarAleatorio(numerosEjemplo);
  const numEjemploElement = document.getElementById('num-ejemplo');
  if (numEjemploElement) {
    numEjemploElement.textContent = num;
  }
}

function generarTablas() {
  const nums = [];
  while (nums.length < 2) {
    const num = seleccionarAleatorio(numerosTablas);
    if (!nums.includes(num)) nums.push(num);
  }

  const html = nums.map(num => `
    <div class="col-md-6">
      <div class="example-box">
        <h5 class="text-white text-center">Tabla del ${num}</h5>
        <table class="interactive-table mt-3">
          <thead>
            <tr>
              <th>Operación</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: 10 }, (_, i) => {
              const mult = i + 1;
              return `<tr><td>${num} × ${mult}</td><td><strong>${num * mult}</strong></td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `).join('');

  document.getElementById('tablas-multiplicar').innerHTML = html;
}

function generarGridsVisuales() {
  const nums = [];
  while (nums.length < 2) {
    const num = seleccionarAleatorio(numerosGrids);
    if (!nums.includes(num)) nums.push(num);
  }

  const html = nums.map((num, idx) => {
    const clase = idx === 0 ? 'highlight' : 'highlight-alt';
    const gridItems = Array.from({ length: 50 }, (_, i) => {
      const n = i + 1;
      const esMultiplo = n % num === 0;
      return `<div class="grid-item ${esMultiplo ? clase : ''}">${n}</div>`;
    }).join('');

    return `
      <div class="col-md-6">
        <h5 class="text-center">Múltiplos de ${num} (del 1 al 50)</h5>
        <div class="visual-grid">
          ${gridItems}
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('grids-visuales').innerHTML = html;
}

function generarAplicaciones() {
  const apps = [];
  while (apps.length < 4) {
    const app = seleccionarAleatorio(aplicacionesVidaReal);
    if (!apps.includes(app)) apps.push(app);
  }

  const html = apps.map(app => `
    <div class="col-md-6">
      <div class="concept-box text-center">
        <div class="emoji-large">${app.emoji}</div>
        <h5 class="text-white">${app.titulo}</h5>
        <p class="text-white">${app.texto}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('aplicaciones-vida-real').innerHTML = html;
}

// ============================================
// GENERACIÓN DE EJERCICIOS
// ============================================

function generarEjercicios() {
  const ejerciciosSeleccionados = [];
  const ejerciciosUsados = new Set();

  while (ejerciciosSeleccionados.length < 15) {
    const ej = seleccionarAleatorio(bancoEjercicios);
    const key = ej.tipo + (ej.nums ? seleccionarAleatorio(ej.nums) : '');

    if (!ejerciciosUsados.has(key)) {
      ejerciciosUsados.add(key);
      ejerciciosSeleccionados.push({ ...ej });
    }
  }

  const html = ejerciciosSeleccionados.map((ej, idx) => {
    let num = ej.nums ? seleccionarAleatorio(ej.nums) : null;
    let pregunta = ej.procesarPregunta ? ej.procesarPregunta(num) : ej.pregunta.replace(/{num}/g, num);
    let opciones = ej.generarOpciones(num);
    let respuestaCorrecta = ej.respuestaCorrecta >= 0 ? ej.respuestaCorrecta : ej.respuestaCorrecta;

    if (respuestaCorrecta < 0) {
      respuestaCorrecta = opciones.findIndex(op => !op.match(/\d+/g) || parseInt(op) % (num || 1) !== 0);
    }

    const opcionesHTML = opciones.map((op, i) =>
      `<button class="option-btn" onclick="verificarRespuesta(${idx}, ${i}, ${respuestaCorrecta})">${op}</button>`
    ).join('');

    // Guardamos la explicación en un objeto global
    window.explicaciones = window.explicaciones || {};
    window.explicaciones[idx] = { explicacion: ej.explicacion, num: num, ejercicio: ej };

    return `
      <section class="mb-5">
        <div class="custom-card">
          <h3 class="section-title">Ejercicio ${idx + 1}</h3>
          <div class="exercise-card">
            <div class="exercise-question">
              <h5>${pregunta}</h5>
              ${ej.extra ? `<p class="text-muted">${ej.extra}</p>` : ''}
            </div>
            <div class="options" id="ejercicio-${idx}">
              ${opcionesHTML}
            </div>
            <div class="explanation-box" id="explicacion-${idx}"></div>
          </div>
        </div>
      </section>
    `;
  }).join('');

  document.getElementById('ejercicios-container').innerHTML = html;
}

// ============================================
// MOSTRAR EXPLICACIÓN
// ============================================

function mostrarExplicacion(ejercicioIdx) {
  const explicacionBox = document.getElementById(`explicacion-${ejercicioIdx}`);
  const datosEjercicio = window.explicaciones[ejercicioIdx];
  
  if (explicacionBox.classList.contains('show')) {
    explicacionBox.classList.remove('show');
    return;
  }
  
  if (datosEjercicio && datosEjercicio.explicacion) {
    const contenidoExplicacion = datosEjercicio.explicacion(datosEjercicio.num, datosEjercicio.ejercicio);
    explicacionBox.innerHTML = `
      <h5 style="color: #1976D2; margin-bottom: 1rem;">📖 Explicación Detallada</h5>
      ${contenidoExplicacion}
    `;
    explicacionBox.classList.add('show');
  }
}

// ============================================
// VERIFICAR RESPUESTA
// ============================================

function verificarRespuesta(ejercicioIdx, opcionIdx, correcta) {
  const container = document.getElementById(`ejercicio-${ejercicioIdx}`);
  const botones = container.querySelectorAll('.option-btn');

  botones.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  });

  if (opcionIdx === correcta) {
    botones[opcionIdx].classList.add('correct');
    ejerciciosCorrectos++;
    animarExito(botones[opcionIdx]);
  } else {
    botones[opcionIdx].classList.add('incorrect');
    botones[correcta].classList.add('correct');
  }
  
  ejerciciosResueltos++;
  actualizarProgreso();
  guardarProgresoEnMemoria(ejercicioIdx, opcionIdx === correcta);
  
  // Mostrar automáticamente la explicación después de responder
  setTimeout(() => {
    mostrarExplicacion(ejercicioIdx);
  }, 300);
}

// ============================================
// NAVEGACIÓN ENTRE PARTES
// ============================================

function mostrarParte(numeroParte) {
  // Ocultar todas las partes
  document.querySelectorAll('.parte-contenido').forEach(parte => {
    parte.classList.remove('active');
  });
  
  // Ocultar todos los botones activos
  document.querySelectorAll('.part-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar la parte seleccionada
  document.getElementById(`parte-${numeroParte}`).classList.add('active');
  
  // Activar el botón correspondiente
  document.querySelectorAll('.part-btn')[numeroParte - 1].classList.add('active');
  
  // Guardar la parte actual en localStorage
  localStorage.setItem('parteActiva', numeroParte);
  
  // Scroll suave al inicio de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Si es la parte 3 (evaluación) y no hay ejercicios generados, generarlos
  if (numeroParte === 3 && !window.ejerciciosGenerados) {
    setTimeout(() => {
      generarEjercicios();
      window.ejerciciosGenerados = true;
    }, 300);
  }
}

// ============================================
// BARRA DE PROGRESO
// ============================================

function crearBarraProgreso() {
  const ejerciciosSection = document.querySelector('#ejercicios');
  
  if (!ejerciciosSection) return;
  
  const barraHTML = `
    <div class="progress-container mb-4" style="position: sticky; top: 150px; z-index: 50; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div class="d-flex justify-content-between mb-2">
        <span><strong>Tu Progreso:</strong></span>
        <span id="progreso-texto">0/15 ejercicios completados</span>
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

function actualizarProgreso() {
  const totalEjercicios = 15;
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
    textoProgreso.textContent = `${ejerciciosResueltos}/15 ejercicios completados (${ejerciciosCorrectos} correctos)`;
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
// GUARDAR PROGRESO
// ============================================

function guardarProgresoEnMemoria(numeroEjercicio, esCorrecta) {
  progresoEjercicios[numeroEjercicio] = {
    completado: true,
    correcto: esCorrecta,
    fecha: new Date().toISOString()
  };
}

// ============================================
// RESUMEN FINAL
// ============================================

function mostrarResumenFinal() {
  const totalEjercicios = 15;
  const porcentajeExito = Math.round((ejerciciosCorrectos / totalEjercicios) * 100);
  
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
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = new bootstrap.Modal(document.getElementById('modalResumen'));
  modal.show();
  
  document.getElementById('modalResumen').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });
}

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
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Generar contenido dinámico
  generarEjemploCajas();
  generarEjemplosBasicos();
  generarEjemploCompleto(); // Solo genera el número de ejemplo
  generarTablas();
  generarGridsVisuales();
  generarAplicaciones();
  
  // No generar ejercicios automáticamente al cargar, se generarán al ir a la parte 3
  window.ejerciciosGenerados = false;
  
  // Crear barra de progreso
  crearBarraProgreso();
  
  // Restaurar la parte activa desde localStorage
  const parteGuardada = localStorage.getItem('parteActiva');
  if (parteGuardada) {
    const numeroParte = parseInt(parteGuardada);
    if (numeroParte >= 1 && numeroParte <= 3) {
      mostrarParte(numeroParte);
    }
  }
});

// Hacer funciones disponibles globalmente
window.mostrarParte = mostrarParte;
window.verificarRespuesta = verificarRespuesta;
window.mostrarExplicacion = mostrarExplicacion;
