class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const storage = (() => {
  const get = (key) => {
    if (!key) throw Error;
    return JSON.parse(localStorage.getItem(key));
  };
  const set = (key, value) => {
    if (!key || !value) throw Error;
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    if (!key) throw Error;
    localStorage.removeItem(key);
  };

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
