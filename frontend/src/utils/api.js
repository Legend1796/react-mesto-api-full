export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: "include",
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  setInitialCards(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include"
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      credentials: "include",
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  setAvatar(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: "include",
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeLikeCardStatus(cardId, method) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: "include",
      method: method,
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.clone().json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.legend.students.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;