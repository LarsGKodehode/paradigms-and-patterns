import { Utilities } from "./utilities.js";
/**
 * The information required for creating a new user
 *
 * @typedef {{
 * alias: string,
 * password: string
 * }} SignUpData
 */

const VALIDATION_FLAG = {
  REQUIRED: "REQUIRED",
  MIN_LENGTH: "MIN_LENGTH",
};

/**
 * @param {string} value
 * @param {keyof typeof this.flag} flag
 * @param {number?} validatorValue
 * @param {typeof VALIDATION_FLAG} validation_flags
 * @returns {boolean}
 */
function validate(value, flag, validatorValue) {
  switch (flag) {
    case VALIDATION_FLAG.REQUIRED:
      return value.trim().length > 0;
    case VALIDATION_FLAG.MIN_LENGTH:
      return value.trim().length > validatorValue;
    default:
      throw new Error("Validator recieved improper flag");
  }
}

function validateSignUpData(signUpObject) {
  /** @type {SignUpData} */
  const validated = {};

  if (!validate(signUpObject.alias, VALIDATION_FLAG.REQUIRED)) {
    alert("Invalid input - Alias can not be empty!");
    return;
  }
  validated.alias = signUpObject.alias;

  if (!validate(signUpObject.password, VALIDATION_FLAG.MIN_LENGTH, 8)) {
    alert("Invalid input - Password must be, at least, 8 characters!");
    return;
  }
  validated.password = signUpObject.password;

  return validated;
}

/**
 * @param {HTMLFormElement} formElement
 * @param {SubmitEvent} event
 * @param {(signUpData: SignUpData) => Promise<void>} callback
 */
export function functionalHandler(formElement, event, callback) {
  event.preventDefault();

  /**@type {Partial<SignUpData>} */
  const formData = Utilities.formDataToObject(formElement);

  const signUpData = validateSignUpData(formData);

  callback(formData)
    .then((result) => {
      formElement.reset();
    })
    .catch((error) => {
      alert("User Creation failed");
    });
}
