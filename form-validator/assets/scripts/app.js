class Validator {
  static MIN_LENGTH = 'MIN_LENGTH';
  static EMAIL = 'EMAIL';
  static CONFIRM_PASSWORD = 'CONFIRM_PASSWORD';
  static validate(inputValue, flag, validatorValue) {
    switch (flag) {
      case this.MIN_LENGTH:
        return inputValue.trim().length >= validatorValue;

      case this.EMAIL:
        return validatorValue.test(inputValue);

      case this.CONFIRM_PASSWORD:
        return inputValue === validatorValue;

      default:
        return false;
    }
  }
}
class getInput {
  constructor(inputName) {
    this.inputEl = document.getElementById(inputName);
  }

  getEl() {
    return this.inputEl;
  }

  getValue() {
    return this.inputEl.value;
  }
}

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ErrorHandler {
  constructor(elName) {
    this.el = new getInput(elName);
  }
  toggleError(flag, validatorValue, msg) {
    if (!Validator.validate(this.el.getValue(), flag, validatorValue)) {
      this.el.getEl().classList.remove('success');
      this.el.getEl().classList.add('error');
      this.el.getEl().nextElementSibling.innerText = msg;
      FormHandler.formValid = false;
    } else {
      this.el.getEl().nextElementSibling.innerHTML = '';
      this.el.getEl().classList.add('success');
      FormHandler.formValid = true;
    }
  }
}
class FormHandler {
  static formValid = false;

  constructor() {
    this.formEl = document.forms[0];
    this.formEl.addEventListener('submit', this.handleSumbit);
  }

  handleSumbit(e) {
    e.preventDefault();

    new ErrorHandler('name').toggleError(
      'MIN_LENGTH',
      3,
      'Username must be at least 3 characters'
    );
    new ErrorHandler('email').toggleError(
      'EMAIL',
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email is not valid'
    );

    new ErrorHandler('password').toggleError(
      'MIN_LENGTH',
      6,
      'Password must be at least 6 characters'
    );

    if (
      !Validator.validate(
        new getInput('confirmPassword').getValue(),
        'MIN_LENGTH',
        1
      )
    ) {
      new ErrorHandler('confirmPassword').toggleError(
        'MIN_LENGTH',
        1,
        'Confirm password is required'
      );
    } else {
      new ErrorHandler('confirmPassword').toggleError(
        'CONFIRM_PASSWORD',
        new getInput('password').getValue(),
        'Confirm password is not match'
      );
    }
    if (FormHandler.formValid) {
      const user = new User(
        new getInput('name').getValue(),
        new getInput('email').getValue(),
        new getInput('password').getValue()
      );

      console.log(user);
    }
  }
}

const formHandler = new FormHandler();
