
const input = document.querySelector( 'input' );

const list = document.querySelector( 'ul' );

const button = document.querySelector( 'button' );

button.addEventListener( 'click', () => {

  if ( ! input.value ) {
    alert( 'Input is empty!' );
    return;
  }

  const newChapter = input.value;
  input.value = '';

  const listItem = document.createElement( 'li' );
  const listText = document.createElement( 'span' );
  const listBtn = document.createElement( 'button' );

  listText.textContent = newChapter;
  listBtn.textContent = '❌';
  listBtn.classList.add( 'delete' );

  listItem.append( listText, listBtn );

  list.appendChild( listItem );

  listBtn.addEventListener( 'click', () => listItem.remove() );

  input.focus();

} );