/**
 * Counter HTML
 */
const template = `
  <div
  class="relative flex flex-col items-center w-32 gap-2 px-4 py-6 bg-gray-900 rounded-lg shadow-md"
  >
    <button
      class="absolute top-1 right-1 bg-red-500 hover:brightness-110 shadow-lg active:shadow-inner active:translate-y-[1px] transition-all duration-75 px-1.5 py-1 rounded-full text-sm w-4 h-4 overflow-hidden flex justify-center items-center"
      data-counter-button="close"
    >
      X
    </button>
    <p
      class="w-full px-2 py-1 text-lg font-bold text-gray-900 bg-gray-200 rounded-sm text-end"
    >
      0
    </p>
    <div class="flex flex-col w-full gap-1">
      <div class="flex justify-center w-full gap-1">
        <button
          class="bg-gray-700 hover:brightness-110 shadow-lg active:shadow-inner active:translate-y-[1px] transition-all duration-75 px-1.5 py-1 w-full rounded-sm"
          data-counter-button="decrement"
        >
          -
        </button>
        <button
          class="bg-gray-700 hover:brightness-110 shadow-lg active:shadow-inner active:translate-y-[1px] transition-all duration-75 px-1.5 py-1 w-full rounded-sm"
          data-counter-button="increment"
        >
          +
        </button>
      </div>
      <button
        class="bg-red-950 hover:brightness-110 shadow-lg active:shadow-inner active:translate-y-[1px] transition-all duration-75 px-1.5 py-1 rounded-sm"
        data-counter-button="reset"
      >
        Reset
      </button>
    </div>
  </div>
`;

/**
 * @param {number} initialValue
 */
export function createCounter(initialValue = 0) {
  let count = initialValue;

  const counter = document.createElement("div");
  counter.innerHTML = template;

  const display = counter.querySelector("p");
  const incrementButton = counter.querySelector(
    '[data-counter-button="increment"]'
  );
  const decrementButton = counter.querySelector(
    '[data-counter-button="decrement"]'
  );
  const resetButton = counter.querySelector('[data-counter-button="reset"]');
  const closeButton = counter.querySelector('[data-counter-button="close"]');

  function render() {
    display.textContent = count;
  }

  function increment() {
    count = count + 1;
    render();
  }

  function decrement() {
    count = count - 1;
    render();
  }

  function reset() {
    count = 0;
    render();
  }

  function close() {
    counter.remove();
  }

  incrementButton.addEventListener("click", increment);
  decrementButton.addEventListener("click", decrement);
  resetButton.addEventListener("click", reset);
  closeButton.addEventListener("click", close);

  // Update display once before returning
  render();
  return counter;
}
