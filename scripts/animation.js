var navbarState = false;

function returnWidth() {
    var width = parseInt(window.innerWidth);
    if (width >= 750) {
        return "400px";
    } else {
        return "300px";
    }
}

function toggleNav() {
    console.log(window.innerWidth);
    if (!navbarState) {document.getElementById("myNav").style.width = returnWidth();}
    else {document.getElementById("myNav").style.width = "0px";}
    navbarState = !navbarState;
}

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
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById("typedtext");

    while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<span class='blink_me'>_</span>";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}

typewriter();

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function playNextBackgrondImage(inc) {
    inc = inc || 1;
    const imageDiv = document.getElementById('header');
    const oldBackground = imageDiv.classList[0];
    let idx = parseInt(oldBackground.slice(-1));
    idx += inc;
    if (idx > 3) {
        idx = 1;
    } else if (idx < 1) {
        idx = 3;
    }

    console.log(oldBackground);
    imageDiv.className = `header-${idx.toString()} w3-opacity w3-display-container`;
    console.log(imageDiv.className);
}

function autoPlayNextImage() {
    playNextBackgrondImage();
}

setInterval(autoPlayNextImage, 10000);
