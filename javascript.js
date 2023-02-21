// Create array of players using factory function
const players = [];

const playerFactory = (name, marker, score) => {
    players.push({name, marker, score});
    return {name, marker, score};
};

const human = playerFactory("Human", "x", 0);
const computer = playerFactory("Computer", "o", 0);

// Create array of win conditions using factory function
const triples = [];

const tripleFactory = (a, b, c) => {
    triples.push({a, b, c});
    return {a, b, c};
}

tripleFactory(0, 1, 2);
tripleFactory(3, 4, 5);
tripleFactory(6, 7, 8);
tripleFactory(0, 3, 6);
tripleFactory(1, 4, 7);
tripleFactory(2, 5, 8);
tripleFactory(0, 4, 8);
tripleFactory(2, 4, 6);

// Create game board using module & IIFE
let gameboard = [];
let availableBoxes = [];

const boardModule = (() => {

    // Create board array using factory function
    function initialSetup() {
        const boxFactory = (index, marker, available) => {
            gameboard.push({index, marker, available});
            return {index, marker, available};
        };
    
        for (let i = 0; i < 9; i++) {
            boxFactory(i, "", true);
        };
        updateBoard();
    };

    // Update board
    function updateBoard() {
        // Update DOM based on gameboard array
        document.querySelector("main").innerHTML = ``;
        gameboard.forEach(box => {
            const div = document.createElement("div");
            div.classList.add("box");
            div.setAttribute("data-index", `${box.index}`);
            div.innerHTML = `<span class="${box.marker}">${box.marker}</span>`;
            document.querySelector("main").appendChild(div);
        });
        // Update available boxes array and event listeners to available boxes
        availableBoxes = [];
        gameboard.forEach(box => {
            if (box.available === true) {
                availableBoxes.push(box);
                document.querySelector(`[data-index="${box.index}"]`).classList.add("available");
                document.querySelector(`[data-index="${box.index}"]`).addEventListener("click", handleTurn);
            }
        });
        checkForWin();
    };

    // Check win conditions
    function checkForWin() {
        triples.forEach(triple => {
            if (
            gameboard.at(triple.a).marker === gameboard.at(triple.b).marker &&
            gameboard.at(triple.b).marker === gameboard.at(triple.c).marker &&
            gameboard.at(triple.a).available === false) {
                gameboard.forEach(box => {
                    document.querySelector(`[data-index="${box.index}"]`).classList.remove("available");
                    document.querySelector(`[data-index="${box.index}"]`).removeEventListener("click", handleTurn);
                });
                active.score = active.score + 1;
                document.getElementById("scoreDiv").innerHTML = `
                    <h2>Score:</h2>
                    Human: ${human.score}<br>
                    Computer: ${computer.score}`;
                document.getElementById("resetDiv").style.visibility = "visible";
                document.getElementById("resetDiv").style.opacity = 1;
                document.getElementById("result").innerHTML = `
                    <h2>${active.name} wins!</h2>`;
                gameOver = true;
            };
        });
        if (availableBoxes.length === 0) {
            gameboard.forEach(box => {
                document.querySelector(`[data-index="${box.index}"]`).classList.remove("available");
                document.querySelector(`[data-index="${box.index}"]`).removeEventListener("click", handleTurn);
            });
            document.getElementById("resetDiv").style.visibility = "visible";
            document.getElementById("resetDiv").style.opacity = 1;
            document.getElementById("result").innerHTML = `
                <h2>It's a tic-tac-tie!</h2>`;
            gameOver = true;
        };
    };

    // Reset game
    document.getElementById("reset").addEventListener("click", reset);
    function reset() {
        document.getElementById("resetDiv").style.opacity = 0;
        document.getElementById("resetDiv").style.visibility = "hidden";
        gameOver = false;
        gameboard = [];
        availableBoxes = [];
        initialSetup();
    };

    // Toggle easy/hard mode
    let easyMode = true;
    const difficulty = document.getElementsByName("difficulty");

    difficulty.forEach((button) => button.addEventListener('change', toggleDifficulty));
    window.addEventListener("load", toggleDifficulty);

    function toggleDifficulty() {
        if (document.getElementsByName("difficulty")[0].checked) {
            easyMode = true;
        } else {
            easyMode = false;
        }
    }

    // AI: Easy
    let computerMove;

    function easyAI() {
        computerMove = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        gameboard.at(computerMove.index).marker = active.marker;
        gameboard.at(computerMove.index).available = false;
    };

    // AI: Hard
    function hardAI() {
        let goodMoves = [];

        const cornerPairs = [
            [1, 3], [1, 5], [7, 3], [7, 5]
        ];
        let goodCorners = [];

        cornerPairs.forEach(pair => {
            if (
            gameboard.at(pair.at(0)).marker === human.marker &&
            gameboard.at(pair.at(1)).marker === human.marker &&
            availableBoxes.includes(gameboard.at(pair.at(0) + pair.at(1) - 4)))
                goodCorners.push(pair.at(0) + pair.at(1) - 4);
        });

        triples.forEach(triple => {
            if (
            gameboard.at(triple.b).marker === human.marker &&
            gameboard.at(triple.c).marker === human.marker &&
            gameboard.at(triple.a).available === true &&
            !goodMoves.includes(triple.a)) {
                goodMoves.push(triple.a);
            } else if (
            gameboard.at(triple.a).marker === human.marker &&
            gameboard.at(triple.c).marker === human.marker &&
            gameboard.at(triple.b).available === true &&
            !goodMoves.includes(triple.b)) {
                goodMoves.push(triple.b);
            } else if (
            gameboard.at(triple.a).marker === human.marker &&
            gameboard.at(triple.b).marker === human.marker &&
            gameboard.at(triple.c).available === true &&
            !goodMoves.includes(triple.c)) {
                goodMoves.push(triple.c);
            }
        });

        switch (true) {
            case availableBoxes.includes(availableBoxes.find(box => box.index === 4)):
                computerMove = 4;
                gameboard.at(computerMove).marker = active.marker;
                gameboard.at(computerMove).available = false;
                console.log("if center is available, take center");
                break;
            case goodMoves.at(0) === undefined && goodCorners.at(0) !== undefined:
                computerMove = goodCorners.pop();
                gameboard.at(computerMove).marker = active.marker;
                gameboard.at(computerMove).available = false;
                console.log("if player is closing in on a corner, block");
                break;
            case goodMoves.at(0) !== undefined && goodCorners.at(0) === undefined:
                computerMove = goodMoves.pop();
                gameboard.at(computerMove).marker = active.marker;
                gameboard.at(computerMove).available = false;
                console.log("if player has 2 in a row, block the third spot");
                break;
            default:
                easyAI();
                console.log("none of these triggered");
                break;
        };
    };

    // Handle turn
    let active;
    let gameOver = false;

    function handleTurn() {
        // Human's turn
        active = human;
        gameboard.at(this.getAttribute("data-index")).marker = active.marker;
        gameboard.at(this.getAttribute("data-index")).available = false;
        updateBoard();
        if (gameOver === true) return;
        // Computer's turn
        active = computer;
        if (easyMode === true) {
            easyAI();
        } else {
            hardAI();
        }
        updateBoard();
        if (gameOver === true) return;
    };

    // Initial board setup
    initialSetup();
    
})();