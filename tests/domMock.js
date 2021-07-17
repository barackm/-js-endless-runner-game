import storage from './storageMock';

const dom = (() => {
  const getPlayerInfo = () => {
    storage.set('player', 'Barack');
    return storage.get('player');
  };

  const displayScores = (scores) => {
    if (!scores) throw Error;
    return [
      { user: 'barack', score: 200 },
      { user: 'bill', score: 300 },
      { user: 'bob', score: 400 },
    ];
  };

  return {
    getPlayerInfo,
    displayScores,
  };
})();

export default dom;
