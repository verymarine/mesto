// определяю переменные для всплывающего окна редактирования профиля
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close'); 


// добавила ф-ю которая закрывает поп-ап
function closePopup() {
  popup.classList.remove('popup_opened')
}

// добавила ф-ю которая открывает поп-ап

function openPopup() {
  popup.classList.add('popup_opened')
  jobField.value = ProfileJob.textContent;
  nameField.value = ProfileName.textContent;
}

// слушатель по клику которого открывает поп-ап
editButton.addEventListener('click', openPopup)

// слушатель по клику к-го закрывается поп-ап (нажатие на крестик)
popupCloseButton.addEventListener('click', closePopup)

// назначили переменную кнопке Сохранить
const formSaveButton = document.querySelector('.popup__button')


// изменения текста при помощи ф-ии 

function submitForm(event) {

  ProfileName.textContent = nameField.value;
  ProfileJob.textContent = jobField.value;

  event.preventDefault()
  closePopup();
}

// добавили слушателя клику сохранить задача закрыть поп-ап
formSaveButton.addEventListener('click', submitForm)

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector('.popup__input_name')
const jobField = document.querySelector('.popup__input_job')

const ProfileName =document.querySelector('.profile__name');
const ProfileJob = document.querySelector('.profile__job');




function popupClickHandler(event) {

  if (event.target.classList.contains('popup')) {
  
  closePopup()
}
} 

// слушатель по клику к-го закрывается поп-ап (нажатие на любое место)
popup.addEventListener('mouseup', popupClickHandler)