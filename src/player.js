import { k, TILE_WIDTH, TILE_OFFSET, TOPDOWN_VERT_SCALING, MANUAL_ART_SCALE } from "./kaboom_globals.js"


/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/player_atlas.png", {
    "player_facing": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(3),
        height: TILE_WIDTH(3),
        sliceX: 3,
		sliceY: 3,
		"anims" : {
            // do this with quad instead?
			"00" : 0,
			"10" : 1,
			"20" : 2,
			"01" : 3,
			"11" : 4,
			"21" : 5,
			"02" : 6,
			"12" : 7,
			"22" : 8,
		}
    },
    "player_death": {
        x: TILE_OFFSET(0),
        y: TILE_OFFSET(3),
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(1),
        sliceX: 4,
        "anims" : {
            "death": { from: 0, to: 3, loop: false, pingpong: false }
        }
    }
})

// a component to add to make someone the player
function player() {

/********************* Player Properties *********************/

    const PLAYER_SPEED = 60 * MANUAL_ART_SCALE;

    // which way we were facing last
    /*     ^
        00 10 20
      < 01 11 21 >
        02 12 22
           v
    */
    let lastDir = "11"

    let isDead = false


    return {
/********************* Player Setup *********************/
        id: "player",

        add() {
            k.onKeyDown(["left", "right", "up", "down"], () => {
                if (isDead)
                    return

                let horiz
                // Left
                if(k.isKeyDown("left") && !k.isKeyDown("right"))
                    horiz = "0"
                // Neither
                else if (!k.isKeyDown("left") && !k.isKeyDown("right"))
                    horiz = "1"
                // Right
                else if (!k.isKeyDown("left") && k.isKeyDown("right"))
                    horiz = "2"
                // Both
                else
                    horiz = lastDir[0]

                let vert
                // Up
                if(k.isKeyDown("up") && !k.isKeyDown("down"))
                    vert = "0"
                // Neither
                else if (!k.isKeyDown("up") && !k.isKeyDown("down"))
                    vert = "1"
                // Down
                else if (!k.isKeyDown("up") && k.isKeyDown("down"))
                    vert = "2"
                // Both
                else
                    vert = lastDir[1]

                // join the two into our direction string
                lastDir = horiz + vert
                this.use(sprite("player_facing"))
                this.play(lastDir)

                // get the directions
                let motion = k.vec2(horiz-1, vert-1)
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

            // technically the camera can follow you, but the tiles split up
            // player.onUpdate(() => {
            //     camPos(player.pos)
            // })

            k.onClick(() => {
                addKaboom(mousePos())
                if(isDead){
                    this.use(sprite("player_facing"))
                    isDead = false
                }
                // else
                //     this.kill()
            })
        },

/********************* Player Functions *********************/

        kill() {
            isDead = true
            this.use(sprite("player_death"))
            this.play("death")
        },

        give(object) {
            debug.log("got object!")
            // this.inventory.add(object)
        },
    }

}


/** TO FIX: make into a singleton */
const getPlayer = function() {
    return k.get("player")[0]
}

/********************* Exports *********************/

export { player, getPlayer }