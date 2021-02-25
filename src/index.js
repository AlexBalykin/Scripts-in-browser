const formInput = document.querySelector('.btn-primary');
const formOutput = document.querySelector('.output');
const textareaInput = document.querySelector('.t');
const textareaOutput = document.querySelector('.t2');
const btn = document.querySelector('.btn-secondary');

const userData = {
  data: [],
};

const formatUserData = (data, t2) => {
  data.forEach((i) => {
    const result = i
      .split('\n')
      .map((item) => `SELECT db_admin.close_debt_transaction('${item.trim()}');`)
      .join('\n');
    t2.innerHTML += result;
  });
};

formInput.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  formatUserData(userData.data, textareaOutput);
});

formOutput.addEventListener('submit', (e) => {
  e.preventDefault();
  textareaOutput.innerHTML = '';
  textareaInput.innerHTML = '';
  userData.data = [];
  e.target.reset();
});

const getNum = (data, t2) => {
  data.forEach((i) => {
    const result = i
      .split('\n')
      .map((item) => `31064700${item.trim()}`)
      .join('\n');
    t2.innerHTML += result;
  });
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  getNum(userData.data, textareaOutput);
});
