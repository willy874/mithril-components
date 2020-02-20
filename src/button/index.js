import m from 'mithril'
import {
    WaveEffect
} from '../util-components'

export default class Button {
    view(vnode) {
        const {
            style,
            onclick,
            disabled
        } = vnode.attrs

        const classes = vnode.attrs.class

        return m('button[type="button"].btn', {
            class: classes,
            disabled,
            style,
            oncreate: (vnode) => {
                WaveEffect.attach(vnode.dom)
            },
            onremove: (vnode) => {
                WaveEffect.destory(vnode.dom)
            },
            onclick
        }, vnode.children)
    }
}