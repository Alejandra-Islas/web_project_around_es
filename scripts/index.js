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

  // === NUEVA SELECCIÓN A NIVEL SUPERIOR: MODAL DE IMAGEN GRANDE ===
  const imagePopup = document.querySelector("#image-popup");
  const popupImageElement = imagePopup.querySelector(".popup__image");
  const popupCaptionElement = imagePopup.querySelector(".popup__caption");
  const closeImagePopupButton = imagePopup.querySelector(".popup__close");

  // === FUNCIONES BASE DE APERTURA Y CIERRE GENERALES ===
  function openPopup(popup) {
    popup.classList.add("popup_is-opened");
  }

  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  }

  // === MANEJADORES DEL PERFIL ===
  function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  function handleOpenEditModal() {
    fillProfileForm();
    openPopup(editPopup);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(editPopup);
  }

  // === MANEJADORA PARA EL BOTÓN "ME GUSTA" ===
  function handleLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  // === MANEJADORA PARA EL BOTÓN "ELIMINAR" ===
  function handleDeleteButtonClick(evt) {
    const cardItem = evt.target.closest(".card");
    cardItem.remove();
  }

  // === NUEVA FUNCIÓN MANEJADORA PARA ABRIR LA IMAGEN EN GRANDE ===
  function handleCardImageClick(name, link) {
    // 1. Establece el texto del pie de foto (caption)
    popupCaptionElement.textContent = name;
    // 2. Establece el src de la imagen del modal
    popupImageElement.src = link;
    // 3. Establece el alt de la imagen del modal
    popupImageElement.alt = name;
    // 4. Abre el modal usando tu función openPopup
    openPopup(imagePopup);
  }

  // === MANEJADORES DE LAS TARJETAS ===
  function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Detectores de eventos para Me gusta y Eliminar
    likeButton.addEventListener("click", handleLikeButtonClick);
    deleteButton.addEventListener("click", handleDeleteButtonClick);

    // NUEVO: Establecer un detector de clics en la imagen de la tarjeta
    cardImage.addEventListener("click", () => {
      handleCardImageClick(name, link);
    });

    return cardElement;
  }

  function renderCard(name, link, container) {
    const newCard = getCardElement(name, link);
    container.prepend(newCard);
  }

  // Función controladora para el formulario de tarjetas
  function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    renderCard(name, link, cardsContainer);
    closePopup(addCardPopup);
    newCardForm.reset();
  }

  // Renderizar las tarjetas iniciales al cargar la página
  initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardsContainer);
  });

  // === DETECTORES DE EVENTOS ===
  
  // Eventos del Perfil
  editButton.addEventListener("click", handleOpenEditModal);
  closeButton.addEventListener("click", () => closePopup(editPopup));
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);

  // Eventos para Agregar Tarjeta
  addButton.addEventListener("click", () => openPopup(addCardPopup));
  closeAddCardButton.addEventListener("click", () => closePopup(addCardPopup));
  newCardForm.addEventListener("submit", handleCardFormSubmit);

  // NUEVO: Detector de clics en el botón de cierre del modal de la imagen grande
  closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));
});