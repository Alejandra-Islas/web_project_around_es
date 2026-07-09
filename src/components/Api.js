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
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers, // Aquí usas la propiedad de la clase
    }).then(this._checkResponse);
  }

updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }

// Método para añadir un "me gusta"
// Cambia esto:
// fetch(`${this._baseUrl}/cards/likes/${cardId}`, ...

// Por esto (asegúrate de que el ID vaya antes de "/likes"):
addLike(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers
  }).then(this._checkResponse);
}

removeLike(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers
  }).then(this._checkResponse);
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

