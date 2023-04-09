import { Inventory } from "./items/Inventory.js";
import { k, TILE_WIDTH, TILE_OFFSET, TOPDOWN_VERT_SCALING, MANUAL_ART_SCALE, ART_SIZE } from "./kaboom_globals.js"


/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/player_atlas.png", {
    "player": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(4),
        sliceX: 4,
        sliceY: 4,
        "anims" : {
            "facing": 0, // use quad to pick the right direction
            "death": { from: 12, to: 15, loop: false, pingpong: false },
        }
    }
})


/********************* Player Properties *********************/

const PLAYER_SPEED = 60 * MANUAL_ART_SCALE;
const PLAYER_NAME = "Chay"


/********************* Player Class (singleton) *********************/

class Player {
    constructor() {
        this.lastDir = k.vec2(0,1)
        this.isDead = false
        this.inventory = new Inventory("basket_inventory", 5,3, 18,5)
        this.comp = null
        this.awaitSpawn = new Promise((resolve) => {
            this.spawn_complete = resolve
        })
    }

    kill() {
        this.isDead = true
        if (this.missing()) return
        this.comp.quad = k.quad(0,0,1,1)
        this.comp.flipX(this.lastDir.x < 0)
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
        this.comp.quad = k.quad(this.lastDir.x+1, this.lastDir.y+1, 1, 1)
    }

    missing() {
        return this.comp == null
    }

/********************* Player Component *********************/
    build(spawnPoint) {
        this.comp = k.add([
            "player",
            sprite("player", {anim: "facing", quad: k.quad(this.lastDir.x+1, this.lastDir.y+1, 1, 1)}),
            scale(MANUAL_ART_SCALE),
            area({width: 8, height: 10, offset: k.vec2(0, 4*MANUAL_ART_SCALE)}), // collision checking
            solid(), // collision stopping
            origin("center"),
            pos(spawnPoint),
            // stay(), // persist across scenes
            // health(), // deals with hp
        ])
        // link up other listener events
        k.onKeyDown(["left", "right", "up", "down"], () => {
            if (this.isDead)
                return
            if (this.inventory && this.inventory.showing)
                return
            
            // Left
            if(k.isKeyDown("left") && !k.isKeyDown("right")) {
                this.lastDir.x = -1
            // Neither
            } else if (!k.isKeyDown("left") && !k.isKeyDown("right")) {
                this.lastDir.x = 0
            // Right
            } else if (!k.isKeyDown("left") && k.isKeyDown("right")) {
                this.lastDir.x = 1
            // Both
            } else {
                // don't update
            }

            // Up
            if(k.isKeyDown("up") && !k.isKeyDown("down")) {
                this.lastDir.y = -1
            // Neither
            } else if (!k.isKeyDown("up") && !k.isKeyDown("down")) {
                this.lastDir.y = 0
            // Down
            } else if (!k.isKeyDown("up") && k.isKeyDown("down")) {
                this.lastDir.y = 1
            // Both
            } else {
                // don't update
            }

            this.faceInDir()

            // get the directions
            let motion = k.vec2(this.lastDir)
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

        k.onKeyPress("i", () => {
            if (this.inventory)
                this.inventory.toggle_show()
        })

        // technically the camera can follow you, but the tiles split up
        // player.onUpdate(() => {
        //     camPos(player.pos)
        // })

        k.onClick(() => {
            addKaboom(mousePos())
            if(this.isDead){
                this.isDead = false
                if (this.missing()) return
                this.comp.play("facing")
                this.faceInDir(this.lastDir)
                this.comp.flipX(false)
            }
            // else
            //     this.kill()
        })

        this.spawn_complete()
        
        // when the scene gets unloaded
        this.comp.onDestroy(() => {
            this.comp = null
            this.awaitSpawn = new Promise((resolve) => {
                this.spawn_complete = resolve
            })
        })

        return this.comp
    }

}

const PLAYER = new Player()


/********************* Exports *********************/

export { PLAYER, PLAYER_NAME }