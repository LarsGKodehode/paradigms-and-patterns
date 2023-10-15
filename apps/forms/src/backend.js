import { Utilities } from "./utilities.js";

/**
 * Mock backend
 */
export class Backend {
  /**@type {URL} */
  address;
  /**@type {string} */
  token;

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
  async _signUpUser(signupData) {
    console.info(`
    User created successfully:
      POST
      URL:${this.address}/user
      TOKEN: ${this.token}
      DATA: ${JSON.stringify(signupData)}
    `);
    await Utilities.sleep(Math.random() * 1000 + 200);
  }

  /**@param {SignUpData} signUpData */
  signUpUser = (signUpData) => this._signUpUser.call(this, signUpData);
}
