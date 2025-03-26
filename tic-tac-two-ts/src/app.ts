import { GameBrain } from './game';
import * as UI from './ui';

let box = document.createElement("div");
box.id = "box";
document.body.appendChild(box);

let status: "menu" | "game" = "menu";

let game: GameBrain = new GameBrain();

let info = document.createElement("div");
info.id = "info";

function renderBoard(): void {
    let title = document.createElement("h1");
    title.innerHTML = "TIC TAC TWO";
    box.appendChild(title);

    let board = UI.getBoard(() => game.board, UpdateFunction, game.isInGrid) as HTMLElement;
    box.appendChild(board);

    let buttons = UI.getGridButtons(handleMoveGrid, game.currentPlayerMoves, game.checkForWin) as HTMLElement;
    box.appendChild(buttons);

    updateInfo();
    let infobox = document.createElement("div");
    infobox.id = "infobox";
    box.append(infobox);
    infobox.appendChild(info);

    let reset = document.createElement("button");
    reset.innerHTML = "RESTART";
    reset.id = ("reset");
    reset.addEventListener("click", () => location.reload());
    box.appendChild(reset);
}

if (status === "menu") {
    let menu = UI.menuScreen( (selectedMode: string) => {
        startGame(selectedMode);
        box.innerHTML = '';
        renderBoard();
    });
    box.appendChild(menu);
} else {
    renderBoard();
}

function startGame(gameMode: string): void {
    status = "game";
    game.mode = gameMode as "pvp" | "pvc";
}

function handleBotMove(): void {
    setTimeout(() => {
        game.randomMove();
        const board = UI.getBoard(() => game.board, UpdateFunction, game.isInGrid) as HTMLElement;
        updateInfo();
        const boardElement = document.getElementById("board");
        if (boardElement) {
            box.replaceChild(board, boardElement);
        }
    }, 1000);
}

function UpdateFunction(x: number, y:number, e: MouseEvent): void {
    if (game.checkForWin() !== "N") {
        return;
    }
    const target = e.target as HTMLElement;
    if (game.board[x][y] && game.board[x][y] === game.currentPlayer && game.currentPlayerMoves() >= 2) {
        game.removePiece(x, y);
        target.innerHTML = "&nbsp;";
    } else if (game.currentPlayerMoves() < 3){
        game.makeAMove(x, y);
        target.innerHTML = game.board[x][y] || "&nbsp;";
        updateInfo();
    } else {
        info.innerHTML = `Out of pieces! ${game.currentPlayer}'s turn`;
    }
    if (game.mode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
        handleBotMove();
    }
}

function handleMoveGrid(direction: string): void {
    if (game.moveGrid(direction)) {
        const board = UI.getBoard(() => game.board, UpdateFunction, game.isInGrid) as HTMLElement;
        const boardElement = document.getElementById("board");
        if (boardElement) {
            box.replaceChild(board, boardElement);
        }
        updateInfo();
        if (game.mode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
            handleBotMove();
        }
    } else {
        info.innerHTML = "Invalid move";
    }
}

function updateInfo(): void {
    const winner: "X"|"O"|"T"|"N" = game.checkForWin();
    if (winner === "X" || winner === "O" || winner === "T") {
        info.innerHTML = winner === "T" ? "TIE!" : `${winner} WON!!`;
    } else {
        info.innerHTML = `${game.currentPlayer}'s turn`;
    }
}
