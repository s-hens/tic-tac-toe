// Create array of players using factory function
const players = [];

const playerFactory = (name, marker, score) => {
    players.push({name, marker, score});
    return {name, marker, score};
};

const human = playerFactory("human", "x", 0);
const computer = playerFactory("computer", "o", 0);

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
const gameboard = [];
let availableBoxes = [];

const boardModule = (() => {

    // Create board array using factory function
    const boxFactory = (index, marker, available) => {
        gameboard.push({index, marker, available});
        return {index, marker, available};
    };

    for (let i = 0; i < 9; i++) {
        boxFactory(i, "empty", true);
    };

    // Update board
    function updateBoard() {
        // Update DOM based on gameboard array
        document.querySelector("main").innerHTML = ``;
        gameboard.forEach(box => {
            const div = document.createElement("div");
            div.classList.add("box");
            div.setAttribute("data-index", `${box.index}`);
            div.innerText = `${box.marker}`;
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
                console.log(`Congrats ${active.name}, you win!`);
                active.score = active.score + 1;
                gameOver = true;
            };
        });
    };

    // AI: Easy
    function easyAI() {
        let computerMove = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        gameboard.at(computerMove.index).marker = active.marker;
        gameboard.at(computerMove.index).available = false;
    };

    // AI: Hard
    function hardAI() {
        let goodMoves = [];

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

        if (availableBoxes.includes(availableBoxes.find(box => box.index === 4))) {
            gameboard.at(4).marker = active.marker;
            gameboard.at(4).available = false;
            console.log("Breaking the fork strat");
        } else if (goodMoves.at(0) === undefined) {
            easyAI();
            console.log("Using easy AI");
        } else {
            let computerChoice = goodMoves.pop();
            gameboard.at(computerChoice).marker = active.marker;
            gameboard.at(computerChoice).available = false;
            console.log("Using smart move choice");
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
        //easyAI();
        hardAI();
        updateBoard();
        if (gameOver === true) return;
    };

    updateBoard();
    
})();