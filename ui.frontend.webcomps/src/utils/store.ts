import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  input: '',
});

onChange('input', value => {
  state.input = value;
});

export default state;
