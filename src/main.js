import { LOAD_FROM_QUERY } from "./Story/chapters.js"
import { all_scenes, all_scenes_loaded } from "./Scenes/all_scenes.js"
import "./Scenes/sc_01_Wakeup.js"
import "./Scenes/sc_02_CarrotFarm.js"
import "./Scenes/sc_03_PetraFarm.js"
import "./Scenes/sc_04_Farmhouse.js"

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
