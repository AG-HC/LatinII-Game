// Gets the text element for the game from the HTML document
const textElement = document.getElementById('text');

// Changes the string value of textElement
textElement.innerText = "Videogaming";

let timeline = 1; // Current textNode or 'room', begins at 1

const choices = ['a: ', 'b: ', 'c: ', 'd: ', 'e: ']; // Theres gotta be a better way to do this

// Displays a node of the game and asks a set of questions
function ask(id) {
    console.log('Current node: ' + id);
    const textNode = textNodes.find(textNode => textNode.id === id);
    let combinedText = textNode.text + '\n';
    // Format and concatenate each of the options text to combinedText
    for (let i=0;i<textNode.options.length;i++) {
        combinedText+=choices[i]+textNode.options[i].text;
        combinedText+='\n';
    }
    console.log(combinedText);
    textElement.innerText = combinedText;
}

// All the stored text of the game, all options and outcomes, and all item interactions
const textNodes = [
    {
        id: 1, // Probably gonna be made into a string later
        text: 'You are about to game end your family. Do you proceed?',
        options: [
            {
                text: 'doitdoitdoitdoit',
                result: 'You killed your parents :D',
                next: 1
            },
            {
                text: 'n o',
                result: 'lame',
                next: 'end' // End will probably have a specific value common to all deaths, possibly 0
            }
        ]
    }
]

ask(1);