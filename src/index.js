const btnDebt = document.querySelector('.btn-primary');
const btnNum = document.querySelector('.btn-secondary');
const btnReset = document.querySelector('.formOutput');
const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');

const userData = {
  data: [],
};

const closeDebt = (input, output) => {
  const str = output;
  input.forEach((i) => {
    const result = i
      .split('\n')
      .map((item) => `SELECT db_admin.close_debt_transaction('${item.trim()}');`)
      .join('\n');
    str.innerHTML += result;
  });
};

btnDebt.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  closeDebt(userData.data, textareaOutput);
  userData.data = [];
});

const getNum = (input, output) => {
  const str = output;
  input.forEach((i) => {
    const result = i
      .split('\n')
      .map((item) => `31064700${item.trim()}`)
      .join('\n');
    str.innerHTML += result;
  });
};

btnNum.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  getNum(userData.data, textareaOutput);
  userData.data = [];
});

btnReset.addEventListener('submit', (e) => {
  e.preventDefault();
  textareaOutput.innerHTML = '';
  textareaInput.innerHTML = '';
  userData.data = [];
  e.target.reset();
});
