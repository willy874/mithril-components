import m from 'mithril'
import classNames from 'classnames/bind'
import styles from './main.css'
const cx = classNames.bind(styles);

export default class ICON {
    constructor(vnode){
        this.theme = vnode.attrs.theme
        this.color = vnode.attrs.color
    }
    /*
    * this.theme == string => file type = theme
    * this.theme == false => file type = other
    * this.color == true => color
    * this.color === true => currentColor
    * this.color == false => default color
    * colorDefault(default) return this.color || currentColor || default
    */
    colorDefault(cd){
        return (this.color)
            ? (this.color === true || this.color === 'color')? 'currentColor' : this.color 
            : cd
    }
    createSVG(attributes){
        const path = attributes.path
        delete attributes.path
        return  m(`svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]`, attributes, [
            m.trust(path)
        ])
    }
    view(vnode) {
        const config = this.config()
        let attrs = {
            ...config,
            ...vnode.attrs,
            fill: (this.color)? this.color :'currentColor'
        }
        if (attrs.hasOwnProperty('class') && typeof attrs.class === 'string') {
            attrs.class = cx(attrs.class)
        }
        return m(`svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]`, attrs, [
            m.trust(this.path())
        ])
    }

}