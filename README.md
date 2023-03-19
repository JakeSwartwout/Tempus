# Tempus
## The Video Game
Developed by Jake Swartwout
February 2023

## to run
Run `npm run dev` in the root directory, then open a browser onto the localhost port it opens

## To Do Next:
### Art
* create a walking animation for the enemies
* draw a basic farmhouse (KISS method)
* Complete the path/grass/farm ground set
* Draw some more scenes
* clean up the tree and lamp art to be a props file or something
### Smoothing
* Stop letting you pick multiple plants at once, just pick one
* have the crops grow back as you're watching them
* fix up the farmers dialogue to be written better
* have inventory items actually show how many are stacked
* limit the size of item stacks
### Tech Debt
* instead of having enemy be a component (() => {}) have them be a function that returns all the components (() => [{}, {}, {}])
* Pull the walking code out into its own component, seems like it's basically the same between enemy and player and potential other things
* Move state machines to their own file
* Break NPC into the two different classes
* Only let the player do one thing each interaction (currently they all trigger, multiple crop picking, multiple dialogues, etc)(could make a list with priorities then pick the highest)
### Features
* make an NPC factory
<!-- * walking near the farmer lets you talk to him -->
* Add trees into the scene too, another layer in tiled
* pick up the basket and it's what gives you an inventory
* use cookies as a way to save player data? or just have it be story based and have each link be a different part of the story. Could stick it on different files, or in the #, or in the query string ?
* complex dialogue systems (I'm thinking its a class, you pass a list of dialogue, it walks through them) (Complexity could be added by adding branches)
* dialogue should actually show up in bubbles
### Narrative
<!-- * add the farmer to the carrots scene -->
* have talking to the farmer unlock the next scene
### Miscellaneous
* Log an issue that pingpong doesn't actually do anything
* Set it up to work in just an html file
* Upload the code to github and create a github pages site to play the game
