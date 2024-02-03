import { GameConfig } from "../../config";
let lastShotTime = 0;

export function shoot_bullet(ship: HTMLElement, container: HTMLElement) {
    const currentTime = Date.now();
    const shotCooldown = GameConfig.bullet_settings.shot_Cooldown;
    if (currentTime - lastShotTime < shotCooldown) {
        return;
    }
    const bullets = container.getElementsByClassName('bullet');
    const bulletCount = bullets.length;
    const bullet = document.createElement('div');
    bullet.className = 'bullet_one shadow bullet ' + bulletCount;
    container.appendChild(bullet);

    const shipRect = ship.getBoundingClientRect();
    bullet.style.position = 'absolute';
    bullet.style.left = (shipRect.left + shipRect.width / 2 - 4.5) + 'px';
    bullet.style.top = shipRect.top - 27 + 'px';

    const bulletSpeed = GameConfig.bullet_settings.default_speed;
    function moveBullet() {
        const currentTop = parseInt(bullet.style.top, 10);
        if (currentTop + bullet.offsetHeight > 0) {
            bullet.style.top = (currentTop - bulletSpeed) + 'px';
            requestAnimationFrame(moveBullet);
        } else {
            bullet.remove(); // Remove the bullet once it's off-screen
        }
    }
    lastShotTime = currentTime;
    requestAnimationFrame(moveBullet);
}

function getFrontRow(enemies: HTMLElement[], cols: number): HTMLElement[] {
    const frontRow: HTMLElement[] = new Array(cols).fill(null);
    enemies.forEach(enemy => {
        const left = parseInt(enemy.style.left, 10);
        const top = parseInt(enemy.style.top, 10);
        const colIndex = Math.floor(left / (38 + 4 + GameConfig.enemy_ships.space_between));

        if (!frontRow[colIndex] || parseInt(frontRow[colIndex].style.top, 10) < top) {
            frontRow[colIndex] = enemy;
        }
    });
    return frontRow.filter(e => e);  // Remove empty spots
}

// Call this function whenever you need to decide which enemy shoots
export function enemy_shoot_bullet(container: HTMLElement) {
    let lastShotTime = 0;
    const currentTime = Date.now();
    const shotCooldown = 300000;
    if (currentTime - lastShotTime < shotCooldown) {
        return;
    }
    const enemies = Array.from(document.getElementsByClassName('enemy-ship')) as HTMLElement[];
    const frontRow = getFrontRow(enemies, GameConfig.enemy_ships.group_size);

    // Logic to make a random front-row enemy shoot
    if (frontRow.length > 0) {
        const shooterIndex = Math.floor(Math.random() * frontRow.length);
        const shooter = frontRow[shooterIndex];
        // Implement shooting logic here, using shooter's position
        enemy_shoot(shooter, container)
    }
    lastShotTime = currentTime;
}


function enemy_shoot(shooter: HTMLElement, container: HTMLElement) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = shooter.style.left; // Start at the shooter's X position
    bullet.style.top = shooter.style.top; // Start at the shooter's Y position
    container.appendChild(bullet);

    // Animate the bullet moving downwards
    const moveBullet = () => {
        const currentTop = parseInt(bullet.style.top, 10);
        bullet.style.top = `${currentTop + 5}px`; // Move 5px down each frame
        if (currentTop < window.innerHeight) {
            requestAnimationFrame(moveBullet);
        } else {
            bullet.remove(); // Remove the bullet once it's off-screen
        }
    };
    requestAnimationFrame(moveBullet);
}