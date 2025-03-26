import { GameBrain } from './game.js';
import * as UI from './ui.js';

let box = document.createElement("div");
box.id = "box";
document.body.appendChild(box);

let status = "menu"

let game = new GameBrain();

let info = document.createElement("div");
info.id = "info";

function renderBoard() {
    let title = document.createElement("h1");
    title.innerHTML = "TIC TAC TWO JS";
    box.appendChild(title);

    let board = UI.getBoard(game.board, UpdateFunction, game.isInGrid);
    box.appendChild(board);

    let buttons = UI.getGridButtons(handleMoveGrid, game.currentPlayerMoves, game.checkForWin);
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
    let menu = UI.menuScreen( (selectedMode) => {
        startGame(selectedMode);
        box.innerHTML = '';
        renderBoard();
    });
    box.appendChild(menu);
} else {
    renderBoard();
}

function startGame(gameMode) {
    status = "game";
    game.mode = gameMode;
}

function handleBotMove() {
    setTimeout(() => {
        game.randomMove();
        let board = UI.getBoard(game.board, UpdateFunction, game.isInGrid);
        updateInfo();
        box.replaceChild(board, document.getElementById("board"));
    }, 1000);
}

function UpdateFunction(x, y, e) {
    if (game.checkForWin() !== "N") {

    } else if (game.board[x][y] && game.board[x][y] === game.currentPlayer && game.currentPlayerMoves() >= 2) {
        game.removePiece(x, y);
        e.target.innerHTML = "&nbsp;";
    } else if (game.currentPlayerMoves() < 3){
        game.makeAMove(x, y);
        e.target.innerHTML = game.board[x][y] || "&nbsp;";
        updateInfo();
    } else {
        info.innerHTML = `Out of pieces! ${game.currentPlayer}'s turn`;
    }
    if (game.mode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
        handleBotMove();
    }
}

function handleMoveGrid(direction) {
    if (game.moveGrid(direction)) {
        let board = UI.getBoard(game.board, UpdateFunction, game.isInGrid);
        box.replaceChild(board, document.getElementById("board"));
        updateInfo();
        if (game.mode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
            handleBotMove();
        }
    } else {
        info.innerHTML = "Invalid move";
    }
}

function updateInfo() {
    info.innerHTML = `${game.currentPlayer}'s turn`;
    if (game.checkForWin() === "X" || game.checkForWin() === "O" || game.checkForWin() === "T") {
        if (game.checkForWin() === "T") {
            info.innerHTML = "TIE!";
        } else {
            info.innerHTML = `${game.checkForWin()} WON!!`;
        }
    }
}