import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, textButton) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._popupButton = this._popup.querySelector(".popup__button");
    this._submitHandler = submitHandler;
    this._textButton = textButton;
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((input) => (formData[input.name] = input.value));
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const text = this._popupButton.innerText;
      this._popupButton.innerText = this._textButton;
      this._popupButton.disabled = true;

      this._submitHandler(this._getInputValues()).then(() => {
        this._popupButton.innerText = text;
        this._popupButton.disabled = false;
      });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
