import "./style.scss";

function component() {
  const element = document.createElement("div");

  element.innerHTML = "Canim karim";
  element.classList.add("kartal");

  return element;
}

document.body.appendChild(component());
