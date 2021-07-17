import 'babel-polyfill';

const fetch = require('node-fetch');

const createGame = async (gameName) => {
  const name = {
    gameName,
  };
  const game = JSON.stringify(name);
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: game,
  };
  const response = await fetch(endPoint, params);
  const answer = await response.json();
  return answer;
};

const createScore = async (score, player) => {
  const myScore = { user: player, score };
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1rH0MSSJmOLLRS7YU5oQ/scores';
  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myScore),
  };
  const response = await fetch(endPoint, params);
  const result = await response.json();
  return result;
};

const getScores = async (gameID) => {
  const endPoint = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`;
  const params = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(endPoint, params);
  const result = await response.json();
  return result;
};

export default { createGame, createScore, getScores };
