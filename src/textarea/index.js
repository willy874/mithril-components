import m from 'mithril'
import stream from 'mithril/stream'
import Config from '../utils/config'
import classNames from 'classnames/bind'
import styles from './styles/textarea.css'
import * as Icon from '../m2x-icon/core'

const cx = classNames.bind(styles)



function filter(raw, allows = []) {
    const filtered = Object.keys(raw)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

class TextField {
    view(vnode) {
        const {
            style,
            disabled,
            oninput,
            classes,
            hasValue,
            hasError,
            validate
        } = vnode.attrs

        const attrs = filter(vnode.attrs, ['cols', 'maxlength', 'rows', 'wrap', 'readonly', 'required', 'placeholder', 'value','disabled'],)
        return m('textarea', {
            ...attrs,
            style,
            class: classNames(classes,'form-control', {
                'is-invalid': hasError()
            }),
            oninput: (e) => {
                if (disabled) {
                    return false
                }

                if (oninput) {
                    oninput(e)
                }

                if (hasValue && typeof hasValue === 'function') {
                    if (e.target.value) {
                        hasValue(true)
                    } else {
                        hasValue(false)
                    }
                }
            },
            onchange: (e) => {
                if (validate && typeof validate === 'function') {
                    const error = validate(e.target.value)
                    hasError(error)
                }
            }
        })
    }
}

export default class TextArea {
    constructor(vnode) {
        this.hasError = stream()
        this.hasValue = stream(vnode.attrs.value)
        if (vnode.attrs.hasError) {
            this.hasError = vnode.attrs.hasError
        }
        this.hasError(vnode.attrs.error)
        this.labelWidth = 0.01
        this.prefixWidth = 0
        this.password = (vnode.attrs.type === 'password')
        this.passwordIcon = Icon.ViewFill
        this.passwordClick = false
        this.type = vnode.attrs.type
    }

    oncreate(vnode){
        if(!vnode.attrs.hasOwnProperty('options')) return
        if(!vnode.attrs.options.hasOwnProperty('theme')) return
        if(vnode.attrs.options.theme === 'outline'){
            this.labelWidth = vnode.dom.querySelector(classNames(`.${cx('input-outline-label')}`)).offsetWidth
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx('input-outline-prefix')}`)).offsetWidth
        }
        if(vnode.attrs.options.theme === 'bottomline'){
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx('input-bottomline-prefix')}`)).offsetWidth
        }
        m.redraw()
    }

    view(vnode) {
        let {
            oninput,
            onchange,
            validate,
            options,
            type,
            success,
            disabled,
            readonly,
        } = vnode.attrs

        options = (options) ? options : {}

        let {
            theme,
            style,
            icon,
            label,
            prefix,
            suffix,
            text
        } = options
        

        const classes = (options.class) ? options.class : ''
        theme = theme ? theme : Config.theme
        const attrs = filter(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value', 'autocomplete','disabled'])
        if (theme === 'outline' || theme === 'bottomline') {
            return m('div', {
                style,
                class: classNames(classes, cx(`input-${theme}`,{
                    'input-effect-active': this.hasValue(),
                    'error': this.hasError(),
                    'success': (success)? true : false,
                    'disabled': (disabled || readonly)? true : false,
                }))
            }, [
                (icon) ? icon : null,
                (text) ? m('span',{
                    class: classNames(cx(`input-${theme}-text`))
                }, m.trust(text)) : null,
                m('div',{
                    class: classNames(cx(`input-${theme}-box`))
                },[
                    m('label', {
                        class: classNames(cx(`input-${theme}-label`)),
                        style:{
                            left: (prefix) ? `${this.prefixWidth + 4}px`: null,
                        }
                    }, (label)? m('span',label) : ''),
                    m('div',{
                        class: classNames(cx(`input-${theme}-base`))
                    },[
                        m('span',{
                            class: classNames(cx(`input-${theme}-prefix`))
                        },(prefix) ? prefix : null) ,

                        m(TextField, {
                            ...attrs,
                            type: this.type,
                            disabled: (disabled || readonly),
                            oninput,
                            onchange,
                            validate,
                            hasValue: this.hasValue,
                            hasError: this.hasError
                        }),

                        m('span',{
                            class: classNames(cx(`input-${theme}-suffix`))
                        },[

                            (suffix) ? suffix : null,

                            (this.hasError()) ? m('div',{
                                class: classNames(cx(`input-${theme}-warning`)),
                            },m('i',m(Icon.Alert))) : null,
                            
                        ]),


                        m('fieldset',{
                            class: classNames(cx(`input-${theme}-fieldset`)),
                            style: {
                                paddingLeft: (prefix) ? `${this.prefixWidth}px`: null,
                            }
                        },[
                            m('legend',{
                                class: classNames(cx(`input-${theme}-legend`)),
                                style:{
                                    maxWidth: (this.labelWidth > 0)? `${this.labelWidth*0.8}px` : false
                                }
                            }),
                        ]),
                    ]),
                    m('div',{
                        class: classNames(cx(`input-${theme}-feedback`))
                    },[
                        (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
                    ])
                ]),
            ]) 
        }


        return [
            m(TextField, {
                ...attrs,
                type,
                oninput,
                onchange,
                validate,
                hasValue: this.hasValue,
                hasError: this.hasError,
                classes: (options.class) ? options.class : ''
            }),
            (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
        ]

        
    }
}