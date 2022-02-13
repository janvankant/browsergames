// --->> to do: - aantal correct hardcoden
//              - mobile versie buttons toevoegen! 

var root = document.getElementById("root");
var gameArea = document.querySelector(".game-area")
var gameWrapper = document.createElement("div");
var game = document.createElement("div");
var bgGameOver = document.querySelector(".bg-game-over");
var h1 = document.getElementById("h1");
var p = document.getElementById("p");
var restartBtn = document.getElementById("restartBtn");
var continueBtn = document.getElementById("continueBtn");
var backHomeBtn = document.getElementById("backHomeBtn");
var menuBtn = document.getElementById("menu-btn");
var inputBtnArr = document.querySelectorAll(".input-btn");

gameArea.append(gameWrapper);
gameWrapper.append(game);

game.classList.add("game");

var colours = ['p', 'b', 'r', 'y', 'g'];
var solution = [];
var arrInput = [];
var attempt = 0;
var correct = 0;

continueBtn.addEventListener("click", () => {
    document.querySelector(".header").classList.remove("blur");
    gameArea.classList.remove("blur");
    bgGameOver.style.transform = "translateY(100%)";
});

// generate random solution
for (var i = 0; i < 5; i++) {
    var sol = colours[Math.floor(Math.random() * colours.length)];
    solution.push(sol);
    var indexSol = colours.indexOf(sol);
    colours.splice(indexSol, 1);
}
console.log(solution);

var gameOverTextH1 = `Game Over...`;
var gameOverTextP = `You were not able to solve the code... The answer was:`;
var gameWonTextH1 = `You won!`;
var gameWonTextP = `Congratulations, you were able to crack the code!`;


// <--- PLAY GAME ---> //
window.addEventListener("keydown", function (keyDown) {
    var input = keyDown.key;
    toScreen(input);
});
menuBtn.addEventListener("click", pauseGame);

var undoBtn = document.querySelector(".fa-undo-alt");
undoBtn.addEventListener("click", () => {
    toScreen(undoBtn.getAttribute("value"));
});

inputBtnArr.forEach(btn => {
    let el = btn.value;
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        toScreen(el);
    });
});

function toScreen(input) {
    console.log(input);
    if (input == "g") {
        var green = document.createElement("div");
        green.classList.add("green");
        game.append(green);
    } else if (input == "r") {
        var red = document.createElement("div");
        red.classList.add("red");
        game.append(red);
    } else if (input == "b") {
        var blue = document.createElement("div");
        blue.classList.add("blue");
        game.append(blue);
    } else if (input == "y") {
        var yellow = document.createElement("div");
        yellow.classList.add("yellow");
        game.append(yellow);
    } else if (input == "p") {
        var purple = document.createElement("div");
        purple.classList.add("purple");
        game.append(purple);
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
            gameOver();
        }
    }
}

function gameOver() {
    menu();
    h1.innerText = gameOverTextH1;
    p.innerText = gameOverTextP;
    displayFinSol(solution);
    continueBtn.style.display = "none";
}

function gameWon() {
    menu();
    h1.innerText = gameWonTextH1;
    p.innerText = gameWonTextP;
    displayFinSol(solution);
    continueBtn.style.display = "none";
}

function pauseGame() {
    menu();
    h1.innerText = "Game paused";
    p.innerText = "Would you like to keep playing or go back to the menu?";

}

function menu() {
    bgGameOver.style.transform = "translateY(0%)";
    document.querySelector(".header").classList.add("blur");
    gameArea.classList.add("blur");
    restartBtn.addEventListener("click", () => location.reload(true));
    backHomeBtn.addEventListener("click", () => location.href = "../index.html");
}

function displayFinSol(sol) {
    sol.forEach(el => {
        var sp = document.createElement("span");
        if (el == "g") {
            sp.classList.add("green");
        } else if (el == "r") {
            sp.classList.add("red");
        } else if (el == "b") {
            sp.classList.add("blue");
        } else if (el == "p") {
            sp.classList.add("purple");
        } else if (el == "y") {
            sp.classList.add("yellow");
        }
        document.getElementById("solution-wrapper").append(sp);
    });
}