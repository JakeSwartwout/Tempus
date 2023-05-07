# Tempus
## The Video Game
Developed by Jake Swartwout

Started February 2023

"A Farming Sim turned RPG"

## to run
Run `npm run dev` in the root directory, then open a browser onto the localhost port it opens.

To build the game, run `npm run build` and it will compile everything into a single file `www/main.js`.

Or, view the last-built iteration of the game on github pages at https://jakeswartwout.github.io/Tempus

## Narrative Plan

* crops are being eaten by bouncing guys
* oh no! go out and scare them away
* hit them with a hoe, they run away
* they head east
* go after them to investigate
* next scene is just a path, cutscene of them continue bouncing east, walk after them
* the ones you scared now attacking someone else, a researcher
* daughter is trapped in a tree or something
* scare them away again
* thanks
* could you corral one into a pen so we could study it
* gonna name it tsoka, for the one who moves
* try to do it, they just bounce away
* talking to npc again and again eventually he gives up
* oh but they like Petra
* a what
* oh it's another corrupted veggie
* lets gather some
* go back to farmers to grab some, let them know whats up
* run back to researcher and place food
* lure them into a pen
* daughter wants to keep it as pet, they're fluffy

* make it feel like a farming sim

## Naming Conventions
* Variable names are snake_case
* Function names are camelCase
* Promises are camelCase
* Globals are ALLCAPS
* Classes are PascalCase
* File names are either the ClassName or snake_case

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
* click : come back to life

## To Do Next:
### Art
* create a walking animation for the player
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
* when the tsokas move, make it arc-ed so it looks like a jump (or, draw a walking animation)
* trap the Tsokas into the fields and where you can chase them, don't let them hit the farmer or run off screen except that one direction.
* let the scene changers take on any size on screen
### Tech Debt
* instead of having enemy be a component (() => {}) have them be a function that returns all the components (() => [{}, {}, {}])
* Pull the walking code out into its own component, seems like it's basically the same between enemy and player and potential other things
* Break NPC into the two different classes, idle quest-giver and mobile commentator
* Only let the player do one thing each interaction (currently they all trigger, multiple crop picking, multiple dialogues, etc)(could make a list with priorities then pick the highest)
* In a Speech, go through the lines and break up any that are too long for a text box
* Rather than recursion for the Cutscene, do trampoline code. When the promise resolves, it returns the next action. Then can do a while loop, calling "then" and getting the new action until we end
### Features
* Add trees into the scene too, another layer in tiled
* pick up the basket and it's what gives you an inventory
* complex dialogue systems (add branches and use choice? idk if I want this)
* dialogue should actually show up in bubbles, as a component on the screen
* a better way to handle key events. I'm thinking of a dict that maps key to 2 functions, one what to do when pressed, the other the canceller function if it's active (and maybe a bool if_active). Then we can pass in stuff that pauses the behavior of other keys, like opening the inventory stops motion, or how opening a dialogue bubble with e makes e now progress text rather than opening a new bubble. It has its own dict which stores the old listeners that it covered and cancels them for kaboom. Then when you end an interaction, it cancels its own listeners, and uses its internal dict to re-instate the next layer's listeners
* Expand the cutscene functionality
* let certain key words in text do the classic ~highlighting~, ie or Carrot, West, Farmer, etc. Have it be a text option, so like /Farmer/ would do it
* better scene locking mechanics. Add dialogue for if it's locked. Maybe have one var for locked_status and and one for message of why its locked. Then each promise when it completes will update the shared vars. Also the closing is weird and bad. Just have the scene's chapter updater choose it. Depending on what chapter it is, change what's locked and what quest to do to open it
### Narrative
* figure out a general plot arc
* where to go after studying the tsokas
* squeeze the name of the Petra's into the first story part
### Miscellaneous
* Log an issue that pingpong doesn't actually do anything
