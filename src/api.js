import axios from 'axios';

const createGame = () => {
  const gameName = 'My-Endless-Ranner';
  const endPoint =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
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
    .then((res) => {})
    .catch((ex) => {});
};

const getScores = () => {
  let scores = [];
  const endPoint =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Utjjs97PsorRmRIQPs34/scores';
  axios({
    method: 'get',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    scores = res.data;
  });
  return scores;
};

const createScore = (player, score) => {
  const endPoint =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Utjjs97PsorRmRIQPs34/scores';
  axios({
    method: 'post',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      user: player,
      score: score,
    },
  }).then((res) => {
    console.log(res);
  });
};

export default { createGame, getScores, createScore };

// Utjjs97PsorRmRIQPs34
