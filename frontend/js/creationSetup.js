/**
 * Renderiza contenido basado en el rol del usuario, permitiendo HTML personalizado.
 * @param {Object} config - Configuración para la página actual.
 * @param {string} config.roleRequired - Rol necesario para mostrar el contenido.
 * @param {string} config.containerId - ID del contenedor donde se insertará el contenido.
 * @param {string} config.html - Template string con HTML personalizado (ej: `<h1>Título</h1><p>Descripción</p>`).
 * @param {string} [config.buttonText] - Texto del botón (opcional).
 * @param {string} [config.buttonHref] - Enlace del botón (opcional).
 * @param {Function} [config.onButtonClick] - Función al hacer clic en el botón (opcional).
 */
export function renderRoleBasedContent(config) {
  const userRole = localStorage.getItem('rol');
  const container = document.getElementById(config.containerId);

  if (userRole === config.roleRequired && container) {
    // Limpiar contenedor y agregar HTML personalizado
    container.innerHTML = config.html;

    // Si se define un botón, crearlo y añadirlo al contenedor
    if (config.buttonText) {
      const button = document.createElement('button');
      button.textContent = config.buttonText;
      button.classList.add('button', 'button_color_primary');

      // Asignar acción al botón
      if (config.buttonHref) {
        button.addEventListener('click', () => {
          window.location.href = config.buttonHref;
        });
      } else if (config.onButtonClick) {
        button.addEventListener('click', config.onButtonClick);
      }

      container.appendChild(button);
    }
  } else if (container) {
    container.style.display = 'none'; // Opcional: ocultar si el rol no coincide
  }
}