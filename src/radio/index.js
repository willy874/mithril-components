import m from 'mithril'
import uuid from 'uuid/v4'
import Config from '../utils/config'
import classNames from 'classnames/bind'
import styles from './styles/radio.css'
const cx = classNames.bind(styles)

export default class Radio {
    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
            name,
            required
        } = vnode.attrs

        const classes = vnode.attrs.class
        const id = uuid()
        const _theme = theme ? theme : Config.theme

        return m('.custom-control.custom-radio', {
            class: [cx('radio', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="radio"]', {
                id,
                onclick,
                checked,
                disabled,
                name,
                required
            }),
            m('label.custom-control-label', {
                for: id
            }, [
                m('div', {
                    class: cx({
                        'radio-wave-effect-on': checked,
                        'radio-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}