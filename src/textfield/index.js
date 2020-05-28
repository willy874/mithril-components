import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from '../textbox/styles/textbox.css'
import * as Icon from './icon'
import InputComponent from './component'
const cx = classNames.bind(styles)

export default class TextField extends Component {
    constructor(vnode) {
        super()
        this.attrs = this.checkAttrs(vnode.attrs,['events','options'])
        this.inputAttrs = vnode.attrs.inputAttrs ||
        this.filterAttrs(vnode.attrs,['id','minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required'])
        this.options = this.checkAttrs(vnode.attrs.options,['validateText','validate'])
        this.events = this.checkAttrs(vnode.attrs.events,['onfocus', 'onblur'])

        this.validate = this.options.validate
        this.validateText = this.options.validateText
        this.classInput = vnode.attrs.class
        this.type = vnode.attrs.type
        this.value = vnode.attrs.value

        //生成state
        if (vnode.attrs.state) {
            this.state = vnode.attrs.state
        }else{
            this.state =  new InputComponent(this)
        }
    }
    onbeforeupdate(vnode){
        this.state.onBeforeUpdate(vnode)
    }
    view() {
        const inputClass = classNames(this.state.classInput, {
            'is-valid': this.state.showValid() && !this.state.hasError() && !this.state.inputAttrs.readonly,
            'is-invalid': this.state.hasError()
        },cx({
            'password-reveal': this.state.reveal
        }))
        
        if (this.state.reveal) {
            return m('div', {
                class: cx('d-flex')
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