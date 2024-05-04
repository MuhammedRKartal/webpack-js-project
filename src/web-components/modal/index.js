import styles from "./modal.styles.scss";
import "./modal.scss";

export default class Modal extends HTMLElement {
  constructor() {
    super();
  }

  get styles() {
    return this.getAttribute("styles");
  }

  set styles(value) {
    this.setAttribute("styles", value);
  }

  get type() {
    return this.getAttribute("type") || "modal";
  }

  get modalTitle() {
    return this.getAttribute("modal-title");
  }

  set modalTitle(value) {
    this.setAttribute("modal-title", value);
  }

  get useShadowRoot() {
    return this.getAttribute("use-shadow-root");
  }

  set useShadowRoot(value) {
    this.setAttribute("use-shadow-root", value);
  }

  show = () => {
    const visiblestyles = "-visible";
    this.classList.add(visiblestyles);
    document.querySelector("html").style.overflow = "hidden";
    this.dispatchEvent(new Event("show"));
  };

  dismiss = () => {
    const visiblestyles = "-visible";
    this.classList.remove(visiblestyles);
    this.getRootNode().querySelector("html").style.overflow = "auto";
    this.dispatchEvent(new Event("dismiss"));
  };

  static show = () => {
    const modal = document.createElement("k-modal");
    document.body.appendChild(modal);
    modal.querySelectorAll(".js-close-button").forEach((button) =>
      button.addEventListener("click", () => {
        modal.remove();
      })
    );
    modal.show();
  };

  createModalButton = ({ text, classList = [], onClick = () => {} }) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add("modal-button", ...classList);
    button.addEventListener("click", onClick);
    return button;
  };

  getRealDOMContentHTML() {
    const modalWithoutShadowRoot = `
      <div class="k-modal-dialog">
        <header class="k-modal-dialog__header">
          ${this.modalTitle ? `<h1 class="title">${this.modalTitle}</h1>` : ""}
          <button class="close-button js-close-button">×</button>
        </header>
        <div class="k-modal-dialog__content">
          ${this.innerHTML}
        </div>
      </div>`;

    return modalWithoutShadowRoot;
  }

  getShadowDOMContentHTML() {
    const modalWithShadowRoot = `
      <div class="k-modal-dialog">
        <header class="k-modal-dialog__header">
          ${this.modalTitle ? `<h1 class="title">${this.modalTitle}</h1>` : ""}
          <button class="close-button js-close-button">×</button>
        </header>
        <div class="k-modal-dialog__content">
          <slot></slot>
        </div>
      </div>
    `;

    return modalWithShadowRoot;
  }

  getContentHTML() {
    if (this.useShadowRoot === "true") {
      return this.getShadowDOMContentHTML();
    }
    return this.getRealDOMContentHTML();
  }

  generateModalCloseButton() {
    if (this.useShadowRoot === "true") {
      this.shadowRoot
        .querySelectorAll(".js-close-button")
        .forEach((button) =>
          button.addEventListener("click", () => this.dismiss())
        );
    } else {
      this.querySelectorAll(".js-close-button").forEach((button) =>
        button.addEventListener("click", () => this.dismiss())
      );
    }
  }

  generateStyles() {
    const style = document.createElement("style");
    style.textContent = styles;
    return style;
  }

  connectedCallback() {
    if (this.useShadowRoot === "true") {
      this.attachShadow({ mode: "open" });

      this.shadowRoot.appendChild(this.generateStyles());

      const template = document.createElement("template");
      template.innerHTML = this.getContentHTML();

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.generateModalCloseButton();
    } else {
      const modalWithoutShadowRoot = this.getContentHTML();
      this.innerHTML = modalWithoutShadowRoot;
      this.classList.add("k-modal");

      this.generateModalCloseButton();
    }
  }
}

customElements.define("k-modal", Modal);
