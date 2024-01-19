
export class Input {
    static UP = 'ArrowUp'
    static DOWN = 'ArrowDown'
    static W = 'KeyW'
    static R = 'KeyS'
    static L = 'KeyL'
    static A = 'KeyA'
    static S = 'KeyS'
    static D = 'KeyD'
    static F = 'KeyF'
    static SEMICOLON = 'Semicolon'
    static K = 'KeyK'
    static J = 'KeyJ'
    static H = 'KeyH'
    static G = 'KeyG'
    static Q = 'KeyQ'
    static E = 'KeyE'
    static R = 'KeyR'
    static P = 'KeyP'
    static O = 'KeyO'
    static I = 'KeyI'
    static U = 'KeyU'
    static Y = 'KeyY'
    static T = 'KeyT'
    static BRACKET_RIGHT = 'BracketRight'
    static Z = 'KeyZ'
    static PERIOD = 'Period'
    static X = 'KeyX'
    static C = 'KeyC'
    static COMMA = 'Comma'
    static M = 'KeyM'
    static V = 'KeyV'
    static N = 'KeyN'
    static B = 'KeyB'
    static SLASH = 'Slash'
    static SHIFT_RIGHT = 'ShiftRight'
    static SPACE = 'Space'
    static ALT_RIGHT = 'AltRight'
    static CONTROL_RIGHT = 'ControlRight'
    static ARROW_LEFT = 'ArrowLeft'
    static ARROW_DOWN = 'ArrowDown'
    static ARROW_RIGHT = 'ArrowRight'
    static PAGE_DOWN = 'PageDown'
    static ARROW_UP = 'ArrowUp'
    static ENTER = 'Enter'
    static BACKSLASH = 'Backslash'
    static BACKSPACE = 'Backspace'
    static BACKQUOTE = 'Backquote'
    static DELETE = 'Delete'
    static PAGE_UP = 'PageUp'
    static DIGIT_1 = 'Digit1'
    static DIGIT_2 = 'Digit2'
    static DIGIT_3 = 'Digit3'
    static DIGIT_4 = 'Digit4'
    static DIGIT_5 = 'Digit5'
    static DIGIT_6 = 'Digit6'
    static DIGIT_7 = 'Digit7'
    static DIGIT_8 = 'Digit8'
    static DIGIT_9 = 'Digit9'
    static DIGIT_0 = 'Digit0'
    static MINUS = 'Minus'
    static EQUAL = 'Equal'
    static ESCAPE = 'Escape'
    static TAB = 'Tab'
    static META_LEFT = 'MetaLeft'
    static ALT_LEFT = 'AltLeft'

    gameInputs = {}

    constructor() {
        window.addEventListener("keydown", this.onKeyDown.bind(this), false)
        window.addEventListener("keyup", this.onKeyUp.bind(this), false)
    }

    keyDown(key) {
        this.checkInput(key)
        let reset = !(this.gameInputs[key].reset === false)
        this.gameInputs[key] = { pressed: true, reset }
    }

    keyUp(key) {
        this.checkInput(key)
        this.gameInputs[key] = { pressed: false, reset: true }
    }

    onKeyUp(event) {
        this.keyUp(event.code)
    }

    onKeyDown(event) {
        this.keyDown(event.code)
    }

    isActionPressed(key) {
        this.checkInput(key)
        return this.gameInputs[key].pressed
    }

    isActionJustPressed(key) {
        this.checkInput(key)
        if (this.gameInputs[key].pressed && this.gameInputs[key].reset) {
            this.gameInputs[key].reset = false
            return true
        }
        return false
    }

    checkInput(key) {
        if (this.gameInputs[key] === undefined) {
            this.gameInputs[key] = { pressed: false, reset: true }
        }
    }
}