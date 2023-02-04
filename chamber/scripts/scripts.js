// Date

const date = new Date();

const day = date.toLocaleDateString('en', { day: 'numeric' });
const weekday = date.toLocaleDateString('en', { weekday: 'long' });
const month = date.toLocaleDateString('en', { month: 'long' });
const year = date.toLocaleDateString('en', { year: 'numeric' });

document.querySelector('#nav-date').textContent = `${weekday}, ${day} ${month} ${year}`;

document.querySelector('#year').textContent = date.getFullYear();

document.querySelector('#footer-date').textContent = date.toLocaleString('en-GB');

//Banner

let numericWeekday = date.getDay();
const bannerElement = document.querySelector( '#banner' );

if ( numericWeekday === 1 || numericWeekday === 2 ) {

  bannerElement.style.display = 'block';

} else {

  bannerElement.style.display = 'none';

}

// Navigation button

const navElement = document.querySelector( 'nav' ); 

const buttonElement = document.querySelector('.nav-menu');

buttonElement.addEventListener( 'click', () => {

  const { height: headerHeight } = document.querySelector( 'header' ).getBoundingClientRect();

  // if ( ! navElement.classList.contains( 'nav-open' ) ) navElement.style.top = `${headerHeight}px`;

  // if ( navElement.classList.contains( 'nav-open' ) ) navElement.style.removeProperty( 'top' );

  navElement.style.top = `${headerHeight}px`;

  navElement.classList.toggle( 'nav-open' );

} );