const barElem = document.getElementById("bar"),
  gapElem = document.getElementById("gap"),
  birdElem = document.querySelector("#bird img"),
  scoreElem = document.getElementById("score"),
  loseAudio = document.getElementById("lose"),
  loseAlert = document.getElementById("lose-alert"),
  loseAlertBg = document.getElementById("lose-alert-bg");
let score = 0;

// Generate Random Place of Gap
const generateRandomGap = () => {
  barElem.addEventListener("animationiteration", () => {
    let randomTop = Math.random() * (600 - 190);
    gapElem.style.top = randomTop + "px";
    score++;
    scoreElem.innerHTML = score;
  });
};
generateRandomGap();

// Bird Gravity
let isJumping = false;
setInterval(() => {
  let birdTop = parseInt(getComputedStyle(birdElem).getPropertyValue("top"));
  if (!isJumping) {
    if (birdTop < 800) {
      birdElem.style.top = birdTop + 3 + "px";
    }
  }
}, 10);

// Bird Jump
document.addEventListener("click", (e) => {
  isJumping = true;
  let jumpCount = 0;

  let jumpInterval = setInterval(() => {
    jumpCount++;
    let birdTop = parseInt(getComputedStyle(birdElem).getPropertyValue("top"));
    if (birdTop > 0 && jumpCount < 15) {
      birdElem.style.top = birdTop - 5 + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      isJumping = false;
      jumpCount = 0;
    }
  }, 10);
  loseGame();
});

//Game Over
const loseGame = () => {
  let barLeft = parseInt(getComputedStyle(barElem).getPropertyValue("left"));
  let gapTop = parseInt(getComputedStyle(gapElem).getPropertyValue("top"));
  let birdTop = parseInt(getComputedStyle(birdElem).getPropertyValue("top"));

  if (barLeft < 30 && (birdTop > gapTop + 190 || birdTop < gapTop)) {
    loseAudio.play();

    loseAlert.style.display = "block";
    loseAlertBg.style.display = "block";
    loseAlert.innerHTML = `You Lose !  Your Score is : ${score}`;
    setTimeout(() => {
      loseAlert.style.display = "none";
      loseAlertBg.style.display = "none";
    }, 2000);

    birdElem.style.top = 40 + "px";
    barElem.style.left = 500 + "%";
    score = 0;
  }
};
