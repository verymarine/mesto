function enableValidation(inputValidation) {
  const forms = [...document.querySelectorAll(inputValidation.formSelector)];

  forms.forEach((form) => setFormListeners(form, inputValidation));

  // console.log(forms);
}

//
function setFormListeners(form, config) {
  form.addEventListener("submit", (evt) => handlerSubmit); // !!!!!!!!!!!!!
  form.addEventListener("input", () => setSubmitButtonState(form, config));

  const inputs = [...form.querySelectorAll(config.inputSelector)];

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () =>
      handlerFieldValidation(inputElement, form, config)
    );
  });

  setSubmitButtonState(form, config);
}
//ф-я проверки кнопки
function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);

  button.disabled = !form.checkValidity();
  button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity());
}

//можно передать в сабмит без указания ивента
function handlerSubmit(evt) {
  evt.preventDefault();
}

// ф-я проверки валидности и назначения соответствующих значений (шов/хайд)
function handlerFieldValidation(input, form, config) {
  console.log(input.validity);
  // если НЕ валидная ! покажет ошибку
  if (!input.validity.valid) {
    // показывать ошибку
    showError(input, form, config);
  } else {
    // скрывать
    hideError(input, form, config);
  }
}

//ф-я которая показывает ошибку ввода призаполнении инпутов
function showError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.add(config.inputErrorClass);

  errorElement.textContent = input.validationMessage;
}

//ф-я которая скрывает ошибку ввода призаполнении инпутов
function hideError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);

  errorElement.textContent = "";
}
