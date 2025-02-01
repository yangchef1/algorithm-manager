export class Modal {
  constructor(message, onConfirm) {
    this.message = message;
    this.onConfirm = onConfirm;
    this.createModal();
  }

  createModal() {
    this.modalOverlay = document.createElement("div");
    this.modalOverlay.id = "modal-overlay";

    const modalBox = document.createElement("div");
    modalBox.className = "modal";

    const modalMessage = document.createElement("p");
    modalMessage.className = "modal-message";
    modalMessage.textContent = this.message;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "modal-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.id = "modal-cancel";
    cancelButton.textContent = "취소";
    cancelButton.addEventListener("click", () => this.close());

    const startButton = document.createElement("button");
    startButton.id = "modal-start";
    startButton.textContent = "시작";
    startButton.addEventListener("click", () => {
      this.onConfirm();
      this.close();
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(startButton);
    modalBox.appendChild(modalMessage);
    modalBox.appendChild(buttonContainer);
    this.modalOverlay.appendChild(modalBox);
  }

  render() {
    return this.modalOverlay;
  }

  open() {
    this.modalOverlay.style.display = "flex";
  }

  close() {
    this.modalOverlay.style.display = "none";
  }
}
