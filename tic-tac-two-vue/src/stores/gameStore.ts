import { defineStore } from "pinia";

export const useGameStore = defineStore("gameStore", {
    state: () => ({
        player1Name: "",
        player2Name: "",
        gameMode: "pvp",
    }),
    actions: {
        setPlayer1Name(name: string) {
            this.player1Name = name;
        },
        setPlayer2Name(name: string) {
            this.player2Name = name;
        },
        setGameMode(mode: string) {
            this.gameMode = mode;
        },
    },
});
