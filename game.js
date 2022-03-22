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
  textElement.innerText += '\n'+combinedText;

  currentNode = textNodes.find(textNode => textNode.id === timeline);
}

// Fires whenever a choice button is pressed, choice is an integer which acts as an index for textNode.options[]
function buttonPress(choice) {
  textElement.innerText+="\n: "+choices[choice];

  if (currentNode.options[choice] === undefined) {
    console.log("Invalid Option Entered: "+choices[choice]);
  } else {
    textElement.innerText+="\n"+currentNode.options[choice].result;
    timeline = currentNode.options[choice].next;
    console.log(choices[choice]+": >"+timeline);

    if (timeline == 0) {
      textElement.innerText+="\n\nGAME OVER AGAAAAAAAAAAAAAAAAAAAIN";
      console.log("you dun goofed it");
    } else {
      ask(timeline);
    }
  }
}



// All the stored text of the game, all options and outcomes, and all item interactions
const textNodes = [
  {
    id: 1, // Probably gonna be made into a string later
    text: 'You have to make a decision. Do you proceed?',
    options: [
        {
            text: 'Yes',
            result: 'You proceeded',
            next: 2
        },
        {
            text: 'No',
            result: 'You didnt',
            next: 0
        }
    ]
  },
  {
    id: 2,
    text: 'Something else',
    options: [
      {
        text: 'This',
        result: 'That',
        next: 1
      },
      {
        text: 'That',
        result: 'This',
        next: 0
      },
      {
        text: 'Then',
        result: 'That',
        next: 0
      },
      {
        text: 'Thiat',
        result: 'What',
        next: 0
      },
    ]
  }
] // TextNodes End

let currentNode = textNodes.find(textNode => textNode.id === timeline);

ask(timeline);