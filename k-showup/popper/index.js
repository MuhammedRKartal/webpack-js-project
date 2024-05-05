export default class Popper {
  constructor(props) {
    const {
      title,
      wrapperId,
      content,
      modalStyles,
      modalClass,
      useShadowRoot,
      enableStyles,
      buttonText,
    } = props;

    this.title = title;
    this.wrapperId = wrapperId;
    this.content = content;
    this.modalStyles = modalStyles;
    this.modalClass = modalClass;
    this.useShadowRoot = useShadowRoot;
    this.enableStyles = enableStyles;
    this.buttonText = buttonText || "Click Me";

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
      modalClass: this.modalClass,
      useShadowRoot: this.useShadowRoot,
      enableStyles: this.enableStyles,
    });

    return modal;
  }

  createModalContent() {
    const modalContent = document.createElement("template");
    modalContent.innerHTML = this.content;
    return modalContent;
  }

  createModalPopUpButton() {
    const modalPopUpButton = document.createElement("button");
    modalPopUpButton.innerText = this.buttonText;
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
