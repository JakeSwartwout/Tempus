import { player } from "../player.js"
import { enemy } from "../enemy.js"
import { k, ART_SIZE } from "./scene_globals.js"
import { MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING } from "../kaboom_globals.js"

k.scene("HelloWorld", () => {

    const background = k.addLevel([
        // Design the level layout with symbols
        "gggggg7889gg",
        "g789gg4556gg",
        "g45o88i5l3gg",
        "g4555555o89g",
        "g122k555556g",
        "gggg12kl223g",
        "gggggg46gggg",
        "gggggg13gggg",
    ], {
        // The size of each grid
        width: ART_SIZE * MANUAL_ART_SCALE,
        height: ART_SIZE * MANUAL_ART_SCALE,
        // The position of the top left block
        pos: vec2(0, 0),
        // Define what each symbol means (in components)
        "7": () => [sprite("grass_path_7"), scale(MANUAL_ART_SCALE)],
        "8": () => [sprite("grass_path_8"), scale(MANUAL_ART_SCALE)],
        "9": () => [sprite("grass_path_9"), scale(MANUAL_ART_SCALE)],
        "4": () => [sprite("grass_path_4"), scale(MANUAL_ART_SCALE)],
        "5": () => [sprite("grass_path_5"), scale(MANUAL_ART_SCALE)],
        "6": () => [sprite("grass_path_6"), scale(MANUAL_ART_SCALE)],
        "1": () => [sprite("grass_path_1"), scale(MANUAL_ART_SCALE)],
        "2": () => [sprite("grass_path_2"), scale(MANUAL_ART_SCALE)],
        "3": () => [sprite("grass_path_3"), scale(MANUAL_ART_SCALE)],

        "i": () => [sprite("grass_path_i"), scale(MANUAL_ART_SCALE)],
        "o": () => [sprite("grass_path_o"), scale(MANUAL_ART_SCALE)],
        "k": () => [sprite("grass_path_k"), scale(MANUAL_ART_SCALE)],
        "l": () => [sprite("grass_path_l"), scale(MANUAL_ART_SCALE)],

        "g": () => [sprite("grass"), scale(MANUAL_ART_SCALE)],
    })

    const level = k.addLevel([
        // Design the level layout with symbols
        "            ",
        "       @    ",
        "            ",
        "            ",
        "         X  ",
        "            ",
        "            ",
        "            ",
    ], {
        // The size of each grid
        width: ART_SIZE*MANUAL_ART_SCALE,
        height: ART_SIZE*MANUAL_ART_SCALE,
        // The position of the top left block
        pos: vec2(ART_SIZE/2*MANUAL_ART_SCALE),
        // Define what each symbol means (in components)
        "@": () => [
            sprite("player_facing"),
            scale(MANUAL_ART_SCALE),
            area({width: 8, height: 10, offset: k.vec2(0, 4*MANUAL_ART_SCALE)}), // collision checking
            // body(), // gravity
            solid(), // collision stopping
            origin("center"),
            player(),
            // "player",
        ],
        "X": () => [
            // sprite("player_facing"),
            sprite("enemy_idle", {anim: "idle_right", }),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            enemy(),
            // "enemy",
        ]
    })
})