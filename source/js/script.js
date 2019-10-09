const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const menu = document.querySelector('.header__nav');

burger.addEventListener('click', function() {
	this.classList.toggle('header__burger--opened');
	header.classList.toggle('header--opened');

	if (header.classList.contains('header--opened')) {
		menu.style.height = menu.scrollHeight + 'px';
	} else { menu.style.height = '';}
})
