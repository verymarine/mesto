// определяю переменные для всплывающего окна редактирования профиля
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close'); 

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector('.popup__input_type_name')
const jobField = document.querySelector('.popup__input_type_job')
const profileName =document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');

// добавила ф-ю которая закрывает поп-ап
function closePopup() {
  popup.classList.remove('popup_opened')
}

// добавила ф-ю которая открывает поп-ап

function openPopup() {
  popup.classList.add('popup_opened')
  jobField.value = profileJob.textContent;
  nameField.value = profileName.textContent;
}

// изменения текста при помощи ф-ии 

function submitForm(event) {
  event.preventDefault()

  profileName.textContent = nameField.value;
  profileJob.textContent = jobField.value;

  closePopup();
}

// слушатель по клику которого открывает поп-ап
editButton.addEventListener('click', openPopup)

// слушатель по клику к-го закрывается поп-ап (нажатие на крестик)
popupCloseButton.addEventListener('click', closePopup)

// добавили слушателя клику сохранить/enter задача закрыть поп-ап и поменять значения
popupForm.addEventListener('submit', submitForm)




// function popupClickHandler(event) {

//   if (event.target.classList.contains('popup')) {
  
//   closePopup()
// }
// } 

// слушатель по клику к-го закрывается поп-ап (нажатие на любое место)
// popup.addEventListener('mouseup', popupClickHandler)