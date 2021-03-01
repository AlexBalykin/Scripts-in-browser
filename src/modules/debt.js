export default (input, output) => {
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
        .map((item) => `SELECT db_admin.close_debt_transaction('${item.trim()}');`)
        .join('\n');
      str.innerHTML += formatUserData;
    }
  });
};
