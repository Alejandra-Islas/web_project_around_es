// src/components/Card.js
export default class Card { // <-- Cambiado a export default
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButtonClick() {
    this._element.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

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