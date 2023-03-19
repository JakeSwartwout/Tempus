import { k, MANUAL_ART_SCALE, ART_SIZE } from "../kaboom_globals.js"
import "./ItemInstance.js"


/********************* Sprites *********************/

k.loadSprite("basket", "sprites/basket.png")
k.loadSprite("basket_inventory", "sprites/Inventory.png")


/********************* Constants *********************/

// Const to represent losing all items of some type
const ALL_ITEMS = -1


/********************* The Class *********************/

class Inventory {

    constructor(sprite, x_size, y_size, opening_size = ART_SIZE, opening_gap = 0) {
        this.sprite = sprite
        // size of each cell in the sprite
        this.opening_size = opening_size
        // gap between each cell in the sprite
        this.opening_gap = opening_gap

        this.x_size = x_size
        this.y_size = y_size
        this.items = Array.from(Array(this.x_size), () => new Array(this.y_size) )
        // accessed as this.items[x][y]

        this.showing = false
        this.gameObj = null
    }

    addItem(item_inst) {
        // TODO: Let them pick the spot
        // see if we can stack it anywhere
        for (let y = 0; y < this.y_size; y++){
            for (let x = 0; x < this.x_size; x++){
                let there = this.items[x][y]
                if(!there)
                    continue
                // can we stack it
                if( there.id == item_inst.id &&
                    item_inst.itemInfo.is_stackable &&
                    (!item_inst.state || (item_inst.state && item_inst.state == there.state))
                ) {
                    there.count += item_inst.count
                    return true
                }
            }
        }
        // can't stack, find the first open spot
        for (let y = 0; y < this.y_size; y++){
            for (let x = 0; x < this.x_size; x++){
                if (!this.items[x][y]) {
                    this.items[x][y] = item_inst
                    return true
                }
            }
        }
        // failed to find a spot
        return false
    }

    toggle_show() {
        if (this.showing)
            this.hide()
        else
            this.show()
    }

    show() {
        this.showing = true
        let screen_center = k.center()
        // add the background
        this.gameObj = k.add([
            k.sprite(this.sprite),
            k.scale(MANUAL_ART_SCALE),
            k.origin("center"),
            k.pos(screen_center),
            "inventory",
        ])
        // add in the items
        for (let y = 0; y < this.y_size; y++){
            for (let x = 0; x < this.x_size; x++){
                if (this.items[x][y]) {
                    let grid_spot = k
                        .vec2(x, y)                                         // start with top-left corner
                        .add(k.vec2(.5, .5))                                // move to center
                        .sub(k.vec2(this.x_size, this.y_size).scale(.5))    // shift to be relative to middle
                        .scale(this.opening_size + this.opening_gap)        // bring up to size
                        .scale(MANUAL_ART_SCALE)                            // scale it up from pixel art
                        .add(screen_center)                                 // move it relative to screen center
                    this.items[x][y].showInInventory(grid_spot)
                }
            }
        }
    }

    hide() {
        this.showing = false
        if(this.gameObj)
            this.gameObj.destroy()
        for (let y = 0; y < this.y_size; y++){
            for (let x = 0; x < this.x_size; x++){
                if (this.items[x][y])
                    this.items[x][y].hideInInventory()
            }
        }
    }

    contains(item_reqs) {
        /* reqs should be an object formatted like:
            {
                id1 : {
                    "any" : count_any,
                    "state1" : count_state1,
                    "state2" : count_state2,
                },
                id2 : count_any,
            }
        */
        // this hack is apparently the js standard for deepcloning objects
        let reqs = JSON.parse(JSON.stringify(item_reqs));
        // loop through the items to ensure each is only counted once
        for(let y = 0; y < this.y_size; y++) {
            for(let x = 0; x < this.x_size; x++) {
                let item = this.items[x][y]
                // skip if empty
                if (!item)
                    continue
                // skip if we don't need this item
                if (item.id in reqs === false)
                    continue
                // we do need it
                if (typeof(reqs[item.id]) == "number") {    // p1: anything always works
                    reqs[item.id] -= item.count
                } else if (item.state in reqs[item.id]) {   // p2: want specific, have it
                    reqs[item.id][item.state] -= item.count
                } else if("any" in reqs[item.id]) {         // p3: want specific, allow any
                    reqs[item.id]["any"] -= item.count
                }
                // we might not accept this state
            }
        }
        // gone through the items, see if any reqs weren't satisfied
        for(let id in reqs) {
            if(typeof(reqs[id]) == "number") {
                if(reqs[id] > 0) {
                    return false
                }
            } else {
                for(let state in reqs[id]) {
                    if(reqs[id][state] > 0) {
                        return false
                    }
                }
            }
        }
        // hit all the reqs
        return true
    }

    remove(item_counts) {
        /* counts should be structured the same as for contains(reqs)
            {
                id1 : {
                    "any" : count_any,
                    "state1" : count_state1,
                    "state2" : count_state2,
                },
                id2 : count_any
            }
            use ALL_ITEMS to get rid of everything
            otherwise, it gets rid of as many as it can up to the count
        */
        // this hack is apparently the js standard for deepcloning objects
        let counts = JSON.parse(JSON.stringify(item_counts));
        // loop through the items and just remove them in order
        for(let y = 0; y < this.y_size; y++) {
            for(let x = 0; x < this.x_size; x++) {
                let item = this.items[x][y]
                // skip if empty
                if (!item)
                    continue
                // skip if we don't need this item
                if (item.id in counts === false)
                    continue
                // we do need it, pick the type we'll remove
                if (typeof(counts[item.id]) == "number"){
                    // update the counts
                    let num_taken = 0
                    if(item.count > counts[item.id]) {
                        num_taken = counts[item.id]
                    } else {
                        num_taken = item.count
                    }
                    counts[item.id] -= num_taken
                    item.count -= num_taken
                } else { // an object
                    let state = null
                    if (item.state in counts[item.id]) {
                        state = item.state
                    } else if("any" in counts[item.id]) {
                        state = "any"
                    }
                    // if we don't accept this state, move on
                    if(state == null)
                        continue
                    // update the counts
                    let num_taken = 0
                    if(item.count > counts[item.id][state]) {
                        num_taken = counts[item.id][state]
                    } else {
                        num_taken = item.count
                    }
                    counts[item.id][state] -= num_taken
                    item.count -= num_taken
                }
            }
        }
    }
}


/********************* Exports *********************/

export {
    Inventory,
    ALL_ITEMS
}