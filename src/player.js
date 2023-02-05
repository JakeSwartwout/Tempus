import { k } from "./kaboom_globals.js"
import { TILE_WIDTH } from "./kaboom_globals.js"

/********************* Player Properties *********************/
const PLAYER_SPEED = 60;

// which way we were facing last
/*     ^
    00 10 20
  < 01 11 21 >
    02 12 22
       v
*/
let lastDir = "11"
 
k.loadSpriteAtlas("sprites/person.png", {
    "player_facing": {
        x: 0,
        y: 0,
        width: TILE_WIDTH(3),
        height: TILE_WIDTH(3),
        sliceX: 3,
		sliceY: 3,
		"anims" : {
			"00" : 0,
			"10" : 1,
			"20" : 2,
			"01" : 3,
			"11" : 4,
			"21" : 5,
			"02" : 6,
			"12" : 7,
			"22" : 8
		}
    },
})

k.loadSpriteAtlas("sprites/personDeath.png", {
	"player_death": {
		x: 0,
		y: 0,
		width: TILE_WIDTH(3),
		height: TILE_WIDTH(1),
		sliceX: 3,
		"anims": {
			"death" : {
				from: 0,
				to: 2
			}
		}
	}
})


/********************* Player Setup *********************/

const loadPlayer = function (player) {

    k.onKeyDown(["left", "right", "up", "down"], () => {
        let horiz
        // Left
        if(k.isKeyDown("left") && !k.isKeyDown("right"))
            horiz = "0"
        // Neither
        else if (!k.isKeyDown("left") && !k.isKeyDown("right"))
            horiz = "1"
        // Right
        else if (!k.isKeyDown("left") && k.isKeyDown("right"))
            horiz = "2"
        // Both
        else
            horiz = lastDir[0]

        let vert
        // Up
        if(k.isKeyDown("up") && !k.isKeyDown("down"))
            vert = "0"
        // Neither
        else if (!k.isKeyDown("up") && !k.isKeyDown("down"))
            vert = "1"
        // Down
        else if (!k.isKeyDown("up") && k.isKeyDown("down"))
            vert = "2"
        // Both
        else
            vert = lastDir[1]

        // join the two into our direction string
        lastDir = horiz + vert
        player.play(lastDir)

        // get the directions
        let motion = k.vec2(horiz-1, vert-1)
        // always move at SPEED total speed
        motion = motion.unit().scale(PLAYER_SPEED)
        // scale the vertical direction to give the feeling of perspective
        motion = motion.scale(1, .75)
        // since this is called for every key pressed, scale down by the number pressed
        let numDown = 0
            + (k.isKeyDown("up") ? 1 : 0)
            + (k.isKeyDown("down") ? 1 : 0)
            + (k.isKeyDown("left") ? 1 : 0)
            + (k.isKeyDown("right") ? 1 : 0)
        motion = motion.scale(1/numDown)

        player.move(motion)
    })

    // technically the camera can follow you, but the tiles split up
    // player.onUpdate(() => {
    //     camPos(player.pos)
    // })

    // onClick(() => {
    // 	addKaboom(mousePos())
    // 	player.use(sprite("heroDeath"))
    // 	player.play("death")
    // })
}


/********************* Exports *********************/

export { loadPlayer }