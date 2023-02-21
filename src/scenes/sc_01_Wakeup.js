import { k, SceneLoader, SIDE, MANUAL_ART_SCALE, ART_SIZE, TOPDOWN_VERT_SCALING, SCENE_WIDTH } from "./scene_globals"
import { all_scenes } from "./all_scenes"
import { sc_02_CarrotFarm } from "./sc_02_CarrotFarm"

import map_json from '../../TiledMaps/01_Wakeup.json' assert { type: "json" }

export let sc_01_Wakeup = new SceneLoader("01_Wakeup", map_json, () => {
    // will add the player in manually, nothing to do
})

all_scenes["sc_02_CarrotFarm"].load.then(() => {
    sc_01_Wakeup.addSceneChange({
        tileX: SCENE_WIDTH + .5,
        tileY: 2,
        appearOn: SIDE.LEFT,
        dest: sc_02_CarrotFarm,
        thisId: "1->2",
        destId: "2->1",
    })
})

export const initial_spawnpoint = k
    .vec2(6, 5)
    .scale(ART_SIZE)
    .scale(MANUAL_ART_SCALE)
    .scale(1, TOPDOWN_VERT_SCALING)

all_scenes["sc_01_Wakeup"].completeLoading()