// <---- The Hangman Game ----> //

window.onload = loadDoc();

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var word = JSON.parse(this.responseText);
        playGame(word);
    }
    xhttp.open("GET", "https://random-word-api.herokuapp.com/word?number=1", true);
    xhttp.send();
}



function playGame(word) {
    // old solution:
    // var wordChoice = ["hond", "nagelbijten", "sneeuwstorm", "pintje", "puzzel", "cactus", "ijsvogel", "koffie"];
    // var solution = wordChoice[Math.floor(Math.random() * wordChoice.length)];

    // current solution
    var solution = word.join();
    console.log(solution);

    var secret = "";
    for (let i = 0; i < solution.length; i++) {
        secret = secret + "_ ";
    }


    var textField = document.querySelector(".solution");
    var hangman = document.querySelector(".img");
    var btnCont1 = document.querySelector(".row1");
    var btnCont2 = document.querySelector(".row2");
    var btnCont3 = document.querySelector(".row3");
    var tryCount = document.getElementById("tryCount");
    var bgGameOver = document.querySelector(".bg-game-over");
    var fgGameOver = document.querySelector(".fg-game-over");
    var icon = document.querySelector(".icon");
    var h1 = document.querySelector(".h1");
    var p = document.querySelector(".p");
    var form = document.getElementById("form");
    var label = document.getElementById("label");
    var scoreBoard = document.getElementById("scoreBoard");
    var closeBtn = document.getElementById("closeBtn");


    var menuBtn = document.getElementById("menuBtn");
    var startOverBtn = document.getElementById("startOverBtn");
    var continueBtn = document.getElementById("continueBtn");
    var mainMenuBtn = document.getElementById("mainMenuBtn");

    continueBtn.style.display = "none";

    menuBtn.addEventListener("click", pauseGame);
    icon.addEventListener("click", showScoreBoard);
    startOverBtn.addEventListener("click", () => location.reload(true));
    mainMenuBtn.addEventListener("click", () => location.href = "../index.html");
    continueBtn.addEventListener("click", function () {
        continueBtn.style.display = "none";
        // bgGameOver.style.display = "none";
        bgGameOver.style.transform = "translateY(100%)";
    });
    confirmBtn.addEventListener("click", function (e) {
        e.preventDefault();
        addNameScore();
    });

    // bgGameOver.addEventListener("click", () => bgGameOver.style.display = 'none');

    //create text field
    textField.innerText = secret;

    //create image
    // const img0 = "../img/0.png";
    const img1 = "../img/1.png";
    const img2 = "../img/2.png";
    const img3 = "../img/3.png";
    const img4 = "../img/4.png";
    const img5 = "../img/5.png";
    const img6 = "../img/6.png";
    const img7 = "../img/7.png";
    const img8 = "../img/8.png";

    imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

    //tries & score
    var score = 80;
    var scoreArr = [];
    class ScoreName {
        constructor(score, name) {
            this.score = score;
            this.name = name;
        }
    }

    // Menu text
    const gameOverTextH1 = 'Game Over...';
    const gameWonTextH1 = 'You won!';
    const gameOverTextP = 'You were not able to guess the right word.';
    const gameOverTextP2 = `The word was: ${solution.toUpperCase()}`;
    const gameWonTextP = `You guessed the right word: ${solution.toUpperCase()}`;
    const gamePausedH1 = 'Game paused';
    const gamePausedP = 'Would you like to keep playing or go back to the menu?';

    //create buttons + add interaction
    const char = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    var x = 0;
    var y = 8;

    for (let i = 0; i < char.length; i++) {
        var btn = document.createElement("button");
        btn.innerText = char[i];
        // btnCont.append(btn);
        btn.classList.add("btn");
        btn.setAttribute("id", char[i]);
        btn.addEventListener("click", btnClicked);

        appendBtn(i, btn);


        function btnClicked() {
            if (solution.includes(char[i])) {
                var btnClick = document.getElementById(char[i]);
                btnClick.style.backgroundColor = "green";
                btnClick.style.boxShadow = "-5px -5px 5px darkgreen inset";

                for (var j = 0; j < solution.length; j++) {
                    var secArr = secret.split(' ');
                    var index = solution.indexOf(char[i]);

                    if (index >= 0) {
                        secArr.splice(index, 1, char[i]);
                        secret = secArr.join(" ");

                        var solArr = solution.split('');
                        solArr.splice(index, 1, "*");
                        solution = solArr.join("");
                    }
                }

                textField.innerText = secret;

                if (secret.includes("_")) {
                    //nothing
                } else {
                    gameWon();
                }

            } else {
                var btnClick = document.getElementById(char[i]);
                btnClick.style.backgroundColor = "#991814";
                btnClick.style.boxShadow = "-5px -5px 5px #7c0f0c inset";
                score = score - 10;

                hangman.setAttribute("src", imgArr[x]);
                x++;

                tryCount.innerText = "Turns left: " + (y - 1);
                y--;
            }

            if (y == 0) {
                gameOver();
            }
        }
    }

    function appendBtn(index, button) {
        if (index < 10) {
            btnCont1.append(button);
        } else if (index < 19) {
            btnCont2.append(button);
        } else if (index < 26) {
            btnCont3.append(button);
        }
    }

    function gameOver() {
        // bgGameOver.style.display = "flex";
        bgGameOver.style.transform = "translateY(0%)";
        h1.innerText = gameOverTextH1;
        p.innerText = gameOverTextP;
        p.innerText += gameOverTextP2;
        fgGameOver.classList.add("visible");
    }

    function gameWon() {
        // bgGameOver.style.display = "flex";
        bgGameOver.style.transform = "translateY(0%)";
        score = score + 20;
        console.log("score", score);
        h1.innerText = gameWonTextH1;
        p.innerText = gameWonTextP;
        form.style.display = "block";
        label.innerText = `Your score: ${score}`;
        fgGameOver.classList.add("visible");
    }

    function pauseGame() {
        // bgGameOver.style.display = "flex";
        bgGameOver.style.transform = "translateY(0%)";
        h1.innerText = gamePausedH1;
        p.innerText = gamePausedP;
        continueBtn.style.display = "inline";
        fgGameOver.classList.add("visible");
    }

    // function openScoreBoard() {
    //     scoreBoard.style.display = "block";
    // }

    function addNameScore(name) {
        form.style.display = "none";

        var name = input.value;
        var newName = new ScoreName(score, name);
        // console.log(newName);

        scoreArr = JSON.parse(localStorage.getItem("score"));
        if (scoreArr == null) {
            scoreArr = [];
            scoreArr.push(newName);
        } else {
            scoreArr.push(newName);
            scoreArr.sort(function (a, b) { return (b.score - a.score) });
        }
        localStorage.setItem("score", JSON.stringify(scoreArr));

        showScoreBoard();
    }

    function showScoreBoard() {
        scoreArr = JSON.parse(localStorage.getItem("score"));
        // scoreBoard.style.display = "block";
        scoreBoard.style.transform = "translateY(0%)";

        if (scoreArr != null) {
            if (scoreArr.length >= 1) {
                document.getElementById("scoreListPH").remove();
            }

            var nameList = document.createElement("ol")
            var scoreList = document.createElement("ul");
            nameList.classList.add("name-list");
            scoreList.classList.add("score-list");
            document.querySelector(".score-lists").append(nameList);
            document.querySelector(".score-lists").append(scoreList);

            for (let i = 0; i < scoreArr.length; i++) {
                var nameItem = document.createElement("li");
                (scoreArr[i].name == "") ? nameItem.innerText = "Anonymous" : nameItem.innerText = scoreArr[i].name;
                nameList.append(nameItem);

                var scoreItem = document.createElement("li");
                scoreItem.innerText = scoreArr[i].score;
                scoreList.append(scoreItem);

                if (i == 9) {
                    break;
                }
            }
        }


        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (scoreArr != null) {
                nameList.remove();
                scoreList.remove();
            }

            // scoreBoard.style.display = "none";
            scoreBoard.style.transform = "translateY(100%)"
        });
    }

}

// localStorage.clear();