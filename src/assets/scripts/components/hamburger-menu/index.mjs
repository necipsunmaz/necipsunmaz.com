export default class HamburgerMenu {
  constructor({ root, hamburgerMenuElement }) {
    this.root = root;
    this.hamburgerMenuElement = hamburgerMenuElement;
    this.hamburgerMenuElement.addEventListener('click', () => this.openMenu());
  }

  get currentMenu() {
    return this.root.dataset.menu;
  }

  open() {
    if (this.currentMenu == 'opened') {
      delete this.root.dataset.menu;
    } else {
      this.root.dataset.menu = 'opened';
    }
  }

  openMenu() {
    this.open();
  }
}
