import { createCounter } from "./counter.js";

document.querySelector("#add-counter").addEventListener("click", () => {
  document.querySelector("main").append(createCounter());
});
