import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'teaser-comp',
  styleUrl: 'teaser-comp.css',
  shadow: true,
})
export class TeaserComp {
  @Element() el: HTMLElement;

  @Prop()
  text: string;

  render() {
    this.el.addEventListener('click', () => {
      console.log('hai');
    });
    return (
      <Host>
        <h1>{this.text}</h1>
      </Host>
    );
  }
}
