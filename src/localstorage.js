const storage = (() => {
  const get = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  const set = (key, value) => {
    return localStorage.setItem(key, JSON.parse(value));
  };

  const remove = (key) => {
    return localStorage.removeItem(key);
  };
  return {
    get,
    set,
    remove,
  };
})();
export default storage;
