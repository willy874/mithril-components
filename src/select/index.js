import m from 'mithril'
import stream from 'mithril/stream'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
import NativeSelectComponent from './native'
import GroupSelectComponent from './group'
import MaterialSelectComponent from './material'
import createSelect from './component'
const cx = classNames.bind(styles)

/**
 * @param Select
 * 如果要傳遞model，將selected之物件傳進value。
 * 可使用options.textKey、options.valueKey參數來修改model的參數KeyName
 */
export default class Select extends Component  {
    constructor(vnode) {
        super()
        const {
            options,
            selected,
            childrens,
            events
        } = vnode.attrs
        this.theme = vnode.attrs.theme
        this.hasError = stream(vnode.attrs.error)
        this.hasValue = stream(vnode.attrs.value)
        
        //判斷childrens是否有正確填寫
        if (childrens){
            if(!Array.isArray(childrens)){
                throw new Error('childrens必須是個陣列')
            }
            if(!childrens){
                throw new Error('childrens為必填參數')
            }
        }
        //判斷selected是否有正確填寫
        if(selected){
            if (typeof selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('selected應該是一個object')
            }
        }
        //判斷value是否有正確填寫
        if(this.hasValue()){
            if (typeof selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('value應該是一個object')
            }
        }
        //確認需要的屬性，防範Key為未定義
        this.options = this.checkAttrs(options,['input','panelHeight','groupPrepend','groupAppend','panelPrefix','panelSuffix','textKey','valueKey','validate'])  
        this.events = this.checkAttrs(events,['onchange','onfocus','onblur','oninput','onclick'])     
        this.textKey = this.options.textKey || 'text'
        this.valueKey = this.options.valueKey || 'value'
        this.childrens = []
        if(childrens){
            childrens.forEach((el,i) => {
                this.childrens[i] = this.checkAttrs(el,[this.textKey,this.valueKey,'disabled','selected','style','class'])
            })
        }
        this.selected = (this.hasValue())
        ?this.checkAttrs(this.hasValue(),[this.textKey,this.valueKey])
        :this.checkAttrs(selected,[this.textKey,this.valueKey])
        //制定預設 selected 的值
        const defaultSelected = {
            [this.textKey]: '請選擇',
            [this.valueKey]: null,
        }
        //預設 childrens 的值
        const selectedChildren = this.checkAttrs(this.childrens.filter(item => item.selected)[0],[this.textKey,this.valueKey])
        //預設 selected 的值
        if(typeof this.selected ==='object'){
            this.selected[this.textKey] = selectedChildren[this.textKey] || this.selected[this.textKey] || defaultSelected[this.textKey]
            this.selected[this.valueKey] = selectedChildren[this.valueKey] || this.selected[this.valueKey] || defaultSelected[this.valueKey]
        }else{
            this.selected = defaultSelected
        }
        
        this.active = false
        this.readonly = vnode.attrs.readonly || false
        this.disabled = vnode.attrs.disabled || false
        this.attrs = vnode.attrs
        
        //生成state
        this.state = createSelect(this)
    }
    onbeforeupdate(vnode){
        this.state.childrens = []
        vnode.attrs.childrens.forEach((el,i) => {
            this.state.childrens[i] = this.checkAttrs(el,[this.state.textKey,this.state.valueKey,'disabled','selected','style','class'])
        })
    }
    onupdate(vnode){
    }
    view(vnode) {
        const {
            success,
            error,
        } = vnode.attrs
        this.state.hasError(vnode.attrs.error)
        this.state.hasValue(vnode.attrs.value)
        
        return m('div', {
            class: classNames(vnode.attrs.class,{
                'success':  this.state.hasValue()[this.state.valueKey] && !this.state.hasError() || success,
                'error': this.state.hasError() || error,
                'disabled': this.state.disabled
            },cx('select', this.state.theme))
        }, [
            /**
             * theme: 'native'
             */
            (this.state.theme === 'native') 
            ? m(NativeSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title','required','autofocus','size','error','success'])
            }) : null,
            /**
             * theme: 'group'
             */
            (this.state.theme === 'group') 
            ? m(GroupSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title','required','autofocus','size','error','success'])
            }) : null,
            /** 
             * theme: 'material'
            */
            (this.state.theme === 'material') 
            ? m(MaterialSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title','readonly','disabled'])
            }) : null,
        ])
    }
}