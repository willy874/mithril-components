import m from 'mithril'
import {
    Select
} from '@base'
import { colorSet,CodeTemplate,TableTemplate,TableRow } from '../tool';
const cs = colorSet

export default class SelectPage {
    constructor(){
        this.model = {
            //text: '測試用model',
            value: 0
        }
        this.model2 = {
            text: '測試用model',
            value: 0
        }
        this.childrens = [{
            text: '一'
        },{
            text: '二'
        },{
            text: '三'
        },{
            text: '四'
        },{
            text: '五',
           // selected: true
        },{
            text: '六'
        },{
            text: '七'
        },{
            text: '八'
        },{
            text: '九'
        },{
            text: '十'
        }]
    }
    view() {
        return m('.main', [
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
            m('.container.pt-5', [
                m('h3.pt-5', 'Select'),
                m('.pt-3',[
                    m('span.h5','Model Value 01： '),
                    m.trust(`this.model.text: ${this.model2.text},  this.model.value: ${this.model2.value}<br>`),
                    m('span.h5','Model Value 02： '),
                    m.trust(`this.model.text: ${this.model.text},  this.model.value: ${this.model.value}`),
                    
                ]),
                m('.row', [
                    m('.col-6.my-3', [
                        m(Select,{
                            value: new Object(this.model2),
                            selected: {
                                text: '所有公告',
                                value: 'all'
                            },
                            childrens:[{
                                text: '所有公告',
                                value: 'all'
                            },{
                                text: '緊急公告',
                                value: '1'
                            },{
                                text: '一般公告',
                                value: '2'
                            }]
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                groupPrepend: '@',
                                groupAppend: '@'
                            },
                            theme: 'group',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                groupPrepend: m('.input-group-text','@'),
                            },
                            theme: 'group',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                groupAppend: class {
                                    view(){
                                        return m('.input-group-text','@')
                                    }
                                }
                            },
                            theme: 'group',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                ]),
                m('.row', [
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                input: true
                            },
                            theme: 'material',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                input: true,
                                panelHeight: 500
                            },
                            theme: 'material',
                            value: new Object(this.model),
                            childrens: this.childrens,
                            events: {
                                oninput: (e,v,a) => {
                                    console.log('event =',e,'\nvalue =',v,'\nattrs =',a)
                                }
                            }
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                panelHeight: 160
                            },
                            theme: 'material',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                ]),
                m('.my-3',[
                    m(CodeTemplate,[`
`,cs('#d4bb85','.select'),`{
    `,cs('#96d8fb','--status'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--primary'),`);
    `,cs('#96d8fb','--select-btn-bg-color'),`: `,cs('#cb917b','transparent'),`;
    `,cs('#96d8fb','--select-panel-bg-color'),`: `,cs('#cb917b','#fff'),`;
    `,cs('#96d8fb','--select-line-color'),`: `,cs('#cb917b','#666'),`;
    `,cs('#96d8fb','--select-border-color'),`: `,cs('#cb917b','transparent'),`;
    `,cs('#96d8fb','--select-border-line'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--primary'),`);
    `,cs('#96d8fb','--select-hover-bg-color'),`: `,cs('#dadbaf','var'),`(`,cs('#96d8fb','--primary'),`);
    `,cs('#96d8fb','--select-hover-text-color'),`: `,cs('#cb917b','#fff'),`;
    `,cs('#96d8fb','--select-disabled-bg-color'),`: `,cs('#cb917b','#666'),`;
}\n
`,cs('#c188bb','import'),` {`,cs('#96d8fb','Select'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','Select'),`)\n
`
                    ]),
                ]),
                m('.h4','JS接口'),
                m(TableTemplate,{
                    colgroup: ['20%','10%','16%','7%','auto']
                },[
TableRow(['Attributes'           ,'Type'          ,'Default'        ,'Theme'        ,'Description'],'th'),
TableRow(['theme'                ,'string'        ,'native'         ,'all'          ,'預設有三種樣式native、group、material']),
TableRow(['value'                ,'object'        ,'selected'       ,'all'          ,'供予傳址的參數']),
TableRow(['class'                ,'string'        ,'default'        ,'all'          ,'要加入組件的className']),
TableRow(['disabled'             ,'boolen'        ,'false'          ,'all'          ,'組件是否為禁用狀態']),
TableRow(['error'                ,'boolen'        ,'false'          ,'all'          ,'組件是否為錯誤狀態']),
TableRow(['success'              ,'boolen'        ,'false'          ,'all'          ,'組件是否為通過狀態']),
TableRow(['validate'             ,'function'      ,'default'        ,'all'          ,'驗證函式：() => { return error || validateText }']),
TableRow(['options.groupPrepend' ,'string mithril','undefined'      ,'group'        ,'Bootstrap群組，前置樣式']),
TableRow(['options.groupAppend'  ,'string mithril','undefined'      ,'group'        ,'Bootstrap群組，後置樣式']),
TableRow(['options.panelHeight'  ,'number'        ,'320'            ,'material'　   ,'下拉選單的最大高度(單位:px)']),
TableRow(['options.panelPrefix'  ,'string mithril','undefined'      ,'all'          ,'下拉選單前置項目']),
TableRow(['options.panelSuffix'  ,'string mithril','undefined'      ,'all'          ,'下拉選單後置項目']),
TableRow(['options.textKey'      ,'string mithril','undefined'      ,'text'         ,'value物件使用的文字Key名']),
TableRow(['options.valueKey'     ,'string mithril','undefined'      ,'value'        ,'value物件使用的參數Key名']),
TableRow(['options.input'        ,'boolen'        ,'false'          ,'material'　   ,'是否可以用輸入文字的方式選取']),
TableRow(['options.label'        ,'string mithril','undefined'      ,'all'          ,'選取框上方的文字']),
TableRow(['options.validateText' ,'string'        ,'"選擇的內容有誤"' ,'all'          ,'驗證回饋的文字']),
TableRow(['events.onchange'      ,'function'      ,'undefined'      ,'all'          ,'Select選取選項事件']),
TableRow(['events.oninput'       ,'function'      ,'undefined'      ,'all'          ,'輸入文字事件，需開啟options.input']),
TableRow(['events.onclick'       ,'function'      ,'undefined'      ,'all'          ,'點擊Select事件']),
TableRow(['events.onfocus'       ,'function'      ,'undefined'      ,'all'          ,'聚焦Select事件']),
TableRow(['events.onblur'        ,'function'      ,'undefined'      ,'all'          ,'失焦Select事件']),
TableRow(['selected'             ,'object'        ,'default'        ,'all'          ,'預設選項參數：{ text:"請選擇",\n value:index }']),
TableRow(['selected[textKey]'    ,'string'        ,'請選擇'          ,'all'          ,'預設選項參數文字']),
TableRow(['selected[valueKey]'   ,'string number' ,'null'           ,'all'          ,'預設選項參數的值']),
TableRow(['childrens'            ,'array'         ,'[ ]'            ,'all'          ,'下拉選單的參數']),
TableRow(['childrens[textKey]'   ,'string'        ,'" "'            ,'all'          ,'下拉選單參數文字']),
TableRow(['childrens[valueKey]'  ,'string number' ,'undefined'      ,'all'          ,'下拉選單參數的值']),
TableRow(['childrens.disabled'   ,'boolen'        ,'false'          ,'all'          ,'下拉選單禁用']),
TableRow(['childrens.selected'   ,'boolen'        ,'false'          ,'native group' ,'下拉選單預設項目']),
TableRow(['childrens.style'      ,'object'        ,'default'        ,'all'          ,'下拉選單的樣式']),
TableRow(['childrens.class'      ,'string'        ,'default'        ,'all'          ,'下拉選單的className']),
                ]),
                
            ])
        ])
    }
}
//#c188bb 語法紅
//#cb917b 字串橘
//#96d8fb 變數藍
//#579cd5 語法藍
//#50c8af 類別綠
//#dadbaf 函式黃
//#59714f 註解綠
//#af9660 樣式黃