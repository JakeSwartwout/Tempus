import { Speech, TextBox } from "../TextBox.js"


/********************* Giving Quests IDs *********************/

let NUM_QUESTS = 0
const CLAIM_QUEST_ID = function() {
    let nextID = NUM_QUESTS
    NUM_QUESTS ++
    return nextID
}


/********************* State Machine for Quests *********************/

/*abstract*/ class QuestStates {
    constructor(questIdList) {
        this.promise_funcs = {}
        this.promises = {}
        for (let id in questIdList) {
            this.promises[id] = new Promise((resolve, reject) => {
                this.promise_funcs[id] = [resolve, reject]
            })
        }
    }
    update_state(){
        // pass
    }
    getDialogue() {
        return new TextBox([
            new Speech("...", [
                "...",
                "They have nothing to say...",
            ])
        ])
    }
    finish(questId, successful=true) {
        // call the resolve/reject for the promise
        this.promise_funcs[questId][successful? 0 : 1]()
    }
}


/********************* Exports *********************/

export { QuestStates, CLAIM_QUEST_ID }
export { ITEM_IDS } from "../items/ItemInfo.js"
export { Speech, TextBox } from "../TextBox.js"
export { PLAYER, PLAYER_NAME } from "../player.js"
