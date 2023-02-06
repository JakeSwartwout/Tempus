import { k, TILE_WIDTH, TOPDOWN_VERT_SCALING } from "./kaboom_globals.js"

const BOUNCE_SPEED = 2

/********************* Sprites *********************/

k.loadSpriteAtlas("sprites/enemy_atlas.png", {
    "enemy": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(3),
        height: TILE_WIDTH(4),
        sliceX: 3,
		sliceY: 4,
		"anims" : {
			"walk_00" : 0,
			"walk_10" : 1,
			"walk_20" : 2,
			"walk_01" : 3,
			"walk_11" : 4,
			"walk_21" : 5,
			"walk_02" : 6,
			"walk_12" : 7,
			"walk_22" : 8,
            "idle_right" : {
                from: 9,
                to: 10,
                loop: true,
                speed: BOUNCE_SPEED,
            }
		}
    }
})

// a component to add to make someone the player
function enemy() {

/********************* Properties *********************/

    const ENEMY_SPEED = 20;

    // which way was it facing last
    /*     ^
        00 10 20
      < 01 11 21 >
        02 12 22
           v
    */
    let lastDir = "11"


    return {
/********************* Setup *********************/
        id: "enemy",

        add() {
            this.onCollide("player", (player) => {
                debug.log("kill!")
                player.kill()
            })
        },

        update() {
            horiz = lastDir[0]
            vert = lastDir[1]
            // join the two into our direction string
            // lastDir = horiz + vert
            // this.play(walk_lastDir)

            // get the directions
            let motion = k.vec2(horiz-1, vert-1)
            if (motion.len() == 0)
                return;
            // always move at SPEED total speed
            motion = motion.unit().scale(ENEMY_SPEED)
            // scale the vertical direction to give the feeling of perspective
            motion = motion.scale(1, TOPDOWN_VERT_SCALING)

            this.move(motion)
        },

        kill() {
            destroy(this)
        }
    }

}


/********************* Exports *********************/

export { enemy }