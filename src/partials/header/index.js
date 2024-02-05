export default class Header extends HTMLElement {
  constructor() {
    super();
    this.createHeader();
  }

  createHeader = () => {
    const header = document.createElement("div");
    header.className = "header";

    const headerMenu = document.createElement("k-modal");

    header.appendChild(headerMenu);
  };
}

customElements.define("header-menu", Header);
