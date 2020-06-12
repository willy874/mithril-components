import {Component} from '../util-components'
import uuid from 'uuid'

const attrsAllows = ['id', 'disabled', 'readonly', 'required', 'tabindex', 'minlength', 'maxlength', 'wrap', 'rows', 'cols', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style']
class TextareaStateComponent extends Component  {
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
        this.textareaAttrs = attrs.textareaAttrs || this.filterAttrs(attrs,attrsAllows)
        this.textareaClass = this.options.textareaClass || 'form-control'
        this.textareaStyle = this.options.textareaStyle
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
        this.hasError = (attrs.error)? this.stream(attrs.error) : this.stream(false)
        this.hasValue = this.stream(attrs.value)
        if(attrs.value && typeof attrs.value === 'object'){
            this.hasValue = this.stream(attrs.value)
        }else{
            this.hasValue = this.stream({
                [this.valueKey]: attrs.value
            })
        }
        this.showValid = (this.hasValue()[this.valueKey])? this.stream(true) : this.stream(false)
        this.createMethod({
            state: ()=>this,
            text: this.validateText,
            hasError: this.hasError,
            hasValue: this.hasValue,
            validState: this.getValidCalss,
        })
    }
    getValidCalss(){
        return (this.showValid() && !this.hasError() && !this.textareaAttrs.readonly || this.success)?'success'
        :(this.hasError() || this.error)?'error'
        :(this.textareaAttrs.disabled)?'disabled':null
    }
    getComponentValue() {
        return this.hasValue()
    }
    flylabel(){
        const fixed = this.textareaAttrs.placeholder || this.prefix || this.hasValue()[this.valueKey]
        return fixed
    }
    onBeforeUpdate(vnode){
        this.attrs = this.checkAttrs(vnode.attrs,['events','options','inputAttrs'])
        const attrs = this.filterAttrs(this.attrs,['theme','type','class','style','success','error','disabled'])
        const textareaAttrs = this.filterAttrs(this.attrs,attrsAllows)
        const options = this.filterAttrs(this.attrs.options,['validateText','validate','label','groupPrepend','groupAppen','prefix','suffix'])
        const checkEvents = this.checkEvent(this.attrs.events)
        const textareaEvents = this.excludeAttrs(checkEvents,['oninput','onchange'])
        Object.assign(this,{
            ...attrs,
            ...options,
            textareaAttrs: Object.assign(this.textareaAttrs, {
                ...textareaAttrs
            }),
            textareaEvents: Object.assign(this.events, {
                ...textareaEvents
            }),
            events: Object.assign(this.events, {
                ...checkEvents
            })
        })
    }
    getTextAreaAttrs(){
        return {
            textarea: {
                style: this.textareaStyle,
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
                    this.showValid(this.hasValue()[this.valueKey])
                    if(this.events.onchange){
                        this.events.onchange(e,this.method)
                    }
                },
                ...this.textareaAttrs,
                ...this.textareaEvents,
                value: this.getComponentValue()[this.valueKey]
            }
        }
    }
}
window.textareaState = new Object({})
export default function createTextArea(entity){
    const textareaUuid = uuid()
    const textareaState = window.textareaState
    textareaState[textareaUuid] = new TextareaStateComponent(entity)
    textareaState[textareaUuid].id = textareaUuid
    return textareaState[textareaUuid]
}