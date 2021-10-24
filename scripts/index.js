// определяю переменные для всплывающего окна редактирования профиля
const editButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close_type_edit');

// создаю переменную для инпута (который меняет имя)
const nameField = document.querySelector('.popup__input_type_name')
const jobField = document.querySelector('.popup__input_type_job')
const profileName =document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form_type_edit');

//  присвоила переменную для поп-апа Редактировать профиль
const popupEditProfile = document.querySelector('.popup_edit');

//переменная для использование карточек мест!!!!!!!!!!!
const contentPhoto = document.querySelector('.content');

// переменная темплет для распознавания контента внутри тега
const templateItem = document.querySelector('.template').content;

// переменная для формы добавления Нового места
const formAddPlace = document.querySelector('.popup__form_type_add-place');

//переменные для значений Места и ссылки картинки
const placeField = document.querySelector('.popup__input_type_place');
const linkField = document.querySelector('.popup__input_type_link'); 

//присвоила переменную для поп-апа Новое место
const popupAddPlace = document.querySelector('.popup_add');

// переменные для кнопки добавить новое место
const buttonAddPlace = document.querySelector('.profile__add-button');
// переменная для кнопки-крестика поп-ап Новое место
const buttonCloseAddPlace = document.querySelector('.popup__close_type_add-place');


const popupBigImage = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const buttonCloseImage = document.querySelector('.popup__close_type_big-image');

// ф-ии которые открывают большую картинку
// function openBigImage() {
//   popupBigImage.classList.add('popup_opened');
//   popupImage.src = article.querySelector('.content__image').src;
// };

function closeBigImage() {
  popupBigImage.classList.remove('popup_opened');
}


// добавила ф-ю которая закрывает поп-ап
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
  
}

// // добавила ф-ю которая открывает поп-ап

function openPopup() {
  popupEditProfile.classList.add('popup_opened');
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

// массив с объектами Карточек
const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ф-я открытия  поп-ап Новое место 
function openPopupAddPlace() {
  popupAddPlace.classList.add('popup_opened');
};

// ф-я закрытия поп-ап новое место
function closePopupAddPlace() {
  popupAddPlace.classList.remove('popup_opened');
};




items.forEach(prependContentBlock);

// ф-я для вставления блоков, с возможностью удаления блоков и возможностью ставить и убирать лайки у отдельных блоков
function createContentBlock(item) {
  const article = templateItem.querySelector('.content__grid').cloneNode(true);
  article.querySelector('.content__image').src = item.link;
  article.querySelector('.content__title').innerText = item.name;
  article.querySelector('.content__image').alt = item.name;

  article.querySelector('.content__image').addEventListener('click', openBigImage);

  article.querySelector('.content__trashcan').addEventListener('click',(event)=> {
  article.remove();
  });

  article.querySelector('.content__like').addEventListener('click',(event)=> {
    event.target.classList.toggle('content__liked');
    });
    function openBigImage() {
      popupBigImage.classList.add('popup_opened');
      popupImage.src = article.querySelector('.content__image').src;
      popupCapture.innerText = article.querySelector('.content__title').innerText;
      popupImage.alt = article.querySelector('.content__title').innerText;
    };

  return article;
};

// ф-я добавления блоков в начало 
function prependContentBlock(item) {
  const article = createContentBlock(item);
  contentPhoto.prepend(article) 
};

//ф-я отправления внесенных значений с дальнейшим закрытием и сбросом инфо в поп-ап
function addPlaceSubmit(event){
  event.preventDefault();
  const name = placeField.value;
  const link = linkField.value;

  const card = {
    name: name,
    link: link
  }

  prependContentBlock(card);
  closePopupAddPlace();
  event.target.reset();
};


// слушатели 
formAddPlace.addEventListener('submit', addPlaceSubmit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);
buttonCloseAddPlace.addEventListener('click', closePopupAddPlace);

// слушатель по клику которого открывает поп-ап
editButton.addEventListener('click', openPopup)

// слушатель по клику к-го закрывается поп-ап (нажатие на крестик)
popupCloseButton.addEventListener('click', closePopup)

// добавили слушателя клику сохранить/enter задача закрыть поп-ап и поменять значения
popupForm.addEventListener('submit', submitForm)

buttonCloseImage.addEventListener('click', closeBigImage)

// function popupClickHandler(event) {

//   if (event.target.classList.contains('popup')) {
  
//   closePopup()
// }
// } 

// слушатель по клику к-го закрывается поп-ап (нажатие на любое место)
// popup.addEventListener('mouseup', popupClickHandler)
