import ICON from '../icon'

export default class TextBackground extends ICON {
    config() {
        return {
            viewBox: `0 0 60 60`
        }
    }
    path() {
        return `
        <path d="M0,0.5v59h60v-59H0z M50,15.5c0,1.654-1.346,3-3,3s-3-1.346-3-3H33v30h2c1.654,0,3,1.346,3,3s-1.346,3-3,3H25
		c-1.654,0-3-1.346-3-3s1.346-3,3-3h2v-30H16c0,1.654-1.346,3-3,3s-3-1.346-3-3v-3.145c0-1.574,1.281-2.855,2.855-2.855h34.289
		C48.719,9.5,50,10.781,50,12.355V15.5z"/>
        `
    }
}