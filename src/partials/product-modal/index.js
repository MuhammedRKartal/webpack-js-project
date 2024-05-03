export default class ProductModal {
  constructor(props, parentElement) {
    this.props = props;
    this.modal = null;
    this.modalContent = null;
    this.modalPopUpButton = null;

    this.init(parentElement);
  }

  init(parentElement) {
    this.modal = document.createElement("k-modal");
    this.modal.className = "js-my-modal";
    this.modal.modalTitle = this.props.title || "Modal Title";

    this.createModalContent();
    this.createModalPopUpButton();

    parentElement.appendChild(this.modalPopUpButton);
    parentElement.appendChild(this.modal);
    this.modal.appendChild(this.modalContent);
  }

  createModalContent() {
    this.modalContent = document.createElement("div");
    this.modalContent.innerHTML = this.props.content || "Modal Content";
  }

  createModalPopUpButton() {
    this.modalPopUpButton = document.createElement("button");
    this.modalPopUpButton.innerText = "Click Me";
    this.modalPopUpButton.addEventListener("click", () => {
      this.modal.show();
    });
  }
}
