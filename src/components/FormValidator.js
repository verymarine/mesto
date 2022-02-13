export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  enableValidation() {
    this._setFormListeners();
  }

  _setFormListeners() {
    this._form.addEventListener("submit", (evt) => this._handlerSubmit(evt));
    this._form.addEventListener("input", () => this._setSubmitButtonState());

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () =>
        this._handlerFieldValidation(inputElement)
      );
    });

    this._setSubmitButtonState();
  }

  // ф-я проверки кнопки
  _setSubmitButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(
      this._config.submitButtonErrorClass,
      !this._form.checkValidity()
    );
  }

  // можно передать в сабмит без указания ивента
  _handlerSubmit(evt) {
    evt.preventDefault();
  }

  // ф-я проверки валидности и назначения соответствующих значений (шов/хайд)
  _handlerFieldValidation(input) {
    // console.log(input.validity); 
    // если НЕ валидная ! покажет ошибку
    if (!input.validity.valid) {
      // показывать ошибку
      this._showError(input);
    } else {
      // скрывать
      this._hideError(input);
    }
  }

  // ф-я которая показывает ошибку ввода призаполнении инпутов
  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);

    errorElement.textContent = input.validationMessage;
  }

  //ф-я которая скрывает ошибку ввода призаполнении инпутов
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);

    errorElement.textContent = "";
  }

  resetValidation() {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
}
