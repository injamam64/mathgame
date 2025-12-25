let score = 0;
let hearts = 5;
let input = "";
let correctAnswer = 0;
let dropInterval;
let dropPosition;
let currentDroplet;
let gameStarted = false;

const answerBox = document.getElementById("answerBox");
const gameArea = document.getElementById("gameArea");
const scoreBox = document.getElementById("score");
const heartsBox = document.querySelector(".hearts");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

function updateHearts(){
  heartsBox.textContent = "❤️".repeat(hearts);
}

function startGame(){
  gameStarted = true;
  score = 0;
  hearts = 3;
  scoreBox.textContent = score;
  updateHearts();
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  createDroplet();
}

function createDroplet(){
  if(!gameStarted) return;

  gameArea.innerHTML = "";
  input = "";
  answerBox.textContent = "Type answer...";
  dropPosition = -60;

  let a = Math.floor(Math.random()*20)+1;
  let b = Math.floor(Math.random()*20)+1;
  correctAnswer = a + b;

  currentDroplet = document.createElement("div");
  currentDroplet.className = "droplet";
  currentDroplet.textContent = `${a} + ${b}`;
  gameArea.appendChild(currentDroplet);

  dropInterval = setInterval(()=>{
    dropPosition += 1.5;
    currentDroplet.style.top = dropPosition + "px";

    if(dropPosition > 320){
      clearInterval(dropInterval);
      loseHeart();
    }
  },20);
}

function pressKey(num){
  if(!gameStarted || input.length >= 2) return;
  input += num;
  answerBox.textContent = input;
  if(input.length === 2) checkAnswer();
}

function clearInput(){
  input = "";
  answerBox.textContent = "Type answer...";
}

function checkAnswer(){
  if(parseInt(input) === correctAnswer){
    score += 10;
    scoreBox.textContent = score;
    clearInterval(dropInterval);
    currentDroplet.style.display = "none";
    setTimeout(createDroplet,300);
  }else{
    loseHeart();
  }
}

function loseHeart(){
  hearts--;
  updateHearts();
  clearInterval(dropInterval);
  if(hearts <= 0) gameOver();
  else setTimeout(createDroplet,300);
}

function gameOver(){
  gameStarted = false;
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";
}

function restartGame(){
  startGame();
}
