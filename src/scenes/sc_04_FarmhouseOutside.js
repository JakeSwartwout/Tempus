import { UNITS } from "../kaboom_globals"
import { SceneLoader, SIDE, SCENE_HEIGHT, k } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"
import { FARMERS_WIFE } from "../Entities/Npc"
import { Chapter, MINIMUM_CHAPTER } from "../Story/chapters"

// TODO: import the files with the sprites I need

import map_json from '../../TiledMaps/04_FarmhouseOutside.json' assert { type: "json" }
import { SL, SceneLocker } from "./SceneLocker"
import { Q_GATHER_7_PETRAS } from "../Quests/Quests_FarmersWife"


let sc_04_FarmhouseOutside = new SceneLoader("04_FarmhouseOutside", map_json, () => {
    MINIMUM_CHAPTER(Chapter.FARMHOUSE_DINNER)

    // all the art is in the tiled map
}, (chapter) => {
    return k.vec2(6, SCENE_HEIGHT -1).scale(UNITS)
})

all_scenes["03_PetraFarm"].load.then((l_sc_03_PetraFarm) => {
    sc_04_FarmhouseOutside.addSceneChange({
        thisId: "4->3",
        tileX: 6,
        tileY: SCENE_HEIGHT+.5,
        appear_on: SIDE.UP,

        destId: "3->4",
        dest: l_sc_03_PetraFarm,
    })
})

all_scenes["05_FarmhouseInside"].load.then((l_sc_05_FarmhouseInside) => {
    sc_04_FarmhouseOutside.addSceneChange({
        thisId: "entrance",
        tileX: 5.5,
        tileY: 4.25,
        appear_on: SIDE.DOWN,

        destId: "exit",
        dest: l_sc_05_FarmhouseInside,
        locking: new SceneLocker(SL.LOCKED)
            .unlockBy(FARMERS_WIFE.onComplete(Q_GATHER_7_PETRAS))
            .lockAtChapter(Chapter.TSOKA_ATTACK)
    })
})

DONE_LOADING_SCENE(sc_04_FarmhouseOutside)