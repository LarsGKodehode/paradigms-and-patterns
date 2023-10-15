import { proceduralHandler } from "./form-procedural.js";
import { ObjectOrientedHandler, Backend } from "./form-object-oriented.js";

const backend = new Backend("https://www.api.example.com", "superSecretToken");

document
  .querySelector("#pro-sign-up-form")
  .addEventListener("submit", proceduralHandler);

new ObjectOrientedHandler(
  document.querySelector("#oo-sign-up-form"),
  backend.signUpUser
);
