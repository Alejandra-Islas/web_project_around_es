// Muestra el error usando las clases del objeto de configuración
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}

// Remueve la línea roja y limpia el texto del error usando la configuración
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}

// Verifica la validez del campo
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    let message = inputElement.validationMessage;
    
    if (inputElement.validity.typeMismatch) {
      message = "Ingresa una URL.";
    }
    
    showInputError(formElement, inputElement, message, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Activa o desactiva el botón usando la clase inactiva de la configuración
function toggleButtonState(formElement, buttonElement, config) {
  if (!formElement.checkValidity()) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

// FUNCIÓN GLOBAL: Resetea los errores y el botón (la usaremos en index.js)
function resetFormValidation(formElement, buttonElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    hideInputError(formElement, input, config);
  });
  toggleButtonState(formElement, buttonElement, config);
}

// Configura los escuchadores de eventos para cada input dentro de un formulario
function setEventListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Estado inicial del botón
  toggleButtonState(formElement, buttonElement, config);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, buttonElement, config);
    });
  });
}

// FUNCIÓN PRINCIPAL QUE PIDE EL SPRINT: Encuentra todos los formularios y los activa
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Evita el comportamiento por defecto
    });
    setEventListeners(formElement, config);
  });
}