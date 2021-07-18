import axios from 'axios';
import dom from './dom';
import storage from './localstorage';

const createGame = () => {
  const gameName = 'My-Endless-Ranner';
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  axios({
    method: 'post',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      name: JSON.stringify(gameName),
    },
  })
    .then((res) => res.data)
    .catch((ex) => {
      dom.showAlert(ex.message);
    });
};

const sort = (obj) => {
  const array = [];
  for (let i = 0; i < obj.length; i += 1) {
    array.push([obj[i].score, obj[i].user]);
  }
  return Array.from(array).sort((a, b) => b[0] - a[0]);
};

const getScores = () => {
  let result = [];
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kxW1mOoFoAGFar3MjOoW/scores';
  axios({
    method: 'get',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    const { data } = res;
    result = sort(data.result);
    storage.set('highScore', result[0]);
    dom.displayScores(result);
  }).catch((ex) => {
    dom.showAlert(ex.message);
  });
  return result;
};

const createScore = (score) => {
  storage.set('score', score);
  const player = storage.get('player') || '';
  const myScore = { user: player, score };
  const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kxW1mOoFoAGFar3MjOoW/scores';
  axios({
    method: 'post',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      user: myScore.user,
      score: myScore.score,
    },
  }).then(() => {
    getScores();
  }).catch((ex) => {
    dom.showAlert(ex.message);
  });
};

export default { createGame, getScores, createScore };
