class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    // constructor body
  }

  getAppInfo() {
    //call geruserinfo here
    return Promise.all([this.getInitialCards()])
    return Promise.all([this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers, })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
         Promise.reject(`Error: ${res.status}`);
      });
  }


  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
       Promise.reject(`Error: ${res.status}`);
    });
  }

  editAvatarInfo(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
       Promise.reject(`Error: ${res.status}`);
    });
  }


getCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
     Promise.reject(`Error: ${res.status}`);
  });
}

createCardInfo({ name, link }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "PATCH",
    headers: this._headers,
    // Send the data in the body as a JSON string.
    body: JSON.stringify({
      link,
      name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
     Promise.reject(`Error: ${res.status}`);
  });
}

deleteCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards/:cardId`, {
    method: "PATCH",
    headers: this._headers,
    // Send the data in the body as a JSON string.
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
     Promise.reject(`Error: ${res.status}`);
  });
}

likeCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards/:cardId/likes`, {
    method: "PATCH",
    headers: this._headers,
    // Send the data in the body as a JSON string.
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
     Promise.reject(`Error: ${res.status}`);
  });
}

dislikeCardInfo({ name, about }) {
  return fetch(`${this._baseUrl}/cards/:cardId/likes`, {
    method: "PATCH",
    headers: this._headers,
    // Send the data in the body as a JSON string.
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
     Promise.reject(`Error: ${res.status}`);
  });
}
}
export default Api;