import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/textarea.css'
import createTextArea from './state'
const cx = classNames.bind(styles)

export default class TextAreaField extends Component {
    constructor(vnode) {
        super()
        
        //生成state
        if (vnode.attrs.state) {
            this.state = vnode.attrs.state
        }else{
            this.state =  new createTextArea({
                state: this,
                attrs: vnode.attrs
            })
        }
    }
    onbeforeupdate(vnode){
        this.state.onBeforeUpdate(vnode)
    }
    view() {
        return m('textarea', {
            style: this.state.style,
            class: classNames(this.state.textareaClass, {
                'is-valid': this.state.showValid() && !this.state.hasError() && !this.state.textareaAttrs.readonly,
                'is-invalid': this.state.hasError()
            }),
            ...this.state.getTextAreaAttrs().textarea
        })
    }
}