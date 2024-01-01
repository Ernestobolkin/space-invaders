export const GameConfig = {
    game_speed : 1000,
    bullet_settings:{
        default_speed : 10,
        shot_Cooldown : 200,
    },
    ship_container:{
        width: "65px",
        height: "51px",
    },
    bullet_one:{
        width: "9px",
        height: "27px",
        background_image_and_path: "url('assets/ships_sprite.png') no-repeat -187px -1235px"
    },
    main_ship : {
        id : 'main-ship',
        container_id : 'main-body-container',
        speed : 5,
        background_image_and_path: "url('assets/ships_sprite.png') no-repeat -31px -35px"
    },
    second_ship : {
        id : 'second-ship',
        container_id : 'main-body-container',
        speed : 5,
        background_image_and_path: "url('imgs/ships_sprite.png') no-repeat -63px -319px"
    },
}