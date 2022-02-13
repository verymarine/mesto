import Popup from "../components/Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();

      this.close();

  }

  close() {
    super.close();
  }
}

export default PopupDeleteCard;
