import { ART_SIZE, k, MANUAL_ART_SCALE, TOPDOWN_VERT_SCALING } from "../kaboom_globals.js"
import { PLAYER } from "../player.js"
import { SceneChange } from "./SceneChange.js"

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

// load in the tiled levels from a given map json and return a function
// that builds them in kaboom
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
						// TODO: this should be here, so why is it so bad with it??
                        // height: ART_SIZE*MANUAL_ART_SCALE*TOPDOWN_VERT_SCALING,
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

/********************* Loading functionality for scenes *********************/

// The scene loader wraps up everything needed for a scene to ensure
// that its tiled levels are loaded before going there
// Ensure each scene is added to all_scenes to allow for SceneChange objects
// to link to it
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

	addSceneChange({tileX, tileY, appearOn, dest, thisId, destId, unlockBy = null}) {
		if (thisId in this.sceneChangers) {
			debug.log("Duplicate scene ID!! " + thisId)
			return
		}
		this.sceneChangers[thisId] = new SceneChange(
			tileX, tileY, appearOn,
			dest, thisId, destId,
			unlockBy
		)
	}

	buildChangers() {
		for (let changerId in this.sceneChangers) {
			this.sceneChangers[changerId].build()
		}
	}
}


/********************* Exports *********************/

export { SceneLoader }