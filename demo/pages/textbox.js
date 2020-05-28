import m from 'mithril'
import {
    TextBox,
    TextField
} from '@src'
class TextA {
    view(){
        return m('i',[
            m.trust(`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 475.082 475.082" style="width:1rem;height:1rem;">
            <path d="M473.371,433.11c-10.657-3.997-20.458-6.563-29.407-7.706c-8.945-0.767-15.516-2.95-19.701-6.567
            c-2.475-1.529-5.808-6.95-9.996-16.279c-7.806-15.604-13.989-29.786-18.555-42.537c-7.427-20.181-13.617-35.789-18.565-46.829
            c-10.845-25.311-19.982-47.678-27.401-67.092c-4.001-10.466-15.797-38.731-35.405-84.796L255.813,24.265l-3.142-5.996h-15.129
            h-21.414l-79.94,206.704L68.523,400.847c-5.33,9.896-9.9,16.372-13.706,19.417c-3.996,2.848-14.466,5.805-31.405,8.843
            c-11.042,2.102-18.654,3.812-22.841,5.141L0,456.812h5.996c16.37,0,32.264-1.334,47.679-3.997l13.706-2.279
            c53.868,3.806,87.082,5.708,99.642,5.708c0.381-1.902,0.571-4.476,0.571-7.706c0-5.715-0.094-11.231-0.287-16.563
            c-3.996-0.568-7.851-1.143-11.561-1.711c-3.711-0.575-6.567-1.047-8.565-1.431c-1.997-0.373-3.284-0.568-3.855-0.568
            c-14.657-2.094-24.46-5.14-29.407-9.134c-3.236-2.282-4.854-6.375-4.854-12.278c0-3.806,2.19-11.796,6.567-23.982
            c14.277-39.776,24.172-65.856,29.692-78.224l128.483,0.568l26.269,65.096l13.411,32.541c1.144,3.241,1.711,6.283,1.711,9.138
            s-1.14,5.428-3.426,7.707c-2.285,1.905-8.753,4.093-19.417,6.563l-37.404,7.994c-0.763,6.283-1.136,13.702-1.136,22.271
            l16.56-0.575l57.103-3.138c10.656-0.38,23.51-0.575,38.547-0.575c18.264,0,36.251,0.763,53.957,2.282
            c21.313,1.523,39.588,2.283,54.819,2.283c0.192-2.283,0.281-4.754,0.281-7.423C475.082,445.957,474.513,440.537,473.371,433.11z
             M251.245,270.941c-2.666,0-7.662-0.052-14.989-0.144c-7.327-0.089-18.649-0.233-33.973-0.425
            c-15.321-0.195-29.93-0.383-43.824-0.574l48.535-128.477c7.424,15.037,16.178,35.117,26.264,60.242
            c11.425,27.79,20.179,50.727,26.273,68.809L251.245,270.941z"/></svg>
            `)
        ])
    }
}
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
                    m('.col-3',[
                        m('h6', m('strong', '原始狀態')),
                        m(TextField)
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '填入屬性')),
                        m(TextField,{
                            title: '請輸入文字',
                            placeholder: '請輸入文字',
                            class: 'bg-light form-control'
                        })
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '填入初始值')),
                        m(TextField,{
                            value: '請輸入文字',
                        })
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '不可修改')),
                        m(TextField,{
                            value: '文字不能改',
                            readonly: true
                        })
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '傳出參數')),
                        m(TextField,{
                            options: {
                                validate: (v)=>{
                                    this.inputValue = v
                                    return !v
                                }
                            }
                        }),
                        (this.inputValue)?m('small',this.inputValue):null
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '密碼及驗證')),
                        m(TextField,{
                            type: 'password',
                            options: {
                                validateText: '密碼最少4個字元',
                                validate: (v,text)=>{
                                    if(v.length >= 4){
                                        return (this.feedback = false)
                                    }
                                    return (this.feedback = text)
                                }
                            }
                        }),
                        (this.feedback)?m('small.text-danger',this.feedback):null
                    ])
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox Group'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置附加元件')),
                        m(TextBox, {
                            theme: 'group',
                            options: {
                                groupPrepend: m('.input-group-prepend', [
                                    m('span.input-group-text', '@')
                                ]),
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置附加元件')),
                        m(TextBox, {
                            theme: 'group',
                            options: {
                                groupAppend: m('.input-group-prepend', [
                                    m('span.input-group-text', '@')
                                ]),
                            }
                        })
                    ])
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox BottomLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextBox, {
                            theme: 'bottomline',
                            type: 'password',
                            options: {
                                label: 'fly label',
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用Placeholder')),
                        m(TextBox, {
                            theme: 'bottomline',
                            placeholder: '請輸入內容',
                            options: {
                                label: 'fly label',
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '不使用Label')),
                        m(TextBox, {
                            theme: 'bottomline',
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON')),
                        m(TextBox, {
                            theme: 'bottomline',
                            options:{
                                label: 'fly label',
                                groupPrepend: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON')),
                        m(TextBox, {
                            theme: 'bottomline',
                            options: {
                                label: 'fly label',
                                groupAppend: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]), ,
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON Grid')),
                        m(TextBox, {
                            theme: 'bottomline',
                            options:{
                                label: 'fly label',
                                prefix: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON Grid')),
                        m(TextBox, {
                            theme: 'bottomline',
                            options: {
                                label: 'fly label',
                                suffix: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', 'Disabled')),
                        m(TextBox, {
                            theme: 'bottomline',
                            label: 'fly label',
                            disabled: true,
                        })
                    ])
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox OutLine'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用Label')),
                        m(TextBox, {
                            theme: 'outline',
                            type: 'password',
                            options: {
                                label: 'fly label',
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用Placeholder')),
                        m(TextBox, {
                            theme: 'outline',
                            placeholder: '請輸入內容',
                            options: {
                                label: 'fly label',
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '不使用Label')),
                        m(TextBox, {
                            theme: 'outline',
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON')),
                        m(TextBox, {
                            theme: 'outline',
                            options:{
                                label: 'fly label',
                                groupPrepend: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON')),
                        m(TextBox, {
                            theme: 'outline',
                            options: {
                                label: 'fly label',
                                groupAppend: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]), ,
                    m('.col-3', [
                        m('h6', m('strong', '使用前置ICON Grid')),
                        m(TextBox, {
                            theme: 'outline',
                            options:{
                                label: 'fly label',
                                prefix: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置ICON Grid')),
                        m(TextBox, {
                            theme: 'outline',
                            options: {
                                label: 'fly label',
                                suffix: m('i', m(TextA, {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }))
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', 'Disabled')),
                        m(TextBox, {
                            theme: 'outline',
                            label: 'fly label',
                            disabled: true,
                        })
                    ])
                ]),
                
            ]),
            m('.py-5.my-5')
        ])
    }
}