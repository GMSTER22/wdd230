// Date

const date = new Date();

const day = date.toLocaleDateString('en', { day: 'numeric' });
const weekday = date.toLocaleDateString('en', { weekday: 'long' });
const month = date.toLocaleDateString('en', { month: 'long' });
const year = date.toLocaleDateString('en', { year: 'numeric' });

document.querySelector('#nav-current-date').textContent = `${weekday}, ${day} ${month} ${year}`;

document.querySelector('#year').textContent = date.getFullYear();

document.querySelector('#footer-date').textContent = date.toLocaleString('en-GB');

//Banner

const numericWeekday = date.getDay();
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


// Lazy loading images

const imagesToLoad = document.querySelectorAll( '[data-src]' );

const loadImage = ( image ) => {

  image.setAttribute( 'src', image.dataset.src );

  image.addEventListener( 'load', e => image.removeAttribute( 'data-src' ) );

}

const intersectionObserverOptions = {

  threshold: 0.5

}

if ( 'IntersectionObserver' in window ) {

  const intersectionObserver = new IntersectionObserver( onIntersectionObserver, intersectionObserverOptions );

  imagesToLoad.forEach( image => {
    
    intersectionObserver.observe( image );

  } );

} else {

  imagesToLoad.forEach( image => loadImage( image ) )

}

function onIntersectionObserver( entries, intersectionObserver ) {

  entries.forEach( entry => {

    if ( entry.isIntersecting ) {

      loadImage( entry.target );

      intersectionObserver.unobserve( entry.target );

    }
    
  } );

}

// Time between user visits to the site

const lastVisit = () => localStorage.getItem( 'lastVisit' );

if ( ! lastVisit() ) {

  document.querySelector('#nav-last-visit').textContent = `First Visit`;

} else {

  const duration = date.getTime() - lastVisit();

  const days = Math.round( duration / 1000 / 60 / 60 / 24 );

  document.querySelector('#nav-last-visit').textContent = `Last visit: ${ days } ${ days > 1 ? 'days' : 'day' } ago`;

}

localStorage.setItem( 'lastVisit', date.getTime() );


// Setting value of the hidden

const submissionInputElement = document.querySelector( '#submissionDate' );

window.addEventListener( 'load', (event) => submissionInputElement.value = date.toISOString().substring(0,10) );