import { ART_SIZE, k, MANUAL_ART_SCALE, TILE_WIDTH } from "../kaboom_globals"

const SIDE = {
    UP: [0, -1],
    RIGHT: [1, 0],
    DOWN: [0, 1],
    LEFT: [-1, 0],
}


/********************* The Class *********************/

// Scene changes are placed within scenes to allow the player to travel between scenes
class SceneChange {
    constructor(tileX, tileY, appearOn, dest_scene, thisId, destId, unlockBy = null) {
		// Where to draw on the screen
        this.x = tileX * ART_SIZE * MANUAL_ART_SCALE
        this.y = tileY * ART_SIZE * MANUAL_ART_SCALE
        // When the player is spawned, where to spawn them
        let [appearX, appearY] = appearOn
        this.spawnX = this.x + (appearX * ART_SIZE * MANUAL_ART_SCALE)
        this.spawnY = this.y + (appearY * ART_SIZE * MANUAL_ART_SCALE)
        // references for scene transition
        this.thisId = thisId
        this.dest_scene = dest_scene
        this.destId = destId
        // add locking information
        if(unlockBy && unlockBy instanceof Promise) {
            // TODO: pass locking information in as an object/struct
            // that way we can just have one variable to know if there's locking behavior
            // It will contain starting status, then promises to lock and to unlock
            this.locked = true
            unlockBy.then(() => {
                this.locked = false
            })
        }
    }

    build() {
        // TODO: use the chapter to change the locking

        const basicProps = [
            k.scale(MANUAL_ART_SCALE),
            k.origin("center"),
            k.pos(this.x, this.y),
        ]

        const loadArea = k.add(basicProps.concat([
            "SceneChangeLoadArea",
            k.area({width: TILE_WIDTH(2), height: TILE_WIDTH(2)}),
        ]))
        loadArea.onCollide("player", (player) => {
            if (!this.locked) {
                this.dest_scene.load()
            }
        })

        const travelArea = k.add(basicProps.concat([
            "SceneChangeTravelArea",
            k.area({shape: "circle", width: TILE_WIDTH(1), height: TILE_WIDTH(1)}),
            k.solid(),
        ]))
        travelArea.onCollide("player", (player) => {
            if (!this.locked) {
                this.dest_scene.go_ch(this.destId)
            }
        })
    }
}


/********************* Exports *********************/

export {
    SceneChange,
    SIDE,
}