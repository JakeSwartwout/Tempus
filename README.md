# Tempus
## The Video Game
Developed by Jake Swartwout
February 2023

## to run
Run `npm run dev` in the root directory, then open a browser onto the localhost port it opens

## Narrative Plan

* Go eat dinner with the family
* CRASH
* What was that?
* crops are being eaten by bouncing guys
* oh no! go out and scare them away
* hit them with a hoe, they run away
* 

## Controls

### Planned

wasd based controls
* keys : move
* w : interact (pick, talk)
* d : attack
* a : inventory

### Current
* keys : move
* i : inventory
* e : interact (pick, start talking)
* t : continue talking
* d : attack

## To Do Next:
### Art
* create a walking animation for the enemies
* draw a basic farmhouse (KISS method)
* Complete the path/grass/farm ground set
* Draw some more scenes
* clean up the tree and lamp art to be a props file or something
* animation of the chat box opening (can pass it in as an animation, no loop, with listener when it's done)
### Smoothing
* Stop letting you pick multiple plants at once, just pick one
* have the crops grow back as you're watching them, or have them not grow back when you leave
* fix up the farmers dialogue to be written better
* have inventory items actually show how many are stacked
* limit the size of item stacks
### Tech Debt
* instead of having enemy be a component (() => {}) have them be a function that returns all the components (() => [{}, {}, {}])
* Pull the walking code out into its own component, seems like it's basically the same between enemy and player and potential other things
* Break NPC into the two different classes, idle quest-giver and mobile commentator
* Only let the player do one thing each interaction (currently they all trigger, multiple crop picking, multiple dialogues, etc)(could make a list with priorities then pick the highest)
* In a Speech, go through the lines and break up any that are too long for a text box
### Features
* Add trees into the scene too, another layer in tiled
* pick up the basket and it's what gives you an inventory
* use cookies as a way to save player data? or just have it be story based and have each link be a different part of the story. Could stick it on different files, or in the #, or in the query string ?
* complex dialogue systems (add branches and use choice? idk if I want this)
* dialogue should actually show up in bubbles, as a component on the screen
* a better way to handle events. I'm thinking of a dict that maps key to 2 functions, one what to do when pressed, the other the canceller function if it's active (and maybe a bool if_active). Then we can pass in stuff that pauses the behavior of other keys, like opening the inventory stops motion, or how opening a dialogue bubble with e makes e now progress text rather than opening a new bubble. It has its own dict which stores the old listeners that it covered and cancels them for kaboom. Then when you end an interaction, it cancels its own listeners, and uses its internal dict to re-instate the next layer's listeners
* Add in a way to do talking scenes. Ie, no controls other than talking, just having npcs talking and walking around.
* let certain key words in text do the classic ~highlighting~, ie or Carrot, West, Farmer, etc. Have it be a text option, so like /Farmer/ would do it
### Narrative
* figure out where to go after the farmhouse
* figure out a general plot arc
* figure out how to add weapons and fighting and enemies in (attack the farmhouse?)
### Miscellaneous
* Log an issue that pingpong doesn't actually do anything
* Set it up to work in just an html file
* Upload the code to github and create a github pages site to play the game
