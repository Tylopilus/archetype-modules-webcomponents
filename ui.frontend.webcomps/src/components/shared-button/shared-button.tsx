import { Component, Host, h, Prop } from '@stencil/core';
import state from '../../utils/store';

@Component({
  tag: 'shared-button',
  styleUrl: 'shared-button.css',
  shadow: true,
})
export class SharedButton {
  @Prop() name: string;

  render() {
    return (
      <Host>
        <div>
          hi {this.name}, {state.input}
        </div>
      </Host>
    );
  }
}
