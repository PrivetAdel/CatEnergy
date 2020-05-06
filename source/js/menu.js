const nav = document.querySelector(`.main-nav`);
const toggle = nav.querySelector(`.main-nav__toggle`);

nav.classList.remove(`main-nav--nojs`);

function onToggleClick() {
  nav.classList.toggle(`main-nav--opened`);
}

toggle.addEventListener(`click`, onToggleClick);
