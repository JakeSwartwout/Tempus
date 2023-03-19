import { k, TILE_OFFSET, TILE_WIDTH } from "../kaboom_globals.js"
import { ITEM_INFOS, ITEM_IDS, DEFINE_ITEM } from "./ItemInfo.js"

import { CROPS, CROP_LOC, CROP_TOTAL_ANIM_FRAMES } from "../crops.js"


// let crop_states = {
//     "fresh": {...},
//     "stale": {...},
//     "rotten": {...},
// }

ITEM_IDS.crops = {}

for (let crop in CROPS) {
    crop_sprite_name = CROPS[crop] + "_obj"
    possible_anims = []// crop_states.keys
    ITEM_IDS.crops[CROPS[crop]] = DEFINE_ITEM(CROPS[crop], true, crop_sprite_name, possible_anims)
}

let crop_atlas_data = {}
for (let crop in CROPS) {
    crop_item = ITEM_INFOS[ITEM_IDS.crops[CROPS[crop]]]
    crop_atlas_data[crop_item.sprite] = {
        x: TILE_OFFSET(CROP_TOTAL_ANIM_FRAMES),
        y: TILE_OFFSET(CROP_LOC[crop]),
        sliceX: 1,
        width: TILE_WIDTH(1),
        height: TILE_WIDTH(1),
        // "anims": crop_states,
    }
}
k.loadSpriteAtlas("sprites/crops_atlas.png", crop_atlas_data)