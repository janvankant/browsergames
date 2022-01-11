// --->> to do: - aantal correct hardcoden
//              - 




var root = document.getElementById("root");
var gameContainer = document.querySelector(".game-container")
var gameArea = document.createElement("div");
var textArea = document.createElement("div");
var game = document.createElement("div");
var bgGameOver = document.createElement("div");
var fgGameOver = document.createElement("div");
var restartBtn = document.createElement("button");
var continueBtn = document.createElement("button");
var backHomeBtn = document.createElement("button");
var menuBtn = document.getElementById("menu-btn");

gameContainer.append(gameArea);
gameContainer.append(textArea);
gameArea.append(game);
root.append(bgGameOver);
bgGameOver.append(fgGameOver);

gameArea.classList.add("game-area");
textArea.classList.add("text-area");
game.classList.add("game");
bgGameOver.classList.add("bg-game-over");
fgGameOver.classList.add("fg-game-over");
restartBtn.classList.add("restart-btn");
continueBtn.classList.add("restart-btn");
backHomeBtn.classList.add("restart-btn");

var colours = ['p', 'b', 'r', 'y', 'g'];
var solution = [];
var arrInput = [];
var attempt = 0;
var correct = 0;


// generate random solution
for (var i = 0; i < 5; i++) {
    var sol = colours[Math.floor(Math.random() * colours.length)];
    solution.push(sol);
    var indexSol = colours.indexOf(sol);
    colours.splice(indexSol, 1);
}
console.log(solution);

var finSol = solution.join("");
var inGame = true;

const gameOverText = `<h1>Game Over...</h1><p>You were not able to solve the code... <br> The answer was: ${finSol}</p>`;
const gameWonText = `<h1>You won!</h1><p>Congratulations, you were able to crack the code! <br>${finSol}</p>`;

restartBtn.innerHTML = "Start over";
continueBtn.innerHTML = "Continue";
backHomeBtn.innerHTML = "Back to menu";

// <--- PLAY GAME ---> //
window.addEventListener("keydown", toScreen);
menuBtn.addEventListener("click", pauseGame);


function toScreen(e) {
    var input = e.key;
    if (input == "g") {
        var green = document.createElement("div");
        green.classList.add("green");
        green.innerHTML = "G";
        game.append(green);
    } else if (input == "r") {
        var red = document.createElement("div");
        red.classList.add("red");
        red.innerHTML = "R";
        game.append(red);
    } else if (input == "b") {
        var blue = document.createElement("div");
        blue.classList.add("blue");
        blue.innerHTML = "B";
        game.append(blue);
    } else if (input == "y") {
        var yellow = document.createElement("div");
        yellow.classList.add("yellow");
        yellow.innerHTML = "Y";
        game.append(yellow);
    } else if (input == "p") {
        var purple = document.createElement("div");
        purple.classList.add("purple");
        purple.innerHTML = "P";
        game.append(purple);
    } else if (input == "Backspace") {
        game.lastChild.remove();
    }

    if (input == "g" || input == "r" || input == "b" || input == "p" || input == "y") {
        arrInput.push(input)
    } else if (input == "Backspace") {
        arrInput.pop();
    }

    // array = 5
    if (arrInput.length == 5) {
        for (var i = 0; i < arrInput.length; ++i) {
            if (arrInput[i] === solution[i]) {
                correct++;
            };
        }

        var text = document.createElement("p");
        text.classList.add("text");
        textArea.append(text);
        text.innerHTML += '- You got ' + correct + ' right';

        if (correct == 5) {
            inGame = false;
            gameWon();
        }

        //reset input array & go to new line
        arrInput = [];
        correct = 0;
        attempt++;
        game = document.createElement("div");
        gameArea.append(game);
        game.classList.add("game");

        if (attempt > 6) {
            inGame = false;
            gameOver();
        }
    }
}

function gameOver() {
    fgGameOver.innerHTML = gameOverText;
    menu();
}

function gameWon() {
    fgGameOver.innerHTML = gameWonText;
    menu();
}

function pauseGame() {
    fgGameOver.innerHTML = `<h1>Game paused</h1><p>Would you like to keep playing or go back to the menu?</p>`;
    menu();
    fgGameOver.append(continueBtn);
    continueBtn.addEventListener("click", function () {
        bgGameOver.style.display = "none";
        restartBtn.remove();
        continueBtn.remove();
        backHomeBtn.remove();
    });
}

function menu() {
    bgGameOver.style.display = "block";
    fgGameOver.append(restartBtn);
    fgGameOver.append(backHomeBtn);
    restartBtn.addEventListener("click", () => location.reload(true));
    backHomeBtn.addEventListener("click", () => location.href = "../index.html");
}