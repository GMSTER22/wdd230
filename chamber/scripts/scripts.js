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

  navElement.style.top = `${headerHeight}px`;

  navElement.classList.toggle( 'nav-open' );

} );

// Navigation active class

const navLinks = Array.from( document.querySelectorAll( 'nav li a' ) );

const currentLocation = location.pathname.match( /\w+.html$/ );

if ( currentLocation ) {

  const linkName = currentLocation[0].split('.')[0];

  const currentLink = navLinks.filter( link => link.textContent.toLowerCase() == linkName.toLowerCase() );

  currentLink[0]?.classList.toggle( 'active' );

}

// Spotlight Logic

const locationHref = location.href.split("/").reverse()[0];

if ( locationHref === 'index.html' || locationHref === '' ) fetchData();

function shuffleArray( array ) {

  return array.sort( () => Math.random() - 0.5 );

}

async function fetchData() {

  const companiesUrl = "../chamber/data/companies.json";

  const response = await fetch( companiesUrl );
  const data = await response.json();
  const filteredCompanies = data.filter( company => company.membership === 'gold' || company.membership === 'silver' );

  const selectedCompanies = shuffleArray( filteredCompanies ).slice( 0, 3);

  generateSpotlights(selectedCompanies);

  console.warn('attempted to fetch and parse');

}

function generateSpotlights(companies) {

  const spotlightsElement = document.querySelector( '.spotlights' );

  companies.forEach( (company, index) => {

    const { name, website, phone, imageurl, message } = company;

    const sectionElement = document.createElement( 'section' );
    sectionElement?.classList.add( `spotlight-${index + 1}` );
    
    const h2Element = document.createElement( 'h2' );
    h2Element.textContent = name;

    const imageElement = document.createElement( 'img' );
    imageElement.setAttribute( 'src', `./images/directory/${imageurl}` );
    imageElement.setAttribute( 'alt', name.toLowerCase() );

    const paragraphElement = document.createElement( 'p' );
    paragraphElement.textContent = message;

    const hrElement = document.createElement( 'hr' );
    
    const spanElement = document.createElement( 'span' );
    spanElement.textContent = 'Contact Information:';

    const addressElement = document.createElement( 'address' );
    addressElement.classList.add( `spotlights__address` );

    const websiteLinkElement = document.createElement( 'a' );
    websiteLinkElement.setAttribute( 'href', website );
    websiteLinkElement.textContent = website;

    const brElement = document.createElement( 'br' );

    const phoneLinkElement = document.createElement( 'a' );
    phoneLinkElement.setAttribute( 'href', phone );
    phoneLinkElement.textContent = phone;

    addressElement.append( websiteLinkElement, brElement, phoneLinkElement );

    sectionElement.append( h2Element, imageElement, paragraphElement, hrElement, spanElement, addressElement );

    spotlightsElement?.append( sectionElement );

  } );

}

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

if ( submissionInputElement ) {

  window.addEventListener( 'load', (event) => submissionInputElement.value = date.toISOString().substring(0,10) );

}

