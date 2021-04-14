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

export default {
  debt(input, output) {
    const str = output;
    input.forEach((userData) => {
      if (userData.split('\n')[0].length < 15) {
        const formatUserData = userData
          .split('\n')
          .map((item) => `31064700${item.trim()}`)
          .join('\n');
        str.textContent = formatUserData;
      } else {
        const formatUserData = userData
          .split('\n')
          .map((item) => `SELECT db_admin.close_debt_transaction('${item}');`)
          .join('\n');
        str.textContent = formatUserData;
      }
    });
  },
  addDriver(input, output) {
    const reg = (str) => str.replace(/ /g, ',').replace(/[0-9]/g, '');
    const str = output;
    const csvHeader = 'CompanyName,Occupation,LastName,FirstName,MiddleName,Phone,PersonalNr,TerminalPassword';
    const example = 'ОАО ПАТП-4 (Новокузнецк),водитель,Ферг Нерман Сбербанкович,,123,1';
    input.forEach((userData) => {
      if (userData.length < 15) {
        str.textContent = `${csvHeader}${'\n'}${example}`;
      }
      const terminalPassword = userData
        .split('\n')
        .slice(1)
        .join()
        .replace(/\D+/g, ' ')
        .split(' ')
        .filter((i) => i.trim());
      const firstStr = userData.split('\n')[0].split(',');
      firstStr[2] = firstStr[2].replace(/ /g, ',');
      const { 0: companyName, 1: occupation } = firstStr;
      const obj = {
        companyName,
        occupation,
        emptyStr: '',
      };
      const formatUserData = userData
        .split('\n')
        .slice(1)
        .map((item, t) => `${Object.values(obj)}${reg(item.trim())}${','.repeat(1)}${terminalPassword[t]}${','}${1}`)
        .join('\n');
      str.textContent = `${csvHeader}${'\n'}${firstStr.join()}${'\n'}${formatUserData}`;
    });
  },
  getSql(input, output) {
    const str = output;
    input.forEach((userData) => {
      if (userData.split('\n')[0].length > 40) {
        const formatUserData = userData
          .split('\n')
          .map((item) => item.split('\t')[2]);
        str.textContent = query(regexp(formatUserData.join('\n')));
      } else str.textContent = query(regexp(userData));
    });
  },
  addTerm(input, output) {
    const str = output;
    const csvHeader = 'Number,CompanyId,RegionId,InventoryNumber,TerminalModelId,VehicleId,Enabled,EcomMerchantId,MerchantCode,StoreNr,Tid,TerminalNr,MccCode,Currency,TerminalOption,TerminalModel,SoftwareVersion,Serial';
    const example = '22223333,123,1234,1,3,,true,321,111111111111,2222,22223333,3333,4111,643,J1,Q,1,TKP000000001';
    input.forEach((userData) => {
      if (userData.length < 15) {
        str.textContent = `${csvHeader}${'\n'}${example}`;
      } else {
        const firstStr = userData.split('\n')[0].split(',');
        const number = userData
          .split('\n')
          .slice(1)
          .map((item) => `${','}${item.trim().slice(0, -4)}${','}${item.trim()}${','}${item.trim().slice(4)}${','}`);
        const obj = {
          companyId: firstStr[1],
          regionId: firstStr[2],
          inventoryNumber: 1,
          terminalModelId: firstStr[4],
          vehicleId: '',
          enabled: true,
          ecomMerchantId: firstStr[7],
          merchantCode: firstStr[8],
        };
        const obj2 = {
          mccCode: 4111,
          currency: 643,
          terminalOption: 'J1',
          terminalModel: 'Q',
          softwareVersion: 1,
          serial: 'TKP000000001',
        };
        const formatUserData = userData.split('\n')
          .slice(1)
          .map((item, n) => `${item.trim()}${','}${Object.values(obj)}${number[n]}${Object.values(obj2)}`)
          .join('\n');
        str.textContent = `${csvHeader}${'\n'}${firstStr}${'\n'}${formatUserData}`;
      }
    });
  },
};
