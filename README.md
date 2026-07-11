# Tripleten proyecto: Around The U.S. 📸

Una plataforma web interactiva diseñada como un portafolio de fotografía dinámico, donde los usuarios pueden explorar paisajes icónicos de los Estados Unidos, interactuar con el contenido y personalizar su perfil.


### Descripción del proyecto
Este proyecto es una aplicación web interactiva que permite a los usuarios gestionar su perfil y contenido fotográfico. Los usuarios pueden editar su información personal, cambiar su foto de perfil, añadir nuevas tarjetas de lugares, dar "Me gusta", eliminar tarjetas y expandir imágenes.

El proyecto se ha transformado en una aplicación dinámica que consume una API REST, manejando datos reales desde un servidor, implementando validaciones de formularios robustas y mejorando la experiencia de usuario (UX) mediante estados de carga y feedback visual.

### Tecnologías utilizadas
* **HTML5:** Estructura semántica para contenedores de perfil y modales.
* **CSS3:** Diseño responsivo (Flexbox, Grid), transiciones y estados de interacción (:hover, :disabled).
* **JavaScript (ES6):** 
    -Programación Asíncrona: Uso de fetch, promesas (Promise.all), y async/await para comunicación con el servidor.
    -POO: Modularización mediante clases (Api, UserInfo, Card, PopupWithForm, Section, FormValidator).
    -Manipulación del DOM: Actualización dinámica de interfaces tras respuestas de API.
* **Metodologías:** BEM para nomenclatura de clases CSS y arquitectura de código modular.

### Características implementadas en este Sprint
Integración con API: Sincronización de datos con el servidor para obtener el perfil de usuario y las tarjetas iniciales, así como la persistencia de cambios (PATCH, POST, DELETE).

Experiencia de Usuario (UX) Mejorada: Implementación de feedback visual ("Guardando...") en todos los formularios mediante promesas, asegurando que el usuario sepa cuándo se están procesando sus cambios.

Gestión de Avatar: Funcionalidad para actualizar la foto de perfil del usuario, incluyendo validación del enlace y un contenedor personalizado con icono de edición.

Validación interactiva: Validación en tiempo real con bloqueo de botones de envío y mensajes de error personalizados.

Cierre avanzado de Modales: Soporte para cerrar popups mediante tecla Esc y clics en el overlay.

## Tecnologías y Metodologías Aplicadas en este Sprint
* **Programación Orientada a Objetos (POO):** Se modularizó todo el proyecto dividiendo las responsabilidades en clases independientes (`Card`, `Section`, `Popup`, `UserInfo`, etc.).
* **Módulos de JavaScript (ES6):** Uso de `import` y `export default` para conectar los scripts del navegador eficientemente.
* **Acoplamiento Débil:** Interconexión de componentes mediante funciones callback (`renderer`, `handleCardClick`) logrando un código flexible y reutilizable.

### Enlaces útiles
* [Enlace al código del repositorio en GitHub](https://github.com/Alejandra-Islas/web_project_around_es) *(Reemplaza con tu enlace real)*
* [Enlace a la página web en vivo (GitHub Pages)](https://alejandra-islas.github.io/web_project_around_es/) *(Reemplaza con tu enlace real)*