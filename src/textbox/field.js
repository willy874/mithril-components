import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from '../textbox/styles/textbox.css'
import * as Icon from './icon'
import createInput from './state'
const cx = classNames.bind(styles)


export default class TextField extends Component {
    constructor(vnode) {
        super()
        //生成state
        if (vnode.attrs.state) {
            this.state = vnode.attrs.state
        }else{
            this.state =  new createInput({
                state: this,
                attrs: vnode.attrs
            })
        }
    }
    onbeforeupdate(vnode){
        this.state.onBeforeUpdate(vnode)
    }
    view() {
        const inputClass = classNames(this.state.inputClass, {
            'is-valid': this.state.showValid() && !this.state.hasError() && !this.state.inputAttrs.readonly,
            'is-invalid': this.state.hasError()
        },cx({
            'password-reveal': this.state.reveal
        }))
        
        if (this.state.reveal) {
            return m('div', {
                style: this.state.style,
                class: cx('field')
            }, [
                m('input', {
                    class: inputClass,
                    ...this.state.getInputAttrs().input
                }),
                m('button[type="button"]', {
                    class: classNames(cx('icon-btn')),
                    onclick: (e) => {
                        if (this.state.reveal === 'hidden') {
                            this.state.type = 'text'
                            this.state.reveal = 'visible'
                        } else {
                            this.state.type = 'password'
                            this.state.reveal = 'hidden'
                        }
                    }
                }, [
                    (this.state.reveal == 'hidden') ? m(Icon.ViewFill) : m(Icon.ViewDisable)
                ])
            ])
        }
        return m('input', {
            class: inputClass,
            ...this.state.getInputAttrs().input
        })
    }
}