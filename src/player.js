const player = (() => {
  const savePlayerName = (player) => {
    console.log(player);
  };
  const storePlayerScore = () => {};

  return {
    savePlayerName,
    storePlayerScore,
  };
})();

export default player;
