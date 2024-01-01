import { GameConfig } from "../config";

export function build_enemies() {
    console.log("building enemies")
    const enemyContainer = document.getElementById('enemy-container');
    if (!enemyContainer) {
        return;
    }
    const matrixSize = GameConfig.enemy_ships.group_size;
    const matrixRows = GameConfig.enemy_ships.group_rows;
    for (let i = 0; i < matrixRows; i++) {
        for (let j = 0; j < matrixSize; j++) {
            const enemy = document.createElement('div');
            enemy.className = 'enemy-ship shadow';
            enemyContainer.appendChild(enemy);
            // Assign a position from your sprite for each enemy
        }
    }
}



export function updateEnemyPositions() {
    console.log("updating enemy positions")
    const enemyContainer = document.getElementById('enemy-container');
    if (!enemyContainer) {
        return;
    }
    const rect = enemyContainer.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const enemies = enemyContainer.getElementsByClassName('enemy-ship');
    let reverseDirection = false;

    // Update the position of each enemy
    for (let i = 0; i < enemies.length; i++) {
        // Ensure the enemy is treated as an HTMLElement
        const enemy = enemies[i] as HTMLElement;
        const boundaries = enemy.getBoundingClientRect();
        const enemyLocations = {
            top: boundaries.top - rect.top,
            right: boundaries.right - rect.right,
            bottom: boundaries.bottom - rect.bottom,
            left: boundaries.left - rect.left
        };
        let currentLeft = parseInt(enemy.style.left, 10);
        if(isNaN(currentLeft)) {
            currentLeft = 0;
        }
        const newLeft = currentLeft + (GameConfig.enemy_ships.speed * GameConfig.enemy_ships.direction);
        enemy.style.left = `${newLeft}px`;

        // Check if any enemy hits the edge
        if (newLeft <= 0 || newLeft + enemy.offsetWidth >= enemyContainer.offsetWidth) {
            reverseDirection = true;
        }
    }

    // If any enemy hit the edge, reverse direction and descend all enemies
    if (reverseDirection) {
        GameConfig.enemy_ships.direction *= -1;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i] as HTMLElement; // Ensure the enemy is treated as an HTMLElement
            let currentTop = parseInt(enemy.style.top, 10);
            if(isNaN(currentTop)) {
                currentTop = 0;
            }
            enemy.style.top = `${currentTop + GameConfig.enemy_ships.descent}px`;
        }
    }
}