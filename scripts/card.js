// Importamos la función de apertura desde utils
import { openPopup } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Método privado para obtener la plantilla clonada del DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Métodos privados para los controladores de eventos
  _handleLikeButtonClick() {
    this._element.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null; // Liberamos memoria de la referencia
  }

  _handleCardImageClick() {
    const imagePopup = document.querySelector("#image-popup");
    const popupImageElement = imagePopup.querySelector(".popup__image");
    const popupCaptionElement = imagePopup.querySelector(".popup__caption");

    popupCaptionElement.textContent = this._name;
    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    
    openPopup(imagePopup);
  }

  // Método privado para registrar todos los escuchadores de eventos
  _setEventListeners() {
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleCardImageClick();
    });
  }

  // Método público principal que devuelve la tarjeta lista para el DOM
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}