import {Component} from '../util-components'
import uuid from 'uuid'

const attrsAllows = ['id', 'minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'required']
class InputStateComponent extends Component  {
    constructor(vnode) {
        super(vnode)
        const {attrs} = vnode
        //參數類
        this.type = attrs.type
        this.value = attrs.value
        this.theme = attrs.theme || 'native'
        this.class = attrs.class
        this.style = attrs.style
        this.success = attrs.success || false
        this.error = attrs.error || false
        this.disabled = attrs.disabled || false
        this.type = attrs.type || 'text'
        this.inputAttrs = attrs.inputAttrs || this.filterAttrs(attrs,attrsAllows)
        this.inputClass = this.options.inputClass || 'form-control'
        this.inputStyle = this.options.inputStyle
        this.valueKey = this.options.valueKey || 'value'
        this.validateText = this.options.validateText || '輸入框不能空白'
        this.validate = this.options.validate || (valid => this.checkError(valid.hasValue()[this.valueKey],valid.text))
        //實體類
        this.groupPrepend = this.options.groupPrepend
        this.groupAppend = this.options.groupAppend
        this.prefix = this.options.prefix
        this.suffix = this.options.suffix
        this.label = this.options.label
        //內部變數類
        this.reveal = (this.type === 'password') ? 'hidden' : null
        this.hasError = (attrs.error)? this.stream(attrs.error) : this.stream(false)
        if(attrs.value && typeof attrs.value === 'object'){
            this.hasValue = this.stream(attrs.value)
        }else{
            this.hasValue = this.stream({
                [this.valueKey]: attrs.value
            })
        }
        this.showValid = (this.hasValue()[this.valueKey])? this.stream(true) : this.stream(false)
        /**
         * @string validateText
         * @function () state 取得目前元件的state
         * @function (object) hasValue 取得目前元件的Value，放入參數可立即修改元件中傳遞的model。
         * @function (string) hasError 取得目前元件的Error文字，success回傳為False，放入字串參數可立即修改元件中的valid狀態，並將字串顯示出來。
         * @function () validState 取得目前元件的valid狀態
         */
        this.createMethod({
            getState: this,
            text: this.validateText,
            hasError: this.hasError,
            hasValue: this.hasValue,
            validState: this.getValidCalss
        })
    }
    getComponentValue() {
        return this.hasValue()
    }
    getValidCalss(){
        return (this.showValid() && !this.hasError() && !this.inputAttrs.readonly || this.success)?'success'
        :(this.hasError() || this.error)?'error'
        :(this.inputAttrs.disabled)?'disabled':null
    }
    flylabel(){
        const fixed = this.inputAttrs.placeholder || this.prefix || this.hasValue()[this.valueKey]
        return fixed
    }
    onBeforeUpdate(vnode){
        this.attrs = this.checkAttrs(vnode.attrs,['events','options','inputAttrs'])
        const attrs = this.filterAttrs(this.attrs,['theme','type','class','style','success','error','disabled'])
        const inputAttrs = this.filterAttrs(this.attrs,attrsAllows)
        const options = this.filterAttrs(this.attrs.options,['validateText','validate','label','groupPrepend','groupAppen','prefix','suffix','valueKey'])
        const checkEvents = this.checkEvent(this.attrs.events)
        const inputEvents = this.excludeAttrs(checkEvents,['oninput','onchange'])
        Object.assign(this,{
            ...attrs,
            ...options,
            inputAttrs: Object.assign(this.inputAttrs, {
                ...inputAttrs
            }),
            inputEvents: Object.assign(this.events, {
                ...inputEvents
            }),
            events: Object.assign(this.events, {
                ...checkEvents
            })
        })
    }
    getInputAttrs(){
        return {
            input: {
                type: this.type,
                style: this.inputStyle,
                oninput: (e) => {
                    //防止空字串無法讀取
                    if(this.hasValue()[this.valueKey] === ""){
                        this.hasValue()[this.valueKey] = e.target.value
                        this.hasError(this.validate(this.method))
                        this.showValid((this.hasValue()[this.valueKey]))
                    }
                    //第一次onchange後才驗證
                    if(this.showValid() || this.hasError()){
                        this.hasValue()[this.valueKey] = e.target.value
                        if (!this.hasError(this.validate(this.method))) {
                            this.showValid(this.hasValue()[this.valueKey])
                        }
                    }
                    if(this.events.oninput){
                        this.events.oninput(e,this.method)
                    }
                },
                onchange: (e) => {
                    this.hasValue()[this.valueKey] = e.target.value
                    this.hasError(this.validate(this.method))
                    this.showValid((this.hasValue()[this.valueKey]))
                    
                    if(this.events.onchange){
                        this.events.onchange(e,this.method)
                    }
                },
                ...this.inputAttrs,
                ...this.inputEvents,
                value: this.getComponentValue()[this.valueKey]
            }
        }
    }
}
window.inputState = new Object({})
export default function createInput(entity){
    const inputUuid = uuid()
    const inputState = window.inputState
    inputState[inputUuid] = new InputStateComponent(entity)
    inputState[inputUuid].id = inputUuid
    return inputState[inputUuid]
}