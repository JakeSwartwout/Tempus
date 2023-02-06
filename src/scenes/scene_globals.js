import { k, ART_SIZE, TILE_OFFSET } from "../kaboom_globals.js"


/********************* Scene Properties *********************/

// for placing them, if '5' was a path, then use the number pad for a fully surrounded path
// and then the opposite (single grass corner) is which direction the grass is
// pure grass is just a g
// 789
// 456  io
// 132  kl  g
k.loadSpriteAtlas("sprites/grounds_atlas.png", {
	"grass_path_7": { x: TILE_OFFSET(0), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_8": { x: TILE_OFFSET(1), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_9": { x: TILE_OFFSET(2), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_4": { x: TILE_OFFSET(0), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_5": { x: TILE_OFFSET(1), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_6": { x: TILE_OFFSET(2), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_1": { x: TILE_OFFSET(0), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_2": { x: TILE_OFFSET(1), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_path_3": { x: TILE_OFFSET(2), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},

	"grass_path_i": { x: TILE_OFFSET(1), y: TILE_OFFSET(3 + 1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_o": { x: TILE_OFFSET(0), y: TILE_OFFSET(3 + 1), width: ART_SIZE, height: ART_SIZE},
	"grass_path_k": { x: TILE_OFFSET(1), y: TILE_OFFSET(3 + 0), width: ART_SIZE, height: ART_SIZE},
	"grass_path_l": { x: TILE_OFFSET(0), y: TILE_OFFSET(3 + 0), width: ART_SIZE, height: ART_SIZE},

	"grass": { x: TILE_OFFSET(3), y: TILE_OFFSET(3), width: ART_SIZE, height: ART_SIZE},
	"grass_dry_1": { x: TILE_OFFSET(2), y: TILE_OFFSET(3), width: ART_SIZE, height: ART_SIZE},
	"grass_dry_2": { x: TILE_OFFSET(3), y: TILE_OFFSET(4), width: ART_SIZE, height: ART_SIZE},
	"grass_dry_3": { x: TILE_OFFSET(2), y: TILE_OFFSET(4), width: ART_SIZE, height: ART_SIZE},

	"grass_farm_7": { x: TILE_OFFSET(0 + 3), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_8": { x: TILE_OFFSET(1 + 3), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_9": { x: TILE_OFFSET(2 + 3), y: TILE_OFFSET(0), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_4": { x: TILE_OFFSET(0 + 3), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_5": { x: TILE_OFFSET(1 + 3), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_6": { x: TILE_OFFSET(2 + 3), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_1": { x: TILE_OFFSET(0 + 3), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_2": { x: TILE_OFFSET(1 + 3), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_3": { x: TILE_OFFSET(2 + 3), y: TILE_OFFSET(2), width: ART_SIZE, height: ART_SIZE},

	"grass_farm_i": { x: TILE_OFFSET(1 + 4), y: TILE_OFFSET(3 + 1), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_o": { x: TILE_OFFSET(0 + 4), y: TILE_OFFSET(3 + 1), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_k": { x: TILE_OFFSET(1 + 4), y: TILE_OFFSET(3 + 0), width: ART_SIZE, height: ART_SIZE},
	"grass_farm_l": { x: TILE_OFFSET(0 + 4), y: TILE_OFFSET(3 + 0), width: ART_SIZE, height: ART_SIZE},

	// duplicates to rename
	"path": { x: TILE_OFFSET(1), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
	"farm": { x: TILE_OFFSET(1 + 3), y: TILE_OFFSET(1), width: ART_SIZE, height: ART_SIZE},
})


/********************* Exports *********************/

export { k, ART_SIZE, TILE_OFFSET, TILE_WIDTH } from "../kaboom_globals.js"