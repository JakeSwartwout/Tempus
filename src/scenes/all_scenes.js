
class scene_resolver {
    constructor() {
        this.ready = false
        this.load = new Promise((resolve, reject) => {
            this.completeLoading = () => {this.ready = true; resolve(); }
            this.reject = reject
        })
    }
}

export const all_scenes = {
    "sc_01_Wakeup": new scene_resolver(),
    "sc_02_CarrotFarm": new scene_resolver(),
    "sc_03_PetraFarm": new scene_resolver(),
}

let all_promises = []
for (let scene in all_scenes) {
    all_promises.push(all_scenes[scene].load)
}

export const all_scenes_loaded = Promise.all(all_promises)

// all_scenes_loaded.then(() => {console.log("all loaded!")})

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