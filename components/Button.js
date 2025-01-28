export class Button {
  constructor(type, text) {
    this.text = text;
  }

  render() {
    const button = document.createElement("button");
    button.type = this.type;
    button.className = "submit-btn";
    button.textContent = this.text;

    return button;
  }
}
