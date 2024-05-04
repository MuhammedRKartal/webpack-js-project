import Modal from "./web-components/modal/index.js";
import Popper from "./popper/index.js";

class KShowUp {
  constructor(props) {
    this.props = props;
    this.popperInstance = null;
    this.modalPack = null;
    this.modal = null;
  }

  createPopperInstance() {
    this.popperInstance = new Popper(this.props);
  }

  initializeModal(parentWrapper = document.body) {
    if (!(parentWrapper instanceof Element)) {
      throw new Error("Parent wrapper must be a valid DOM element.");
    }

    this.modal = this.popperInstance.initModal(parentWrapper);

    parentWrapper.appendChild(this.modal);
  }

  initializeModalPack(parentWrapper = document.body) {
    if (!(parentWrapper instanceof Element)) {
      throw new Error("Parent wrapper must be a valid DOM element.");
    }

    this.modalPack = this.popperInstance?.init(parentWrapper);

    parentWrapper.appendChild(this.modalPack);
  }

  getPopperInstance() {
    return this.popperInstance;
  }
}

export { KShowUp as default, Modal, Popper };
