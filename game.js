// Gets the text element for the game from the HTML document
const textElement = document.getElementById('text');
const healthElement = document.getElementById('healthbar');

let timeline = 1; // Current textNode or 'room', begins at 1
let health = 3;

const letters = ['a', 'b', 'c', 'd'];
// Go wild
const dmgText = ["Ouch", "Owie", "That hurt :("];

// Displays a node of the game and asks a set of questions
function ask(id) {
  console.log('Current node: ' + id);
  // Find the current textNode object
  const textNode = textNodes.find(textNode => textNode.id === id);

  let combinedText = textNode.text + '\n';
  // Format and concatenate each of the options text to combinedText
  for (let i=0;i<textNode.options.length;i++) {
    combinedText+=letters[i]+": "+textNode.options[i].text;
    combinedText+='\n';
  }
  console.log(combinedText);
  textElement.innerText += combinedText;

  currentNode = textNodes.find(textNode => textNode.id === timeline);
}

// Fires whenever a choice button is pressed, choice is an integer which acts as an index for textNode.options[]
function buttonPress(choice) {
  let nodeChoice = currentNode.options[choice];
  
  textElement.innerText+="\n: "+letters[choice];

  if (nodeChoice === undefined) {
    console.log("Invalid Option Entered: "+letters[choice]);
  } else {
    textElement.innerText+="\n"+nodeChoice.result+"\n";
    timeline = nodeChoice.next;
    console.log(letters[choice]+": >"+timeline);

    // Select how the game continues
    // -1: Redo; 0: Game Over; 100: Next Trial
    switch (timeline) {
      case -2:
        health-=1;
        healthElement.innerText = "Health: "+health;
        let message = dmgText[Math.floor(Math.random()*(dmgText.length))];
        textElement.innerText+=message;
        console.log(message);
        if (health == 0) {
          gameOver();
        }
      case -1:
        console.log("Go again :D");
        break;
      case 0:
        gameOver();
        break;
      case 100:
        console.log("Next trial");
        health = 3;
        textElement.innerText+="\nTRIAL COMPLETE\n\nHealth Restored!\n\n";
        startTrial(trial2);
        break;
      default:
        ask(timeline);
    }
  }
}

function gameOver() {
  textElement.innerText+="\nGAME OVER AGAAAAAAAAAAAAAAAAAAAIN";
  console.log("you dun goofed it");

  // Add sound later
  // Uncomment line below to enable gameover
  // document.getElementById("buttons").style.display = "none";
}

// All the stored text of the game, all options and outcomes, and all item interactions

let trial1 = [{"id":1,"text":"Welcome home, Hercules. I see your adventures have not gone as expected. What is upsetting you? Hercules, please. Put down the knife.","options":[{"text":"Kill","result":"(Thunder sound plays) Title shows: The Twelve Labors of Hercules","next":2},{"text":"Dont kill","result":"Lame","next":0},{"text":"Someone explain to me how to make bold text in a form","result":"plsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplsplspls","next":-1}]},{"id":2,"text":"You appear on Mount Olympus, the home of the Gods.\nApollo: Welcome, Hercules. You have killed your family. How do you plead?","options":[{"text":"Guilty","result":"Wise choice. I will give you a simple punishment: Do twelve good deeds. After this, you will be forgiven.","next":3},{"text":"Not guilty","result":"You dare lie to a god, you foolish mortal. For this act, I will punish you severely. Do twelve good deeds. After this, maybe I will forgive you.","next":3}]},{"id":3,"text":"King Eurysthesus: Hercules! Please help us. A giant lion is attacking my poor citizens. We are unable to defeat it, it survives anything we use against it. Will you help us?","options":[{"text":"Yes, of course I will help","result":"King Eurysthesus: Thank you. The lion is just up ahead.\nYou approach the lion. It is very large, and would be destroying the city if not distracted by an equally large ball of twine.","next":4},{"text":"No. Screw you.","result":"Apollo: Hercules, do your labors or I will kill you.","next":-1}]},{"id":4,"text":"You approach the lion. It is very large, and would be destroying the city if not distracted by an equally large ball of twine.","options":[{"text":"Shoot the lion with arrows","result":"You shoot the arrows, but they bounce off the lion's hide. The lion retreats into a nearby cave.","next":5},{"text":"Say hello to the lion","result":"The lion scratches you.","next":-2}]},{"id":5,"text":"","options":[{"text":"Wait at the cave entrance","result":"The giant ball of twine rolls over and crushes you","next":-2},{"text":"Follow it into the cave","result":"You walk into the cave. It is a large space. Skeletons litter the floors. From further down the cave, you hear a roar.","next":6}]},{"id":6,"text":"","options":[{"text":"Exit the cave. Too scary.","result":"The giant ball of twine hits you in the face and sends you back into the cave.","next":-1},{"text":"Continue further.","result":"You walk through the cave. There is a dripping sound coming from somewhere. You see evidence of the lion’s path; bones on the floor, rocks moved over, the lion. Oh no.","next":7},{"text":"Wait here","result":"The giant ball of twine rolls into the cave and runs you over.","next":-2}]},{"id":7,"text":"","options":[{"text":"Hit the lion with your club.","result":"Your club does not affect the lion. It swats you with its paw.","next":-2},{"text":"Run.","result":"You run down the cave. The lion chases you. You fall down a chasm and land in a pool of water. The lion tumbles down the chasm after you.","next":8}]},{"id":8,"text":"","options":[{"text":"Pet the lion.","result":"The lion bites your hand.","next":-2},{"text":"Swim away.","result":"The lion swims after you and attacks","next":-2},{"text":"Jump on the lion’s back.","result":"You wrap your arms around the lion's neck and begin to choke it. It falls into the water, completely unable to breathe. You wait for it to stop moving, which it eventually does. The lion is dead.","next":9}]},{"id":9,"text":"","options":[{"text":"Pick up it's pelt","result":"You pick up the pelt. Somehow, it magically turned into a coat once the lion was killed. You don the coat and walk out of the cave. You go back to Nemea. The people cheer as you walk victoriously through the streets. You approach King Eurystheus.\nKing Eurystheus: Wow. You actually did it. I really thought that you would die. Dang, that’s impressive. Ha. Probably shouldn’t have said that. Ok goodbye Hercules please don’t hurt me I’m a frail old man I can’t die my people need me I’m sorry Hercules.","next":100},{"text":"Exit","result":"The sun shines. You exit the cave victorious. And then someone shoots you. Then, the giant ball of twine hits you and you fall all the way back through the cave. Should’ve taken the invulnerable pelt.","next":-1}]}];
let trial2 = [{"id":1,"text":"King Eurystheus: Hello again Hercules. Nemea is once again under attack by another giant monster. Why does this keep happening. I mean, there are other kingdoms in Greece. Anyway, big snake monster thing. Go deal with it.\nYou travel to a familiar town, where the hydra was spotted nearby. You recognize this place. Your nephew lives here. You knock on his door.\nIolaus: Uncle Hercules! OH GOD WAIT NO PLEASE DON’T HURT ME PLEASE!\nHercules: I won’t hurt you. We need to work together to defeat the hydra.\nIolaus: Ok… I may be willing to help you. But I know what you did. You have a history of killing family members.","options":[{"text":"Kill him","result":"Hercules… Why? Let's pretend that didn’t happen.","next":2},{"text":"Advance on your quest.","result":"","next":2}]},{"id":2,"text":"You proceed on the quest. You hear leaves shuffle while you walk through the forest. You come across a stream. Suddenly, Iolaus screams. You turn around, and he is not there. You draw your club. Suddenly, a serpent head lunges out of the trees. Its jaw clamps on your chest… and does nothing. The pelt worked.","options":[{"text":"Chase it through the woods.","result":"","next":3},{"text":"Stay here.","result":"Somewhere in the distance, the giant ball of twine is loaded into a catapult. It is fired, and lands on you.","next":-2}]},{"id":3,"text":"You run after it. You hear Iolaus screaming. Suddenly, the hydra stops. Its nine heads stare at you. And then it throws Iolaus. He hits you and you both fall. You get up and help him to his feet.","options":[{"text":"Attack the hydra.","result":"","next":4},{"text":"Hug the hydra.","result":"The hydra is not a hugger.","next":-2}]},{"id":4,"text":"You bash its head in with your club. It is crushed, but two are regrown. You turn to Iolaus, and hand him a branch from the ground. Iolaus begins creating a fire.","options":[{"text":"Attack it again.","result":"","next":5},{"text":"Jump in the fire.","result":"Why would you do that? That’s kinda painful.","next":-2}]},{"id":5,"text":"You bash another one of its heads in. This time, Iolaus uses a torch to burn the spot where the head was. It does not regrow. You continue the process for another seven heads. There are only two remaining. The hydra lunges at you, and bites on you again. The cloak prevents it, but you are picked up in the air. You manage to bash one head while it lifts you, and Iolaus burns it. Iolaus takes the burning piece of wood and slices at the hydra’s last neck. You fall to the ground, still in its jaw. The head is no longer attached to the body.","options":[{"text":"Leave the hydra’s head.","result":"You leave the hydra’s head. Suddenly, Iolaus stabs you. What a jerk.","next":0},{"text":"Take the head.","result":"You pick up the hydra’s head. You carry it back to King Eurystheus.\nKing Eurystheus: Welcome back, Hercules, you’ve somehow survived again. You’re pretty good at this.","next":100}]}];

// Filled by startTrial, loads a single trial at a time
let textNodes;

// Reads and loads a trial from JSON, resets timeline counter and starts a trial
function startTrial(json) {
  console.log("Starting trial!")
  
  // Loop through and parse each individual node
  for (let i=0; i<json.length; i++) {
    let node = json[i];
    if (typeof node === 'string' || node instanceof String) {
      json[i] = JSON.parse(node);
    }
  }
  textNodes = json;
  timeline = 1;
  
  let currentNode = textNodes.find(textNode => textNode.id === timeline);
  
  ask(timeline);
}

// Start the game
startTrial(trial1);