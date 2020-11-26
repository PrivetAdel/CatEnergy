const TABLET_WIDTH = 768;
const slider = document.querySelector(`.slider`);
const scale = slider.querySelector(`.slider__scale`);
const grip = scale.querySelector(`.slider__grip`);
const before = slider.querySelector(`.slider__image--before`);
const after = slider.querySelector(`.slider__image--after`);
const btnBefore = slider.querySelector(`.slider__toggle--before`);
const btnAfter = slider.querySelector(`.slider__toggle--after`);
let scaleWidth;
let gripWidth;

function getElemWidth(elem) {
  return parseInt(getComputedStyle(elem).width, 10);
};

btnBefore.onclick = function (evt) {
  evt.preventDefault();
  before.style.width = "100%";
  after.style.width = "0";
  grip.style.marginLeft = "0";
  grip.style.transition = "margin-left 2.5s ease-in-out";
  before.style.transition = "width 2s ease-in-out";
};

btnAfter.onclick = function (evt) {
  evt.preventDefault();
  before.style.width = "0";
  after.style.width = "100%";
  grip.style.marginLeft = "calc(100% - " + gripWidth + "px)";
  grip.style.transition = "margin-left 2.5s ease-in-out";
  after.style.transition = "width 2s ease-in-out";
};

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return box.left + pageXOffset;
};

function gripDownHandler(evtDown) {
  let gripCoords = getCoords(grip);
  let scaleCoords = getCoords(scale);
  grip.style.transition = `none`;

  let shiftX = evtDown.pageX - gripCoords;

  document.onmousemove = function(evtMove) {
    let newLeft = evtMove.pageX - shiftX - scaleCoords;

    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge = scaleWidth - gripWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    let gripValue = newLeft / rightEdge * 100;
    grip.style.marginLeft = newLeft + `px`;

    before.style.width = (100 - gripValue) + `%`;
    after.style.width = gripValue + `%`;
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false;
};

function addGripHandlers() {
  grip.addEventListener(`mousedown`, gripDownHandler);
};

function removeGripHandlers() {
  grip.removeEventListener(`mousedown`, gripDownHandler);
};

function initialize() {
  let viewport = document.documentElement.clientWidth || window.innerWidth;

  if (viewport >= TABLET_WIDTH) {
    addGripHandlers();
  } else {
    removeGripHandlers();
  }

  scaleWidth = getElemWidth(scale);
  gripWidth = getElemWidth(grip);
};

window.addEventListener(`load`, initialize);
window.addEventListener(`resize`, initialize);
