import m from 'mithril'
import {
    Select,DateTool
} from '@base'
import { colorSet,CodeTemplate,TableTemplate,TableRow } from '../tool';
const cs = colorSet



export default class DateToolPage {
    constructor(){
        this.selectData1 = new DateTool({
            maxDate: '2031/04/20',
            minDate: '1981/08/10',
            textKey: 'tk',
            valueKey: 'vk'
        })
        this.selectData2 = new DateTool({
            maxDate: '2031/04/20',
        })
        this.selectData3 = new DateTool({
            minDate: '1981/08/10',
        })
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
                m('h3.pt-5', 'DateTool'),
                m('.row', [
                    m('.col-12.pt-3',[
                        m('span.h5','Model RangeDate： '),
                        m.trust(`<br>this.model.text: ${this.selectData1.select().year.selected[this.selectData1.select().set.textKey]}`),
                        m.trust(`<br>this.model.text: ${this.selectData1.select().month.selected[this.selectData1.select().set.textKey]}`),
                        m.trust(`<br>this.model.text: ${this.selectData1.select().day.selected[this.selectData1.select().set.textKey]}`),
                        m.trust(`<br>this.model.date: ${this.selectData1.getMomentValue().format('YYYY-MM-DD')}`),
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData1.select().year.selected,
                            childrens: this.selectData1.select().year.childrens,
                            options: {
                                textKey: this.selectData1.select().set.textKey,
                                valueKey: this.selectData1.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData1.select().month.selected,
                            childrens: this.selectData1.select().month.childrens,
                            options: {
                                textKey: this.selectData1.select().set.textKey,
                                valueKey: this.selectData1.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData1.select().day.selected,
                            childrens: this.selectData1.select().day.childrens,
                            options: {
                                textKey: this.selectData1.select().set.textKey,
                                valueKey: this.selectData1.select().set.valueKey
                            },
                        })
                    ]),
                    //
                    m('.col-12.pt-3',[
                        m('span.h5','Model MaxDate： '),
                        m.trust(`<br>this.model.text: ${this.selectData2.select().year.selected.text}`),
                        m.trust(`<br>this.model.text: ${this.selectData2.select().month.selected.text}`),
                        m.trust(`<br>this.model.text: ${this.selectData2.select().day.selected.text}`),
                        m.trust(`<br>this.model.date: ${this.selectData2.getMomentValue().format('YYYY-MM-DD')}`),
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData2.select().year.selected,
                            childrens: this.selectData2.select().year.childrens,
                            options: {
                                textKey: this.selectData2.select().set.textKey,
                                valueKey: this.selectData2.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData2.select().month.selected,
                            childrens: this.selectData2.select().month.childrens,
                            options: {
                                textKey: this.selectData2.select().set.textKey,
                                valueKey: this.selectData2.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData2.select().day.selected,
                            childrens: this.selectData2.select().day.childrens,
                            options: {
                                textKey: this.selectData2.select().set.textKey,
                                valueKey: this.selectData2.select().set.valueKey
                            },
                        })
                    ]),
                    //
                    m('.col-12.pt-3',[
                        m('span.h5','Model MinDate： '),
                        m.trust(`<br>this.model.text: ${this.selectData3.select().year.selected.text}`),
                        m.trust(`<br>this.model.text: ${this.selectData3.select().month.selected.text}`),
                        m.trust(`<br>this.model.text: ${this.selectData3.select().day.selected.text}`),
                        m.trust(`<br>this.model.date: ${this.selectData3.getMomentValue().format('YYYY-MM-DD')}`),
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData3.select().year.selected,
                            childrens: this.selectData3.select().year.childrens,
                            options: {
                                textKey: this.selectData3.select().set.textKey,
                                valueKey: this.selectData3.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData3.select().month.selected,
                            childrens: this.selectData3.select().month.childrens,
                            options: {
                                textKey: this.selectData3.select().set.textKey,
                                valueKey: this.selectData3.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            theme: 'material',
                            value: this.selectData3.select().day.selected,
                            childrens: this.selectData3.select().day.childrens,
                            options: {
                                textKey: this.selectData3.select().set.textKey,
                                valueKey: this.selectData3.select().set.valueKey
                            },
                        })
                    ]),
                    m('.col-12.my-3.text-left',[
                        m(CodeTemplate,[`
`,cs('#6AAF4E','//可呼叫函式的方法'),`\n
`,cs('#c188bb','import'),` {`,cs('#96d8fb','Select'),`,`,cs('#96d8fb','DateTool'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#579cd5','const'),` `,cs('#96d8fb',`selectData`),` = `,cs('#579cd5','new'),` `,cs('#50c8af','DateTool'),`({
    `,cs('#96d8fb',`maxDate`),`: `,cs('#cb917b',`'2031/04/20'`),`,
    `,cs('#96d8fb',`minDate`),`: `,cs('#cb917b',`'1981/08/10'`),`,
    `,cs('#96d8fb',`textKey`),`: `,cs('#cb917b',`'text'`),`,
    `,cs('#96d8fb',`valueKey`),`: `,cs('#cb917b',`'value'`),`
})\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','Select'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','year'),`.`,cs('#96d8fb','selected'),`,
    `,cs('#96d8fb','childrens'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','year'),`.`,cs('#96d8fb','childrens'),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','textKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','textKey'),`
        `,cs('#96d8fb','valueKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','valueKey'),`
    }
}),
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','Select'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','month'),`.`,cs('#96d8fb','selected'),`,
    `,cs('#96d8fb','childrens'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','month'),`.`,cs('#96d8fb','childrens'),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','textKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','textKey'),`
        `,cs('#96d8fb','valueKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','valueKey'),`
    }
}),
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','Select'),`,{
    `,cs('#96d8fb','value'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','day'),`.`,cs('#96d8fb','selected'),`,
    `,cs('#96d8fb','childrens'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','day'),`.`,cs('#96d8fb','childrens'),`,
    `,cs('#96d8fb','options'),`: {
        `,cs('#96d8fb','textKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','textKey'),`
        `,cs('#96d8fb','valueKey'),`: `,cs('#96d8fb',`selectData`),`.`,cs('#dadbaf','select'),`().`,cs('#96d8fb','set'),`.`,cs('#96d8fb','valueKey'),`
    }
})\n
`                       ]),
                    ]),

                    m('.h4','JS接口'),
                    m(TableTemplate,{
                        colgroup: ['20%','12%','7%','auto']
                    },[
    TableRow(['Attributes'    ,'Type'          ,'Default' ,'Description'],'th'),
    TableRow(['maxDate'       ,'string'        ,'now Date','最大時間']),
    TableRow(['minDate'       ,'string'        ,'now Date','最小時間']),
    TableRow(['textKey'       ,'string'        ,'text'    ,'selected物件使用的文字Key名']),
    TableRow(['valueKey'      ,'string'        ,'value'   ,'selected物件使用的參數Key名']),
    TableRow(['yearSelected'  ,'object'        ,'default' ,'紀錄年份時間參數的物件']),
    TableRow(['monthSelected' ,'object'        ,'default' ,'紀錄月份時間參數的物件']),
    TableRow(['daySelected'   ,'object'        ,'default' ,'紀錄日期時間參數的物件']),
                    ]),
                    m('.h4','JS Method'),
                    m(TableTemplate,{
                        colgroup: ['20%','20%','12%','auto']
                    },[
    TableRow(['Method','Argument','ReturnType','Description'],'th'),
    TableRow(['moment()',
                `string value = now Date`,
                `moment`,
                `可直接呼叫 moment.js`]),
    TableRow(['getMomentValue()',
                ``,
                `moment`,
                `取得目前參數代入的時間`]),
    TableRow(['setDateValue(setValue)',
                `object setValue = {}`,
                `void`,
                `重新設定set參數`]),
    TableRow(['select()',
                ``,
                `object`,
                `有{year,month,day}，可回傳要放入 Select 的 {childrens,selected}`]),
    TableRow(['select().set',
                ``,
                `object`,
                `取得目前set參數`]),
    TableRow(['select().getChildrens',
                ``,
                `Array &lt;object&gt;`,
                `取得要放入 Select 的 childrens 陣列參數，有{year,month,day}`]),
    TableRow(['select().getSelected',
                ``,
                `object`,
                `取得要放入 Select 的 selected 物件參數，有{year,month,day}`]),
                    ]),
                ])
            ])
        ])
    }
}
