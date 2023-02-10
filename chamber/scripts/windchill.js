const temperatureElement = document.querySelector( '#temperature' );
const windSpeedElement = document.querySelector( '#wind-speed' );
const windChillElement = document.querySelector( '#wind-chill' );

let temperature = 35;
let windSpeed = 5;

temperatureElement.textContent = temperature;
windSpeedElement.textContent = `${windSpeed} mph`;

if ( temperature <= 50 && windSpeed > 3 ) {

  let windChill = windChillCalculator( temperature, windSpeed );
  
  windChillElement.textContent = windChill.toFixed(2);

}

function windChillCalculator( t, s ) {

  return 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);

}