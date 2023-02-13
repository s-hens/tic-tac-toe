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

    function handleTurn() {
        this.innerText = `${human.marker}`;
        gameboard.at(this.getAttribute("data-index")).fill = human.marker; //div innerText STILL matches box.fill
        console.table(gameboard);
        
        triples.forEach(triple => {
            if (gameboard.at(triple.first).fill === gameboard.at(triple.second).fill
            && gameboard.at(triple.second).fill === gameboard.at(triple.third).fill
            && gameboard.at(triple.first). fill != "empty") {
                console.log("win!");
            };
        });
    }
})();

//console.table(gameboard);