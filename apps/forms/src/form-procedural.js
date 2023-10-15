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
 * @param {SubmitEvent} event
 * @this {HTMLFormElement}
 */
export function proceduralHandler(event) {
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
  const formData = formDataToObject(new FormData(this));

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
  createUser(formData);

  // Clear out the content of the form
  this.reset();
}

// Helpers / Utilities / etc...

/**
 * Converts a FormData object to a standard Object
 *
 * @param {FormData} formData
 */
function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Mock function for sending a create user request to the backend
 *
 * @param {SignUpData} signupData
 */
async function createUser(signupData) {
  console.log("Created new user");
  console.dir(signupData);
}
