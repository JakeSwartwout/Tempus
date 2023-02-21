import { k, TILE_WIDTH } from "./kaboom_globals.js"
import { all_scenes_loaded } from "./scenes/all_scenes.js"


import { initial_spawnpoint, sc_01_Wakeup } from "./scenes/sc_01_Wakeup.js"

k.loadSprite("farmer", "sprites/npc_atlas.png", {
    sliceX: 4,
    sliceY: 4,
    width: TILE_WIDTH(4),
    height: TILE_WIDTH(1),
    anims: {
        "idle": {
            from: 0,
            to: 3,
            loop: true,
            speed: 6,
            // pingpong: true
        }
    }
})

all_scenes_loaded.then(() => {
    sc_01_Wakeup.go(initial_spawnpoint)
})