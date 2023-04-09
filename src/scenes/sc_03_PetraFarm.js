import { k, SceneLoader, MANUAL_ART_SCALE, SIDE } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { sc_02_CarrotFarm } from "./sc_02_CarrotFarm.js"
import { UNITS } from "../kaboom_globals"
import { FARMERS_WIFE } from "../npc"
import { GET_CHAPTER } from "../chapters"

import map_json from '../../TiledMaps/03_PetraFarm.json' assert { type: "json" }

export let sc_03_PetraFarm = new SceneLoader("03_PetraFarm", map_json, () => {
    switch(GET_CHAPTER()){
        default:
            break;
    }

    k.addLevel([
        // Design the level layout with symbols
        "PPPPPPPP",
        "PPPPPPPP",
        "PPPPPPPP",
    ], {
        // The size of each grid
        width: UNITS,
        height: UNITS,
        // The position of the top left block
        pos: k.vec2(UNITS/2).add(k.vec2(2*UNITS, 3*UNITS)),
        // Define what each symbol means (in components)
        "P": () => [
            sprite("crop", {anim: "petra_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.PETRA),
        ],
    })
    FARMERS_WIFE.build(k.vec2(5, 1.5))
})

all_scenes["sc_02_CarrotFarm"].load.then(() => {
    sc_03_PetraFarm.addSceneChange({
        thisId: "3->2",
        tileX: -.5,
        tileY: 1,
        appearOn: SIDE.RIGHT,

        destId: "2->3",
        dest: sc_02_CarrotFarm,
    })
})

all_scenes["sc_03_PetraFarm"].completeLoading()