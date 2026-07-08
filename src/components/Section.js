// Section.js
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item); // El renderer solo crea el elemento
    });
  }

  addItem(element) {
    this._container.append(element); // Añadimos al contenedor
  }
}