import { k, TILE_OFFSET, TILE_WIDTH } from "./kaboom_globals.js"
import { PLAYER } from "./player.js"
import { ItemInstance } from "./items/ItemInstance.js"
import { ITEM_IDS } from "./items/ItemInfo.js"

/********************* Constants *********************/

const CROP_LOC = {
    CARROT : 0,
    TOMATO : 1,
    OPIX   : 2,
    PETRA  : 3,
    SLUCK  : 4,
    CHOSP  : 5,
}
const CROP_COUNT = 6

const CROPS = {
    CARROT : "carrot",
    TOMATO : "tomato",
    OPIX   : "opix",
    PETRA  : "petra",
    SLUCK  : "sluck",
    CHOSP  : "chosp",
}

const RAW_ANIMATION_FRAMES = 1
const PICKED_ANIMATION_FRAMES = 1
const CROP_TOTAL_ANIM_FRAMES = RAW_ANIMATION_FRAMES + PICKED_ANIMATION_FRAMES

const RAW = function(plant_loc) {
    return CROP_TOTAL_ANIM_FRAMES * plant_loc
    // return {from: , to: }
}
const PICKED = function(plant_loc) {
    return CROP_TOTAL_ANIM_FRAMES * plant_loc + RAW_ANIMATION_FRAMES
    // return {from: , to: }
}


/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/crops_atlas.png", {
    "crop": {
        x: TILE_OFFSET(0),
        y: TILE_OFFSET(0),
        width: TILE_WIDTH(2),
        height: TILE_WIDTH(CROP_COUNT),
        sliceX: CROP_TOTAL_ANIM_FRAMES,
		sliceY: CROP_COUNT,
		"anims" : {
            "carrot_raw": RAW(CROP_LOC.CARROT),
            "carrot_picked": PICKED(CROP_LOC.CARROT),
            "tomato_raw": RAW(CROP_LOC.TOMATO),
            "tomato_picked": PICKED(CROP_LOC.TOMATO),
            "opix_raw": RAW(CROP_LOC.OPIX),
            "opix_picked": PICKED(CROP_LOC.OPIX),
            "petra_raw": RAW(CROP_LOC.PETRA),
            "petra_picked": PICKED(CROP_LOC.PETRA),
            "sluck_raw": RAW(CROP_LOC.SLUCK),
            "sluck_picked": PICKED(CROP_LOC.SLUCK),
            "chosp_raw": RAW(CROP_LOC.CHOSP),
            "chosp_picked": PICKED(CROP_LOC.CHOSP),
        }
    }
})


function crop(cropVariety) {
/********************* Properties *********************/

    const variety = cropVariety; // this is a string

    let picked = false;

    return {
/********************* Setup *********************/
        id: "crop",

        add() {
            PLAYER.await_spawn.then(() => {
                k.onKeyPress("e", () => {
                    if (!picked && this.isColliding(PLAYER.comp)) {
                        PLAYER.give(this.harvest())
                    }
                })
            })
        },

        harvest() {
            if (picked)
                return null
            
            picked = true
            this.play(variety + "_picked")

            return new ItemInstance(ITEM_IDS.crops[variety])
        }
    }

}


/********************* Exports *********************/

export {
    crop,
    CROPS, CROP_COUNT,
    // TODO: don't export these, move crop items to their own file
    CROP_TOTAL_ANIM_FRAMES, CROP_LOC,
}