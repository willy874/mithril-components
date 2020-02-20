import ICON from '../icon'

export default class Dashboard extends ICON {
    config() {
        return {
            viewBox: `0 0 384 384`
        }
    }
    path() {
        return `<g>
        <rect x="213.333" y="0" width="170.667" height="128"/>
        <rect x="0" y="0" width="170.667" height="213.333"/>
        <rect x="0" y="256" width="170.667" height="128"/>
        <rect x="213.333" y="170.667" width="170.667" height="213.333"/>
    </g>`
    }
}