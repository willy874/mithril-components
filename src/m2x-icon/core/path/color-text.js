import ICON from '../icon'

export default class colorText extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <path d="M14.1,10.8h-3.8l-0.7,2l3.1,0c0,0,1.3-2,2.9-3.6l-2.3-6.4h-2l-5,14h2l4-11.2L14.1,10.8z"/>
        <path d="M16.3,11.2c0,0-3.6,3.8-3.6,6.3s2.1,3.7,3.6,3.7s3.6-0.9,3.7-3.6C20,17.6,20.3,15.7,16.3,11.2z"/>
        `
    
    }
}