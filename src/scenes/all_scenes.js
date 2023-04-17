/********************* Store information on load status *********************/

class scene_resolver {
    constructor() {
        this.ready = false
        this.load = new Promise((resolve, reject) => {
            this.completeLoading = (scene_obj) => {
                this.ready = true;
                resolve(scene_obj);
            }
            this.reject = reject
        })
    }
}


/********************* All current scenes *********************/

const all_scenes = {
    "01_Wakeup": new scene_resolver(),
    "02_CarrotFarm": new scene_resolver(),
    "03_PetraFarm": new scene_resolver(),
    "04_Farmhouse": new scene_resolver(),
}

let all_promises = []
for (let scene in all_scenes) {
    all_promises.push(all_scenes[scene].load)
}

const all_scenes_loaded = Promise.all(all_promises)


/********************* Backup debug catcher *********************/

// after 4 seconds, print which scenes still haven't loaded
setTimeout(() => {
    let unloaded_scenes = []
    for(let scene in all_scenes) {
        if (!all_scenes[scene].ready) {
            unloaded_scenes.push(scene)
        }
    }
    if (unloaded_scenes.length > 0){
        console.log("Still haven't loaded the following scenes:")
        console.log(unloaded_scenes)
        debug.log("Having trouble loading all of the scenes...")
    }
}, 4000)


/********************* Marking a scene as done *********************/

const DONE_LOADING_SCENE = function(scene) {
    all_scenes[scene.name].completeLoading(scene)
}


/********************* Exports *********************/

export {
    all_scenes,
    all_scenes_loaded,
    DONE_LOADING_SCENE
}