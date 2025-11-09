import Cards from './Cards.jsx'
import Carousel from './Carousel.jsx'
import ReactDOM from 'react-dom/client'
import { playNextBackgroundImage } from './utilities.js';

const cards = document.getElementById('cards')
if (cards) {
  ReactDOM.createRoot(cards).render(<Cards />)
}


const carousel = document.getElementById('carousel')
if (carousel) {
  ReactDOM.createRoot(carousel).render(<Carousel />)
}

// @TODO: refactor this to React component
// set up text to print, each item in array is new line
var aText = new Array(
    "Hello, I am Haowei Guo. I am a software engineer.",
    "I CODE things."
);
var iSpeed = 70; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    // sContents =  ' ';
    // iRow = Math.max(0, iIndex-iScrollAt);
    // var destination = document.getElementById("typedtext");

    // while ( iRow < iIndex ) {
    //     sContents += aText[iRow++] + '<br />';
    // }
    // destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<span class='blink_me'>_</span>";
    // if ( iTextPos++ == iArrLength ) {
    //     iTextPos = 0;
    //     iIndex++;
    //     if ( iIndex != aText.length ) {
    //         iArrLength = aText[iIndex].length;
    //         setTimeout("typewriter()", 500);
    //     }
    // } else {
    //     setTimeout("typewriter()", iSpeed);
    // }
}

typewriter();

// function autoPlayNextImage() {
//   playNextBackgroundImage();
// }

// setInterval(autoPlayNextImage, 1500);