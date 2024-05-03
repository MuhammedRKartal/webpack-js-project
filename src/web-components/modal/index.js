export default class Modal extends HTMLElement {
  constructor() {
    super();

    // Create a Shadow DOM and attach it to the element
    this.attachShadow({ mode: "open" });
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

  set className(value) {
    if (typeof value === "object") {
      this.classList.add(...value);
    } else {
      this.classList.add(value);
    }
  }

  show = () => {
    const visibleClassName = "-visible";

    this.classList.add(visibleClassName);
    document.querySelector("html").style.overflow = "hidden";
    this.dispatchEvent(new Event("show"));
  };

  dismiss = () => {
    const visibleClassName = "-visible";

    this.classList.remove(visibleClassName);
    this.shadowRoot.host.getRootNode().querySelector("html").style.overflow =
      "auto";
    this.dispatchEvent(new Event("dismiss"));
  };

  static show = ({ content, title, className }) => {
    const modal = document.createElement("k-modal");

    modal.innerHTML = content;

    if (title) {
      modal.modalTitle = title;
    }

    if (className) {
      modal.className = className;
    }

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

  connectedCallback() {
    const template = document.createElement("template");

    template.innerHTML = `
      <style>
      :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }

      :host(.-visible) {
        display: block;
      }

      .k-modal {
        display: none;
        top: 0;
        left: 0;
        background-color: black;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        max-height: 0px;
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      .k-modal-dialog__header .title{
        font-size:18px;
        margin-bottom:10p;
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
      </style>

      <div class="k-modal-dialog">
        <header class="k-modal-dialog__header">
          ${this.modalTitle ? `<h1 class="title">${this.modalTitle}</h1>` : ""}
          <button class="close-button js-close-button">×</button>
        </header>
        <div class="k-modal-dialog__content">
          ${this.innerHTML}
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Attach event listeners within the Shadow DOM
    this.shadowRoot.querySelectorAll(".js-close-button").forEach((button) => {
      button.addEventListener("click", () => this.dismiss());
    });
  }
}

customElements.define("k-modal", Modal);

setTimeout(() => {
  document.querySelectorAll("[data-modal]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const modalSelector = e.currentTarget.getAttribute("data-modal");
      const modal = document.querySelector(modalSelector);

      modal.show();
    });
  });
}, 0);
