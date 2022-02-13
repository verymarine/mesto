class Card {
  constructor(data, templateSelector, handleCardClick, userid) {
    this._image = data.link;
    this._title = data.name;
    this._id = userid;//data.id
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    // console.log('id', this._id);
  }

  _getTemplate() {
    // разбиваю разметку HTML и клонирую элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".content__grid")
      .cloneNode(true);

    //возвращаю элемент карточки
    return cardElement;
  }

  getId() {
    return this._id;
  }

  // создаю карточки в которые будут передаваться данные о картинке и имени
  render() {
    this._element = this._getTemplate();

    this._element.querySelector(".content__image").src = this._image;
    this._element.querySelector(".content__title").textContent = this._title;
    this._element.querySelector(".content__image").alt = this._title;

    this._setEventListeners();
    return this._element;
  }

  //  слушатели событий для корзинки, лайка и открытия большой картинки
  _setEventListeners() {
    this._element
      .querySelector(".content__like")
      .addEventListener("click", () => this._handleLikeActive());

    this._element
      .querySelector(".content__like-counter")
      .addEventListener("click", () => this._handleLikeCounter);

    this._element
      .querySelector(".content__trashcan")
      .addEventListener("click", this._handleDeleteCard);


    this._element
      .querySelector(".content__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }





  _handleLikeCounter() {


    const hearts = document.querySelector(".content__like");
    for (let heart of hearts) {
      heart.onclick = function(e) {
        this.classList.toggle("content__liked");
        this.classList.contains("content__liked") ? e.target.nextElementSibling.textContent++ : e.target.nextElementSibling.textContent --;
       }
    }






  //   const btn = document.querySelector('.content__like');

  //   let likes = true, likeCount = document.querySelector('.content__like-counter').innerHTML;
   
  //   btn.addEventListener('click', () => {
  //     likeCount = likes ? ++likeCount : --likeCount;
  //     likes = !likes;
  //     document.querySelector('.content__like-counter').innerHTML = likeCount;
  //   });  
  }

  // переключатель лайка
  _handleLikeActive() {// добавить колбэк хендлер из вне
    this._element
      .querySelector(".content__like")
      .classList.toggle("content__liked");
  }

  // ставить кол-во лайков ф-я // сделать публичной 

  //ф-я удаления карточки
  _handleDeleteCard(evt) {
    this._element = evt.target;
    this._element.closest(".content__grid").remove();
  }
}

export default Card;
