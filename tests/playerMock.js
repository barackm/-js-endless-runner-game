import storage from './storageMock';

const player = (() => {
  const savePlayerName = (player) => {
    if (!player) throw Error;
    storage.set('player', player);
    return player;
  };

  return {
    savePlayerName,
  };
})();

export default player;
