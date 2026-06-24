import Card from "./Card.js"; // Recuerda quitarle las llaves { } porque ahora es export default
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

// --- INSTANCIA DE USUARIO ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description"
});

// --- INSTANCIA DEL POPUP DE IMAGEN ---
const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

// --- FUNCIÓN HELPER PARA CREAR UNA TARJETA ---
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopupInstance.open(name, link);
  });
  return card.generateCard();
}

// --- INSTANCIA DE LA SECCIÓN (RENDERIZADOR) ---
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, ".cards__list");

// Renderizar tarjetas iniciales
cardList.renderItems();

// --- POPUP: EDITAR PERFIL ---
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.description
  });
});
editProfilePopup.setEventListeners();

// --- POPUP: NUEVA TARJETA ---
const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const newCardData = {
    name: formData["place-name"],
    link: formData.link
  };
  const cardElement = createCard(newCardData);
  cardList.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// --- INICIALIZAR VALIDACIÓN ---
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editFormValidator = new FormValidator(validationConfig, editProfileForm);
const addCardFormValidator = new FormValidator(validationConfig, newCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// --- EVENT LISTENERS PARA BOTONES ---
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");

editButton.addEventListener("click", () => {
  const currentData = userInfo.getUserInfo();
  nameInput.value = currentData.name;
  descriptionInput.value = currentData.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});