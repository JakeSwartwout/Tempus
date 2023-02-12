import { player } from "../player.js"
import { k, ART_SIZE } from "./scene_globals.js"
import { MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING } from "../kaboom_globals.js"
import { crop, CROPS } from "../crops.js"


k.scene("Farm", () => {

    const background = k.addLevel([
        // Design the level layout with symbols
        "gggggggggggg",
        "gg78888889gg",
        "gg45555556gg",
        "gg45555556gg",
        "gg45555556gg",
        "gg12222223gg",
        "gggggggggggg",
    ], {
        // The size of each grid
        width: ART_SIZE * MANUAL_ART_SCALE,
        height: ART_SIZE * MANUAL_ART_SCALE,
        // The position of the top left block
        pos: vec2(0, 0),
        // Define what each symbol means (in components)
        "7": () => [sprite("grass_farm_7"), scale(MANUAL_ART_SCALE)],
        "8": () => [sprite("grass_farm_8"), scale(MANUAL_ART_SCALE)],
        "9": () => [sprite("grass_farm_9"), scale(MANUAL_ART_SCALE)],
        "4": () => [sprite("grass_farm_4"), scale(MANUAL_ART_SCALE)],
        "5": () => [sprite("grass_farm_5"), scale(MANUAL_ART_SCALE)],
        "6": () => [sprite("grass_farm_6"), scale(MANUAL_ART_SCALE)],
        "1": () => [sprite("grass_farm_1"), scale(MANUAL_ART_SCALE)],
        "2": () => [sprite("grass_farm_2"), scale(MANUAL_ART_SCALE)],
        "3": () => [sprite("grass_farm_3"), scale(MANUAL_ART_SCALE)],

        "i": () => [sprite("grass_farm_i"), scale(MANUAL_ART_SCALE)],
        "o": () => [sprite("grass_farm_o"), scale(MANUAL_ART_SCALE)],
        "k": () => [sprite("grass_farm_k"), scale(MANUAL_ART_SCALE)],
        "l": () => [sprite("grass_farm_l"), scale(MANUAL_ART_SCALE)],

        "g": () => [sprite("grass"), scale(MANUAL_ART_SCALE)],
    })

    const level = k.addLevel([
        // Design the level layout with symbols
        "            ",
        "            ",
        "            ",
        "    @ pcst  ",
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
        "p": () => [
            sprite("crop", {anim: "petra_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.PETRA),
        ],
        "s": () => [
            sprite("crop", {anim: "sluck_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.SLUCK),
        ],
        "c": () => [
            sprite("crop", {anim: "carrot_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.CARROT),
        ],
        "t": () => [
            sprite("crop", {anim: "tomato_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.TOMATO),
        ],
    })
})