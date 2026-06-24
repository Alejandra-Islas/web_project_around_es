// FormValidator.js
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    // Guardamos los inputs y el botón una sola vez al instanciar para mejor rendimiento
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Muestra el error usando las clases del objeto de configuración
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  }

  // Remueve la línea roja y limpia el texto del error usando la configuración
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  // Verifica la validez del campo (Mantiene tu mensaje personalizado de URL)
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      let message = inputElement.validationMessage;
      
      if (inputElement.validity.typeMismatch) {
        message = "Ingresa una URL.";
      }
      
      this._showInputError(inputElement, message);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Activa o desactiva el botón usando la clase inactiva de la configuración
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }

  // MUEVE AQUÍ EL VIEJO 'resetFormValidation': Limpia errores al reabrir popups
  resetValidation() {
    this.toggleButtonState(); // Reinicia el estado del botón
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // Limpia las líneas rojas y textos
    });
  }

  // Configura los escuchadores de eventos para cada input dentro del formulario
  _setEventListeners() {
    // Estado inicial del botón al cargar
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // FUNCIÓN PRINCIPAL: Activa la validación del formulario de la instancia
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}