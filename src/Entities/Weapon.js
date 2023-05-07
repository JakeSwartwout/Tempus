import { ART_SIZE, ART_SPACING, BAD_DEFAULT, k, MANUAL_ART_SCALE, TILE_OFFSET, TILE_WIDTH } from "../kaboom_globals.js"
import { ItemInfo } from "../Items/ItemInfo.js"

/********************* Enums *********************/

const WEAPONS = {
    RAKE        : "Rake",
    HOE         : "Hoe",
    SHOVEL      : "Shovel",
    PICKAXE     : "Pickaxe",
    SAW         : "Saw",
}

const WEAPON_CLASS = {
    ONE_HANDED  : 1,
    TWO_HANDED  : 2,
}

const WEAPON_CLASSES = {
    [WEAPONS.RAKE]        : WEAPON_CLASS.TWO_HANDED,
    [WEAPONS.HOE]         : WEAPON_CLASS.TWO_HANDED,
    [WEAPONS.SHOVEL]      : WEAPON_CLASS.TWO_HANDED,
    [WEAPONS.PICKAXE]     : WEAPON_CLASS.ONE_HANDED,
    [WEAPONS.SAW]         : WEAPON_CLASS.ONE_HANDED,
}

// const RAW_ANIMATION_FRAMES = 1
// const PICKED_ANIMATION_FRAMES = 1
// const CROP_TOTAL_ANIM_FRAMES = RAW_ANIMATION_FRAMES + PICKED_ANIMATION_FRAMES

const HALF_TILE_OFFSET = function(num) {
    return (ART_SIZE / 2 + ART_SPACING) * num;
}

const HALF_ART_SIZE = ART_SIZE / 2;



/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/weapons.png", {
    [WEAPONS.RAKE]: {
        x: HALF_TILE_OFFSET(0),
        y: TILE_OFFSET(0),
        width: HALF_ART_SIZE,
        height: ART_SIZE,
    },
    [WEAPONS.HOE]: {
        x: HALF_TILE_OFFSET(1),
        y: TILE_OFFSET(0),
        width: HALF_ART_SIZE,
        height: ART_SIZE,
    },
    [WEAPONS.SHOVEL]: {
        x: HALF_TILE_OFFSET(2),
        y: TILE_OFFSET(0),
        width: HALF_ART_SIZE,
        height: ART_SIZE,
    },
    [WEAPONS.PICKAXE]: {
        x: HALF_TILE_OFFSET(0),
        y: TILE_OFFSET(1),
        width: HALF_ART_SIZE,
        height: ART_SIZE,
    },
    [WEAPONS.SAW]: {
        x: HALF_TILE_OFFSET(1),
        y: TILE_OFFSET(1),
        width: HALF_ART_SIZE,
        height: ART_SIZE,
    },
})



/********************* Enemy Interactions *********************/

// TODO: actually implement all of these
const pushEnemy = function(enemy_comp) {
    console.log("pushed enemy")
}

const damageEnemy = function(enemy_comp, damage_level) {
    console.log("pushed enemy with damage " + damage_level)
}

const getEnemyInteraction = function(weapon_type) {
    switch(weapon_type) {
        case WEAPONS.RAKE:
            return pushEnemy
        case WEAPONS.HOE:
        case WEAPONS.SHOVEL:
        case WEAPONS.PICKAXE:
        case WEAPONS.SAW:
            return (enemy_comp) => {damageEnemy(enemy_comp, 10)}
        default:
            BAD_DEFAULT(weapon_type, ".getEnemyInteraction")
    }
}



/********************* NPC Interactions *********************/

const threatenNPC = function(npc_comp) {
    console.log("you threaten the npc " + npc_comp.name)
}

const damageNPC = function(npc, damage_level) {
    console.log("you attack the npc " + npc_comp.name)
}

const getNPCInteraction = function(weapon_type) {
    switch(weapon_type) {
        case WEAPONS.RAKE:
        case WEAPONS.HOE:
        case WEAPONS.PICKAXE:
            return threatenNPC
        case WEAPONS.SHOVEL:
        case WEAPONS.SAW:
            return (npc_comp) => {damageNPC(npc_comp, 10)}
        default:
            BAD_DEFAULT(weapon_type, ".getNPCInteraction")
    }
}



/********************* Weapon Class *********************/

class Weapon {
    constructor(weapon) {
        let weapon_type
        if(typeof(weapon) == "string") {
            weapon_type = weapon
        } else if (typeof(weapon) == "object" && weapon instanceof ItemInfo) {
            weapon_type = weapon.name
        } else {
            BAD_DEFAULT(weapon, "Weapon.constructor")
            return
        }
        this.type = weapon_type; // this is a string
        this.weapon_class = WEAPON_CLASSES[weapon_type]
        this.comp = null
        this.onHitEnemy = getEnemyInteraction(weapon_type)
        // TODO: link up NPC interaction
    }

/********************* Weapon Component *********************/
    build(player_comp) {
        let offset
        let hitbox
        switch(this.weapon_class) {
            case WEAPON_CLASS.ONE_HANDED:
                // TODO: make these different
            case WEAPON_CLASS.TWO_HANDED:
                offset = k.vec2(-1, -8).scale(MANUAL_ART_SCALE)
                hitbox = k.area({width: HALF_ART_SIZE, height: ART_SIZE})
                break;
        }
        
        this.comp = k.add([
            "weapon",
            k.sprite(this.type),
            k.scale(MANUAL_ART_SCALE),
            k.pos(player_comp.pos.add(offset)),
            k.follow(player_comp, offset),
            hitbox,
        ])

        this.comp.onCollide("enemy", this.onHitEnemy)

        return this.comp
    }

}


/********************* Exports *********************/

export {
    WEAPONS,
    Weapon
}