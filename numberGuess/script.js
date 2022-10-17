
const mainDoc = document.querySelector("body");
const userSection = document.createElement("div");
const userNick = document.createElement("input");
const userBtn = document.createElement("button");
const headerDiv = document.createElement("div");
const titleSect = document.createElement("h2");
titleSect.textContent = "guess a random number";
const firstTitleSect = document.createElement("h2");
const gamePoint = document.createElement("div");
const levelStatus = document.createElement("div");
const rangeInfo = document.createElement("div");
const playerName = document.createElement("div");
const playerScore = document.createElement("div");
const gameDetails = document.createElement("p");
const mainDiv = document.createElement("div");
const inputElem = document.createElement("input");
const answerDis = document.createElement("div");
const authBtn = document.createElement("button");
const resetBtn = document.createElement("button");
const nextLevel = document.createElement("button");
const statusBlock = document.createElement("div");


const contentMix = {
    gameLevel: 1,
    counter: 0,
    startingPoint: 0,
    endPoint: 3,
    answerArr: [],
    gamePlayer: "",
    playerPoint: 0,
    playerName: "",
    
}
let randomValue = Math.floor(Math.random() * contentMix.endPoint);


function playNextLevel() {
    
    contentMix.endPoint += 1;
    contentMix.gameLevel += 1;
    contentMix.counter = 0;
    contentMix.playerPoint += 5;
    randomValue = Math.floor(Math.random() * contentMix.endPoint);
    statusBlock.innerText = "";
    answerDis.innerText = "";
    authBtn.disabled = false;
    contentMix.answerArr = [];
    statusBlock.innerText = "";
    nextLevel.style.display = "none";
    structureFunct();
}


function resetGamePlay() {
    inputElem.focus();
    authBtn.disabled = false;
    statusBlock.innerText = "";
    contentMix.counter = 0;
    answerDis.textContent = "";
    contentMix.answerArr = [];
    resetBtn.style.display = "none";
}

const guessMarker = () => {
    const valueIn = Number(inputElem.value);
    answerDis.innerHTML += valueIn + " ";
    contentMix.answerArr.unshift(valueIn);
    //console.log(contentMix.endPoint, contentMix.counter, contentMix.answerArr, randomValue);
    inputElem.value = "";
    inputElem.focus();
    contentMix.counter++;

    if (valueIn === randomValue) {
        statusBlock.textContent = "Great! you got it right!";
        nextLevel.innerText = "Next level";
        nextLevel.addEventListener("click", playNextLevel);
        authBtn.disabled = true;
        mainDiv.appendChild(nextLevel);
        nextLevel.style.display = "block";
    
    } else if ((valueIn !== randomValue) && contentMix.counter < 3) {
        statusBlock.textContent = "try again";
    } else if ((valueIn !== randomValue) && contentMix.counter === 3) {
        statusBlock.innerText = "game over";
        resetBtn.innerText = "Play again";
        mainDiv.appendChild(resetBtn);
        authBtn.disabled = false;
        resetBtn.style.display = "block";
        resetBtn.addEventListener("click", resetGamePlay);
    }
}

// function for player name selector button.

function loadGamePage() {
    let gameName = userNick.value;
    if (gameName !== "" ) {
        contentMix.gamePlayer = gameName;
        console.log(contentMix.gamePlayer)   
        userSection.style.display = "none";
        structureFunct();
    } else if (gameName === "") {
        alert("input field is empty, moron!")
    }else if(/[0 - 9]/.match(gameName)){
        alert("text only please")
    }
    
}


// function of player info collection;

function userName() {
    titleSect.setAttribute("class", "user-title");
    contentMix.gamePlayer = userNick.value;
    userBtn.innerHTML = "start game";
    userBtn.setAttribute("type", "submit");
    userNick.setAttribute("placeholder", "enter a name");
    userNick.setAttribute("type", "text");
    userNick.setAttribute("min", "5");
    userSection.append(titleSect, userNick, userBtn);
    userBtn.setAttribute("class", "user-btn");
    userNick.setAttribute("class", "user-nick");
    userSection.setAttribute("class", "user-sect");
    userBtn.addEventListener("click", () => loadGamePage());
    mainDoc.appendChild(userSection);
}

function structureFunct() {
    titleSect.setAttribute("class", "user-title");
    levelStatus.innerHTML = `<p>game level: ${contentMix.gameLevel}</p>`;
    rangeInfo.innerHTML = `<p>level range: ${contentMix.startingPoint} - ${contentMix.endPoint}</p>`;
    playerName.innerHTML = `<p>player: ${userNick.value}</p>`;
    playerScore.innerHTML = `<p>game point: ${contentMix.playerPoint}</p>`;
    levelStatus.setAttribute("class", "status-info");
    rangeInfo.setAttribute("class", "range-info");
    playerName.setAttribute("class", "name-info");
    playerScore.setAttribute("class", "score-info");
    gameDetails.append(playerName, levelStatus, rangeInfo, playerScore);
    headerDiv.append(titleSect, gameDetails);
    inputElem.setAttribute("type", "number");
    inputElem.setAttribute("class", "guess-input");
    inputElem.setAttribute("placeholder", "take a guess")
    authBtn.innerText = "make guess";
    authBtn.setAttribute("class", "make-guess_btn")
    authBtn.setAttribute("type", "button");
    nextLevel.setAttribute("class", "deci-btn")
    resetBtn.setAttribute("class", "deci-btn")
    statusBlock.setAttribute("class", "guess-status");
    answerDis.setAttribute("class", "guessed-values");
    let miniBlock = document.createElement("div");
    miniBlock.setAttribute("class", "game-guess_sect");
    miniBlock.append(authBtn,answerDis);
    mainDiv.append(headerDiv, inputElem, miniBlock, statusBlock);
    authBtn.addEventListener("click", guessMarker);
    mainDoc.append(mainDiv);
}



let windowLoader = () => {
    userName();
    mainDiv.setAttribute("class", "game-section")
}

function runOutDoc (){
    setTimeout(windowLoader, 2000)
}

window.addEventListener("DOMContentLoaded", runOutDoc);


// issues to be resolved:
/*
1. random number variable not varying
2. level count variable on reflecting on the page
3. range per level not varying accordingly!
*/