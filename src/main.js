import { LOAD_FROM_QUERY } from "./chapters.js"
import { all_scenes, all_scenes_loaded } from "./scenes/all_scenes.js"
import "./scenes/sc_01_Wakeup.js"
import "./scenes/sc_02_CarrotFarm.js"
import "./scenes/sc_03_PetraFarm.js"
import "./scenes/sc_04_Farmhouse.js"

all_scenes_loaded.then(() => {
    scene_result = LOAD_FROM_QUERY()
    if (!(scene_result in all_scenes)){
        console.log("URL does not contain a valid scene!")
        scene_result = "01_Wakeup"
    }
    all_scenes[scene_result].load.then((l_scene) => {
        l_scene.goDefault()
    })
})
