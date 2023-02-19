# Tempus
## The Video Game
Developed by Jake Swartwout
February 2023


## To Do Next:
### Enemies
<!-- * Fix up the enemy's alignment -->
<!-- * Add the enemies to the game code (new file) -->
<!-- * have the enemies kill you when you touch them -->
<!-- * have the enemies walk around -->
* create a walking animation for the enemies
### Plants
<!-- * Add some cropland -->
<!-- * Align all of the food art -->
<!-- * Add the food art to the game -->
<!-- * allow the player to pick the food -->
<!-- * add the inventory art in -->
<!-- * add the inventory to the game -->
<!-- * have the food go into their inventory -->
<!-- * press a key to open the inventory -->
* Stop letting you pick multiple plants at once, just pick one
### Cleanup
* make the player a singleton (instead of returning an object, check if we have one, then return that instead)
<!-- * randomly pick a grass block to display. 10% special, 1/3 chance for each (do in tiled) -->
* Log an issue that pingpong doesn't actually do anything
* instead of having enemy be a component (() => {}) have them be a function that returns all the components (() => [{}, {}, {}])
* instead of the player being a component (() => {}) have a creator function which adds them at the given position and returns a reference to them (see above)
* figure out if quad is good for walking directions instead of anims
* Pull the walking code out into its own component, seems like it's basically the same between enemy and player and potential other things
### Farm Scene
<!-- * draw a farmer sprite (just an idle anim) -->
* draw a basic farmhouse (KISS method)
* make an NPC factory class
* place the farmer and the farmhouse in the scene
* walking near the farmer lets you talk to him
### Tiled
<!-- * Figure out how to import from tiled -->
* Complete the path/grass set
* Complete the farm/grass set
* Draw the farm/path set
* Draw some more scenes
* Add trees into the scene too
### Inventory
* pick up the basket and it's what gives you an inventory
### Gameplay
* add a way to walk between scenes (getting close calls load, then walking over calls go)
* use cookies as a way to save player data? or just have it be story based and have each link be a different part of the story. Could stick it on different files, or in the #, or in the query string ?