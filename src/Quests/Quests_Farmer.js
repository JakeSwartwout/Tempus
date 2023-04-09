import { PLAYER, PLAYER_NAME, TextBox, Speech, ITEM_IDS, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"
import { CROPS } from "../crops.js"

/********************* Local Variables *********************/

let five_carrots = {
    [ITEM_IDS.crops[CROPS.CARROT]] : 5
}
const Q_GATHER_5_CARROTS = CLAIM_QUEST_ID()


/********************* Farmer Class *********************/

class Quests_Farmer extends QuestStates {
    constructor() {
        super([Q_GATHER_5_CARROTS])
        this.num_meetings = 0
        this.has_enough_carrots = false
        this.got_final_dialogue = false
    }
    update() {
        this.num_meetings += 1
        // only update if they're missing the quest
        if(!this.has_enough_carrots) {
            this.has_enough_carrots = PLAYER.inventory.contains(five_carrots)
            if (this.has_enough_carrots) {
                PLAYER.inventory.remove(five_carrots)
                this.finish(Q_GATHER_5_CARROTS)
            }
        } else {
            // log if they've gotten the completion dialogue or not
            this.got_final_dialogue = true
        }
    }
    getDialogue() {
        if (this.num_meetings == 1) {
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
        } else if (!this.has_enough_carrots) {
            return new TextBox([
                new Speech("Farmer", [
                    "Please, I need at least 5 carrots for dinner tonight."
                ])
            ])
        } else if (!this.got_final_dialogue) {
            return new TextBox([
                new Speech(PLAYER_NAME, [
                    "I have 5 carrots!",
                ]),
                new Speech("Farmer", [
                    "Thanks!",
                    "I'm going to do some weeding and will meet you at the house."
                ])
            ])
        } else {
            return new TextBox([
                new Speech("Farmer", [
                    "Just keep following this path and you'll reach the house!"
                ])
            ])
        }
    }
}


/********************* Exports *********************/

export {
    Quests_Farmer,
    Q_GATHER_5_CARROTS
}