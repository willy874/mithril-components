import m from 'mithril'
import uuid from 'uuid/v4'
import Config from '../utils/config'
import classNames from 'classnames/bind'
import styles from './styles/switch.css'
const cx = classNames.bind(styles)

export default class Switch {
    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
        } = vnode.attrs
        const classes = vnode.attrs.class
        const id = uuid()
        const _theme = theme ? theme : Config.theme

        return m('.custom-control.custom-switch', {
            class: [cx('switch', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="checkbox"]', {
                id,
                onclick,
                checked,
                disabled
            }),
            m('label.custom-control-label', {
                for: id
            }, [
                m('div', {
                    class: cx({
                        'switch-wave-effect-on': checked,
                        //'switch-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}