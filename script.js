// Assignment Code
const generateBtn = document.querySelector("#generate");
const passwordText = document.getElementById("password");

var generatedPassword = "";

let style;
const prefStyleCharacters = document.getElementById("pref-style-characters");
const prefStylePhrase = document.getElementById("pref-style-phrase");

const includeCapitals = document.getElementById("pref-reqs-capitals");
const includeNumbers = document.getElementById("pref-reqs-numbers");
const includeSpecials = document.getElementById("pref-reqs-specials");

const bodyEl = document.body;
const lengthColEl = document.getElementById("lengthCol");
const passwordStrengthEl = document.getElementById("password-strength");
const requirementPercentage = document.getElementById("pref-req-percentage");

// CharacterStyle Generation
const prefLength = document.getElementById("pref-length");
var emptyIndexes = [];


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
  if (prefStyleCharacters.checked === true) {
    generatePasswordCharacters();
  }
  else if (prefStylePhrase.checked === true) {
    generatePasswordPhrase();
  }
  else {
    console.log("Something went wrong, no gen style selected.");
  }
}

// SECTION Generate Password Characters
function generatePasswordCharacters() {
  // 1. Take input of requirements (reqs)
  // 2. Generate random character based on reqs
  // 2.5 randomly choose between alphabet or using a prefReq (capitalizing a letter, or adding a special character/number)
  // 3. Repeat for length

  generatedPassword = "";

  // Iterate through and find nextChar
  for (let i = 0; i < prefLength.value; i++) {
    let nextChar;
    nextChar = alphabet[random(alphabet.length)];
    addToGeneratedPassword(nextChar);
  }

  // Make sure generator reqs are in place
  ensurePasswordContainsRequirements();
  writePassword();
}

function ensurePasswordContainsRequirements() {
  // populate array of available 'empty' indexes
  emptyIndexes = [];
  for (let i = 0; i < generatedPassword.length; i++) {
    emptyIndexes.push(i);
  }

  // This loop handles the percentage of characters being reqs
  let timesToLoop = generatedPassword.length * (requirementPercentage.value / 100); // this var is for percentage
  let numberOfReqsLeft = timesToLoop; // this var is so there aren't TOO many reqs, the loop breaks once it hits the maximum
  let loopedAtLeastOnce = false; // this is a safety measure so all the requirements go through at least once
  for (let i = 0; i <= timesToLoop - 1; i++) {

    if ((emptyIndexes.length === 0 || numberOfReqsLeft <= 0) && loopedAtLeastOnce) { break; }

    if (includeCapitals.checked) {
      let i = GetIndexNotTaken();
      generatedPassword = replaceCharInPassword(i, generatedPassword[i].toUpperCase());
      numberOfReqsLeft--;
      if ((emptyIndexes.length === 0 || numberOfReqsLeft <= 0) && loopedAtLeastOnce) { break; }
    }

    if (includeNumbers.checked) {
      let i = GetIndexNotTaken();
      generatedPassword = replaceCharInPassword(i, numbers[random(numbers.length)]);     
      numberOfReqsLeft--; 
      if ((emptyIndexes.length === 0 || numberOfReqsLeft <= 0) && loopedAtLeastOnce) { break; }
    }

    if (includeSpecials.checked) {
      let i = GetIndexNotTaken();
      generatedPassword = replaceCharInPassword(i, specialCharacters[random(specialCharacters.length)]);
      numberOfReqsLeft--;
    }
    loopedAtLeastOnce = true;
  }
}

function GetIndexNotTaken() {
  // I originally had a long loop here, but realized it was easier to have a list of available spots and to just update that list.
  let emptyIndex = emptyIndexes[random(emptyIndexes.length)];
  emptyIndexes.splice(emptyIndexes.indexOf(emptyIndex), 1);

  return emptyIndex;
}

function replaceCharInPassword(index, newChar) {
  let newString = generatedPassword.substring(0, index) + newChar + generatedPassword.substring(index + 1);
  return newString;
}
//!SECTION

function generatePasswordPhrase() {
  // 0. show that password length doesn't work with this generation, hide pw length
  // 1. generate 2 adjectives
  // 2. generate 1 noun
  // 3. make sure there are the requirements in each generation
  generatedPassword = "";

  let firstAdjective = adjectives[random(adjectives.length)];
  let secondAdjective = adjectives[random(adjectives.length)];
  let noun = nouns[random(nouns.length)];

  generatedPassword = firstAdjective + secondAdjective + noun;

  if (!includeCapitals.checked) {
    let string = generatedPassword.toLowerCase();
    generatedPassword = string;
  }

  if (includeNumbers.checked) {
    let string = numbers[random(numbers.length)] + generatedPassword;
    generatedPassword = string;
  }

  if (includeSpecials.checked) {
    let string = generatedPassword + specialCharacters[random(specialCharacters.length)];
    generatedPassword = string;
  }

  writePassword();
}

//SECTION GENERAL FUNCTIONS
function addToGeneratedPassword(string) {
  generatedPassword += string;
}


function writePassword() {
  console.log("Writing Password: " + generatedPassword);
  passwordText.value = generatedPassword;
}

function random(length) {
  return Math.floor(Math.random() * length);
} 

function calculatePasswordStrength() {
  // 10 is the strongest password, 0 is weakest
  let strength = 0;

  if (includeSpecials.checked) {
    strength += 2;
  }
  if (includeCapitals.checked) {
    strength += 2;
  }
  if (includeNumbers.checked) {
    strength += 2;
  }

  if (prefStylePhrase.checked) { strength += 4; }

  if (prefLength.value > 0) { strength += 0; }
  if (prefLength.value > 8) { strength += 1; }
  if (prefLength.value > 10) { strength += 2; }
  if (prefLength.value > 12) { strength += 3; }
  if (prefLength.value > 14) { strength += 4; }

  passwordStrengthEl.style.width = strength * 10 + "%";
}

bodyEl.addEventListener("change", function () {
  calculatePasswordStrength();
});

generateBtn.addEventListener("click", function () {
  // Add event listener to generate button
  initializeGeneration();
});

prefStylePhrase.addEventListener("change", function () {
  if (prefStylePhrase.checked) {
    prefLength.value = 0;
    lengthColEl.hidden = true;
  }
});

prefStyleCharacters.addEventListener("change", function () {
  if (prefStyleCharacters.checked) {
    prefLength.value = 8;
    lengthColEl.hidden = false;
  }
})

const prefLengthMin = prefLength.getAttribute("min");
const prefLengthMax = prefLength.getAttribute("max");
prefLength.addEventListener("change", function (event) {
  event.preventDefault();
  if(prefLength.value < parseInt(prefLengthMin)){
    prefLength.value = parseInt(prefLengthMin);
  } 
  else if (prefLength.value > parseInt(prefLengthMax)){
    prefLength.value = parseInt(prefLengthMax);
  }

  // change font size
  if(prefLength.value > 100) { passwordText.style.fontSize = "1rem"; }
  else if(prefLength.value > 60) { passwordText.style.fontSize = "2rem"; }
  else if(prefLength.value > 40) { passwordText.style.fontSize = "2.2rem"; }
  else if(prefLength.value > 20) { passwordText.style.fontSize = "3rem"; }
  else if(prefLength.value > 100) { passwordText.style.fontSize = "4rem"; }
});

calculatePasswordStrength();