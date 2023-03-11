const temperatureElement = document.querySelector( '#temperature' );
const windSpeedElement = document.querySelector( '#wind-speed' );
const windChillElement = document.querySelector( '#wind-chill' );
const weatherIconElement = document.querySelector( '#weather-icon' );
const weatherDescriptionElement = document.querySelector( '#weather-description' );
const cityName = 'Ouagadougou';
const apiKey = '35a048387396cef80aecd7fe57f94b9e';

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

function windChillCalculator( t, s ) {

  return 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);

}

function convertFahrenheitToCelsius( temperatureInFahrenheit ) {

  return ( temperatureInFahrenheit - 32 ) * ( 5 / 9 );

}

async function apiFetch() {

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
  
}

apiFetch();

function displayResults( data ) {
  // console.log(data);
  const temperature = data.main.temp.toFixed(0);
  const windSpeed = data.wind.speed;
  const iconSource = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const iconDescription = data.weather[0].icon;

  weatherDescriptionElement.textContent = data.weather[0].description;
  weatherIconElement.setAttribute( 'src', iconSource );
  weatherIconElement.setAttribute( 'alt', iconDescription );
  temperatureElement.textContent = convertFahrenheitToCelsius( temperature ).toFixed( 0 );
  windSpeedElement.textContent = `${windSpeed} mph`;

  if ( temperature <= 50 && windSpeed > 3 ) {

    const windChill = windChillCalculator( temperature, windSpeed );
    
    windChillElement.textContent = windChill.toFixed(2);
  
  } else {
  
    windChillElement.textContent = 'N/A';
  
  }

}