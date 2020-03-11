import m from 'mithril'
import stream from 'mithril/stream'
import classNames from 'classnames/bind'
import styles from './styles/textbox.css'
const cx = classNames.bind(styles)
import TextField from '../textfield'
import LineTextBox from './line'


// import LineTextBox from './line'



/**
 * TextBox參數
 * label: 顯示標籤, type: string, mithril
 * helper: 顯示說明文字, type: string, mithril
 * showError: 顯示錯誤,預設為true
 */
export default class TextBox {
    constructor(vnode) {
        this.hasError = stream(vnode.attrs.error)
        this.hasValue = stream(vnode.attrs.value)
    }
    handleLabel(label) {
        if (!label) {
            return
        }
        if (typeof label === 'string') {
            return m('label', label)
        }
        if (typeof label === 'function') {
            return m(label)
        }
    }
    handleHelper(helper) {
        if (!helper) {
            return
        }
        if (typeof helper === 'string') {
            return m('small.form-text.text-muted', helper)
        }
        if (typeof helper === 'function') {
            return m(helper)
        }
    }
    view(vnode) {
        let {
            label,
            helper,
            showError,
            group,
            theme
        } = vnode.attrs

        label = this.handleLabel(label)
        helper = this.handleHelper(helper)
        showError = (showError === false) ? false : true
        this.hasError(vnode.attrs.error)
        this.hasValue(vnode.attrs.value)

        if (theme) {
            return m(LineTextBox, {
                theme,
                ...vnode.attrs,
                hasError: this.hasError,
                hasValue: this.hasValue,
                showError,
                helper
            })
        }

        //bootstrap group
        if (group) {
            return m('div', {
                class: group.class || 'input-group mb-3 align-items-start'
            }, [
                group.prefix,
                m('.flex-1', [
                    m(TextField, Object.assign({}, vnode.attrs, {
                        hasError: this.hasError,
                        hasValue: this.hasValue
                    })),
                    (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper
                ]),
                group.suffix,

            ])
        }


        //bootstrap 
        return m.fragment({}, [
            label,
            m(TextField, Object.assign({}, vnode.attrs, {
                hasError: this.hasError,
                hasValue: this.hasValue
            })),
            (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper
        ])
    }
}