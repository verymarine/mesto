import "./index.css"; // добавьте импорт главного файла стилей

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  config,
  // items,
  editButton,
  formProfile,
  formAddPlace,
  nameField,
  jobField,
  linkField,
  placeField,
  buttonAddPlace,
  buttonTrashCan
} from "../utils/constants.js";
import Popup from "../components/Popup";


const popupDeleteCardTest = new Popup(".popup_delete");
popupDeleteCardTest.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(".popup_delete");
// popupDeleteCard.setEventListeners();

function openPopupDelete() {
  popupDeleteCardTest.open();
}
// buttonTrashCan.addEventListener("click", openPopupDelete);





const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();

//когда апи отработает найти айди среди списка карточек и обновить данные либо удалиту карточку удалить и туда ставить новую
//удаляю обновляю данные добавляю для лайка


// ф-я открытия большой картинки
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const userInfo = new UserInfo(".profile__name", ".profile__job");

const popupEdit = new PopupWithForm(".popup_edit", handleProfileSubmit);
popupEdit.setEventListeners();

const popupAddPlace = new PopupWithForm(".popup_add", 
handleAddCardSubmit
);
popupAddPlace.setEventListeners();

// ф-я при открытии поп-ап в формах указаны значения из профиля
function editInputValue() {
  const editUserInfo = userInfo.getUserInfo();
  jobField.value = editUserInfo.about;
  nameField.value = editUserInfo.name;

  profileFormValidator.resetValidation();
  popupEdit.open();
}

// изменения текста внутри попап редактировани при помощи ф-ии
function handleProfileSubmit(editUserInfo) {
  api.
  patchUserInfo(editUserInfo)
  .then( res => {
    userInfo.setUserInfo(res.name, res.about);
    popupEdit.close();
  })
  .catch(err => console.log(err))



}

// ф-я использования импортируемого класса Карточек
function createCard(item) {
  const card = new Card(item, ".template", handleCardClick);
  return card.render();
}

// создаю экземпляр Секшион
const section = new Section(
  {
    // items: items,
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".content"
);





// удаление карточки добавить к обработкику при нажатии которого будет удаляться карточка





// section.getCardItem();

// function handleAddCardSubmit(formData) {
//   section.addItem(createCard(formData));
// }

function handleAddCardSubmit(formData) {
  api.
  addCard(formData)
  .then(result => {
    section.addItem(createCard(result))
  })
}

// вызов функции валидности для формы профиля из класса Валидации
const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(config, formAddPlace);
addPlaceFormValidator.enableValidation();

// // слушатель по клику которого открывает поп-ап
editButton.addEventListener("click", editInputValue); //

buttonAddPlace.addEventListener("click", (evt) => {
  evt.preventDefault();
  addPlaceFormValidator.resetValidation();

  popupAddPlace.open();
});

const api = new Api({
  url: `https://nomoreparties.co/v1/cohort-35`,
  headers: {
    authorization: `81162f22-64ce-4f78-ae05-3469a7d16e15`,
    'Content-Type': `application/json`
  },
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => console.log(err));

api
  .getCards()
  .then((data) => {
    section.getCardItem(data);
  })
  .catch((err) => console.log(err));

// api
//   .patchUserInfo(data)
//   .then((res) => {
//     console.log('NAME OF PROFILE', res)
//     handleProfileSubmit(res.name, res.about)
//   })
//   .catch((err) => console.log(err));

// api
//   .postCards(data)
//   .then( result => {
//     console.log('jjjjjj', data)
//     section.addItem(createCard({...data,  id: result.id}))
//   })
//   .catch(err => console.log(err))


// api
//   .postCards(data)
//   .then( result => {
//     console.log(data);
//     const test = createCard(data)
//     console.log(test);
//     section.addItem(tst);
//   })
//   .catch(err => console.log(err))

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userData, cards]) => {
  console.log('resultat', userData.data);
})



// const api = new Api({
//   address: `https://mesto.nomoreparties.co/v1/cohort-35`,
//   token: `81162f22-64ce-4f78-ae05-3469a7d16e15`
// })

// api.getMessages()
//     .then(messages => {
//       messagesList.renderItem // тут видимо нужно выдать вызов ф-ии
//     })
    // .catch(`Error`, error)