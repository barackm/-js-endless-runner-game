import dom from './domMock';

describe('DOM', () => {
  it('should return the information of the current player', () => {
    expect(dom.getPlayerInfo()).toBe('Barack');
  });

  it('should not display the available scores if no score is given', () => {
    expect(() => dom.displayScores()).toThrow();
  });

  it('should display the available scores if given', () => {
    const scores = [
      { user: 'barack', score: 200 },
      { user: 'bill', score: 300 },
      { user: 'bob', score: 400 },
    ];
    expect(dom.displayScores(scores)[0]).toEqual({
      user: 'barack',
      score: 200,
    });
  });
});
