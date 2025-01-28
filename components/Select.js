export class Select {
  constructor({ id, options, placeholder }) {
    this.id = id;
    this.options = options;
    this.placeholder = placeholder;
  }

  render() {
    const select = document.createElement("select");
    select.id = this.id;
    select.className = "custom-select";
    select.required = true;

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = this.placeholder;
    select.appendChild(defaultOption);

    this.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select-wrapper";
    wrapper.appendChild(select);

    return wrapper;
  }
}
