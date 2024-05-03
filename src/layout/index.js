import "./style.scss";
import Router from "./router.js";
import Header from "../partials/header/index.js";
import ProductModal from "../partials/product-modal/index.js";

function component() {
  Router();
  const header = new Header();
  const main = document.createElement("main");
  main.appendChild(header.element);

  const modalProps = {
    title: "This is my modal",
    content: "<div>Hiello</div>",
  };
  new ProductModal(modalProps, main);

  return main;
}

document.body.appendChild(component());
