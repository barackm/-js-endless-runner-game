const dom = (() => {
  const getPlayerInfo = () => {
    const container = document.querySelector('.main-wrapper');
    const wrapper = document.createElement('div');
    const instructions = document.createElement('div');
    instructions.classList += 'instructions-wraper';
    instructions.innerHTML = "<h1>Welcome to Endless Runner</h1><p>Use the direction keys to avoid bombs and collect gems.</p><img src='https://png2.cleanpng.com/sh/540fd57910e2fd150048346b2c8278b8/L0KzQYm3VMIzN6ZofZH0aYP2gLBuTfNwdaF6jNd7LXvoibP2ggJlNZJ3itHCLXvoicS0gBxqeF5miuY2NXHnc7K6UcMzP2Q1eqk3OEW5Q4e7UMMyPWM5TKIEMUC6QYe3Vb5xdpg=/kisspng-computer-keyboard-arrow-keys-clip-art-5adca3132730b7.8563640315244091071605.png'></img>";
    wrapper.classList += 'container';
    const overlay = document.createElement('div');
    overlay.classList += 'overlay';
    const formWrapper = document.createElement('div');
    formWrapper.classList += 'form-main-wrapper';
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.innerHTML = '<input type=\'text\' required class=\'name-input\' placeholder=\'Enter your name\'/> <button type=\'submit\'>Continue</button>';
    formWrapper.appendChild(form);
    wrapper.appendChild(overlay);
    wrapper.appendChild(instructions);
    wrapper.appendChild(formWrapper);
    return container.appendChild(wrapper);
  };

  const displayScores = (scores) => {
    const scoresContainer = document.querySelector('.scoreWrapper');
    scoresContainer.innerHTML = '';
    const header = document.createElement('div');
    header.classList += 'scoresHeader';
    header.innerHTML = `<h1 class="text-center my-header">Leader Board</h1><hr/><table class="table">
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
          </tbody>`,
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
