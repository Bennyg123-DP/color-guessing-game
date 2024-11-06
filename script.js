// Number of circles we have in the game
var numCircles = 6;
// The colour variable should be an array that contains as many random RGB colours as there are circles. 
var colours = [];
// This pickedColor is the RGB color we are trying to guess (string)
var pickedColor;
// This is the default colour of the game. 
let defaultColour = "#582c99";

// Grab all appropriate elements from the HTML.
var circles = document.querySelectorAll(".circle");
var colourToGuess = document.getElementById("colour-to-guess");
var resultMessage = document.getElementById("result-message");
var banner = document.querySelector("h1");
var resetButton = document.querySelector("button");

init();

function init() {
    // Call the reset function to initialize the game
    reset();

    // Setup click listeners for each circle
    circles.forEach(circle => {
        circle.addEventListener("click", clickCircle);
    });

    // Setup click listener for the reset button
    resetButton.addEventListener("click", reset);
}

// Define the reset function
function reset() {
    // Generate new colors
    colours = genRandomColours();
    // Pick a new target color
    pickedColor = chooseColor();
    // Display the RGB value to be guessed
    colourToGuess.textContent = pickedColor;

    // Set initial UI state
    banner.style.backgroundColor = defaultColour;
    resetButton.textContent = "Restart";
    resultMessage.textContent = "";

    // Set colors for circles
    circles.forEach((circle, index) => {
        circle.style.backgroundColor = colours[index];
        circle.style.display = "block";
    });
}

// Define what should happen when any circle is clicked
function clickCircle() {
    // Get the color of the clicked circle
    var clickedColor = this.style.backgroundColor;

    // Check if the clicked color matches the target color
    if (clickedColor === pickedColor) {
        // Correct guess
        resultMessage.textContent = "You win";
        resetButton.textContent = "Play again";
        banner.style.backgroundColor = pickedColor;
        
        // Set all circles to the winning color
        circles.forEach(circle => {
            circle.style.backgroundColor = pickedColor;
        });
    } else {
        // Incorrect guess
        this.style.backgroundColor = defaultColour;
        resultMessage.textContent = "Try again";
    }
}

// Write a function to make a random RGB color
function makeColour() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Write a function that will set new values for the colours array
function genRandomColours() {
    var arr = [];
    for (var i = 0; i < numCircles; i++) {
        arr.push(makeColour());
    }
    return arr;
}

// Return one of the 6 RGB colours you created and stored in colours
function chooseColor() {
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}
