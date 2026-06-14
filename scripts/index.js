const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// === PASO 4: FUNCIÓN GLOBAL CON PROPÓSITO ÚNICO PARA MANEJAR LA TECLA ESCAPE ===
function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      // Como closePopup está dentro del DOMContentLoaded, la llamamos de forma segura buscando el método nativo o la clase
      openedPopup.classList.remove("popup_is-opened");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // === SELECCIÓN DE ELEMENTOS EXISTENTES (PERFIL) ===
  const editPopup = document.querySelector("#edit-popup");
  const editButton = document.querySelector(".profile__edit-button");
  const closeButton = editPopup.querySelector(".popup__close");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(".popup__input_type_description");
  const editProfileForm = document.querySelector("#edit-profile-form");
  const profileSaveButton = editProfileForm.querySelector(".popup__button");

  // === SELECCIÓN DE ELEMENTOS (TARJETAS EXISTENTES) ===
  const cardsContainer = document.querySelector(".cards__list");
  const cardTemplate = document.querySelector("#card-template").content;

  // === SELECCIÓN DE ELEMENTOS PARA "AGREGAR TARJETA" ===
  const addCardPopup = document.querySelector("#new-card-popup");
  const addButton = document.querySelector(".profile__add-button"); 
  const closeAddCardButton = addCardPopup.querySelector(".popup__close"); 
  const newCardForm = document.querySelector("#new-card-form");
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");
  const cardSaveButton = newCardForm.querySelector(".popup__button");

  // === MODAL DE IMAGEN GRANDE ===
  const imagePopup = document.querySelector("#image-popup");
  const popupImageElement = imagePopup.querySelector(".popup__image");
  const popupCaptionElement = imagePopup.querySelector(".popup__caption");
  const closeImagePopupButton = imagePopup.querySelector(".popup__close");

  // Seleccionamos todos los popups de la página
  const popups = document.querySelectorAll(".popup");

  // === FUNCIONES BASE DE APERTURA Y CIERRE GENERALES ===
  function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscapeClose);
  }

  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscapeClose);
  }

  // === LÓGICA DE VALIDACIÓN INTERACTIVA GENÉRICA ===
  
  // Muestra el error buscando la clase única generada por el ID del input
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.add("popup__input_type_error");
      errorElement.textContent = errorMessage;
    }
  }

  // Remueve la línea roja y limpia el texto del error
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.remove("popup__input_type_error");
      errorElement.textContent = "";
    }
  }

  // Verifica el estado del campo y personaliza el mensaje de la URL
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      let message = inputElement.validationMessage;
      
      // Si no es un formato de link válido, forzamos el mensaje exacto de Figma
      if (inputElement.validity.typeMismatch) {
        message = "Ingresa una URL.";
      }
      
      showInputError(formElement, inputElement, message);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  // Cambia el estado del botón (active/disabled)
  function toggleButtonState(formElement, buttonElement) {
    if (!formElement.checkValidity()) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  // Limpia los estilos y textos de error previos al abrir una ventana
  function resetFormValidation(formElement, buttonElement) {
    const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
    inputs.forEach((input) => {
      hideInputError(formElement, input);
    });
    toggleButtonState(formElement, buttonElement);
  }

  // === MANEJADORES DEL PERFIL ===
  function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  function handleOpenEditModal() {
    fillProfileForm();
    resetFormValidation(editProfileForm, profileSaveButton);
    openPopup(editPopup);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(editPopup);
  }

  // === MANEJADORES DE "NUEVO LUGAR" ===
  function handleOpenAddCardModal() {
    newCardForm.reset();
    resetFormValidation(newCardForm, cardSaveButton);
    openPopup(addCardPopup);
  }

  // === MANEJADORES DE TARJETAS ===
  function handleLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  // Propósito único: eliminar el elemento card más cercano
  function handleDeleteButtonClick(evt) {
    const cardItem = evt.target.closest(".card");
    if (cardItem) {
      cardItem.remove();
    }
  }

  function handleCardImageClick(name, link) {
    popupCaptionElement.textContent = name;
    popupImageElement.src = link;
    popupImageElement.alt = name;
    openPopup(imagePopup);
  }

  // Paso 2: getCardElement sin parámetros por defecto
  function getCardElement(name, link) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener("click", handleLikeButtonClick);
    deleteButton.addEventListener("click", handleDeleteButtonClick);

    cardImage.addEventListener("click", () => {
      handleCardImageClick(name, link);
    });

    return cardElement;
  }

  function renderCard(name, link, container) {
    const newCard = getCardElement(name, link);
    container.prepend(newCard);
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    renderCard(name, link, cardsContainer);
    closePopup(addCardPopup);
    newCardForm.reset();
  }

  // Inicializar tarjetas en la galería
  initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardsContainer);
  });

  // === DETECTORES DE EVENTOS ===
  
  // Eventos del Perfil
  editButton.addEventListener("click", handleOpenEditModal);
  closeButton.addEventListener("click", () => closePopup(editPopup));
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);

  // Escuchadores en tiempo real: Formulario Perfil
  nameInput.addEventListener("input", () => {
    checkInputValidity(editProfileForm, nameInput);
    toggleButtonState(editProfileForm, profileSaveButton);
  });

  descriptionInput.addEventListener("input", () => {
    checkInputValidity(editProfileForm, descriptionInput);
    toggleButtonState(editProfileForm, profileSaveButton);
  });

  // Eventos para Agregar Tarjeta
  addButton.addEventListener("click", handleOpenAddCardModal);
  closeAddCardButton.addEventListener("click", () => closePopup(addCardPopup));
  newCardForm.addEventListener("submit", handleCardFormSubmit);

  // Escuchadores en tiempo real: Formulario Nuevo Lugar
  cardNameInput.addEventListener("input", () => {
    checkInputValidity(newCardForm, cardNameInput);
    toggleButtonState(newCardForm, cardSaveButton);
  });

  cardLinkInput.addEventListener("input", () => {
    checkInputValidity(newCardForm, cardLinkInput);
    toggleButtonState(newCardForm, cardSaveButton);
  });

  // Cierre de imagen grande
  closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

  // Paso 3: Cierre al hacer clic en la superposición (overlay)
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopup(popup);
      }
    });
  });
});