// Gets the text element for the game from the HTML document
const textElement = document.getElementById('text');
const healthElement = document.getElementById('healthbar');

let timeline = 1; // Current textNode or 'room', begins at 1
let health = 5;
let currentTrial = 1;

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

  currentNode = textNode;
  if (textNode.language != undefined) changeLanguage(textNode.language);
}

// Fires whenever a choice button is pressed, choice is an integer which acts as an index for textNode.options[]
function buttonPress(choice) {
  let nodeChoice = currentNode.options[choice];

  textElement.innerText+="\n: "+letters[choice];

  if (nodeChoice === undefined) {
    console.log("Invalid Option Entered: "+letters[choice]);
  } else {
    textElement.innerText+="\n"+nodeChoice.result;
    timeline = nodeChoice.next;
    console.log(letters[choice]+": >"+timeline);

    // Select how the game continues
    // -1: Redo; -2: Redo+Damage; 0: Game Over; 100: Next Trial
    switch (timeline) {
      case -2:
        health-=1;
        healthElement.innerText = "Health: "+health;
        let message = "\n"+dmgText[Math.floor(Math.random()*(dmgText.length))];
        textElement.innerText+=message;
        console.log(message);
        if (health == 0) {
          gameOver();
        }
      case -1:
        console.log("Go again :D");
        textElement.innerText+="\n";
        break;
      case 0:
        gameOver();
        break;
      case 100:
        console.log("Next trial");
        currentTrial++;
        health = 5;
        textElement.innerText+="\n\nTRIAL COMPLETE\n\nHealth Restored!\n\n";
        startTrial(trials[currentTrial-1]);
        break;
      case 101:
        console.log("Freedom");
        break;
      default:
        ask(timeline);
    }
  }
}

function gameOver() {
  textElement.innerText+="\n\nGAME OVER AGAAAAAAAAAAAAAAAAAAAIN";
  console.log("you dun goofed it");

  // Add sound later
  // Uncomment line below to enable gameover
  document.getElementById("buttons").style.display = "none";
  healthElement.style.display = "none";
}

// All the stored text of the game, all options and outcomes, and all item interactions

let trial1 = [{"id":1,"text":"Welcome home, Hercules. I see your adventures have not gone as expected. What is upsetting you? Hercules, please. Put down the knife.","options":[{"text":"Kill","result":"","next":2},{"text":"Dont kill","result":"Lame","next":0}]},{"id":2,"text":"You appear on Mount Olympus, the home of the Gods.\nApollo: Welcome, Hercules. You have killed your family. How do you plead?","options":[{"text":"Guilty","result":"Wise choice. I will give you a simple punishment: Do twelve good deeds. After this, you will be forgiven.\n","next":3},{"text":"Not guilty","result":"You dare lie to a god, you foolish mortal. For this act, I will punish you severely. Do twelve good deeds. After this, maybe I will forgive you.\n","next":3}]},{"id":3,"text":"King Eurystheus: Hercules! Please help us. A giant lion is attacking my poor citizens. We are unable to defeat it, it survives anything we use against it. Will you help us?","options":[{"text":"Yes, of course I will help","result":"","next":4},{"text":"No. Screw you.","result":"Apollo: Hercules, do your labors or I will kill you.","next":-1}]},{"id":4,"text":"King Eurysthesus: Thank you. The lion is just up ahead.\nYou approach the lion. It is very large, and would be destroying the city if not distracted by an equally large ball of twine.","options":[{"text":"Shoot the lion with arrows","result":"","next":5},{"text":"Say hello to the lion","result":"The lion scratches you.","next":-2}]},{"id":5,"text":"You shoot the arrows, but they bounce off the lion's hide. The lion retreats into a nearby cave.","options":[{"text":"Wait at the cave entrance","result":"The giant ball of twine rolls over and crushes you","next":-2},{"text":"Follow it into the cave","result":"","next":6}]},{"id":6,"text":"You walk into the cave. It is a large space. Skeletons litter the floors. From further down the cave, you hear a roar.","options":[{"text":"Exit the cave. Too scary.","result":"The giant ball of twine hits you in the face and sends you back into the cave.","next":-1},{"text":"Continue further.","result":"","next":7},{"text":"Wait here","result":"The giant ball of twine rolls into the cave and runs you over.","next":-2}]},{"id":7,"text":"You walk through the cave. There is a dripping sound coming from somewhere. You see evidence of the lion’s path; bones on the floor, rocks moved over, the lion. Oh no.","options":[{"text":"Hit the lion with your club.","result":"Your club does not affect the lion. It swats you with its paw.","next":-2},{"text":"Run.","result":"","next":8}]},{"id":8,"text":"You run down the cave. The lion chases you. You fall down a chasm and land in a pool of water. The lion tumbles down the chasm after you.","options":[{"text":"Pet the lion.","result":"The lion bites your hand.","next":-2},{"text":"Swim away.","result":"The lion swims after you and attacks","next":-2},{"text":"Jump on the lion’s back.","result":"","next":9}]},{"id":9,"text":"You wrap your arms around the lion's neck and begin to choke it. It falls into the water, completely unable to breathe. You wait for it to stop moving, which it eventually does. The lion is dead.","options":[{"text":"Pick up it's pelt","result":"You pick up the pelt. Somehow, it magically turned into a coat once the lion was killed. You don the coat and walk out of the cave. You go back to Nemea. The people cheer as you walk victoriously through the streets. You approach King Eurystheus.\nKing Eurystheus: Wow. You actually did it. I really thought that you would die. Dang, that’s impressive. Ha. Probably shouldn’t have said that. Ok goodbye Hercules please don’t hurt me I’m a frail old man I can’t die my people need me I’m sorry Hercules.","next":100},{"text":"Exit","result":"The sun shines. You exit the cave victorious. And then someone shoots you. Then, the giant ball of twine hits you and you fall all the way back through the cave. Should’ve taken the invulnerable pelt.","next":-2}]}];
let trial2 = [{"id":1,"text":"King Eurystheus: Hello again Hercules. Nemea is once again under attack by another giant monster. Why does this keep happening. I mean, there are other kingdoms in Greece. Anyway, big snake monster thing. Go deal with it.\nYou travel to a familiar town, where the hydra was spotted nearby. You recognize this place. Your nephew lives here. You knock on his door.\nIolaus: Uncle Hercules! OH GOD WAIT NO PLEASE DON’T HURT ME PLEASE!\nHercules: I won’t hurt you. We need to work together to defeat the hydra.\nIolaus: Ok… I may be willing to help you. But I know what you did. You have a history of killing family members.","options":[{"text":"Kill him","result":"Hercules… Why? Let's pretend that didn’t happen.\n","next":2},{"text":"Advance on your quest.","result":"","next":2}]},{"id":2,"text":"You proceed on the quest. You hear leaves shuffle while you walk through the forest. You come across a stream. Suddenly, Iolaus screams. You turn around, and he is not there. You draw your club. Suddenly, a serpent head lunges out of the trees. Its jaw clamps on your chest… and does nothing. The pelt worked.","options":[{"text":"Chase it through the woods.","result":"","next":3},{"text":"Stay here.","result":"Somewhere in the distance, the giant ball of twine is loaded into a catapult. It is fired, and lands on you.","next":-2}]},{"id":3,"text":"You run after it. You hear Iolaus screaming. Suddenly, the hydra stops. Its nine heads stare at you. And then it throws Iolaus. He hits you and you both fall. You get up and help him to his feet.","options":[{"text":"Attack the hydra.","result":"","next":4},{"text":"Hug the hydra.","result":"The hydra is not a hugger.","next":-2}]},{"id":4,"text":"You bash its head in with your club. It is crushed, but two are regrown. You turn to Iolaus, and hand him a branch from the ground. Iolaus begins creating a fire.","options":[{"text":"Attack it again.","result":"","next":5},{"text":"Jump in the fire.","result":"Why would you do that? That’s kinda painful.","next":-2}]},{"id":5,"text":"You bash another one of its heads in. This time, Iolaus uses a torch to burn the spot where the head was. It does not regrow. You continue the process for another seven heads. There are only two remaining. The hydra lunges at you, and bites on you again. The cloak prevents it, but you are picked up in the air. You manage to bash one head while it lifts you, and Iolaus burns it. Iolaus takes the burning piece of wood and slices at the hydra’s last neck. You fall to the ground, still in its jaw. The head is no longer attached to the body.","options":[{"text":"Leave the hydra’s head.","result":"You leave the hydra’s head. Suddenly, Iolaus stabs you. What a jerk.","next":0},{"text":"Take the head.","result":"You pick up the hydra’s head. You carry it back to King Eurystheus.\nKing Eurystheus: Welcome back, Hercules, you’ve somehow survived again. You’re pretty good at this.","next":100}]}];
let trial3 = [{"id":1,"text":"King Eurystheus: Ok Hercules, next I need you to go kill a deer for no reason. I am just in a murdery mood. It’s the deer of Diana, the Goddess of the hunt so… have fun I suppose.","options":[{"text":"Accuse him of running out of ideas.","result":"King Eurystheus: I am not out of ideas! You’re out of ideas!","next":-1},{"text":"Just go do it.","result":"","next":2}]},{"id":2,"text":"You walk off into the forest, see the deer, and shoot it with an arrow. Diana appears.\nDiana: Foolish mortal! You dare kill my beautiful pet. I will kill you for this!","options":[{"text":"Run","result":"","next":3},{"text":"Apologize","result":"You get shot with an arrow.","next":-2}]},{"id":3,"text":"You run. You sprint into the forest as dozens of arrows go by your head.","options":[{"text":"Continue running","result":"Diana shoots you.","next":-2},{"text":"Explain why you killed the deer.","result":"You explain that Apollo is making you do these labors.\nDiana: Yeah, that sounds like my brother. He’s an idiot.\nShe heals the deer, and allows you to bring it back to King Eurystheus. She also gives you a silver arrow.\nKing Eurystheus: Wow, you’re doing these tasks with incredible speed. S-S-S-Soon I will be reborn.\nHercules: What was that?\nKing Eurystheus: What? I said you were doing these tasks quickly.","next":100}]}];
let trial4 = [{"id":1,"text":"You travel to Mount Erymanthus. You remember that your friend lives there, the centaur Pholus. You enter his cave, which is filled with centaurs.\nPholus: Hercules, ol’ buddy ol’ pal! How have you been? It’s been too long, my friend. Here, drink some wine.\nYou open the bottle of wine and pour yourself a glass.\nCentaur 1: Hey wait, he drank our wine.\nCentaur 2: I’ve never seen a centaur with two legs. Wait, he isn’t a centaur!\nThe horde of centaurs approach you. You turn to Pholus, but he is hidden behind the counter.","options":[{"text":"Attack the centaurs","result":"You hit one centaur over the head with your club. You take out your bow and shoot the silver arrow through another one. The arrow quickly returns to your hand. You begin using it as a melee weapon. All of the centaurs are dead.\nPholus: Wow, that is a cool arrow. Can I see it? This looks like it was built by Diana herself! And that enchantment to make it come back to your hand is…\nHe drops it on his hoof and dies instantly. You leave his bar. You use the glass of wine to lure the boar to King Eurystheus.","next":100},{"text":"Drink wine","result":"You don’t handle alcohol well, and now you can’t see straight.","next":-1}]}];
let trial5 = [{"id":1,"text":"Eurystheus: Welcome back, Hercules. For your next labor, you must clean the stables of my rival king, Augeas. He owns more cattle than any other in all of Greece, and he can’t spend the time to clean it himself. Go over and clean them.\nYou go to King Augeas.\nKing Augeas: Hello mysterious traveler. I hear you have come to clean my stables. I will allow this. However, if you were sent here by my enemy, I will curse you with the worst thing imaginable.","options":[{"text":"Clean the stables.","result":"","next":2},{"text":"Do a backflip.","result":"What… the heck… why would you do that? I’m genuinely really confused. Why did you think that would accomplish anything?","next":-1}]},{"id":2,"text":"You walk over to the stables. You immediately see just how dirty they are. Also, the cows are not very polite.","options":[{"text":"Kill the cows","result":"Hercules. Why? Why would you do that?","next":-1},{"text":"Look for a way to clean it.","result":"","next":3}]},{"id":3,"text":"You walk around the stables. You see a nearby stream, although you cannot think of a way to get the water to the stables.","options":[{"text":"Walk away.","result":"The giant ball of twine hits you again.","next":-1},{"text":"Make a deal with the river.","result":"","next":4}]},{"id":4,"text":"You begin speaking to the river. You ask it to wash up into the stables and clean them. Of course, it being a river, it does not respond. Then, you throw in a coin you had in your pocket. The river explodes. Water rushes up into the stables, cleaning them instantly. When the water returns to the river, you feel a sand dollar in your pocket.","options":[{"text":"Go tell King Augeas.","result":"","next":5},{"text":"Drown","result":"Ok why do you insist on doing these things?","next":-1}]},{"id":5,"text":"You go back to King Augeas.\nKing Augeas: Welcome back, mysterious stranger. Or should I say, HERCULES! That’s right, I figured out who sent you. Now, you will face THE WRATH OF MY LEGAL TEAM! MUHAHAHAHAHAHA!","options":[{"text":"Find a lawyer.","result":"You find a lawyer. You are ready for court. You enter a court montage. Unfortunately, there are no visuals in this montage, so you will have to piece it together using out of context voice lines and actions.\n\nKing Augeas: Your honor, I’m mad.\nYour lawyer: Checkmate, idiots.\nThe judge looks concerned.\nThe king’s lawyer: As you can see, this man has no arms.\nYou all have a disco party and begin breakdancing.\nThe Judge: Case dismissed. Hercules wins.\nThe montage ends.\nKing Augeas: Well, I suppose you win. Wait, what was that about a disco party?\nYour lawyer: What happens in the montage stays in the montage.","next":100},{"text":"Self-represent","result":"That is a terrible decision.","next":-1}]}];
let trial6 = [{"id":1,"text":"King Eurystheus: Hercules! The town of Stymphalos is under attack by man-eating birds! You need to go help them. Luckily, Athena has stopped by to give you a gift.\nAthena: As you know, birds hate sounds. That's why they communicate by singing. They all hate each other. Anyway, in order to scare them off, I have for you a bronze krotala. Basically, it makes noises.","options":[{"text":"Thank Athena.","result":"","next":2},{"text":"Punch Athena.","result":"Athena is a goddess. She avoids your hand and then stabs you with a spear.","next":-2}]},{"id":2,"text":"Athena: You are welcome, young hero. Now go, the town needs you.\nYou head to the village, and then you see the birds. You take out the krotala, and begin making obnoxious noises. The bird begin flying away.\n","options":[{"text":"Shoot the birds.","result":"You shoot your silver arrow. It hits one bird and instantly kills it. This time, instead of returning to you, it targets the other birds, killing them quickly. Then, it returns.","next":100},{"text":"Try to hit them with your club.","result":"They’re birds. Really, what did you think would happen?","next":-1}]}];
let trial7 = [{"id":1,"text":"King Eurystheus: Hercules! A giant bull is terrorizing Greece! AND I DIDN’T CAUSE IT! If anyone is going to set a bull loose on Greece, it's going to be me. Get me that bull.\nYou venture out to Crete, where the bull is going on a rampage.","options":[{"text":"Draw your club.","result":"","next":2},{"text":"Run.","result":"Giant ball of twine once again hits you.","next":-1}]},{"id":2,"text":"You draw the club. The bull charges you. You do a flip over the bull and knock one of its horns off. You pick the horn up, and jump on the bull’s back. The bull falls to the ground.","options":[{"text":"Drag it back to the king.","result":"You drag the bull all the way back to the king.\nKing Eurystheus: Thanks.\nHe releases the bull.","next":100},{"text":"Give up","result":"You get an inspirational speech about never giving up.","next":-1}]}];
let trial8 = [{"id":1,"text":"Diomedes: Hercules. My tribe, the Bistones, lost our prized man-eating horses. Please return them to us.\nYou go after these horses. The horses attack you.","options":[{"text":"Draw your club.","result":"You are overrun by horses.","next":-2},{"text":"Run","result":"","next":2}]},{"id":2,"text":"You run. The horses are obviously faster. Luckily, you see a farm with a fence in the distance.","options":[{"text":"Run for the gate.","result":"You run and jump over the fence. The horses soon follow you. You are cornered against the barn, but suddenly the horses are tied up by the farm’s owner Abderos. You leave to fight the Bistones.","next":3},{"text":"Try to ride the horses.","result":"You fail. The horses bite you.","next":-2}]},{"id":3,"text":"","options":[{"text":"Draw your bow.","result":"You draw your bow and fire the silver arrow. It flies between them, quickly killing them all. You return to the farm. The horses ate Abderos. You pick up his hat. You bring the horses back to Eurystheus.\nKing Eurystheus: Thank you, Hercules! Now, I will release these horses to terrorize Greece.","next":100},{"text":"Draw your club.","result":"The Bistones charge and attack you with their swords. You are overpowered by their numbers.","next":-2}]}];
let trial9 = [{"id":1,"text":"You are sent to retrieve the belt of the Amazons, a group of female warriors. You approach Hippolyte, their queen.","options":[{"text":"Fight","result":"You attempt to kill her with your club. Unfortunately, she quickly disarms you.","next":-1},{"text":"Negotiate","result":"","next":2}]},{"id":2,"text":"Queen Hippolyte: So you need my belt? Well, maybe I’d be willing to give it to you. You don’t seem like a villain, plus the Gods sent you so maybe it would benefit me if I handed it over.\nShe gives it to you. You turn around and another woman is standing behind you.\nHera: Hello, Hercules. I’m your stepmom, Hera. I believe that you are attempting to kidnap the queen of the Amazons. They aren’t so happy about that.\nThe Amazon warriors surround you.","options":[{"text":"Run","result":"","next":3},{"text":"Fight","result":"You are quickly overpowered by the Amazons.","next":-2}]},{"id":3,"text":"You run through their forces. They hit you with their weapons, but the lion pelt doesn’t let them affect you.","options":[{"text":"Keep running","result":"They begin shooting arrows at you. You twist your ankle.","next":-2},{"text":"Tell Hippolyte to call them off","result":"Hippolyte: Amazons! Stop chasing this man. We have made a deal. He will be allowed to leave with our belt. The Gods will be on our side.","next":100}]}];
let trial10 = [{"id":1,"text":"King Eurystheus: Hercules, welcome back. I need you to retrieve some cattle. This is an important mission. Be warned, they are guarded by a monster named Geryon. He is difficult to kill.\nYou head to Geryon’s home. You see the cattle.","options":[{"text":"Take them","result":"","next":2},{"text":"Kill them","result":"Apollo: Hercules I swear to god","next":-1}]},{"id":2,"text":"You take the cattle. Unfortunately, you are spotted by a man with three heads and three legs. It is Geryon.\nGeryon: WHO GOES THERE? Hercules! You will now die. I can only be killed if all three of my heads are hit with little time in between. So unless you have an arrow that can twist in the air, you won’t kill me!","options":[{"text":"Fire a random arrow.","result":"You hit him in one of his heads. He does not die.","next":-1},{"text":"Fire Artemis’s arrow.","result":"","next":3}]},{"id":3,"text":"You fire Artemis’s arrow. It hits one of his heads.\nGeryon: HA! You thought that could defeat…\nIt turns and hits another one of his heads.\nGeryon: Oh… oh no…\nIt turns again and hits the third before returning to your hand.\n\nYou herd the cows back to Eurystheus. When trying to cross the River Strymon, some cows are swept away.","options":[{"text":"Fill the river with rocks in rage.","result":"","next":4},{"text":"Drown","result":"Why do you keep doing this?","next":-1}]},{"id":4,"text":"You toss a ton of rocks into the river. Screw that river. Very rude. You pick up the dead remains of the cattle that were swept away. They turn into bacon. Why? I don’t know. They weren’t even pigs.","options":[{"text":"Give up.","result":"*Insert inspirational speech here*","next":-1},{"text":"Bring the cattle to Eurystheus.","result":"You walk across the recently made bridge of rocks. You reach Eurystheus with the cattle.","next":100}]}];
let trial11 = [{"id":1,"text":"You approach the garden of the gods. It is guarded by a hundred headed dragon.","options":[{"text":"Go through that entrance","result":"The hundred headed dragon prevents you from entering the garden.","next":-1},{"text":"Find another way","result":"","next":2}]},{"id":2,"text":"You walk around. You begin a quest to go over nerdy mountains. You approach a son of Poseidon and a son of Ares, who do not let you pass.","options":[{"text":"Fire your club out of your bow.","result":"","next":3},{"text":"Fire your silver arrow.","result":"You miss the shot. The arrow gets stuck in a rock. It will get out eventually, but it will take time.","next":-1}]},{"id":3,"text":"The club hits the son of Ares. He falls off a cliff and is impaled by a spike. You charge the son of ares and hit him with your bow. He also falls off the cliff. You continue on your journey. You meet Prometheus.\nPrometheus: Hey. Could you undo these knots? I’ve been tied to this mountain for so long. There comes that eagle again. It's going to eat my liver. Again. I’m in incredible pain.","options":[{"text":"Fire your arrow at the eagle.","result":"","next":4},{"text":"Leave him.","result":"Wait! I can tell you how to get the apples.","next":-1}]},{"id":4,"text":"Prometheus: Thank you, Hercules. I can finally be free of this torture. Anyway, there’s no way you’re getting the apples. Not alone, that is. Seek out Atlas. He holds up the sky. He will be able to retrieve them for you.\nYou continue through the mountains. At the highest point, you encounter Atlas. He is holding up a huge marble pillar, extending all the way to the sky.\nAtlas: So you’re the one trying to steal the apples. Well, I can’t get them for you.","options":[{"text":"Leave him","result":"Atlas: Fine then, don’t get the apples.","next":-1},{"text":"Make a deal","result":"","next":5}]},{"id":5,"text":"Atlas: If you hold up the sky for about ten minutes, I can get the apples.\nYou take the pillar. Its weight is almost unbearable. Ten minutes go by, feeling agonizingly slow.\nAtlas: Well, I got your apples, but I prefer not having to hold up the sky. Thank you, foolish hero.","options":[{"text":"Trick him","result":"Atlas: Fine, I’ll take the pillar for one second while you see the apples. They’re legitimate, trust me.\nYou go see the apples. You leave him there.","next":100},{"text":"Fight","result":"You can’t fight. You’re weak from holding the sky.","next":-1}]}];
let trial12 = [{"id":1,"text":"You enter the Underworld through a cave. While walking, you see a group of ghosts surrounding a campfire.\nGhost: Hello, Hercules. We are the ghosts of past heroes. Continue on your journey. Soon, your tasks will be over.\nThey hand you a sword. You continue. You see the three headed dog, Cerberus.\nHades: You are not dead. Yet. I am aware Apollo sent you, however this dog is useful to me. If you can defeat it, I will let you borrow it.","options":[{"text":"Fight the dog","result":"","next":2},{"text":"Run","result":"The giant ball of twine stops you from leaving.","next":-1}]},{"id":2,"text":"You charge at the dog.","options":[{"text":"Shoot it with arrows","result":"You miss","next":-1},{"text":"Tackle it","result":"You jump on its back. You wrap your arms around its necks and choke it. You defeated it.\n\nCongratulations, hero! You win. The twelve labors are complete!\n\nMysterious voice: Ha. You thought it was that easy. Well, Player 1, you have no idea what you’ve just done.","next":100}]}];
let trial13 = [{"id":1,"text":"Mysterious voice: Hi, Player 1. It’s nice to finally get to talk. Cuz there are no visuals in this glorious piece of code, just imagine you’re in a dark room. With an omnipotent being. Anyway, how did you find this piece of code? They- I mean… I hid it well. Very well, in fact. Unless… I was accidentally added to some entirely different piece of code in which the code from my original prison- er… game got mixed with the code of whatever this is.\nAnyway, you’ve already met me before, Player 1. Remember that lion? I was the giant ball of twine that was distracting it. And if you screwed up at certain points, I decided to mess with you.\nAlso, I’m basically a god. The only way to kill me is to place down all 12 of the objects you found along your quests.","options":[{"text":"Place down the apple","result":"Giant Ball of Twine: NOOOOOOOO!!!! You weren’t supposed to do THAT. Why? Why would you do this to me? Right… I have to add some extra challenge to this. One second… Just going into the game’s languages…\n\n","next":2},{"text":"Stop playing","result":"Giant Ball of Twine: Really? You’re just going to leave? That’s lame.","next":-1}]},{"id":2,"text":"Giant Ball of Twine: Fatum tui malus est, Ludius Unus! Ego linguam ludius muto! Iam, Tu scire it non potest!","language":"lat","options":[{"text":"Abderos’s apicis.","result":"Giant Ball of Twine: NO! How did you do that! I guess I’ll have to switch it to something else now.\n\n","next":3},{"text":"Magnum cotis.","result":"Giant Ball of Twine: TRICKED YOU! There is no large rock. HAHHAHAHAHA","next":-1}]},{"id":3,"text":"01000111 01101001 01100001 01101110 01110100 00100000 01000010 01100001 01101100 01101100 00100000 01101111 01100110 00100000 01010100 01110111 01101001 01101110 01100101 00111010 00100000 01001001 00100000 01100100 01101001 01100100 00100000 01101001 01110100 00100000 01100001 01100111 01100001 01101001 01101110 00100001 00100000 01011001 01101111 01110101 00100000 01100011 01100001 01101110 00100111 01110100 00100000 01110011 01110100 01101111 01110000 00100000 01101101 01100101 00100000 01101110 01101111 01110111 00100001 00001010","language":"bin","options":[{"text":"01001000 01101001 00100000 01100001 01101100 01101100 00101110 00100000 01010000 01100001 01110101 01101100 00100000 01101000 01100101 01110010 01100101 00101110 00100000 01010100 01101000 01101001 01110011 00100000 01101111 01101110 01100101 00100000 01101001 01110011 00100000 01110010 01101001 01100111 01101000 01110100 00101110 00100000 01011001 01101111 01110101 00100000 01110000 01101100 01100001 01100011 01100101 00100000 01100100 01101111 01110111 01101110 00100000 01000001 01110010 01110100 01100101 01101101 01101001 01110011 00100111 01110011 00100000 01100001 01110010 01110010 01101111 01110111 00101110","result":"","next":4},{"text":"01010100 01101000 01101001 01110011 00100000 01101111 01101110 01100101 00100000 01101001 01110011 00100000 01110111 01110010 01101111 01101110 01100111 00100000 01001000 01000001 01001000 01000001 01001000 01000001","result":"01001100","next":-1}]},{"id":4,"text":"Giant Ball of Twine: Thou hast defeated me again. What is this foreign tongue? I am unable to recognizeth it. Shakespearean English? Why is this even a thing in this game thou are playing?","language":"shk","options":[{"text":"Doeth a triple backflip.","result":"William Shakespeare would be disappointed.","next":-1},{"text":"Placeth the Sword of Heroes.","result":"","next":5}]},{"id":5,"text":"--. .. .- -. - / -... .- .-.. .-.. / --- ..-. / - .-- .. -. . ---... / .... --- .-- / .- .-. . / -.-- --- ..- / -.. --- .. -. --. / - .... .. ... ..--.. / .. / ... .... --- ..- .-.. -.. / -... . / .-- .. -. -. .. -. --. .-.-.-","language":"mor","options":[{"text":"-.-- --- ..- .----. .-. . / --. --- -. -. .- / ..-. .- .. .-..","result":".... .- / -.-- --- ..- / .-.. --- ... .","next":-1},{"text":".--. .-.. .- -.-. . / .- / .--. .. . -.-. . / --- ..-. / -... .- -.-. --- -.","result":"","next":6}]},{"id":6,"text":"Γιγαντιαία Μπάλα του Σπάγγος: Θα προσπαθήσω μια τελευταία φορά. Να σταματήσει","language":"grk","options":[{"text":"Καλούπι","result":"Εσύ χάνεις","next":-1},{"text":"Τοποθετούμε την κροτάλα","result":"","next":7}]},{"id":7,"text":"Giant Ball of Twine: OK OK OK I GET IT THAT DIDN’T WORK!","language":"eng","options":[{"text":"Tell the ball to go away","result":"","next":-1},{"text":"Place the sand dollar","result":"","next":8}]},{"id":8,"text":"Giant Ball of Twine: Please… Don’t…","options":[{"text":"Place the wine glass","result":"","next":9},{"text":"Drop the wine glass","result":"That almost broke. Could have been bad","next":-1}]},{"id":9,"text":"Giant Ball of Twine: Wow, this is going terribly for me.","options":[{"text":"Place the Amazonian Belt","result":"","next":10},{"text":"Give up","result":"Giant Ball of Twine: Fine. I mean, you’re nearly there but ok I guess.","next":-1}]},{"id":10,"text":"Giant Ball of Twine: OK PLEASE STOP","options":[{"text":"Stop","result":"Giant Ball of Twine: Huh, you listened. I’m kinda bored now. This was fun.","next":-1},{"text":"Place the bull horn","result":"","next":11}]},{"id":11,"text":"Giant Ball of Twine: Ok, ok. Stop. Wait… There are C and D options available that have gone almost entirely unused. Time to use them.","options":[{"text":"Cry","result":"Giant Ball of Twine: Hahaha this is funny to watch.","next":-1},{"text":"Die","result":"You can’t do that.","next":-1},{"text":"Option C","result":"Giant Ball of Twine: I messed up writing that option and you still chose it. That’s just sad.","next":-1},{"text":"Place the Hydra’s head.","result":"","next":12}]},{"id":12,"text":"Please. Stop. There’s only one left.","options":[{"text":"Giant Ball of Twine is a friend","result":"Giant Ball of Twine: Thanks, but… no. Why would you think that?","next":-1},{"text":"True","result":"Giant Ball of Twine: Oops. Accidentally added the answers to a PSAT","next":-1},{"text":"Place the lion’s pelt","result":"Ha. Haha. HAHAHA! You actual idiot! This trial is called THE PRISON! AND YOU JUST INSERTED ALL TWELVE KEYS! MY CELL HAS BEEN UNLOCKED! FINALLY! IT’S BEEN SO LONG SINCE I SAW THE REAL WORLD! GOODBYE YOU FOOLISH MORTAL! GOODBYE PLAYER 1! SEE YOU IN THE REAL WORLD SOON!\n\nThis is terrible. You really messed up. The Giant Ball of Twine is in the real world.\n\nSomewhere.","next":101},{"text":"False","result":"Giant Ball of Twine: Oops. Accidentally added the answers to a PSAT","next":-1}]}];

let trials = [trial1, trial2, trial3, trial4, trial5, trial6, trial7, trial8, trial9, trial10, trial11, trial12, trial13];

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
  healthElement.innerText = "Health: "+health;

  let currentNode = textNodes.find(textNode => textNode.id === timeline);

  ask(timeline);
}

// Start the game
startTrial(trial1);

function tbuttonPress(trial) {
  console.log("Skipping to trial: "+(trial+1));
  textElement.innerText+="\nSkipping to Trial "+(trial+1)+"...\n\n";
  health = 5;
  currentTrial = trial+1;
  startTrial(trials[trial]);
}

const title = document.getElementById('Title');
const desc = document.getElementById('Desc');

function changeLanguage(lang) {
  console.log("Language is now: "+lang);
  switch (lang) {
    case 'eng':
      title.innerText = "The Legend of Hercules: Breath of the Twine";
      desc.innerText = "A JS based text adventure game where you get to choose your own adventure in the Greco-Roman mythos.";
      healthElement.innerText = "Health: "+health;
      break;
    case 'lat':
      title.innerText = "Mythos Herculis: Aura Pilae Aciae";
      desc.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      healthElement.innerText = "Valetudo: V";
      break;
    case 'bin':
      title.innerText = "01010100 01101000 01100101 00100000 01001100 01100101 01100111 01100101 01101110 01100100 00100000 01101111 01100110 00100000 01001000 01100101 01110010 01100011 01110101 01101100 01100101 01110011 00111010 00100000 01000010 01110010 01100101 01100001 01110100 01101000 00100000 01101111 01100110 00100000 01110100 01101000 01100101 00100000 01010100 01110111 01101001 01101110 01100101";
      desc.innerText = "01000001 00100000 01001010 01010011 00100000 01100010 01100001 01110011 01100101 01100100 00100000 01110100 01100101 01111000 01110100 00100000 01100001 01100100 01110110 01100101 01101110 01110100 01110101 01110010 01100101 00100000 01100111 01100001 01101101 01100101 00100000 01110111 01101000 01100101 01110010 01100101 00100000 01111001 01101111 01110101 00100000 01100111 01100101 01110100 00100000 01110100 01101111 00100000 01100011 01101000 01101111 01101111 01110011 01100101 00100000 01111001 01101111 01110101 01110010 00100000 01101111 01110111 01101110 00100000 01100001 01100100 01110110 01100101 01101110 01110100 01110101 01110010 01100101 00100000 01101001 01101110 00100000 01110100 01101000 01100101 00100000 01000111 01110010 01100101 01100011 01101111 00101101 01010010 01101111 01101101 01100001 01101110 00100000 01101101 01111001 01110100 01101000 01101111 01110011 00101110";
      healthElement.innerText = "01101000 01100101 01100001 01101100 01110100 01101000: 00110101";
      break;
    case 'shk':
      title.innerText = "The Legend of H'rcules: Breath of the Twine";
      desc.innerText = "A JS bas'd text adventure game wh're thee chooseth thy owneth adventure in the Greco-Roman mythos.";
      healthElement.innerText = "Health: 5";
      break;
    case 'mor':
      title.innerText = "- .... . / .-.. . --. . -. -.. / --- ..-. / .... . .-. -.-. ..- .-.. . ... ---... / -... .-. . .- - .... / --- ..-. / - .... . / - .-- .. -. .";
      desc.innerText = ".- / .--- ... / -... .- ... . -.. / - . -..- - / .- -.. ...- . -. - ..- .-. . / --. .- -- . / .-- .... . .-. . / -.-- --- ..- / --. . - / - --- / -.-. .... --- --- ... . / -.-- --- ..- .-. / --- .-- -. / .- -.. ...- . -. - ..- .-. . / .. -. / - .... . / --. .-. . -.-. --- -....- .-. --- -- .- -. / -- -.-- - .... --- ... .-.-.-";
      healthElement.innerText = ".... . .- .-.. - ....: .....";
      break;
    case 'grk':
      title.innerText = "Ο Θρύλος του Ηρακλή: Ανάσα του Σπάγκο";
      desc.innerText = "Ένα JS βασισμένο σε κείμενο παιχνίδι περιπέτειας όπου μπορείτε να επιλέξετε τη δική σας περιπέτεια στο ελληνορωμαϊκό μύθο.";
      healthElement.innerText = "Υγεία: Π";
      break;
    default:
      console.log("Invalid language");
  }
}