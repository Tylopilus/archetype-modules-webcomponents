import { r as registerInstance, h, H as Host, a as getElement } from './p-506c8de4.js';

const teaserCompCss = ":host{display:block}";

const TeaserComp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    this.el.addEventListener('click', () => {
      console.log('hai');
    });
    return (h(Host, null, h("h1", null, this.text)));
  }
  get el() { return getElement(this); }
};
TeaserComp.style = teaserCompCss;

export { TeaserComp as teaser_comp };
