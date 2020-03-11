import m from 'mithril'
import classNames from 'classnames/bind'
import style from './styles/button.css'
const cx = classNames.bind(style)
import {
    WaveEffect
} from '../util-components'

const wave = {
    oncreate: (vnode) => {
        WaveEffect.attach(vnode.dom, true)
    },
    onremove: (vnode) => {
        WaveEffect.destory(vnode.dom, true)
    }
}

export default class IconButton {
    constructor(vnode) {
        this.effect = true
        if (vnode.attrs.effect === false) {
            this.effect = false
        }
    }
    view(vnode) {
        const {
            style,
            onclick,
            disabled
        } = vnode.attrs


        let attrs = {
            class: classNames('btn', vnode.attrs.class, cx('icon-wave-button')),
            disabled,
            style,
            onclick
        }

        if (this.effect) {
            attrs = {
                ...attrs,
                ...wave
            }
        }

        return m('button[type="button"]', attrs, vnode.children)
    }
}