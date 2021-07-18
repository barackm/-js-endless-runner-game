import storage from './storageMock';

describe('storage', () => {
  it('should create an item', () => {
    storage.set('player', 'Barack');
    expect(storage.get('player')).toBe('Barack');
  });
  it('should get an item', () => {
    expect(storage.get('player')).toBe('Barack');
  });
  it('should remove get an item', () => {
    storage.remove('player');
    expect(storage.get('player')).toBeFalsy();
  });
  it('should not remove an item if no key is given', () => {
    expect(() => storage.remove()).toThrowError();
  });
  it('should not save an item if no key is given', () => {
    expect(() => storage.set()).toThrowError();
  });

  it('should not save an item if no value is given', () => {
    expect(() => storage.set()).toThrowError();
  });

  it('should not get an item if no key is given', () => {
    expect(() => storage.set()).toThrowError();
  });

  it('should get the current score', () => {
    storage.set('score', 200);
    expect(storage.getCurrentScore()).toBe(200);
  });

  it('should get the current score as 0 is not defined', () => {
    storage.remove('score');
    expect(storage.getCurrentScore()).toBe(0);
  });

  it('should get the highest score', () => {
    storage.set('highScore', 500);
    expect(storage.getHighestScore()).toBe(500);
  });
});
