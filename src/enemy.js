import { k, MANUAL_ART_SCALE, TILE_OFFSET, TILE_WIDTH, TOPDOWN_VERT_SCALING } from "./kaboom_globals.js"
import { PLAYER } from "./Player.js";

/********************* Sprites *********************/

const BOUNCE_SPEED = 5

k.loadSpriteAtlas("sprites/tsoka_atlas.png", {
    "enemy": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(4),
        sliceX: 4,
		sliceY: 4,
        "anims" : {
            "facing": 0, // use quad to pick the direction
            "idle" : {
                from: 12,
                to: 15,
                loop: true,
                // pingpong: true, // ping pong is not actually implemented
                speed: BOUNCE_SPEED,
            },
		}
    }
})


function enemy() {

/********************* Properties *********************/

    const ENEMY_SPEED = 20 * MANUAL_ART_SCALE;

    // which way was it facing last
    let last_dir = k.vec2(0, 0)

    const WALK_WAIT_inFRAMES = 250
    let walk_wait_frames_passed = Math.random() * WALK_WAIT_inFRAMES
    const WALK_TIME_inFRAMES = 50
    let walk_time_frames_passed = 0

    return {
/********************* Setup *********************/
        id: "enemy",

        add() {
            this.onCollide("player", () => {
                PLAYER.kill()
            })
        },

        update() {
            // waiting
            if (walk_wait_frames_passed < WALK_WAIT_inFRAMES) {
                walk_wait_frames_passed++
                if (walk_wait_frames_passed >= WALK_WAIT_inFRAMES) {
                    // start the walking animation
                    walk_time_frames_passed = 0
                    // choose a direction
                    let dir = k.randi(8)
                    switch(dir) {
                        // up
                        case 0:
                        case 1:
                        case 2:
                            last_dir = k.vec2(dir - 1, -1)
                            break;
                        // down
                        case 3:
                        case 4:
                        case 5:
                            last_dir = k.vec2(dir - 4, 1)
                            break;
                        // left
                        case 6:
                            last_dir = k.vec2(-1, 0)
                            break;
                        // right
                        case 7:
                            last_dir = k.vec2(1, 0)
                            break;
                        // impossible, just stay still
                        default:
                            last_dir = k.vec2(0, 0)
                    }
                    // use the sprite for the direction we're facing
                    this.play("facing")
                    this.quad = k.quad(last_dir.x+1, last_dir.y+1, 1, 1)
                    this.flipX(false);
                } // if (start walking)
            } // if (waiting)
            // walking
            else if (walk_time_frames_passed < WALK_TIME_inFRAMES) {
                walk_time_frames_passed++
                if (walk_time_frames_passed >= WALK_TIME_inFRAMES) {
                    // start the waiting animation
                    walk_wait_frames_passed = 0
                    this.play("idle")
                    this.quad = k.quad(0,0,1,1)
                    this.flipX(last_dir.x < 0)
                }
                // get the directions
                let motion = last_dir
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
                walk_time_frames_passed = 0
                walk_wait_frames_passed = 0
            }
        },

        kill() {
            destroy(this)
        }
    }

}


/********************* Exports *********************/

export { enemy }