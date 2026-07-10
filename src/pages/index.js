import Card from "../components/Card.js"; // Recuerda quitarle las llaves { } porque ahora es export default
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js"; // Importa la instancia de Api
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//const initialCards = [
//  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
//  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
//  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
//  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
//  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
//  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
//];

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

let userId = null; // Esta variable vivirá en el alcance del index.js

const handleLikeClick = (id, isLiked, cardInstance) => {
  if (isLiked) {
    api.removeLike(id)
      .then(() => cardInstance.setLike(false))
      .catch((err) => console.error(err));
  } else {
    api.addLike(id)
      .then(() => cardInstance.setLike(true))
      .catch((err) => console.error(err));
  }
};

const deleteCardPopup = new PopupWithConfirmation("#delete-popup");
deleteCardPopup.setEventListeners();

// --- INSTANCIA DEL POPUP DE IMAGEN ---
const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    (name, link) => { imagePopupInstance.open(name, link); },
    handleLikeClick,
    (id, cardInstance) => {
      // Configuramos la acción del popup de confirmación
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCard(id) // Usamos el método que ya creaste en Api.js
          .then(() => {
            cardInstance.removeCard(); // Borra visualmente
            deleteCardPopup.close();   // Cierra la ventana
          })
          .catch((err) => console.error("Error al borrar:", err));
      });
      deleteCardPopup.open();
    },
    userId
  );
  // Asegúrate de que el objeto 'data' pase el owner._id
  return card.generateCard();
}

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card); // Esto funcionará bien porque la función renderer 
                            // se ejecutará cuando cardList YA esté definida.
  }
}, ".cards__list");

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // <--- ¡Guardamos el ID aquí!
    
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about
    });
    
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales:", err);
  });

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  editProfilePopup.setLoadingButtonText("Guardando...");
  
  api.updateUserInfo(formData.name, formData.description)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        description: result.about
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar perfil:", err);
    })
    .finally(() => {
      editProfilePopup.setLoadingButtonText("Guardar");
    });
});
editProfilePopup.setEventListeners();

// --- POPUP: NUEVA TARJETA ---
const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  addCardPopup.setLoadingButtonText("Guardando...");
  

  api.addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      cardList.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error al crear tarjeta:", err);
    })
    .finally(() => {
      addCardPopup.setLoadingButtonText("Guardar");
    });
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
  
  // Usamos las variables que definiste arriba en lugar de buscar en el DOM otra vez
  nameInput.value = currentData.name;
  descriptionInput.value = currentData.description;
  
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
