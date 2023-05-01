import { PLAYER, PLAYER_NAME, TextBox, Speech, ITEM_IDS, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"
import { CROPS } from "../Entities/crops.js"
import { Chapter, SET_CHAPTER } from "../Story/chapters.js"

/********************* Local Variables *********************/

let five_carrots = {
    [ITEM_IDS.crops[CROPS.CARROT]] : 5
}
const Q_GATHER_5_CARROTS = CLAIM_QUEST_ID()

const farmer_convo = {
    NOT_MET: 0,
    FIRST_MEETING: 1,
    WAITING_ON_CROPS: 2,
    TURN_IN: 3,
    NEXT_STEPS: 4,
}


/********************* Farmer Class *********************/

class Quests_Farmer extends QuestStates {
    constructor() {
        super([Q_GATHER_5_CARROTS])
        this.convo_stage = farmer_convo.NOT_MET
    }
    setChapter(chapter) {
        if (chapter == Chapter.WAKEUP ||
            chapter == Chapter.CARROT_GATHERING) {
            this.convo_stage = farmer_convo.NOT_MET
        } else {
            this.convo_stage = farmer_convo.NEXT_STEPS
            this.finish(Q_GATHER_5_CARROTS)
        }
    }
    update() {
        switch(this.convo_stage) {
            case farmer_convo.NOT_MET:
                this.convo_stage = farmer_convo.FIRST_MEETING
                break;
            case farmer_convo.FIRST_MEETING:
            case farmer_convo.WAITING_ON_CROPS:
                if (PLAYER.inventory.contains(five_carrots)) {
                    this.convo_stage = farmer_convo.TURN_IN
                    PLAYER.inventory.remove(five_carrots)
                    this.finish(Q_GATHER_5_CARROTS)
                    SET_CHAPTER(Chapter.PETRA_GATHERING)
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
                    new Speech("Farmer", [
                        "Hello traveler! Nice to have a visitor here.",
                        "You're passing through my carrot farm! Pretty impressive, right?",
                    ]),
                    new Speech(PLAYER_NAME, [
                        "Yes! I love it",
                    ]),
                    new Speech("Farmer", [
                        "Aw thank you!",
                        "We're getting ready for dinner, if you're hungry you're welcome to join.",
                        "I'm out here to get some vegetables,",
                        "I'll need 5 carrots to take you back.",
                    ]),
                    new Speech(PLAYER_NAME, [
                        "Got it! I'll grab some for you!",
                    ]),
                ])
            case farmer_convo.WAITING_ON_CROPS:
                return new TextBox([
                    new Speech("Farmer", [
                        "Please, I need at least 5 carrots for dinner tonight."
                    ])
                ])
            case farmer_convo.TURN_IN:
                return new TextBox([
                    new Speech(PLAYER_NAME, [
                        "I have 5 carrots!",
                    ]),
                    new Speech("Farmer", [
                        "Thanks!",
                        "I'm going to do some weeding and will meet you at the house."
                    ])
                ])
            case farmer_convo.NEXT_STEPS:
                return new TextBox([
                    new Speech("Farmer", [
                        "Just keep following this path and you'll reach the house!"
                    ])
                ])
            default:
                console.log("Default state in Quest_Farmer convo!")
                return;
        }
    }
}


/********************* Exports *********************/

export {
    Quests_Farmer,
    Q_GATHER_5_CARROTS
}