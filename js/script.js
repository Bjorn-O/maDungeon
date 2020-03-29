
const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
let  myInventory = document.getElementById('displayInventory');
let myKeys = document.getElementById('key')

//Where the player currently is
let currentLocation = 22;
// Amount of Generic keys the player has
let keys = 0;
// Which monsters are currently alive

let draculaAlive = true;
let vineMonsterAlive = true;
let undeadMonsterAlive = true;
let gargoylesAlive = true;

//The locations where you can go and what they should contain
let locations = []; {
locations[2] = "Castle's Heart"; // You win
locations[6] = "Green House"; // Vine Monster + Whip
locations[7] = "Dracula's Chambers"; // Dracula
locations[10] = "Castle's Yard"; // Undead + Key
locations[11] = "Gardens"; // Nothing
locations[12] = "Grand Hall"; // Nothing
locations[13] = "Kitchen"; // Key
locations[15] = "Secret Chambers"; // Morning Star
locations[16] = "Library"; // Hidden locked room (Search then Use Key)
locations[17] = "Hallway"; // Nothing
locations[18] = "Dining Hall"; //Nothing
locations[21] = "Guest's Chambers"; //Key
locations[22] = "Entrance"; //Torch
locations[23] = "Storage Room";//Holy Water
locations[25] = "Tower";// Nothing
locations[26] = "Balcony";// Gargoyles & Big Key
}
//Images to represent the locations
let images = [];{
images[2] = "Castle_Heart.jpg"; //Change with vicotry screen?
images[6] = "Greenhouse.jpg";
images[7] = "Dracula'sChamber.jpg";
images[10] = "Castle's Yard.jpg";
images[11] = "Garden.jpg";
images[12] = "Grandhall.jpg";
images[13] = "Kitchen.jpg";
images[15] = "SecretChamber.jpg"
images[16] = "Library.jpg";
images[17] = "Hallway.jpg";
images[18] = "DiningHall.jpg";
images[21] = "GuestChambers.jpg";
images[22] = "Entrance.jpg";
images[23] = "StorageRoom.jpg";
images[25] = "tower.jpg";
images[26] = "Balcony.png";
}
//Items you can find
let treasures = [];{
treasures[6] = "Whip";
treasures[15] = "Morning-Star";
treasures[22] = "Torch";
treasures[23] = "Holy-Water";
}
//An empty array where your items which you'll find be added to
let inventory = [];
//Where the monsters are
let monsterLocation = [];{
monsterLocation[6] = "Shambling Mound";
monsterLocation[7] = "Dracula";
monsterLocation[10] = "Undead";
monsterLocation[26] = "Gargoyle";
}
//Which directions you can go
let directions = [];{
directions[2] = ["SOUTH"];
directions[6] = ["SOUTH"];
directions[7] = ["SOUTH"]; // Unlock NORTH when Dracula is defeated
directions[10] = ["EAST"];
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
}
//Which directions you can go after unlocking certain doors
let lockedDirections = [];{
lockedDirections[7] = ["SOUTH", "NORTH"];
lockedDirections[11] = ["WEST", "SOUTH", "NORTH"];
lockedDirections[12] = ["SOUTH", "NORTH"];
lockedDirections[16] = ["NORTH", "EAST", "WEST"];
lockedDirections[18] = ["NORTH", "WEST", "SOUTH"];
}
//descriptions of the different locals
let descriptions = [];{
descriptions[2] = "Before you an orb, shining a brilliant red. The source of the power that fuels both Dracula and his castle. Naught will stop you and no one to take this right away, you've become victorious in your quest.";
descriptions[6] = "Creeping vines surround the room, crawling and grasping to the walls and floors. In the center a bulb with a gaping maw, secreting a sweet smelling substance and leering at you with his eyeless body.";
// Change when the Vine Monster is defeated
descriptions[7] = "Before you, about 10 feet tall, a man clad in black with a face of paleful white. Ears only sharper than the fangs in his dentures. You know his name as does every living soul in these lands, before you stands Dracula."
// Change when Dracula is defeated
descriptions[10] = "Graves line melancholic fields of gloomy grass, a single dirt path crossing through. Moans and gurgles from unspeakable horros sound about as the Undead crawl across your view. The restless remaining ever so.";
// Change when the Undead are defeated
descriptions[11] = "Coming from the library, a full garden with exotic flowers and large plants comes into view. Full of life and beauty. To the north, a small greenhouse with it's window's obstructed and the yards towards the west.";
descriptions[12] = "A vast singular hall, decorated with life-sized portraits and old armours lining the wall. A beautiful rug leads up to an ornament door with a large key-hole in it.";
descriptions[13] = "A quite modern kitchen, a suspicious lack of garlic.";
descriptions[15] = "As the door behind the bookshelf opens up, you're greeted by a magically lit room. In the midst of it a single pedestal with a case on it, containing the morning star.";
// Change whent the Morning Star has been picked up
descriptions[16] = "A vast collection of knowledge, most of it you cannot comprehend. Magical lights line the ceeling, illuminating the room.";
// Change when the Hidden door is found
descriptions[17] = "A simple hallway with many doors, and even a stairway up.";
descriptions[18] = "A long table decorated with a red runner, large wooden thrones line the sides and it seats 16. A door leads to the kitchen, yet there appears to be a locked cellar door.";
// Change when the cellar door is opened.
descriptions[21] = "A collection of rooms, all with a bed, a dressoir, and a small table and chair. Many of these rooms haven't seen use in decades.";
descriptions[22] = "Before you stands a tall, cold, intimidating manions. Many stories have taught you well of the man of this manor. Dracula. With determination in your heart, you go forward.";
descriptions[23] = "A damp dark cellar filled with crates and barrels";
descriptions[25] = "A long stairway heading upwards leading to a singular passageway to the Widow Walk";
descriptions[26] = "A walk-way around the tower, high up in the air. Suddenly, a crackling noice reveals a disguised foe. A Gargoyle sitting on the edge takes flight."
// Change when the Gargoyle is defeated.
}
//descriptions of the different locals after specific events
let alternateDescriptions = [];{ // Will be used to change descriptions of the previous Array.
}

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");
    // inputArray.forEach((element) => {
    //   this.element = text.toUpperCase();
    // }); Doesn't work. Not necisarry


    if (inputArray[0] == "GO") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "NORTH":
            currentLocation -= 5;
            break;
          case "SOUTH":
            currentLocation += 5;
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
      if (checkItem(currentLocation)) {
        keys += 1
        switch (currentLocation) {

          case 6:
          inventory.push(treasures[currentLocation]);
          treasures[currentLocation] = null;
          myInventory.innerHTML += "<li>Whip</li>";
          console.log("Whip");
            break;
          case 15:
          inventory.push(treasures[currentLocation]);
          treasures[currentLocation] = null;
          console.log("Morning Star");
            break;
          case 22:
          inventory.push(treasures[currentLocation]);
          treasures[currentLocation] = null;
          console.log(myInventory.innerHTML)
          myInventory.innerHTML += "<li>Torch</li>";
          console.log(myInventory.innerHTML)
          console.log("Torch");
            break;
          case 23:
          inventory.push(treasures[currentLocation]);
          treasures[currentLocation] = null;
          console.log("Holy Water");
            break;
          default:

        }
        console.log(inventory);
        console.log(keys);
      }
      else {
        feedback.innerHTML = "There is no item present";
        setTimeout(removeFeedback, 2000);
      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "USE"){
      if (checkInventory(inputArray[1])) {
        console.log("You used" + inputArray[1]);
      }
      else {
        feedback.innerHTML = "You do not have a(n) " + inputArray[1];
        setTimeout(removeFeedback, 2000);
      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "UNLOCK"){
      if (checkLock(currentLocation) && keys > 0 && currentLocation != 12) {
        directions[currentLocation] = lockedDirections[currentLocation];
        lockedDirections[currentLocation] = null;
        keys -= 1;
        giveLocation();
        myInput.value = "";
        console.log("The door is unlocked!");
      }
      else {
        feedback.innerHTML = "No door could be unlocked."
        console.log("The door remains locked.");
        myInput.value = "";
        setTimeout(removeFeedback, 2500);
      }
    }

    if (inputArray[0] != "GO" && inputArray[0] != "USE" && inputArray[0] != "UNLOCK" && inputArray[0] != "SEARCH" ){
      feedback.innerHTML = "Please use; GO, USE, SEARCH";
      myInput.value = "";
      setTimeout(removeFeedback, 2500);
    }

  }
}
//FUNCTIONS TO CHECK THE VARIABLE THINGS ONE CAN FIND IN THE CASTLE

function checkItem(a) {
  if (treasures[a] != null) {
    console.log("There's an item.");
    return true;
  }
  else {
    console.log("There's not an item.");
    return false;
  }
}

//To see if there's a locked door.
function checkLock(a) {
  if (lockedDirections[a] == null) {
    return false;
  }
  else {
    return true;
  }
}

//To see if there's a monster.
function checkMonsterLocation(a) {
  if (monsterLocation[a] == null) {
    console.log("No Monsters")
    return false;
  }
  else {
    console.log("AH! Spoopy monstah!")
    return true;
  }
}

//To see if the item requested is present
function checkInventory(a) {
  let z = 0;

  for (let i = 0; i < inventory.length; i++){
    if (inventory[i] == a){
      z += 1;
    }
  }

  if (z == 1) {
    return true;
  }
  else {
    return false;
  }
}


// SHOWS THE DIRECTIONS, INVENTORY AND PICTURE.
function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "Available directions: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  myInventory.innerHTML = "Your inventory: "
  myKeys.innerHTML = "Keys: " + keys;
}

function removeFeedback() {
  feedback.innerHTML = "";
}

if (vineMonsterAlive == false && undeadMonsterAlive == false && gargoylesAlive == true) {
  directions[12] = lockedDirections[12];
  lockedDirections[12] = null;
  feedback.innerHTML = "The inner sanctum has opened!";
  setTimeout(removeFeedback, 4000);
}

giveLocation();
