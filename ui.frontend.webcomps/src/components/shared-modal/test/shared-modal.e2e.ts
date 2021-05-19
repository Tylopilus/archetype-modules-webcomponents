import { newE2EPage } from '@stencil/core/testing';

describe('shared-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shared-modal></shared-modal>');

    const element = await page.find('shared-modal');
    expect(element).toHaveClass('hydrated');
  });
});
