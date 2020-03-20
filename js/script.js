const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');

let currentLocation = 22;

let draculaAlive = true;
let vineMonsterAlive = true;
let undeadMonsterAlive = true;
let gargoylesAlive = true;

let keys = 0;

let locations = [];
location[2] = "Castle's Heart"; // You win
location[6] = "Green House"; // Vine Monster + Whip
location[7] = "Dracula's Chambers"; // Dracula
location[10] = "Castle's Yard"; // Undead + Key
location[11] = "Gardens"; // Nothing
location[12] = "Grand Hall"; // Nothing
location[13] = "Kitchen"; // Key
location[15] = "Secret Chambers"; // Morning Star
location[16] = "Library"; // Hidden locked room (Search then Use Key)
location[17] = "Hallway"; // Nothing
location[18] = "Dining Hall"; //Nothing
location[21] = "Guest's Chambers"; //Key
location[22] = "Entrance"; //Torch
location[23] = "Storage Room";//Holy Water
location[25] = "Tower";// Nothing
location[26] = "Widow's Walk";// Big Key

images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";

directions = [];
directions[2] = ["SOUTH"];
directions[6] = ["SOUTH"];
directions[7] = ["SOUTH"]; // Unlock NORTH when Dracula is defeated
directions[10] = ["WEST","EAST"];
directions[11] = ["WEST","SOUTH"]; //Unlock NORTH with key
directions[12] = ["SOUTH"]; //Unlock NORTH with Big key
directions[13] = ["SOUTH"];
directions[15] = ["EAST"];
directions[16] = ["NORTH", "EAST"]; //Unlock WEST with key
directions[17] = ["NORTH","EAST","SOUTH","WEST", "UP"];
directions[18] = ["NORTH", "WEST"]; // Unlock SOUTH with key
directions[21] = ["EAST"];
directions[22] = ["NORTH", "WEST"];
directions[23] = ["NORTH"];
directions[25] = ["DOWN", "EAST"];
directions[26] = ["WEST"];

unlockedDirections = [];
unlockedDirections[7] = ["SOUTH", "NORTH"];
unlockedDirections[11] = ["WEST", "SOUTH", "NORTH"];
unlockedDirections[12] = ["SOUTH", "NORTH"];
unlockedDirections[16] = ["NORTH", "EAST", "WEST"];
unlockedDirections[18] = ["NORTH", "WEST", "SOUTH"];

descriptions = [];
descriptions[2] = "Before you an orb, shining a brilliant red. The source of the power that fuels both Dracula and his castle. Naught will stop you and no one to take this right away, you've become victorious in your quest.";
description[6] = "Creeping vines surround the room, crawling and grasping to the walls and floors. In the center a bulb with a gaping maw, secreting a sweet smelling substance and leering at you with his eyeless body.";
// Change when the Vine Monster is defeated
description[7] = "Before you, about 10 feet tall, a man clad in black with a face of paleful white. Ears only sharper than the fangs in his dentures. You know his name as does every living soul in these lands, before you stands Dracula."
// Change when Dracula is defeated
description[10] = "Graves line melancholic fields of gloomy grass, a single dirt path crossing through. Moans and gurgles from unspeakable horros sound about as the Undead crawl across your view. The restless remaining ever so.";
// Change when the Undead are defeated
description[11] = "Coming from the library, a full garden with exotic flowers and large plants comes into view. Full of life and beauty. To the north, a small greenhouse with it's window's obstructed and the yards towards the west.";
description[12] = "A vast singular hall, decorated with life-sized portraits and old armours lining the wall. A beautiful rug leads up to an ornament door with a large key-hole in it.";
description[13] = "A quite modern kitchen, a suspicious lack of garlic.";
description[15] = "As the door behind the bookshelf opens up, you're greeted by a magically lit room. In the midst of it a single pedestal with a case on it, containing the morning star.";
// Change whent the Morning Star has been picked up
description[16] = "A vast collection of knowledge, most of it you cannot comprehend. Magical lights line the ceeling, illuminating the room.";
// Change when the Hidden door is found
description[17] = "A simple hallway with many doors, and even a stairway up.";
description[18] = "A long table decorated with a red runner, large wooden thrones line the sides and it seats 16. A door leads to the kitchen, yet there appears to be a locked cellar door.";
// Change when the cellar door is opened.
description[21] = "A collection of rooms, all with a bed, a dressoir, and a small table and chair. Many of these rooms haven't seen use in decades.";

alternateDescriptions = []; // Will be used to change descriptions of the previous Array.



treasures = [];

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "GO") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "NORTH":
            currentLocation -= 3;
            break;
          case "SOUTH":
            currentLocation += 3;
            break;
          case "EAST":
            currentLocation += 1;
            break;
          case "WEST":
            currentLocation -= 1;
            break;
          case "UP":
            currentLocation += 8;
            break;
          case "DOWN":
            currentLocation -= 8;
            break;
        }
      } else {
        feedback.innerHTML = "Invalid Input";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "SEARCH") {
      console.log('SEARCH');
      myInput.value = "";
    }

    if (inputArray[0] == "USE"){
      console.log('Use an object.');
      myInput.value = "";
    }

    if (inputArray[0] != "GO" && inputArray[0] != "pak" && inputArray[0] != "gebruik" ){
      feedback.innerHTML = "Please use; GO, USE, SEARCH";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  myInventory.innerHTML = "Your Inventory is currently empty.";
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
