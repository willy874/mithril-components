import m from 'mithril'
import uuid from 'uuid/v4'
import Config from '../utils/config'
import classNames from 'classnames/bind'
import styles from './styles/checkbox.css'
const cx = classNames.bind(styles)



export default class Checkbox {

    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
            required
        } = vnode.attrs

        const classes = vnode.attrs.class
        const id = uuid()
        const _theme = theme ? theme : Config.theme

        return m('.custom-control.custom-checkbox', {
            class: [cx('checkbox', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="checkbox"]', {
                id,
                onclick,
                checked,
                disabled,
                required
            }),
            m('label.custom-control-label', {
                for: id

            }, [
                m('div', {
                    class: cx({
                        'checkbox-wave-effect-on': checked,
                        //'checkbox-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}