import { newE2EPage } from '@stencil/core/testing';

describe('shared-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shared-item></shared-item>');

    const element = await page.find('shared-item');
    expect(element).toHaveClass('hydrated');
  });
});
