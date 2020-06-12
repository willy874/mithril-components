import m from 'mithril'
import {
    TextBox,
    TextField
} from '@src'
import { colorSet,CodeTemplate,TableTemplate,TableRow } from '../tool';
const cs = colorSet

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
    constructor(){
        this.model = {
            value: '',
            input: '請輸入文字',
            feedback: null,
            password: null,
        }
    }
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
                m('.pt-3',[
                    m('span.h5','Model Value 01： '),
                    m.trust(`this.model.value: "${this.model.value}"<br>`),
                    m('span.h5','Model Value 02： '),
                    m.trust(`this.model.input: "${this.model.input}"<br>`),
                    m('span.h5','Model Value 03： '),
                    m.trust(`this.model.feedback: "${this.model.feedback}"<br>`),
                    m('span.h5','Model Value 04： '),
                    m.trust(`this.model.password: "${this.model.password}"<br>`),
                ]),
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
                            class: 'bg-light form-control',
                            value: this.model,
                            options: {
                                valueKey: 'value'
                            }
                        })
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '填入初始值')),
                        m(TextBox,{
                            value: this.model,
                            options: {
                                valueKey: 'input'
                            }
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
                            value: this.model,
                            options: {
                                valueKey: 'feedback',
                                validate: (method)=>{
                                    this.inputValue = method.hasValue().feedback
                                    return !this.inputValue
                                }
                            }
                        }),
                        (this.inputValue)?m('small',this.inputValue):null
                    ]),
                    m('.col-3',[
                        m('h6', m('strong', '密碼及驗證')),
                        m(TextBox,{
                            type: 'password',
                            value: this.model,
                            options: {
                                valueKey: 'password',
                                validateText: '密碼最少4個字元',
                                validate: (method)=>{
                                    if(method.hasValue().password.length >= 4){
                                        return false
                                    }
                                    return method.text
                                }
                            }
                        }),
                    ])
                ]),
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#c188bb','import'),` {`,cs('#96d8fb','TextField'),`,`,cs('#96d8fb','TextBox'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextField'),`)\n
`,cs('#579cd5','this'),`.`,cs('#96d8fb','model'),` = {
    `,cs('#96d8fb','value'),`: `,cs('#cb917b',`""`),`,
    `,cs('#96d8fb','password'),`: `,cs('#cb917b',`"null"`),`,
}\n
`,cs('#6AAF4E','//加入屬性參數'),`
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextField'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#579cd5','this'),`.`,cs('#96d8fb','model'),`,
    `,cs('#96d8fb','title'),`: `,cs('#cb917b',`'請輸入文字'`),`,
    `,cs('#96d8fb','placeholder'),`: `,cs('#cb917b',`'請輸入文字'`),`,
    `,cs('#96d8fb','class'),`: `,cs('#cb917b',`'bg-light form-control'`),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','valueKey'),`: `,cs('#cb917b',`"value"`),`
    }
})\n
`,cs('#6AAF4E','//將value取出設定入this.inputValue變數中'),`
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextField'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#579cd5','this'),`.`,cs('#96d8fb','model'),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','valueKey'),`: `,cs('#cb917b',`"feedback"`),`,
        `,cs('#dadbaf','validate'),`: (`,cs('#96d8fb','method'),`)=>{
            `,cs('#579cd5','this'),`.`,cs('#96d8fb','inputValue'),` = `,cs('#96d8fb','method'),`.`,cs('#dadbaf','hasValue'),`().`,cs('#96d8fb','feedback'),`
            `,cs('#c188bb','return'),` !`,cs('#579cd5','this'),`.`,cs('#96d8fb','inputValue'),`
        }
    }
})\n
`,cs('#6AAF4E','//使用[type="password"]，將validateText取出設定入this.password變數中'),`
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextBox'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#579cd5','this'),`.`,cs('#96d8fb','model'),`,
    `,cs('#96d8fb','type'),`: `,cs('#cb917b',`'password'`),`,
    `,cs('#96d8fb','validateText'),`: `,cs('#cb917b',`'密碼最少4個字元'`),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','valueKey'),`: `,cs('#cb917b',`"password"`),`,
        `,cs('#dadbaf','validate'),`: (`,cs('#96d8fb','method'),`)=>{
            `,cs('#c188bb','if'),`(`,cs('#96d8fb','method'),`.`,cs('#dadbaf','hasValue'),`().`,cs('#96d8fb','password'),`.`,cs('#96d8fb','length'),` >= `,cs('#ddeedd','4'),`){
                `,cs('#c188bb','return'),` `,cs('#579cd5','false'),`
            }
            `,cs('#c188bb','return'),` `,cs('#96d8fb','method'),`.`,cs('#96d8fb','text'),`
        }
    }
})\n
`
                    ]),
                ]),
                m('.row', [
                    m('.col-12', m('h3.pt-5', ['TextBox Group'])),
                    m('.col-3', [
                        m('h6', m('strong', '使用前置附加元件')),
                        m(TextBox, {
                            theme: 'group',
                            options: {
                                groupPrepend: '@',
                            }
                        })
                    ]),
                    m('.col-3', [
                        m('h6', m('strong', '使用後置附加元件')),
                        m(TextBox, {
                            theme: 'group',
                            options: {
                                groupAppend: '@',
                            }
                        })
                    ])
                ]),
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#c188bb','import'),` {`,cs('#96d8fb','TextBox'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextBox'),`,{
    `,cs('#96d8fb','theme'),`: `,cs('#cb917b',`'group'`),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','label'),`: `,cs('#cb917b',`'fly label'`),`,
        `,cs('#96d8fb','groupPrepend'),`: `,cs('#cb917b',`'@'`),`,
        `,cs('#96d8fb','groupAppend'),`: `,cs('#cb917b',`'@'`),`
    },
})\n
`
                    ]),
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
                        m('h6', m('strong', 'Disabled')),
                        m(TextBox, {
                            theme: 'bottomline',
                            label: 'fly label',
                            disabled: true,
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
                ]),
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#c188bb','import'),` {`,cs('#96d8fb','TextBox'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextBox'),`,{
    `,cs('#96d8fb','theme'),`: `,cs('#cb917b',`'bottomline'`),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','label'),`: `,cs('#cb917b',`'fly label'`),`
    },
})\n
`
                    ]),
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
                        m('h6', m('strong', 'Disabled')),
                        m(TextBox, {
                            theme: 'outline',
                            label: 'fly label',
                            disabled: true,
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
                ]),
                
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#c188bb','import'),` {`,cs('#96d8fb','TextBox'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','TextBox'),`,{
    `,cs('#96d8fb','theme'),`: `,cs('#cb917b',`'outline'`),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','label'),`: `,cs('#cb917b',`'fly label'`),`
    },
})\n
`
                    ]),
                ]),
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#d4bb85','.textbox-line'),`{
    `,cs('#96d8fb','--status'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--primary'),`);
    `,cs('#96d8fb','--danger'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--danger'),`);
    `,cs('#96d8fb','--success'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--success'),`);
    `,cs('#96d8fb','--textbox-line-color'),`: `,cs('#cb917b','#000'),`;
    `,cs('#96d8fb','--textbox-hover-line-color'),`: `,cs('#cb917b','#000'),`;
    `,cs('#96d8fb','--textbox-focus-line-color'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--status'),`);
    `,cs('#96d8fb','--textbox-label-color'),`: `,cs('#cb917b','#000'),`;
    `,cs('#96d8fb','--textbox-focus-label-color'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--status'),`);
    `,cs('#96d8fb','--textbox-disabled'),`: `,cs('#cb917b','#00000069'),`;
    `,cs('#96d8fb','--textbox-bg-color'),`: `,cs('#cb917b','transparent'),`;
    `,cs('#96d8fb','--textbox-color'),`: `,cs('#cb917b','currentColor'),`;
    `,cs('#96d8fb','--textbox-placeholder-color'),`: `,cs('#cb917b','#888'),`;
}\n
`
                    ]),
                ]),
                m('.h4','JS接口'),
                    m(TableTemplate,{
                        colgroup: ['20%','10%','16%','7%','auto']
                    },[
TableRow(['Attributes'           ,'Type'          ,'Default'        ,'Theme'        ,'Description'],'th'),
TableRow(['基本屬性'              ,'string'        ,'default'        ,'all'          ,'可輸入屬性有 id、class、type、minlength、maxlength、max、min、disabled、readonly、required、tabindex、pattern、size、step、placeholder、autocomplete、autofocus、title、style、required']),
TableRow(['theme'                ,'string'        ,'native'         ,'all'          ,'預設有四種樣式native、group、bottomline、outline']),
TableRow(['value'                ,'object'        ,''               ,'all'          ,'要加入的傳遞值的model']),
TableRow(['class'                ,'string'        ,'default'        ,'all'          ,'要加入組件的className']),
TableRow(['success'              ,'boolen'        ,'false'          ,'all'          ,'組件是否為通過狀態']),
TableRow(['error'                ,'boolen'        ,'false'          ,'all'          ,'組件是否為錯誤狀態']),
TableRow(['disabled'             ,'boolen'        ,'false'          ,'all'          ,'組件是否為禁用狀態']),
TableRow(['options.valueKey'     ,'string'        ,'value'          ,'all'          ,'value物件使用的參數Key名']),
TableRow(['options.validate'     ,'function'      ,'default'        ,'all'          ,`驗證函式： error: return validateText<br>success: return false`]),
TableRow(['options.validateText' ,'string'        ,'"輸入框不能空白"' ,'all'          ,'驗證回饋的文字']),
TableRow(['options.groupPrepend' ,'string mithril','undefined'      ,'group'        ,'Bootstrap群組，文字框前置樣式']),
TableRow(['options.groupAppend'  ,'string mithril','undefined'      ,'group'        ,'Bootstrap群組，文字框後置樣式']),
TableRow(['options.groupPrepend' ,'string mithril','undefined'      ,'bottomline<br>outline','文字框外前置樣式']),
TableRow(['options.groupAppend'  ,'string mithril','undefined'      ,'bottomline<br>outline','文字框外後置樣式']),
TableRow(['options.panelPrefix'  ,'string mithril','undefined'      ,'bottomline<br>outline','文字框內前置樣式']),
TableRow(['options.panelSuffix'  ,'string mithril','undefined'      ,'bottomline<br>outline','文字框內後置樣式']),
TableRow(['options.label'        ,'string mithril','undefined'      ,'bottomline<br>outline','文字框上浮動的文字']),
TableRow(['options.method'       ,'object'        ,''               ,'all'          ,'將內部方法引用出來']),
TableRow(['events.onchange'      ,'function'      ,'undefined'      ,'all'          ,'文字輸入完成事件']),
TableRow(['events.oninput'       ,'function'      ,'undefined'      ,'all'          ,'輸入文字事件']),
TableRow(['events.onclick'       ,'function'      ,'undefined'      ,'all'          ,'點擊事件']),
TableRow(['events.onfocus'       ,'function'      ,'undefined'      ,'all'          ,'聚焦事件']),
TableRow(['events.onblur'        ,'function'      ,'undefined'      ,'all'          ,'失焦事件']),
                ]),
            ]),
            m('.py-5.my-5'),
        ])
    }
}