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
    const formData = Utilities.formDataToObject(new FormData(this.formElement));

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

/**
 * Mock backend
 */
export class Backend {
  /**
   * @param URL} address
   * @param {string} token
   */
  constructor(address, token) {
    this.address = new URL(address);
    this.token = token;
  }

  /**
   * Mock function for sending a create user request to the backend
   *
   * @param {UserSignUpData} signupData
   */
  async signUpUser(signupData) {
    console.log(`
      POST
      URL:${this.address}/user
      TOKEN: ${this.token}
      DATA: ${JSON.stringify(signupData)}
    `);
    await Utilities.sleep(Math.random() * 1000 + 200);
    console.log("User created successfully");
  }
}

class Utilities {
  /**
   * Converts a FormData object to a standard Object
   *
   * @param {FormData} formData
   */
  static formDataToObject(formData) {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   * A promise which will resolve after the provided time
   *
   * @param {number} milliseconds
   * @returns {Promise<void>}
   */
  static sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
