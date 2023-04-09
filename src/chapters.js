export const Chapter = {
    CARROT_GATHERING: 1,
    PETRA_GATHERING: 2,
    FARMHOUSE_DINNER: 3,
    TSOKA_ATTACK: 4,
    TSOKA_INVESTIGATION: 5,
}

let curr_chapter = Chapter.CARROT_GATHERING

export const GET_CHAPTER = function() {
    return curr_chapter
}

export const SET_CHAPTER = function(new_chapter) {
    curr_chapter = new_chapter
}