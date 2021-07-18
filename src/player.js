import storage from './localstorage';
import api from './api';
import Game from './game';

const player = (() => {
  const savePlayerName = (player) => {
    storage.set('player', player);
    const formWrapper = document.querySelector('.main-wrapper');
    formWrapper.style.display = 'none';
    window.game = new Game();
    api.getScores(player);
  };

  return {
    savePlayerName,
  };
})();

export default player;
