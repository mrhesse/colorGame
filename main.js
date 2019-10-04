var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var newColors = document.querySelector("#newColors");

colorDisplay.textContent = pickedColor;

newColors.addEventListener("click", function() {
  // generate all new colors
  colors = generateRandomColors(6);
  // pick a new random color 
  pickedColor = pickColor();
  // display new picked color
  colorDisplay.textContent = pickedColor;
  // change color of squares
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
  }
  h1.style.background = "#232323";
})

for(var i = 0; i < squares.length; i++) {
  // add random colors to squares
  squares[i].style.background = colors[i];
  // add click listener to squares
  squares[i].addEventListener("click", function() {
    // grab colors of clicked squares
    var clickedColor = this.style.background;
    // compare color to pickedColor 
    if(clickedColor === pickedColor){
      messageDisplay.textContent = "Correct!";
      newColors.textContent = "Play Again?";
      changeColors(clickedColor);
      h1.style.background = clickedColor;
    } else {
      this.style.background = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  })
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

