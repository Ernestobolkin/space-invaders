import { GameConfig } from "../config";

export function build_enemies() {
    const enemyContainer = document.getElementById('enemy-container');
    if (!enemyContainer) {
        return;
    }
    const matrixSize = GameConfig.enemy_ships.default_group_size;
    const matrixRows = GameConfig.enemy_ships.default_group_rows;
    for (let i = 0; i < matrixRows; i++) {
        for (let j = 0; j < matrixSize; j++) {
            const enemy = document.createElement('div');
            enemy.className = 'enemy-ship shadow';
            enemyContainer.appendChild(enemy);
            // Assign a position from your sprite for each enemy
        }
    }
}