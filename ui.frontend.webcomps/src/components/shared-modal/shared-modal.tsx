import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'shared-modal',
  styleUrl: 'shared-modal.scss',
  shadow: false,
})
export class SharedModal {
  render() {
    return (
      <Host>
        <div class="shared-modal-wrapper">
          <div class="shared-modal--content"></div>
        </div>
      </Host>
    );
  }
}
