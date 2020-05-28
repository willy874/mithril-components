import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
import uuid from 'uuid'
const cx = classNames.bind(styles)

class SelectComponent extends Component  {
    constructor(state) {
        super()
        //
        this.theme = state.theme || 'native'
        this.attrs = state.attrs
        //參數類
        this.readonly = state.readonly
        this.disabled = state.disabled
        this.options = state.options
        this.label = state.options.label
        this.panelHeight = state.options.panelHeight
        this.showError = (state.options.showError === false) ? false : true
        this.validateText = state.options.validateText || '選擇的內容有誤'
        this.validate = state.options.validate || ((value) => this.checkError(value,this.validateText))
        this.inputText = state.options.input
        this.textKey = state.textKey
        this.valueKey = state.valueKey
        this.events = state.events
        this.childrens = state.childrens
        this.selected = state.selected
        //實體類
        this.panelPrefix = state.options.panelPrefix
        this.panelSuffix = state.options.panelSuffix
        this.groupPrepend = state.options.groupPrepend
        this.groupAppend = state.options.groupAppend
        //內用變數
        this.value = state.value
        this.focus = state.focus
        this.active = state.active
        this.inputValue = state.inputValue
        //方法類
        this.hasError = state.hasError
        this.hasValue = state.hasValue
    }
    getSelectValue() {
        return (this.theme === 'material')?{
            [this.textKey]: this.inputValue
            || (document.activeElement!==this.inputValue && this.selected[this.textKey]) 
            || !(this.inputValue) && this.selected[this.textKey]
            || '',
            [this.valueKey]: this.value || (document.activeElement!==this.inputValue && this.selected[this.valueKey]) 
            || !(this.inputValue) && this.selected[this.valueKey]
            || '',
        }:{
            [this.textKey]: this.selected[this.textKey] || "",
            [this.valueKey]: this.selected[this.valueKey] || null
        }
    }
    getSelectAttrs(){
        const textKey = this.textKey
        const valueKey = this.valueKey
        return (this.theme === 'material')?{
            select: {
                oncreate: ()=>{
                    /** 控制鍵盤能用上下鍵來進行操作
                     * 38:ArrowUp
                     * 40:ArrowDown
                    */   
                    window.addEventListener('keydown',(e)=>{
                        const activeElement = document.activeElement
                        if(this.active){ 
                            if(e.keyCode == 38 || e.keyCode == 40){
                                e.preventDefault()
                                if(activeElement==this.input || activeElement==this.btn) {
                                    this.panel.children[0].focus()
                                }else if(e.keyCode == 38){
                                    activeElement.previousElementSibling.focus()
                                }else if(e.keyCode == 40){
                                    activeElement.nextElementSibling.focus()
                                }
                            }
                        }
                    })
                },
                onbeforeremove:()=>{   
                    //當移除Select時，移除全域監聽事件
                    const selectState = window.selectState
                    const indexOfId = Object.keys(selectState).filter(key => selectState[key] == this)[0]
                    delete selectState[indexOfId]
                }
            },
            button: {
                style: {display: (this.active && this.inputText)?'none':null},
                oncreate: (vnode)=>{
                    this.btn = vnode.dom
                    this.btn.uuid = this.id
                },
                onclick: (e) => {
                    e.preventDefault()
                    if (this.readonly || this.disabled) {
                        return
                    }
                    setTimeout(() => {
                        this.input.focus()
                    }, 0);
                    if(this.focus){
                        this.active = false
                    }
                    // clientY 紀錄滑鼠點擊的位置，判斷panel要往上或往下來打開
                    this.clientY = e.clientY
                    
                    // v 將value傳遞給自定義onclick事件
                    const v =  this.selected
                    if(this.events.onclick){
                        this.events.onclick(e,v,{
                            ...this.attrs
                        })
                    }
                }
            },
            input: {
                style: {display: (this.active && this.inputText)?null:'none'},
                readonly: !(this.inputText),
                oncreate:(vnode)=>{
                    this.input = vnode.dom
                },
                oninput: (e) => {
                    this.inputValue = e.target.value
                    const v = this.inputValue
                    //如果oninput合乎value或text則跳出 input 這個class樣式
                    const findChildren = this.childrens.filter((item,index) =>{
                        return (
                            item[textKey] == this.inputValue 
                            || item[valueKey] == this.inputValue 
                            || (/^[0-9] .?[0-9]*/.test(v) && index == this.inputValue)
                        )
                    })[0]
                    this.findIndex = this.childrens.indexOf(findChildren)
                    if(this.events.oninput){
                        this.events.oninput(e,this.value,{
                            ...this.attrs
                        })
                    }
                },
                onchange: (e) => {
                    //如果oninput合乎value或text則直接選取對象
                    const panelBtn = this.panel.querySelectorAll('button')
                    if(panelBtn){
                        panelBtn[this.findIndex].focus()
                    }
                    this.inputValue = false
                },
                onfocus: (e) => {
                    if (this.readonly || this.disabled) {
                        return
                    }
                    if(this.events.onfocus){
                        this.events.onfocus(e,{
                            ...this.attrs
                        })
                    }
                },
                onblur: (e) => {
                    //判斷離開Select時，則onblur
                    if (this.readonly || this.disabled) {
                        return
                    }
                    this.findIndex = null
                    if(this.panel && !this.panel.contains(e.relatedTarget)){
                        this.active = false
                        this.value = null
                        if(this.events.onblur){
                            this.events.onblur(e,{
                                ...this.attrs
                            })
                        }
                    }
                }
            },
            panel: {
                oncreate: (vnode)=>{
                    const panel = vnode.dom
                    this.panel = vnode.dom
                    const clientHeight = this.panel
                    const maxPanelHeight = this.panelHeight || 320
                    //判斷panel要避開window邊界
                    const _panelHeight = panel && Math.min(maxPanelHeight,panel.offsetHeight)
                    const btnOffsetHeight = this.btn && this.btn.offsetHeight || 0
                    const panelBottom = window.innerHeight - this.clientY < _panelHeight + btnOffsetHeight
                    const panelTop = this.clientY < _panelHeight + btnOffsetHeight
                    panel.style.height = `0px`,
                    panel.style.bottom = (panelBottom && !panelTop)?'100%':null,
                    panel.style.top = (panelTop)?'100%':null
                    //執行打開panel的動畫
                    panel.classList.add(cx('transition-3'))
                    window.requestAnimationFrame(()=>{
                        panel.style.height = `${_panelHeight}px`
                        panel.style.maxHeight = `${maxPanelHeight}px`
                    })
                },
                onbeforeremove: (vd)=> {
                    //清除 input 內的值
                    this.input.value = ''
                    //執行關閉 panel 的動畫
                    const panel = vd.dom
                    panel.style.height = 0
                    return new Promise((resolve)=> {
                        panel.addEventListener('transitionend',resolve)
                    })
                }
            },
        }:{
            select: {
                onfocus: this.events.onfocus,
                onblur: this.events.onblur,
                onclick: this.events.onclick,
                onchange: (e)=>{
                    const v = e.target.value
                    this.childrens.forEach(children=>{
                        if(children[this.valueKey] == v){
                            this.selected[this.textKey] = children[this.textKey]
                            this.selected[this.valueKey] = children[this.valueKey]
                        }
                    })
                    this.value = this.hasValue(this.selected)
                    this.hasError(this.validate(this.selected[this.valueKey]))
                    if(this.events.onchange){
                        this.events.onchange(e,this.value,{
                            ...this.attrs
                        })
                    }
                },
            }
        }
    }
    getSelectOptionAttrs(item) {
        return (this.theme === 'material')? {
            style: item.style || null,
            onblur: (e) => {
                //判斷離開Select時，則onblur
                if(!this.panel.contains(e.relatedTarget)){
                    this.active = false
                    this.value = null
                    setTimeout(() => {
                        this.btn.focus()
                    }, 0);
                    if(this.events.onblur){
                        this.events.onblur(e,{
                            ...this.attrs
                        })
                    }
                }
            },
            onclick: (e) => {
                e.preventDefault()
                if (item.disabled) {
                    return false
                }
                //將資料傳遞至selected物件中
                this.selected[this.textKey] = item[this.textKey]
                this.selected[this.valueKey] = item[this.valueKey]
                this.value = this.hasValue(this.selected)
                this.hasError(this.validate(this.selected[this.valueKey]))
                if(this.events.onchange){
                    this.events.onchange(e,this.value,{
                        ...this.attrs,
                        children: item
                    })
                }
                this.active = false
                this.inputValue = false
            }
        } : {
            disabled: item.disabled,
            style: item.style,
            class: item.class,
            value: item[this.valueKey],
        }
    }
}

window.selectState = new Object({})
//全域關閉事件
function clickEvent (e){
    const selectState = window.selectState
    for (let id in selectState) {
        if (selectState[id].theme === 'material'){
            if (!(selectState[id].active) 
                && selectState[id].id == e.target.uuid
                && !(selectState[id].disabled)
                && !(selectState[id].readonly)
                ) {
                selectState[id].active = true
            } else {
                selectState[id].active = false
                m.redraw()
            }
        }
    }
}
document.body.addEventListener('click',clickEvent)


export default function createSelect(entity){
    const selectUuid = uuid()
    const selectState = window.selectState
    selectState[selectUuid] = new SelectComponent(entity)
    selectState[selectUuid].id = selectUuid
    return selectState[selectUuid]
}