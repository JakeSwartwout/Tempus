/********************* Constants *********************/

// Stores info on each type of object that can exist in the game
// the index in the list is the item's ID
let ITEM_INFOS = []
// Object to help find items easier, a nested object structure that stores the ID
let ITEM_IDS = {}

const IS_STACKABLE = true
const NOT_STACKABLE = false



/********************* The base class *********************/
class ItemInfo {
    constructor(ID, unique_readable_name, is_stackable, sprite, possible_anims = []) {
        this.id = ID
        this.name = unique_readable_name
        this.is_stackable = is_stackable
        this.sprite = sprite
        this.possible_anims = possible_anims
    }
}

const DEFINE_ITEM = function(unique_readable_name, is_stackable, sprite, possible_anims = []) {
    // grab the next open ID
    next_id = ITEM_INFOS.length
    ITEM_INFOS[next_id] = new ItemInfo(next_id, unique_readable_name, is_stackable, sprite, possible_anims = [])
    return next_id
}


/********************* Exports *********************/

export {
    ItemInfo,
    ITEM_INFOS, ITEM_IDS,
    DEFINE_ITEM,
    IS_STACKABLE, NOT_STACKABLE
}