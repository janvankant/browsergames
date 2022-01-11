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

    //create divs
    var root = document.getElementById("root");
    var gameCont = document.createElement("div");
    var gameCenter = document.createElement("div");
    var btnCont = document.createElement("div");
    var bgGameOver = document.createElement("div");
    var fgGameOver = document.createElement("div");
    var h1Container = document.createElement("div");
    var restartBtn = document.createElement("button");
    var continueBtn = document.createElement("button");
    var backHomeBtn = document.createElement("button");
    var menuBtn = document.createElement("button");
    var h1 = document.createElement("h1");
    var icon = document.createElement("img");
    var p = document.createElement("p");
    var form = document.createElement("form");
    var label = document.createElement("label");
    var inputContainer = document.createElement("div");
    var input = document.createElement("input");
    var nameBtn = document.createElement("button");
    //Create scoreboard
    var scoreBoard = document.createElement("div");
    scoreBoard.classList.add("fg-game-over");
    scoreBoard.innerText = `Top 5: `;
    var scoreList = document.createElement("ol");
    var closeBtn = document.createElement("button");
    bgGameOver.append(scoreBoard);
    scoreBoard.style.display = "none";

    gameCont.classList.add("game-container");
    gameCenter.classList.add("game-center");
    btnCont.classList.add("btn-container");
    bgGameOver.classList.add("bg-game-over");
    fgGameOver.classList.add("fg-game-over");
    h1Container.classList.add("h1-container");
    h1.classList.add("h1");
    inputContainer.classList.add("input-container");
    restartBtn.classList.add("menu-btn");
    continueBtn.classList.add("menu-btn");
    backHomeBtn.classList.add("menu-btn");
    menuBtn.classList.add("menu-btn");
    icon.classList.add("icon");
    icon.setAttribute("src", "../img/icon.png");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input");
    input.setAttribute("placeholder", "Your name...");
    label.setAttribute("for", "input");

    root.append(gameCont);
    gameCont.append(menuBtn);
    gameCont.append(gameCenter);
    root.append(btnCont);
    root.append(bgGameOver);
    bgGameOver.append(fgGameOver);
    fgGameOver.append(h1Container);
    h1Container.append(h1);
    h1Container.append(icon);
    fgGameOver.append(p);
    form.append(label);
    form.append(inputContainer)
    inputContainer.append(input);
    inputContainer.append(nameBtn);

    //create text field
    var textField = document.createElement("p");
    textField.classList.add("solution");
    gameCenter.append(textField);
    textField.innerText = secret;

    //create image
    var imgCont = document.createElement("div");
    imgCont.classList.add("img-container");
    gameCenter.append(imgCont);

    const img0 = "../img/0.png";
    const img1 = "../img/1.png";
    const img2 = "../img/2.png";
    const img3 = "../img/3.png";
    const img4 = "../img/4.png";
    const img5 = "../img/5.png";
    const img6 = "../img/6.png";
    const img7 = "../img/7.png";
    const img8 = "../img/8.png";

    imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

    var hangman = document.createElement("img");
    hangman.classList.add("img");
    hangman.setAttribute("src", img0);
    imgCont.append(hangman);

    //tries & score
    var tryCount = document.createElement("p");
    gameCenter.append(tryCount);
    tryCount.innerText = "How many guesses do you need?";

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

    restartBtn.innerText = "Start over";
    continueBtn.innerText = "Continue";
    backHomeBtn.innerText = "Back to menu";
    menuBtn.innerText = "Menu";
    nameBtn.innerText = "Confirm";
    closeBtn.innerText = "Close";

    //create buttons + add interaction
    const char = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var x = 0;
    var y = 8;

    menuBtn.addEventListener("click", pauseGame);

    for (let i = 0; i < char.length; i++) {
        var btn = document.createElement("button");
        btn.innerText = char[i];
        btnCont.append(btn);
        btn.classList.add("btn");
        btn.setAttribute("id", char[i]);
        btn.addEventListener("click", btnClicked);

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

    function gameOver() {
        h1.innerText = gameOverTextH1;
        p.innerText = gameOverTextP;
        p.innerText += gameOverTextP2;
        menu();
    }

    function gameWon() {
        score = score + 20;
        console.log("score", score);
        // storeScore();
        h1.innerText = gameWonTextH1;
        p.innerText = gameWonTextP;
        label.innerText = `Your score: ${score}`;
        fgGameOver.append(form);
        menu();
        nameBtn.addEventListener("click", function (e) {
            e.preventDefault();
            addNameScore();
        });
    }

    function pauseGame() {
        h1.innerText = gamePausedH1;
        p.innerText = gamePausedP;
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
        icon.addEventListener("click", addNameScore);
    }

    function addNameScore(name) {
        form.remove();

        var name = input.value;
        var newName = new ScoreName(score, name);
        console.log(newName);

        scoreArr = JSON.parse(localStorage.getItem("score"));
        if (scoreArr == null) {
            scoreArr = [];
            scoreArr.push(newName);
        } else {
            scoreArr.push(newName);
            scoreArr.sort(function (a, b) { return (b.score - a.score) });
        }
        console.log(scoreArr);
        localStorage.setItem("score", JSON.stringify(scoreArr));

        for (let i = 0; i < scoreArr.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerText = `Score: ${scoreArr[i].score} | Name: ${scoreArr[i].name}`;
            scoreList.append(listItem);
            if (i == 9) {
                break;
            }
        }

        scoreBoard.append(scoreList);
        scoreBoard.append(closeBtn);
        // TO DO --> SOLVE PROBLEM APPEND EVERY TIME YOU CLICK

        fgGameOver.style.display = "none";
        scoreBoard.style.display = "block";

        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            fgGameOver.style.display = "block";
            scoreBoard.style.display = "none";

        })


    }

    // 

    // function storeScore() {
    //     scoreArr = JSON.parse(localStorage.getItem("score"));
    //     if (scoreArr == null) {
    //         scoreArr = [];
    //         scoreArr.push(score);
    //     } else {
    //         scoreArr.push(score);
    //     }
    //     localStorage.setItem("score", JSON.stringify(scoreArr));
    // }


}

// localStorage.clear();