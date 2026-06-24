# Tripleten proyecto: Around The U.S. 📸

Una plataforma web interactiva diseñada como un portafolio de fotografía dinámico, donde los usuarios pueden explorar paisajes icónicos de los Estados Unidos, interactuar con el contenido y personalizar su perfil.


### Descripción del proyecto
Este proyecto es una aplicación web interactiva que permite a los usuarios explorar imágenes de lugares asombrosos alrededor de los Estados Unidos. Los usuarios pueden editar su información de perfil (nombre y ocupación), añadir nuevas tarjetas de lugares con títulos y enlaces de imágenes, dar "Me gusta" a las tarjetas, eliminar lugares y expandir las imágenes en una vista modal detallada.

El objetivo principal de este sprint fue dominar la **validación interactiva de formularios** mediante JavaScript, mejorando drásticamente la experiencia de usuario (UX) según las pautas de diseño de Figma.

### Tecnologías utilizadas
* **HTML5:** Uso de etiquetas semánticas y atributos de validación nativa (`required`, `minlength`, `maxlength`, `type="url"`, `novalidate`).
* **CSS3:** Maquetación adaptativa (Responsive Design) con Flexbox, Grid Layout, Media Queries y pseudo-clases como `:disabled`.
* **JavaScript (ES6):** Manipulación avanzada del DOM, control de eventos en tiempo real (`input`, `submit`, `keydown`), manejo de estados de validación (`validity.valid`, `typeMismatch`), y control de accesibilidad en modales (cierre mediante tecla Escape y clics en la superposición).
* **Figma:** Pixel-perfect design implementation basada en la guía de diseño interactivo.

### Características implementadas en este Sprint
1. **Validación en tiempo real:** Los campos de texto se validan carácter por carácter mostrando mensajes de error personalizados debajo del input si no cumplen las reglas de longitud o requerimiento.
2. **Mensajes personalizados:** Intercepción de errores nativos del navegador para mostrar textos específicos (como "Ingresa una URL." en el enlace de la imagen).
3. **Control dinámico del botón de envío:** El botón "Guardar" o "Crear" cambia visualmente a un estado de "apagado" (estilo gris opaco) y se bloquea si el formulario es inválido.
4. **Cierre avanzado de Modales:** Optimización de la experiencia de usuario permitiendo cerrar cualquier popup haciendo clic en el área oscura de la superposición (overlay) o pulsando la tecla `Esc`.

## Tecnologías y Metodologías Aplicadas en este Sprint
* **Programación Orientada a Objetos (POO):** Se modularizó todo el proyecto dividiendo las responsabilidades en clases independientes (`Card`, `Section`, `Popup`, `UserInfo`, etc.).
* **Módulos de JavaScript (ES6):** Uso de `import` y `export default` para conectar los scripts del navegador eficientemente.
* **Acoplamiento Débil:** Interconexión de componentes mediante funciones callback (`renderer`, `handleCardClick`) logrando un código flexible y reutilizable.

### Enlaces útiles
* [Enlace al código del repositorio en GitHub](https://github.com/Alejandra-Islas/web_project_around_es) *(Reemplaza con tu enlace real)*
* [Enlace a la página web en vivo (GitHub Pages)](https://alejandra-islas.github.io/web_project_around_es/) *(Reemplaza con tu enlace real)*