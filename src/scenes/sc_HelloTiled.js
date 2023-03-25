import { k, SceneLoader, MANUAL_ART_SCALE, ART_SIZE } from "./scene_globals"
import { player } from "../player"
import { crop, CROPS } from "../crops"

import map_json from '../../TiledMaps/HelloTiled.json' assert { type: "json" }
import { enemy } from "../enemy"

export let sc_HelloTiled = new SceneLoader("HelloTiled", map_json, () => {
    k.addLevel([
        // Design the level layout with symbols
        "            ",
        "            ",
        "    @       ",
        "      pcst  ",
        "    f       ",
        "         X  ",
        "            ",
    ], {
        // The size of each grid
        width: ART_SIZE*MANUAL_ART_SCALE,
        height: ART_SIZE*MANUAL_ART_SCALE,
        // The position of the top left block
        pos: vec2(ART_SIZE/2*MANUAL_ART_SCALE),
        // Define what each symbol means (in components)
        "@": () => [
            sprite("player"),
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
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.PETRA),
        ],
        "s": () => [
            sprite("crop", {anim: "sluck_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.SLUCK),
        ],
        "c": () => [
            sprite("crop", {anim: "carrot_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.CARROT),
        ],
        "t": () => [
            sprite("crop", {anim: "tomato_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.TOMATO),
        ],
        "f": () => [
            sprite("farmer", {anim: "idle"}),
            scale(MANUAL_ART_SCALE),
            area(),
            origin("center"),
        ],
        "X": () => [
            sprite("enemy", {anim: "idle"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            enemy(),
            // "enemy",
        ]
    })
})