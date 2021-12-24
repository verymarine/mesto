class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      .querySelector(".content__trashcan")
      .addEventListener("click", this._handleDeleteCard);

    this._element
      .querySelector(".content__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._title, this._image);
      });
  }

  // переключатель лайка
  _handleLikeActive() {
    this._element
      .querySelector(".content__like")
      .classList.toggle("content__liked");
  }

  //ф-я удаления карточки
  _handleDeleteCard(evt) {
    this._element = evt.target;
    this._element.closest(".content__grid").remove();
  }
}

export default Card;
