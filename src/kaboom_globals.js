import kaboom from "kaboom"


/********************* Constants *********************/

const ART_SIZE = 16
const ART_SPACING = 1


/********************* Game Setup *********************/

const k = kaboom({scale : 6})

debug.inspect = true


/********************* Exports *********************/

export { k, ART_SIZE, ART_SPACING }