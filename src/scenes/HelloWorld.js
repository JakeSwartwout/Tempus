import { player } from "../player.js"
import { enemy } from "../enemy.js"
import { k, ART_SIZE } from "./scene_globals.js"
import { TOPDOWN_VERT_SCALING } from "../kaboom_globals.js"

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
        width: ART_SIZE,
        height: ART_SIZE,
        // The position of the top left block
        pos: vec2(0, 0),
        // Define what each symbol means (in components)
        "7": () => [sprite("grass_path_7")],
        "8": () => [sprite("grass_path_8")],
        "9": () => [sprite("grass_path_9")],
        "4": () => [sprite("grass_path_4")],
        "5": () => [sprite("grass_path_5")],
        "6": () => [sprite("grass_path_6")],
        "1": () => [sprite("grass_path_1")],
        "2": () => [sprite("grass_path_2")],
        "3": () => [sprite("grass_path_3")],

        "i": () => [sprite("grass_path_i")],
        "o": () => [sprite("grass_path_o")],
        "k": () => [sprite("grass_path_k")],
        "l": () => [sprite("grass_path_l")],

        "g": () => [sprite("grass")],
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
        width: ART_SIZE,
        height: ART_SIZE,
        // The position of the top left block
        pos: vec2(ART_SIZE/2),
        // Define what each symbol means (in components)
        "@": () => [
            sprite("player_facing"),
            area({width: 8, height: 10, offset: k.vec2(0, 4)}), // collision checking
            // body(), // gravity
            solid(), // collision stopping
            origin("center"),
            player(),
            // "player",
        ],
        "X": () => [
            // sprite("player_facing"),
            sprite("enemy_idle", {anim: "idle_right", }),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5)}),
            // solid(),
            origin("center"),
            enemy(),
            // "enemy",
        ]
    })
})