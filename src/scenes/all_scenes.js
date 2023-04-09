
class scene_resolver {
    constructor() {
        this.load = new Promise((resolve, reject) => {
            this.completeLoading = resolve
            this.reject = reject
        })
    }
}

export const all_scenes = {
    "sc_01_Wakeup": new scene_resolver(),
    "sc_02_CarrotFarm": new scene_resolver(),
    "sc_03_PetraFarm": new scene_resolver(),
    "sc_03_PetraFarmCopy": new scene_resolver(),
}

let all_promises = []
for (let scene in all_scenes) {
    all_promises.push(all_scenes[scene].load)
}

export const all_scenes_loaded = Promise.all(all_promises)

// all_scenes_loaded.then(() => {console.log("all loaded!")})