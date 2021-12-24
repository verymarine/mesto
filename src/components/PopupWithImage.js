import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(".popup__image");
    this._popupCapture = document.querySelector(".popup__capture");
  }

  open(text, src) {
    super.open();
    this._popupImage.src = src;
    this._popupCapture.innerText = text;
    this._popupImage.alt = text;
  }
}

export default PopupWithImage;
