import m from 'mithril'
import classNames from 'classnames/bind'
import styles from '../styles/main.css'
const cx = classNames.bind(styles);

export default class ICON {
    view(vnode) {
        const config = this.config()
        let attrs = {
            ...config,
            ...vnode.attrs
        }
        if (attrs.hasOwnProperty('class') && typeof attrs.class === 'string') {
            attrs.class = cx(attrs.class)
        }
        return m('svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]', attrs, [
            m.trust(this.path())
        ])
    }

}