import m from 'mithril'
import {
    TextBox,
    TextField
} from '@src'
import * as Icon from '@src/m2x-icon/core'
export default class {
    view(vnode) {
        return m('.main', [
            m.trust(``),
            m('.header.bg-light.navbar.navbar-light', {
                style: {
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    backgroundColor: '#cceecc',
                    zIndex: 1,
                }
            }, [
                m('a.navbar-brand', {
                    href: '#!/'
                }, 'miix-components')
            ]),
            m('.container.py-5'),
            m('.container', [
                m('h3.pt-5', ['TextBox']),
                m('.row', [
                    m('.col-3', [
                        m('h6', m('strong', '使用TextField')),
                        m(TextField, {
                            type: 'text',
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                this.showValid = true
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用TextBox')),
                        m(TextBox, {
                            class: 'form-control abc',
                            type: 'password',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用helper text')),
                        m(TextBox, {
                            label: m('label.col-sm-2.col-form-label', 'mithril label'),
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '客製化class')),
                        m(TextBox, {
                            class: 'custom-input-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '不顯示錯誤訊息')),
                        m(TextBox, {
                            label: '標籤',
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            showError: false
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用內部標籤')),
                        m(TextBox, {
                            label: '標籤',
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),


                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox Group'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置附加元件')),
                        m(TextBox, {
                            group: {
                                class: 'input-group mb-3 align-items-start',
                                prefix: m('.input-group-prepend', [
                                    m('span.input-group-text', '@')
                                ]),
                            },
                            //textfield
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    this.showValid = true
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置附加元件')),
                        m(TextBox, {
                            group: {
                                class: 'input-group mb-3 align-items-start',
                                suffix: m('.input-group-prepend', [
                                    m('span.input-group-text', '@')
                                ]),
                            },
                            class: 'form-control',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    this.showValid = true
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ])
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox BottomLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label'
                            },
                            type: 'password',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用固定Label')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                class: 'md-sm',
                                label: {
                                    text: 'fly label',
                                    fixed: true
                                }
                            },
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用Placeholder')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label'
                            },
                            //TextField 設定
                            placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '不使用Label')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline'
                            },
                            //TextField 設定
                            placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label',
                                prefix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            },
                            //TextField 設定
                            // placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label',
                                suffix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            },
                            //TextField 設定
                            placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]), ,
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON Grid')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label',
                                prefix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                })),
                                grid: true
                            },
                            //TextField 設定
                            // placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            // helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON Grid')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label',
                                suffix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                })),
                                grid: true
                            },
                            //TextField 設定
                            // placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', 'Disabled')),
                        m(TextBox, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label'
                            },
                            //TextField 設定
                            // placeholder: '請輸入內容',
                            disabled: true,
                            // value: 'abc',
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ])
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox OutLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label'
                            },
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用固定Label')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                class: 'md-sm',
                                label: {
                                    text: 'fly label',
                                    fixed: true
                                }
                            },
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用Placeholder')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label'
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '不使用Label')),
                        m(TextBox, {
                            theme: {
                                type: 'outline'
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label',
                                prefix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label',
                                suffix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON Grid')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label',
                                prefix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                })),
                                grid: true
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON Grid')),
                        m(TextBox, {
                            theme: {
                                type: 'outline',
                                label: 'fly label',
                                suffix: m('i', m(Icon.TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                })),
                                grid: true
                            },
                            //TextField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            oninput: (e) => {
                                this.field = e.target.value
                            },
                            onchange: (e) => {
                                console.log('this field change')
                            },
                            onfocus: (e) => {
                                console.log('this field focus')
                            },
                            onblur: (e) => {
                                console.log('this field onblur')
                            },
                            //顯示bootstrap valid狀態
                            showValid: this.showValid,
                            validate: () => {
                                if (!this.field) {
                                    this.error = '請輸入標題'
                                    return '請輸入標題'
                                }
                                return this.error = ''
                            },
                            helper: '說明文字'
                        })
                    ])
                ])
            ]),


            m.trust(`
            <div style="max-width:1130px;margin:auto">
                <h4>JS接口</h4>
                <table class="table"style="width:100%">
                    <tbody>
                        <tr>
                            <td style="width:150px">Attributes</td>
                            <td style="width:80px">Option</td>
                            <td style="width:130px">Type</td>
                            <td style="width:100px">Default</td>
                            <td>Description</td>
                        </tr>
                        <tr>
                            <td>input attributes</td>
                            <td>-</td>
                            <td>string</td>
                            <td>-</td>
                            <td>可輸入各種input attributes，支援 max , maxlength , min , pattern , readonly , required , size , step , placeholder , value , autocomplete , oninput , onchang 等屬性</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>-</td>
                            <td>string</td>
                            <td>text</td>
                            <td>填入對應的input類型，或填入textarea改變成多行欄位</td>
                        </tr>
                        <tr>
                            <td>success</td>
                            <td>-</td>
                            <td>boolen</td>
                            <td>fales</td>
                            <td>啟用success狀態</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>-</td>
                            <td>boolen</td>
                            <td>string</td>
                            <td>當輸入錯誤時要出現的提示文字</td>
                        </tr>
                        <tr>
                            <td>validate</td>
                            <td>-</td>
                            <td>function</td>
                            <td>-</td>
                            <td>當onchang事件發生後傳入使用者輸入的e.target.value，並回傳string給error參數，使其顯示出文字。</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>-</td>
                            <td>boolen</td>
                            <td>fales</td>
                            <td>啟用disabled狀態</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>theme</td>
                            <td>string</td>
                            <td>bootstrap</td>
                            <td>目前有outline、bottomline樣式</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>icon</td>
                            <td>string || mithril</td>
                            <td>null</td>
                            <td>置於輸入框前的Icon節點</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>text</td>
                            <td>string</td>
                            <td>null</td>
                            <td>置於輸入框前的文字節點，可輸入HTML</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>label</td>
                            <td>string</td>
                            <td>null</td>
                            <td>置於輸入框內的提示文字</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>prefix</td>
                            <td>string || mithril</td>
                            <td>null</td>
                            <td>置於輸入框內的字首節點</td>
                        </tr>
                        <tr>
                            <td>options</td>
                            <td>suffix</td>
                            <td>string || mithril</td>
                            <td>null</td>
                            <td>置於輸入框內的字尾節點</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
                `),
        ])
    }
}