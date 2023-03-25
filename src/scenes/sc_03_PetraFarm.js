import { k, SceneLoader, MANUAL_ART_SCALE, ART_SIZE, SIDE } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { sc_02_CarrotFarm } from "./sc_02_CarrotFarm.js"
// import { FARMER } from "../npc.js"
// import { Q_GATHER_5_CARROTS } from "../Quests/Quests_Farmer"

import map_json from '../../TiledMaps/03_PetraFarm.json' assert { type: "json" }
import { UNITS } from "../kaboom_globals"
import { FARMERS_WIFE } from "../npc"

export let sc_03_PetraFarm = new SceneLoader("03_PetraFarm", map_json, () => {
    k.addLevel([
        // Design the level layout with symbols
        "PPPPPPPP",
        "PPPPPPPP",
        "PPPPPPPP",
    ], {
        // The size of each grid
        width: ART_SIZE*MANUAL_ART_SCALE,
        height: ART_SIZE*MANUAL_ART_SCALE,
        // The position of the top left block
        pos: k.vec2(ART_SIZE/2*MANUAL_ART_SCALE).add(k.vec2(2*UNITS, 3*UNITS)),
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