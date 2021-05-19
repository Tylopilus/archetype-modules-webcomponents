import { Component, Host, h, Listen, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'shared-image',
  styleUrl: 'shared-image.css',
  shadow: false,
})
export class SharedImage {
  clickHandler() {
    console.log('hallo');
    this.sharedEvent.emit('eventTest');
  }

  @Listen('sharedEvent')
  sharedEventHandler(event: CustomEvent<string>) {
    console.log(event);
  }

  @Event() sharedEvent: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div onClick={this.clickHandler.bind(this)}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
