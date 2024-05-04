import "./style.scss";
import Router from "./router.js";
import Header from "../partials/header/index.js";
import ProductModal from "../partials/popper/index.js";

function component() {
  Router();
  const header = new Header();
  const main = document.createElement("main");
  main.appendChild(header.element);

  const modalProps = {
    wrapperId: "my-modal",
    title: "This is my modal",
    content: "<div>Hiello</div>",
    useShadowRoot: false,
    enableStyles: true,
  };

  const modal = new ProductModal(modalProps);
  main.appendChild(modal.init());

  return main;
}

document.body.appendChild(component());
