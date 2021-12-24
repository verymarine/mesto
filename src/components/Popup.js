class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._close = this._popup.querySelector(".popup__close");
    this._escButton = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escButton);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escButton);
  
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      if (this._popup.classList.contains("popup_opened")) {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._close.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
