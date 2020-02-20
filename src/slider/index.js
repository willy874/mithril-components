import m from 'mithril'
import classNames from 'classnames/bind'
import styles from './styles/slider.css'
const cx = classNames.bind(styles)

export default class Slider {
    constructor() {

    }
    view(vnode) {
        const {} = vnode.attrs

        return m('.slider', [
            m('input[type="range"]', {
                class: cx('custom-range'),
                id: 'customRange',
            }),
            m('label', {
                for: 'customRange'
            }),
        ])

    }
}