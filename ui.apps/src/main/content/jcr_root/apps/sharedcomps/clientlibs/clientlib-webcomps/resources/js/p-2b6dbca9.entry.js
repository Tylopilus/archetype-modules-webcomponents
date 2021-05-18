import { r as registerInstance, h, H as Host } from './p-506c8de4.js';

const sharedItemCss = ":host{display:block}";

const SharedItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    console.log(this.item);
    return (h(Host, null, h("slot", null)));
  }
};
SharedItem.style = sharedItemCss;

export { SharedItem as shared_item };
