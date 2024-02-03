import { GameConfig } from '../config.js';
export function build_enemies() {
    const enemyContainer = document.getElementById('enemy-container');
    if (!enemyContainer) {
        return;
    }
    const matrixSize = GameConfig.enemy_ships.group_size;
    const matrixRows = GameConfig.enemy_ships.group_rows;
    const extraSpace = GameConfig.enemy_ships.space_between;
    for (let i = 0; i < matrixRows; i++) {
        for (let j = 0; j < matrixSize; j++) {
            const enemy = document.createElement('div');
            enemy.className = 'enemy-ship shadow es-1 en' + i;
            enemy.style.left = `${j * (38 + 4 + extraSpace)}px`; // from css
            enemy.style.top = `${i * (38 + 4 + extraSpace)}px`; // from css
            enemyContainer.appendChild(enemy);
        }
    }
}
export function updateEnemyPositions() {
    let shipSpeed = GameConfig.enemy_ships.speed;
    const enemiesCount = document.getElementsByClassName('enemy-ship').length;
    const enemyContainer = document.getElementById('enemy-container');
    if (!enemyContainer) {
        return;
    }
    const enemies = enemyContainer.getElementsByClassName('enemy-ship');
    let reverseDirection = false;
    // Update the position of each enemy
    for (let i = 0; i < enemies.length; i++) {
        // Ensure the enemy is treated as an HTMLElement
        const enemy = enemies[i];
        const boundaries = enemy.getBoundingClientRect();
        // changeEnemyPosition(enemy, enemyLocations);
        let currentLeft = parseInt(enemy.style.left, 10);
        if (isNaN(currentLeft)) {
            currentLeft = 0;
        }
        const newLeft = currentLeft + (shipSpeed * GameConfig.enemy_ships.direction);
        enemy.style.left = `${newLeft}px`;
        // Check if any enemy hits the edge
        if (newLeft <= 0 || newLeft + enemy.offsetWidth >= enemyContainer.offsetWidth) {
            reverseDirection = true;
        }
    }
    // If any enemy hit the edge, reverse direction and descend all enemies
    if (reverseDirection) {
        console.log("a");
        GameConfig.enemy_ships.direction *= -1;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i]; // Ensure the enemy is treated as an HTMLElement
            let currentTop = parseInt(enemy.style.top, 10);
            if (isNaN(currentTop)) {
                currentTop = 0;
            }
            enemy.style.top = `${currentTop + GameConfig.enemy_ships.descent}px`;
        }
    }
    const bullets = document.getElementsByClassName('bullet');
    for (let i = 0; i < bullets.length; i++) {
        let isBulletCollided = false;
        const bullet = bullets[i];
        for (let j = 0; j < enemies.length; j++) {
            const enemy = enemies[j];
            if (bulletCollision(bullet, enemy)) {
                isBulletCollided = true;
                ship_explosion(enemy);
                bullet.remove();
                break;
            }
        }
    }
    const initialEnemyCount = GameConfig.enemy_ships.group_size * GameConfig.enemy_ships.group_rows;
    const enemiesDestroyed = initialEnemyCount - enemiesCount;
    const speedIncrease = Math.floor(enemiesDestroyed / 3);
    shipSpeed += speedIncrease * GameConfig.enemy_ships.add_speed_on_descent;
}
function bulletCollision(bullet, enemy) {
    const bulletBoundaries = bullet.getBoundingClientRect();
    const enemyBoundaries = enemy.getBoundingClientRect();
    return (bulletBoundaries.left <= enemyBoundaries.left + enemyBoundaries.width &&
        bulletBoundaries.left + bulletBoundaries.width >= enemyBoundaries.left &&
        bulletBoundaries.top <= enemyBoundaries.top + enemyBoundaries.height &&
        bulletBoundaries.top + bulletBoundaries.height >= enemyBoundaries.top);
}
function ship_explosion(ship) {
    //add explosion css class to the div classes
    ship.style.backgroundImage = "url('assets/explosion.png')";
    ship.className = 'explosion';
    setTimeout(function () {
        ship.remove();
    }, 300);
}
