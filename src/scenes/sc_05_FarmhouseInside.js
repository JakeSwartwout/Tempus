import { MANUAL_ART_SCALE, UNITS } from "../kaboom_globals"
import { SceneLoader, SIDE, SCENE_HEIGHT, k } from "./scene_globals"
import { DONE_LOADING_SCENE, all_scenes } from "./all_scenes"
import { CROPS } from "../Entities/crops"
import { FARMER, FARMERS_WIFE } from "../Entities/Npc"
import { PLAYER, PLAYER_NAME } from "../Entities/Player"
import { WEAPONS } from "../Entities/Weapon"
import { ITEM_IDS, ITEM_INFOS } from "../Items/ItemInfo"
import { Chapter, SET_CHAPTER } from "../Story/chapters"
import { CS_Chapter, CS_GiveItem, CS_NpcState, CS_Scene, CS_Teleport, CS_Text, Cutscene } from "../Story/Cutscene.js"
import { Speech, TextBox } from "../Story/TextBox.js"
import { Quest_Null } from "../Quests/QuestStates"
import { Quests_TsokaScaring } from "../Quests/Quests_TsokaScaring"

// TODO: import the files with the sprites I need

// TODO: this is happening in the farmhouse, but the scene is outside the farmhouse
// Add a layer between the two, another scene to buffer it
import map_json from '../../TiledMaps/05_FarmhouseInside.json' assert { type: "json" }

const DINNER_CONVO = new Cutscene([
    new CS_Teleport("Move the player to the table", PLAYER.await_spawn, 4.5, 1),
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
    new CS_GiveItem("Give the player a rake", ITEM_IDS.weapons[WEAPONS.RAKE], 1, true),
    new CS_Scene("Leave to the farm", "03_PetraFarm", "3->4"),
], )


let sc_05_FarmhouseInside = new SceneLoader("05_FarmhouseInside", map_json, () => {
    // Never going to be here unless it's the dinner
    SET_CHAPTER(Chapter.FARMHOUSE_DINNER)

    // TODO: replace these with calls to the NPCs to draw just their sprite
    // FARMER.draw(location)

    FARMER.build(k.vec2(3, 2))
    FARMER.comp.flipX()
    FARMERS_WIFE.build(k.vec2(6, 2))
    // Carrot
    k.add([
        // can technically get the id by just .carrot, but its good reminder to import that file
        k.sprite(ITEM_INFOS[ITEM_IDS.crops[CROPS.CARROT]].sprite),
        k.pos(k.vec2(5,2).scale(UNITS)),
        k.scale(MANUAL_ART_SCALE / 2)
    ])
    // Petra
    k.add([
        k.sprite(ITEM_INFOS[ITEM_IDS.crops[CROPS.PETRA]].sprite),
        k.pos(k.vec2(4.5,2).scale(UNITS)),
        k.scale(MANUAL_ART_SCALE / 2)
    ])

    DINNER_CONVO.playCutscene()
}, (chapter) => {
    return k.vec2(6, SCENE_HEIGHT -1).scale(UNITS)
})

all_scenes["04_FarmhouseOutside"].load.then((l_sc_04_FarmhouseOutside) => {
    sc_05_FarmhouseInside.addSceneChange({
        thisId: "exit",
        tileX: 6,
        tileY: SCENE_HEIGHT+.5,
        appear_on: SIDE.UP,

        destId: "entrance",
        dest: l_sc_04_FarmhouseOutside,
    })
})

DONE_LOADING_SCENE(sc_05_FarmhouseInside)