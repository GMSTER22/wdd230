// Directory cards

const companiesUrl = "https://gmster22.github.io/wdd230/chamber/data/companies.json";

const directoryCardsElement = document.querySelector( '.directory__cards' );
const gridButton = document.querySelector( '#grid-button' );
const listButton = document.querySelector( '#list-button' );

const cardsElement = document.querySelector( '.directory__cards' );

gridButton?.addEventListener( 'click', onGridButtonClick );
listButton?.addEventListener( 'click', onListButtonClick );

fetchData( companiesUrl );

async function fetchData( url ) {

  const response = await fetch( url );
  const data = await response.json();
  generateDOM(data);

}

function generateDOM( data ) {

  data.forEach( company => {

    const { name, address, phone, imageurl, website } = company;

    const cardElement = document.createElement( 'div' );
    const imageElement = document.createElement( 'img' );
    const nameElement = document.createElement( 'span' );
    const addressElement = document.createElement( 'span' );
    const phoneElement = document.createElement( 'span' );
    const anchorElement = document.createElement( 'a' );

    cardElement.classList.add( 'directory__card' );

    imageElement.setAttribute( 'src', `./images/directory/${imageurl}` );
    imageElement.setAttribute( 'alt', `${name} logo image` );

    nameElement.textContent = name;
    nameElement.classList.add( 'directory__card-name' );

    addressElement.textContent = address;

    phoneElement.textContent = phone;

    anchorElement.setAttribute( 'href', website );
    anchorElement.setAttribute( 'target', '_blank' );
    anchorElement.textContent = website;

    cardElement?.append( nameElement, imageElement, addressElement, phoneElement, anchorElement );

    cardsElement?.append( cardElement );

  } );

}

function onGridButtonClick() {

  const classes = directoryCardsElement.classList;

  if ( classes.contains( 'grid' ) ) return;

  classes.toggle( 'list' );
  classes.toggle( 'grid' );
  // if ( classes.contains( 'list' ) ) classes.remove( 'list' );
  // classes.add( 'grid' );

}

function onListButtonClick() {

  const classes = directoryCardsElement.classList;

  if ( classes.contains( 'list' ) ) return;

  classes.toggle( 'list' );
  classes.toggle( 'grid' );

  // if ( classes.contains('grid') ) classes.remove( 'grid' );
  // classes.add( 'list' );

}