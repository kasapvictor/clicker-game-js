
let wrapGame = document.querySelector(".wrap-game"),
    btnStart = wrapGame.querySelector(".start-game"),
    canvas = wrapGame.querySelector(".game-canvas"),
    score = 0,
    currentTime = wrapGame.querySelector(".current-time"),
    customTime = wrapGame.querySelector(".set-time-game input"),
    result = wrapGame.querySelector(".game-result"),
    resultScore = wrapGame.querySelector(".game-result-count"),
    isGameStarted = false;

btnStart.addEventListener("click", startGame);
canvas.addEventListener("click", handleBoxClick);
customTime.addEventListener("input", changeTimer);

function changeTimer() {
    currentTime.innerText  = customTime.value + ".0";
}

function startGame() {
    isGameStarted = true;
    score = 0;
    resultScore.innerText = score;
    result.style.display = "none";
    canvas.style.backgroundColor = '#fff';
    canvas.style.border = '1px solid red';
    btnStart.classList.add("hide");
    customTime.setAttribute("disabled", true);
    let interval = setInterval(function () {
        let time = parseFloat(currentTime.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            currentTime.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function endGame() {
    currentTime.innerText  = customTime.value + ".0";
    result.style.display = "block";
    resultScore.innerText = score;
    canvas.style.backgroundColor = '#ccc';
    canvas.style.border = '1px solid #888';
    canvas.innerHTML = '';
    btnStart.classList.remove("hide");
    customTime.removeAttribute("disabled");
    isGameStarted = false;
}

function handleBoxClick(e) {
    if (!isGameStarted) {
        return;
    }
    if (e.target.dataset.box2) {
        score++;
        renderBox();
    }
}

function renderBox() {
    canvas.innerHTML = '';
   // box 1
   let box1 = document.createElement("div"),
       box1Size = randomNum(30, 100),
       box1R = randomNum(0, 255),
       box1G = randomNum(0, 255),
       box1B = randomNum(0, 255),
       maxTop = canvas.getBoundingClientRect().height - box1Size,
       maxLeft = canvas.getBoundingClientRect().width - box1Size;

   box1.style.height = box1.style.width = box1Size + "px";
   box1.style.position = 'absolute';
   box1.style.top = randomNum(0, maxTop) + "px";
   box1.style.left = randomNum(0, maxLeft) + "px";
   box1.style.backgroundColor = `rgb(${box1R}, ${box1G}, ${box1B})`;
   box1.style.borderRadius = "4px";
   box1.style.cursor = "pointer";
   box1.setAttribute("data-box1", 'true')

   canvas.insertAdjacentElement("afterbegin", box1);
  // box 2
      let box2 = document.createElement("div"),
       box2Size = randomNum(30, 100),
       box2R = randomNum(0, 255),
       box2G = randomNum(0, 255),
       box2B = randomNum(0, 255);

   box2.style.height = box2.style.width = box2Size + "px";
   box2.style.position = 'absolute';
   box2.style.top = randomNum(0, maxTop) + "px";
   box2.style.left = randomNum(0, maxLeft) + "px";
   box2.style.backgroundColor = `rgb(${box2R}, ${box2G}, ${box2B})`;
   box2.style.borderRadius = "4px";
   box2.style.cursor = "pointer";
   box2.style.outline = `4px dashed rgb(${box1R}, ${box1G}, ${box1B})`;
   box2.style.outlineOffset = "-3px";
   box2.style.zIndex = "10";
   box2.setAttribute("data-box2", 'true')

   canvas.insertAdjacentElement("afterbegin", box2);
}



function randomNum(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

