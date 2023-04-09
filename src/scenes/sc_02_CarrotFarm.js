import { k, SceneLoader, MANUAL_ART_SCALE, ART_SIZE, SIDE, SCENE_WIDTH } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { FARMER } from "../npc.js"
import { Q_GATHER_5_CARROTS } from "../Quests/Quests_Farmer"
import { all_scenes } from "./all_scenes"
import { sc_01_Wakeup } from "./sc_01_Wakeup"
import { sc_03_PetraFarm } from "./sc_03_PetraFarm"
import { Chapter, GET_CHAPTER } from "../chapters"

import map_json from '../../TiledMaps/02_CarrotFarm.json' assert { type: "json" }

export let sc_02_CarrotFarm = new SceneLoader("02_CarrotFarm", map_json, () => {
    switch(GET_CHAPTER()){
        case Chapter.CARROT_GATHERING:
            carrot_design = [
                // Design the level layout with symbols
                "     C      ",
                "            ",
                "            ",
                "            ",
                "            ",
                "          C ",
                " CCCCCCCCCC ",
                " CCCCCCCCCC ",
                "  CCCCCCCC  ",
            ]
            break;
        default:
            carrot_design = [
                // Design the level layout with symbols
                "     c      ",
                "            ",
                "            ",
                "            ",
                "            ",
                "          C ",
                " cCcccccCcC ",
                " CccCCCcCcc ",
                "  cCcccCcC  ",
            ]
            break;
    }

    k.addLevel(
        carrot_design,
    {
        // The size of each grid
        width: ART_SIZE*MANUAL_ART_SCALE,
        height: ART_SIZE*MANUAL_ART_SCALE*.75, // look better squished
        // The position of the top left block
        pos: k.vec2(ART_SIZE/2*MANUAL_ART_SCALE),
        // Define what each symbol means (in components)
        "C": () => [
            sprite("crop", {anim: "carrot_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.CARROT),
        ],
        "c": () => [
            sprite("crop", {anim: "carrot_picked"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            // solid(),
            origin("center"),
            crop(CROPS.CARROT, true),
        ],
    })
    FARMER.build(k.vec2(5, 1.5))
})

all_scenes["sc_01_Wakeup"].load.then(() => {
    sc_02_CarrotFarm.addSceneChange({
        thisId: "2->1",
        tileX: -.5,
        tileY: 2,
        appearOn: SIDE.RIGHT,

        destId: "1->2",
        dest: sc_01_Wakeup
    })
})

all_scenes["sc_03_PetraFarm"].load.then(() => {
    sc_02_CarrotFarm.addSceneChange({
        thisId: "2->3",
        tileX: SCENE_WIDTH + .5,
        tileY: 1,
        appearOn: SIDE.LEFT,

        destId: "3->2",
        dest: sc_03_PetraFarm,
        unlockBy: FARMER.onComplete(Q_GATHER_5_CARROTS)
    })
})

all_scenes["sc_02_CarrotFarm"].completeLoading()