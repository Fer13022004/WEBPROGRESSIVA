// calculo-divisores.js
// Este archivo genera un número aleatorio y muestra sus divisores de forma automática.

// 🔹 Elegimos un número aleatorio entre 10 y 50
const numeroEjemplo = Math.floor(Math.random() * 41) + 10;
document.getElementById("numeroEjemplo").textContent = numeroEjemplo;

// 🔹 Función para obtener todos los divisores de un número
function obtenerDivisores(numero) {
  const divisores = [];
  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      divisores.push(i);
    }
  }
  return divisores;
}

// 🔹 Mostrar los divisores con pasos visuales
const resultado = obtenerDivisores(numeroEjemplo);
const resultadoDiv = document.getElementById("resultadoEjemplo");

resultado.forEach(div => {
  const paso = document.createElement("div");
  paso.classList.add("step");
  paso.textContent = `${numeroEjemplo} ÷ ${div} = ${numeroEjemplo / div} ✔️`;
  resultadoDiv.appendChild(paso);
});
