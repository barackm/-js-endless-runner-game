// import api from './API';
import api from './api';
import dom from './dom';
import player from './player';
// import api from './api';

window.onload = () => {
  console.log('helloooo');
  dom.getPlayerInfo();
  submitInput();
  api.createGame();
  // const game = api.createGame();
  // console.log(game);
};

const submitInput = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name-input');
    player.savePlayerName(name.value);
    name.value = '';
  });
};
