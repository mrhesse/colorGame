var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var newColors = document.querySelector("#newColors");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.background;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        newColors.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        h1.style.color = contrastColor(getRGB(clickedColor));
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  newColors.textContent = "New Colors";
  messageDisplay.textContent = "";
  for(var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "#4682B4";
  h1.style.color = "#ffffff";
}


newColors.addEventListener("click", function() {
  reset();
})

/* generate squares and game logic */
for(var i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function() {
    var clickedColor = this.style.background;
    if(clickedColor === pickedColor){
      messageDisplay.textContent = "Correct!";
      newColors.textContent = "Play Again?";
      changeColors(clickedColor);
      h1.style.background = clickedColor;
    } else {
      this.style.background = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  });
}

function changeColors(color) {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  for(var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


function getRGB(color) {
  var rgb = color.substring(color.indexOf('(') +1, color.length -1).split(', ');
  return rgb;
}

/* takes the array of the rgb color and calculates the luminance to determine the color of the font to meet w3c guidelines for accessibility */
function contrastColor(rgb) {
  var lrgb = [];
  rgb.forEach(function(l){
    l = l / 255.0;
    if(l <= 0.03928) {
      l = l / 12.92;
    } else {
      l = Math.pow((l + 0.055) / 1.055, 2.4);
    }
    lrgb.push(l);
  });
  var lumin = 0.2126 * lrgb[0] + 0.7152 * lrgb[1] + 0.0722 * lrgb[2];
  return (lumin > 0.179) ? '#000000' : '#ffffff';
}

