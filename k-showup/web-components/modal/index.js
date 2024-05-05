import "./modal.scss";

export default class Modal extends HTMLElement {
  constructor() {
    super();
    this.visiblestyles = "-visible";
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

  get enableStyles() {
    return this.getAttribute("enable-styles");
  }

  set enableStyles(value) {
    this.setAttribute("enable-styles", value);
  }

  defaultStyles() {
    return `:host {
      display: none;
      width: 100%;
      height: 100%;
      max-height: 0px;
    }
    :host::before {
      background-color: #000;
      opacity: 0.5;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 40;
      position: fixed;
    }
    :host(.-visible) {
      display: block;
    }
    .k-modal {
      display: none;
      width: 100%;
      height: 100%;
      max-height: 0px;
      top: 0;
      left: 0;
      position: fixed;
    }
    .k-modal::before {
      background-color: #000;
      opacity: 0.5;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 40;
      position: fixed;
    }
    .k-modal.-visible {
      display: block;
      max-height: 100%;
      transform: translateY(0);
    }
    .k-modal-dialog {
      min-width: 40%;
      min-height: 25%;
      transform: translateY(-50%);
      transition-duration: 300ms;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      z-index: 50;
      opacity: 1;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    .k-modal-dialog__header .title {
      font-size: 18px;
      margin-bottom: 10px;
      margin-top: -10px;
    }
    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
    }
    `;
  }

  show() {
    this.classList.add(this.visiblestyles);
    document.querySelector("html").style.overflow = "hidden";
    this.dispatchEvent(new Event("show"));
  }

  dismiss() {
    this.classList.remove(this.visiblestyles);
    this.getRootNode().querySelector("html").style.overflow = "auto";
    this.dispatchEvent(new Event("dismiss"));
  }

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
    if (this.enableStyles === "true") {
      style.textContent = this.defaultStyles();
    } else {
      style.textContent = this.styles;
    }
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
      if (this.enableStyles === "true") {
        this.classList.add("k-modal");
      } else {
        console.log("here");
      }

      this.generateModalCloseButton();
    }
  }
}

customElements.define("k-modal", Modal);
