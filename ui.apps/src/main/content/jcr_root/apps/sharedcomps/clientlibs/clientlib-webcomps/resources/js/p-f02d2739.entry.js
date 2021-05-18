import { r as registerInstance, c as createEvent, h, H as Host } from './p-506c8de4.js';

const sharedImageCss = ":host{display:block}";

const SharedImage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sharedEvent = createEvent(this, "sharedEvent", 7);
  }
  clickHandler() {
    console.log('hallo');
    this.sharedEvent.emit('eventTest');
  }
  sharedEventHandler(event) {
    console.log(event);
  }
  render() {
    return (h(Host, null, h("div", { onClick: this.clickHandler.bind(this) }, h("slot", null))));
  }
};
SharedImage.style = sharedImageCss;

export { SharedImage as shared_image };
