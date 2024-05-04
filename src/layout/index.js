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
    useShadowRoot: true,
  };

  const modal = new ProductModal(modalProps);
  main.appendChild(modal.init());

  const denemeButton = document.createElement("button");
  denemeButton.addEventListener("click", () => {
    document.querySelector("#my-modal2").show();
  });
  denemeButton.innerText = "Shadow";
  main.appendChild(denemeButton);

  const deneme = document.createElement("template");
  deneme.innerHTML = `
    <k-modal id="my-modal2" modal-title="This is a shadow root modal" use-shadow-root="true">
      <div>Shadow modal</div>
    </k-modal>
  `;

  main.appendChild(deneme.content.cloneNode(true));

  return main;
}

document.body.appendChild(component());
