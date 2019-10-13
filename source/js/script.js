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


arrowText.addEventListener('mouseover',function() {
	arrowBtn[0].style.opacity = 1;	
})

arrowText.addEventListener('mouseleave',function() {
	arrowBtn[0].style.opacity = '';
})
arrowBtn[0].addEventListener('mouseover',function() {
	arrowText.style.opacity = 1;	
})

arrowBtn[0].addEventListener('mouseleave',function() {
	arrowText.style.opacity = '';
})


arrowText.addEventListener('click', function() {
	let parent = arrowText.parentElement;
	let nextSection = parent.parentElement.nextElementSibling;
	nextSection.scrollIntoView({block: "start", behavior: "smooth"});
});

arrowBtn.forEach((function(item) {	
	item.addEventListener('click', function(e) {
		let parent = this.parentElement;
		let nextSection = parent.nextElementSibling;
		if (!nextSection) {
			nextSection = parent.parentElement.nextElementSibling;
		}
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
			this.classList.remove('button__question--opened');
		} 

		else {
			answers.forEach(function(item) {
				if (item.style.height) {
					item.style.height = '';
					item.classList.remove('questions__answer-wrapper--opened');					
				}
				questionBtns.forEach((btn)=> {
					btn.classList.remove('button__question--opened');
				})
			});
			target.style.height = target.scrollHeight + 'px';
			target.classList.add('questions__answer-wrapper--opened');
			this.classList.add('button__question--opened');
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
		phoneInput.value = '';
		nameInput.value = '';
		phoneInput.classList.remove('input--valid');		
		nameInput.classList.remove('input--valid');
		nameInput.parentElement.classList.remove('modal__input-wrapper--valid');
		phoneInput.parentElement.classList.remove('modal__input-wrapper--valid');
		modal.classList.remove('modal--opened');
	}
})



///Phonemask

const phoneInput = document.querySelector('.input--phone');

Inputmask({"mask": "+ 7(999) 999-99-99"}).mask(phoneInput);
const alertClose = document.querySelector('.modal__fill-alert-close');


///InputVAlidate

const nameInput = document.querySelector('.input--name');
const modalAlert = document.querySelector('.modal__fill-alert');

nameInput.addEventListener('blur', function() {
	
	if (this.value.match("[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?")) {
		this.classList.add('input--valid');
		this.parentElement.classList.add('modal__input-wrapper--valid');
	}
	else if (nameInput.classList.contains('input--valid') && phoneInput.classList.contains('input--valid')) {

		modalAlert.classList.add('modal__fill-alert--opened');
		setTimeout(closeAlert, 10000)
	} 
	 else if (this.value.length === 0) {
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
		this.classList.add('input--invalid');
		this.parentElement.classList.add('modal__input-wrapper--invalid');
		this.nextElementSibling.classList.add('input__error-text--opened');
	}
	else {
		this.classList.add('input--valid');
		this.parentElement.classList.add('modal__input-wrapper--valid');	
	}
	if (nameInput.classList.contains('input--valid') && phoneInput.classList.contains('input--valid')) {
		modalAlert.classList.add('modal__fill-alert--opened');
		setTimeout(closeAlert, 10000)
	} 
});
phoneInput.addEventListener('focus', function() {
	this.classList.remove('input--valid');
	this.classList.remove('input--invalid');
	this.parentElement.classList.remove('modal__input-wrapper--valid');
	this.parentElement.classList.remove('modal__input-wrapper--invalid');
	this.nextElementSibling.classList.remove('input__error-text--opened');
});

function closeAlert() {
	modalAlert.classList.remove('modal__fill-alert--opened');
}

alertClose.addEventListener('click', closeAlert);


///MenuHighlight

let sections = document.querySelectorAll('section');
let menuItems = document.querySelectorAll('.header__nav-item');
sections.forEach(function(item) {
	item.addEventListener('mouseover', function(e) {
		menuItems.forEach((item)=>{
			item.classList.remove('header__nav-item--active');
		})
		let data = item.dataset.section;
		if (data === 'about') {
			menuItems[1].classList.add('header__nav-item--active');
		}
		if (data === 'how') {
			menuItems[2].classList.add('header__nav-item--active');
		}
		if (data === 'questions') {
			menuItems[4].classList.add('header__nav-item--active');
		}
	})

});


//Menu scroll


for (let i = 0; i < menuItems.length; i++) {
	menuItems[i].addEventListener('click', function(){
		let target = this.dataset.item;

		for (let i = 0; i < sections.length; i++) {
			if (!target) {
				return;
			}
			else if (sections[i].dataset.section === target) {
				sections[i].scrollIntoView({block: "start", behavior: "smooth"});
				burger.classList.remove('header__burger--opened');
				header.classList.remove('header--opened');
		 		menu.style.height = '';
		 	}
		}			
	})
}
for (let item of menuItems) {

}
// function scroll() {
// 	console.log('fired');
// 	let target = this.dataset.item;
// 	console.log(target);
// 	for (let i = 0; i < sections.length; i++) {
// 		if (sections[i].dataset.section === target) {
// 			sections[i].scrollIntoView({block: "start", behavior: "smooth"});
// 		}
// 	}
// }