const navTab = () => {
  const navs = document.querySelectorAll('.nav');
  navs.forEach((nav) => {
    const links = nav.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        const activeLink = nav.querySelector('.active');
        activeLink.classList.remove('active');
        const activeTabId = activeLink.dataset.bsTarget;
        const activeTab = document.querySelector(activeTabId);
        activeTab.classList.remove('active');

        link.classList.add('active');
        const tabId = link.dataset.bsTarget;
        const tab = document.querySelector(tabId);
        tab.classList.add('active');
      });
    });
  });
};
const downloader = (file, format, tag) => {
  const content = tag.innerHTML;
  const blob = new Blob([content], { type: format });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = file;
  link.click();
};
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
const pattern = {
  С: 'C',
  с: 'c',
  Е: 'E',
  е: 'e',
  Ё: 'E',
  ё: 'e',
  Т: 'T',
  О: 'O',
  о: 'o',
  р: 'p',
  Р: 'P',
  А: 'A',
  а: 'a',
  Н: 'H',
  н: 'H',
  К: 'K',
  к: 'k',
  Х: 'X',
  х: 'x',
  В: 'B',
  в: 'B',
  М: 'M',
  У: 'Y',
  у: 'Y',
};
export {
  navTab, downloader, regexp, query, pattern,
};
