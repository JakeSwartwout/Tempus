import kaboom from "kaboom"

const kaboom_game = kaboom({scale : 6})
export default kaboom_game

debug.inspect = true

const ART_SIZE = 16
const ART_SPACING = 1
const TILE_OFFSET = function(num) {
	return (ART_SIZE + ART_SPACING) * num;
}
const TILE_WIDTH = function(num) {
	return (ART_SIZE + ART_SPACING) * num - ART_SPACING;
}
export {ART_SIZE, ART_SPACING, TILE_OFFSET, TILE_WIDTH}