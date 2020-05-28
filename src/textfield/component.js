import {Component} from '../util-components'
import uuid from 'uuid'

class InputComponent extends Component  {
    constructor(state) {
        super()
        //
        this.attrs = state.attrs
        this.options = state.attrs.options
        this.theme = state.theme || 'native'
        //參數類
        this.type = state.type || 'text'
        this.inputAttrs = state.inputAttrs
        this.class = state.class
        this.classInput = state.classInput || 'form-control'
        this.validateText = state.validateText || '輸入框不能空白'
        this.validate = state.validate || ((value,validateText) => this.checkError(value,validateText))
        this.events = state.events
        //實體類
        this.groupPrepend = state.groupPrepend
        this.groupAppend = state.groupAppend
        this.prefix = state.prefix
        this.suffix = state.suffix
        this.label = state.label
        //內部變數類
        this.reveal = (this.type === 'password') ? 'hidden' : null
        this.hasError = this.stream(state.error)
        this.hasValue = this.stream(state.value)
        this.showValid = (this.hasValue())? this.stream(true) : this.stream(false)
    }
    flylabel(){
        const fixed = this.inputAttrs.placeholder || this.prefix || this.hasValue()
        return fixed
    }
    textboxValidCalss(){
        return (this.showValid() && !this.hasError() && !this.inputAttrs.readonly)?'success'
        :(this.hasError())?'error'
        :(this.disabled)?'disabled':null
    }
    onBeforeUpdate(vnode){
        this.attrs = this.checkAttrs(vnode.attrs,['events','options','inputAttrs'])
        const attrs = this.filterAttrs(this.attrs,['theme','type','class'])
        const inputAttrs = this.filterAttrs(this.attrs,['id','minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required'])
        const options = this.filterAttrs(this.attrs.options,['validateText','validate','label','groupPrepend','groupAppen','prefix','suffix'])
        const events = this.filterAttrs(this.attrs.events,['onfocus', 'onblur','oninput','onchange'])
        Object.assign(this,{
            ...attrs,
            ...options,
            inputAttrs: Object.assign(this.inputAttrs, {
                ...inputAttrs
            }),
            events: Object.assign(this.events, {
                ...events
            })
        })
    }
    getInputValue() {
        return this.hasValue()
    }
    getInputAttrs(){
        return {
            input: {
                type: this.type,
                oninput: (e) => {
                    if(this.showValid() || this.hasError()){
                        this.hasValue(e.target.value)
                        if (!this.hasError(this.validate(e.target.value,this.validateText))) {
                            this.showValid(this.hasValue())
                        }
                    }
                    if(this.events.oninput){
                        this.events.oninput(e,{
                            ...this.attrs
                        })
                    }
                },
                onchange: (e) => {
                    this.hasValue(e.target.value)
                    this.hasError(this.validate(e.target.value,this.validateText))
                    this.showValid(this.hasValue())
                    if(this.events.onchange){
                        this.events.onchange(e,{
                            ...this.attrs
                        })
                    }
                },
                ...this.inputAttrs,
                ...this.events,
                value: this.getInputValue()
            }
        }
    }
}

export default function createInput(entity){
    const inputUuid = uuid()
    const inputState = window.selectState
    inputState[inputUuid] = new InputComponent(entity)
    inputState[inputUuid].id = inputUuid
    return inputState[inputUuid]
}