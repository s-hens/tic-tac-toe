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
            };
        });
    };

    // Computer AI: Easy
    function easyAI() {
        let computerMove = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        console.log(computerMove);
        gameboard.at(computerMove.index).marker = active.marker;
        updateBoard();
    }

    // Handle turn
    let active;

    function handleTurn() {
        // Human's turn
        active = human;
        console.log(active);
        gameboard.at(this.getAttribute("data-index")).marker = active.marker;
        gameboard.at(this.getAttribute("data-index")).available = false;
        updateBoard();
        // Computer's turn
        active = computer;
        easyAI();
    };

    updateBoard();
    
})();

/*
function hardAI() {
        let goodMoves = [];
        let availableMoves = [];

        gameboard.forEach(box => {
            if (box.fill === "empty") {
                availableMoves.push(gameboard.indexOf(box));
            }});

        triples.forEach(triple => {
            if (
            gameboard.at(triple.first).fill === human.marker &&
            gameboard.at(triple.second).fill === human.marker &&
            gameboard.at(triple.third).fill === "empty" &&
            availableMoves.includes(triple.third) &&
            !goodMoves.includes(triple.third)) {
                goodMoves.push(triple.third);
            } else if (
            gameboard.at(triple.first).fill === human.marker &&
            gameboard.at(triple.third).fill === human.marker &&
            gameboard.at(triple.second).fill === "empty" &&
            availableMoves.includes(triple.second) &&
            !goodMoves.includes(triple.second)) {
                goodMoves.push(triple.second);
            } else if (
            gameboard.at(triple.second).fill === human.marker &&
            gameboard.at(triple.third).fill === human.marker &&
            gameboard.at(triple.first).fill === "empty" &&
            availableMoves.includes(triple.first) &&
            !goodMoves.includes(triple.first)) {
                goodMoves.push(triple.first);
            }
        });

        if (availableMoves.includes(4)) {
            document.querySelector(`[data-index="4"]`).innerText = `${computer.marker}`;
            gameboard.at(4).fill = computer.marker;
            console.log("Breaking the fork strat");
        } else if (goodMoves.at(0) === undefined) {
            easyAI();
            console.log("using easy AI");
        } else {
            let computerMove = goodMoves.pop();
            document.querySelector(`[data-index="${computerMove}"]`).innerText = `${computer.marker}`;
            gameboard.at(gameboard.indexOf(computerMove)).fill = computer.marker;
            console.log("using smart move choice");
        };
    }
*/