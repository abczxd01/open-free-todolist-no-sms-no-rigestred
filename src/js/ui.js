/* eslint-disable no-restricted-syntax */
const headerSearchInput = document.querySelector('.header__search-input');
const headerSearch = document.querySelector('.header__search');
const headerWrapper = document.querySelector('.header__wrapper');

function searchGeneration() {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('header__search-input');
  input.style.width = `${headerWrapper.offsetWidth}px`;
  input.style.height = `${headerWrapper.offsetHeight}px`; 
  headerWrapper.replaceWith(input);
}

headerSearch.addEventListener('click', searchGeneration);
