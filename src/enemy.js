import { k, MANUAL_ART_SCALE, TILE_OFFSET, TILE_WIDTH, TOPDOWN_VERT_SCALING } from "./kaboom_globals.js"

/********************* Sprites *********************/

const BOUNCE_SPEED = 5

k.loadSpriteAtlas("sprites/enemy_atlas.png", {
    "enemy_facing": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(3),
        height: TILE_WIDTH(3),
        sliceX: 3,
		sliceY: 3,
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
        }
    },
    "enemy_idle": {
        x: TILE_OFFSET(0),
        y: TILE_OFFSET(3),
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(1),
        sliceX: 4,
        "anims" : {
            "idle_right" : {
                from: 0,
                to: 3,
                loop: true,
                // pingpong: true, // ping pong is not actually implemented
                speed: BOUNCE_SPEED,
            }
		}
    }
})


function enemy() {

/********************* Properties *********************/

    const ENEMY_SPEED = 20 * MANUAL_ART_SCALE;

    // which way was it facing last
    let lastDir = k.vec2(0, 0)

    const WALK_WAIT_inFRAMES = 250
    let walkWaitFramesPassed = 0
    const WALK_TIME_inFRAMES = 50
    let walkTimeFramesPassed = 0

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
            // waiting
            if (walkWaitFramesPassed < WALK_WAIT_inFRAMES) {
                walkWaitFramesPassed++
                if (walkWaitFramesPassed == WALK_WAIT_inFRAMES) {
                    walkTimeFramesPassed = 0
                    // choose a direction
                    let dir = k.randi(8)
                    switch(dir) {
                        // up
                        case 0:
                        case 1:
                        case 2:
                            lastDir = k.vec2(dir - 1, -1)
                            break;
                        // down
                        case 3:
                        case 4:
                        case 5:
                            lastDir = k.vec2(dir - 4, 1)
                            break;
                        // left
                        case 6:
                            lastDir = k.vec2(-1, 0)
                            break;
                        // right
                        case 7:
                            lastDir = k.vec2(1, 0)
                            break;
                        // impossible, just stay still
                        default:
                            lastDir = k.vec2(0, 0)
                    }
                    animName = "walk_" + (lastDir.x+1) + "" + (lastDir.y+1)
                    this.use(sprite("enemy_facing", {anim: animName}))
                }
            } // if (waiting)
            // walking
            else if (walkTimeFramesPassed < WALK_TIME_inFRAMES) {
                walkTimeFramesPassed++
                if (walkTimeFramesPassed == WALK_TIME_inFRAMES) {
                    walkWaitFramesPassed = 0
                    this.use(sprite("enemy_idle", {anim: "idle_right", flipX: lastDir.x < 0}))
                }
                // get the directions
                let motion = lastDir
                if (motion.len() == 0)
                    return;
                // always move at SPEED total speed
                motion = motion.unit().scale(ENEMY_SPEED)
                // scale the vertical direction to give the feeling of perspective
                motion = motion.scale(1, TOPDOWN_VERT_SCALING)
                this.move(motion)
            } // if (walking)
            // error, reset to get back to a good state
            else {
                walkTimeFramesPassed = 0
                walkWaitFramesPassed = 0
            }
        },

        kill() {
            destroy(this)
        }
    }

}


/********************* Exports *********************/

export { enemy }