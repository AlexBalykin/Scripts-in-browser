import Debt from './Modules/Debt';
import Sql from './Modules/Sql';
import './index.css';

const btnDebt = document.querySelector('.btn-primary');
// const btnNum = document.querySelector('.btn-secondary');
const btnSql = document.querySelector('.btn-success');
const btnReset = document.querySelector('.formOutput');
const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');

const userData = {
  data: [],
};

btnDebt.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  Debt(userData.data, textareaOutput);
  userData.data = [];
});

btnSql.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  Sql(userData.data, textareaOutput);
  userData.data = [];
});

btnReset.addEventListener('submit', (e) => {
  e.preventDefault();
  textareaOutput.innerHTML = '';
  textareaInput.innerHTML = '';
  userData.data = [];
  e.target.reset();
});
