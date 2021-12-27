import "./index.css"; // добавьте импорт главного файла стилей

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  config,
  items,
  editButton,
  formProfile,
  formAddPlace,
  nameField,
  jobField,
  linkField,
  placeField,
  buttonAddPlace,
} from "../utils/constants.js";

const popupImage = new PopupWithImage(".popup_picture");
popupImage.setEventListeners();

// ф-я открытия большой картинки
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const editUser = new UserInfo(".profile__name", ".profile__job");

const popupEdit = new PopupWithForm(".popup_edit", handleProfileSubmit);
popupEdit.setEventListeners();

const popupAddPlace = new PopupWithForm(".popup_add", handleAddCardSubmit);
popupAddPlace.setEventListeners();

// ф-я при открытии поп-ап в формах указаны значения из профиля
function editInputValue() {
  const editUserInfo = editUser.getUserInfo();
  jobField.value = editUserInfo.job;
  nameField.value = editUserInfo.name;

  profileFormValidator.resetValidation();
  popupEdit.open();
}

// изменения текста внутри попап редактировани при помощи ф-ии
function handleProfileSubmit(editUserInfo) {
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

function handleAddCardSubmit(formData) {
  section.addItem(createCard(formData));
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
