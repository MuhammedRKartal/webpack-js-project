import styles from "./pop.styles.scss";

export default class PopUp extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("popup");
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
customElements.define("custom-popup", PopUp);
