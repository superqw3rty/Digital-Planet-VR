'use strict';

/// Mobile menu

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


//Scroll to the next section

let arrowBtn = document.querySelectorAll('.button-arrow');
let arrowText = document.querySelector('.intro__next-btn-text');


arrowText.addEventListener('click', function() {
	console.log(this);
	let parent = arrowText.parentElement;
	let nextSection = parent.nextElementSibling;
	nextSection.scrollIntoView({block: "start", behavior: "smooth"});
});

arrowBtn.forEach((function(item) {	
	item.addEventListener('click', function(e) {
		let parent = this.parentElement;
		let nextSection = parent.nextElementSibling;
		nextSection.scrollIntoView({block: "start", behavior: "smooth"});
	})
}))


///Slider

let slides = document.querySelectorAll('.how__item');
const counter = document.querySelector('.how__slider-number--current');
const allSlides = document.querySelector('.how__slider-number--all');
const prevSlide = document.querySelector('.how__slider-button--prev');
const nextSlide = document.querySelector('.how__slider-button--next');
let currentPosition;
let slideWidth;

allSlides.innerHTML = `0${slides.length}`;

nextSlide.addEventListener('click',()=> {	
	//Width and translate range
	if (typeof(currentPosition) === 'undefined') {
		currentPosition = 0;
	}	
 	slideWidth =  slides[0].offsetWidth;			 	
 	currentPosition += -slideWidth;

 	//SlidesMove
	slides.forEach((item)=> {		
		if (currentPosition < -(slideWidth * (slides.length -1))) {
			item.style.transform = `translateX(0px)`;
			currentPosition = 0;
		}
		item.style.transform = `translateX(${currentPosition}px)`;
	})

	//SlideCount
	counter.innerHTML = `0${((currentPosition / 288) -1) * -1 } /`
});

prevSlide.addEventListener('click',()=> {	
	//Width and translate range
	if (typeof(currentPosition) === 'undefined') {
		currentPosition = 0;
	}	
 	slideWidth =  slides[0].offsetWidth;			 	
 	currentPosition += slideWidth;

 	//SlidesMove
	slides.forEach((item)=> {
		
		if (currentPosition > 0) {
			currentPosition = -864;
			item.style.transform = `translateX(${currentPosition}}px)`;	
		}
		item.style.transform = `translateX(${currentPosition}px)`;
	})

	//SlideCount
	function count(){
		if (currentPosition == 0) {
			return `01 /`;
		}
		return counter.innerHTML = `0${((currentPosition / 288) -1) * -1 } /`
	}
	counter.innerHTML = count();
});


//Questions accordeon


let questionBtns = document.querySelectorAll('.questions__btn');
const answers =  document.querySelectorAll('.questions__answer-wrapper');

for (let btn of questionBtns) {
	btn.addEventListener('click', function(e) {
		let target = this.parentElement.nextElementSibling;
		if (target.style.height) {
			target.style.height = '';
			target.classList.remove('questions__answer-wrapper--opened');
		} 

		else {
			answers.forEach(function(item) {
				if (item.style.height) {
					item.style.height = '';
					item.classList.remove('questions__answer-wrapper--opened');					
				}
			});

			target.style.height = target.scrollHeight + 'px';
			target.classList.add('questions__answer-wrapper--opened');
		}

	});
};


///Modal 

const orderBbtn = document.querySelector('.header__order-btn');
const modal = document.querySelector('.modal');
const modalForm = document.forms.modalForm;
const modalOverlay = document.querySelector('.modal__overlay');

orderBbtn.addEventListener('click',()=> {
	modal.classList.add('modal--opened');
	modalOverlay.onclick = ()=> {
		modal.classList.remove('modal--opened');
	}
})



///Phonemask

const phoneInput = document.querySelector('.input--phone');

Inputmask({"mask": "+ 7(999) 999-99-99"}).mask(phoneInput);


///InputVAlidate

const nameInput = document.querySelector('.input--name');

nameInput.addEventListener('blur', function() {
	if (this.value.match("[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?")) {
		this.classList.add('input--valid');
		this.parentElement.classList.add('modal__input-wrapper--valid');	
	} else if (this.value.length === 0) {
		return
	}
	else {
		this.classList.add('input--invalid');
		this.parentElement.classList.add('modal__input-wrapper--invalid');
		this.nextElementSibling.classList.add('input__error-text--opened');
	}
});

nameInput.addEventListener('focus', function() {
	this.classList.remove('input--valid');
	this.classList.remove('input--invalid');
	this.parentElement.classList.remove('modal__input-wrapper--valid');
	this.parentElement.classList.remove('modal__input-wrapper--invalid');
	this.nextElementSibling.classList.remove('input__error-text--opened');
});

phoneInput.addEventListener('blur', function() {
	if (this.value.length === 0 ) {
		return;
	}
	else if (this.value.length > 0 && this.value.match("_")) {
		console.log('invalid');
		this.classList.add('input--invalid');
		this.parentElement.classList.add('modal__input-wrapper--invalid');
		this.nextElementSibling.classList.add('input__error-text--opened');
	}
	else {
		console.log('valid');
		this.classList.add('input--valid');
		this.parentElement.classList.add('modal__input-wrapper--valid');	
	}
});
phoneInput.addEventListener('focus', function() {
	this.classList.remove('input--valid');
	this.classList.remove('input--invalid');
	this.parentElement.classList.remove('modal__input-wrapper--valid');
	this.parentElement.classList.remove('modal__input-wrapper--invalid');
	this.nextElementSibling.classList.remove('input__error-text--opened');
});