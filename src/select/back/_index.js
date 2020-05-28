import m from 'mithril'
import stream from 'mithril/stream'
import classNames from 'classnames/bind'
import {Component} from '../../util-components'
import styles from './styles/select.css'
import NativeSelectComponent from './_native'
import MaterialSelectComponent from '../_material'
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
            childrens,
            selected
        } = vnode.attrs
        this.hasError = stream(vnode.attrs.error)
        this.hasValue = stream(vnode.attrs.value)

        //判斷childrens是否有正確填寫
        if (childrens){
            if(!Array.isArray(childrens)){
                throw new Error('childrens必須是個陣列')
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
            class: classNames(vnode.attrs.class,{
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
                        this.handleComponent(options.groupPrepend,'div',{
                            class: 'input-group-text'
                        })
                    ]): null,
                    m(NativeSelectComponent, {
                        ...vnode.attrs
                    }),
                    (options && options.groupAppend)?
                    m('.input-group-append',[
                        this.handleComponent(options.groupAppend,'div',{
                            class: 'input-group-text'
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