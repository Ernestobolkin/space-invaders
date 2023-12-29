document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('main-body-container');
    const ship = document.getElementById('main-ship');

    shipment_movement(ship, container)

    
});


function shipment_movement(ship, container){
    document.addEventListener('keydown', function(e) {
        const speed = GameConfig.main_ship.speed;
        const rect = ship.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        switch(e.keyCode) {
            case 37: // Left arrow
                if(rect.left > containerRect.left) {
                    ship.style.left = (ship.offsetLeft - speed) + 'px';
                }
                break;
            case 38: // Up arrow
                if(rect.top > containerRect.top) {
                    ship.style.top = (ship.offsetTop - speed) + 'px';
                }
                break;
            case 39: // Right arrow
                if(rect.right < containerRect.right) {
                    ship.style.left = (ship.offsetLeft + speed) + 'px';
                }
                break;
            case 40: // Down arrow
                if(rect.bottom < containerRect.bottom) {
                    ship.style.top = (ship.offsetTop + speed) + 'px';
                }
                break;
        }
    });
}


function initiate_ship(){
    //TODO fix this, the background image is not showing
    const container = document.getElementById('main-body-container');
    container.innerHTML = '<div id="ship-container"></div>';
    
    const ship_container = document.getElementById('ship-container');
    ship_container.style.width = GameConfig.ship_container.width;
    ship_container.style.height = GameConfig.ship_container.height;
    ship_container.innerHTML = '<div id="main-ship"></div>';

    const ship = document.getElementById('main-ship');
    const background_image_and_path = "";
    ship.style.background = background_image_and_path;
    ship.style.width = GameConfig.ship_container.width;
    ship.style.height = GameConfig.ship_container.height;
    //for testing 
    // ship.style.background = "url('assets/ships_sprite.png') no-repeat -31px -35px";
    ship.style.border = "1px solid red";
}