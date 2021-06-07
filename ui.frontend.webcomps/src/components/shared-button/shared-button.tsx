import { Component, Host, h, Prop, State } from '@stencil/core';
import state from '../../utils/store';

@Component({
  tag: 'shared-button',
  styleUrl: 'shared-button.css',
  shadow: false,
})
export class SharedButton {
  @Prop() name: string;
  @State()
  load: boolean = false;

  private loadHandler = () => {
    this.load = true;
  };

  render() {
    return (
      <Host>
        <div>
          hi {this.name}, {state.input}
        </div>
        <button onClick={this.loadHandler}>load tic</button>
        {this.load && <my-tictactoe reset="hallo"></my-tictactoe>}
      </Host>
    );
  }
}
