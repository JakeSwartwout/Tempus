import { SceneLoader, SIDE, SCENE_HEIGHT, k } from "./scene_globals"
import { crop, CROPS } from "../crops"
import { all_scenes } from "./all_scenes"
import { FARMER, FARMERS_WIFE } from "../npc"
import { Chapter, SET_CHAPTER } from "../chapters"
import { Speech, TextBox } from "../TextBox"
import { sc_03_PetraFarm } from "./sc_03_PetraFarm"
import { CS_Chapter, CS_NpcState, CS_Scene, CS_Text, Cutscene } from "../Cutscene"
import { Quests_TsokaScaring } from "../Quests/Quests_TsokaScaring"
import { Quest_Null } from "../Quests/QuestStates"
import { PLAYER_NAME } from "../player"

// TODO: import the files with the sprites I need

// TODO: this is happening in the farmhouse, but the scene is outside the farmhouse
// Add a layer between the two, another scene to buffer it
import map_json from '../../TiledMaps/04_Farmhouse.json' assert { type: "json" }

const DINNER_CONVO = new Cutscene([
    new CS_NpcState("Clear the farmer", FARMER, new Quest_Null()),
    new CS_NpcState("Clear the wife", FARMERS_WIFE, new Quest_Null()),
    // shake screen
    new CS_Text("Dinner talk", new TextBox([
        new Speech("*Outside*", [
            "!!CRASH!!",
        ]),
        new Speech("Farmers wife", [
            "What was that??",
        ]),
        new Speech("*Outside*", [
            "*SQUEAK*"
        ]),
        new Speech("Farmer", [
            "There's something in our crops!",
            "I'm going to go scare them away"
        ]),
        new Speech(PLAYER_NAME, [
            "I'll come help!",
        ]),
        new Speech("*Outside*", [
            "*SQUEAK*"
        ]),
    ])),
    // Farmer leave animation
    new CS_NpcState("Give the wife the new quest", FARMERS_WIFE, new Quests_TsokaScaring()),
    new CS_Chapter("Change the the tsoka attack chapter", Chapter.TSOKA_ATTACK),
    // player leave animation
    new CS_Scene("Leave to the farm", sc_03_PetraFarm, "3->4"),
], )


export let sc_04_Farmhouse = new SceneLoader("04_Farmhouse", map_json, () => {
    SET_CHAPTER(Chapter.FARMHOUSE_DINNER)

    // TODO: replace these with calls to the NPCs to draw just their sprite
    // FARMER.draw(location)

    FARMER.build(k.vec2(4, 3))
    FARMER.comp.flipX()
    // CROP.CARROT.draw(k.vec2(5,3))
    FARMERS_WIFE.build(k.vec2(6, 3))

    DINNER_CONVO.playCutscene()
})

// TODO: Remove and teleport automatically using the cutscene
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