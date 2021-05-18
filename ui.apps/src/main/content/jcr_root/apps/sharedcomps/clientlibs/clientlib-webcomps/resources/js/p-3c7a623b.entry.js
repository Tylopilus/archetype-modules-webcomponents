import { r as registerInstance, h, H as Host } from './p-506c8de4.js';

const sharedModalCss = ":host{display:block;position:absolute;top:0;left:0;width:40%;margin:0 auto;background:red;height:100vh}";

const SharedModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", { class: "shared-modal-wrapper" }, h("div", { class: "shared-modal--content" }))));
  }
};
SharedModal.style = sharedModalCss;

export { SharedModal as shared_modal };
