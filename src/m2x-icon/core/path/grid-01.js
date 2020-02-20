import ICON from '../icon'

export default class Grid01 extends ICON {
    config() {
        return {
            viewBox: `0 0 341.333 341.333`
        }
    }
    path() {
        return `<g>
        <rect x="128" y="128" width="85.333" height="85.333"/>
        <rect x="0" y="0" width="85.333" height="85.333"/>
        <rect x="128" y="256" width="85.333" height="85.333"/>
        <rect x="0" y="128" width="85.333" height="85.333"/>
        <rect x="0" y="256" width="85.333" height="85.333"/>
        <rect x="256" y="0" width="85.333" height="85.333"/>
        <rect x="128" y="0" width="85.333" height="85.333"/>
        <rect x="256" y="128" width="85.333" height="85.333"/>
        <rect x="256" y="256" width="85.333" height="85.333"/>
    </g>`
    }
}