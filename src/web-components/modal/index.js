import styles from "./modal.styles.scss";

class Modal extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("modal");
    const templateContent = template.content;

    const style = document.createElement("style");
    style.textContent = styles;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const paragraph = document.createElement("p");
    paragraph.innerHTML =
      "Here is some blue text with some <span> pink </span>";

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(paragraph);
  }
}

customElements.define("shop-modal", Modal);
