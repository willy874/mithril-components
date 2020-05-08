import ICON from '../icon'

export default class FileOther extends ICON {
    config() {
        return {
            viewBox: `0 0 22.96 23.48`
        }
    }
    path() {
        return `
        <path fill="#000" d="M16.7,0H3.14A2.1,2.1,0,0,0,1,2.1H1V21.38a2.1,2.1,0,0,0,2.1,2.1H19.82a2.1,2.1,0,0,0,2.1-2.1h0V5Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6h2Z"/>
        <path fill="#fff" d="M20.87,6V21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6Z"/>
        <rect fill="#a5a9af" x="3.98" y="4.72" width="9.5" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="8.67" width="14.87" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="12.63" width="14.87" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="16.58" width="14.87" height="1.5" rx="0.75"/>
        `
    }
}
