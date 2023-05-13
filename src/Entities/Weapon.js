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

const hitEnemy = function(enemy_comp, dir, damage_level) {
    enemy_comp.hurt(damage_level)
    enemy_comp.push_back(dir)
}

const getEnemyInteraction = function(weapon_type) {
    let damage = 0
    switch(weapon_type) {
        case WEAPONS.RAKE:
            damage = 0
            break;
        case WEAPONS.HOE:
        case WEAPONS.SHOVEL:
            damage = 5
            break;
        case WEAPONS.PICKAXE:
        case WEAPONS.SAW:
            damage = 10
            break;
        default:
            BAD_DEFAULT(weapon_type, ".getEnemyInteraction")
    }
    return (enemy_comp, dir) => {hitEnemy(enemy_comp, dir, damage)}
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



/********************* Attack Methods *********************/
// Taken from the kaboom example: https://kaboomjs.com/doc/19-sprite-atlas

function spin() {
    let spinning = false
    return {
        id: "spin",
        update() {
            if (spinning) {
                this.angle += 1200 * k.dt()
                if (this.angle >= 360) {
                    this.angle = 0
                    spinning = false
                }
            }
        },
        attack() {
            spinning = true
        },
    }
}

// modified from the above

const STAB_DIST = 8 * MANUAL_ART_SCALE
const STAB_STEPS = 15
const INV_STAB_STEPS = 1 / STAB_STEPS

function stab() {
    let stabbing_out = false
    let returning = false
    let orig_offset
    let goal_offset
    let dt_offset
    return {
        id: "stab",
        update() {
            if (stabbing_out) {
                this.follow.offset = this.follow.offset.add(dt_offset)
                if (this.follow.offset.dist(goal_offset) <= 1) {
                    stabbing_out = false
                    returning = true
                }
            } else if (returning) {
                this.follow.offset = this.follow.offset.sub(dt_offset)
                if (this.follow.offset.dist(orig_offset) <= 1) {
                    returning = false
                }
            }
            // could use vec2.lerp?
        },
        attack(dir) {
            stabbing_out = true
            orig_offset = this.follow.offset
            goal_offset = orig_offset.add(dir.scale(STAB_DIST))
            dt_offset = goal_offset.sub(orig_offset).scale(INV_STAB_STEPS)
            this.update_angle(dir)
        },
        update_angle(dir) {
            this.direction = dir
            this.angle = Math.atan2(dir.y, dir.x) * 180/Math.PI + 90
            this.area.offset = dir.unit().scale(8).add(0, 2).scale(MANUAL_ART_SCALE)
        }
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
        let sprite_offset
        let hitbox
        switch(this.weapon_class) {
            case WEAPON_CLASS.ONE_HANDED:
                // TODO: make these different
            case WEAPON_CLASS.TWO_HANDED:
                sprite_offset = k.vec2(0, 3).scale(MANUAL_ART_SCALE)
                break;
        }
        
        this.comp = k.add([
            "weapon",
            k.sprite(this.type),
            k.scale(MANUAL_ART_SCALE),
            k.pos(player_comp.pos.add(sprite_offset)),
            k.follow(player_comp, sprite_offset),
            // don't support shape: 'circle' yet, but that would be ideal
            k.area({width: HALF_ART_SIZE, height: HALF_ART_SIZE}), // will set the area offset later
            k.origin(k.vec2(-.125,.5)),
            k.rotate(0),
            // spin(), // doesn't work with hitboxes yet
            stab(),
            {
                direction: k.vec2(0,0),
            }
        ])

        this.comp.onCollide("enemy", (enemy_comp) => {
            console.log(this.comp.direction)
            this.onHitEnemy(enemy_comp, this.comp.direction)
        })

        return this.comp
    }

}


/********************* Exports *********************/

export {
    WEAPONS,
    Weapon
}