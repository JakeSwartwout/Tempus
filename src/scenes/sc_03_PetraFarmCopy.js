
// THIS IS JUST A COPY FOR TESTING
// this should be part of scene 3
// but I want to plan out where the Tsokas will go
// and give the farmers wife her dialogue

import { k, SceneLoader, MANUAL_ART_SCALE, SIDE } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { UNITS } from "../kaboom_globals"
import { Quests_TsokaScaring } from "../Quests/Quests_TsokaScaring"
import { enemy } from "../enemy"
import { NPC } from "../npc"
import { GET_CHAPTER } from "../chapters"

import map_json from '../../TiledMaps/03_PetraFarm.json' assert { type: "json" }

let FARMERS_WIFE_COPY = new NPC("farmer", {anim: "idle", flipX: true}, new Quests_TsokaScaring())

export let sc_03_PetraFarmCopy = new SceneLoader("03_PetraFarmCopy", map_json, () => {
    switch(GET_CHAPTER()){
        default:
            break;
    }
    // The crops
    k.addLevel([
        "PPPPPPPP",
        "PPPPPPPP",
        "PPPPPPPP",
    ], {
        width: UNITS,
        height: UNITS,
        // The position of the top left block
        pos: k.vec2(UNITS/2).add(k.vec2(2*UNITS, 3*UNITS)),
        // The components
        "P": () => [
            sprite("crop", {anim: "petra_raw"}),
            scale(MANUAL_ART_SCALE),
            area({shape: "circle", width: 11, height: 11, offset: k.vec2(0,5*MANUAL_ART_SCALE)}),
            origin("center"),
            crop(CROPS.PETRA),
        ],
    })
    // The monsters
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
    FARMERS_WIFE_COPY.build(k.vec2(5, 0.5))
})

// all_scenes["sc_02_CarrotFarm"].load.then(() => {
//     sc_03_PetraFarmCopy.addSceneChange({
//         thisId: "3->2",
//         tileX: -.5,
//         tileY: 1,
//         appearOn: SIDE.RIGHT,

//         destId: "2->3",
//         dest: sc_02_CarrotFarm,
//     })
// })

all_scenes["sc_03_PetraFarmCopy"].completeLoading()