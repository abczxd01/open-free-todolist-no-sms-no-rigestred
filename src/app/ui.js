/* eslint-disable no-restricted-syntax */
let headerSearchInput = null;
const headerWrapper = document.querySelector('.header__wrapper');
const headerButtons = document.querySelectorAll('.header__button');

function headerSearch(event) {
  if (event.code.toLowerCase() === 'enter') {
    headerButtons.forEach((element) => {
      if (!element.matches('.header__search')) element.classList.toggle('header__hide');
    });
    headerSearchInput.remove();
    headerSearchInput.removeEventListener('keyup', headerSearch);
  }
}

function searchGeneration() {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('header__search-input');
  input.style.width = `${headerWrapper.offsetWidth - 66}px`;
  headerButtons.forEach((element) => {
    if (!element.matches('.header__search')) element.classList.toggle('header__hide');
  });
  headerSearchInput = document.querySelector('.header__search-input');
  if (headerSearchInput === null) {
    headerWrapper.prepend(input);
    headerSearchInput = document.querySelector('.header__search-input');
    headerSearchInput.addEventListener('keyup', headerSearch);
  } else {
    headerSearchInput.remove();
    headerSearchInput.removeEventListener('keyup', headerSearch);
  }
}

document.querySelector('.header__search').addEventListener('click', searchGeneration);
