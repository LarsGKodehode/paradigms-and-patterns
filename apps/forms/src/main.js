import { Backend } from "./backend.js";
import { proceduralHandler } from "./form-procedural.js";
import { ObjectOrientedHandler } from "./form-object-oriented.js";
import { functionalHandler } from "./form-functional.js";

const backend = new Backend("https://www.api.example.com", "superSecretToken");

document
  .querySelector("#pro-sign-up-form")
  .addEventListener("submit", function (event) {
    proceduralHandler(this, event, backend.signUpUser);
  });

new ObjectOrientedHandler(
  document.querySelector("#oo-sign-up-form"),
  backend.signUpUser
);

document
  .querySelector("#func-sign-up-form")
  .addEventListener("submit", function (event) {
    functionalHandler(this, event, backend.signUpUser);
  });
