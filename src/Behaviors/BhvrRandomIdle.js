import { MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING, k } from "../kaboom_globals";
import { Behavior } from "./Behavior";



/********************* Constants *********************/

const WALK_SPEED = 20 * MANUAL_ART_SCALE
const WALK_WAIT_inFRAMES = 250
const WALK_TIME_inFRAMES = 50



/********************* Behavior: RandomIdle *********************/

export class BhvrRandomIdle extends Behavior {
    constructor() {
        super("RandomIdle")
        // which way was it facing last
        this.last_dir = k.vec2(0, 0)
    
        this.walk_wait_frames_passed = Math.random() * WALK_WAIT_inFRAMES
        this.walk_time_frames_passed = 0
    }

    update(component) {
        // Waiting
        if (this.walk_wait_frames_passed < WALK_WAIT_inFRAMES) {
            this.walk_wait_frames_passed++
            if (this.walk_wait_frames_passed >= WALK_WAIT_inFRAMES) {
                // start the walking animation
                this.walk_time_frames_passed = 0
                // choose a direction
                let dir = k.randi(8)
                switch(dir) {
                    // up
                    case 0:
                    case 1:
                    case 2:
                        this.last_dir = k.vec2(dir - 1, -1)
                        break;
                    // down
                    case 3:
                    case 4:
                    case 5:
                        this.last_dir = k.vec2(dir - 4, 1)
                        break;
                    // left
                    case 6:
                        this.last_dir = k.vec2(-1, 0)
                        break;
                    // right
                    case 7:
                        this.last_dir = k.vec2(1, 0)
                        break;
                    // impossible, just stay still
                    default:
                        this.last_dir = k.vec2(0, 0)
                }
                // use the sprite for the direction we're facing
                component.play("facing")
                component.quad = k.quad(this.last_dir.x+1, this.last_dir.y+1, 1, 1)
                component.flipX(false);
            } // if (start walking)
        } // if (waiting)
        // walking
        else if (this.walk_time_frames_passed < WALK_TIME_inFRAMES) {
            this.walk_time_frames_passed++
            if (this.walk_time_frames_passed >= WALK_TIME_inFRAMES) {
                // start the waiting animation
                this.walk_wait_frames_passed = 0
                component.play("idle")
                component.quad = k.quad(0,0,1,1)
                component.flipX(this.last_dir.x < 0)
            }
            // get the directions
            let motion = this.last_dir
            if (motion.len() == 0)
                return;
            // always move at SPEED total speed
            motion = motion.unit().scale(WALK_SPEED)
            // scale the vertical direction to give the feeling of perspective
            motion = motion.scale(1, TOPDOWN_VERT_SCALING)
            component.move(motion)
        } // if (walking)
        // error, reset to get back to a good state
        else {
            this.walk_time_frames_passed = 0
            this.walk_wait_frames_passed = 0
        }
    }
}