import { newSpecPage } from '@stencil/core/testing';
import { SharedModal } from '../shared-modal';

describe('shared-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SharedModal],
      html: `<shared-modal></shared-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <shared-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shared-modal>
    `);
  });
});
