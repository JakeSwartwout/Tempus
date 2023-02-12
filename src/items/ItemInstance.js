import { k, MANUAL_ART_SCALE } from "../kaboom_globals.js"
import { ITEM_INFOS } from "./ItemInfo.js"
import "./all_items.js"

class ItemInstance {
    constructor(ID, state = null) {
        this.id = ID
        this.itemInfo = ITEM_INFOS[this.id]
        this.count = 1
        if(state && !this.itemInfo.possible_anims.includes(state))
            k.debug.log(state + " is not a valid animation for " + this.itemInfo.name + "!")
        else
            this.state = state

        this.gameObj = null
    }

    showInInventory(centerPos) {
        if (!this.gameObj) {
            this.gameObj = k.add([
                k.sprite(this.itemInfo.sprite, this.state? {anim: this.state} : {}),
                k.origin("center"),
                k.pos(centerPos),
                k.scale(MANUAL_ART_SCALE),
                "inventory_item",
            ])
        }
    }

    hideInInventory() {
        if (this.gameObj) {
            this.gameObj.destroy()
            this.gameObj = null
        }
    }
}


/********************* Exports *********************/

export {
    ItemInstance
}