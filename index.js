const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const negNumber = document.getElementById("negNumber");
const moreThan100 = document.getElementById("moreThan100");
const image = document.createElement("img");
let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  hideAllMessages();

  if (guess !== targetNumber && guess > 0 && guess < 100) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    }

    attempts = attempts + 1;
    const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.style.display = "";

    if (remainingAttempts === 1) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining.`;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining.`;
    }
  }

  if (guess === targetNumber) {
    attempts = attempts + 1;
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    submitButton.disabled = true;
    guessInput.disabled = true;

    maxGuessesMessage.innerHTML = `You reached the max number of guesses! <br> 
    The NUMBER was ${targetNumber}.`;
    maxGuessesMessage.style.display = "";
  }

  if (guess < 1 || guess > 99) {
    if (guess < 1) {
      negNumber.style.display = "";
    } else if (guess > 99) {
      moreThan100.style.display = "";
    }
  }

  guessInput.value = "";
  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);
  // remove the winner image
  image.remove();
  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
