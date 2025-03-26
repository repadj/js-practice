export class GameBrain {
    private _board: (string | undefined)[][] = Array(5).fill(null).map(() => Array(5).fill(undefined));
    private _mode: "pvp" | "pvc" = "pvp";
    private _currentPlayer: "X" | "O" = "X";
    private _movesX: number = 0;
    private _movesO: number = 0;
    private _gridCenterX: number = 2;
    private _gridCenterY: number = 2;

    constructor(mode: "pvp" | "pvc") {
        this._mode = mode;
    }

    get board() {
        return this._board;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    get movesO() {
        return this._movesO;
    }

    isInGrid(x: number, y: number): boolean {
        let gridStartX = this._gridCenterX - 1;
        let gridStartY = this._gridCenterY - 1;
        return x >= gridStartX && x < gridStartX + 3 && y >= gridStartY && y < gridStartY + 3;
    }

    currentPlayerMoves(): number {
        return this._currentPlayer === "X" ? this._movesX : this._movesO;
    }

    makeAMove(x: number, y: number): boolean {
        if (this._board[x][y] === undefined && this.isInGrid(x, y)) {
            this._board[x][y] = this._currentPlayer;
            this._currentPlayer === "X" ? this._movesX++ : this._movesO++;
            this.switchTurn();
            return true;
        }
        return false;
    }

    removePiece(x: number, y: number): boolean {
        if (this._board[x][y] === this._currentPlayer) {
            this._board[x][y] = undefined;
            this._currentPlayer === "X" ? this._movesX-- : this._movesO--;
            return true;
        }
        return false;
    }

    moveGrid(direction: string): boolean {
        if (this.currentPlayerMoves() < 2) return false;

        let newGridCenterX = this._gridCenterX;
        let newGridCenterY = this._gridCenterY;

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
            this._gridCenterX = newGridCenterX;
            this._gridCenterY = newGridCenterY;
            this.switchTurn();
            return true;
        }
        return false;
    }

    switchTurn() {
        this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
    }

    checkForWin(): "X" | "O" | "T" | "N" {
        let xWin = this.winCheck("X");
        let oWin = this.winCheck("O");
        if (xWin && oWin) return "T";
        if (xWin) return "X";
        if (oWin) return "O";
        return "N";
    }

    private winCheck(symbol: string): boolean {
        const gridStartX = this._gridCenterX - 1;
        const gridStartY = this._gridCenterY - 1;

        for (let i = 0; i < 3; i++) {
            if (
                this._board[gridStartX + i][gridStartY] === symbol &&
                this._board[gridStartX + i][gridStartY + 1] === symbol &&
                this._board[gridStartX + i][gridStartY + 2] === symbol
            ) {
                return true;
            }
            if (
                this._board[gridStartX][gridStartY + i] === symbol &&
                this._board[gridStartX + 1][gridStartY + i] === symbol &&
                this._board[gridStartX + 2][gridStartY + i] === symbol
            ) {
                return true;
            }
        }

        return (
            (this._board[gridStartX][gridStartY] === symbol &&
                this._board[gridStartX + 1][gridStartY + 1] === symbol &&
                this._board[gridStartX + 2][gridStartY + 2] === symbol) ||
            (this._board[gridStartX][gridStartY + 2] === symbol &&
                this._board[gridStartX + 1][gridStartY + 1] === symbol &&
                this._board[gridStartX + 2][gridStartY] === symbol)
        );
    }

    randomMove() {
        if (this.currentPlayer !== "O") return;

        let availableMoves: { x: number; y: number }[] = [];
        let botPieces: { x: number; y: number }[] = [];

        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.isInGrid(x, y)) {
                    if (this._board[x][y] === undefined) {
                        availableMoves.push({ x, y });
                    } else if (this._board[x][y] === "O") {
                        botPieces.push({ x, y });
                    }
                }
            }
        }

        let moveMade = false;
        let attempts = 0;
        const maxAttempts = 10;

        while (!moveMade && attempts < maxAttempts) {
            attempts++;
            let action = Math.floor(Math.random() * 3);

            if (action === 0 && this.movesO < 3 && availableMoves.length > 0) {
                let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                this.makeAMove(move.x, move.y);
                moveMade = true;
            } else if (action === 1 && botPieces.length > 0 && availableMoves.length > 0 && this.movesO >= 2) {
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


    canMoveGrid(direction: string): boolean {
        let newGridCenterX = this._gridCenterX;
        let newGridCenterY = this._gridCenterY;

        switch (direction) {
            case "▲": newGridCenterX--; break;
            case "▼": newGridCenterX++; break;
            case "◄": newGridCenterY--; break;
            case "►": newGridCenterY++; break;
        }

        return newGridCenterX >= 1 && newGridCenterX <= 3 && newGridCenterY >= 1 && newGridCenterY <= 3;
    }
}
