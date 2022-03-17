// Gets the text element for the game from the HTML document
const textElement = document.getElementById('text');

let timeline = 1; // Current textNode or 'room', begins at 1

const choices = ['a', 'b', 'c', 'd']; // Theres gotta be a better way to do this

// Displays a node of the game and asks a set of questions
function ask(id) {
    console.log('Current node: ' + id);
    // Find the current textNode object
    const textNode = textNodes.find(textNode => textNode.id === id);
  
    let combinedText = textNode.text + '\n';
    // Format and concatenate each of the options text to combinedText
    for (let i=0;i<textNode.options.length;i++) {
        combinedText+=choices[i]+": "+textNode.options[i].text;
        combinedText+='\n';
    }
    console.log(combinedText);
    textElement.innerText = combinedText;
}

// Fires whenever a choice button is pressed, choice is an integer which acts as an index for textNode.options[]
function buttonPress(choice) {
  textElement.innerText+="\n: "+choices[choice];

  // Finds textNode again (inefficient)
  const textNode = textNodes.find(textNode => textNode.id === timeline);
  
  if (textNode.options[choice] === undefined) {
    console.log("Invalid Option Entered: "+choices[choice]);
  } else {
    textElement.innerText+="\n"+textNode.options[choice].result;
    console.log("Next node: "+textNode.options[choice].next);
  }

  // Function still needs to transition to the next node so the program can continue to run as the user inputs many responses
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
                next: 0
            }
        ]
    }
]

ask(timeline);