import { UNITS } from "../kaboom_globals"
import { SceneLoader, SIDE, SCENE_HEIGHT, k } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"
import { crop, CROPS } from "../Entities/crops"
import { FARMER, FARMERS_WIFE } from "../Entities/Npc"
import { PLAYER_NAME } from "../Entities/Player"
import { Chapter, GET_CHAPTER, SET_CHAPTER } from "../Story/chapters"
import { CS_Chapter, CS_NpcState, CS_Scene, CS_Text, Cutscene } from "../Story/Cutscene.js"
import { Speech, TextBox } from "../Story/TextBox.js"
import { Quest_Null } from "../Quests/QuestStates"
import { Quests_TsokaScaring } from "../Quests/Quests_TsokaScaring"

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
    new CS_Scene("Leave to the farm", "03_PetraFarm", "3->4"),
], )


let sc_04_Farmhouse = new SceneLoader("04_Farmhouse", map_json, () => {
    switch(GET_CHAPTER()) {
        case Chapter.TSOKA_ATTACK:
        case Chapter.TSOKA_INVESTIGATION:
            break;
        default:
            SET_CHAPTER(Chapter.FARMHOUSE_DINNER)
            break;
    }

    // TODO: replace these with calls to the NPCs to draw just their sprite
    // FARMER.draw(location)

    FARMER.build(k.vec2(4, 3))
    FARMER.comp.flipX()
    // CROP.CARROT.draw(k.vec2(5,3))
    FARMERS_WIFE.build(k.vec2(6, 3))

    DINNER_CONVO.playCutscene()
}, (chapter) => {
    return k.vec2(6, SCENE_HEIGHT -1).scale(UNITS)
})

// TODO: Remove and teleport automatically using the cutscene
all_scenes["03_PetraFarm"].load.then((l_sc_03_PetraFarm) => {
    sc_04_Farmhouse.addSceneChange({
        thisId: "4->3",
        tileX: 6,
        tileY: SCENE_HEIGHT+.5,
        appear_on: SIDE.UP,

        destId: "3->4",
        dest: l_sc_03_PetraFarm,
    })
})

DONE_LOADING_SCENE(sc_04_Farmhouse)