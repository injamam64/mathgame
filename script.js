let score = 0;
let hearts = 3;
let input = "";
let correctAnswer = 0;
let dropInterval;
let dropPosition;
let currentDroplet;
let gameStarted = false;

/* Kids mode */
let kidsMode = false;

const answerBox = document.getElementById("answerBox");
const gameArea = document.getElementById("gameArea");
const scoreBox = document.getElementById("score");
const heartsBox = document.querySelector(".hearts");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const kidsStatus = document.getElementById("kidsStatus");

/* =====================
   HEARTS
===================== */
function updateHearts(){
  heartsBox.textContent = "❤️".repeat(hearts);
}

/* =====================
   KIDS MODE (ONLY BEFORE GAME)
===================== */
function toggleKidsMode(){
  if(gameStarted) return;
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
  hearts = 3;
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
      handleWrong();
    }
  }, 16);
}

/* =====================
   KEY PRESS
===================== */
function pressKey(num){
  if(!gameStarted) return;

  if(kidsMode && input.length >= 1) return;
  if(!kidsMode && input.length >= 2) return;

  input += num;
  answerBox.textContent = input;

  const typedValue = parseInt(input);

  if(typedValue === correctAnswer){
    handleCorrect();
    return;
  }

  if(kidsMode || (!kidsMode && input.length === 2)){
    handleWrong();
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
   CORRECT ANSWER (POP)
===================== */
function handleCorrect(){
  score += 10;
  scoreBox.textContent = score;

  clearInterval(dropInterval);

  // ✅ correct animation
  currentDroplet.classList.add("burst-correct");

  setTimeout(createDroplet, 300);
}

/* =====================
   WRONG ANSWER (SHAKE)
===================== */
function handleWrong(){
  clearInterval(dropInterval);

  // ❌ wrong animation
  currentDroplet.classList.add("burst-wrong");

  setTimeout(() => {
    hearts--;
    updateHearts();

    if(hearts <= 0){
      gameOver();
    }else{
      createDroplet();
    }
  }, 300);
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
  gameOverScreen.style.display = "none";
  startScreen.style.display = "flex";
}
