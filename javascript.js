// Create game board using module
const gameboard = [];

const boardModule = (() => {
    for (let i = 0; i < 9; i++) {
        //The div
        const div = document.createElement("div");
        div.setAttribute("data-index", `${i}`);
        document.querySelector("main").appendChild(div);
        //The object
        const box = {fill: "test"};
        gameboard.push(box);
    }
})();

console.table(gameboard);
console.log(gameboard.at(2).fill);

// Create array of players using factory function
const players = [];

const playerFactory = (name, marker, score) => {
    players.push({name, marker, score});
    return {name, marker, score};
}

const human = playerFactory("human", "x", 0);
const computer = playerFactory("computer", "o", 0);

console.table(players);