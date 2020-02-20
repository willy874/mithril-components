import ICON from '../icon'

export default class TextAlignJustify extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `
        <path d="M286.9,160.5h224v40h-224V160.5z"/>
        <path d="M286.9,295.9h224v40h-224V295.9z"/>
        <path d="M297.9,425.2h213v40h-213V425.2z"/>
        <path d="M286.9,28.1h224v40h-224V28.1z"/>
        <path d="M0,292.9h224v40H0V292.9z"/>
        <path d="M0,160.5h224v40H0V160.5z"/>
        <path d="M0,28.1h226.2v40H0L0,28.1z"/>
        <path d="M0,425.2h224v40H0V425.2z"/>
        `
    }
}