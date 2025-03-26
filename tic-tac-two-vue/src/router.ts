import { createRouter, createWebHistory } from "vue-router";
import Menu from "@/views/Menu.vue";
import Game from "@/views/Game.vue";
import GameOver from "@/views/GameOver.vue";

const routes = [
    { path: "/", component: Menu },
    { path: "/game", component: Game },
    { path: "/gameOver", component: GameOver },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
