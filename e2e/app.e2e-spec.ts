import { IdealsolarcoPage } from './app.po';

describe('idealsolarco App', () => {
  let page: IdealsolarcoPage;

  beforeEach(() => {
    page = new IdealsolarcoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
