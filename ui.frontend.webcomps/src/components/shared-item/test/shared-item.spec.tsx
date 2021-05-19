import { newSpecPage } from '@stencil/core/testing';
import { SharedItem } from '../shared-item';

describe('shared-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SharedItem],
      html: `<shared-item></shared-item>`,
    });
    expect(page.root).toEqualHtml(`
      <shared-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shared-item>
    `);
  });
});
