import ICON from '../icon'

export default class BackArrowMirro extends ICON {
    config() {
        return {
            viewBox: `0 0 459 459`
        }
    }
    path() {
        return `
        <path d="M0,420.8c63.8-89.3,153-130,280.5-130v104.5L459,216.8L280.5,38.3v102C102,165.8,25.5,293.3,0,420.8z"/>
        `
    }
}
