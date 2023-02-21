import { k, ART_SIZE, TILE_OFFSET, MANUAL_ART_SCALE } from "../kaboom_globals.js"
import { PLAYER } from "../player.js"
import { SceneChange } from "./SceneChange.js"


/********************* Manual Scene Sprites *********************/

// for placing them, if '5' was a path, then use the number pad for a fully surrounded path
// and then the opposite (single grass corner) is which direction the grass is
// pure grass is just a g
// 789
// 456  io
// 132  kl  g
k.loadSpriteAtlas("TileArt/grounds_atlas.png", {
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


/********************* Using Tiled for Sprites *********************/

// In the TiledMaps folder, create projects that are:
// * Saved in the .json format
// * reference tile images in the TiledMaps/TileArt folder
// * have these same images duplicated to the www/TileArt folder
// * Have their tilesets embedded
// * have their orientation set to: "orthogonal"
// * Have their render order set to: "right-down"
// * Don't have spacing/gaps between the sprite images

/**
 * When having issues embedding tilesets:
 * You can convert existing set into embedded. The arrow page embeds it,
 * but it breaks the image link for some reason. So, change the image
 * to something else, then back to get it to reset the image link.
 * I just change the "TileMaps" to "www" so it's the same size and doesn't
 * try to re-scale anything.
 * I also suggest modifying the terrain name (like add an underscore)
 * to tell it apart from the non-embedded one.
 */

let load_tiled_levels = function(map_json) {
    // loading the map is asynch, so need a promise
    return new Promise((resolve) => {
        // load in the given map using tiled-kaboom module
        k.loadTiledMap(map_json).then(({ sprites, levels, key }) => {
            // the symbols only contain the sprite, but we need to scale them
            level_symbols = {}
            for (let symb in key) {
                level_symbols[symb] = () => {
                    // call the function to get the old list
                    compLst = key[symb]()
                    // add the scaling component
                    compLst.push(k.scale(MANUAL_ART_SCALE))
                    // the new function will return the updated list
                    return compLst
                }
            }
            // what we need to do when adding a new kaboom scene
            let add_tiled_levels = function() {
                // layer the levels on top of each other
                for (let design of levels) {
                    let level = k.addLevel(design, {
                        // The size of each grid
                        width: ART_SIZE*MANUAL_ART_SCALE,
                        height: ART_SIZE*MANUAL_ART_SCALE,
                        ...level_symbols
                    })
                }
            }
            // let it know that we're done
            resolve(add_tiled_levels)
        }
        // if there's error, just let it chain upwards
        )
    })
}

class SceneLoader {
	constructor(scene_name, map_json, build_scene_func = () => {}){
		this.name = scene_name
		this.map_json = map_json
		this.load_scene = null
		this.buildScene = build_scene_func
		this.sceneChangers = []
	}

	isLoaded() {
		return (this.load_scene != null)
	}
	
	// set up kaboom to recognize our level info
	load() {
		if (this.isLoaded())
			return
		this.load_scene = new Promise((resolve, reject) => {
			// load the background levels
			load_tiled_levels(this.map_json).then((build_tiled_levels) => {
				// build the scene
				k.scene(this.name, ({spawnPoint}) => {
					// 1: do the tiled levels in the back
					build_tiled_levels()
		
					// 2: add all the other info to the scene
					this.buildScene()
					this.buildChangers()

					// 3: re-add the player
					// this puts them on top and ensures that their
					// movements apply in this scene as well
					PLAYER.build(spawnPoint)

					// 4: add any art that can hide the player
					// TODO
				})
				resolve()
			})
		})
	}

	// version of go where we can just pass the scene changer ID
	go_ch(changerId) {
		const spawnX = this.sceneChangers[changerId].spawnX
		const spawnY = this.sceneChangers[changerId].spawnY
		this.go(k.vec2(spawnX, spawnY))
	}

	// ensure our level is set up, then go to it when ready
	go(spawnPoint) {
		if(!this.isLoaded())
			this.load()
		return new Promise((resolve, reject) => {
			this.load_scene.then(() => {
				k.go(this.name, {spawnPoint: spawnPoint})
				resolve()
			})
		})
	}

	addSceneChange({tileX, tileY, appearOn, dest, thisId, destId}) {
		if (thisId in this.sceneChangers) {
			debug.log("Duplicate scene ID!! " + thisId)
			return
		}
		this.sceneChangers[thisId] = new SceneChange(
			tileX, tileY, appearOn,
			dest, thisId, destId
		)
	}

	buildChangers() {
		for (let changerId in this.sceneChangers) {
			this.sceneChangers[changerId].build()
		}
	}
}


/********************* Exports *********************/

const SCENE_WIDTH = 12
const SCENE_HEIGHT = 8


/********************* Exports *********************/

export {
	k,
	ART_SIZE,
	MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING,
	TILE_OFFSET, TILE_WIDTH,
} from "../kaboom_globals.js"
export {
	SIDE
} from "./SceneChange.js"
export {
	SceneLoader,
	SCENE_WIDTH, SCENE_HEIGHT
}