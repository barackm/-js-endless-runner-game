const storage = (() => {
  const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  const set = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    return localStorage.removeItem(key);
  };

  const getCurrentScore = () => {
    return JSON.parse(localStorage.getItem('score')) || 0;
  };
  const getHighestScore = () => {
    return JSON.parse(localStorage.getItem('highScore'));
  };

  return {
    get,
    set,
    getCurrentScore,
    remove,
    getHighestScore,
  };
})();
export default storage;
