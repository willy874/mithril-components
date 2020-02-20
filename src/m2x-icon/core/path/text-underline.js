import ICON from '../icon'

export default class TextUnderline extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M3 18v-1.5h14V18zM5.2 10V3.6c0-.4.4-.6.8-.6.3 0 .7.2.7.6v6.2c0 2 1.3 2.8 3.2 2.8 1.9 0 3.4-.9 3.4-2.9V3.6c0-.3.4-.5.8-.5.3 0 .7.2.7.5V10c0 2.7-2.2 4-4.9 4-2.6 0-4.7-1.2-4.7-4z"/>
        `
    }
}