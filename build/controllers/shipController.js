import { GameConfig } from '../config.js';
export function move_ship(ship, direction) {
    const rect = ship.getBoundingClientRect();
    const containerRect = ship.parentElement.getBoundingClientRect();
    const shipSpeed = GameConfig.main_ship.speed;
    if (direction === 'left' && rect.left > containerRect.left) {
        ship.style.left = (ship.offsetLeft - shipSpeed) + 'px';
    }
    else if (direction === 'right' && rect.right < containerRect.right) {
        ship.style.left = (ship.offsetLeft + shipSpeed) + 'px';
    }
}
