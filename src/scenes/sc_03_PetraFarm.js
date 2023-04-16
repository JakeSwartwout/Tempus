import { k, SceneLoader, MANUAL_ART_SCALE, SIDE } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { sc_02_CarrotFarm } from "./sc_02_CarrotFarm.js"
import { UNITS } from "../kaboom_globals"
import { FARMERS_WIFE } from "../npc"
import { enemy } from "../enemy"
import { Chapter, GET_CHAPTER } from "../chapters"
import { sc_04_Farmhouse } from "./sc_04_Farmhouse"
import { Q_GATHER_7_PETRAS } from "../Quests/Quests_FarmersWife"

import map_json from '../../TiledMaps/03_PetraFarm.json' assert { type: "json" }


export let sc_03_PetraFarm = new SceneLoader("03_PetraFarm", map_json, () => {
    let add_tsokas = false
    let petra_design = []
    switch(GET_CHAPTER()){
        case Chapter.PETRA_GATHERING:
            petra_design = [
                // Design the level layout with symbols
                "PPPPPPPP",
                "PPPPPPPP",
                "PPPPPPPP",
            ]
            break;
        case Chapter.TSOKA_ATTACK:
            add_tsokas = true
        case Chapter.FARMHOUSE_DINNER:
            petra_design = [
                "ppPPPppp",
                "pPPPppPP",
                "PPpPPPpP",
            ]
            break;
        default:
            petra_design = [
                "pppppppp",
                "pppppppp",
                "pppppppp",
            ]
            break;
    }

    k.addLevel(petra_design, {
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
            origin("center"),
            crop(CROPS.PETRA),
        ],
        "p": () => [
            sprite("crop", {anim: "petra_picked"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            origin("center"),
            crop(CROPS.PETRA, true),
        ],
    })

    if (add_tsokas) {
        k.addLevel([
            " T    TT",
            " T  T  T",
            "   T TT ",
        ], {
            width: UNITS,
            height: UNITS,
            // The position of the top left block
            pos: k.vec2(UNITS/2).add(k.vec2(2*UNITS, 3*UNITS)),
            // The components
            "T": () => [
                "tsoka",
                sprite("enemy", {anim: "idle"}),
                scale(MANUAL_ART_SCALE),
                area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
                origin("center"),
                enemy(),
            ]
        })
        FARMERS_WIFE.build(k.vec2(5, 0.5))
    } else {
        FARMERS_WIFE.build(k.vec2(5, 1.5))
    }
})

all_scenes["sc_02_CarrotFarm"].load.then(() => {
    sc_03_PetraFarm.addSceneChange({
        thisId: "3->2",
        tileX: -.5,
        tileY: 1,
        appear_on: SIDE.RIGHT,

        destId: "2->3",
        dest: sc_02_CarrotFarm,
    })
})

all_scenes["sc_04_Farmhouse"].load.then(() => {
    sc_03_PetraFarm.addSceneChange({
        thisId: "3->4",
        tileX: 6,
        tileY: -.5,
        appear_on: SIDE.DOWN,

        destId: "4->3",
        dest: sc_04_Farmhouse,
        unlockBy: FARMERS_WIFE.onComplete(Q_GATHER_7_PETRAS)
    })
})

all_scenes["sc_03_PetraFarm"].completeLoading()