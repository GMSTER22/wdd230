
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  console.table(data.prophets);

  displayProphets(data.prophets);
}

getProphetData();

function displayProphets(prophets) {

  const cards = document.querySelector('div.cards');

  prophets.forEach(prophet => {
    
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let portrait = document.createElement('img');
    let dateOfBirth = document.createElement('span');
    let placeOfBirth = document.createElement('span');

    const { name, lastname, birthdate, birthplace, imageurl } = prophet;
    
    h2.textContent = `${name} ${lastname}`;

    dateOfBirth.textContent = `Date of Birth: ${birthdate}`;
    placeOfBirth.textContent = `Place of Birth: ${birthplace}`;

    portrait.setAttribute('src', imageurl);
    portrait.setAttribute('alt', `Portrait fo ${name} ${lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.append(h2, dateOfBirth, placeOfBirth, portrait);

    cards.append(card);
    
  });

}