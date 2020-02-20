import m from 'mithril'
import {TextInput} from '@src'
import * as Icon from '@src/m2x-icon/core'
export default class{
    constructor(vnode) {
    }
    view(vnode) {
        return m('.main',[
            m.trust(``),
            m('.header.bg-light.navbar.navbar-light',{
                style: {
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    backgroundColor: '#cceecc',
                    zIndex: 1,
                }
            },[
                m('a.navbar-brand',{
                    href: '#!/'
                },'miix-components')
            ]),
            m('.container.py-5'),
            m('.container',[
                
                m('h3.pt-5',['TextInput']),
                m('h3.pt-5',['TextInput Outline']),
                m('.row',[
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                prefix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                suffix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            type: 'password',
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                text: 'TextBox:',
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                icon: m('i',m(Icon.TextA)),
                                text: 'TextBox:',
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            error: 'error',
                            value: '測試文字',
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                class: 'error',
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                class: 'success',
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                class: 'disabled',
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                ]),

                

                
            m('pre',{
                style: {
                    backgroundColor: '#272c34',
                    color: '#fff'
                }
            },[
                m('code',[
`
    import {TextInput} from 'miix-components'

    m(TextInput,{
        options: {
            theme: `,m('span[style="color: #66d9ef;"]','"outline"'),`
        }
    })

`
                ])
            ]),


                m('h3.pt-5',['TextInput Bottomline']),
                m('.row',[
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                prefix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                suffix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            type: 'password',
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                text: 'TextBox:',
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            options: {
                                icon: m('i',m(Icon.TextA)),
                                text: 'TextBox:',
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            error: 'error',
                            value: '測試文字',
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            
                            options: {
                                class: 'error',
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            success: true,
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(TextInput,{
                            disabled: true,
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                ]),

                
                m('pre',{
                    style: {
                        backgroundColor: '#272c34',
                        color: '#fff'
                    }
                },[
                    m('code',[
`
        import {TextInput} from 'miix-components'

        m(TextInput,{
            options: {
                theme: `,m('span[style="color: #66d9ef;"]','"bottomline"'),`
            }
        })
    
`
                    ])
                ]),

                m('.py-3'),
                m('h3',['InputBox Bootstrap']),
                m('.row',[
                    m('.col-3',[
                        m(TextInput)
                    ]),
                ]),
                m('.py-3'),
                m('pre',{
                    style: {
                        backgroundColor: '#272c34',
                        color: '#fff'
                    }
                },[
                    m('code',[
`
        import {InputBox} from 'miix-components'

        m(InputBox)
    
`
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