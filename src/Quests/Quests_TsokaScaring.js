import { k } from "../kaboom_globals.js";
import { PLAYER_NAME, TextBox, Speech, QuestStates, CLAIM_QUEST_ID } from "./QuestStates.js"

/********************* Local Variables *********************/

const Q_SCARE_AWAY_TSOKAS = CLAIM_QUEST_ID()


/********************* Class *********************/

class Quests_TsokaScaring extends QuestStates {
    constructor() {
        super([Q_SCARE_AWAY_TSOKAS])
        this.scared_all_away = false;
        this.gave_quest = false
    }
    update() {
        if (this.gave_quest)
            return;
        let all_gone = (k.get("tsoka").length == 0)
        if (!all_gone) {
            // still more to get
        } else if (!this.scared_all_away) {
            this.scared_all_away = true
            this.finish(Q_SCARE_AWAY_TSOKAS)
        } else {
            this.gave_quest = true
        }
    }
    getDialogue() {
        if (!this.scared_all_away) {
            return new TextBox([
                new Speech("Farmers Wife", [
                    "There's still those... creatures... in our field",
                    "Please scare them away for us!",
                    "Press D to swing the hoe at them."
                ]),
            ])
        } else if (!this.gave_quest) {
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
        } else {
            return new TextBox([
                new Speech("Farmers Wife", [
                    "Good luck on your journey!"
                ])
            ])
        }
    }
}


/********************* Exports *********************/

export {
    Quests_TsokaScaring,
    Q_SCARE_AWAY_TSOKAS
}