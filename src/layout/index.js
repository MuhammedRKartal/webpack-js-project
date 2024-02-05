import "./style.scss";
import Router from "./router.js";

function component() {
  Router();
  const element = document.createElement("div");

  element.innerHTML = "Canim karim";
  element.classList.add("kartal");

  return element;
}

document.body.appendChild(component());
