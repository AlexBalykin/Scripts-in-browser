import script from './script';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');
const btnDriver = document.querySelector('.btn-secondary');
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
      link.href = window.URL.createObjectURL(blob);
      link.download = 'driver.csv';
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
    });
  } else {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (textareaOutput.innerHTML.length > 0) {
        textareaOutput.innerHTML = '';
        userData.data = [];
      }
      const userText = textareaInput.value.trim();
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
listener(btnCsvDownload);
