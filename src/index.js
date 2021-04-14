import script from './script';
import nav from './navTab';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');
const btnDriver = document.querySelector('.btn-secondary');
const btnTerm = document.querySelector('.btn-dark');
const btnDebt = document.querySelector('.btn-primary');
const btnSql = document.querySelector('.btn-success');
const btnReset = document.querySelector('.formOutput');
const btnCsvDownload = document.querySelector('.btn-outline-success');

const userData = {
  data: [],
};

const listener = (btn, fu) => {
  if (btn === btnCsvDownload) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = textareaOutput.innerHTML;
      const blob = new Blob([content], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'output.csv';
      link.click();
    });
  }
  if (btn === btnReset) {
    btn.addEventListener('submit', (e) => {
      e.preventDefault();
      textareaOutput.innerHTML = '';
      textareaInput.innerHTML = '';
      userData.data = [];
      e.target.reset();
      textareaInput.focus();
    });
  } else {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const userText = textareaInput.value.trim();
      userData.data.push(userText);
      fu(userData.data, textareaOutput);
    });
  }
  textareaInput.focus();
};

listener(btnDriver, script.addDriver);
listener(btnDebt, script.debt);
listener(btnSql, script.getSql);
listener(btnTerm, script.addTerm);
listener(btnReset);
listener(btnCsvDownload);
nav();
