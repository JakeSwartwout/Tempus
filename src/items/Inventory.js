import { k, MANUAL_ART_SCALE, ART_SIZE } from "../kaboom_globals.js"
import "./ItemInstance.js"


/********************* Sprites *********************/

k.loadSprite("basket", "sprites/basket.png")
k.loadSprite("basket_inventory", "sprites/Inventory.png")


/********************* Sprites *********************/

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

    addItem(item) {
        // TODO: Let them pick the spot
        for (let y = 0; y < this.y_size; y++){
            for (let x = 0; x < this.x_size; x++){
                if (!this.items[x][y]) {
                    this.items[x][y] = item
                    return true
                }
            }
        }
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
}


/********************* Exports *********************/

export {
    Inventory
}