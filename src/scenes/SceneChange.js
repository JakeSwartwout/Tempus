import { k, MANUAL_ART_SCALE, TILE_WIDTH, UNITS } from "../kaboom_globals"

const SIDE = {
    UP: [0, -1],
    RIGHT: [1, 0],
    DOWN: [0, 1],
    LEFT: [-1, 0],
}


/********************* The Class *********************/

// Scene changes are placed within scenes to allow the player to travel between scenes
class SceneChange {
    constructor(tile_x, tile_y, appear_on, dest_scene, this_id, dest_id, unlock_by = null) {
		// Where to draw on the screen
        this.x = tile_x * UNITS
        this.y = tile_y * UNITS
        // When the player is spawned, where to spawn them
        let [appear_x, appear_y] = appear_on
        this.spawnX = this.x + (appear_x * UNITS)
        this.spawnY = this.y + (appear_y * UNITS)
        // the player collision box is 4 pixels down, so offset by that
        this.spawnY -= 4*MANUAL_ART_SCALE
        // references for scene transition
        this.this_id = this_id
        this.dest_scene = dest_scene
        this.dest_id = dest_id
        // add locking information
        if(unlock_by && unlock_by instanceof Promise) {
            // TODO: pass locking information in as an object/struct
            // that way we can just have one variable to know if there's locking behavior
            // It will contain starting status, then promises to lock and to unlock
            this.locked = true
            unlock_by.then(() => {
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

        const load_area = k.add(basicProps.concat([
            "SceneChangeLoadArea",
            k.area({width: TILE_WIDTH(2), height: TILE_WIDTH(2)}),
        ]))
        load_area.onCollide("player", (player) => {
            if (!this.locked) {
                this.dest_scene.load()
            }
        })

        const travel_area = k.add(basicProps.concat([
            "SceneChangeTravelArea",
            k.area({shape: "circle", width: TILE_WIDTH(1), height: TILE_WIDTH(1)}),
            k.solid(),
        ]))
        travel_area.onCollide("player", (player) => {
            if (!this.locked) {
                this.dest_scene.go_ch(this.dest_id)
            }
        })
    }
}


/********************* Exports *********************/

export {
    SceneChange,
    SIDE,
}