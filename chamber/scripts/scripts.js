// Date

const date = new Date();

const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};

document.querySelector('#nav-date').textContent = date.toLocaleDateString('en', options);

document.querySelector('#year').textContent = date.getFullYear();

document.querySelector('#footer-date').textContent = date.toLocaleString();


// Navigation button

const navElement = document.querySelector( 'nav' ); 

const buttonElement = document.querySelector('.nav-menu');

const closeNavButtonElement = document.querySelector( '#close-button' );

buttonElement.addEventListener( 'click', () => {

  let isNavOpen = Array.from(navElement.classList).includes('nav-open');

  console.log(isNavOpen);

  navElement.classList.toggle( 'nav-open', ! isNavOpen );

} );

closeNavButtonElement.addEventListener( 'click', () => navElement.classList.remove( 'nav-open' ) );