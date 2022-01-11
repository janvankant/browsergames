import { animalNameArr, fruitNameArr, peopleNameArr } from "./modules/memModule.js";

// SETUP ---->>> MAIN MENU <<<---- //
const mainMenuContainer = document.getElementById("mainMenuContainer");
const menuStartBtn = document.getElementById("menuStartBtn");
const menuOptionBtn = document.getElementById("menuOptionBtn");
const menuScoreBtn = document.getElementById("menuScoreBtn");
const menuQuitBtn = document.getElementById("menuQuitBtn");
const btnClickAudio = new Audio("../audio/button_click.mp3");



// SETUP ---->>> OPTIONS <<<---- //
const optionsMenuContainer = document.getElementById("optionsMenuContainer");
var volumeSlider = document.getElementById("volumeSlider");
const difficultyBtns = document.querySelectorAll(".difBtn");
const themeBtns = document.querySelectorAll(".themeBtn");
const fgColUl = document.getElementById("selectFgCol");
const fgColLi = fgColUl.querySelectorAll("li");
const selectFgColBtn = document.getElementById("selectFgColBtn");
const backBtn = document.getElementById("backBtn");

// SETUP ---->>> GAME <<<---- //
const gameContainer = document.getElementById("gameContainer");
const gameArea = document.querySelector(".game-area");
const card = document.getElementById("newCard0");
var currentThemeName = "Animals";
var currentTheme = [...animalNameArr];
var count = 0;
var openCardArr = [];
var openCardsNo = 0;
var numberOfCards = 12;
var totalMoveCount = 0;
// const flipCardSounds = ["card-flip-1", "card-flip-2", "card-flip-3"];
var audioFlipCard = document.getElementById("audioFlipCard");

// SETUP ---->>> GAME CONTROLS <<<<---- //
var gameMoveCount = document.getElementById("moveCount");
const gameOptionBtn = document.getElementById("gameOptionBtn");
const ingameOptions = document.getElementById("ingameOptions");
const volumeSlider2 = document.getElementById("volumeSlider2");
const fgColUlINGAME = document.getElementById("selectFgColINGAME");
const fgColLiINGAME = fgColUlINGAME.querySelectorAll("li");
const selectFgColBtnINGAME = document.getElementById("selectFgColBtnINGAME");
const restartBtn = document.getElementById("restartBtn");
const backToGameBtn = document.getElementById("backToGameBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");

// ---->>> MAIN MENU <<<---- //
menuStartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    btnClickAudio.play();
    mainMenuContainer.style.display = "none";
    gameContainer.style.display = "flex";
    createNewCards();
});

menuOptionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    btnClickAudio.play();
    mainMenuContainer.style.display = "none";
    optionsMenuContainer.style.display = "flex";
    // localStorage.get("volume");
})

menuScoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Sorry, under construction!");
})

menuQuitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "./../index.html";
});

// ---->>> OPTIONS <<<---- //
// -- change volume -- //

window.changeVolume = function changeVolume() {
    console.log(volumeSlider.value);
    volumeSlider2.setAttribute("value", volumeSlider.value);
    audioFlipCard.volume = volumeSlider.value / 100;
    btnClickAudio.volume = volumeSlider.value / 100;
}

// -- change difficulty -- // (ONCLICK DOESNT WORK WITH MODULES, SO => WINDOW.FUNCTION = FUNCTION ....)
window.changeDifficulty = function changeDifficulty(btn) {
    difficultyBtns.forEach(element => {
        element.classList.remove("current");
    });
    btn.classList.add("current");

    playBtnClickAudio();

    if (btn.innerText == "Easy") {
        numberOfCards = 12;
        gameArea.style.gridTemplateColumns = "repeat(4, 1fr)"
    } else if (btn.innerText == "Normal") {
        numberOfCards = 16;         //FIX WEIRD DISTRIBUTION
        gameArea.style.gridTemplateColumns = "repeat(5, 1fr)"
    } else {
        numberOfCards = 20;
        gameArea.style.gridTemplateColumns = "repeat(5, 1fr)";
    }

}

// -- change themes -- // (ONCLICK DOESNT WORK WITH MODULES, SO => WINDOW.FUNCTION = FUNCTION ....)
window.changeTheme = function changeTheme(btn) {
    themeBtns.forEach(element => {
        element.classList.remove("current");
    });
    btn.classList.add("current");

    playBtnClickAudio();

    currentThemeName = btn.innerText;
    if (currentThemeName == "Animals") {
        currentTheme = [...animalNameArr];
    } else if (currentThemeName == "Fruits") {
        currentTheme = [...fruitNameArr];
    } else {
        currentTheme = [...peopleNameArr];
    }
    currentThemeName = currentThemeName.toLowerCase();
}

// -- card foregrounds -- //
fgColLi.forEach((element) => {
    element.innerHTML = `<img src="${element.getAttribute('thumbnail')}"/> <span>${element.innerText}</span>`;
    element.onclick = () => {
        fgColUl.style.display = "none";
        selectFgColBtn.innerHTML = element.outerHTML;

        playBtnClickAudio();

        //change foreground image
        let foreGroundImage = element.innerText.toLowerCase().trim();
        card.children[0].children[0].setAttribute("src", `../img/memory/cardFg/${foreGroundImage}.jpg`);
    };
});

selectFgColBtn.innerHTML = fgColLi[2].outerHTML;
selectFgColBtn.setAttribute("value", fgColLi[2].getAttribute("value"));

selectFgColBtn.addEventListener("click", () => {
    fgColUl.style.display = fgColUl.style.display === "block" ? "none" : "block";
    playBtnClickAudio();
});

backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    mainMenuContainer.style.display = "flex";   //flex
    optionsMenuContainer.style.display = "none";
    playBtnClickAudio();
})


// ---->>> GAME GAME GAME <<<---- //

function createNewCards() {
    //CHOOSE & RANDOMISE DOUBLE CARDNAMES
    var cardNames = [];
    for (let i = 0; i < (numberOfCards / 2); i++) {
        var chosenName = currentTheme[Math.floor(Math.random() * currentTheme.length)];
        cardNames.push(chosenName);
        var pushedOut = currentTheme.indexOf(chosenName);
        currentTheme.splice(pushedOut, 1);
    }
    cardNames = cardNames.concat(cardNames);
    shuffle(cardNames);
    console.log(cardNames);

    //ADD FIRST ANIMAL NAME TO FIRST/ORIGINAL CARD
    card.children[0].children[1].setAttribute("alt", `card ${cardNames[0]}`);
    card.children[0].children[1].setAttribute("src", `../img/memory/${currentThemeName.toLowerCase()}/${cardNames[0]}.jpg`);
    card.children[0].children[1].setAttribute("name", cardNames[0]);

    //MAKE OTHER 11 CARDS FROM HTML TEMPLATE
    for (let i = 1; i < numberOfCards; i++) {
        var newCard = gameArea.children[0].cloneNode(true);
        gameArea.appendChild(newCard);
        newCard.setAttribute("id", `newCard${i}`);
        newCard.children[0].children[1].setAttribute("alt", `card ${cardNames[i]}`);
        newCard.children[0].children[1].setAttribute("src", `../img/memory/${currentThemeName.toLowerCase()}/${cardNames[i]}.jpg`);
        newCard.children[0].children[1].setAttribute("name", cardNames[i]);

        // newCard.addEventListener("click", rotateCardShow.bind(null, this));
    }
}

//FUNCTION ROTATE THE CARDS (ONCLICK DOESNT WORK WITH MODULES, SO => WINDOW.FUNCTION = FUNCTION ....)
window.rotateCardShow = function rotateCard(element) {
    count++;
    totalMoveCount++;
    gameMoveCount.innerText = totalMoveCount;
    element.children[0].classList.add("card-rotate");
    element.children[0].style.transform = "rotateX(180deg)";
    element.setAttribute("onclick", null);

    audioFlipCard.setAttribute("src", `../audio/card-flip-1.wav`);
    audioFlipCard.play();

    openCardArr.push(element);

    if (count == 2) {
        if (openCardArr[0].children[0].children[1].getAttribute("name") == openCardArr[1].children[0].children[1].getAttribute("name")) {
            openCardsNo += 2;
            if (openCardsNo === numberOfCards) {
                alert("You won the game!")
                setTimeout(location.reload(), 2000);
            }
        } else {
            setTimeout(rotateCardHide.bind(null, openCardArr), 1000);
        }
        count = 0;
        openCardArr = [];
    }
}

function rotateCardHide(arr) {
    arr.forEach(element => {
        element.children[0].style.transform = "rotateX(0deg)";
        setTimeout(() => { element.children[0].classList.remove("card-rotate"); }, 1000);
        element.setAttribute("onclick", "rotateCardShow(this)");

    });
    audioFlipCard.setAttribute("src", `../audio/card-flip-3.wav`);
    audioFlipCard.play();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function playBtnClickAudio() {
    btnClickAudio.play();
}

// ---->>> GAME CONTROLS <<<---- //
gameOptionBtn.addEventListener("click", openIngameOptions);
restartBtn.addEventListener("click", restartGame);
backToGameBtn.addEventListener("click", closeIngameOptions);
backToMenuBtn.addEventListener("click", () => location.reload(true));


function openIngameOptions() {
    ingameOptions.style.display = "flex";
    playBtnClickAudio();
}

function restartGame(e) {
    e.preventDefault();

    let tempArr = document.querySelectorAll(".card");
    for (let i = 1; i < tempArr.length; i++) {
        tempArr[i].remove();
    }

    if (animalNameArr.includes(currentTheme[0])) {
        currentTheme = [...animalNameArr];
    } else if (peopleNameArr.includes(currentTheme[0])) {
        currentTheme = [...peopleNameArr];
    } else if (fruitNameArr.includes(currentTheme[0])) {
        currentTheme = [...fruitNameArr];
    }

    card.children[0].classList.remove("card-rotate");
    card.children[0].style.transform = "rotateX(0deg)";
    card.setAttribute("onclick", "rotateCardShow(this)");

    count = 0;
    totalMoveCount = 0;
    gameMoveCount.innerText = 0;

    createNewCards();

    ingameOptions.style.display = "none";
    playBtnClickAudio();
}

function closeIngameOptions(e) {
    e.preventDefault();
    ingameOptions.style.display = "none";
    // localStorage.setItem("volume", volumeSlider.value);
    playBtnClickAudio();
}

window.changeVolumeIngame = function changeVolumeIngame() {
    volumeSlider.setAttribute("value", volumeSlider2.value);
    console.log(volumeSlider2.value);
    changeVolume();
}

fgColLiINGAME.forEach((element) => {
    element.innerHTML = `<img src="${element.getAttribute('thumbnail')}"/> <span>${element.innerText}</span>`;
    element.onclick = () => {
        fgColUlINGAME.style.display = "none";
        selectFgColBtnINGAME.innerHTML = element.outerHTML;

        playBtnClickAudio();

        //change foreground image
        let foreGroundImage = element.innerText.toLowerCase().trim();
        let tempCardArr = document.querySelectorAll(".card");
        tempCardArr.forEach(element => {
            element.children[0].children[0].setAttribute("src", `../img/memory/cardFg/${foreGroundImage}.jpg`);
        });
        // card.children[0].children[0].setAttribute("src", `../img/memory/cardFg/${foreGroundImage}.jpg`);
    };
});

selectFgColBtnINGAME.innerHTML = fgColLiINGAME[2].outerHTML;
selectFgColBtnINGAME.setAttribute("value", fgColLiINGAME[2].getAttribute("value"));

selectFgColBtnINGAME.addEventListener("click", () => {
    fgColUlINGAME.style.display = fgColUlINGAME.style.display === "block" ? "none" : "block";
    playBtnClickAudio();
});

