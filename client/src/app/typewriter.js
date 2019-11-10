const destination = document.querySelectorAll('*[data-key="typing"]');
const textArray = [
    "Hello, my name is Randal A. Nunes",
    "I'm a Full Stack Web Developer and a Javascript specialist",
    'Check out my <a href="https://github.com/randal923" class="typing-effect__social" data-hover="Github">Github</a> and <a href="https://www.linkedin.com/in/randalandradenunes/" class="typing-effect__social"> Linkedin</a> page',
    'Feel free to take a look at my latest projects on my <a href="#portfolio" class="typing-effect__social">portfolio</a> page',
    'Based in Vancouver, Canada. Enquires at <a href="mailto:randal.andrade@hotmail.com" class="typing-effect__social">randal.andrade@hotmail.com</a>'
];
const speed = 15;
let index = 0;
let arrayLength = textArray[0].length;
let textPosition = 0;

function typewriter() {
    const char = textArray[index].charAt(textPosition);
    if (destination.length > 0) {
        if (char === "<")
            textPosition = textArray[index].indexOf(">", textPosition);
        destination[index].innerHTML = textArray[index].substring(0, textPosition);

        if (textPosition++ === arrayLength) {
            textPosition = 0;
            index++;
            if (index != textArray.length) {
                arrayLength = textArray[index].length;
                setTimeout(typewriter, 1);
            }
        } else {
            setTimeout(typewriter, speed);
        }
    }
}
typewriter();