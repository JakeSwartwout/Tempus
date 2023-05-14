import { ASSERT, k } from "../kaboom_globals"


class TextBox {
    constructor(dialogue) {
        // expects dialogue to be a list of Speeches
        ASSERT(dialogue instanceof Array, "TextBox expects an array of speeches as input")
        this.dialogue = dialogue
        this.speech_num = 0
        this.cancel_keypress = () => {}
        this.onCompleteCallback = () => {}
    }

    startDialogue(onCompleteCallback = () => {}) {
        // TODO: animate box opening
        if (this.dialogue.length > 0) {
            this.speech_num = 0
            this.cancel_keypress = k.onKeyPress("t", () => {this.tryAdvanceDialogue()})
            this.onCompleteCallback = onCompleteCallback
            this.showCurrentLine()
        } else {
            this.onCompleteCallback()
        }
    }

    showCurrentLine() {
        // TODO: fun animations of the text coming in
        let speech = this.dialogue[this.speech_num]
        let line = speech.lines[speech.curr_line]
        // TODO: show it on the screen
        debug.log(speech.speaker + ": " + line)
    }

    incrementLine() {
        let speech = this.dialogue[this.speech_num]
        // more lines in the speech
        if (speech.curr_line < speech.lines.length - 1) {
            speech.curr_line ++
            return true
        // more speeches in the dialogue
        } else if (this.speech_num < this.dialogue.length - 1) {
            this.speech_num ++
            return true
        // nothing more to say
        } else {
            return false
        }
    }

    tryAdvanceDialogue() {
        if (this.incrementLine()) {
            this.showCurrentLine()
        } else {
            this.endDialogue()
        }
    }

    endDialogue() {
        this.cancel_keypress()
        debug.log("")
        this.onCompleteCallback()
    }
}

class Speech {
    constructor(speaker_name, lines, speaker_sprite = null) {
        this.speaker = speaker_name
        this.sprite = speaker_sprite
        this.lines = lines
        this.curr_line = 0

        // TODO: go through the lines and split up any that are larger than we
        // can fit in our text box
    }
}


/********************* Exports *********************/

export {
    TextBox,
    Speech
}