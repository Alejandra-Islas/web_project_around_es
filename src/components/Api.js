export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Método para obtener la información del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then(this._checkResponse);
  }

getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._headers, // Aquí usas la propiedad de la clase
    }).then(this._checkResponse);
  }

_checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // Si res.ok es false, rechazamos la promesa con el status
    return Promise.reject(`Error: ${res.status}`);
  }

}

// Instancia configurada lista para exportar
export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "98d2649b-8e96-4637-8346-e0d571b3f4ca", // Tu token
    "Content-Type": "application/json"
  }
});

