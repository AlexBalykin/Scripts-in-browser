import script from './script';
import './index.css';

const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');
const btnDriver = document.querySelector('.btn-secondary');
const btnDebt = document.querySelector('.btn-primary');
const btnSql = document.querySelector('.btn-success');
const btnReset = document.querySelector('.formOutput');

const userData = {
  data: [],
};

const listener = (btn, fu) => {
  if (btn === btnReset) {
    btn.addEventListener('submit', (e) => {
      e.preventDefault();
      textareaOutput.innerHTML = '';
      textareaInput.innerHTML = '';
      userData.data = [];
      e.target.reset();
    });
  } else {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const userText = textareaInput.value;
      userData.data.push(userText);
      fu(userData.data, textareaOutput);
      userData.data = [];
    });
  }
};

listener(btnDriver, script.addDriver);
listener(btnDebt, script.debt);
listener(btnSql, script.getSql);
listener(btnReset);
