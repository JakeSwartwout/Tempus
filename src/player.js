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

// a component to add to make someone the player
function player() {

/********************* Player Properties *********************/

    const PLAYER_SPEED = 60 * MANUAL_ART_SCALE;

    let lastDir = k.vec2(0,1)

    let isDead = false

    let inventory = new Inventory("basket_inventory", 5,3, 18,5)


    return {
/********************* Player Setup *********************/
        id: "player",

        add() {
            k.onKeyDown(["left", "right", "up", "down"], () => {
                if (isDead)
                    return
                if (inventory && inventory.showing)
                    return
                
                // Left
                if(k.isKeyDown("left") && !k.isKeyDown("right"))
                    lastDir.x = -1
                // Neither
                else if (!k.isKeyDown("left") && !k.isKeyDown("right"))
                    lastDir.x = 0
                // Right
                else if (!k.isKeyDown("left") && k.isKeyDown("right"))
                    lastDir.x = 1
                // Both
                else {
                    // don't update
                }

                // Up
                if(k.isKeyDown("up") && !k.isKeyDown("down"))
                    lastDir.y = -1
                // Neither
                else if (!k.isKeyDown("up") && !k.isKeyDown("down"))
                    lastDir.y = 0
                // Down
                else if (!k.isKeyDown("up") && k.isKeyDown("down"))
                    lastDir.y = 1
                // Both
                else {
                    // don't update
                }

                this.faceInDir()

                // get the directions
                let motion = k.vec2(lastDir.x, lastDir.y)
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

                this.move(motion)
            })

            k.onKeyPress("i", () => {
                if (inventory)
                    inventory.toggle_show()
            })

            // technically the camera can follow you, but the tiles split up
            // player.onUpdate(() => {
            //     camPos(player.pos)
            // })

            k.onClick(() => {
                addKaboom(mousePos())
                if(isDead){
                    this.play("facing")
                    this.faceInDir(lastDir)
                    this.flipX(false)
                    isDead = false
                }
                // else
                //     this.kill()
            })
        },

/********************* Player Functions *********************/

        kill() {
            isDead = true
            this.quad = k.quad(0,0,1,1)
            this.flipX(lastDir.x < 0)
            this.play("death")
        },

        give(itemInstance) {
            if(!inventory.addItem(itemInstance)) {
                // TODO:
                // dropItem(object)
                debug.log("Can't fit new object: " + itemInstance.itemInfo.name)
            }
        },

        faceInDir() {
            // quad works in terms of which slices
            this.quad = k.quad(lastDir.x+1, lastDir.y+1, 1, 1)
        }
    }

}


/** TO FIX: make into a singleton */
const getPlayer = function() {
    return k.get("player")[0]
}

/********************* Exports *********************/

export { player, getPlayer }