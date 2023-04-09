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
        for (let id of questIdList) {
            this.promises[id] = new Promise((resolve, reject) => {
                this.promise_funcs[id] = [resolve, reject]
            })
        }
    }
    setChapter(chapter){
        // update the states based on the chapter
        // used when building the component in non-story order
    }
    update_state(){
        // call this before talking to someone to update their dialogue
        // changes the internal state
    }
    getDialogue() {
        // call this to get the text conversation that will happen for that quest
        // this does not change the internal state
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
