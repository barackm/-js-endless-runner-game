const dom = (() => {
  const getPlayerInfo = () => {
    const container = document.querySelector('.content');
    const formWrapper = document.createElement('div');
    formWrapper.classList += 'form-main-wrapper';
    const form = document.createElement('form');
    form.innerHTML = `<input type='text', placeholder='Enter your name'/> <button type='submit'>Send</button>`;
    formWrapper.appendChild(form);
    return container.appendChild(formWrapper);
  };
  return {
    getPlayerInfo,
  };
})();

export default dom;
