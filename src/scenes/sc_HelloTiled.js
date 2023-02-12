import { k, SceneLoader, MANUAL_ART_SCALE, ART_SIZE, TOPDOWN_VERT_SCALING } from "./scene_globals"
import { player } from "../player"
import { crop, CROPS } from "../crops"

import map_json from '../../TiledMaps/HelloTiled.json' assert { type: "json" }

export let sc_HelloTiled = new SceneLoader("HelloTiled", map_json, () => {
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
        height: ART_SIZE*MANUAL_ART_SCALE*TOPDOWN_VERT_SCALING,
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