
// Navigation

const openButton = document.querySelector( '#open' );

const closeButton = document.querySelector( '#close' );

const navElement = document.querySelector( 'nav' );

const toggleMenu = () => navElement.classList.toggle( 'active' );

const onOpenButtonClick = () => toggleMenu();

const onCloseButtonClick = () => toggleMenu();

openButton.addEventListener( 'click', onOpenButtonClick );

closeButton.addEventListener( 'click', onCloseButtonClick );

// Set footer date

const date = new Date();

const lastUpdateElement = document.querySelector( '#last-update' );

lastUpdateElement.textContent = date.toLocaleString('en');

// Weather API call

const cityName = 'Carlsbad';
const apiKey = '35a048387396cef80aecd7fe57f94b9e';

const openWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${ cityName }&appid=${ apiKey }&units=imperial`;

async function fetchWeatherData( url ) {

  try {
    const response = await fetch( url );
    if (response.ok) {
      const data = await response.json();

      displayMainWeather( data.list[ 0 ] );

      displayWeatherForecasts( data.list );

    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    throw new Error( 'Failed to fetch open weather API data' );
  }
  
}

function displayWeatherForecasts( weatherData ) {

  for (let index = 8; index <= 24; index += 8) {

    const { dt_txt, main, weather } = weatherData[index];

    const date = new Date( dt_txt.split(' ')[ 0 ].split('-').join( ',' ) );

    const { temp: temperature } = main;

    const { description, icon } = weather[ 0 ];

    const iconSource = `https://openweathermap.org/img/w/${ icon }.png`;

    const shortWeekDay = date.toLocaleString('en', { weekday: 'short' });

    const forecastData = { shortWeekDay, iconSource, description, temperature };

    displaySingleForecast( forecastData );
    
  }

}

function displaySingleForecast( forecastData ) {

  const { shortWeekDay, iconSource, description, temperature } = forecastData;

  const forecastsWrapperElement = document.querySelector( '.info__weather-forecasts' );

  const singleForecastWrapperElement = document.createElement( 'div' );
  singleForecastWrapperElement.classList.add( 'info__weather-forecast' );

  const forecastDayElement = document.createElement( 'span' );
  forecastDayElement.classList.add( 'forecast-day' );
  forecastDayElement.textContent = shortWeekDay;

  const forecastInfoElement = document.createElement( 'div' );
  forecastInfoElement.classList.add( 'forecast-info' );

  const forecastImageElement = document.createElement( 'img' );
  forecastImageElement.setAttribute( 'src', iconSource );
  forecastImageElement.setAttribute( 'alt', description );

  const forecastTemperatureElement = document.createElement( 'span' );
  forecastTemperatureElement.textContent = `${ temperature } °F`;

  forecastInfoElement.append( forecastImageElement, forecastTemperatureElement );
  forecastInfoElement.append( forecastImageElement, forecastTemperatureElement );

  const forecastDescriptionElement = document.createElement( 'span' );
  forecastDescriptionElement.classList.add( 'forecast-description' );
  forecastDescriptionElement.textContent = description;

  singleForecastWrapperElement?.append( forecastDayElement, forecastInfoElement, forecastDescriptionElement );

  forecastsWrapperElement?.append( singleForecastWrapperElement );

}

function displayMainWeather( weatherData ) {

  const { main, weather } = weatherData;

  const { temp, humidity } = main;

  const { description, icon } = weather[ 0 ];

  const iconSource = `https://openweathermap.org/img/w/${ icon }.png`;
 
  const weatherMainContentElement = document.querySelector( '.weather__main-content' );

  const weatherMainInnerContent = `
  
    <div class="weather__main-info">

      <h3>${ description }</h3>

      <div>

        <img src="${ iconSource }" alt="${ icon }">

        <span>${ temp } °F</span>

      </div>

    </div>

    <div class="weather__main-humidity">

      Humidity: <span>${ humidity }%</span>

    </div>
  
  `;

  if ( weatherMainContentElement ) weatherMainContentElement.innerHTML = weatherMainInnerContent;

}

fetchWeatherData( openWeatherURL );

// Set Number of drinks ordered

const orderCountElement = document.querySelector( '#order-count' );

function setOrderCount() {

  const orderCount = localStorage.getItem( 'bountifulFoodOrderCount' );

  if ( orderCount ) {

    orderCountElement.textContent = `${ orderCount } ${ orderCount > 1 ? 'drinks' : 'drink' }`;

  } else {

    orderCountElement.textContent = `0 drinks`;

  }

}

if ( orderCountElement ) { setOrderCount() };

// Fresh page

const fruitURL = "https://brotherblazzard.github.io/canvas-content/fruit.json";

let fetchedFruitsData = [];

const fetchFruitsData = async url => {

  try {
    const response = await fetch( url );

    if ( response.ok ) {

      const data = await response.json();

      fetchedFruitsData = data;

      // console.log( fetchedFruitsData );

      // console.log( 'fetched' );

      return data;

    } else {

      throw new Error( response.text() );

    }

  } catch (error) {
    
    throw new Error('Failed to fetch fruit data');

  }

}

async function setFruitSelect() {

  const fruitsData = await fetchFruitsData( fruitURL );

  const fruitSelectElements = document.querySelectorAll( '#fruit-select' );

  if ( fruitSelectElements ) {

    fruitSelectElements.forEach( fruitSelectElement => {

      fruitsData.forEach( fruitData => {

        const { name: fruitName } = fruitData;

        const fruitOptionElement = createFruitOptionElement( fruitName );

        fruitSelectElement.append( fruitOptionElement );

      } )

    } )

  }

}

function createFruitOptionElement( fruitName ) {

  const optionElement = document.createElement( 'option' );

  optionElement.setAttribute( 'value', fruitName.toLowerCase() );

  optionElement.textContent = fruitName;

  return optionElement;

}

setFruitSelect();

// Submiting form

const freshFormElement = document.querySelector( '#fresh-form' );

freshFormElement?.addEventListener( 'submit', event => {

  event.preventDefault();

  const name = document.querySelector( '#firstname' ).value;

  const email = document.querySelector( '#email' ).value;

  const phone = document.querySelector( '#phone' ).value;

  const instructions = document.querySelector( '#instructions' ).value;

  const fruitsSelected = document.querySelectorAll( '#fruit-select' );

  const fruitOne = fruitsSelected[ 0 ].value;

  const fruitTwo = fruitsSelected[ 1 ].value;

  const fruitThree = fruitsSelected[ 2 ].value;

  const selectedFruitsData = fetchedFruitsData.filter( fruit => fruit.name.toLowerCase() === fruitOne.toLowerCase() || fruit.name.toLowerCase() === fruitTwo.toLowerCase() || fruit.name.toLowerCase() === fruitThree.toLowerCase() );

  const amountOfCarbohydrates = calculateTotalNutrients( "Carbohydrates", selectedFruitsData );

  const amountOfProtein = calculateTotalNutrients( "Protein", selectedFruitsData );

  const amountOfFat = calculateTotalNutrients( "Fat", selectedFruitsData );

  const amountOfSugar = calculateTotalNutrients( "Sugar", selectedFruitsData );

  const amountOfCalories = calculateTotalNutrients( "Calories", selectedFruitsData );

  const orderData = [ 
    { 
      name: 'Name',
      value: name 
    }, {
      name: 'Email',
      value: email
    }, {
      name: 'Phone',
      value: phone
    }, {
      name: 'Fruit 1',
      value: fruitOne
    }, {
      name: 'Fruit 2',
      value: fruitTwo
    }, {
      name: 'Fruit 3',
      value: fruitThree
    }, {
      name: 'Carbohydrates',
      value: amountOfCarbohydrates
    }, {
      name: 'Protein',
      value: amountOfProtein
    }, {
      name: 'Fat',
      value: amountOfFat
    }, {
      name: 'Sugar',
      value: amountOfSugar
    }, {
      name: 'Calories',
      value: amountOfCalories
    }, {
      name: 'Date',
      value: new Date().toLocaleDateString()
    }, {
      name: 'Instuctions',
      value: instructions
    } 
  ];

  // console.log( selectedFruitsData );

  // console.log(amountOfCarbohydrates);
  // console.log(amountOfProtein);
  // console.log(amountOfFat);
  // console.log(amountOfSugar);
  // console.log(amountOfCalories);

  displayOrder( orderData );

} );

function displayOrder( orderInfo ) {

  updateFreshCardElement();

  const freshWrapperElement = document.querySelector( '.fresh' );

  const freshCardElement = document.createElement( 'div' );
  freshCardElement.classList.add( 'fresh-card' );

  const orderHeadingElement = document.createElement( 'h2' );
  orderHeadingElement.textContent = "Order";

  const freshCardEntries = document.createElement( 'div' );
  freshCardEntries.classList.add( 'fresh-card__entries' );

  orderInfo.forEach( order => {

    const { name, value } = order;

    const freshCardEntry = document.createElement( 'div' );
    freshCardEntry.classList.add( 'fresh-card__entry' );

    const firstSpan = document.createElement( 'span' );
    const secondSpan = document.createElement( 'span' );

    firstSpan.textContent = name;

    if ( value ) {

      secondSpan.textContent = value;

    } else {

      secondSpan.textContent = 'N/A';

    }    

    freshCardEntry.append( firstSpan, secondSpan );

    freshCardEntries.append( freshCardEntry );

  } );

  freshCardElement.append( orderHeadingElement, freshCardEntries );

  freshWrapperElement.prepend( freshCardElement );

  countOrder();

  document.querySelector( '#fresh-form' ).reset();

  document.body.scrollTop = document.documentElement.scrollTop = 0;

}

function countOrder() {

  const orderCount = + localStorage.getItem( "bountifulFoodOrderCount" );

  if ( ! orderCount ) {

    localStorage.setItem( "bountifulFoodOrderCount", 1 );

  } else {

    localStorage.setItem( "bountifulFoodOrderCount", orderCount + 1 )

  }

}

function updateFreshCardElement() {

  const freshCardElement = document.querySelector( '.fresh-card' );

  if ( freshCardElement ) {

    freshCardElement.remove();

  } 

}

function calculateTotalNutrients( nutrientName, fruitsData ) {

  let total = 0;

  fruitsData.forEach( fruitData => {

    const { nutritions } = fruitData;

    const nutrientAmount = nutritions[ nutrientName.toLowerCase() ];

    total += nutrientAmount;

  } );

  return total.toFixed( 2 );

}

// setTimeout(() => {
  // if (fetchedFruitsData.length) console.log(fetchedFruitsData)
// }, 1000);
