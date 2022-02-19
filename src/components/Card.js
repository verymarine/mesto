class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._image = data.link;
    this._title = data.name;
    this._id = data._id;
    this._myId = data.currentUserId;
    this._likes = data.likes;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._ownerCard = data.owner._id;
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

    this._elementTrash = this._element.querySelector(".content__trashcan");

    if (this._myId !== this._ownerCard) {
      this._elementTrash.remove();
    }

    this._setEventListeners();
    this.setLikes(this._likes);
    return this._element;
  }

  //  слушатели событий для корзинки, лайка и открытия большой картинки
  _setEventListeners() {
    this._element
      .querySelector(".content__like")
      .addEventListener("click", () => this._handleLikeClick(this));

    this._element
      .querySelector(".content__like-counter")
      .addEventListener("click", () => this._handleLikeCounter);

    this._elementTrash.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._element
      .querySelector(".content__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }

  //ф-я удаления карточки
  removeCard() {
    this._element.remove();
  }

  // ставим лайк и убираем с отслеживанием нашего айди
  _addLikes() {
    const buttonLike = this._element.querySelector(".content__like");
    if (!this._likes.some((data) => data._id === this._myId)) {
      buttonLike.classList.remove("content__liked");
    } else {
      buttonLike.classList.add("content__liked");
    }
  }

  // счетчик лайков
  setLikes(likes) {
    this._likes = likes;
    this._element.querySelector(".content__like-counter").innerText =
      this._likes.length;
    this._addLikes();
  }

  getLikes() {
    return this._likes;
  }
}

export default Card;
