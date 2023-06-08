import { BhvrPushable } from "../Behaviors/BhvrPushable.js";
import { BhvrRandomIdle } from "../Behaviors/BhvrRandomIdle.js";
import { k, TILE_WIDTH } from "../kaboom_globals.js"
import { PLAYER } from "./Player.js";

/********************* Sprites *********************/

const BOUNCE_SPEED = 5

k.loadSpriteAtlas("sprites/tsoka_atlas.png", {
    "enemy": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(4),
        height: TILE_WIDTH(4),
        sliceX: 4,
		sliceY: 4,
        "anims" : {
            "facing": 0, // use quad to pick the direction
            "idle" : {
                from: 12,
                to: 15,
                loop: true,
                // pingpong: true, // ping pong is not actually implemented
                speed: BOUNCE_SPEED,
            },
		}
    }
})


function enemy() {

/********************* Properties *********************/

    const idleWalk = new BhvrPushable(new BhvrRandomIdle())

    return {
/********************* Setup *********************/
        id: "enemy",

        add() {
            this.onCollide("player", () => {
                PLAYER.kill()
            })
            idleWalk.refComponent(this)
        },

        update() {
            idleWalk.update()
        },

        push_back(dir) {
            idleWalk.push_back(dir)
        },

        kill() {
            k.destroy(this)
        }
    }

}


/********************* Exports *********************/

export { enemy }