import closeDebt from './modules/debt';
import getSql from './modules/sql';
import addDriver from './modules/driver';
import './index.css';

const btnDebt = document.querySelector('.btn-primary');
const btnNum = document.querySelector('.btn-secondary');
const btnSql = document.querySelector('.btn-success');
const btnReset = document.querySelector('.formOutput');
const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');

const userData = {
  data: [],
};

btnNum.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  addDriver(userData.data, textareaOutput);
  userData.data = [];
});

btnDebt.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  closeDebt(userData.data, textareaOutput);
  userData.data = [];
});

btnSql.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  getSql(userData.data, textareaOutput);
  userData.data = [];
});

btnReset.addEventListener('submit', (e) => {
  e.preventDefault();
  textareaOutput.innerHTML = '';
  textareaInput.innerHTML = '';
  userData.data = [];
  e.target.reset();
});
