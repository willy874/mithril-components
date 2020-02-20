import ICON from '../icon'

export default class FirstIndent extends ICON {
    config() {
        return {
            viewBox: `0 0 190 190`
        }
    }
    path() {
        return `
        <polygon points="40.5,66 89.5,33 40.5,0 40.5,17 7.5,17 7.5,50 40.5,50"/>
        <rect x="7.5" y="215" width="232" height="33"/>
        <rect x="7.5" y="150" width="232" height="33"/>
        <rect x="7.5" y="83" width="232" height="33"/>
        <rect x="106.5" y="17" width="133" height="33"/>
        `
    }
}
