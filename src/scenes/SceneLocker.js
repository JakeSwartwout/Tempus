import { GET_CHAPTER } from "../Story/chapters"

const SL = {
    OPEN: 0,
    LOCKED: 1,
}

class SceneLocker {
    constructor(start_open) {
        this.open = start_open
        this.await_list = []
        this.creating_last_state = start_open
    }

    unlockBy(unlock_by_promise) {
        if(this.creating_last_state == SL.OPEN){
            throw new TypeError("Trying to unlock an already open scene")
        }
        // first stored item should always be a chapter
        if(this.await_list.length == 0) {
            this.linkPromise(unlock_by_promise)
        }
        this.creating_last_state = SL.OPEN
        return this
    }

    lockAtChapter(chapter) {
        if(this.creating_last_state == SL.LOCKED){
            throw new TypeError("Trying to lock an already locked scene")
        }
        this.await_list.push(chapter)
        this.creating_last_state = SL.LOCKED
        return this
    }

    isOpen() {
        if(this.open == SL.LOCKED) {
            // waiting for promise
            return false
        } else {
            // check chapter
            if(this.await_list.length == 0 || GET_CHAPTER() < this.await_list[0]) {
                return true
            } else {
                // passed the chapter, need to re-lock
                this.open = SL.LOCKED
                if(this.await_list.length == 1) {
                    // just the one chapter re-locker, end there
                    this.await_list = []
                } else if (this.await_list.length >= 2) {
                    // both a re-locker and unlocker promise, link up
                    this.linkPromise(this.await_list[1])
                    this.await_list = this.await_list.slice(2)
                }
            }
        }
    }

    linkPromise(promise) {
        promise.then(()=>{
            this.open = SL.OPEN
        })
    }
}


/********************* Exports *********************/

export {
    SL,
    SceneLocker,
}