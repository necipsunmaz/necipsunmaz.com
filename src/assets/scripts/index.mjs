import ThemeToggle from './components/theme-toggle/index.mjs';
import HamburgerMenu from './components/hamburger-menu/index.mjs';

// eslint-disable-next-line no-unused-vars
const themeToggle = new ThemeToggle({
  root: document.documentElement,
  toggleElement: document.getElementById('theme-toggle'),
  storageKey: 'theme',
  defaultTheme: 'light',
  themes: {
    light: 'dark',
    dark: 'light',
  },
});

// eslint-disable-next-line no-unused-vars
const hamburgerMenu = new HamburgerMenu({
  root: document.documentElement,
  hamburgerMenuElement: document.getElementById('hamburger-menu'),
});

const copyableCodeBlocks = document.querySelectorAll('.code-header.with-copy-button + pre[class*="language-"]');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
  const code = copyableCodeBlocks[index].innerText;

  copyCodeButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(code);
    copyCodeButton.classList.add('copied');

    setTimeout(() => {
      copyCodeButton.classList.remove('copied');
    }, 2000);
  });
});
