import { k, ART_SIZE, MANUAL_ART_SCALE } from "../kaboom_globals"

// // In the TiledMaps folder, create projects that are:
// // * Saved in the .json format
// // * reference tile images in the TiledMaps/TileArt folder
// // * have these same images duplicated to the www/TileArt folder
// // * Have their tilesets embedded (can convert existing set into embedded, then just "change" the img src to get it to appear)
// // * have their orientation set to: "orthogonal"
// // * Have their render order set to: "right-down"
// // * Don't have spacing/gaps between the sprite images


// let load_tiled_levels = function(map_json) {
//     // loading the map is asynch, so need a promise
//     return new Promise((resolve) => {
//         // load in the given map using tiled-kaboom module
//         k.loadTiledMap(map_json).then(({ sprites, levels, key }) => {
//             // the symbols only contain the sprite, but we need to scale them
//             level_symbols = {}
//             for (let symb in key) {
//                 level_symbols[symb] = () => {
//                     // call the function to get the old list
//                     compLst = key[symb]()
//                     // add the scaling component
//                     compLst.push(k.scale(MANUAL_ART_SCALE))
//                     // the new function will return the updated list
//                     return compLst
//                 }
//             }
//             // what we need to do when adding a new kaboom scene
//             let add_tiled_levels = function() {
//                 // layer the levels on top of each other
//                 for (let design of levels) {
//                     let level = k.addLevel(design, {
//                         // The size of each grid
//                         width: ART_SIZE*MANUAL_ART_SCALE,
//                         height: ART_SIZE*MANUAL_ART_SCALE,
//                         ...level_symbols
//                     })
//                 }
//             }
//             // let it know that we're done
//             resolve(add_tiled_levels)
//         }
//         // if there's error, just let it chain upwards
//         )
//     })
// }


// export { load_tiled_scene }
// Usage:
// Import the map, call load_tiled_scene on its json,
// Then use the function it promised to add the map to a scene

import map_json from '../../TiledMaps/HelloTiled.json' assert { type: "json" }
import { SceneLoader } from "./scene_globals"

// let sc_ld_HelloTiled = 

// export let scHelloTiled = {
//     load() {
//         return new Promise((resolve, reject) => {
//             load_tiled_scene(map_json).then((add_tiled_levels) => {
//                 k.scene("HelloTiled", () => {
//                     add_tiled_levels()
        
//                     // add other info to the scene
//                 })
//             })
//             resolve()
//         })
//     }

//     go() {
//         load().then()
//     }
// }

export let sc_HelloTiled = new SceneLoader("HelloTiled", map_json)