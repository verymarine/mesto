function enableValidation(inputValidation) {
  const forms = [...document.querySelectorAll(inputValidation.formSelector)];

  forms.forEach((form) => setFormListeners(form, inputValidation));

  // console.log(forms);
}

//
function setFormListeners(form, mass) {
  form.addEventListener("submit", (evt) => handlerSubmit(evt)); // !!!!!!!!!!!!!
  form.addEventListener("input", () => setSubmitButtonState(form, mass));

  const inputs = [...form.querySelectorAll(mass.inputSelector)];

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () =>
      handlerFieldValidation(inputElement, form, mass)
    );
  });

  setSubmitButtonState(form, mass);
}
//ф-я проверки кнопки
function setSubmitButtonState(form, mass) {
  const button = form.querySelector(mass.submitButtonSelector);

  button.disabled = !form.checkValidity();
  button.classList.toggle(mass.submitButtonErrorClass, !form.checkValidity());
}

//можно передать в сабмит без указания ивента
function handlerSubmit(evt) {
  evt.preventDefault();
}

// ф-я проверки валидности и назначения соответствующих значений (шов/хайд)
function handlerFieldValidation(input, form, mass) {
  console.log(input.validity);
  // если НЕ валидная ! покажет ошибку
  if (!input.validity.valid) {
    // показывать ошибку
    showError(input, form, mass);
  } else {
    // скрывать
    hideError(input, form, mass);
  }
}

//ф-я которая показывает ошибку ввода призаполнении инпутов
function showError(input, form, mass) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.add(mass.inputErrorClass);

  errorElement.textContent = input.validationMessage;
}

//ф-я которая скрывает ошибку ввода призаполнении инпутов
function hideError(input, form, mass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(mass.inputErrorClass);

  errorElement.textContent = "";
}
