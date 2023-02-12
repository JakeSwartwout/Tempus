import { k, MANUAL_ART_SCALE, TILE_OFFSET, TILE_WIDTH } from "./kaboom_globals.js"
import { getPlayer } from "./player.js"


/********************* Sprites *********************/

const CROPS = {
    CARROT : 0,
    TOMATO : 1,
    OPIX : 2,
    PETRA : 3,
    SLUCK : 4,
    CHOSP : 5,

    COUNT : 6
}
const CROP_NAMES = new Array(CROPS.COUNT).fill("")
CROP_NAMES[CROPS.CARROT ] = "carrot"
CROP_NAMES[CROPS.TOMATO ] = "tomato"
CROP_NAMES[CROPS.OPIX   ] = "opix"
CROP_NAMES[CROPS.PETRA  ] = "petra"
CROP_NAMES[CROPS.SLUCK  ] = "sluck"
CROP_NAMES[CROPS.CHOSP  ] = "chosp"

const RAW_ANIMATION_FRAMES = 1
const PICKED_ANIMATION_FRAMES = 1
const TOTAL_ANIM_FRAMES = RAW_ANIMATION_FRAMES + PICKED_ANIMATION_FRAMES

const RAW = function(plant) {
    return TOTAL_ANIM_FRAMES * plant
    // return {from: , to: }
}
const PICKED = function(plant) {
    return TOTAL_ANIM_FRAMES * plant + RAW_ANIMATION_FRAMES
    // return {from: , to: }
}

k.loadSpriteAtlas("sprites/crops_atlas.png", {
    "crop": {
        x: TILE_OFFSET(0),
        y: TILE_OFFSET(0),
        width: TILE_WIDTH(2),
        height: TILE_WIDTH(CROPS.COUNT),
        sliceX: TOTAL_ANIM_FRAMES,
		sliceY: CROPS.COUNT,
		"anims" : {
            "carrot_raw": RAW(CROPS.CARROT),
            "carrot_picked": PICKED(CROPS.CARROT),
            "tomato_raw": RAW(CROPS.TOMATO),
            "tomato_picked": PICKED(CROPS.TOMATO),
            "opix_raw": RAW(CROPS.OPIX),
            "opix_picked": PICKED(CROPS.OPIX),
            "petra_raw": RAW(CROPS.PETRA),
            "petra_picked": PICKED(CROPS.PETRA),
            "sluck_raw": RAW(CROPS.SLUCK),
            "sluck_picked": PICKED(CROPS.SLUCK),
            "chosp_raw": RAW(CROPS.CHOSP),
            "chosp_picked": PICKED(CROPS.CHOSP),
        }
    },
    "veggie": {
        x: TILE_OFFSET(TOTAL_ANIM_FRAMES),
        y: TILE_OFFSET(0),
        width: TILE_WIDTH(1),
        height: TILE_WIDTH(6),
        sliceY: 6,
        "anims" : {
            "carrot": CROPS.CARROT,
            "tomato": CROPS.TOMATO,
            "opix": CROPS.OPIX,
            "petra": CROPS.PETRA,
            "sluck": CROPS.SLUCK,
            "chosp": CROPS.CHOSP,
		}
    }
})

// a component to add to make someone the player
function crop(cropVariety) {

/********************* Properties *********************/

    const variety = cropVariety;

    let picked = false;

    return {
/********************* Setup *********************/
        id: "crop",

        add() {
            let playerRef = getPlayer()
            k.onKeyPress("e", () => {
                if (!this.picked && this.isColliding(playerRef)) {
                    playerRef.give(this.harvest())
                }
            })
        },

        harvest() {
            if (this.picked)
                return null
            
            this.picked = true
            this.play(CROP_NAMES[variety] + "_picked")
        }
    }

}


/********************* Exports *********************/

export { crop, CROPS, CROP_NAMES }