import dom from './dom';
import player from './player';
window.onload = () => {
  dom.getPlayerInfo();
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.name-input');
    player.savePlayerName(name.value);
    name.value = '';
  });
};
