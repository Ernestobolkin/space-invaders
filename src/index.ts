const keysPressed: any = {};
import { enemy_shoot_bullet, shoot_bullet } from './controllers/BulletsController';
import { move_ship } from './controllers/shipController';
import { build_enemies, updateEnemyPositions } from './controllers/enemy_ships';
import '../style.css';


document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('main-body-container');
    const ship = document.getElementById('main-ship');
    if (!container || !ship) {
        return;
    }
    startGame(ship, container);
});


function startGame(ship: HTMLElement, container: HTMLElement) {
    let isGameEnded = false; //TODO finish end game logic

    //create enemies
    build_enemies()


    document.addEventListener('keydown', function (e) {
        keysPressed[e.keyCode] = true;
    });

    document.addEventListener('keyup', function (e) {
        keysPressed[e.keyCode] = false;
    });
    if(isGameEnded){
        console.log('game ended')
        cancelAnimationFrame(0);
    }

    if(!isGameEnded){
        requestAnimationFrame(function () {
            game_loop(ship, container);
        });
    }
    const newDateTest = new Date();
    const tt = new Date(new Date().setSeconds(newDateTest.getSeconds() + 5));
    if(tt > new Date()){
        isGameEnded = true;
    }
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

    updateEnemyPositions();
    // enemy_shoot_bullet(container);

    requestAnimationFrame(function () {
        game_loop(ship, container);
    });
}
