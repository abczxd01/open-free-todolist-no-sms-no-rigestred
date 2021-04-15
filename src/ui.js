let headerInput = document.querySelector('.header__search')
let headerSearch = document.querySelector('.header__items1')
let numClick = 0

headerInput.addEventListener('click', searchGeneration)

function searchGeneration() {
	let input = document.createElement('input')
	input.classList.add('inputSearch')
	numClick++
	if (numClick % 2) {
		headerSearch.replaceWith(input)
	} else {
		headerSearch.replaceWith()
	}

}