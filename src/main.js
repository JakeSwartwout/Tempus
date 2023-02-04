import kaboom from "kaboom"

kaboom()

debug.inspect = true

// const H_DIR = {
// 	D_LEFT : Symbol("left"),
// 	D_MID : Symbol("mid"),
// 	D_RIGHT : Symbol("right")
// }
// const V_DIR = {
// 	D_UP : Symbol("up"),
// 	D_MID : Symbol("mid"),
// 	D_DOWN : Symbol("down")
// }
// dir2str = function(h_dir : H_DIR, v_dir : V_DIR) {
// 	switch()
// }

loadSpriteAtlas("sprites/person.png", {
    "hero": {
        x: 0,
        y: 0,
        width: 50, // each is 16 with a 1 spacer (to fix)
        height: 50,
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

loadSpriteAtlas("sprites/personDeath.png", {
	"heroDeath": {
		x: 0,
		y: 0,
		width: 50,
		height: 16,
		sliceX: 3,
		"anims": {
			"death" : {
				from: 0,
				to: 2
			}
		}
	}
})

const SPEED = 300;

const level = addLevel([
	// Design the level layout with symbols
	" @  ",
	"    ",
	"   @"
], {
	// The size of each grid
	width: 160,
	height: 160,
	// The position of the top left block
	pos: vec2(100, 200),
	// Define what each symbol means (in components)
	"@": () => [
		sprite("hero"),
		area(), // collision checking
		// body(), // gravity
		solid(), // collision stopping
		origin("center"),
		scale(6),
		"player",
	]
})

// Get the player object from tag
const player = get("player")[0]

// player.onUpdate(() => {
//     camPos(player.pos)
// })

let lastDir = "11"
let moving = false

onKeyDown(["left", "right", "up", "down"], () => {
	let horiz
	// Left
	if(isKeyDown("left") && !isKeyDown("right"))
		horiz = "0"
	// Neither
	else if (!isKeyDown("left") && !isKeyDown("right"))
		horiz = "1"
	// Right
	else if (!isKeyDown("left") && isKeyDown("right"))
		horiz = "2"
	// Both
	else
		horiz = lastDir[0]

	let vert
	// Up
	if(isKeyDown("up") && !isKeyDown("down"))
		vert = "0"
	// Neither
	else if (!isKeyDown("up") && !isKeyDown("down"))
		vert = "1"
	// Down
	else if (!isKeyDown("up") && isKeyDown("down"))
		vert = "2"
	// Both
	else
		vert = lastDir[1]

	// join the two into our direction string
	lastDir = horiz + vert
	player.play(lastDir)

	// get the directions
	let motion = vec2(horiz-1, vert-1)
	// always move at SPEED total speed
	motion = motion.unit().scale(SPEED)
	// scale the vertical direction to give the feeling of perspective
	motion = motion.scale(1, .75)
	// since this is called for every key pressed, scale down by the number pressed
	let numDown = 0
		+ (isKeyDown("up") ? 1 : 0)
		+ (isKeyDown("down") ? 1 : 0)
		+ (isKeyDown("left") ? 1 : 0)
		+ (isKeyDown("right") ? 1 : 0)
	motion = motion.scale(1/numDown)

	player.move(motion)
})

// onClick(() => {
// 	addKaboom(mousePos())
// 	player.use(sprite("heroDeath"))
// 	player.play("death")
// })