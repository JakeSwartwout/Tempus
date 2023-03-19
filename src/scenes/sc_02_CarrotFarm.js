import { k, SceneLoader, MANUAL_ART_SCALE, ART_SIZE, TOPDOWN_VERT_SCALING, SIDE } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { sc_01_Wakeup } from "./sc_01_Wakeup"
import { FARMER } from "../npc.js"

import map_json from '../../TiledMaps/02_CarrotFarm.json' assert { type: "json" }

export let sc_02_CarrotFarm = new SceneLoader("02_CarrotFarm", map_json, () => {
    k.addLevel([
        // Design the level layout with symbols
        "     C      ",
        "            ",
        "     F      ",
        "            ",
        "            ",
        "          C ",
        " CCCCCCCCCC ",
        " CCCCCCCCCC ",
        "  CCCCCCCC  ",
        "            ",
    ], {
        // The size of each grid
        width: ART_SIZE*MANUAL_ART_SCALE,
        height: ART_SIZE*MANUAL_ART_SCALE*TOPDOWN_VERT_SCALING,
        // The position of the top left block
        pos: k.vec2(ART_SIZE/2*MANUAL_ART_SCALE),
        // Define what each symbol means (in components)
        "C": () => [
            sprite("crop", {anim: "carrot_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11 * TOPDOWN_VERT_SCALING, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.CARROT),
        ],
        "F": (position) => FARMER.build(position)
    })
})

all_scenes["sc_01_Wakeup"].load.then(() => {
    sc_02_CarrotFarm.addSceneChange({
        tileX: -.5,
        tileY: 2,
        appearOn: SIDE.RIGHT,
        dest: sc_01_Wakeup,
        thisId: "2->1",
        destId: "1->2",
    })
})

all_scenes["sc_02_CarrotFarm"].completeLoading()