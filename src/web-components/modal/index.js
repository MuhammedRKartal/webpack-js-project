import "./modal.scss";
export default class Modal extends HTMLElement {
  constructor() {
    super();
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
    document.querySelector("html").style.overflow = "auto";
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

  onCloseButtonClick = (event) => {
    const button = event.currentTarget;
    const modal = button.closest("k-modal");

    modal.dismiss();
  };

  createModalButton = ({
    text,
    appearance = "filled",
    classList = [],
    onClick = () => {},
  }) => {
    const button = document.createElement("button");

    button.innerHTML = text;
    button.classList.add("modal-button", ...classList);
    button.appearance = appearance;
    button.size = "xl";

    button.addEventListener("click", onClick);

    return button;
  };

  getModalButtons = () => {
    const fragment = document.createDocumentFragment();
    const closeButton = this.createModalButton({
      text: trans.close,
      appearance: "outlined",
      classList: ["js-close-button"],
    });

    fragment.appendChild(closeButton);

    return fragment.childNodes;
  };

  connectedCallback() {
    const templateHtml = `
      <div class="k-modal-dialog">
        <header class="k-modal-dialog__header">
          ${
            this.modalTitle ? <span class="title">${this.modalTitle}</span> : ""
          }
          <button class="close-button js-close-button"></pz-button>
        </header>
        <div class="k-modal-dialog__content">${this.innerHTML}</div>
      </div>
    `;

    this.innerHTML = templateHtml;

    this.querySelectorAll(".js-close-button").forEach((button) =>
      button.addEventListener("click", this.onCloseButtonClick)
    );
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
