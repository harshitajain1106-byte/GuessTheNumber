let randomNumber = parseInt(Math.random() * 100 + 1);//Math.random() → 0 se 1 ke beech random decimal deta hai (0.23, 0.89 etc.)
//* 100 → 0–99 ban jata hai
//+ 1 → range 1–100 ho jati hai
//parseInt() → decimal hata ke integer bana deta hai
const submit = document.querySelector('#subt');//submit → button (guess submit karne ke liye)
const userInput = document.querySelector('#guessfield');//userInput → input box jahan user number dalta hai
const guessSlot = document.querySelector('.guesses');//guessSlot → previous guesses show karne ke liye
const remaining = document.querySelector('.lastResult');//remaining → kitne chances bache hain
const lowOrHi = document.querySelector('.lowOrHi');//lowOrHi → message show (high/low)
const startOver = document.querySelector('.resultPass');//startOver → game restart area

const p = document.createElement('p');//ek <p> tag JS se banaya
//baad me “Start New Game” button banane ke liye use hoga

let prevGuess = [];//prevGuess → user ke saare guesses store karega
let numGuess = 1;//numGuess → kitni baar guess kiya (attempt counter)

let playGame = true;//game chal raha hai ya nahi (true/false control)

//game chal raha ho tabhi click event chale
//addEventListener → button click detect karega
//e.preventDefault() → form reload hone se rokta hai
if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);//input box ka value le raha hai
//number me convert kar raha hai
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {//User input correct hai ya nahi check karta hai
  if (isNaN(guess)) {
    alert('PLease enter a valid number');
  } else if (guess < 1) {
    alert('PLease enter a number more than 1');
  } else if (guess > 100) {
    alert('PLease enter a  number less than 100');
  } else {
    prevGuess.push(guess);//guess array me store
    if (numGuess === 11) {//10 attempts complete ho gaye
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);//game end + answer show
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {//✔ correct guess → win
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOOO low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High`);
  }
}

function displayGuess(guess) {
  userInput.value = '';//input box clear
  guessSlot.innerHTML += `${guess}, `;//guesses screen pe show
  numGuess++;//attempts +1
  remaining.innerHTML = `${11 - numGuess} `;//remaining chances show
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;//screen pe message show karta hai (low/high/win)
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');//input box disable (ab koi guess nahi)
  p.classList.add('button');//new game button create
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;//button screen pe add
  startOver.appendChild(p);
  playGame = false;//game stop
  newGame();//restart function activate
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');//button select
  newGameButton.addEventListener('click', function (e) {//click event
    randomNumber = parseInt(Math.random() * 100 + 1);//reset everything://new number generate
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess} `;//old guesses clear
    userInput.removeAttribute('disabled');//input enable
    startOver.removeChild(p);//restart button remove

    playGame = true;//game restart
  });
}

