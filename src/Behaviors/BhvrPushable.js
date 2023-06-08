import { MANUAL_ART_SCALE } from "../kaboom_globals";
import { Behavior } from "./Behavior";



/********************* Constants *********************/

const PUSH_SPEED = 20 * MANUAL_ART_SCALE
const PUSH_FRAMES = 25



/********************* Behavior: Pushable *********************/

export class BhvrPushable extends Behavior {
    constructor(idleBehavior) {
        super("Pushable(" + idleBehavior.explanation + ")")
        this.idleBehavior = idleBehavior
        this.push_time = 0
        this.push_amount = null
    }

    update(component) {
        // getting pushed
        if (this.push_amount != null) {
            component.move(this.push_amount)
            if(this.push_time++ > PUSH_FRAMES){
                this.push_amount = null
            }
        // idle
        } else {
            this.idleBehavior.update(component)
        }
    }

    push_back(dir) {
        if(this.push_amount) return
        this.push_time = 0
        this.push_amount = dir.unit().scale(PUSH_SPEED)
    }
}