import { Utilities } from "./utilities.js";

/**
 * The information required for creating a new user
 *
 * @typedef {{
 * alias: string,
 * password: string
 * }} SignUpData
 */

/**
 * Handles the signup in a procedural way
 *
 * @param {HTMLFormElement} form
 * @param {SubmitEvent} event
 * @param {(signUpData: SignUpData) => Promise<void>} callback
 */
export function proceduralHandler(form, event, callback) {
  // We will be making use of booth the event object
  // and the "this" context, you could do some
  // validation of these types to ensure that
  // the handler is called in the correct way

  // We are handling the submit logic with JavaScript
  // This disables the default logic which sends a request
  // and drops the state of the document
  event.preventDefault();

  // Convert form data to an object
  /**@type {Partial<SignUpData>} */
  const formData = Utilities.formDataToObject(form);

  // Validate the fields
  if (
    typeof formData.alias === "undefined" ||
    formData.alias.trim().length === 0
  ) {
    alert("Invalid input - Alias can not be empty!");
    return;
  }

  if (
    typeof formData.password === "undefined" ||
    formData.password.trim().length < 8
  ) {
    alert("Invalid input - Password must be, at least, 8 characters!");
    return;
  }

  // Form has passed validation, do something with it
  callback(formData)
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      alert("User Creation failed");
      console.log(error);
    });
}
