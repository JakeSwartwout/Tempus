import { k, ART_SIZE } from "../kaboom_globals.js"

/********************* Helper Functions *********************/

const TILE_OFFSET = function(num) {
	return (ART_SIZE + ART_SPACING) * num;
}
const TILE_WIDTH = function(num) {
	return (ART_SIZE + ART_SPACING) * num - ART_SPACING;
}


/********************* Scene Properties *********************/

// for placing them, if '5' was a path, then use the number pad for a fully surrounded path
// and then the opposite (single grass corner) is which direction the grass is
// pure grass is just a g
// 789
// 456  io
// 132  kl  g
k.loadSpriteAtlas("sprites/SquareGrounds.png", {
	"grass_path_7": { x: TILE_OFFSET(0), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_8": { x: TILE_OFFSET(1), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_9": { x: TILE_OFFSET(2), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_4": { x: TILE_OFFSET(0), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_5": { x: TILE_OFFSET(1), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_6": { x: TILE_OFFSET(2), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_1": { x: TILE_OFFSET(0), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_2": { x: TILE_OFFSET(1), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_3": { x: TILE_OFFSET(2), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},

	"grass_path_i": { x: TILE_OFFSET(4), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_o": { x: TILE_OFFSET(3), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_k": { x: TILE_OFFSET(4), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_l": { x: TILE_OFFSET(3), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},

	"grass_path_g": { x: TILE_OFFSET(0), y: TILE_OFFSET(5), width: ART_SIZE, height: ART_SIZE},
})


/********************* Exports *********************/

export { k, ART_SIZE } from "../kaboom_globals.js"
export { TILE_OFFSET, TILE_WIDTH }