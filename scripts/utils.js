export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}