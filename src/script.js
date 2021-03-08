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

const script = {
  debt: (input, output) => {
    const str = output;
    input.forEach((i) => {
      if (i.split('\n')[0].length < 15) {
        const formatUserData = i
          .split('\n')
          .map((item) => `31064700${item.trim()}`)
          .join('\n');
        str.innerHTML += formatUserData;
      } else {
        const formatUserData = i
          .split('\n')
          .map((item) => `SELECT db_admin.close_debt_transaction('${item}');`)
          .join('\n');
        str.innerHTML += formatUserData;
      }
    });
  },
  addDriver: (input, output) => {
    const reg = (str) => str.replace(/ /g, ',').replace(/[0-9]/g, '');
    const str = output;
    const csvHeader = 'CompanyName,Occupation,LastName,FirstName,MiddleName,Phone,PersonalNr,TerminalPassword';
    const example = 'ОАО ПАТП-4 (Новокузнецк),водитель,Ферг Нерман Сбербанкович,,,1';
    input.forEach((i) => {
      if (i.split('\n')[0].length < 15) {
        str.innerHTML += `${csvHeader}${'\n'}${example}`;
      }
      const firstStr = i.split('\n')[0].split(',');
      firstStr[2] = firstStr[2].replace(/ /g, ',');
      const obj = {
        companyName: firstStr[0],
        occupation: firstStr[1],
        emptyStr: '',
      };
      const formatUserData = i.split('\n')
        .slice(1)
        .map((item) => `${Object.values(obj)}${reg(item)}${','.repeat(3)}${1}`)
        .join('\n');
      str.innerHTML += `${csvHeader}${'\n'}${firstStr.join()}${'\n'}${formatUserData}`;
    });
  },
  getSql: (input, output) => {
    const str = output;
    input.forEach((userData) => {
      if (userData.split('\n')[0].length > 40) {
        const formatUserData = userData
          .split('\n')
          .map((item) => item.split('\t')[2]);
        str.innerHTML += query(regexp(formatUserData.join('\n')));
      } else str.innerHTML += query(regexp(userData));
    });
  },
};

export default script;
