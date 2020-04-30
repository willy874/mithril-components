import m from 'mithril'
import classNames from 'classnames'
import {
    WaveEffect
} from '../util-components'

const wave = {
    oncreate: (vnode) => {
        // const light = vnode.attrs.effect.light || false
        WaveEffect.attach(vnode.dom)
    },
    onremove: (vnode) => {
        WaveEffect.destory(vnode.dom)
    }
}

export default class Button {
    constructor(vnode) {
        this.type = vnode.attrs.type || 'button'
        this.effect = {
            light: true
        }
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
            type: this.type,
            class: classNames('btn', vnode.attrs.class),
            accept: this.type === 'file' ? vnode.attrs.accept : undefined,
            multiple: this.type === 'file' ? (vnode.attrs.multiple ? true : undefined) : undefined,
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

        return m('button', attrs, vnode.children)
    }
}