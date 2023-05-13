import { k } from "../kaboom_globals.js";
import { PLAYER_NAME, TextBox, Speech, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"
import { Chapter, SET_CHAPTER } from "../Story/chapters.js";

/********************* Local Variables *********************/

const Q_SCARE_AWAY_TSOKAS = CLAIM_QUEST_ID()

const convo = {
    NOT_MET: 0,
    FIRST_EXPLAIN: 1,
    CREATURES_LEFT: 2,
    DONE_SCARING: 3,
    NEXT_STEPS: 4,
}


/********************* Class *********************/

class Quests_TsokaScaring extends QuestStates {
    constructor() {
        super([Q_SCARE_AWAY_TSOKAS])
        this.convo = convo.NOT_MET
    }
    setChapter(chapter) {
        switch(chapter) {
            case Chapter.TSOKA_ATTACK:
                this.convo = convo.NOT_MET
                break;
            case Chapter.TSOKA_INVESTIGATION:
                this.convo = convo.NEXT_STEPS
                this.finish(Q_SCARE_AWAY_TSOKAS)
                break;
            default:
                SET_CHAPTER(Chapter.TSOKA_ATTACK)
                this.convo = convo.NOT_MET
                break;
        }
    }
    update() {
        switch(this.convo) {
            case convo.NOT_MET:
                this.convo = convo.FIRST_EXPLAIN
                break;
            case convo.FIRST_EXPLAIN:
                this.convo = convo.CREATURES_LEFT
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
            case convo.NOT_MET:
                return;
            case convo.FIRST_EXPLAIN:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Oh no! Some sort of create has gotten into our garden!",
                    ]),
                    new Speech("Creature", [
                        "SQUEAK!",
                    ]),
                    new Speech("Farmers Wife", [
                        "And they're destroying all of our crops!",
                        "Please help us get rid of them!",
                    ])
                ])
            case convo.CREATURES_LEFT:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "There's still those... creatures... in our field",
                        "Please scare them away for us!",
                        "Press D to swing the hoe at them."
                    ]),
                    new Speech("Creature", [
                        "SQUEAK!",
                    ])
                ])
            case convo.DONE_SCARING:
                return new TextBox([
                    new Speech("Farmers Wife", [
                        "Phew, thank you so much!",
                        "I guess the vegetables aren't the only that are changing around here...",
                        "I wonder where they came from?"
                    ]),
                    new Speech(PLAYER_NAME, [
                        "They all ran to the West, maybe they have a nest out there?"
                    ]),
                    new Speech("Farmers Wife", [
                        "Oh, that could be!",
                        "...",
                        "I just hope they don't come back."
                    ]),
                    new Speech(PLAYER_NAME, [
                        "I can head that way and scare them a bit further!",
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
                BAD_DEFAULT(this.convo, "Quests_TsokaScaring.getDialogue")
        }
    }
}


/********************* Exports *********************/

export {
    Quests_TsokaScaring,
    Q_SCARE_AWAY_TSOKAS
}