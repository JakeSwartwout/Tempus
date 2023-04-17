import { TextBox } from "./TextBox.js"
import { SET_CHAPTER } from "./chapters"


/********************* Base objects *********************/

class Cutscene {
    /**Plays a cutscene
     * Performs actions, move characters, unlocks quests, shows text
     */
    constructor(elements, onCompleteCallback) {
        // array of cutscene elements to follow
        this.elements = elements
        // link them together
        for(let i = 0; i < elements.length - 1; i++) {
            this.elements[i].linkNext(() => {this.elements[i+1].perform()})
        }
        // when we finish
        let onComplete = () => {
            this.restoreControls()
            onCompleteCallback
        }
        this.elements[elements.length - 1].linkNext(onComplete)
    }

    playCutscene() {
        // TODO: save the controls
        this.elements[0].perform()
    }

    restoreControls() {
        // TODO: restore the controls
    }
}

/*abstract*/ class CutsceneElement {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.nextAction = () => {console.log("Performing null next action")}
    }

    linkNext(nextAction) {
        this.nextAction = nextAction
    }

    /*abstract*/ perform() {
        // does whatever action it needs, then calls next action
        // overwrite this
        // make sure to call nextAction at the end
        console.log("Running abstract CutsceneElement.perform()")
        this.nextAction()
    }
}

const CUTSCENE_TYPE  = {
    CS_Text : 0,        // Shows a text box
    CS_Quest : 1,       // Completes a quest
    CS_Chapter : 2,     // Changes to a chapter
    CS_Scene : 3,       // Teleports the player to a new scene
    CS_Move : 4,        // Moves sprites on the screen
    CS_NpcState : 5,    // Updates the state macines of an npc
}


/********************* Cutscene Elements *********************/

class CS_Text extends CutsceneElement {
    /**
     * Shows a text box and lets the user click through it
     */
    constructor(name, textbox) {
        super(name, CUTSCENE_TYPE.CS_Text)
        this.text = textbox
    }

    perform() {
        this.text.startDialogue(this.nextAction)
    }
}

class CS_Chapter extends CutsceneElement {
    /**
     * Changes to a given chapter
     */
    constructor(name, chapter) {
        super(name, CUTSCENE_TYPE.CS_Chapter)
        this.chapter = chapter
    }

    perform() {
        SET_CHAPTER(this.chapter)
        this.nextAction()
    }
}

class CS_Scene extends CutsceneElement {
    /**
     * Moves to a new scene
     */
    constructor(name, scene, changer_id) {
        super(name, CUTSCENE_TYPE.CS_Scene)
        this.scene = scene
        this.changer_id = changer_id
    }

    perform() {
        // TODO: implement this
        console.log("Scene changer not implemented yet")
        this.nextAction()
    }
}

class CS_NpcState extends CutsceneElement {
    /**
     * Swaps out the quests for a given npc
     */
    constructor(name, npc, quest_states) {
        super(name, CUTSCENE_TYPE.CS_NpcState)
        this.npc = npc
        this.quest_states = quest_states
    }

    perform() {
        this.npc.swapToQuest(this.quest_states)
        this.nextAction()
    }
}


/********************* Exports *********************/

export {
    Cutscene,
    CS_Text, CS_Chapter, CS_Scene, CS_NpcState
}