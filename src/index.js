import api from './api';
import dom from './dom';
import player from './player';

const submitInput = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name-input');
    player.savePlayerName(name.value);
    name.value = '';
  });
};

window.onload = () => {
  api.createGame();
  dom.getPlayerInfo();
  submitInput();
};
