import { Chapter, SET_CHAPTER } from "./chapters.js"
import { k } from "./kaboom_globals.js"
import { all_scenes_loaded } from "./scenes/all_scenes.js"


import { initial_spawnpoint, sc_01_Wakeup } from "./scenes/sc_01_Wakeup.js"

import { sc_02_CarrotFarm } from "./scenes/sc_02_CarrotFarm.js"
import { sc_03_PetraFarm } from "./scenes/sc_03_PetraFarm.js"
let debug_spawnpoint = k
    .vec2(3, 2)
    .scale(16)
    .scale(6)

all_scenes_loaded.then(() => {
    SET_CHAPTER(Chapter.CARROT_GATHERING)
    sc_01_Wakeup.go(initial_spawnpoint)

    // SET_CHAPTER(Chapter.CARROT_GATHERING)
    // sc_02_CarrotFarm.go(debug_spawnpoint)
    // SET_CHAPTER(Chapter.PETRA_GATHERING)
    // SET_CHAPTER(Chapter.TSOKA_ATTACK)
    // sc_03_PetraFarm.go(debug_spawnpoint)
})
