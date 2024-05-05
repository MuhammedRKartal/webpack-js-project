import "./style.scss";
import Router from "./router.js";
import Header from "../partials/header/index.js";
import KShowUp from "../../k-showup/index.js";

function component() {
  Router();
  const header = new Header();
  const main = document.createElement("main");
  main.appendChild(header.element);

  const modalProps = {
    wrapperId: "my-modal",
    title: "This is my modal",
    content: "<div>Hiello</div>",
    useShadowRoot: true,
    enableStyles: true,
    modalStyles: "font-size:20px", //for shadow dom
    modalClass: "k-modal2", // for real dom
  };

  const modal = new KShowUp(modalProps);
  modal.createPopperInstance();
  modal.initializeModal();
  const instance = modal.getPopperInstance();
  const tB = document.createElement("button");
  tB.innerText = "Button";
  tB.addEventListener("click", () => {
    instance.show();
  });
  main.appendChild(tB);

  return main;
}

document.body.appendChild(component());
