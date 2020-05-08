import m from 'mithril'
import stream from 'mithril/stream'
import classNames from 'classnames/bind'
import styles from '../textbox/styles/textbox.css'
import * as Icon from './iconPassword'
const cx = classNames.bind(styles)

//css 部份要補
//disabled, readonly
const allowAttrs = ['id', 'minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required']

const allowEvents = ['oninput', 'onchange', 'onfocus', 'onblur']

function filter(raw, allows = []) {
    const filtered = Object.keys(raw)//取出raw所有的key轉化為array
        .filter(key => allows.includes(key)) //判斷raw是否存在於allows設定的key，並回傳出新陣列
        .reduce((obj, key) => { //取出keys轉化為object
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

function checkEvent(options, event) {
    return options.hasOwnProperty(event) && typeof options[event] === 'function'
}

/**
 * TextField
 * 可接受屬性:['minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required', 'class']
 * 事件:['oninput', 'onchange', 'onfocus', 'onblur']
 * class: 預設為bootstrap classname: 'form-control', 可接受自訂classname
 * 操作設定:
 * showValid: 顯示bootstrap valid狀態
 */

export default class TextField {
    constructor(vnode) {
        let options = vnode.attrs

        this.type = vnode.attrs.type || 'text'
        this.attrs = {}
        this.events = {}

        //操作屬性
        this.hasError = options.hasError || stream(vnode.attrs.error)
        this.hasValue = options.hasValue || stream(vnode.attrs.value)
        //顯示bootstrap valid
        this.showValid = options && options.showValid === true ? stream(true) : stream(false)

        //初始化
        this.init(options)

        //密碼使用
        if (this.type === 'password') {
            this.reveal = 'hidden'
        }
    }
    init(options) {
        //過濾多餘的屬性
        this.attrs = filter(options, allowAttrs)
        //過濾事件
        this.events = filter(options, allowEvents)

        if (checkEvent(options, 'validate')) {
            this.events.onchange = (e) => {
                const error = options.validate(e.target.value)
                this.hasError(error)
                if (checkEvent(options, 'onchange')) {
                    options.onchange(e)
                }
            }
        }

        if (checkEvent(options, 'oninput')) {
            this.events.oninput = (e) => {
                options.oninput(e)
                if (e.target.value) {
                    this.hasValue(true)
                } else {
                    this.hasValue(false)
                }
            }
        }
    }

    handleClassNames(classnames) {
        //class 樣式-不打亂
        const validate = classNames({
            'is-valid': this.showValid() && !this.hasError(),
            'is-invalid': this.hasError()
        })
        classnames = classnames || 'form-control'

        //ie edge 密碼
        //css打亂
        return classNames(classnames, validate, cx({
            'password-reveal': this.reveal
        }))
    }
    /**
     * 檢查外部屬性
     * @param {*} attrs vnode.attrs
     */
    checkError(attrs) {
        if (attrs.hasOwnProperty('error')) {
            this.hasError(attrs.error)
        }
    }

    view(vnode) {
        this.checkError(vnode.attrs)
        this.showValid(vnode.attrs.showValid)

        if (this.reveal) {
            return m('div', {
                class: classNames(cx('d-flex'))
            }, [
                m('input', {
                    type: this.type,
                    class: this.handleClassNames(vnode.attrs.class),
                    ...this.attrs,
                    ...this.events,
                    value: vnode.attrs.value
                }),
                m('button[type="button"]', {
                    class: classNames(cx('icon-btn')),
                    onclick: (e) => {
                        if (this.reveal === 'hidden') {
                            this.type = 'text'
                            this.reveal = 'visible'
                        } else {
                            this.type = 'password'
                            this.reveal = 'hidden'
                        }
                    }
                }, [
                    (this.reveal == 'hidden') ? m(Icon.ViewFill) : m(Icon.ViewDisable)
                ])
            ])
        }
        return m('input', {
            type: this.type,
            class: this.handleClassNames(vnode.attrs.class),
            ...this.attrs,
            ...this.events,
            value: vnode.attrs.value
        })
    }
}