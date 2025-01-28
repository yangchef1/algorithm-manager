export class InputWrapper {
  static wrap(component, hint) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("input-group");
    wrapper.appendChild(component);

    const inputHint = document.createElement("small");
    inputHint.classList.add("input-hint");
    inputHint.textContent = hint;
    wrapper.appendChild(inputHint);
    return wrapper;
  }
}
