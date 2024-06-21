const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.rightSide');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});





window.addEventListener('scroll', function() {
  const fadeIns = document.querySelectorAll('#fade-in');
  for (let i = 0; i < fadeIns.length; i++) {
    const fadeIn = fadeIns[i];
    const fadeInPosition = fadeIn.getBoundingClientRect().top + fadeIn.offsetHeight / 2;
    const screenPosition = window.innerHeight;
    if (fadeInPosition < screenPosition) {
      fadeIn.style.opacity = '1';
    }
  }
});





const tl = gsap.timeline({defaults: { ease: 'power1.out' } });

tl.to('.text', {y:'0%', duration: 1, stagger: 0.25 });
tl.to('.slider', {y: '-100%', duration: 1.5, delay: 0.5 });
tl.to('.intro', {y: '-100%', duration: 1 }, '-=1');
tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration: 1 });
tl.fromTo('h1', {opacity: 0}, {opacity: 1, duration: 1 }, '-=1');
tl.fromTo('.get-quote', {opacity: 0}, {opacity: 1, duration: 1 }, '-=1');


const toTop = () => window.scrollTo({top: 0, behavior: 'smooth'});



$('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;
    
    function move(newIndex) {
      var animateLeft, slideLeft;
      
      advance();
      
      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }
      
      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');
      
      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }
      
      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }
    
    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }
    
    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });
    
    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });
    
    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');
      
      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
    
    advance();
  });

  




  const galleryContainer = document.querySelector('.gallery-container');
  const galleryControlsContainer = document.querySelector('.gallery-controls');
  const galleryControls = ['previous', 'next'];
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  class Carousel {
    constructor(container, items, controls){
      this.carouselContainer = container;
      this.carouselControls = controls;
      this.carouselArray = [...items];
    }
  
    updateGallery(){
      this.carouselArray.forEach(el => {
        el.classList.remove('gallery-item-1');
        el.classList.remove('gallery-item-2');
        el.classList.remove('gallery-item-3');
        el.classList.remove('gallery-item-4');
        el.classList.remove('gallery-item-5');
      });
  
      this.carouselArray.slice(0,5).forEach((el, i) => {
        el.classList.add(`gallery-item-${i+1}`);
      });
    }
  
    setCurrentState(direction){
      if (direction.className == 'gallery-controls-previous'){
        this.carouselArray.unshift(this.carouselArray.pop());
      } else {
        this.carouselArray.push(this.carouselArray.shift());
      }
      this.updateGallery();
    }
  
    setControls(){
      this.carouselControls.forEach(control => {
        galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        document.querySelector(`.gallery-controls-${control}`).innerText = control;
      });
    }
  
    useControls(){
      const triggers = [...galleryControlsContainer.childNodes];
      triggers.forEach(control => {
        control.addEventListener('click', e => {
          e.preventDefault();
          this.setCurrentState(control);
        });
      });
    }
  }
  
  const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
  exampleCarousel.setControls();
  exampleCarousel.useControls();
