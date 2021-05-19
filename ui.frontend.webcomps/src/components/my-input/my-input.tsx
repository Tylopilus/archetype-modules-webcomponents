import { Component, Host, h, State } from '@stencil/core';
import state from '../../utils/store';

@Component({
  tag: 'my-input',
  styleUrl: 'my-input.css',
  shadow: true,
})
export class MyInput {
  @State() text: string;

  private handleChange = event => {
    this.text = (event.target as HTMLInputElement).value;
    state.input = this.text;
  };

  private handleClick = () => {
    this.text = '';
  };

  private loadState = () => {
    this.text = state.input;
  };

  render() {
    return (
      <Host>
        <input type="text" value={this.text} onInput={this.handleChange}></input>
        <button onClick={this.handleClick}>clear</button>
        <button onClick={this.loadState}>load</button>
      </Host>
    );
  }
}
