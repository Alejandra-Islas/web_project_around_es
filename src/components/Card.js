// src/components/Card.js
export default class Card { // <-- Cambiado a export default
  constructor(data, cardSelector, handleCardClick, handleLikeClick, userId) {
  this._name = data.name;
  this._link = data.link;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  
  // ¡Aquí es donde guardamos lo que faltaba!
  this._handleLikeClick = handleLikeClick; 
  this._id = data._id;                     
  this._likes = data.likes || [];          
  this._userId = userId;                   
}

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

// ÚNICA versión necesaria: la que delega la lógica al index.js
  _handleLikeButtonClick() {
    this._handleLikeClick(this._id, this._isLiked(), this);
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

_setEventListeners() {
  // Usamos la referencia guardada en lugar de hacer un nuevo querySelector
  this._likeButton.addEventListener("click", () => {
    this._handleLikeButtonClick();
  });

  this._element.querySelector(".card__delete-button").addEventListener("click", () => {
    this._handleDeleteButtonClick();
  });

  this._element.querySelector(".card__image").addEventListener("click", () => {
    this._handleCardClick(this._name, this._link);
  });
}

  _isLiked() {
    // Comprobamos si alguno de los usuarios en la lista de likes es el usuario actual
    return this._likes.some((user) => user._id === this._userId);
  }

setLikes(newLikes) {
  // 1. Actualizamos la fuente de verdad interna
  this._likes = newLikes; 
  
  // 2. Refrescamos la interfaz para que el usuario vea el cambio
  this._updateLikeView();
}

_updateLikeView() {
  // Toggle basado en si mi ID sigue o no en la lista actualizada
  this._likeButton.classList.toggle("card__like-button_is-active", this._isLiked());
  
  // Actualizamos el número de personas que dieron like
  this._likeCounter.textContent = this._likes.length;
}

generateCard() {
  this._element = this._getTemplate();
  
  // Guardamos las referencias necesarias para usar en _updateLikeView
  this._likeButton = this._element.querySelector(".card__like-button");
  this._likeCounter = this._element.querySelector(".card__like-count");
  
  this._setEventListeners();

  const cardImage = this._element.querySelector(".card__image");
  cardImage.src = this._link;
  cardImage.alt = this._name;
  this._element.querySelector(".card__title").textContent = this._name;

  // ¡Llamamos a la actualización inicial!
  this._updateLikeView();

  return this._element;
}
}