import api from './apiMock';
import 'babel-polyfill';

describe('API', () => {
  it('should create a game to if the name is valid', () => api.createGame('My game').then((data) => {
    expect(data).toBeTruthy();
  }));
  it('should not create a game to if the name is valid', () => api.createGame('').then((data) => {
    expect(data.message).toBe('You need to provide a valid name for the game');
  }));
  it('should create a score if given the Player and the score', () => api.createScore(400, 'Freddy').then((data) => {
    expect(data.result).toBe('Leaderboard score created correctly.');
  }));
  it('should not create a score if no player is given', () => api.createScore(400, '').then((data) => {
    expect(data.message).toBe('You need to provide a valid user for the score');
  }));
  it('should not create a score if no score is given', () => api.createScore('Player').then((data) => {
    expect(data.message).toBe('You need to provide a valid user for the score');
  }));
  it('should return the score if the game ID is valid', () => api.getScores('1rH0MSSJmOLLRS7YU5oQ').then((data) => {
    expect(data.result.length).toBeGreaterThan(0);
  }));
  it('should not return the score if the game ID is invalid', () => api.getScores('maths').then((data) => {
    expect(data.message).toBeFalsy();
  }));
});
