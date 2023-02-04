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

const ART_SIZE = 16
const ART_SPACING = 1
const TILE_OFFSET = function(num) {
	return (ART_SIZE + ART_SPACING) * num;
}
const TILE_WIDTH = function(num) {
	return (ART_SIZE + ART_SPACING) * num - ART_SPACING;
}
const SCALE_FACTOR = 6

loadSpriteAtlas("sprites/person.png", {
    "hero": {
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

loadSpriteAtlas("sprites/personDeath.png", {
	"heroDeath": {
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

// for placing them, if '5' was a path, then use the number pad for a fully surrounded path
// and then the opposite (single grass corner) is which direction the grass is
// pure grass is just a g
// 789
// 456  io
// 132  kl  g
loadSpriteAtlas("sprites/SquareGrounds.png", {
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

const SPEED = 350;

const background = addLevel([
	// Design the level layout with symbols
	"gggggg7889gg",
	"g789gg4556gg",
	"g45o88i5l3gg",
	"g4555555o89g",
	"g122k555556g",
	"gggg12kl223g",
	"gggggg46gggg",
	"gggggg13gggg",
], {
	// The size of each grid
	width: ART_SIZE * SCALE_FACTOR,
	height: ART_SIZE * SCALE_FACTOR,
	// The position of the top left block
	pos: vec2(0, 0),
	// Define what each symbol means (in components)
	"7": () => [sprite("grass_path_7"), scale(SCALE_FACTOR)],
	"8": () => [sprite("grass_path_8"), scale(SCALE_FACTOR)],
	"9": () => [sprite("grass_path_9"), scale(SCALE_FACTOR)],
	"4": () => [sprite("grass_path_4"), scale(SCALE_FACTOR)],
	"5": () => [sprite("grass_path_5"), scale(SCALE_FACTOR)],
	"6": () => [sprite("grass_path_6"), scale(SCALE_FACTOR)],
	"1": () => [sprite("grass_path_1"), scale(SCALE_FACTOR)],
	"2": () => [sprite("grass_path_2"), scale(SCALE_FACTOR)],
	"3": () => [sprite("grass_path_3"), scale(SCALE_FACTOR)],

	"i": () => [sprite("grass_path_i"), scale(SCALE_FACTOR)],
	"o": () => [sprite("grass_path_o"), scale(SCALE_FACTOR)],
	"k": () => [sprite("grass_path_k"), scale(SCALE_FACTOR)],
	"l": () => [sprite("grass_path_l"), scale(SCALE_FACTOR)],

	"g": () => [sprite("grass_path_g"), scale(SCALE_FACTOR)],
})

const level = addLevel([
	// Design the level layout with symbols
	" @  ",
	"    ",
	"   @"
], {
	// The size of each grid
	width: ART_SIZE * SCALE_FACTOR,
	height: ART_SIZE * SCALE_FACTOR,
	// The position of the top left block
	pos: vec2(100, 200),
	// Define what each symbol means (in components)
	"@": () => [
		sprite("hero"),
		area(), // collision checking
		// body(), // gravity
		solid(), // collision stopping
		origin("center"),
		scale(SCALE_FACTOR),
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