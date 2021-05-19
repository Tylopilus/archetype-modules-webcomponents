import { newSpecPage } from '@stencil/core/testing';
import { MyTictactoe } from '../my-tictactoe';

describe('my-tictactoe', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyTictactoe],
      html: `<my-tictactoe></my-tictactoe>`,
    });
    expect(page.root).toEqualHtml(`
      <my-tictactoe>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-tictactoe>
    `);
  });
});
