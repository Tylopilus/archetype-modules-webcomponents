import { newE2EPage } from '@stencil/core/testing';

describe('shared-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shared-image></shared-image>');

    const element = await page.find('shared-image');
    expect(element).toHaveClass('hydrated');
  });
});
