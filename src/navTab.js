export default () => {
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
