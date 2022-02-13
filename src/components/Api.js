import PopupDeleteCard from "./PopupDeleteCard";


function response(res) {
  return res.ok 
  ? res.json()
  : Promise.reject(`Ошибка ${res.status}`);
}

class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
      .then(response)
    }

    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      })
      .then(response)
    }

    patchUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,

        body: JSON.stringify({
          name: data.name,
          about: data.about
        }) 

      })
      .then(response)
    }

    addCard(data) {
      return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,

            body: JSON.stringify({
              name: data.name,
              link: data.link
            })
    })
    .then(response)

  }
}

// deleteCard(cardId) {
//   return fetch(`${this._url}/cards/cardId`, {
//     method: 'DELETE',
//     headers: this._headers,

//   })
//   .then(response)
// }



    // postCards(data) {
    //   return fetch(`${this._url}/cards`, {
    //     method: 'POST',
    //     headers: this._headres,
    //     body: JSON.stringify({
    //       name: data.name,
    //       link: data.link
    //     })
    //   })
    //     .then(response)

      
    // }



  // getCard() {
  //   return fetch(`${this._url}/cards`, {
  //     headers: {
  //       authorization: `81162f22-64ce-4f78-ae05-3469a7d16e15`,
  //     },
  //   }).then((response) => { // result
  //     if (response.ok) {
  //       return response.json()
  //     } else {
  //       return Promise.reject(`ошибка ${response.status}`);
  //     } 
  //   });
  // }

  // addMessage(data) {
  //   return fetch()
  // }


export default Api;
