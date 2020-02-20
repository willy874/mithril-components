import m from 'mithril'
import classNames from 'classnames/bind'
import styles from '../util-components/styles/input.css'
const cx = classNames.bind(styles)

export default class DatePicker {
    constructor() {
        this.date = '109/1/1'
    }
    view(vnode) {
        const {
            value
        } = vnode.attrs

        return m('div', {
            class: cx('input-text-line')
        }, [
            m('input[type="text"]', {
                oncreate: (vnode) => {
                    if (vnode.dom.value) {
                        vnode.dom.classList.add('active')
                    }
                },
                oninput: (e) => {
                    this.date = e.target.value
                    console.log('input', e.target.value)
                },
                onchange: (e) => {
                    if (!e.target.value) {
                        e.target.classList.remove('active')
                    } else if (e.target.value) {
                        e.target.classList.add('active')
                    }
                },
                value: this.date
            }),
            (label) ? [
                m('label', '請輸入日期')
            ] : null
        ])
    }
}