import m from 'mithril'
import TextAreaField from '@src/textarea/field'
import {
    TextArea
} from '@src'
import * as Icon from '@src/m2x-icon/core'
export default class TextAreaPage {
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
                m('h3.pt-5', ['TextArea']),
                m('.row', [
                    m('.col-3', [
                        m('h6', m('strong', '使用TextAreaField')),
                        m(TextAreaField, {
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
                        m('h6', m('strong', '使用TextArea')),
                        m(TextArea, {
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
                        m(TextArea, {
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
                        m(TextArea, {
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
                        m(TextArea, {
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
                        m(TextArea, {
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
                    m('.col-12', m('h3.pt-5', ['TextArea Group'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置附加元件')),
                        m(TextArea, {
                            group: {
                                class: '',
                                prefix: m('.input-group-prepend', [
                                    m('span.input-group-text', '@')
                                ]),
                            },
                            //TextAreaField
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
                        m(TextArea, {
                            group: {
                                class: '',
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
                    m('.col-12', m('h3.pt-5', ['TextArea BottomLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextArea, {
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
                        m(TextArea, {
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
                        m(TextArea, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label'
                            },
                            //TextAreaField 設定
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
                        m(TextArea, {
                            theme: {
                                type: 'bottomline'
                            },
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m('h6', m('strong', '使用後置ICON Grid')),
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m(TextArea, {
                            theme: {
                                type: 'bottomline',
                                label: 'fly label'
                            },
                            //TextAreaField 設定
                            // placeholder: '請輸入內容',
                            disabled: true,
                            value: 'abc',
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
                    m('.col-12', m('h3.pt-5', ['TextArea OutLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextArea, {
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
                        m(TextArea, {
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
                        m(TextArea, {
                            theme: {
                                type: 'outline',
                                label: 'fly label'
                            },
                            //TextAreaField 設定
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
                        m(TextArea, {
                            theme: {
                                type: 'outline'
                            },
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                        m(TextArea, {
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
                            //TextAreaField 設定
                            //placeholder: '請輸入內容',
                            value: this.field,
                            error: this.error,
                            rows: 20,
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
                        m(TextArea, {
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
                            //TextAreaField 設定
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
                ]),
                m('div', {
                    style: {
                        height: '50vh'
                    }
                })
            ])
        ])
    }
}