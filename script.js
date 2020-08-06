// Assignment Code
const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

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

// CharacterStyle Generation
const capitalizeChance = 0.25;
const prefLength = document.getElementById("pref-length");
let indexOfCapital;
let indexOfNumber;
let indexOfSpecial;

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

  // console.log("Generation Initialized!");
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
  // to make sure there are the reqs generated: 
  // 1. iterate through and use IndexOf to find out if the string contains the req
  // 2. replace characters with req'd characters

  // maybe it would be easier if i log the index that the req is in
  // what would I need?
  // - indexOfNumber
  // - indexOfSpecial
  // - indexOfCapital
  // 

  if(includeCapitals.checked) {
    let i = GetIndexNotTaken();
    indexOfCapital = i;
    // generatedPassword[i].toUpperCase();
    generatedPassword = replaceCharInPassword(i, generatedPassword[i].toUpperCase());
    // console.log("Including Capital! index: ", indexOfCapital, "and char at index: ", generatedPassword[i]);
  }

  if(includeNumbers.checked) {
    let i = GetIndexNotTaken();
    indexOfNumber = i;
    generatedPassword = replaceCharInPassword(i, numbers[random(numbers.length)]);
  }

  if(includeSpecials.checked) {
    let i = GetIndexNotTaken();
    indexOfSpecial = i;
    generatedPassword = replaceCharInPassword(i, specialCharacters[random(specialCharacters.length)]);
  }
}

function GetIndexNotTaken() {
  let i = random(generatedPassword.length);
  while (i === indexOfCapital || i === indexOfNumber || i === indexOfSpecial) {
    i = random(generatedPassword.length);
  }
  return i;
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

  if(!includeCapitals.checked) {
    let string = generatedPassword.toLowerCase();
    generatedPassword = string;
  }

  if(includeNumbers.checked) {
    let string = numbers[random(numbers.length)] + generatedPassword;
    generatedPassword = string;
  }

  if(includeSpecials.checked) {
    let string = generatedPassword + specialCharacters[random(specialCharacters.length)];
    generatedPassword = string;
  }

  writePassword();
}

//SECTION GENERAL FUNCTIONS
function addToGeneratedPassword(string) {
  // console.log("Generated Password: " + generatedPassword + " || nextString: " + string);
  generatedPassword += string;
}


function writePassword() {
  // Write password to the #password input
  console.log("Writing Password: " + generatedPassword);
  passwordText.value = generatedPassword;
}

function random(length) {
  return Math.floor(Math.random() * length);
}
//!SECTION 

bodyEl.addEventListener("change", function () {
  
});

generateBtn.addEventListener("click", function () {
  // Add event listener to generate button
  initializeGeneration();
});

prefStylePhrase.addEventListener("change", function () {
  if(prefStylePhrase.checked){
    lengthColEl.hidden = true;
  }
});

prefStyleCharacters.addEventListener("change", function() {
  if(prefStyleCharacters.checked){
    lengthColEl.hidden = false;
  }
})