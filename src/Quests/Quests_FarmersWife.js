import { PLAYER, PLAYER_NAME, TextBox, Speech, ITEM_IDS, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"
import { CROPS } from "../crops.js"
import { ALL_ITEMS } from "../items/Inventory.js"
import { Chapter, GET_CHAPTER, SET_CHAPTER } from "../chapters.js"

/********************* Local Variables *********************/

let seven_petras = {
    [ITEM_IDS.crops[CROPS.PETRA]] : 7
}
let all_crops = {}
for (let crop in CROPS) {
    all_crops[ITEM_IDS.crops[CROPS[crop]]] = ALL_ITEMS
}
const Q_GATHER_7_PETRAS = CLAIM_QUEST_ID()

const farmer_convo = {
    NOT_MET: 0,
    FIRST_MEETING: 1,
    WAITING_ON_CROPS: 2,
    TURN_IN: 3,
    NEXT_STEPS: 4,
}


/********************* Farmer Class *********************/

// TODO: Don't want farmers wife, want the farmer to move to second area and ask new quests
class Quests_FarmersWife extends QuestStates {
    constructor() {
        super([Q_GATHER_7_PETRAS])
        this.convo_stage = farmer_convo.NOT_MET
    }
    setChapter(chapter) {
        switch(GET_CHAPTER()) {
            case Chapter.CARROT_GATHERING:
                SET_CHAPTER(Chapter.PETRA_GATHERING)
            case Chapter.PETRA_GATHERING:
                this.convo_stage = farmer_convo.NOT_MET
                break;
            default:
                this.convo_stage = farmer_convo.NEXT_STEPS
                this.finish(Q_GATHER_7_PETRAS)
                break;
        }
    }
    update() {
        switch(this.convo_stage) {
            case farmer_convo.NOT_MET:
                this.convo_stage = farmer_convo.FIRST_MEETING
                break;
            case farmer_convo.FIRST_MEETING:
            case farmer_convo.WAITING_ON_CROPS:
                if (PLAYER.inventory.contains(seven_petras)) {
                    this.convo_stage = farmer_convo.TURN_IN
                    PLAYER.inventory.remove(all_crops)
                    this.finish(Q_GATHER_7_PETRAS)
                    // TODO: set to farmhouse dinner
                    SET_CHAPTER(Chapter.TSOKA_ATTACK)
                } else {
                    this.convo_stage = farmer_convo.WAITING_ON_CROPS
                }
                break;
            case farmer_convo.TURN_IN:
                this.convo_stage = farmer_convo.NEXT_STEPS
                break;
            case farmer_convo.NEXT_STEPS:
            default:
                break;
        }
    }
    getDialogue() {
        switch(this.convo_stage) {
            case farmer_convo.NOT_MET:
                return;
            case farmer_convo.FIRST_MEETING:
                return new TextBox([
                    new Speech(PLAYER_NAME, [
                        "Hi do you know where the farmhouse is?",
                        "I'm bringing some carrots for dinner!"
                    ]),
                    new Speech("Farmers Wife", [
                        "Carrots?",
                        "No no, I wanted to try the new crop for dinner!",
                        "You must have met my husband then, he's scared of the new stuff."
                    ]),
                    new Speech(PLAYER_NAME, [
                        "New crop?"
                    ]),
                    new Speech("Farmers Wife", [
                        "Yeah! These new purple vegetables sprung up in our fields one day.",
                        "Things have been a little crazy lately, so I guess even the plants are off now.",
                        "I still want to try them, so would you pick some of those for me?",
                        "If you'll be eating with us, that would need 7 or so."
                    ]),
                    new Speech(PLAYER_NAME, [
                        "Sure!",
                    ]),
                ])
            case farmer_convo.WAITING_ON_CROPS:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Do you have 7 of those strange purple vegetables yet?"
                    ]),
                    new Speech(PLAYER_NAME, [
                        "Not yet, I'll go pick a few."
                    ]),
                ])
            case farmer_convo.TURN_IN:
                return new TextBox([
                    new Speech(PLAYER_NAME, [
                        "These are some strange vegetables...",
                    ]),
                    new Speech("Farmers Wife", [
                        "I'm sure they'll cook up fine!",
                        "I'll take whatever carrots you have too, might as well add them.",
                        "I'll meet you back at the farmhouse, just keep heading that same direction."
                    ])
                ])
            case farmer_convo.NEXT_STEPS:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Keep following this trail and I'll meet you at the farmhouse!"
                    ])
                ])
            default:
                break;
        }
    }
}


/********************* Exports *********************/

export {
    Quests_FarmersWife,
    Q_GATHER_7_PETRAS
}