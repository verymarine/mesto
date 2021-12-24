import "./index.css"; // добавьте импорт главного файла стилей

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_check_invalid", //класс который отображает невалидность вставленной информации в инпут
  submitButtonSelector: ".popup__button",
  submitButtonErrorClass: "popup__button_type_unactive",
};

// массив с объектами Карточек
const items = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// определяю переменные для всплывающего окна редактирования профиля
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__button");

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector(".popup__input_type_name");
const jobField = document.querySelector(".popup__input_type_job");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form_type_edit");

// переменная для формы добавления Нового места
const formAddPlace = document.querySelector(".popup__form_type_add-place");

//переменные для значений Места и ссылки картинки
const placeField = document.querySelector(".popup__input_type_place");
const linkField = document.querySelector(".popup__input_type_link");
// const placeAddButton = formAddPlace.querySelector(".popup__button");

// переменные для кнопки добавить новое место
const buttonAddPlace = profile.querySelector(".profile__add-button");

// ф-я при открытии поп-ап в формах указаны значения из профиля
function editInputValue() {
  const editUserInfo = editUser.getUserInfo();
  jobField.value = editUserInfo.job;
  nameField.value = editUserInfo.name;

  profileFormValidator.resetValidation();
  popupEdit.open();
}

// изменения текста внутри попап редактировани при помощи ф-ии
function submitHandlerEdit(editUserInfo) {
  debugger;
  editUser.setUserInfo(editUserInfo.name, editUserInfo.job);

  popupEdit.close();
}

// ф-я использования импортируемого класса Карточек
function createCard(item) {
  const card = new Card(item, ".template", handleCardClick);
  return card.render();
}

// создаю экземпляр Секшион
const section = new Section(
  {
    items: items,
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".content"
);

section.getCardItem();

const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();

// ф-я открытия большой картинки
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const editUser = new UserInfo(".profile__name", ".profile__job");

const popupEdit = new PopupWithForm(".popup_edit", submitHandlerEdit);
popupEdit.setEventListeners();

const popupAddPlace = new PopupWithForm(".popup_add", submitHandler);
popupAddPlace.setEventListeners();

function submitHandler() {
  debugger;
  const cardData = {
    name: placeField.value,
    link: linkField.value,
  };
  section.addItem(createCard(cardData));
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
  placeField.value = "";
  linkField.value = "";

  addPlaceFormValidator.resetValidation();

  popupAddPlace.open();
});