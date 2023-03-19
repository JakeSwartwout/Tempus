import { k, TILE_WIDTH, TOPDOWN_VERT_SCALING, MANUAL_ART_SCALE, UNITS } from "./kaboom_globals.js"
import { PLAYER } from "./player.js";
import { ITEM_IDS } from "./items/ItemInfo.js"
import { CROPS } from "./crops.js";


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


/********************* Properties *********************/

// blah


/********************* State Machines (move to other file) *********************/

class States {
    update_state(){
        // pass
    }
    curr_text() {
        return ["...",
                "They have nothing to say..."
            ]
    }
}

/*** Farmer ***/
let five_carrots = {
    [ITEM_IDS.crops[CROPS.CARROT]] : 5
}
class States_Farmer extends States {
    constructor() {
        super()
        this.num_meetings = 0;
        this.carrots_left = 5;
    }
    update() {
        this.num_meetings += 1
        // only update if they're missing the quest
        if(!this.has_enough_carrots) {
            this.has_enough_carrots = PLAYER.inventory.contains(five_carrots)
            if (this.has_enough_carrots) {
                PLAYER.inventory.remove(five_carrots)
            }
        }
    }
    curr_text() {
        if (this.num_meetings == 1) {
            return [
                "Hello traveler! Nice to have a visitor here.",
                "You're passing through my carrot farm! Pretty impressive, right?",
                "We're getting ready for dinner, if you're hungry you're welcome to join.",
                "I'm out here to get some vegetables, I'll need 5 carrots to take you back."
            ]
        } else if (!this.has_enough_carrots) {
            return [
                "Please, I need at least 5 carrots for dinner tonight."
            ]
        } else {
            return [
                "Thanks!",
                "I'm going to do some weeding and will meet you at the house."
            ]
        }
    }
}


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

        this.state = state_machine
        // this.lastDir = k.vec2(0,1)
    }

    missing() {
        return this.comp == null
    }

    converse() {
        this.state.update()
        debug.log(this.state.curr_text()[0])
    }

    // faceInDir() {
    //     if (this.missing()) return
    //     // quad works in terms of which slices
    //     this.comp.quad = k.quad(this.lastDir.x+1, this.lastDir.y+1, 1, 1)
    // }

/********************* Component *********************/
    build(grid_loc) {
        if(!this.missing()) return

        let spawnPoint = k
            .vec2(grid_loc)                 // original pos
            .scale(UNITS)                   // scale to right size
            .scale(1, TOPDOWN_VERT_SCALING) // angle for 3/4 view
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
            if (this.comp.pos.dist(PLAYER.comp.pos) <= 1.5*UNITS) {
                this.converse()
            }
        })
    }

}


/********************* Predefined NPCs *********************/

const FARMER = new NPC("farmer", {anim: "idle", flipX: true}, new States_Farmer())


/********************* Exports *********************/

export { FARMER }