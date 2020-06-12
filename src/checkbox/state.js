import {Component} from '../util-components'
import uuid from 'uuid'
import classNames from 'classnames/bind'
import styles from './styles/checkbox.css'
const cx = classNames.bind(styles)

class CheckboxStateComponent extends Component  {
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
        this.validateText = this.options.validateText || '複選框不能無勾選'
        this.validate = this.options.validate || ((valid) => (valid.hasValue()[this.valueKey].length)?false:valid.text)
        this.valueKey = this.options.valueKey || 'value'
        //內部變數類
        this.hasError = (attrs.error)? this.stream(attrs.error) : this.stream(false)
        // 預設this.hasValue
        if(attrs.value && typeof attrs.value === 'object'){
            this.hasValue = this.stream(attrs.value)
            if (this.hasValue().hasOwnProperty(this.valueKey)) {
                if (!Array.isArray(this.hasValue()[this.valueKey])) {
                    throw new Error('value應該是一個Array')
                }
            }else{
                this.hasValue()[this.valueKey] = []
            }
        }else if(attrs.checked && Array.isArray(attrs.checked)){
            this.hasValue = this.stream({
                [this.valueKey]: attrs.checked
            })
        }else{
            this.hasValue = this.stream({[this.valueKey]:[]})
        }
        this.showValid = (this.hasValue() && this.hasValue()[this.valueKey].length)? this.stream(true) : this.stream(false)
        this.createMethod({
            state: ()=>this,
            text: this.validateText,
            hasError: this.hasError,
            hasValue: this.hasValue,
            validState: this.checkboxValidCalss,
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
    checkboxValidCalss(){
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
                    el = this.checkAttrs(el,['value','disabled','checked','style','class','id','label','events','checkboxEvents'])
                    el.id = (el.id)? el.id : uuid()
                    el.value = (el.value)? el.value : i
                    //檢查使用者預設checked
                    if(el.checked && !this.hasValue()[this.valueKey].includes(el.value) && init){
                        this.hasValue()[this.valueKey].push(el.value)
                    }
                    //更新事件參數
                    el.events = this.checkAttrs(el.events)
                    const checkEvents = this.checkEvent(el.events)
                    const checkboxEvents = this.excludeAttrs(checkEvents,['onclick'])
                    Object.assign(el,{
                        events: Object.assign(el.events, {
                            ...checkEvents
                        }),
                        checkboxEvents: Object.assign(el.events, {
                            ...checkboxEvents
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
            this.hasValue({[this.valueKey]:[]})
        }
        if(this.hasValue()[this.valueKey]){
            if (!Array.isArray(this.hasValue()[this.valueKey])) {
                throw new Error('checked、value必須是個陣列')
            }
        }else{
            this.hasValue({[this.valueKey]:[]})
        }
        if (process.env.NODE_ENV !== 'production') {
            this.hasValue()[this.valueKey].forEach((el,i) => {
                if(this.childrens.includes(el.value)){
                    console.warn(`checked[${i}]填入不在childrens的value預設值`)
                }
            })
        }
    }
    getAttrs(item){
        return {
            list: {
                key: item.id,
                style: item.style,
            },
            checkbox: {
                checked: this.hasValue()[this.valueKey].some(value => value===item.value),
                id: item.id,
                disabled: item.disabled,
                onclick: (e)=>{
                    const clickIndex = this.hasValue()[this.valueKey].indexOf(item.value)
                    if (clickIndex === -1) {
                        this.hasValue()[this.valueKey].push(item.value)
                        item.checked = true
                    }else{
                        this.hasValue()[this.valueKey].splice(clickIndex,1)
                        item.checked = false
                    }
                    if (!this.hasError(this.validate(this.method))) {
                        this.showValid(this.hasValue()[this.valueKey].length)
                    }
                    if(this.events.onclick){
                        this.events.onclick(e,this.method)
                    }
                },
                ...item.checkboxEvents
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
window.checkboxState = new Object({})
export default function createCheckbox(entity){
    const checkboxUuid = uuid()
    const checkboxState = window.checkboxState
    checkboxState[checkboxUuid] = new CheckboxStateComponent(entity)
    checkboxState[checkboxUuid].id = checkboxUuid
    return checkboxState[checkboxUuid]
}