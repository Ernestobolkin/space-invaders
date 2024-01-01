const keysPressed: any = {};
import { shoot_bullet } from './controllers/BulletsController';
import { move_ship } from './controllers/shipController';
import { build_enemies } from './controllers/enemy_ships';


document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('main-body-container');
    const ship = document.getElementById('main-ship');
    if (!container || !ship) {
        return;
    }
    startGame(ship, container);
});


function startGame(ship: HTMLElement, container: HTMLElement) {

    //create enemies
    build_enemies()

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
