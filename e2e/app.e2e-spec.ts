import { EuromillionsPage } from './app.po';

describe('euromillions App', function() {
  let page: EuromillionsPage;

  beforeEach(() => {
    page = new EuromillionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
