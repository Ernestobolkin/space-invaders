const keysPressed: any = {};
let lastShotTime = 0;
import { GameConfig } from './config';
import { move_ship } from './controllers/shipController';


document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('main-body-container');
    const ship = document.getElementById('main-ship');
    if (!container || !ship) {
        return;
    }
    startGame(ship, container);
});


function startGame(ship: HTMLElement, container: HTMLElement) {
    document.addEventListener('keydown', function (e) {
        keysPressed[e.keyCode] = true;
    });

    document.addEventListener('keyup', function (e) {
        keysPressed[e.keyCode] = false;
    });

    requestAnimationFrame(function () {
        game_loop(ship, container);
    });
}


function game_loop(ship: HTMLElement, container: HTMLElement) {
    if (keysPressed[37]) { // Left arrow
        move_ship(ship, 'left');
    }
    if (keysPressed[39]) { // Right arrow
        move_ship(ship, 'right');
    }
    if (keysPressed[32]) { // Spacebar
        shoot_bullet(ship, container)
    }

    requestAnimationFrame(function () {
        game_loop(ship, container);
    });
}


function shoot_bullet(ship: HTMLElement, container: HTMLElement) {
    const currentTime = Date.now();
    const shotCooldown = GameConfig.bullet_settings.shot_Cooldown;
    if (currentTime - lastShotTime < shotCooldown) {
        return;
    }
    const bullet = document.createElement('div');
    bullet.className = 'bullet_one';
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