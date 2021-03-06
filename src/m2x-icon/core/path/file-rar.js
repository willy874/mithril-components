import ICON from '../icon'

export default class FileRAR extends ICON {
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
            <rect fill="#f9b721" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M3.6,19.37v2.68H2.12v-7h2a3.42,3.42,0,0,1,2.1.52,1.83,1.83,0,0,1,.69,1.57,1.91,1.91,0,0,1-.34,1.1,2.36,2.36,0,0,1-1,.75c1.05,1.56,1.73,2.58,2.05,3H6.05L4.38,19.37Zm0-1.2h.47a1.79,1.79,0,0,0,1-.24.83.83,0,0,0,.33-.73.76.76,0,0,0-.34-.71A2.08,2.08,0,0,0,4,16.28H3.6Z" />
            <path fill="#fff"
                d="M13.84,22.05l-.51-1.66H10.79l-.51,1.66H8.69l2.46-7H13l2.47,7ZM13,19.14c-.47-1.5-.73-2.35-.79-2.55s-.1-.35-.13-.47c-.1.41-.4,1.42-.9,3Z" />
            <path fill="#fff"
                d="M17.79,19.37v2.68H16.31v-7h2a3.47,3.47,0,0,1,2.11.52,2.07,2.07,0,0,1,.34,2.67,2.29,2.29,0,0,1-1,.75l2.05,3H20.24l-1.66-2.68Zm0-1.2h.48a1.78,1.78,0,0,0,1-.24.83.83,0,0,0,.34-.73.79.79,0,0,0-.34-.71,2.08,2.08,0,0,0-1.06-.21h-.45Z" />
        </g>
        `
    }
}
