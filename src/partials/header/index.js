class Header {
  constructor() {
    this.element = createHeaderElement();
  }
}

function createHeaderElement() {
  const header = document.createElement("header");
  const heading = document.createElement("h1");
  heading.textContent = "My Header";
  header.appendChild(heading);
  return header;
}

export default Header;
