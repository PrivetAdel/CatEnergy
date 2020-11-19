const nav = document.querySelector(`.header__nav`);
const toggle = nav.querySelector(`.header__toggle`);

nav.classList.remove(`header__nav--nojs`);

function onToggleClick() {
  nav.classList.toggle(`header__nav--opened`);
}

toggle.addEventListener(`click`, onToggleClick);
