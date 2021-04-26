import script from './script';
import { downloader, navTab } from './tools';
import './index.scss';

const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');
const btnDriver = document.querySelector('.driver');
const btnTerm = document.querySelector('.term');
const btnDebt = document.querySelector('.debt');
const btnSql = document.querySelector('.sql');
const btnReset = document.querySelector('.formOutput');
const btnGrz = document.querySelector('.grz');
const btnExport = document.querySelector('.export');

const userData = {
  data: [],
};

const listener = (btn, scriptMethod) => {
  if (btn === btnExport) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const exportData = textareaOutput.innerHTML.split('\n')[0].length < 20
        ? downloader('grz.txt', 'text/txt', textareaOutput)
        : downloader('output.csv', 'text/csv', textareaOutput);
      return exportData;
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
      scriptMethod(userData.data, textareaOutput);
    });
  }
  textareaInput.focus();
};

listener(btnDriver, script.addDriver);
listener(btnDebt, script.debt);
listener(btnSql, script.getSql);
listener(btnTerm, script.addTerm);
listener(btnGrz, script.grz);
listener(btnReset);
listener(btnExport);
navTab();
