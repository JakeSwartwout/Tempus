import { ABSTRACT } from "../kaboom_globals"



/********************* Behavior base class *********************/


class Behavior {
    constructor(explanation) {
        this.explanation = explanation
        this.component = null
    }

    refComponent(component) {
        this.component = component
    }

    /*abstract*/ update() {
        ABSTRACT("Behavior", "update")
        // call any functions on the component to update it each time
        // perform conditional/state machine/counting logic as needed
    }

    interrupt() {
        // lets one behavior interrupt the actions of another
        // should fall into some recovery process
    }
}



/********************* Exports *********************/

export {
    Behavior
}