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
    constructor(tileX, tileY, appearOn, dest_scene, thisId, destId) {
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
    }

    build() {
        const basicProps = [
            scale(MANUAL_ART_SCALE),
            origin("center"),
            pos(this.x, this.y),
        ]

        const loadArea = k.add(basicProps.concat([
            "SceneChangeLoadArea",
            k.area({width: TILE_WIDTH(2), height: TILE_WIDTH(2)}),
        ]))
        loadArea.onCollide("player", (player) => {
            this.dest_scene.load()
        })

        const travelArea = k.add(basicProps.concat([
            "SceneChangeTravelArea",
            k.area({shape: "circle", width: TILE_WIDTH(1), height: TILE_WIDTH(1)}),
        ]))
        travelArea.onCollide("player", (player) => {
            this.dest_scene.go_ch(this.destId)
        })
    }
}


/********************* Exports *********************/

export {
    SceneChange,
    SIDE,
}