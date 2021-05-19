import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'shared-item',
  styleUrl: 'shared-item.css',
  shadow: true,
})
export class SharedItem {
  @Prop() item: any;
  render() {
    console.log(this.item);
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
