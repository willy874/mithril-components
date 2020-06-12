import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
import uuid from 'uuid'
const cx = classNames.bind(styles)

/**
 * @class SelectStateComponent
 */
class SelectStateComponent extends Component  {
    constructor(vnode) {
        super(vnode)
        const {attrs} = vnode
        //參數類
        this.class = attrs.class
        this.style = attrs.style
        this.title = attrs.title
        this.selected = attrs.selected
        this.theme = attrs.theme || 'native'
        this.success = attrs.success || false
        this.error = attrs.error || false
        this.disabled = attrs.disabled || false
        this.readonly = attrs.readonly || false
        this.valueKey = this.options.valueKey || 'value'
        this.textKey = this.options.textKey || this.valueKey && `${this.valueKey}Text` || 'text'
        this.panelHeight = this.options.panelHeight
        this.showError = (this.options.showError === false) ? false : true
        this.validateText = this.options.validateText || '選擇的內容有誤'
        this.validate = this.options.validate || ((valid) =>this.checkError(valid.hasValue()[this.valueKey],valid.text))
        this.inputText = this.options.inputText
        this.mobilePanelHeight = this.options.mobilePanelHeight
        this.mobileMode = this.isMobileDevice() ? this.options.mobileMode : false
        //實體類
        this.label = this.options.label
        this.panelPrefix = this.options.panelPrefix
        this.panelSuffix = this.options.panelSuffix
        this.groupPrepend = this.options.groupPrepend
        this.groupAppend = this.options.groupAppend
        //方法類
        this.hasError = (attrs.error)? this.stream(attrs.error) : this.stream(false)
        this.hasValue = (this.selected)? this.stream(this.selected) : this.stream(attrs.value)
        const init = true
        this.checkChildrens(init)
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
    checkChildrens(init){
        //判斷childrens是否有正確填寫
        if (this.childrens){
            if(!Array.isArray(this.childrens)){
                throw new Error('childrens必須是個陣列')
            }
            if(!this.childrens){
                throw new Error('childrens為必填參數')
            }
        }
        //判斷selected和value是否有正確填寫
        if(this.hasValue() || this.selected){
            if (typeof this.selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('selected應該是一個object')
            }
            if (typeof selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('value應該是一個object')
            }
        }else if(process.env.NODE_ENV !== 'production'){
            console.warn('請為select元件填寫selected或value給予傳遞的變數');
        }
        //確認需要的屬性，防範Key為未定義
        if (!this.childrens) {
            this.childrens = []
        }
        this.childrens.forEach((el,i) => {
            this.childrens[i] = this.checkAttrs(el,['text','value','disabled','selected','style','class'])
        })
        //制定預設 selected 的值
        const defaultSelected = {
            [this.textKey]: '請選擇',
            [this.valueKey]: null,
        }
        this.selected = (this.hasValue())
        ? this.checkAttrs(this.hasValue(),[this.textKey,this.valueKey])
        : defaultSelected

        //預設 selected 的值
        if(typeof this.selected ==='object'){
            this.selected[this.textKey] = this.selected[this.textKey] || defaultSelected[this.textKey]
            this.selected[this.valueKey] = this.selected[this.valueKey] || defaultSelected[this.valueKey]
        }else{
            this.selected = defaultSelected
        }
    }
    getComponentValue() {
        return (this.theme === 'material' || this.theme === 'bottomline' || this.theme === 'outline')?{
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
    getValidCalss(){
        return (this.showValid() && !this.hasError() && !this.readonly || this.success)?'success'
        :(this.hasError() || this.error)?'error'
        :(this.disabled)?'disabled':null
    }
    onBeforeUpdate(vnode){
        this.attrs = this.checkAttrs(vnode.attrs,['options','events','selected'])
        const attrs = this.filterAttrs(this.attrs,['theme','class','style'])
        const options = this.filterAttrs(this.attrs.options,['validate','groupPrepend','groupAppend','panelHeight','panelPrefix','panelSuffix','textKey','valueKey','input','label','validateText','mobilePanelHeight'])
        const checkEvents = this.checkEvent(this.attrs.events)
        const buttonEvents = this.filterAttrs(checkEvents,['oninput','onchange'])
        const selectEvents = this.excludeAttrs(checkEvents,['onclick','oninput','onchange','onfocus','onblur','onscroll'])
        this.checkChildrens()
        Object.assign(this,{
            ...attrs,
            ...options,
            events: Object.assign(this.events, {
                ...checkEvents
            }),
            buttonEvents: Object.assign(this.events, {
                ...buttonEvents
            }),
            selectEvents: Object.assign(this.events, {
                ...selectEvents
            }),
        })
        this.mobileMode = this.isMobileDevice() ? this.options.mobileMode : false
        this.success = vnode.attrs.success || false
        this.error = vnode.attrs.error || false
        this.disabled = vnode.attrs.disabled || false
    }
    getAttrs(){
        const textKey = this.textKey
        const valueKey = this.valueKey
        return (this.theme === 'material' || this.theme === 'bottomline' || this.theme === 'outline')?{
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
                                if(activeElement==this.inputDom || activeElement==this.btn) {
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
                title: this.title,
                style: {display: (this.active && this.inputText && !this.isMobileDevice())?'none':null},
                oncreate: (vnode)=>{
                    this.btn = vnode.dom
                    this.btn.uuid = this.id
                    this.offsetBox = this.getCoordinateBox(this.btn)
                },
                onclick: (e) => {
                    if (this.readonly || this.disabled) {
                        return
                    }
                    setTimeout(()=>{this.inputDom.focus()}, 0);
                    if(this.focus){
                        this.active = false
                        
                    }
                    // offsetBox 紀錄滑鼠點擊的Box位置，判斷panel要往上或往下來打開
                    if(this.events.onclick){
                        this.events.onclick(e,this.method)
                    }
                },
                ...this.buttonEvents
            },
            input: {
                title: this.title,
                style: {display: (this.active && this.inputText && !this.isMobileDevice())?null:'none'},
                readonly: !(this.inputText && !this.isMobileDevice()),
                oncreate:(vnode)=>{
                    this.inputDom = vnode.dom
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
                        this.events.oninput(e,this.method)
                    }
                },
                onchange: (e) => {
                    //如果oninput合乎value或text則直接選取對象
                    //抓取button.select-option
                    const panelBtn = this.panel.querySelectorAll('button')
                    if(panelBtn && !panelBtn.disabled){
                        panelBtn[this.findIndex].focus()
                    }
                    this.inputValue = false
                },
                onblur: (e) => {
                    //判斷離開Select時，則onblur
                    if (this.readonly || this.disabled) {
                        return
                    }
                    this.findIndex = null
                    // if(this.panel && !this.panel.contains(e.relatedTarget)){
                    //     this.active = false
                    //     this.value = null
                    //     if(this.events.onblur){
                    //         this.events.onblur(e,this.method)
                    //     }
                    //     console.log('onblur2');
                    // }
                },
            },
            dialog:{
                tabindex: (this.mobileMode)? -1 :false,
                role: (this.mobileMode)?'dialog' :false,
                'aria-modal': (this.mobileMode)?"true":false,
                oncreate: (vnode)=>{
                    const dialog = vnode.dom
                    const panel = vnode.dom.querySelector(`.${cx('select-panel')}`)
                    this.panel = panel
                    const maxMobilePanelHeight = this.mobilePanelHeight || 400
                    const _panelHeight = panel && Math.min(maxMobilePanelHeight,panel.offsetHeight)
                    panel.style.height = `0px`
                    document.body.classList.add(`${cx('select-dialog-body')}`)
                    //執行打開panel的動畫
                    panel.classList.add(cx('transition-3'))
                    const dialogAnimation = () => {
                        panel.style.height = `${_panelHeight}px`
                        panel.style.maxHeight = `${maxMobilePanelHeight}px`
                        dialog.removeEventListener('transitionend',dialogAnimation)
                    }
                    dialog.addEventListener('transitionend',dialogAnimation)
                    dialog.style.opacity = `1`
                },
                onbeforeremove: (vnode)=> {
                    //執行關閉 panel 的動畫
                    const panel = vnode.dom.querySelector(`.${cx('select-panel')}`)
                    panel.style.height = 0
                    document.body.classList.remove(`${cx('select-dialog-body')}`)
                    return new Promise((resolve)=> {
                        panel.addEventListener('transitionend',resolve)
                    })
                }
            },
            panel: {
                oncreate: (vnode)=>{
                    const panel = vnode.dom
                    this.panel = vnode.dom
                    const maxPanelHeight = this.panelHeight || 320
                    //判斷panel要避開window邊界
                    const _panelHeight = panel && Math.min(maxPanelHeight,panel.offsetHeight)
                    const btnOffsetHeight = this.btn && this.btn.offsetHeight || 0
                    const panelBottom =  window.innerHeight - (this.offsetBox.y - window.scrollY) < _panelHeight + btnOffsetHeight
                    const panelTop = this.offsetBox.y - window.scrollY < _panelHeight + btnOffsetHeight
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
                onbeforeremove: (vnode)=> {
                    //清除 input 內的值
                    this.inputDom.value = ''
                    //執行關閉 panel 的動畫
                    const panel = vnode.dom
                    panel.style.height = 0
                    return new Promise((resolve)=> {
                        panel.addEventListener('transitionend',resolve)
                    })
                },
                onscroll: (e)=>{
                    if(this.events.onscroll){
                        this.events.onscroll(e,this.method)
                    }
                }
            },
        }:{
            select: {
                onchange: (e)=>{
                    const v = e.target.value
                    this.childrens.forEach(children=>{
                        if(children.value == v){
                            this.selected[this.textKey] = children.text
                            this.selected[this.valueKey] = children.value
                        }
                    })
                    this.value = this.hasValue(this.selected)
                    this.hasError(this.validate(this.method))
                    if(this.events.onchange){
                        this.events.onchange(e,this.method)
                    }
                },
            }
        }
    }
    getChildrensAttrs(item) {
        return (this.theme === 'material' || this.theme === 'bottomline' || this.theme === 'outline')? {
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
                        this.events.onblur(e,this.method)
                    }
                }
            },
            onclick: (e) => {
                e.preventDefault()
                if (item.disabled) {
                    return false
                }
                //將資料傳遞至selected物件中
                this.selected[this.textKey] = item.text
                this.selected[this.valueKey] = item.value
                this.value = this.hasValue(this.selected)
                if (!this.hasError(this.validate(this.method))) {
                    this.showValid(this.hasValue())
                }
                if(this.events.onchange){
                    this.events.onchange(e,this.method,item)
                }
                this.active = false
                this.inputValue = false
            }
        } : {
            disabled: item.disabled,
            style: item.style,
            class: item.class,
            value: item.value,
        }
    }
}

window.selectState = new Object({})
//全域關閉事件
function clickEvent (e){
    const selectState = window.selectState
    for (let id in selectState) {
        if (selectState[id].theme === 'material' || selectState[id].theme === 'bottomline' || selectState[id].theme === 'outline'){
            if (!(selectState[id].active) 
                && selectState[id].id == e.target.uuid
                && !(selectState[id].disabled)
                && !(selectState[id].readonly)
                && !(e.target.disabled)
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
    selectState[selectUuid] = new SelectStateComponent(entity)
    selectState[selectUuid].id = selectUuid
    return selectState[selectUuid]
}