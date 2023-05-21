import { all_scenes } from "../Scenes/all_scenes.js"
import { UNITS, k } from "../kaboom_globals.js"
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
        this.nextAction = () => {WARNING("Performing null next action")}
    }

    linkNext(nextAction) {
        this.nextAction = nextAction
    }

    /*abstract*/ perform() {
        // does whatever action it needs, then calls next action
        // overwrite this
        // make sure to call nextAction at the end
        WARNING("Running abstract CutsceneElement.perform()")
        this.nextAction()
    }
}

const CUTSCENE_TYPE  = {
    CS_Text : 0,        // Shows a text box
    CS_Quest : 1,       // Completes a quest
    CS_Chapter : 2,     // Changes to a chapter
    CS_Scene : 3,       // Teleports the player to a new scene
    CS_Move : 4,        // Moves sprites on the screen
    CS_Teleport : 5,    // Teleport an element somewhere on screen
    CS_NpcState : 6,    // Updates the state macines of an npc
    CS_GiveItem : 7,    // Gives the player an instance of that item
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
    constructor(name, scene_name, changer_id) {
        super(name, CUTSCENE_TYPE.CS_Scene)
        this.scene_name = scene_name
        this.changer_id = changer_id
    }

    perform() {
        all_scenes[this.scene_name].load.then((scene) => {
            scene.go_ch(this.changer_id)
            this.nextAction()
        })
    }
}

class CS_Teleport extends CutsceneElement {
    /**
     * Teleport an element somewhere on screen
     * Useful for setup
     */
    constructor(name, componentPromise, grid_x, grid_y) {
        super(name, CUTSCENE_TYPE.CS_Teleport)
        this.componentPromise = componentPromise
        this.grid_x = grid_x
        this.grid_y = grid_y
    }

    perform() {
        this.componentPromise.then((comp) => {
            comp.pos = k
                .vec2(this.grid_x, this.grid_y)
                .add(.5)
                .scale(UNITS)
        })
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

class CS_GiveItem extends CutsceneElement {
    /**
     * Gives the player an instance of that item
     */
    constructor(name, item_id, num_items = 1, try_equip = false) {
        super(name, CUTSCENE_TYPE.CS_GiveItem)
        this.item_id = item_id
        this.num_items = num_items
        this.try_equip = try_equip
    }

    perform() {
        // TODO give item
        this.nextAction()
    }
}


/********************* Exports *********************/

export {
    Cutscene,
    CS_Text, CS_Chapter, CS_Scene, CS_Teleport, CS_NpcState, CS_GiveItem
}