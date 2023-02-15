//------------------------------------------------//
// Create array of players using factory function //
//------------------------------------------------//
const players = [];

const playerFactory = (name, marker, score) => {
    players.push({name, marker, score});
    return {name, marker, score};
}

const human = playerFactory("human", "x", 0);
const computer = playerFactory("computer", "o", 0);

//-------------------------------------------------------//
// Create array of win conditions using factory function //
//-------------------------------------------------------//
const triples = [];

const tripleFactory = (first, second, third) => {
    triples.push({first, second, third});
    return {first, second, third};
}

// Horizontal triples
tripleFactory(0, 1, 2);
tripleFactory(3, 4, 5);
tripleFactory(6, 7, 8);
// Vertical triples
tripleFactory(0, 3, 6);
tripleFactory(1, 4, 7);
tripleFactory(2, 5, 8);
// Diagonal triples
tripleFactory(0, 4, 8);
tripleFactory(2, 4, 6);

//--------------------------------//
// Create game board using module //
//--------------------------------//
const gameboard = [];

const boardModule = (() => {

    for (let i = 0; i < 9; i++) {
        // Object
        const box = {fill: "empty"};
        gameboard.push(box);
        // Div
        const div = document.createElement("div");
        div.classList.add("box");
        div.setAttribute("data-index", `${i}`); //data-index of div matches gameboard.indexOf(box)
        div.innerText = `${box.fill}`; //div innerText matches box.fill
        document.querySelector("main").appendChild(div);
        // Div event listeners
        div.addEventListener("click", handleTurn);
    }

    let active = human;
    let gameOver = false;

    function handleTurn() {
        // Place marker
        this.innerText = `${active.marker}`;
        gameboard.at(this.getAttribute("data-index")).fill = active.marker; //div innerText STILL matches box.fill
        // Check for win
        checkForWin();
        if (gameOver === true) {
            return;
        };
        //Computer turn: hard
        hardAI();
        // Check for win
        checkForWin();
        if (gameOver === true) {
            return;
        };
    }
    
    function checkForWin() {
        triples.forEach(triple => {
            if (
            gameboard.at(triple.first).fill === gameboard.at(triple.second).fill &&
            gameboard.at(triple.second).fill === gameboard.at(triple.third).fill &&
            gameboard.at(triple.first).fill != "empty") {
                active.score = active.score + 1;
                console.log(`${active.name} win. ${active.score}`);
                gameOver = true;
            };
        });
    }

    function easyAI() {
        let availableMoves = gameboard.filter(box => box.fill === "empty");
        let computerMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        document.querySelector(`[data-index="${gameboard.indexOf(computerMove)}"]`).innerText = `${computer.marker}`;
        gameboard.at(gameboard.indexOf(computerMove)).fill = computer.marker;
    }

    function hardAI() {
        let goodMoves = [];
        let availableMoves = gameboard.filter(box => box.fill === "empty");
        triples.forEach(triple => {
            if (
            gameboard.at(triple.first).fill !== "empty" &&
            gameboard.at(triple.first).fill === gameboard.at(triple.second).fill &&
            gameboard.at(triple.third).fill === "empty" &&
            availableMoves.includes(triple.third) === true &&
            goodMoves.includes(triple.third) === false ) {
                goodMoves.push(triple.third);
            } else if (
            gameboard.at(triple.first).fill !== "empty" &&
            gameboard.at(triple.first).fill === gameboard.at(triple.third).fill &&
            gameboard.at(triple.second).fill === "empty" &&
            availableMoves.includes(triple.second) === true &&
            goodMoves.includes(triple.second) === false ) {
                goodMoves.push(triple.second);
            } else if (
            gameboard.at(triple.second).fill !== "empty" &&
            gameboard.at(triple.second).fill === gameboard.at(triple.third).fill &&
            gameboard.at(triple.first).fill === "empty" &&
            availableMoves.includes(triple.first) === true &&
            goodMoves.includes(triple.first) === false ) {
                goodMoves.push(triple.first);
            }
        });     
        if (goodMoves.at(0) === undefined) {
            easyAI();
        } else {
            console.log(goodMoves);
            let computerMove = goodMoves.pop();
            console.log(computerMove);
            document.querySelector(`[data-index="${computerMove}"]`).innerText = `${computer.marker}`;
            gameboard.at(gameboard.indexOf(computerMove)).fill = computer.marker;
            goodMoves = [];
        };
    }

})();