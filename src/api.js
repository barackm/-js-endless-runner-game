import axios from 'axios';

const createGame = async () => {
  const gameName = 'My-Endless-Ranner';
  const endPoint =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const response = await axios({
    method: 'post',
    url: endPoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      name: JSON.stringify(gameName),
    },
  });
  const data = response.data;
  return data;
};

const getScores = () => {};

export default { createGame };

// Utjjs97PsorRmRIQPs34
