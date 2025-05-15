class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers, })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }


  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }


  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatarInfo(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }


getCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "GET",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(this._checkResponse);
}

createCardInfo({ name, link }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      link,
      name,
    }),
  }).then(this._checkResponse);
}

deleteCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards/:cardId`, {
    method: "DELETE",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(this._checkResponse);
}

likeCardInfo(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers,
  }).then(this._checkResponse);
}

dislikeCardInfo(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers,
  }).then(this._checkResponse);
}
}

export default Api;