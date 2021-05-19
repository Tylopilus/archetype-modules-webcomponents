import { newSpecPage } from '@stencil/core/testing';
import { SharedImage } from '../shared-image';

describe('shared-image', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SharedImage],
      html: `<shared-image></shared-image>`,
    });
    expect(page.root).toEqualHtml(`
      <shared-image>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shared-image>
    `);
  });
});
