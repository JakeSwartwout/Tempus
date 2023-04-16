import { k, SceneLoader, MANUAL_ART_SCALE, SIDE, SCENE_HEIGHT } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { FARMERS_WIFE } from "../npc"
import { Chapter, GET_CHAPTER } from "../chapters"
import { TextBox } from "../TextBox"

import map_json from '../../TiledMaps/04_Farmhouse.json' assert { type: "json" }
import { sc_03_PetraFarm } from "./sc_03_PetraFarm"

const DINNER_CONVO = new TextBox([

])

export let sc_04_Farmhouse = new SceneLoader("04_Farmhouse", map_json, () => {
    switch(GET_CHAPTER()){
        case Chapter.PETRA_GATHERING:
            break;
        case Chapter.TSOKA_ATTACK:
            break;
        case Chapter.FARMHOUSE_DINNER:
            break;
        default:
            break;
    }
    // just draw the sprites where I want them
    // make sure to import the file where we define the sprites
})

all_scenes["sc_03_PetraFarm"].load.then(() => {
    sc_04_Farmhouse.addSceneChange({
        thisId: "4->3",
        tileX: 6,
        tileY: SCENE_HEIGHT+.5,
        appear_on: SIDE.UP,

        destId: "3->4",
        dest: sc_03_PetraFarm,
    })
})

all_scenes["sc_04_Farmhouse"].completeLoading()