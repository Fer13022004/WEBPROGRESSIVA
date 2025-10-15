# 📚 Matemáticas Educativas - PWA

Una aplicación web progresiva (PWA) diseñada para aprender conceptos fundamentales de matemáticas de forma interactiva y práctica.

## ✨ Características

- **📱 PWA Completa**: Funciona offline, instalable, con notificaciones push
- **🎯 7 Temas Educativos**: Conceptos fundamentales de aritmética
- **💻 Responsive Design**: Funciona en móviles, tablets y desktop
- **🌙 Modo Oscuro**: Tema claro y oscuro disponible
- **📊 Seguimiento de Progreso**: Estadísticas personalizadas por tema
- **🎮 Ejercicios Interactivos**: Práctica con retroalimentación inmediata

## 📖 Temas Incluidos

1. **✖️ Múltiples de un número**

   - Calculadora interactiva
   - Ejercicios de identificación
   - Explicaciones teóricas

2. **🔢 Mínimo común múltiplo (MCM)**

   - Métodos de cálculo
   - Algoritmo paso a paso

3. **➗ Divisores de un número**

   - Identificación de divisores
   - Métodos sistemáticos

4. **✅ Criterios de divisibilidad**

   - Reglas para 2, 3 y 5
   - Verificación práctica

5. **📊 Cálculo de todos los divisores**

   - Método completo
   - Optimización de búsqueda

6. **🎯 Números primos y compuestos**

   - Identificación y propiedades
   - Criba de Eratóstenes

7. **🏆 Máximo común divisor (MCD)**
   - Algoritmo de Euclides
   - Aplicaciones prácticas

## 🚀 Estructura del Proyecto

```
WEBPROGRESSIVA/
├── index.html                 # Página principal
├── manifest.json             # Configuración PWA
├── sw.js                     # Service Worker
├── css/
│   ├── styles.css            # Estilos principales
│   └── topic-page.css        # Estilos para páginas de temas
├── js/
│   ├── app.js               # Lógica principal
│   ├── sw-register.js       # Registro del SW
│   └── multiplos.js         # Lógica específica de múltiples
├── pages/
│   ├── multiplos.html       # Página de múltiples (ejemplo)
│   ├── mcm.html            # Página de MCM
│   ├── divisores.html      # Página de divisores
│   ├── criterios.html      # Página de criterios
│   ├── todos-divisores.html # Página de todos los divisores
│   ├── primos.html         # Página de números primos
│   └── mcd.html            # Página de MCD
├── images/
│   └── [iconos PWA]        # Iconos para la aplicación
└── README.md               # Documentación
```

## 🎨 Guía de Diseño

La página principal (`index.html`) sirve como **plantilla de diseño** para todas las demás páginas. Mantiene:

### Colores principales:

- **Primario**: `#2196F3` (azul)
- **Secundario**: `#FFC107` (amarillo)
- **Éxito**: `#4CAF50` (verde)
- **Error**: `#F44336` (rojo)

### Tipografía:

- **Fuente**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**: Escalados responsivamente

### Componentes reutilizables:

- **Header**: Navegación consistente
- **Tarjetas**: Contenido organizado
- **Botones**: Interacciones uniformes
- **Formularios**: Entradas consistentes

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con CSS Grid/Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva
- **Service Worker**: Funcionalidad offline
- **Web App Manifest**: Configuración PWA
- **LocalStorage**: Persistencia de datos

## 📱 Características PWA

- ✅ **Instalable**: Se puede agregar a la pantalla de inicio
- ✅ **Offline**: Funciona sin conexión a internet
- ✅ **Responsive**: Adaptable a cualquier tamaño de pantalla
- ✅ **Segura**: Servida sobre HTTPS
- ✅ **Rápida**: Recursos cacheados localmente

## 🛠️ Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Servir** los archivos desde un servidor web (no funciona abriendo directamente los archivos)
3. **Acceder** desde un navegador moderno
4. **Instalar** como PWA desde el menú del navegador

### Servidor local rápido:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

## 🧩 Cómo Extender

Para agregar un nuevo tema:

1. **Crear página HTML** en `/pages/` usando `multiplos.html` como plantilla
2. **Crear archivo JS** específico en `/js/`
3. **Actualizar** la navegación en `index.html`
4. **Agregar** la ruta al Service Worker (`sw.js`)

### Ejemplo de nueva página:

```html
<!-- pages/mi-tema.html -->
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Usar mismo head que multiplos.html -->
  </head>
  <body>
    <!-- Usar misma estructura que multiplos.html -->
    <script src="../js/mi-tema.js"></script>
  </body>
</html>
```

## 📊 Funcionalidades Avanzadas

- **Progreso por tema**: Estadísticas guardadas localmente
- **Modo offline**: Contenido disponible sin internet
- **Tema oscuro**: Cambio dinámico de apariencia
- **Ejercicios adaptativos**: Dificultad ajustable
- **Retroalimentación inmediata**: Explicaciones contextuales

## 🔧 Configuración

Personalizar variables CSS en `:root` del archivo `styles.css`:

```css
:root {
  --primary-color: #2196f3;
  --secondary-color: #ffc107;
  /* ... más variables */
}
```

## 📈 Mejoras Futuras

- [ ] Sistema de niveles y logros
- [ ] Multiplicador en línea
- [ ] Exportar progreso
- [ ] Modo colaborativo
- [ ] Más temas de matemáticas
- [ ] Integración con APIs educativas

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para nueva funcionalidad
3. Commitear cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Equipo NOLASCO** - Desarrollo inicial

---

**📚 Hecho con ❤️ para mejorar la educación matemática**
