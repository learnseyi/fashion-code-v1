'use strict'
const head = document.querySelector('.head-section');
const nav = document.querySelector('nav');
const nav__bar = document.querySelector('#nav-section');
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.c-item');
const nav__btn = document.querySelectorAll('.nav-btn');
const sWidth = slides[0].getBoundingClientRect().width;
const position = head.getBoundingClientRect().height;
const options = {
	root: null,
	rootMargin: position.height,
	threshold: [0, 0.25, 0.5, 0.75, 1]
}
//nav-btn function
const navBtnActive = (index) =>{
	nav__btn.forEach(btn=>{
		if(nav__btn[index] === btn){
			btn.classList.add('active');
		}else{btn.classList.remove('active')}
	})
}
// navBar fade effect function expression.
const navBarEffect = (x)=>{
   x.forEach(entry =>{
        if(!entry.isIntersecting){
            nav.classList.add('scrolled');
    }else{nav.classList.remove('scrolled')}
   })
}

// initializing intersection observer for navBar fade effect
const observer = new IntersectionObserver((entries,options) =>{
	navBarEffect(entries);
})
// positioning carousel items
const setSlidePosition = (z) =>{
	z.forEach((slide,index)=>{
		slide.style.left = sWidth * index + 'px';
	})
}
// start carousel ride
const navScroll = () =>{
	let count = 0;
	setInterval(()=>{
		count++
		if(count <= slides.length-1){
			let curr = slides[count];
			let next = curr.nextElementSibling;
			if(next !== 'undefined'){
				navBtnActive(count);
				sliderContainer.style.transform = 'translateX(-'+ curr.style.left +')';
				curr = next;
			}
		}else{
			sliderContainer.style.transform = 'none';
			count = 0;
			navBtnActive(count);
		}
	},3000);	
}
//implementing site navigation
const smoothScroll = () =>{
		nav__bar.addEventListener('click',(e)=>{
			e.preventDefault();
			if(e.target.hasAttribute('href')){
				const location = e.target.getAttribute('href');
        if(location !== '#')
				document.querySelector(location).scrollIntoView({behavior:'smooth'});
			}
		})
}
setSlidePosition(slides);
smoothScroll();
observer.observe(head);
setInterval(navScroll,3000);
