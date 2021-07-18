const storage = (() => {
  const get = (key) => JSON.parse(localStorage.getItem(key));
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const remove = (key) => localStorage.removeItem(key);

  const getCurrentScore = () => JSON.parse(localStorage.getItem('score')) || 0;
  const getHighestScore = () => JSON.parse(localStorage.getItem('highScore'));

  return {
    get,
    set,
    getCurrentScore,
    remove,
    getHighestScore,
  };
})();
export default storage;
