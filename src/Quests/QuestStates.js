import { Speech, TextBox } from "../Story/TextBox.js"
import { ABSTRACT } from "../kaboom_globals.js"


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
    /*abstract*/ setChapter(chapter){
        ABSTRACT("QuestStates", "setChapter")
        // update the states based on the chapter
        // used when building the component in non-story order
    }
    /*abstract*/ update_state(){
        ABSTRACT("QuestStates", "update_state")
        // call this before talking to someone to update their dialogue
        // changes the internal state
    }
    /*abstract*/ getDialogue() {
        ABSTRACT("QuestStates", "getDialogue")
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
    closeQuestline(successful = true) {
        // finishes all of the quests we currently have to unlock any potential blockers
        for(let id in this.promise_funcs) {
            this.promise_funcs[id][successful? 0 : 1]()
        }
    }
    containsQuest(quest_id) {
        return quest_id in this.promises
    }
}


/********************* Null Quests *********************/
// used to reset quests to be empty

class Quest_Null extends QuestStates {
    constructor() {
        super([])
    }
    setChapter(chapter) {
        // pass
    }
    update() {
        // pass
    }
    getDialogue() {
        return new TextBox([])
    }
}


/********************* Exports *********************/

export { QuestStates, CLAIM_QUEST_ID, Quest_Null }
export { ITEM_IDS } from "../Items/ItemInfo.js"
export { Speech, TextBox } from "../Story/TextBox.js"
export { PLAYER, PLAYER_NAME } from "../Entities/Player.js"
