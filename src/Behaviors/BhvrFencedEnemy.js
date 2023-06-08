import { SCENE_HEIGHT, SCENE_WIDTH } from "../Scenes/scene_globals";
import { UNITS, k } from "../kaboom_globals";
import { Behavior } from "./Behavior";
import { BhvrPushable } from "./BhvrPushable";
import { BhvrRandomIdle } from "./BhvrRandomIdle";



/********************* Constants *********************/

// just hardcode the boundaries for now
const TOP_BOUNDARY = 2.7 * UNITS
const BOTTOM_BOUNDARY = (SCENE_HEIGHT - 1.1) * UNITS
const LEFT_BOUNDARY = 2 * UNITS
const RIGHT_BOUNDARY = (SCENE_WIDTH - 2) * UNITS


/********************* Behavior: BhvrFencedEnemy *********************/

export class BhvrFencedEnemy extends Behavior {
    constructor() {
        let pushable = new BhvrPushable(new BhvrRandomIdle())
        super("FencedEnemy(" + pushable.explanation + ")")
        this.pushable = pushable
        console.log(this.explanation)

        this.pushable.idleBehavior.chooseRandomDir = this.chooseRandomDir
    }

    refComponent(component) {
        super.refComponent(component)
        this.pushable.refComponent(component)
    }
    
    chooseRandomDir() {
        let pos = this.component.pos

        let y_dir = 0
        if (pos.y <= TOP_BOUNDARY) {
            y_dir = 1
        } else if (pos.y < TOP_BOUNDARY + UNITS) {
            y_dir = k.randi(2) // 0 or 1
        } else if (pos.y >= BOTTOM_BOUNDARY) {
            y_dir = -1
        } else if (pos.y > BOTTOM_BOUNDARY - UNITS) {
            y_dir = -1 * k.randi(2) // -1 or 0
        } else {
            y_dir = k.randi(3) - 1 // -1, 0, or 1
        }

        let x_dir = 0
        if (pos.x <= LEFT_BOUNDARY) {
            x_dir = 1
        } else if (pos.x < LEFT_BOUNDARY + UNITS) {
            if (y_dir == 0) {
                // don't want 0,0 movement
                x_dir = 1
            } else {
                x_dir = k.randi(2) // 0 or 1
            }
        } else if (pos.x > RIGHT_BOUNDARY - UNITS) {
            // run away once far enough
            x_dir = 1
        } else {
            // don't want 0,0 movement
            if (y_dir == 0) {
                x_dir = k.randi(2)*2 -1 // -1 or 1
            } else {
                x_dir = k.randi(3) -1 // -1, 0, or 1
            }
        }

        this.last_dir = k.vec2(x_dir, y_dir)
    }

    update() {
        this.pushable.update()

        // constrain the position
        let pos = this.component.pos
        if(pos.x < LEFT_BOUNDARY) {
            pos.x = LEFT_BOUNDARY
        }
        if(pos.y < TOP_BOUNDARY) {
            pos.y = TOP_BOUNDARY
        } else if (pos.y > BOTTOM_BOUNDARY) {
            pos.y = BOTTOM_BOUNDARY
        }
    }

    push_back(dir) {
        this.pushable.push_back(dir)
    }
}