export default (input, output) => {
  const str = output;
  const reg = (str2) => str2.replace(/ /g, ',').replace(/[0-9]/g, '');
  const csvHeader = 'CompanyName,Occupation,LastName,FirstName,MiddleName,Phone,PersonalNr,TerminalPassword';

  input.forEach((i) => {
    if (i.split('\n')[0].length < 15) {
      str.innerHTML += csvHeader;
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
};
