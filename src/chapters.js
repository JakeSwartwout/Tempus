import queryString from 'query-string'

const Chapter = {
    WAKEUP: 0,
    CARROT_GATHERING: 1,
    PETRA_GATHERING: 2,
    FARMHOUSE_DINNER: 3,
    TSOKA_ATTACK: 4,
    TSOKA_INVESTIGATION: 5,
}

let curr_chapter = Chapter.CARROT_GATHERING
let curr_scene = "01_Wakeup"

const GET_CHAPTER = function() {
    return curr_chapter
}

const SET_CHAPTER = function(new_chapter) {
    curr_chapter = new_chapter
    UPDATE_QUERY_CHAPTER(new_chapter)
}


/********************* URL Query Parsing *********************/

const LOAD_FROM_QUERY = function() {
    params = queryString.parse(location.search)
    if("chapter" in params) {
        curr_chapter = Number(params.chapter)
    } else {
        curr_chapter = Chapter.WAKEUP
    }
    if("scene" in params) {
        return params.scene
    } else {
        return "01_Wakeup"
    }
}

const UPDATE_QUERY = function(new_chapter, new_scene) {
	history_state = {
		chapter: new_chapter,
		scene: new_scene,
	}
    new_name = "Chapter: " + new_chapter + ", Scene: " + new_scene
	history.pushState(history_state, new_name, "?" + queryString.stringify(history_state))
}

const UPDATE_QUERY_CHAPTER = function(new_chapter) {
    UPDATE_QUERY(new_chapter, curr_scene)
}
const UPDATE_QUERY_SCENE = function(new_scene) {
    UPDATE_QUERY(curr_chapter, new_scene)
    curr_scene = new_scene
}


/********************* Exports *********************/

export {
    Chapter,
    GET_CHAPTER, SET_CHAPTER,
    LOAD_FROM_QUERY,
    UPDATE_QUERY_SCENE
}