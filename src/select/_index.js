import m from 'mithril'
import Config from '../utils/config'
import classNames from 'classnames/bind'
import styles from './styles/select.css'
import uuid from 'uuid'
import validate from 'validate.js'

const cx = classNames.bind(styles)
let selectActive = []
document.body.addEventListener('click', (e) => {
    //全域關閉事件
    for (let i = 0; i < selectActive.length; i++) {
        if (!selectActive[i].active && selectActive[i].btn.uuid == e.target.uuid && !selectActive[i].disabled) {
            selectActive[i].active = true
        } else {
            selectActive[i].active = false
            m.redraw()
        }
    }
})


class MaterialSelectComponent {
    constructor(vnode) {
        const {
            selected,
            options
        } = vnode.attrs
        this.selected = (selected) ? selected : options[0]
        this.active = false
        this.disabled = vnode.attrs.disabled || false
        selectActive.push(this)
    }
    oncreate(vnode) {
        this.btn = vnode.dom.querySelector(classNames(`.${cx('select-btn')}`))
        this.btn.uuid = uuid()
    }
    view(vnode) {
        const {
            selected,
            options,
            onclick,
            disabled,
            error,
            success,
            onchange
        } = vnode.attrs
        return m('div', {
            class: cx('select-dropdown', {
                'active': this.active,
                'disabled': disabled,
            })
        }, [
            m('div', {
                class: cx('select-btn'),
                onclick: (e) => {
                    e.preventDefault()
                    const value = this.selected.value
                    onclick(e,value,{
                        disabled,
                        error,
                        success,
                        options,
                        active: this.active,
                        btn: this.btn
                    })
                },
            }, this.selected.text || this.selected.value || ''),
            m('div', {
                class: cx('select-line')
            }),
            m('div', {
                class: cx('select-column'),
            }, [
                m('div',{
                    class: cx('select-panel'),
                },[
                    m('div', {
                        class: cx('select-option'),
                    }, [
                        m('span', this.selected.text || this.selected.value || '') 
                    ]),
                    options.map((item, index) => {
                        return m('div', {
                            class: cx('select-option', {
                                'active': item.disabled || (this.selected.value == item.value),
                                'disabled': item.disabled
                            }),
                            onclick: (e) => {
                                e.preventDefault()
                                if (item.disabled) {
                                    return false
                                }
                                this.selected = item
                                if(onchange){
                                    onchange(e, item.value,{
                                        disabled,
                                        error,
                                        success,
                                        selected,
                                        disabledItem: item.disabled
                                    })
                                }
                            },
                        }, [
                            m('span', item.text)
                        ])
                    })
                ]),
                
            ])
        ])
    }
}

// {
//     selected,
//     onchange,
//     disabled,
//     error,
//     success,
//     required,
//     label,
//     select:{
//         disabled,
//         onchange,
//         required,
//         style,
//         class
//     },
//     options:{
//         style,
//         class,
//         value,
//         disabled,
//         selected
// }

class NativeSelectComponent {
    view(vnode) {
        const {
            selected,
            options,
            onchange,
            disabled,
            error,
            success,
            required,
            select
        } = vnode.attrs

        const selectClasses = (select) ?( select.class) ? select.class : '' : ''

        return m('select.custom-select.browser-default', {
                disabled,
                onchange,
                required,
                style: (select) ?( select.style) ? select.style : '' : '',
                class: classNames(selectClasses,'form-control',{
                    'is-invalid': error,
                    'is-valid': success
                })
            }, [
                (selected)? m('option', {
                    disabled: true,
                    selected: options.every(item => item.selected != selected),
                    value: 'null'
                }, selected): null,

                options.map(item => {
                    return m('option', {
                        style: (item.style) ? item.style : '',
                        class: (item.class) ? item.class : '',
                        value: (item.value) ? item.value : '',
                        disabled: (item.disabled),
                        selected: (item.selected) ? item.selected : '',
                    }, item.text)
                }),
                
            ]

        )
    }
}


export default class Select {
    constructor(vnode) {

    }
    view(vnode) {
        const {
            theme,
            selected,
            options,
            select,
            label,
            onchange,
            onclick,
            required,
            error,
            success,
            disabled,
            hasError,
            verification
        } = vnode.attrs

        const classes = vnode.attrs.class
        const _theme = theme ? theme : Config.theme

        return m('div', {
            class: classNames(classes,{
                'success': success,
                'error': error
            },cx('select', _theme))
        }, [
            (_theme === 'bootstrap') ? [
                (label) ? m('label', label) : null,
                m(NativeSelectComponent, {
                    selected,
                    onchange,
                    disabled,
                    options,
                    error,
                    success,
                    required,
                    label,
                    select,
                    verification
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : [
                (label) ? m('label', label) : null,
                m(MaterialSelectComponent, {
                    selected,
                    onchange,
                    disabled,
                    options,
                    error,
                    success,
                    required,
                    label,
                    select,
                    onclick,
                    verification
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ]
            
        ])
    }
}