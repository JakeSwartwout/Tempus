import { k, TILE_WIDTH, TOPDOWN_VERT_SCALING, MANUAL_ART_SCALE } from "../kaboom_globals.js"
import { Inventory } from "../Items/Inventory.js";


/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/player_atlas.png", {
    "player": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(5),
        sliceX: 4,
        sliceY: 5,
        "anims" : {
            "facing": 0, // use quad to pick the right direction
            "idle": { from: 12, to: 15, loop: true, pingpong: false },
            "death": { from: 16, to: 19, loop: false, pingpong: false, speed: 6 },
        }
    }
})


/********************* Player Properties *********************/

const PLAYER_SPEED = 60 * MANUAL_ART_SCALE;
const PLAYER_NAME = "Chay"

const WALK_KEYS = ["left", "right", "up", "down"]


/********************* Player Class (singleton) *********************/

class Player {
    constructor() {
        this.last_dir = k.vec2(0,1)
        this.is_dead = false
        this.inventory = new Inventory("basket_inventory", 5,3, 18,5)
        this.comp = null
        this.weapon_comp = null
        this.await_spawn = new Promise((resolve) => {
            this.spawnComplete = resolve
        })
    }

    kill() {
        this.is_dead = true
        if (this.missing()) return
        this.comp.quad = k.quad(0,0,1,1)
        this.comp.flipX(this.last_dir.x < 0)
        this.comp.play("death")
    }

    give(itemInstance) {
        if(!this.inventory.addItem(itemInstance)) {
            // TODO:
            // dropItem(object)
            debug.log("Can't fit new object: " + itemInstance.itemInfo.name)
        }
    }

    faceInDir() {
        if (this.missing()) return
        // quad works in terms of which slices
        this.comp.quad = k.quad(this.last_dir.x+1, this.last_dir.y+1, 1, 1)
        if(this.weapon_missing()) return
        this.weapon_comp.update_angle(this.last_dir)
    }

    idleInDir(be_idle) {
        if (this.missing()) return
        if(be_idle) {
            this.comp.quad = k.quad(0,0,1,1)
            this.comp.flipX(this.last_dir.x < 0)
            this.comp.play("idle")
        } else {
            this.comp.flipX(false)
            this.comp.play("facing")
        }
    }

    missing() {
        return this.comp == null
    }

    weapon_missing() {
        return this.weapon_comp == null
    }

    buildWeapon() {
        if(this.missing() || this.weapon_comp)
            return

        let weapon = this.inventory.getEquipped()
        if(weapon) {
            this.weapon_comp = weapon.build(this.comp)
            this.weapon_comp.update_angle(this.last_dir)
        }
    }

/********************* Player Component *********************/
    build(spawnPoint) {
        this.comp = k.add([
            "player",
            // sprite("player", {anim: "idle"}),
            sprite("player", {anim: "facing", quad: k.quad(this.last_dir.x+1, this.last_dir.y+1, 1, 1)}),
            scale(MANUAL_ART_SCALE),
            area({width: 8, height: 10, offset: k.vec2(0, 4*MANUAL_ART_SCALE)}), // collision checking
            solid(), // collision stopping
            origin("center"),
            pos(spawnPoint),
            // stay(), // persist across scenes
            // health(), // deals with hp
        ])

        this.buildWeapon()

        // link up other listener events
        k.onKeyDown(WALK_KEYS, () => {
            if (this.is_dead)
                return
            if (this.inventory && this.inventory.showing)
                return
            
            // Left
            if(k.isKeyDown("left") && !k.isKeyDown("right")) {
                this.last_dir.x = -1
            // Neither
            } else if (!k.isKeyDown("left") && !k.isKeyDown("right")) {
                this.last_dir.x = 0
            // Right
            } else if (!k.isKeyDown("left") && k.isKeyDown("right")) {
                this.last_dir.x = 1
            // Both
            } else {
                // don't update
            }

            // Up
            if(k.isKeyDown("up") && !k.isKeyDown("down")) {
                this.last_dir.y = -1
            // Neither
            } else if (!k.isKeyDown("up") && !k.isKeyDown("down")) {
                this.last_dir.y = 0
            // Down
            } else if (!k.isKeyDown("up") && k.isKeyDown("down")) {
                this.last_dir.y = 1
            // Both
            } else {
                // don't update
            }

            this.faceInDir()

            // get the directions
            let motion = k.vec2(this.last_dir)
            if (motion.len() == 0)
                return;
            // always move at SPEED total speed
            motion = motion.unit().scale(PLAYER_SPEED)
            // scale the vertical direction to give the feeling of perspective
            motion = motion.scale(1, TOPDOWN_VERT_SCALING)
            // since this is called for every key pressed, scale down by the number pressed
            let numDown = 0
                + (k.isKeyDown("up") ? 1 : 0)
                + (k.isKeyDown("down") ? 1 : 0)
                + (k.isKeyDown("left") ? 1 : 0)
                + (k.isKeyDown("right") ? 1 : 0)
            motion = motion.scale(1/numDown)

            this.comp.move(motion)
        })

        // k.onKeyRelease(WALK_KEYS, () => {
        //     for(let key in WALK_KEYS){
        //         if(k.isKeyDown(key)){
        //             // this.idleInDir(false)
        //             return
        //         }
        //     }
        //     this.idleInDir(true)
        // })
        // k.onKeyDown(WALK_KEYS, () => {
        //     this.idleInDir(false)
        // })

        k.onKeyPress("i", () => {
            if (this.inventory)
                this.inventory.toggle_show()
        })

        k.onKeyPress("d", () => {
            if (this.weapon_comp) {
                this.weapon_comp.attack(this.last_dir.unit())
            }
        })

        // technically the camera can follow you, but the tiles split up
        // player.onUpdate(() => {
        //     camPos(player.pos)
        // })

        k.onClick(() => {
            addKaboom(mousePos())
            if(this.is_dead){
                this.is_dead = false
                if (this.missing()) return
                this.comp.play("facing")
                this.faceInDir(this.last_dir)
                this.comp.flipX(false)
            }
            // else
            //     this.kill()
        })

        this.spawnComplete()
        
        // when the scene gets unloaded
        this.comp.onDestroy(() => {
            this.comp = null
            this.await_spawn = new Promise((resolve) => {
                this.spawnComplete = resolve
            })
        })

        return this.comp
    }
}

const PLAYER = new Player()


/********************* Exports *********************/

export { PLAYER, PLAYER_NAME }