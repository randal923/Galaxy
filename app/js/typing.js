// set up text to print, each item in array is new line
const textArray = [
  "Hello, my name is Randal A. Nunes",
  "I am a Full Stack Web Developer and a Javascript specialist."
];

const speed = 30; // time delay of print out
let index = 0; // start printing array at this posision
let arrayLength = textArray[0].length; // the length of the text array
const scroll = 20; // start scrolling up at this many lines

let textPosition = 0; // initialise text position
let content = ""; // initialise contents variable
let row; // initialise current row

function typewriter() {
  content = " ";
  row = Math.max(0, index - scroll);
  let destination = document.getElementById("typing-effect__h1");

  while (row < index) {
    content += textArray[row++] + "<br />";
  }

  destination.innerHTML = content + textArray[index].substring(0, textPosition);
  if (textPosition++ == arrayLength) {
    textPosition = 0;
    index++;
    if (index != textArray.length) {
      arrayLength = textArray[index].length;
      setTimeout("typewriter()", 30);
    }
  } else {
    setTimeout("typewriter()", speed);
  }
}

typewriter();
