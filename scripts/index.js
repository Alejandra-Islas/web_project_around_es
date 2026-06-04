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

initialCards.forEach((card) => {
  console.log(card.name);
});

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del popup y botones
  const editPopup = document.querySelector("#edit-popup");
  const editButton = document.querySelector(".profile__edit-button");
  const closeButton = editPopup.querySelector(".popup__close");

  // Elementos de texto de la página y campos del formulario
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(
    ".popup__input_type_description",
  );

  // El formulario de edición
  const editProfileForm = document.querySelector("#edit-profile-form");

  // Funciones base de apertura y cierre
  function openPopup() {
    editPopup.classList.add("popup_is-opened");
  }

  function closePopup() {
    editPopup.classList.remove("popup_is-opened");
  }

  // Funciones para el manejo del formulario
  function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  function handleOpenEditModal() {
    fillProfileForm();
    openPopup();
  }

  // Función manejadora para guardar los datos actualizados
  function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Detiene el envío predeterminado

    // Transfiere los valores de los inputs a los textos del perfil
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(); // Cierra el modal
  }

  // Detectores de eventos
  editButton.addEventListener("click", handleOpenEditModal);
  closeButton.addEventListener("click", closePopup);

  // Conectamos el evento submit al formulario
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);
});
