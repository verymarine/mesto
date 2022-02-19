import Popup from "../components/Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleDeleteConfirm) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__button');
    this._handleDeleteConfirm = handleDeleteConfirm;
  }

  open(card) {
    super.open();
    this._id = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      
      this._handleDeleteConfirm(this._id)
      .then(() => this.close()) 
    })


  }


}

export default PopupDeleteCard;
