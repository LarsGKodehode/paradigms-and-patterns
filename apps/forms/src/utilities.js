export class Utilities {
  /**
   * Converts a FormData object to a standard Object
   *
   * @param {HTMLFormElement} formData
   */
  static formDataToObject(form) {
    const formData = new FormData(form);
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
