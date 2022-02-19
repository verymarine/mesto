export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_check_invalid", //класс который отображает невалидность вставленной информации в инпут
  submitButtonSelector: ".popup__button",
  submitButtonErrorClass: "popup__button_type_unactive",
};

// // массив с объектами Карточек
// export const items = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

// определяю переменные для всплывающего окна редактирования профиля
export const profile = document.querySelector(".profile");
export const editButton = profile.querySelector(".profile__button");

// переменная для кнопки редактировать аватар 
export const avatarButton =profile.querySelector(".profile__button-avatar");

// // создаю переменную для инпута (который меняет имя)
export const nameField = document.querySelector(".popup__input_type_name");
export const jobField = document.querySelector(".popup__input_type_job");
// export const profileName = profile.querySelector(".profile__name");
// export const profileJob = profile.querySelector(".profile__job");
// переменная для инпута аватара
export const avatarField = document.querySelector(".popup__input_type_avatar");

//переменная для формы Редактирования профиля (Имя и о себе)
export const formProfile = document.querySelector(".popup__form_type_edit");

// переменная для формы добавления Нового места
export const formAddPlace = document.querySelector(".popup__form_type_add-place");

//перемення для формы редактирования аватара
export const formAvatar = document.querySelector(".popup__form_type_avatar");

//переменные для значений Места и ссылки картинки
export const placeField = document.querySelector(".popup__input_type_place");
export const linkField = document.querySelector(".popup__input_type_link");
// const placeAddButton = formAddPlace.querySelector(".popup__button");

// переменные для кнопки добавить новое место
export const buttonAddPlace = profile.querySelector(".profile__add-button");

export const buttonTrashCan = document.querySelector(".content__trashcan");
