export default class ProductModal {
  constructor(props) {
    this.title = props.title;
    this.wrapperId = props.wrapperId;
    this.content = props.content;
    this.modalStyles = props.modalStyles;
    this.useShadowRoot = props.useShadowRoot;
    this.modal = null;
    this.modalContent = null;
    this.modalPopUpButton = null;
    this.modalPack = null;

    this.init();
  }

  init() {
    this.modalPack = document.createElement("div");

    this.modal = this.createModal();
    this.modalContent = this.createModalContent();
    this.modalPopUpButton = this.createModalPopUpButton();

    this.modal.appendChild(this.modalContent.content.cloneNode(true));
    this.modalPack.appendChild(this.modalPopUpButton);
    this.modalPack.appendChild(this.modal);

    return this.modalPack;
  }

  initModal() {
    this.modal = this.createModal();
    this.modalContent = this.createModalContent();
    this.modalPopUpButton = this.createModalPopUpButton();

    this.modal.append(this.modalContent.content.cloneNode(true));
    return this.modal;
  }

  createModal() {
    const modal = Object.assign(document.createElement("k-modal"), {
      id: this.wrapperId,
      modalTitle: this.title || "",
      styles: this.modalStyles,
      useShadowRoot: this.useShadowRoot,
    });

    return modal;
  }

  createModalContent() {
    const modalContent = document.createElement("template");
    modalContent.innerHTML = this.content || "Modal Content";
    return modalContent;
  }

  createModalPopUpButton() {
    const modalPopUpButton = document.createElement("button");
    modalPopUpButton.innerText = "Click Me";
    modalPopUpButton.addEventListener("click", () => {
      this.show();
    });
    return modalPopUpButton;
  }

  show() {
    if (!this.modal) {
      throw new Error("Modal is not initialized.");
    }
    this.modal.show();
  }

  hide() {
    if (!this.modal) {
      throw new Error("Modal is not initialized.");
    }
    this.modal.dismiss();
  }
}
