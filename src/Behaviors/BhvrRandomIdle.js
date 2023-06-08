import { BAD_DEFAULT, MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING, k } from "../kaboom_globals";
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

    update() {
        if (this.walk_wait_frames_passed < WALK_WAIT_inFRAMES) {
            this.wait()
        }
        else if (this.walk_time_frames_passed < WALK_TIME_inFRAMES) {
            this.walk()
        }
        else {
            BAD_DEFAULT("" + this.walk_time_frames_passed + ", " + this.walk_wait_frames_passed, "BhvrRandomIdle::update")
        }
    }

    wait() {
        this.walk_wait_frames_passed++
        if (this.walk_wait_frames_passed >= WALK_WAIT_inFRAMES) {
            this.startWalking()
        }
    }

    startWalking() {
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
        this.enableIdle(false)
    }

    walk() {
        this.walk_time_frames_passed++
        if (this.walk_time_frames_passed >= WALK_TIME_inFRAMES) {
            this.startWaiting()
        } else {
            // get the directions
            let motion = this.last_dir
            if (motion.len() == 0)
                return;
            // always move at SPEED total speed
            motion = motion.unit().scale(WALK_SPEED)
            // scale the vertical direction to give the feeling of perspective
            motion = motion.scale(1, TOPDOWN_VERT_SCALING)
            this.component.move(motion)
        }
    }

    startWaiting() {
        this.walk_wait_frames_passed = 0
        this.enableIdle(true)
    }

    enableIdle(shouldEnable) {
        if(shouldEnable) {
            this.component.play("idle")
            this.component.quad = k.quad(0,0,1,1)
            this.component.flipX(this.last_dir.x < 0)
        } else {
            // use the sprite for the direction we're facing
            this.component.play("facing")
            this.component.quad = k.quad(this.last_dir.x+1, this.last_dir.y+1, 1, 1)
            this.component.flipX(false);
        }
    }

    interrupt() {
        this.startWaiting()
    }
}