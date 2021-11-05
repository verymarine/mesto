// определяю переменные для всплывающего окна редактирования профиля
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__button");

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector(".popup__input_type_name");
const jobField = document.querySelector(".popup__input_type_job");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
const popupForm = document.querySelector(".popup__form_type_edit");

//кнопка-крестик у поп-ап
const popupCloseButton = document.querySelector(".popup__close_type_edit");

//  присвоила переменную для поп-апа Редактировать профиль
const popupEditProfile = document.querySelector(".popup_edit");

// переменная для формы добавления Нового места
const formAddPlace = document.querySelector(".popup__form_type_add-place");

//переменные для значений Места и ссылки картинки
const placeField = document.querySelector(".popup__input_type_place");
const linkField = document.querySelector(".popup__input_type_link");

//присвоила переменную для поп-апа Новое место
const popupAddPlace = document.querySelector(".popup_add");

// переменные для кнопки добавить новое место
const buttonAddPlace = profile.querySelector(".profile__add-button");

// переменная для кнопки-крестика поп-ап Новое место
const buttonCloseAddPlace = document.querySelector(
  ".popup__close_type_add-place"
);

//переменная для использование карточек мест
const contentPhoto = document.querySelector(".content");

// переменная темплет для распознавания контента внутри тега
const templateItem = document.querySelector(".template").content;

// переменные для сосздания поп-ап большой картинки
const popupBigImage = document.querySelector(".popup_picture");
const popupImage = document.querySelector(".popup__image");
const popupCapture = document.querySelector(".popup__capture");

// добавления кнопки-крестика для большой картинки
const buttonCloseImage = document.querySelector(".popup__close_type_big-image");

//ф-я которая открывает поп-ап
function openPopup(popup) {
  // setSubmitButtonState(form, mass);
  popup.classList.add("popup_opened");
}

// добавила ф-ю которая закрывает поп-ап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// ф-я закрытия поп-ап Редактирования профиля
function closeEditProfile() {
  closePopup(popupEditProfile);
}

// ф-я при открытии поп-ап в формах указаны значения из профиля
function valueEditInput() {
  openPopup(popupEditProfile);
  jobField.value = profileJob.textContent;
  nameField.value = profileName.textContent;
}

// изменения текста при помощи ф-ии
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileJob.textContent = jobField.value;

  closePopup(popupEditProfile);
}

// ф-я открытия  поп-ап Новое место
function openPopupAddPlace(evt) {
  openPopup(popupAddPlace);
  placeField.value = '';
  linkField.value = '';
}

function closePopupAddPlace(evt) {
  closePopup(popupAddPlace);
}

//удаление карточки Места
function handleDeleteCard(evt) {
  const deleteElement = evt.target;
  deleteElement.closest(".content__grid").remove();
}

//добавление лайка
function handleLikeActive(evt) {
  const likeElement = evt.target;
  likeElement.classList.toggle("content__liked");
}

// ф-я открытия большой картинки
function openBigImage(evt) {
  openPopup(popupBigImage);

  const card = evt.target.closest(".content__grid");
  popupImage.src = card.querySelector(".content__image").src;
  popupCapture.innerText = card.querySelector(".content__title").innerText;
  popupImage.alt = card.querySelector(".content__title").innerText;
}

function closeBigImage() {
  closePopup(popupBigImage);
}

// ф-я
function setEventListener(card) {
  card
    .querySelector(".content__trashcan")
    .addEventListener("click", handleDeleteCard);
  card
    .querySelector(".content__like")
    .addEventListener("click", handleLikeActive);
  card.querySelector(".content__image").addEventListener("click", openBigImage);
}

// ф-я для вставления блоков, с возможностью удаления блоков и возможностью ставить и убирать лайки у отдельных блоков
function createContentBlock(item) {
  const card = templateItem.querySelector(".content__grid").cloneNode(true);
  card.querySelector(".content__image").src = item.link;
  card.querySelector(".content__title").innerText = item.name;
  card.querySelector(".content__image").alt = item.name;

  setEventListener(card);
  return card;
}

// ф-я добавления блоков в начало
function prependContentBlock(item) {
  const card = createContentBlock(item);
  contentPhoto.prepend(card);
}

//ф-я отправления внесенных значений с дальнейшим закрытием и сбросом инфо в поп-ап
function addPlaceSubmit(evt) {
  evt.preventDefault();
  const name = placeField.value;
  const link = linkField.value;
  const card = {
    name,
    link,
  };

  prependContentBlock(card);
  closePopup(popupAddPlace);
  evt.target.reset();
}

items.forEach(prependContentBlock);

// слушатель по клику которого открывает поп-ап
editButton.addEventListener("click", valueEditInput);

// слушатель по клику к-го закрывается поп-ап (нажатие на крестик)
popupCloseButton.addEventListener("click", closeEditProfile);

// добавили слушателя клику сохранить/enter задача закрыть поп-ап и поменять значения
popupForm.addEventListener("submit", handleEditFormSubmit);

// слушатели  для добавления и удаления места
formAddPlace.addEventListener("submit", addPlaceSubmit);
buttonAddPlace.addEventListener("click", openPopupAddPlace);
buttonCloseAddPlace.addEventListener("click", closePopupAddPlace);

// слушатель для кнопки-крестика большой картинки
buttonCloseImage.addEventListener("click", closeBigImage);

// ф-я закрытия попапа нажатием в пустоту
function popupClickHandler(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(popup);
  }
}

// слушатель по клику к-го закрывается поп-ап (нажатие на любое место)
document.addEventListener("mouseup", popupClickHandler);

const mass = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_check_invalid", //класс который отображает невалидность вставленной информации в инпут
  submitButtonSelector: ".popup__button",
  submitButtonErrorClass: "popup__button_type_unactive",
};

// слушатель с ф-ей обработки по клавише ESC
document.addEventListener("keydown", function closePopupEscape(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
});

// вызов функции валидности
enableValidation(mass);
