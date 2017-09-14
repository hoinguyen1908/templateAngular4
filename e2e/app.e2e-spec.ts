import { DigitalportalPage } from './app.po';

describe('digitalportal App', () => {
  let page: DigitalportalPage;

  beforeEach(() => {
    page = new DigitalportalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
