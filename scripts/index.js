import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};

// --- SELECTORES DOM ---
const editPopup = document.querySelector("#edit-popup");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const editProfileForm = document.querySelector("#edit-profile-form");

const cardsContainer = document.querySelector(".cards__list");
const addCardPopup = document.querySelector("#new-card-popup");
const addButton = document.querySelector(".profile__add-button"); 
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");

// --- INICIALIZAR VALIDACIÓN POR CADA FORMULARIO ---
const editFormValidator = new FormValidator(validationConfig, editProfileForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, newCardForm);
addCardFormValidator.enableValidation();

// --- INICIALIZAR LAS TARJETAS USANDO LA CLASE CARD ---
function renderCard(data, container) {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});

// --- ENLACE DE MANEJADORES DE POPUPS ---
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  newCardForm.reset();
  addCardFormValidator.resetValidation();
  openPopup(addCardPopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(cardData, cardsContainer);
  closePopup(addCardPopup);
});

// Cerrar haciendo clic en las X o en el overlay translúcido
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});