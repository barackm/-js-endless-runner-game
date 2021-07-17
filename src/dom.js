const dom = (() => {
  const getPlayerInfo = () => {
    const container = document.querySelector('.main-wrapper');
    const wrapper = document.createElement('div');
    wrapper.classList += 'container';
    const formWrapper = document.createElement('div');
    formWrapper.classList += 'form-main-wrapper';
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.innerHTML = `<input type='text' required class='name-input' placeholder='Enter your name'/> <button type='submit'>Continue</button>`;
    formWrapper.appendChild(form);
    wrapper.appendChild(formWrapper);
    return container.appendChild(wrapper);
  };

  const displayScores = (scores) => {
    const scoresContainer = document.querySelector('.scoreWrapper');
    const header = document.createElement('div');
    header.classList += 'scoresHeader';
    header.innerHTML = `<h1>Scores</h1><hr/><table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Player</th>
            <th scope="col">Score</th>
            </tr>
        </thead>
        ${scores.map(
          (score, index) => `
          <tbody>
            <tr>
              <th scope="row">${index + 1}</th>
              <td>${score[1]}</td>
              <td>${score[0]}</td>
            </tr>
          </tbody>`
        )}
    </table>`;

    scoresContainer.appendChild(header);
  };

  return {
    getPlayerInfo,
    displayScores,
  };
})();

export default dom;
