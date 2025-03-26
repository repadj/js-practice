export function menuScreen(startGame: (selectedMode: string) => void) {
    let menu = document.createElement("div");
    menu.id = "menu";
    let title = document.createElement("h1");
    title.innerHTML = "TIC TAC TWO MENU";
    menu.appendChild(title);

    let modeMenu = document.createElement("div");
    modeMenu.id = "modeMenu";
    let pvpButton = document.createElement("select");
    pvpButton.id = "mode";
    pvpButton.classList.add("menuButton");

    let option1 = document.createElement("option");
    option1.value = "pvp";
    option1.innerHTML = "PvP";
    pvpButton.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = "pvc";
    option2.innerHTML = "PvC";
    pvpButton.appendChild(option2);
    menu.appendChild(pvpButton);

    let startButton = document.createElement("button");
    startButton.innerHTML = "Start Game";
    startButton.classList.add("menuButton");
    startButton.addEventListener("click", () => {
        startGame(pvpButton.options[pvpButton.selectedIndex].value);
    });
    menu.appendChild(startButton);

    let rules = document.createElement("button");
    rules.innerHTML = "Rules";
    rules.classList.add("menuButton");
    rules.addEventListener("click", () => {
        window.location.href = "https://gamescrafters.berkeley.edu/games.php?game=tictactwo";
    });
    menu.appendChild(rules);

    return menu;
}

export function getBoard(boardState: () => (string | undefined)[][], updateFunction: (x: number, y:number, e: MouseEvent) => void, isInGrid: (x: number,y: number) => boolean) {
    let board = document.createElement("div");
    board.id = "board"

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            cell.classList.add("square");
            if (isInGrid(i, j)) {
                cell.classList.add("grid");
            }
            cell.addEventListener("click", (e) => { updateFunction(i, j, e) });

            cell.innerHTML = boardState()[i][j] || "&nbsp;";
            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    return board;
}

export function getGridButtons(handleMoveGrid: (direction: string) => void, currentPlayerMoves: () => number, checkForWin: () => string) {
    let buttons = document.createElement("div");
    buttons.id = "buttons";

    let directions = ["▲", "▼", "◄", "►"];

    directions.forEach((direction) => {
        let dir = document.createElement("button");
        dir.innerHTML = direction;
        dir.classList.add("gridButton");
        buttons.appendChild(dir);
        dir.addEventListener('click', () => {
            if (currentPlayerMoves() >= 2 && checkForWin() === "N") {
                console.log(`Moving grid in direction: ${direction}`);
                handleMoveGrid(direction);
            }
        });
    });

    return buttons;
}