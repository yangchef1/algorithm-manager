export class Button {
  constructor(type, text, className, id) {
    this.type = type;
    this.text = text;
    this.className = className;
    this.id = id;
  }

  render() {
    const button = document.createElement("button");
    button.type = this.type;
    button.className = this.className;
    button.id = this.id;
    button.textContent = this.text;

    return button;
  }
}
