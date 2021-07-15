const dom = (() => {
  const getPlayerInfo = () => {
    const container = document.querySelector('.content');
    const formWrapper = document.createElement('div');
    formWrapper.classList += 'form-main-wrapper';
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.innerHTML = `<input type='text' required class='name-input' placeholder='Enter your name'/> <button type='submit'>Send</button>`;
    formWrapper.appendChild(form);
    return container.appendChild(formWrapper);
  };

  const displayScores = (scores) => {
    console.log(scores);
  };
  return {
    getPlayerInfo,
    displayScores,
  };
})();

export default dom;
