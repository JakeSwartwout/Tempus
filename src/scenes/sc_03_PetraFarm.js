import { UNITS } from "../kaboom_globals"
import { k, SceneLoader, MANUAL_ART_SCALE, SIDE } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"
import { crop, CROPS } from "../Entities/crops"
import { enemy } from "../Entities/enemy"
import { FARMERS_WIFE } from "../Entities/Npc"
import { Chapter, GET_CHAPTER } from "../Story/chapters"
import { Q_GATHER_7_PETRAS, Quests_FarmersWife } from "../Quests/Quests_FarmersWife"
import { Q_SCARE_AWAY_TSOKAS, Quests_TsokaScaring } from "../Quests/Quests_TsokaScaring"

import map_json from '../../TiledMaps/03_PetraFarm.json' assert { type: "json" }


let sc_03_PetraFarm = new SceneLoader("03_PetraFarm", map_json, () => {
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
        FARMERS_WIFE.ensureQuest(Q_SCARE_AWAY_TSOKAS, new Quests_TsokaScaring())
    } else {
        FARMERS_WIFE.build(k.vec2(5, 1.5))
        FARMERS_WIFE.ensureQuest(Q_GATHER_7_PETRAS, new Quests_FarmersWife())
    }
}, (chapter) => {
    switch(chapter) {
        case Chapter.WAKEUP:
        case Chapter.CARROT_GATHERING:
        case Chapter.PETRA_GATHERING:
            return k.vec2(.5, 1).scale(UNITS)
        case Chapter.FARMHOUSE_DINNER:
        case Chapter.TSOKA_ATTACK:
            return k.vec2(6, .5).scale(UNITS)
        default:
            return k.vec2(SCENE_WIDTH -.5, 1).scale(UNITS)
    }
})

all_scenes["02_CarrotFarm"].load.then((l_sc_02_CarrotFarm) => {
    sc_03_PetraFarm.addSceneChange({
        thisId: "3->2",
        tileX: -.5,
        tileY: 1,
        appear_on: SIDE.RIGHT,

        destId: "2->3",
        dest: l_sc_02_CarrotFarm,
    })
})

all_scenes["04_Farmhouse"].load.then((l_sc_04_Farmhouse) => {
    sc_03_PetraFarm.addSceneChange({
        thisId: "3->4",
        tileX: 6,
        tileY: -.5,
        appear_on: SIDE.DOWN,

        destId: "4->3",
        dest: l_sc_04_Farmhouse,
        unlockBy: FARMERS_WIFE.onComplete(Q_GATHER_7_PETRAS)
    })
})

DONE_LOADING_SCENE(sc_03_PetraFarm)