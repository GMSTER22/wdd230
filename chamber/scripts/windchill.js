const temperatureElement = document.querySelector( '#temperature' );
const windSpeedElement = document.querySelector( '#wind-speed' );
const windChillElement = document.querySelector( '#wind-chill' );

let TEMPERATURE = 35;
let WIND_SPEED = 5;

temperatureElement.textContent = TEMPERATURE;
windSpeedElement.textContent = `${WIND_SPEED} mph`;

if ( TEMPERATURE <= 50 && WIND_SPEED > 3 ) {

  let windChill = windChillCalculator( TEMPERATURE, WIND_SPEED );
  
  windChillElement.textContent = windChill.toFixed(2);

} else {

  windChillElement.textContent = 'N/A';

}

function windChillCalculator( t, s ) {

  return 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);

}