// Create game board using module
const gameboard = [];

const boardModule = (() => {
    let neighbors;

    for (let i = 0; i < 9; i++) {
        //Object
        const box = {
            fill: "empty",
            neighbors: [i - 1,  i + 1, i - 3, i + 3]
        };
        gameboard.push(box);
        //Div
        const div = document.createElement("div");
        div.classList.add("box");
        div.setAttribute("data-index", `${i}`); //data-index of div matches gameboard.indexOf(box)
        div.innerText = `${box.fill}`; //div innerText matches box.fill
        document.querySelector("main").appendChild(div);
        //Div event listeners
        div.addEventListener("click", addMark);
    }

    function addMark() {
        this.innerText = `${human.marker}`;
        gameboard.at(this.getAttribute("data-index")).fill = human.marker; //div innerText STILL matches box.fill
        console.table(gameboard);

        neighbors = gameboard.at(this.getAttribute("data-index")).neighbors;
        console.table(neighbors);
        neighbors.forEach(neighbor =>
            document.querySelector(`[data-index="${neighbor}"]`).setAttribute('style', 'background-color: yellow')
        );
    }
})();

console.table(gameboard);



// Create array of players using factory function
const players = [];

const playerFactory = (name, marker, score) => {
    players.push({name, marker, score});
    return {name, marker, score};
}

const human = playerFactory("human", "x", 0);
const computer = playerFactory("computer", "o", 0);