//get elements
var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissor = document.getElementById("scissor");
var text = document.getElementById("text");
var playBtn = document.getElementById("play");
var scoreC = document.getElementById("scoreC");
var scoreP = document.getElementById("scoreP");

//declare var
var scorePlayer = 0;
var scoreComputer = 0;
var input;
var playAgain = true;
scoreP.innerHTML = "Your score: " + scorePlayer;
scoreC.innerHTML = "Computer score: " + scoreComputer;

//functions
function classEdit() {
    if (input == "r") {
        rock.classList.add("selected-item");
        scissor.classList.remove("selected-item");
        paper.classList.remove("selected-item");
    } else if (input == "p") {
        paper.classList.add("selected-item");
        scissor.classList.remove("selected-item");
        rock.classList.remove("selected-item");
    } else if (input == "s") {
        scissor.classList.add("selected-item");
        rock.classList.remove("selected-item");
        paper.classList.remove("selected-item");
    }
}

function playGame() {
    var options = ['p', 's', 'r'];
    var computer = options[Math.floor(Math.random() * options.length)];

    if (input == computer) {
        text.innerText = "It's a TIE";
    } else {
        if (input == "p") {
            if (computer == "r") {
                rock.classList.add("selected-computer");
                scorePlayer++;
                text.innerHTML = "You chose PAPER, the computer chose ROCK: YOU WIN!";
            } else {
                scissor.classList.add("selected-computer");
                scoreComputer++;
                text.innerHTML = "You chose PAPER, the computer chose SCISSORS: YOU LOSE!";
            }
        }
        if (input == "s") {
            if (computer == "p") {
                paper.classList.add("selected-computer");
                scorePlayer++;
                text.innerHTML = "You chose SCISSORS, the computer chose PAPER: YOU WIN!";
            } else {
                rock.classList.add("selected-computer");
                scoreComputer++;
                text.innerHTML = "You chose SCISSORS, the computer chose ROCK: YOU LOSE!";
            }
        }
        if (input == "r") {
            if (computer == "s") {
                scissor.classList.add("selected-computer");
                scorePlayer++;
                text.innerHTML = "You chose ROCK, the computer chose SCISSORS: YOU WIN!";
            } else {
                paper.classList.add("selected-computer");
                scoreComputer++;
                text.innerHTML = "You chose ROCK, the computer chose PAPER: YOU LOSE!";
            }
        }
    }

    scoreP.innerHTML = "Your score: " + scorePlayer;
    scoreC.innerHTML = "Computer score: /n" + scoreComputer;
}

//click interaction
playBtn.addEventListener("click", () => {
    if (playAgain) {
        playBtn.innerHTML = "Play again?";
        playAgain = false;

        scissor.classList.remove("item");
        rock.classList.remove("item");
        paper.classList.remove("item");

        playGame();

    } else {
        playBtn.innerHTML = "Play!";
        text.innerHTML = "Play Rock Paper Scissors!";
        playAgain = true;

        scissor.classList.remove("selected-item", "selected-computer");
        rock.classList.remove("selected-item", "selected-computer");
        paper.classList.remove("selected-item", "selected-computer");

        scissor.classList.add("item");
        rock.classList.add("item");
        paper.classList.add("item");
    }
    input = "";
});

rock.addEventListener("click", () => {
    input = "r";
    classEdit();
});
paper.addEventListener("click", () => {
    input = "p";
    classEdit();
});
scissor.addEventListener("click", () => {
    input = "s";
    classEdit();
});

