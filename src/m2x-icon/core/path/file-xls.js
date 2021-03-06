import ICON from '../icon'

export default class FileXLSX extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path fill="#000"
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#1e6d40" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M10,22H8.31L6.69,19.4,5.07,22H3.48L5.8,18.44,3.63,15.06H5.26l1.51,2.51,1.47-2.51H9.83L7.64,18.52Z" />
            <path fill="#fff" d="M10.88,22v-7h1.48v5.75h2.83V22Z" />
            <path fill="#fff"
                d="M20.52,20.1a1.82,1.82,0,0,1-.68,1.49,3,3,0,0,1-1.89.54,4.44,4.44,0,0,1-2-.42V20.33a8.59,8.59,0,0,0,1.2.45,3.3,3.3,0,0,0,.89.13,1.24,1.24,0,0,0,.75-.19.64.64,0,0,0,.26-.55A.61.61,0,0,0,19,19.8a1.42,1.42,0,0,0-.33-.31c-.15-.09-.45-.25-.91-.47a4.84,4.84,0,0,1-1-.57,2.29,2.29,0,0,1-.51-.65,1.91,1.91,0,0,1-.19-.86,1.79,1.79,0,0,1,.63-1.45A2.58,2.58,0,0,1,18.41,15a3.9,3.9,0,0,1,1,.13,5.77,5.77,0,0,1,1,.36L20,16.6a6.93,6.93,0,0,0-.93-.32,2.94,2.94,0,0,0-.71-.09,1,1,0,0,0-.65.19.64.64,0,0,0-.22.51.65.65,0,0,0,.09.35,1,1,0,0,0,.29.28,9.69,9.69,0,0,0,.93.49,3.81,3.81,0,0,1,1.35.93A1.86,1.86,0,0,1,20.52,20.1Z" />
        </g>
        `
    }
}
