import { newE2EPage } from '@stencil/core/testing';

describe('teaser-comp', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<teaser-comp></teaser-comp>');

    const element = await page.find('teaser-comp');
    expect(element).toHaveClass('hydrated');
  });
});
