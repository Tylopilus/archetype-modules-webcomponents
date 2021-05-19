import { newSpecPage } from '@stencil/core/testing';
import { SharedButton } from '../shared-button';

describe('shared-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SharedButton],
      html: `<shared-button></shared-button>`,
    });
    expect(page.root).toEqualHtml(`
      <shared-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shared-button>
    `);
  });
});
