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
  editButton,
  formProfile,
  formAddPlace,
  nameField,
  jobField,
  buttonAddPlace,
  formAvatar,
  avatarField,
  avatarButton,
} from "../utils/constants.js";

// экземпляр класса попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(
  ".popup_delete",
  handleDeleteConfirm
);
popupDeleteCard.setEventListeners();

// ф-я с помощью которой мы передаем на сервер айди карточки которую удалим и совершаем удаление
function handleDeleteConfirm(card) {
  return api
    .deleteCard(card.getId())
    .then(() => card.removeCard())
    .catch((err) => console.log("Ошибка при удалении карточки", err));
}

// ф-я открытия поап удаления карточки
function handleDeleteCard(cardId) {
  popupDeleteCard.open(cardId);
}

// попап открытия большой картинки
const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();

// ф-я открытия большой картинки
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// экземпляр класса с информацией о пользователе
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__avatar"
);

// экземпляр класса формы редактирования профиля (имени и о себе)
const popupEdit = new PopupWithForm(
  ".popup_edit",
  handleProfileSubmit,
  "Сохранение..."
);
popupEdit.setEventListeners();

// экземпляр класса формы добавления новой карточки
const popupAddPlace = new PopupWithForm(
  ".popup_add",
  handleAddCardSubmit,
  "Создать"
);
popupAddPlace.setEventListeners();

// экземпляр класа формы измнения аватара
const popupAvatar = new PopupWithForm(
  ".popup_avatar",
  handleAvatarSubmit,
  "Сохранение..."
);
popupAvatar.setEventListeners();

// ф-я при открытии поп-ап в формах указаны значения из профиля (имя и о себе)
function editInputValue() {
  const editUserInfo = userInfo.getUserInfo();
  jobField.value = editUserInfo.about;
  nameField.value = editUserInfo.name;

  profileFormValidator.resetValidation();
  popupEdit.open();
}

// ф-я при открытии поп-ап смены аватара
function avatarInputValue() {
  // const avatarUserInfo = userInfo.getUserInfo();
  // const test = avatarField.value;
  // avatarUserInfo.avatar = test;

  avatarFormValidator.resetValidation();
  popupAvatar.open();
  console.log("avatar", avatarUserInfo.avatar);
}

// ф-я  передачи на сервер информации о редактировании профиля ( имя и о себе)
function handleProfileSubmit(editUserInfo) {
  api
    .patchUserInfo(editUserInfo)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch((err) => console.log(err));
}

// ф-я передачи на сервер информации о смене аватара
function handleAvatarSubmit(data) {
  api
    .patchAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => console.log(err));
  // debugger
}

// ф-я использования импортируемого класса Карточек
function createCard(item) {
  const card = new Card(
    { ...item, currentUserId: currentUserId },
    ".template",
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
  return card.render();
}

//  ф-я переключателя лайка с передачей на сервер
function handleLikeClick(card) {
  const userId = userInfo.getUserInfo().id;
  const userLiked = card.getLikes().some((user) => user._id === userId);

  if (!userLiked) {
    api
      .putLike(card.getId())
      .then((cardData) => {
        card.setLikes(cardData.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .deleteLike(card.getId())
      .then((cardData) => {
        card.setLikes(cardData.likes);
      })
      .catch((err) => console.log(err));
  }
}

// создаю экземпляр класса секция
const section = new Section(
  {
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".content"
);

// ф-я передачи на сервер информации о добвлении новой карточки
function handleAddCardSubmit(formData) {
  api
    .addCard(formData)
    .then((result) => {
      section.addItem(createCard(result));
      popupAddPlace.close();
    })
    .catch((err) => console.log("Ошибка при добавлении новой карточки", err));
}

// создание экземпляров валидности для форм редактирования профиля, добавление карточки и смены аватара
const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(config, formAddPlace);
addPlaceFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation();

// // слушатель по клику которого открывает поп-ап редактирования профиля
editButton.addEventListener("click", editInputValue); //

// слушатель по клику которого открывается поап аватара
avatarButton.addEventListener("click", avatarInputValue);

// слушатель по клику которого открывается попап добавление карточки
buttonAddPlace.addEventListener("click", (evt) => {
  evt.preventDefault();
  addPlaceFormValidator.resetValidation();

  popupAddPlace.open();
});

// экземпляр класса АПИ
const api = new Api({
  url: `https://nomoreparties.co/v1/cohort-35`,
  headers: {
    authorization: `81162f22-64ce-4f78-ae05-3469a7d16e15`,
    "Content-Type": `application/json`,
  },
});

let currentUserId = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userInfo.setId(userData._id);

    section.getCardItem(cards);
  })
  .catch((err) => console.log("Ошибка", err));

// удаление карточки добавить к обработкику при нажатии которого будет удаляться карточка

// section.getCardItem();

// function handleAddCardSubmit(formData) {
//   section.addItem(createCard(formData));
// }

// api
//   .getUserInfo()
//   .then((data) => {
//     userInfo.setUserInfo(data.name, data.about);

//   })
//   .catch((err) => console.log(err));

// api
//   .getCards()
//   .then((data) => {
//     section.getCardItem(data);
//   })
//   .catch((err) => console.log(err));

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

// const api = new Api({
//   address: `https://mesto.nomoreparties.co/v1/cohort-35`,
//   token: `81162f22-64ce-4f78-ae05-3469a7d16e15`
// })

// api.getMessages()
//     .then(messages => {
//       messagesList.renderItem // тут видимо нужно выдать вызов ф-ии
//     })
// .catch(`Error`, error)
