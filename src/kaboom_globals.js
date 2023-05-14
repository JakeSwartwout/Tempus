import kaboom from "kaboom"
import tiledKaboom from 'tiled-kaboom'


/********************* Constants *********************/

const ART_SIZE = 16
const ART_SPACING = 0
const ART_SCALING = 6

const SCALE_ART_MANUALLY = true
const GAME_SCALE = SCALE_ART_MANUALLY ? 1 : ART_SCALING
const MANUAL_ART_SCALE = SCALE_ART_MANUALLY ? ART_SCALING : 1

const UNITS = MANUAL_ART_SCALE * ART_SIZE

// this only applies to motion
// we want the art to stay the same
// so, it takes longer to walk vertical than horizontal
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

const WARNING = function(text) {
	console.log(text)
}

const BAD_DEFAULT = function(obj, location) {
	console.error("Switch statement hit the default case with the following object")
	console.error(obj)
	throw new Error("Bad default in " + location)
}


/********************* Game Setup *********************/

const k = kaboom({
	plugins: [ tiledKaboom ],
	scale : GAME_SCALE,
})

// debug.inspect = true


/********************* Exports *********************/

export {
	k,
	ART_SIZE, ART_SPACING,
	TILE_OFFSET, TILE_WIDTH,
	MANUAL_ART_SCALE,
	TOPDOWN_VERT_SCALING,
	ASSERT, WARNING, BAD_DEFAULT,
	UNITS
}