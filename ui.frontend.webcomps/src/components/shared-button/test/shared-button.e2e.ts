import { newE2EPage } from '@stencil/core/testing';

describe('shared-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shared-button></shared-button>');

    const element = await page.find('shared-button');
    expect(element).toHaveClass('hydrated');
  });
});
