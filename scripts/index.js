import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

//  переменная всех попапов
const popups = document.querySelectorAll(".popup");

// определяю переменные для всплывающего окна редактирования профиля
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__button");

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector(".popup__input_type_name");
const jobField = document.querySelector(".popup__input_type_job");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form_type_edit");

//  присвоила переменную для поп-апа Редактировать профиль
const popupEditProfile = document.querySelector(".popup_edit");

// переменная для формы добавления Нового места
const formAddPlace = document.querySelector(".popup__form_type_add-place");

//переменные для значений Места и ссылки картинки
const placeField = document.querySelector(".popup__input_type_place");
const linkField = document.querySelector(".popup__input_type_link");
// const placeAddButton = formAddPlace.querySelector(".popup__button");

//присвоила переменную для поп-апа Новое место
const popupAddPlace = document.querySelector(".popup_add");

// переменные для кнопки добавить новое место
const buttonAddPlace = profile.querySelector(".profile__add-button");

// переменная для кнопки-крестика поп-ап Новое место
const buttonCloseAddPlace = document.querySelector(
  ".popup__close_type_add-place"
);

//переменная для использование карточек мест
const cardsContainer = document.querySelector(".content");

// переменные для сосздания поп-ап большой картинки
const popupBigImage = document.querySelector(".popup_picture");
const popupImage = document.querySelector(".popup__image");
const popupCapture = document.querySelector(".popup__capture");

//ф-я которая открывает поп-ап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  //слушатель нажатия кнопки
  document.addEventListener("keydown", closeByEscape);
}

// добавила ф-ю которая закрывает поп-ап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  //слушатель нажатия кнопки
  document.removeEventListener("keydown", closeByEscape);
}

// ф-я при открытии поп-ап в формах указаны значения из профиля
function editInputValue() {
  openPopup(popupEditProfile);
  jobField.value = profileJob.textContent;
  nameField.value = profileName.textContent;

  profileFormValidator.resetValidation();
}

// изменения текста внутри попап редактировани при помощи ф-ии
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileJob.textContent = jobField.value;

  closePopup(popupEditProfile);
}

// ф-я открытия  поп-ап Новое место
function openPopupAddPlace(evt) {
  debugger;
  openPopup(popupAddPlace);
  placeField.value = "";
  linkField.value = "";

  addPlaceFormValidator.resetValidation();
}

// ф-я открытия большой картинки
function openBigImage(evt) {
  openPopup(popupBigImage);

  const card = evt.target.closest(".content__grid");
  popupImage.src = card.querySelector(".content__image").src;
  popupCapture.innerText = card.querySelector(".content__title").innerText;
  popupImage.alt = card.querySelector(".content__title").innerText;
}

//ф-я закрытия попап нажатием кнопки эскейп
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//ф-я закрытия поп-апов при нажатии оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

// ф-я использования импортируемого класса Карточек
function createCard(item) {
  const card = new Card(item, ".template", openBigImage);
  return card.generateCard();
}

// отдельная ф-я добавления карточек в начало
function prependContentBlock(item) {
  cardsContainer.prepend(item);
}

// добавление карточки вперед вызов
items.forEach(function (item) {
  prependContentBlock(createCard(item));
}); // вызвать функцию с эддкард и препендконтентблок

//ф-я отправления внесенных значений с дальнейшим закрытием и сбросом инфо в поп-ап
function addPlaceSubmit(evt) {
  debugger;
  evt.preventDefault();
  const name = placeField.value;
  const link = linkField.value;
  const card = {
    name,
    link,
  };
  if (name != "" && link != "") {
    prependContentBlock(createCard(card));
    closePopup(popupAddPlace);
    evt.target.reset();
  }
}

// вызов функции валидности для формы профиля из класса Валидации
const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(config, formAddPlace);
addPlaceFormValidator.enableValidation();

// слушатель по клику которого открывает поп-ап
editButton.addEventListener("click", editInputValue);

// добавили слушателя клику сохранить/enter задача закрыть поп-ап и поменять значения
formProfile.addEventListener("submit", handleEditFormSubmit);

// слушатели  для добавления места
formAddPlace.addEventListener("submit", addPlaceSubmit);
buttonAddPlace.addEventListener("click", openPopupAddPlace);
