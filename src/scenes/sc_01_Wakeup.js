import { UNITS } from "../kaboom_globals"
import { k, SceneLoader, SIDE, SCENE_WIDTH } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"

import map_json from '../../TiledMaps/01_Wakeup.json' assert { type: "json" }

export let sc_01_Wakeup = new SceneLoader("01_Wakeup", map_json, () => {
    // will add the player in manually, nothing to do

    // TODO: add some trees
}, (chapter) => {
    return k.vec2(6, 4).scale(UNITS)
})

all_scenes["02_CarrotFarm"].load.then((l_sc_02_CarrotFarm) => {
    sc_01_Wakeup.addSceneChange({
        thisId: "1->2",
        tileX: SCENE_WIDTH + .5,
        tileY: 2,
        appear_on: SIDE.LEFT,

        destId: "2->1",
        dest: l_sc_02_CarrotFarm,
    })
})

DONE_LOADING_SCENE(sc_01_Wakeup)