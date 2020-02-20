import ICON from '../icon'

export default class BlockHR extends ICON {
    config() {
        return {
            viewBox: `0 0 50 50`
        }
    }
    path() {
        return `
        <rect x="0" y="22.5" height="4" width="50"/>
        <polygon points="17,0 33,0 33,4 27,4 27,20 23,20 23,4 17,4"/>
        <polygon points="17,30 33,30 33,34 27,34 27,50 23,50 23,34 17,34"/>`
    }
}