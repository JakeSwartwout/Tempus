import kaboom from "kaboom"


/********************* Constants *********************/

const ART_SIZE = 16
const ART_SPACING = 0

const TOPDOWN_VERT_SCALING = .75


/********************* Helper Functions *********************/

const TILE_OFFSET = function(num) {
	return (ART_SIZE + ART_SPACING) * num;
}
const TILE_WIDTH = function(num) {
	return (ART_SIZE + ART_SPACING) * num - ART_SPACING;
}

const ASSERT = function(bool_val, text = "") {
	if (!bool_val) {
		console.error(text)
		throw new Error(text)
	}
}


/********************* Game Setup *********************/

const k = kaboom({scale : 6})

debug.inspect = true


/********************* Exports *********************/

export { k, ART_SIZE, ART_SPACING, TILE_OFFSET, TILE_WIDTH, TOPDOWN_VERT_SCALING, ASSERT }