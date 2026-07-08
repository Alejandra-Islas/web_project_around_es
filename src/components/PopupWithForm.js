import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    
    // Mantenemos la consistencia con tus nombres de variables (_popupElement)
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector(".popup__button");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  // Método para extraer los valores de los inputs del formulario
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Método para cambiar el texto del botón (UX: estado de carga)
  setLoadingButtonText(text) {
    this._submitButton.textContent = text;
  }

  // Extendemos el setEventListeners del padre (Popup)
  setEventListeners() {
    // 1. Llamamos a la lógica del padre (cerrar con X, escape, overlay)
    super.setEventListeners();

    // 2. Añadimos la lógica de envío del formulario
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Ejecutamos el callback pasando los valores recolectados
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Extendemos el método close del padre para limpiar el formulario
  close() {
    super.close();
    this._formElement.reset();
  }
}