export class LoadingSpinner {
  constructor(message = "문제를 추출 중입니다...") {
    this.overlay = document.createElement("div");
    this.overlay.id = "loading-overlay";

    this.spinner = document.createElement("div");
    this.spinner.className = "loading-spinner";

    this.text = document.createElement("p");
    this.text.id = "loading-text";
    this.text.textContent = message;

    this.overlay.appendChild(this.spinner);
    this.overlay.appendChild(this.text);
  }

  render() {
    return this.overlay;
  }

  show() {
    this.overlay.style.display = "flex";
  }

  hide() {
    this.overlay.style.display = "none";
  }
}
