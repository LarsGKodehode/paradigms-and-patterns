import { Utilities } from "./utilities.js";

/**
 * The information required for creating a new user
 *
 * @typedef {{
 * alias: string,
 * password: string
 * }} SignUpData
 */

class UserSignUpData {
  /**
   * @param {SignUpData} signUpData
   */
  constructor(signUpData) {
    this.alias = signUpData.alias;
    this.password = signUpData.password;
  }
}

export class ObjectOrientedHandler {
  /**
   * @param {HTMLFormElement} formElement
   * @param {(signUpData: UserSignUpData) => Promise<void>} callback
   */
  constructor(formElement, callback) {
    this.formElement = formElement;
    this.callback = callback;
    this.formElement.addEventListener("submit", (event) =>
      this.handleFormSubmit(event)
    );
  }

  /**
   *
   * @param {SubmitEvent} event
   */
  handleFormSubmit(event) {
    event.preventDefault();

    /**@type {Partial<SignUpData>} */
    const formData = Utilities.formDataToObject(this.formElement);

    if (!Validator.validate(formData.alias, Validator.flag.REQUIRED)) {
      alert("Invalid input - Alias can not be empty!");
      return;
    }

    if (!Validator.validate(formData.password, Validator.flag.MIN_LENGTH, 8)) {
      alert("Invalid input - Password must be, at least, 8 characters!");
      return;
    }

    const newUserSignUpData = new UserSignUpData(formData);

    this.callback(newUserSignUpData)
      .then((result) => {
        this.formElement.reset();
      })
      .catch((error) => {
        alert("User Creation failed");
      });
  }
}

class Validator {
  static flag = {
    REQUIRED: "REQUIRED",
    MIN_LENGTH: "MIN_LENGTH",
  };

  /**
   * @param {string} value
   * @param {keyof typeof this.flag} flag
   * @param {number?} validatorValue
   * @returns {boolean}
   */
  static validate(value, flag, validatorValue) {
    switch (flag) {
      case this.flag.REQUIRED:
        return value.trim().length > 0;
      case this.flag.MIN_LENGTH:
        return value.trim().length > validatorValue;
      default:
        throw new Error("Validator recieved improper flag");
    }
  }
}
