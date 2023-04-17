import { UNITS } from "../kaboom_globals"
import { k, SceneLoader, MANUAL_ART_SCALE, SIDE, SCENE_WIDTH } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"
import { crop, CROPS } from "../Entities/crops"
import { FARMER } from "../Entities/Npc.js"
import { Q_GATHER_5_CARROTS } from "../Quests/Quests_Farmer"
import { Chapter, GET_CHAPTER, SET_CHAPTER } from "../Story/chapters"

import map_json from '../../TiledMaps/02_CarrotFarm.json' assert { type: "json" }

let sc_02_CarrotFarm = new SceneLoader("02_CarrotFarm", map_json, () => {
    let chapter = GET_CHAPTER()
    switch(chapter){
        case Chapter.WAKEUP:
            SET_CHAPTER(Chapter.CARROT_GATHERING)
        case Chapter.CARROT_GATHERING:
            carrot_design = [
                // Design the level layout with symbols
                "    CCCCCC",
                "CCCCCCCCCC",
                "CCCCCCCCCC",
            ]
            break;
        default:
            carrot_design = [
                // Design the level layout with symbols
                "    CccCcC",
                "cCcCcccCcC",
                "cCCccCCcCC",
            ]
            break;
    }

    k.addLevel(
        carrot_design,
    {
        // The size of each grid
        width: UNITS,
        height: UNITS*.75, // look better squished
        // The position of the top left block
        pos: k.vec2(UNITS/2).add(k.vec2(1, 3.65).scale(UNITS)),
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
    FARMER.build(k.vec2(7, 1.5))
}, (chapter) => {
    switch(chapter) {
        case Chapter.WAKEUP:
        case Chapter.CARROT_GATHERING:
            return k.vec2(.5, 2).scale(UNITS)
        default:
            return k.vec2(SCENE_WIDTH -.5, 2).scale(UNITS)
    }
})

all_scenes["01_Wakeup"].load.then((l_sc_01_Wakeup) => {
    sc_02_CarrotFarm.addSceneChange({
        thisId: "2->1",
        tileX: -.5,
        tileY: 2,
        appear_on: SIDE.RIGHT,

        destId: "1->2",
        dest: l_sc_01_Wakeup,
    })
})

all_scenes["03_PetraFarm"].load.then((l_sc_03_PetraFarm) => {
    sc_02_CarrotFarm.addSceneChange({
        thisId: "2->3",
        tileX: SCENE_WIDTH + .5,
        tileY: 1,
        appear_on: SIDE.LEFT,

        destId: "3->2",
        dest: l_sc_03_PetraFarm,
        unlockBy: FARMER.onComplete(Q_GATHER_5_CARROTS)
    })
})

DONE_LOADING_SCENE(sc_02_CarrotFarm)