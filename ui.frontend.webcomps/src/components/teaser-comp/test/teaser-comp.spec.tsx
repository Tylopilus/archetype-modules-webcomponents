import { newSpecPage } from '@stencil/core/testing';
import { TeaserComp } from '../teaser-comp';

describe('teaser-comp', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TeaserComp],
      html: `<teaser-comp></teaser-comp>`,
    });
    expect(page.root).toEqualHtml(`
      <teaser-comp>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </teaser-comp>
    `);
  });
});
