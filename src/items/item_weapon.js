import { ITEM_IDS, DEFINE_ITEM, NOT_STACKABLE } from "./ItemInfo.js"

import { WEAPONS } from "../Entities/Weapon.js"


ITEM_IDS.weapons = {}

for (let weapon in WEAPONS) {
    sprite_name = WEAPONS[weapon]
    ITEM_IDS.weapons[WEAPONS[weapon]] = DEFINE_ITEM(WEAPONS[weapon], NOT_STACKABLE, sprite_name, [])
}