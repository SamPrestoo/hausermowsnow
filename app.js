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
