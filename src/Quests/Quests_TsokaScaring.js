import { Chapter, GET_CHAPTER, SET_CHAPTER } from "../chapters.js";
import { k } from "../kaboom_globals.js";
import { PLAYER_NAME, TextBox, Speech, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"

/********************* Local Variables *********************/

const Q_SCARE_AWAY_TSOKAS = CLAIM_QUEST_ID()

const convo = {
    CREATURES_LEFT: 1,
    DONE_SCARING: 2,
    NEXT_STEPS: 3,
}


/********************* Class *********************/

class Quests_TsokaScaring extends QuestStates {
    constructor() {
        super([Q_SCARE_AWAY_TSOKAS])
        this.convo = convo.CREATURES_LEFT
    }
    setChapter(chapter) {
        switch(GET_CHAPTER()) {
            case Chapter.TSOKA_ATTACK:
                this.convo = convo.CREATURES_LEFT
                break;
            case Chapter.TSOKA_INVESTIGATION:
                this.convo = convo.NEXT_STEPS
                this.finish(Q_SCARE_AWAY_TSOKAS)
                break;
            default:
                SET_CHAPTER(Chapter.TSOKA_ATTACK)
                this.convo = convo.CREATURES_LEFT
                break;
        }
    }
    update() {
        switch(this.convo) {
            case convo.CREATURES_LEFT:
                if (k.get("tsoka").length == 0) {
                    this.convo = convo.DONE_SCARING
                    this.finish(Q_SCARE_AWAY_TSOKAS)
                    SET_CHAPTER(Chapter.TSOKA_INVESTIGATION)
                }
                break;
            case convo.DONE_SCARING:
                this.convo = convo.NEXT_STEPS
                break;
            case convo.NEXT_STEPS:
            default:
                // pass
                break;
        }
    }
    getDialogue() {
        switch(this.convo) {
            case convo.CREATURES_LEFT:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "There's still those... creatures... in our field",
                        "Please scare them away for us!",
                        "Press D to swing the hoe at them."
                    ]),
                ])
            case convo.DONE_SCARING:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Phew, thank you so much!",
                        "I guess the vegetables aren't the only that are changing around here...",
                        "I wonder where they came from?"
                    ]),
                    new Speech(PLAYER_NAME, [
                        "They all ran to the West."
                    ]),
                    new Speech("Farmers Wife", [
                        "Oh, maybe they have a nest up there.",
                        "I sure hope they don't come back."
                    ]),
                    new Speech(PLAYER_NAME, [
                        "I can head that way and check it out!",
                    ]),
                    new Speech("Farmers Wife", [
                        "Aw, you'd do that for us?"
                    ]),
                    new Speech(PLAYER_NAME, [
                        "I'd be happy to!"
                    ])
                ])
            case convo.NEXT_STEPS:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Good luck on your journey!"
                    ])
                ])
            default:
                return null
        }
    }
}


/********************* Exports *********************/

export {
    Quests_TsokaScaring,
    Q_SCARE_AWAY_TSOKAS
}