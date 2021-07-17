import player from './playerMock';

describe('player', () => {
  it("Should save the player's name", () => {
    expect(player.savePlayerName('Barack')).toBe('Barack');
  });

  it("Should not save the player's if given an invalid name", () => {
    expect(() => player.savePlayerName()).toThrowError();
  });
});
