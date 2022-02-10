// --->> to do: - aantal correct hardcoden
//              - mobile versie buttons toevoegen! 

var root = document.getElementById("root");
var gameArea = document.querySelector(".game-area")
var gameWrapper = document.createElement("div");
var game = document.createElement("div");
var bgGameOver = document.createElement("div");
var fgGameOver = document.createElement("div");
var restartBtn = document.createElement("button");
var continueBtn = document.createElement("button");
var backHomeBtn = document.createElement("button");
var menuBtn = document.getElementById("menu-btn");
var inputBtnArr = document.querySelectorAll(".input-btn");

gameArea.append(gameWrapper);
gameWrapper.append(game);

root.append(bgGameOver);
bgGameOver.append(fgGameOver);

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
window.addEventListener("keydown", function (keyDown) {
    var input = keyDown.key;
    toScreen(input);
});
menuBtn.addEventListener("click", pauseGame);


inputBtnArr.forEach(btn => {
    let el = btn.value;
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        toScreen(el);
    });
});


function toScreen(input) {
    if (input == "g") {
        var green = document.createElement("div");
        green.classList.add("green");
        game.append(green);
        // var inputObj = { "letter": input, "color": green };
    } else if (input == "r") {
        var red = document.createElement("div");
        red.classList.add("red");
        game.append(red);
        // var inputObj = { "letter": input, "color": red };
    } else if (input == "b") {
        var blue = document.createElement("div");
        blue.classList.add("blue");
        game.append(blue);
        // var inputObj = { "letter": input, "color": blue };
    } else if (input == "y") {
        var yellow = document.createElement("div");
        yellow.classList.add("yellow");
        game.append(yellow);
        // var inputObj = { "letter": input, "color": yellow };
    } else if (input == "p") {
        var purple = document.createElement("div");
        purple.classList.add("purple");
        game.append(purple);
        // var inputObj = { "letter": input, "color": purple };
    } else if (input == "Backspace") {
        game.lastChild.remove();
    }

    if (input == "g" || input == "r" || input == "b" || input == "p" || input == "y") {
        arrInput.push(input);
    } else if (input == "Backspace") {
        arrInput.pop();
    }


    if (arrInput.length == 5) {
        for (var i = 0; i < arrInput.length; ++i) {
            if (arrInput[i] === solution[i]) {
                console.log(arrInput[i]);
                correct++;
            };
        }

        var text = document.createElement("p");
        text.classList.add("text");
        gameWrapper.append(text);
        text.innerText += correct;
        (correct == 0) ? text.style.color = "red" : text.style.color = `rgb(0,${250 / ((correct + 1) / 2)},0)`;

        if (correct == 5) {
            inGame = false;
            gameWon();
        }

        //reset input array & go to new line
        arrInput = [];
        correct = 0;
        attempt++;
        gameWrapper = document.createElement("div");
        game = document.createElement("div");
        gameArea.append(gameWrapper);
        gameWrapper.append(game);
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