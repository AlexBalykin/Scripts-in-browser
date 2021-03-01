const btnDebt = document.querySelector('.btn-primary');
// const btnNum = document.querySelector('.btn-secondary');
const btnSuccess = document.querySelector('.btn-success');
const btnReset = document.querySelector('.formOutput');
const textareaInput = document.querySelector('.textareaInput');
const textareaOutput = document.querySelector('.textareaOutput');

const userData = {
  data: [],
};

const closeDebt = (input, output) => {
  const str = output;
  input.forEach((i) => {
    if (i.split('\n')[0].length < 15) {
      const result = i
        .split('\n')
        .map((item) => `31064700${item.trim()}`)
        .join('\n');
      str.innerHTML += result;
    } else {
      const result = i
        .split('\n')
        .map((item) => `SELECT db_admin.close_debt_transaction('${item.trim()}');`)
        .join('\n');
      str.innerHTML += result;
    }
  });
};

btnDebt.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  closeDebt(userData.data, textareaOutput);
  userData.data = [];
});

btnReset.addEventListener('submit', (e) => {
  e.preventDefault();
  textareaOutput.innerHTML = '';
  textareaInput.innerHTML = '';
  userData.data = [];
  e.target.reset();
});

const regexp = (str) => str.replace(/\r?\n/g, "','").split('\n').join().trim();
const query = (data) => `SELECT t.id, t.REGION_ID, ts."name" AS Статус, cdts."name" AS Статус_долга, ct."name" AS Карта
 FROM BILLING."transaction" t
 LEFT JOIN CARD_DEBT_TRANSACTION cd ON t.ID = cd.TRANSACTION_ID
 LEFT JOIN TRANSACTION_STATUS TS ON t.STATUS_ID = ts.ID
 LEFT JOIN CARD_DEBT_TRANSACTION_STATUS CDTS ON cd.STATUS_ID = cdts.ID
 LEFT JOIN CARD C ON t.CARD_ID=c.ID
 LEFT JOIN CARD_TYPE CT ON ct.ID=c.TYPE_ID
 WHERE t.CARD_ID IN ('${data}')
 AND t.STATUS_ID IN (1,2,4) AND cd.STATUS_ID IN (1,2,4);`;

const getSql = (input, output) => {
  const str = output;
  input.forEach((i) => {
    const result = query(regexp(i));
    str.innerHTML += result;
  });
};

btnSuccess.addEventListener('click', (e) => {
  e.preventDefault();
  const userText = textareaInput.value;
  userData.data.push(userText);
  getSql(userData.data, textareaOutput);
  userData.data = [];
});
