import { newE2EPage } from '@stencil/core/testing';

describe('my-tictactoe', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-tictactoe></my-tictactoe>');

    const element = await page.find('my-tictactoe');
    expect(element).toHaveClass('hydrated');
  });
});
