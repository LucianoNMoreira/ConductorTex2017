import { ConductorTex2017Page } from './app.po';

describe('conductor-tex2017 App', function() {
  let page: ConductorTex2017Page;

  beforeEach(() => {
    page = new ConductorTex2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
