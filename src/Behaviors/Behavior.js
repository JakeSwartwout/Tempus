import { ABSTRACT } from "../kaboom_globals"



/********************* Behavior base class *********************/


class Behavior {
    constructor(explanation) {
        this.explanation = explanation
    }

    /*abstract*/ update(component) {
        ABSTRACT("Behavior", "update")
        // call any functions on the component to update it each time
        // perform conditional/state machine/counting logic as needed
    }
}



/********************* Exports *********************/

export {
    Behavior
}