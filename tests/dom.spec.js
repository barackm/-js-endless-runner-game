import dom from './domMock';

describe('DOM', () => {
  it('should return the information of the current player', () => {
    expect(dom.getCurrentPlayer()).toBe('Barack');
  });
});
