import m from 'mithril'
import stream from 'mithril/stream'
import classNames from 'classnames/bind'
import styles from './styles/select.css'
import NativeSelectComponent from './native'
import MaterialSelectComponent from './material'
const cx = classNames.bind(styles)


/**
 * @param Select
 * 如果要傳遞model，selected這參數必須是object，否則資料只進不出。
 * 如果要使用 new Object 或 new Class 等方式，則將selected參數傳進value來達到傳遞物件之效用。
 */
export default class Select {
    constructor(vnode) {
        const {
            childrens,
            selected
        } = vnode.attrs
        this.hasError = stream(vnode.attrs.error)
        this.hasValue = stream(vnode.attrs.value)

        //判斷childrens是否有正確填寫
        if(Array.isArray(childrens)){
            for(let i = 0; i < childrens.length; i++){
                if (!childrens[i].hasOwnProperty('text') && !childrens[i].hasOwnProperty('value')){
                    throw new Error('childrens裡面每個object最少要有text或value這個key')
                }
            }
        }else{
            if (childrens){
                throw new Error('childrens必須是個陣列')
            }
        }
        //判斷selected是否有正確填寫
        if(typeof selected ==='object'){
            if (selected && !selected.hasOwnProperty('text') && !selected.hasOwnProperty('value')){
                throw new Error('selected這個object最少要有text或value這個key')
            }
        }else if(selected){
            if (typeof selected !== 'string' && typeof this.hasValue() !== 'string') {
                throw new Error('selected應該是一個object或string')
            }
        }
        //判斷value是否有正確填寫
        if(typeof this.hasValue()  === 'object'){
            if (this.hasValue() && !this.hasValue().hasOwnProperty('text') && !this.hasValue().hasOwnProperty('value')){
                throw new Error('value這個object最少要有text或value這個key')
            }
        }else if(this.hasValue()){
            if (typeof selected !== 'string' && typeof this.hasValue() !== 'string') {
                throw new Error('value應該是一個object或string')
            }
        }

        
    }
    handleComponent(component,tag = 'div',attrs = {}) {
        if (!component) {
            return
        }
        if (typeof component === 'string') {
            return m(tag,attrs,component)
        }
        if (typeof component === 'object') {
            return component
        }
        if (typeof component === 'function') {
            return m(component)
        }
    }
    view(vnode) {
        const {
            theme,
            error,
            success,
            disabled,
            options,
            validate
        } = vnode.attrs
        let {
            hasError,
            showError
        } = vnode.attrs
        const classname = vnode.attrs.class
        const _theme = theme || 'native'
        
        showError = (showError === false) ? false : true
        this.hasError(vnode.attrs.error)
        this.hasValue(vnode.attrs.value)
        vnode.attrs.hasError = this.hasError
        vnode.attrs.hasValue = this.hasValue
        if(!validate){
            vnode.attrs.validate = () => {
                if (options && options.validateText) {
                    this.error =  options.validateText || '選擇的內容有誤'
                    return options.validateText || '選擇的內容有誤'
                }
                return this.error = ''
            }
        }
        
        return m('div', {
            class: classNames(classname,{
                'success': success,
                'error': error,
                'disabled': disabled
            },cx('select', _theme))
        }, [
            /**
             * theme: 'native'
             * size
             * autofocus
             */
            (_theme === 'native') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx('select-label')
                }): null,
                m(NativeSelectComponent, {
                    ...vnode.attrs
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null,
            /**
             * theme: 'group'
             * options : {
             *      groupPrepend
             *      groupAppend
             * }
             */
            (_theme === 'group') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx('select-label')
                }): null,
                m('.input-group',[
                    (options && options.groupPrepend)?
                    m('.input-group-prepend',[
                        this.handleComponent(options.label,'label',{
                            class: 'label.input-group-text'
                        })
                    ]): null,
                    m(NativeSelectComponent, {
                        ...vnode.attrs
                    }),
                    (options && options.groupAppend)?
                    m('.input-group-append',[
                        this.handleComponent(options.label,'label',{
                            class: 'label.input-group-text'
                        })
                    ]): null,
                ]),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null,
            /** 
             * theme: 'material'
             * oninput
             * options: {
             *      panelHeight
             *      input
             * }
            */
            (_theme === 'material') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx('select-label')
                }): null,
                m(MaterialSelectComponent, {
                    ...vnode.attrs
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null
        ])
    }
}
/** 
 * 可使用的屬性
 * theme
 * options: {
 *      label
 *      validateText
 *      title
 * }
 * selected: {
 *      text
 *      value
 *      data
 * }
 * childrens: {
 *      panelPrefix
 *      panelSuffix
 *      text
 *      value
 *      disabled
 *      selected
 *      style
 *      class
 *      data
 * }
 * value
 * class
 * onchange
 * oninput
 * onclick
 * onfocus
 * onblur
 * disabled
 * error
 * success
 * validate
*/