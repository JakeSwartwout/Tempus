import { GET_CHAPTER } from "./chapters.js";
import { k, TILE_WIDTH, MANUAL_ART_SCALE, UNITS } from "./kaboom_globals.js"
import { PLAYER } from "./player.js";
import { Quests_Farmer } from "./Quests/Quests_Farmer.js";
import { Quests_FarmersWife } from "./Quests/Quests_FarmersWife.js";


/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/npc_atlas.png", {
    "farmer": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(4),
        sliceX: 4,
        sliceY: 4,
        "anims" : {
            "idle": {
                from: 0,
                to: 3,
                loop: true,
                speed: 6,
                // pingpong: true
            }
        }
    }
})


/********************* Base Class *********************/

// each type of npc will inherit from the base npc class
// for now, it just contains everything so I can actually make progress
// I'm thinking I'll add:
/**
 * stationary person to talk with and advance the story
 * townsfolk who walk around randomly and say stuff when you bump into them
 */

class NPC {
    constructor(sprite, anim_info, state_machine = null) {
        this.sprite = sprite
        this.anim_info = anim_info
        this.comp = null

        this.state_machine = state_machine
        // this.last_dir = k.vec2(0,1)
    }

    missing() {
        return this.comp == null
    }

    converse() {
        this.state_machine.update()
        // TODO: temp, store the dialogue box so it persists
        this.dialogueBox = this.state_machine.getDialogue()
        this.dialogueBox.startDialogue()
    }

    onComplete(questId) {
        return this.state_machine.promises[questId]
    }

    swapToQuest(state_machine, complete_current = true) {
        if (complete_current) {
            this.state_machine.closeQuestline()
        }
        this.state_machine = state_machine
    }

    // faceInDir() {
    //     if (this.missing()) return
    //     // quad works in terms of which slices
    //     this.comp.quad = k.quad(this.last_dir.x+1, this.last_dir.y+1, 1, 1)
    // }

/********************* Component *********************/
    build(grid_loc) {
        if(!this.missing()) return

        this.state_machine.setChapter(GET_CHAPTER())

        let spawnPoint = k
            .vec2(grid_loc)                 // original pos
            .scale(UNITS)                   // scale to right size
            .add(k.vec2(UNITS/2))           // offset to center on tiles

        this.comp = k.add([
            "npc",
            this.sprite,
            sprite(this.sprite, this.anim_info),
            scale(MANUAL_ART_SCALE),
            area({width: 8, height: 10, offset: k.vec2(0, 4*MANUAL_ART_SCALE)}),
            solid(),
            origin("center"),
            pos(spawnPoint),
        ])

        // player tries to talk to them
        k.onKeyPress("e", () => {
            if (this.comp.pos.dist(PLAYER.comp.pos) <= 1*UNITS) {
                this.converse()
            }
        })

        // when the scene gets unloaded
        this.comp.onDestroy(() => {
            this.comp = null
        })
    }

}


/********************* Predefined NPCs *********************/

const FARMER = new NPC("farmer", {anim: "idle", flipX: true}, new Quests_Farmer())
const FARMERS_WIFE = new NPC("farmer", {anim: "idle", flipX: true}, new Quests_FarmersWife())


/********************* Exports *********************/

export {
    FARMER,
    FARMERS_WIFE
}