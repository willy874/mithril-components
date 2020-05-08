import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
import uuid from 'uuid'
const cx = classNames.bind(styles)

/**
 * 每次在body進行onclick行為時，會針對全域class MaterialSelectComponent執行迴圈，
 * 該事件判斷是否進行開啟或關閉，並也同時監測onfocus防止重複操作。
 */
let selectActive = []
document.body.addEventListener('click', (e) => {
    //全域關閉事件
    for (let i = 0; i < selectActive.length; i++) {
        if (!(selectActive[i].active) 
            && selectActive[i].btn == e.target
            && !(selectActive[i].disabled)
            && !(selectActive[i].readonly)
            ) {
            selectActive[i].active = true
        } else {
            if(selectActive[i].focusEvent){
                selectActive[i].active = false
                m.redraw()
            }else{
                selectActive[i].focusEvent = true
            }
        }
    }
})
/**
 * 採用自定義Select Component
 * @param MaterialSelectComponent
 */
export default class MaterialSelectComponent extends Component  {
    constructor(vnode) {
        super()
        const {
            options,
            selected,
            childrens,
            events,
            hasError,
            hasValue,
        } = vnode.attrs
        this.hasError = hasError
        this.hasValue = hasValue
        //確認需要的屬性，防範Key為未定義
        this.options = this.checkAttrs(options,['input','panelHeight','panelPrefix','panelSuffix','textKey','valueKey'])
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
        this.events = this.checkAttrs(events,['onchange','onfocus','onblur','oninput','onclick'])
        
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
        this.active = false
        this.disabled = vnode.attrs.disabled || false
        selectActive.push(this)
        
    }
    oncreate(vnode) {
        //當建立Select時，在this.btn和this.input紀錄這個Select的input實體
        this.btn = vnode.dom.querySelectorAll(`.${cx('select-btn-button')}`)[0]
        this.input = vnode.dom.querySelectorAll(`.${cx('select-btn-input')}`)[0]
        this.btn.uuid = uuid()
        /** 控制鍵盤能用上下鍵來進行操作
         * 38:ArrowUp
         * 40:ArrowDown
        */   
        window.addEventListener('keydown',(e)=>{
            const activeElement = document.activeElement
            if(this.active){ 
                if(e.keyCode == 38 || e.keyCode == 40){
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
    }
    onbeforeremove(){   
        //當移除Select時，移除全域監聽事件
        const indexOf = selectActive.map((el)=> el.btn.uuid).indexOf(this.btn.uuid);
        if(indexOf !== -1){
            selectActive.splice(indexOf,1)
        }
    }
    view(vnode) {
        this.checkError(vnode.attrs)
        const {
            disabled,
            readonly,
            validate,
            title
        } = vnode.attrs
        const { 
            onchange,
            oninput,
            onfocus,
            onblur,
            onclick,
        } = this.events
        const { 
            input,
            panelHeight,
            panelPrefix,
            panelSuffix,
        } = this.options
        const textKey = this.options.textKey || 'text'
        const valueKey = this.options.valueKey || 'value'
        //判斷panel要避開window邊界的變數
        
        

        return m('div', {
            class: cx('select-dropdown', {
                'active': this.active,
                'disabled': disabled,
            })
        }, [
            m('div', {
                class: cx('select-btn'),
            }, [
                m('button[type="text"]',{
                    class: cx('select-btn-button'),
                    style: {display: (this.active && input)?'none':null},
                    onclick: (e) => {
                        e.preventDefault()
                        if (readonly || disabled) {
                            return
                        }
                        setTimeout(() => {
                            this.input.focus()
                        }, 0);
                        if(this.focus){
                            this.active = false
                        }
                        // this.clientY 紀錄滑鼠點擊的位置，判斷panel要往上或往下來打開
                        this.clientY = e.clientY
                        
                        // v 將value傳遞給自定義onclick事件
                        const v =  this.selected
                        if(onclick){
                            onclick(e,v,{
                                ...vnode.attrs
                            })
                        }
                    },
                },this.value
                    || (document.activeElement!==this.input && this.selected[textKey]) 
                    || !(input) && this.selected[textKey]
                    || '',),
                m('input[type="text"]',{
                    class: cx('select-btn-input'),
                    style: {display: (this.active && input)?null:'none'},
                    readonly: !(input),
                    title: title,
                    oninput: (e) => {
                        this.value = e.target.value
                        if(oninput){
                            oninput(e,this.value,{
                                ...vnode.attrs
                            })
                        }
                    },
                    onchange: (e) => {
                        //如果oninput合乎value或text則直接選取對象
                        const v = this.value
                        let _find = false
                        let _findIndex = 0
                        this.childrens.forEach((item,index) => {
                                if(item[valueKey] == v){
                                    _find = true
                                    _findIndex = index
                                }
                                if(item[textKey] == v){
                                    _find = true
                                    _findIndex = index
                                }
                                if (_find) {
                                    return
                                }
                            })
                        
                        if(_findIndex === 0 && /^[0-9] .?[0-9]*/.test(item.value)){
                            if(this.panel.querySelectorAll('button')[this.value]){
                                this.panel.querySelectorAll('button')[this.value].focus()
                            }
                        }else{
                            this.panel.querySelectorAll('button')[_findIndex].focus()
                        }
                        
                        this.value = false
                    },
                    onfocus: (e) => {
                        if (readonly || disabled || vnode.attrs.focusEvent) {
                            return
                        }
                        if(onfocus){
                            onfocus(e,{
                                ...vnode.attrs
                            })
                        }
                    },
                    onblur: (e) => {
                        //判斷離開Select時，則onblur
                        if (readonly || disabled || vnode.attrs.focusEvent) {
                            return
                        }
                        if(this.panel && !this.panel.contains(e.relatedTarget)){
                            this.active = false
                            this.value = null
                            if(onblur){
                                onblur(e,{
                                    ...vnode.attrs
                                })
                            }
                        }
                    }, 
                    onclick: (e) => {}
                }),
                m('div', {
                    class: cx('select-line')
                }),
            ]),
            
            (this.active)? m('div',{
                class: cx('select-panel'),
                oncreate: (vd)=>{
                    this.panel = vd.dom
                    const clientHeight = this.panel.clientHeight
                    const maxPanelHeight = panelHeight || 320
                    //判斷panel要避開window邊界
                    const _panelHeight = this.panel && Math.min(maxPanelHeight,this.panel.offsetHeight)
                    const btnOffsetHeight = this.btn && this.btn.offsetHeight || 0
                    const panelBottom = window.innerHeight - this.clientY < _panelHeight + btnOffsetHeight
                    const panelTop = this.clientY < _panelHeight + btnOffsetHeight
                    this.panel.style.maxHeight = `${maxPanelHeight}px`,
                    this.panel.style.bottom = (panelBottom && !panelTop)?'100%':null,
                    this.panel.style.top = (panelTop)?'100%':null
                    //執行打開panel的動畫
                    this.panel.style.height = 0
                    this.panel.classList.add(cx('transition-3'))
                    window.requestAnimationFrame(()=>{
                        this.panel.style.height = `${clientHeight}px`
                    })
                },
                onbeforeremove: ()=> {
                    //執行關閉panel的動畫
                    this.panel.style.height = 0
                    return new Promise((resolve)=> {
                        this.panel.addEventListener('transitionend',resolve)
                    })
                },
            },[
                (panelPrefix)?
                this.handleComponent(panelPrefix,'div',{
                    class: cx('select-option')
                }): null,
                this.childrens.map((item, index) => {
                    if(!item[valueKey]){
                        item[valueKey] = index
                    }
                    return m('button', {
                        style: item.style || null,
                        class: cx('select-option',item.class, {
                            'active': item.disabled || (this.selected[valueKey] === item[valueKey]),
                            'input': (this.value === item[valueKey]) || (this.value === item[textKey]) || (this.value === index) ,
                            'disabled': item.disabled
                        }),
                        onblur: (e) => {
                            //判斷離開Select時，則onblur
                            if(!this.panel.contains(e.relatedTarget)){
                                this.active = false
                                this.value = null
                                setTimeout(() => {
                                    this.btn.focus()
                                }, 0);
                                if(onblur){
                                    onblur(e,{
                                        ...vnode.attrs
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
                            this.selected[textKey] = item[textKey]
                            this.selected[valueKey] = item[valueKey]
                            this.selected.data = item.data
                            this.hasValue(this.selected)
                            const error = validate(this.selected[valueKey])
                            const v = this.hasValue() || this.selected || null
                            this.hasError(error)
                            if(onchange){
                                onchange(e,v,{
                                    ...attrs,
                                    children: item
                                })
                            }
                            this.active = false
                        },
                    }, [
                        m('span', item[textKey])
                    ])
                }),
                (panelSuffix)?
                    this.handleComponent(panelSuffix,'div',{
                        class: cx('select-option')
                }): null
            ]):null
        ])
    }
}

