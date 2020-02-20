import ICON from '../icon'

export default class Chat extends ICON {
    config() {
        return {
            viewBox: `0 0 36.427 36.427`
        }
    }
    path() {
        return `
        <path d="M5.036,5.036H29.32V23.249H6.811L5.036,25.025V5.036M5.036,2a3.032,3.032,0,0,0-3.02,3.036L2,32.356l6.071-6.071H29.32a3.045,3.045,0,0,0,3.036-3.036V5.036A3.045,3.045,0,0,0,29.32,2ZM8.071,17.178H20.214v3.036H8.071Zm0-4.553H26.285V15.66H8.071Zm0-4.553H26.285v3.036H8.071Z" transform="translate(1.036 1.036)"/>`
    }
}
