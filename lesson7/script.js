
const images = document.querySelectorAll('img[data-src]');

const loadImages = image => {

  let src = image.dataset.src;

  image.setAttribute('src', src);

  image.addEventListener('load', e => image.removeAttribute('data-src'));

}

if ( "IntersectionObserver" in window ) {
  
  let observer = new IntersectionObserver( ( entries, observer ) => {

    entries.forEach( entry => {

      if (entry.isIntersecting) {
        
        loadImages( entry.target );

        observer.unobserve( entry.target );

      }

    } )

  }, { threshold: 0.5 } );

  images.forEach( image => {

    observer.observe( image );

  } )

} else {

  images.forEach( image => loadImages( image ) );

}