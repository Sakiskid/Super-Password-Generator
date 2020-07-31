// Assignment Code
const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

var generatedPassword;

let style;
const prefStyleCharacters = document.getElementById("pref-style-characters");
const prefStyleNouns = document.getElementById("pref-style-nouns");
const prefStylePhrase = document.getElementById("pref-style-phrase");

const prefReqsCapitals = document.getElementById("pref-reqs-capitals").checked;
const prefReqsNumbers = document.getElementById("pref-reqs-numbers").checked;
const prefReqsSpecials = document.getElementById("pref-reqs-specials").checked;

const prefLength = document.getElementById("pref-length");

// Fold These Region When not in use
const nouns = [
  "Goose",
  "Hen",
  "Alligator",
  "Crocodile",
  "Dinosaur",
  "Cat",
  "Dog",
  "Bird",
  "Canary",
  "Tiger",
  "Fly",
  "Rabbit",
  "Cow",
  "Bovine",
  "Horse",
  "Armadillo",
  "Bear",
  "PolarBear",
  "Trex",
  "Butterfly",
  "LOLCat",
  "Crow",
  "Pencil",
  "Desk",
  "Car",
  "Truck",
  "NailSalon",
  "House",
  "Airplane",
  "Academy",
  "BootCamp",
  "Coder",
  "Coffee",
  "Cup",
  "Gatorade",
  "Dorito",
  "Soda",
  "Pistol",
  "Speaker",
  "Computer",
  "Monitor",
  "Plant",
  "Walmart",
  "Target",
  "Chair",
  "Jesus",
  "Lightning",
  "Laptop",
  "Bob",
  "Door",
  "Doorbell",
  "Headphones",
  "Notebook",
  "Shotgun",
  "Kitty",
  "Puppy",
  "Baby",
  "Pacifier",
  "Controller",
  "XBox",
  "Playstation",
  "NintendoSwitch",
  "VideoGame",
  "Guitar",
  "Mailman",
  "Driver",
  "Book",
  "Foot",
  "Hand",
  "Eyeball",
  "Monster",
  "Goblin",
  "Fairy",
  "Principal",
  "Teacher",
  "SuperHero",
  "CaptainAmerica",
  "CaptainFalcon",
  "Villan"
]

const adjectives = [
  "Running",
  "Flying",
  "Red",
  "Green",
  "Orange",
  "Yellow",
  "Black",
  "White",
  "Purple",
  "Blue",
  "Hairy",
  "Huge",
  "Tiny",
  "Average",
  "Mega",
  "Clean",
  "Dirty",
  "Annoying",
  "Cute",
  "Loud",
  "Murderous",
  "Dangerous",
  "Friendly",
  "Cuddly",
  "Gorgeous",
  "Hideous",
  "Kind",
  "Mean",
  "Sweet",
  "Tasty",
  "Horrible",
  "Amazing",
  "Awesome",
  "Wonderful",
  "Sleeping",
  "Snoring",
  "Damaged",
  "Broken",
  "Marvelous",
  "Super",
  "Evil",
  "Good",
  "Bad",
  "Chaotic",
  "WorldEnding",
  "Devilish",
  "Grinning",
  "Amazed",
  "Astounded",
  "Incredulous",
  "Perplexed",
  "Discarded",
  "Forgotten",
  "Abandoned",
  "Weird",
  "Popular",
  "Dead",
  "Healthy"
]

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "=", "+", "_"]

function initializeGeneration() {
  // See What Preferences Are Selected
  if(prefStyleCharacters.checked === true){
    generatePasswordCharacters();
  }
  else if(prefStyleNouns.checked === true){
    generatePasswordNouns();
  }
  else if(prefStylePhrase.checked === true){
    generatePasswordPhrase();
  }
  else {
    console.log("Something went wrong, no gen style selected.");
  }

  console.log("Generation Initialized!");
}

// ANCHOR Generate Password Characters
function generatePasswordCharacters() {
  console.log("Generating Password Type: Characters!");
  // 1. Take input of requirements (reqs)
  // 2. Generate random character based on reqs
  // 2.5 randomly choose between alphabet or using a prefReq (capitalizing a letter, or adding a special character/number)
  // 3. Repeat for length

  let acceptedCharacters;
  generatedPassword = "";
  
  for (let i = 0; i < prefLength.value; i++) {
    // Declare the next character 
    let nextChar;

    nextChar = alphabet[Math.floor(Math.random() * alphabet.length - 1)];

    if(prefReqsCapitals) {
      // TODO make this capitalize randomly: nextChar.toUpperCase();
    }

    generatedPassword += nextChar;
    console.log("Generated Password: " + generatedPassword + " || nextChar: " + nextChar);
  }

  if(prefReqsNumbers){
    // add numbers to accepted characters
  }
  
  if(prefReqsSpecials){
    // add specials to accepted characters
  }

  writePassword();
}

function generatePasswordNouns(){

}

function generatePasswordPhrase(){

}

// Write password to the #password input
function writePassword() {
  console.log("Writing Password: " + generatedPassword);
  passwordText.value = generatedPassword;
  // let password = generatePassword();
  // passwordText.value = password;
}


// Add event listener to generate button

// generateBtn.addEventListener("click", initializeGeneration());

generateBtn.addEventListener("click", function () {
  initializeGeneration();
});

