export class GameBrain {
    #board = [[],[],[],[],[]];

    mode = "pvp";
    currentPlayer = "X";
    movesX = 0;
    movesO = 0;
    gridCenterX = 2;
    gridCenterY = 2;

    isInGrid = (x,y) => {
        let gridStartX = this.gridCenterX - 1;
        let gridStartY = this.gridCenterY - 1;
        return x >= gridStartX && x < gridStartX + 3 && y >= gridStartY && y < gridStartY + 3;
    }

    currentPlayerMoves = () =>{
        return this.currentPlayer === "X" ? this.movesX : this.movesO;
    }

    makeAMove(x,y){
        if (this.#board[x][y] === undefined && this.isInGrid(x,y)) {
            this.#board[x][y] = this.currentPlayer;
            this.currentPlayer === "X" ? this.movesX++ : this.movesO++;
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }
    }

    removePiece(x, y) {
        if (this.#board[x][y] !== undefined && this.#board[x][y] === this.currentPlayer) {
            this.#board[x][y] = undefined;
            this.currentPlayer === "X" ? this.movesX-- : this.movesO--;
        }
    }

    moveGrid(direction) {
        let newGridCenterX = this.gridCenterX;
        let newGridCenterY = this.gridCenterY;
        switch (direction) {
            case "▲":
                newGridCenterX--;
                break;
            case "▼":
                newGridCenterX++;
                break;
            case "◄":
                newGridCenterY--;
                break;
            case "►":
                newGridCenterY++;
                break;
        }
        if (newGridCenterX >= 1 && newGridCenterX <= 3 && newGridCenterY >= 1 && newGridCenterY <= 3) {
            this.gridCenterX = newGridCenterX;
            this.gridCenterY = newGridCenterY;
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            return true;
        }
        return false;
    }

    checkForWin = () =>{
        let xWin = this.winCheck("X");
        let oWin = this.winCheck("O");
        if (xWin && oWin) {
            return "T";
        } else if (xWin) {
            return "X";
        } else if (oWin) {
            return "O";
        } else {
            return "N";
        }
    };

    winCheck(symbol) {
        const gridStartX = this.gridCenterX - 1;
        const gridStartY = this.gridCenterY - 1;

        for (let row = gridStartX; row < gridStartX + 3; row++) {
            if (
                this.#board[row][gridStartY] === symbol &&
                this.#board[row][gridStartY + 1] === symbol &&
                this.#board[row][gridStartY + 2] === symbol
            ) {
                return true;
            }
        }

        for (let col = gridStartY; col < gridStartY + 3; col++) {
            if (
                this.#board[gridStartX][col] === symbol &&
                this.#board[gridStartX + 1][col] === symbol &&
                this.#board[gridStartX + 2][col] === symbol
            ) {
                return true;
            }
        }

        if (
            this.#board[gridStartX][gridStartY] === symbol &&
            this.#board[gridStartX + 1][gridStartY + 1] === symbol &&
            this.#board[gridStartX + 2][gridStartY + 2] === symbol
        ) {
            return true;
        }

        if (
            this.#board[gridStartX][gridStartY + 2] === symbol &&
            this.#board[gridStartX + 1][gridStartY + 1] === symbol &&
            this.#board[gridStartX + 2][gridStartY] === symbol
        ) {
            return true;
        }
        return false;
    }

    randomMove() {
        if (this.currentPlayer !== "O") return;

        let availableMoves = [];
        let botPieces = [];

        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.isInGrid(x, y)) {
                    if (this.#board[x][y] === undefined) {
                        availableMoves.push({ x, y });
                    } else if (this.#board[x][y] === "O") {
                        botPieces.push({ x, y });
                    }
                }
            }
        }

        let moveMade = false;

        while (!moveMade) {
            let action = Math.floor(Math.random() * 3);

            if (action === 0 && this.movesO < 3 && availableMoves.length > 0) {
                let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                this.makeAMove(move.x, move.y);
                moveMade = true;
            } else if (action === 1 && botPieces.length > 0 && availableMoves.length > 0 && this.movesO >= 2) {
                // Move an existing piece
                let pieceToMove = botPieces[Math.floor(Math.random() * botPieces.length)];
                let newPosition = availableMoves[Math.floor(Math.random() * availableMoves.length)];

                this.removePiece(pieceToMove.x, pieceToMove.y);
                this.makeAMove(newPosition.x, newPosition.y);
                moveMade = true;
            } else if (action === 2 && this.movesO >= 2) {
                let directions = ["▲", "▼", "◄", "►"];
                let possibleDirections = directions.filter(dir => this.canMoveGrid(dir));

                if (possibleDirections.length > 0) {
                    let randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    this.moveGrid(randomDirection);
                    moveMade = true;
                }
            }
        }
    }

    canMoveGrid(direction) {
        let newGridCenterX = this.gridCenterX;
        let newGridCenterY = this.gridCenterY;

        switch (direction) {
            case "▲": newGridCenterX--; break;
            case "▼": newGridCenterX++; break;
            case "◄": newGridCenterY--; break;
            case "►": newGridCenterY++; break;
        }

        return newGridCenterX >= 1 && newGridCenterX <= 3 && newGridCenterY >= 1 && newGridCenterY <= 3;
    }

    get board() {
        return this.#board;
    }
}