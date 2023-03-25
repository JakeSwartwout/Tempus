import { PLAYER, PLAYER_NAME, TextBox, Speech, ITEM_IDS, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"
import { CROPS } from "../crops.js"
import { ALL_ITEMS } from "../items/Inventory.js"

/********************* Local Variables *********************/

let seven_petras = {
    [ITEM_IDS.crops[CROPS.PETRA]] : 7
}
let all_crops = {}
for (let crop in CROPS) {
    all_crops[ITEM_IDS.crops[CROPS[crop]]] = ALL_ITEMS
}
const Q_GATHER_7_PETRAS = CLAIM_QUEST_ID()


/********************* Farmer Class *********************/

// TODO: Don't want farmers wife, want the farmer to move to second area and ask new quests
class Quests_FarmersWife extends QuestStates {
    constructor() {
        super([Q_GATHER_7_PETRAS])
        this.num_meetings = 0;
        this.has_enough_petras = false
    }
    update() {
        this.num_meetings += 1
        // only update if they're missing the quest
        if(!this.has_enough_petras) {
            this.has_enough_petras = PLAYER.inventory.contains(seven_petras)
            if (this.has_enough_petras) {
                PLAYER.inventory.remove(all_crops)
            }
        }
    }
    getDialogue() {
        if (this.num_meetings == 1) {
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
        } else if (!this.has_enough_petras) {
            return new TextBox([
                new Speech("Farmers Wife", [
                    "Do you have 7 of those strange purple vegetables yet?"
                ]),
                new Speech(PLAYER_NAME, [
                    "Not yet, I'll go pick a few."
                ]),
            ])
        } else {
            this.finish(Q_GATHER_7_PETRAS)
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
        }
    }
}


/********************* Exports *********************/

export {
    Quests_FarmersWife,
    Q_GATHER_7_PETRAS
}