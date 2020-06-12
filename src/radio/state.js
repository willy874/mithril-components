import {Component} from '../util-components'
import uuid from 'uuid'
import classNames from 'classnames/bind'
import styles from './styles/radio.css'
const cx = classNames.bind(styles)

class RadioStateComponent extends Component  {
    constructor(vnode) {
        super(vnode)
        const {attrs} = vnode
        //參數類
        this.theme = attrs.theme || 'native'
        this.class = attrs.class
        this.style = attrs.style
        this.success = attrs.success || false
        this.error = attrs.error || false
        this.disabled = attrs.disabled || false
        this.validateText = this.options.validateText || '單選框不能無勾選'
        this.validate = this.options.validate || ((valid) => (valid.hasValue()[this.valueKey])?false:valid.text)
        this.valueKey = this.options.valueKey || 'value'
        //內部變數類
        this.hasError = (attrs.error)? this.stream(attrs.error) : this.stream(false)
        // 預設this.hasValue
        if(attrs.value && typeof attrs.value === 'object'){
            this.hasValue = this.stream(attrs.value)
        }else if(attrs.checked && Array.isArray(attrs.checked)){
            this.hasValue = this.stream({
                [this.valueKey]: attrs.checked
            })
        }else{
            this.hasValue = this.stream({[this.valueKey]:[]})
        }
        this.showValid = (this.hasValue() && this.hasValue()[this.valueKey])? this.stream(true) : this.stream(false)
        this.createMethod({
            state: ()=>this,
            text: this.validateText,
            hasError: this.hasError,
            hasValue: this.hasValue,
            validState: this.validCalss,
        })
        const init = true
        this.childrensUpdate(init)
    }
    onBeforeUpdate(vnode){
        this.attrs = this.checkAttrs(vnode.attrs,['events','options','checked'])
        this.attrs = this.filterAttrs(this.attrs,['theme','class','style'])
        this.options = this.filterAttrs(this.attrs.options,['validateText','validate','valueKey'])
        this.childrens = this.attrs.childrens
        this.childrensUpdate()
        Object.assign(this,{
            ...attrs,
            ...options,
        })
        this.success = vnode.attrs.success || false
        this.error = vnode.attrs.error || false
        this.disabled = vnode.attrs.disabled || false
    }
    validCalss(){
        //頂層進行狀態管理
        return (this.showValid() && !this.hasError() || this.success)?'success'
        :(this.hasError() || this.error)?'error'
        :(this.disabled)?'disabled':null
    }
    childrensUpdate(init = false) {
        //檢查參數
        if (this.childrens){
            if(!Array.isArray(this.childrens)){
                throw new Error('childrens必須是個陣列')
            }
            if(this.childrens){
                this.childrens.forEach((el,i) => {
                    if(!el.label){
                        throw new Error('childrens的label為必填參數')
                    }
                    //檢查childrens所有參數
                    el = this.checkAttrs(el,['value','disabled','checked','style','class','id','label','events','radioEvents'])
                    el.id = (el.id)? el.id : uuid()
                    el.value = (el.value)? el.value :`${i}`
                    //檢查使用者預設checked
                    if(el.checked && init){
                        this.hasValue()[this.valueKey] = el.value
                    }
                    //更新事件參數
                    el.events = this.checkAttrs(el.events)
                    const checkEvents = this.checkEvent(el.events)
                    const radioEvents = this.excludeAttrs(checkEvents,['onclick'])
                    Object.assign(el,{
                        events: Object.assign(el.events, {
                            ...checkEvents
                        }),
                        radioEvents: Object.assign(el.events, {
                            ...radioEvents
                        }),
                    })
                })
            }
        }else{
            throw new Error('childrens為必填參數')
        }
        if(this.hasValue()){
            if (typeof this.hasValue() !== 'object') {
                throw new Error('checked、value必須是個object')
            }
        }else{
            this.hasValue({[this.valueKey]:null})
        }
    }
    getAttrs(item){
        return {
            list: {
                key: item.id,
                style: item.style,
            },
            radio: {
                checked: this.hasValue()[this.valueKey] == item.value,
                id: item.id,
                disabled: item.disabled,
                onclick: ()=>{
                    if (this.hasValue()[this.valueKey] == item.value) {
                        // item.checked = true
                    }else{
                        this.hasValue()[this.valueKey] = item.value
                        // item.checked = false
                    }
                    if (!this.hasError(this.validate(this.method))) {
                        this.showValid(!!this.hasValue()[this.valueKey])
                    }
                    if(this.events.onclick){
                        this.events.onclick(e,this.method)
                    }
                },
                ...item.radioEvents
            },
            label: {
                for: item.id,
            },
            waveEffectOn:{
                onbeforeremove: (vnode)=>{
                    const dom = vnode.dom
                    dom.classList.add(`${cx('on')}`)
                    return new Promise((resolve)=> {
                        dom.addEventListener('animationend',resolve)
                    })
                }
            },
            waveEffectOff:{
                onbeforeremove: (vnode)=>{
                    const dom = vnode.dom
                    dom.classList.add(`${cx('off')}`)
                    return new Promise((resolve)=> {
                        dom.addEventListener('animationend',resolve)
                    })
                }
            }
        }
    }
}
window.radioState = new Object({})
export default function createRadio(entity){
    const radioUuid = uuid()
    const radioState = window.radioState
    radioState[radioUuid] = new RadioStateComponent(entity)
    radioState[radioUuid].id = radioUuid
    return radioState[radioUuid]
}