import storage from './localstorage';

const player = (() => {
  const savePlayerName = (player) => {
    storage.set('player', player);
  };

  const storePlayerScore = () => {};

  return {
    savePlayerName,
    storePlayerScore,
  };
})();

export default player;
