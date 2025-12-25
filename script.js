let score = 0;
let hearts = 5;
let input = "";
let correctAnswer = 0;
let dropInterval;
let dropPosition;
let currentDroplet;
let gameStarted = false;

// 👉 Kids mode
let kidsMode = false;

const answerBox = document.getElementById("answerBox");
const gameArea = document.getElementById("gameArea");
const scoreBox = document.getElementById("score");
const heartsBox = document.querySelector(".hearts");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const kidsStatus = document.getElementById("kidsStatus"); // span on home screen

function updateHearts(){
  heartsBox.textContent = "❤️".repeat(hearts);
}

/* =====================
   KIDS MODE TOGGLE
===================== */
function toggleKidsMode(){
  kidsMode = !kidsMode;
  if(kidsStatus){
    kidsStatus.textContent = kidsMode ? "ON" : "OFF";
  }
}

/* =====================
   START GAME
===================== */
function startGame(){
  gameStarted = true;
  score = 0;
  hearts = 5;
  input = "";

  scoreBox.textContent = score;
  updateHearts();

  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";

  createDroplet();
}

/* =====================
   CREATE DROPLET
===================== */
function createDroplet(){
  if(!gameStarted) return;

  gameArea.innerHTML = "";
  input = "";
  answerBox.textContent = "Type answer...";
  dropPosition = -80;

  let a, b;

  if(kidsMode){
    // 👉 Kids mode: sum always 0–9
    a = Math.floor(Math.random() * 9);
    b = Math.floor(Math.random() * (9 - a));
  }else{
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
  }

  correctAnswer = a + b;

  currentDroplet = document.createElement("div");
  currentDroplet.className = "droplet";
  currentDroplet.textContent = `${a} + ${b}`;
  gameArea.appendChild(currentDroplet);

  dropInterval = setInterval(() => {
    dropPosition += 1.6;
    currentDroplet.style.top = dropPosition + "px";

    if(dropPosition > 320){
      clearInterval(dropInterval);
      loseHeart();
    }
  }, 16); // smoother on mobile
}

/* =====================
   KEY PRESS (SMART AUTO SUBMIT)
===================== */
function pressKey(num){
  if(!gameStarted) return;

  // kids mode → only 1 digit
  if(kidsMode && input.length >= 1) return;

  // normal mode → max 2 digits
  if(!kidsMode && input.length >= 2) return;

  input += num;
  answerBox.textContent = input;

  // 👉 AUTO SUBMIT WHEN MATCH
  if(parseInt(input) === correctAnswer){
    handleCorrect();
  }
}

/* =====================
   CLEAR INPUT
===================== */
function clearInput(){
  input = "";
  answerBox.textContent = "Type answer...";
}

/* =====================
   CORRECT ANSWER
===================== */
function handleCorrect(){
  score += 10;
  scoreBox.textContent = score;

  clearInterval(dropInterval);
  currentDroplet.style.display = "none";

  setTimeout(createDroplet, 300);
}

/* =====================
   LOSE HEART
===================== */
function loseHeart(){
  hearts--;
  updateHearts();
  clearInterval(dropInterval);

  if(hearts <= 0){
    gameOver();
  }else{
    setTimeout(createDroplet, 300);
  }
}

/* =====================
   GAME OVER
===================== */
function gameOver(){
  gameStarted = false;
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}

/* =====================
   RESTART
===================== */
function restartGame(){
  startGame();
}
