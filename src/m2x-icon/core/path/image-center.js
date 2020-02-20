import ICON from '../icon'

export default class ImageCenter extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="M0,448h512v64H0V448z"/>
                <path d="M0,0h512v64H0V0z"/>
                <path d="M128,394.6h256c17.7,0,32-14.3,32-32v-224c0-17.7-14.3-32-32-32H128c-17.7,0-32,14.3-32,32v224
                C96,380.2,110.3,394.6,128,394.6L128,394.6z M160,170.6h192v160l-96-96l-96,96L160,170.6z"/>
                `
    }
}
