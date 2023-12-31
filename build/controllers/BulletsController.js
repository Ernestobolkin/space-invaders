import { GameConfig } from '../config.js';
let lastShotTime = 0;
export function shoot_bullet(ship, container) {
    const currentTime = Date.now();
    const shotCooldown = GameConfig.bullet_settings.shot_Cooldown;
    if (currentTime - lastShotTime < shotCooldown) {
        return;
    }
    const bullets = container.getElementsByClassName('bullet');
    const bulletCount = bullets.length;
    const bullet = document.createElement('div');
    bullet.className = 'bullet_one shadow bullet test_' + bulletCount;
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
        }
        else {
            bullet.remove(); // Remove the bullet once it's off-screen
        }
    }
    lastShotTime = currentTime;
    requestAnimationFrame(moveBullet);
}
