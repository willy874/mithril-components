import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'

export default class NativeSelectComponent extends Component {
    constructor(vnode) {
        super()
        const {
            selected,
            options,
            events,
            hasError,
            hasValue,
            childrens
        } = vnode.attrs

        this.hasError = hasError
        this.hasValue = hasValue
        //確認需要的屬性，防範Key為未定義
        this.options = this.checkAttrs(options,['textKey','valueKey','panelPrefix','panelSuffix'])
        const textKey = this.options.textKey || 'text'
        const valueKey = this.options.valueKey || 'value'
        this.childrens = []
        if(childrens){
            childrens.forEach((el,i) => {
                this.childrens[i] = this.checkAttrs(el,[textKey,valueKey,'disabled','selected','style','class'])
            })
        }
        this.selected = (this.hasValue())
        ?Object.assign(this.checkAttrs(this.hasValue(),[textKey,valueKey]),this.checkAttrs(selected,[textKey,valueKey])) 
        :this.checkAttrs(selected,[textKey,valueKey])
        this.events = this.checkAttrs(events,['onchange','onfocus','onblur','onclick'])
        
        //預設selected的值
        const defaultSelected = {
            [textKey]: this.childrens[0][textKey] || '請選擇',
            [valueKey]: this.childrens[0][valueKey] || null,
        }
        const selectedChildren = this.childrens.filter(item => item.selected)[0] || {
            [textKey]: undefined,
            [valueKey]: undefined
        }
        if(typeof this.selected ==='object'){
            this.selected[textKey] = selectedChildren[textKey] || this.selected[textKey] || '請選擇'
            this.selected[valueKey] = selectedChildren[valueKey] || this.selected[valueKey] || null
        }else if(childrens){
            this.selected = selectedChildren || defaultSelected
        }else{
            this.selected = defaultSelected
        }
        
    }
    oncreate() {
        m.redraw()
    }
    view(vnode) {
        this.checkError(vnode.attrs)
        const {
            childrens,
            disabled,
            required,
            autofocus,
            size,
            title,
            error,
            success,
            validate
        } = vnode.attrs
        const {
            panelPrefix,
            panelSuffix
        } = this.options
        const textKey = this.options.textKey || 'text'
        const valueKey = this.options.valueKey || 'value'
        const { 
            onchange,
            onfocus,
            onblur,
            onclick,
        } = this.events
        

        return m('select.custom-select.browser-default', {
                disabled,
                required,
                onfocus,
                onblur,
                onclick,
                autofocus,
                size,
                title,
                onchange: (e)=>{
                    this.value = e.target.value
                    console.log('e.target.value',e.target.value)
                    //判斷this.value是否有符合childrens選項
                    this.childrens.forEach(item=>{
                            if (this.value == item[valueKey] || this.value == item[textKey]) {
                                this.selected.value = item[valueKey]
                                this.selected.text = item[textKey]
                            }
                        })

                    this.hasValue(this.selected)
                    console.log('hasValue',this.hasValue())
                    const error = validate(this.selected[valueKey])
                    this.hasError(error)
                    const v = this.selected
                    if(onchange){
                        onchange(e,v,{
                            ...vnode.attrs
                        })
                    }
                },
                value: this.selected[valueKey] || '請選擇',
                class: classNames('form-control',{
                    'is-invalid': error,
                    'is-valid': success
                })
            }, [
                m('option[disabled]','請選擇'),
                (panelPrefix)?
                this.handleComponent(panelPrefix,'option',{
                    disabled: true,
                }): null,
                this.childrens.map((item,index) => {
                    if(!item[valueKey]){
                        item[valueKey] = index
                    }
                    
                    return m('option', {
                        style: item.style || null,
                        class: item.class || null,
                        value: item[valueKey],
                        disabled: item.disabled,
                        //判斷若沒有設定selected則帶入item.selected
                        selected: (item.selected) ? this.selected[valueKey] == item.selected[valueKey] : (item.selected) || null,
                    }, item[textKey])
                }),
                (panelSuffix)?
                this.handleComponent(panelSuffix,'option',{
                    disabled: true,
                }): null
            ]

        )
    }
}