import m from 'mithril'
import {
    Select,
    TextBox,
    CheckBox
} from '@base'

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
                m('h3.pt-5', 'Group Test'),
                m('.row', [
                    m('.col-6.my-3', [
                        m(Select,{
                            options: {
                                mobileMode: true
                            },
                            theme: 'material',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-3.my-3', [
                        m(TextBox,{
                            options: {
                                label: 'fly label',
                            },
                            value: '我是初始文字',
                            theme: 'bottomline',
                        })
                    ]),
                    m('.col-3.my-3', [
                        m(TextBox,{
                            options: {
                                label: 'fly label',
                            },
                            value: '我是初始文字',
                            theme: 'outline',
                        })
                    ]),
                ]),
                m('.row', [
                    m('.col-3.my-4', [
                        m(TextBox,{
                            options: {
                                label: 'fly label',
                            },
                            value: '我是初始文字',
                            theme: 'bottomline',
                        }),
                    ]),
                    m('.col-4.my-2', [
                        m(CheckBox,{
                            theme: 'material',
                            childrens: [{
                                label: 'Check1',
                            },{
                                label: 'Check2',
                            },{
                                label: 'Check3',
                            },{
                                label: 'Check4',
                            },{
                                label: 'Check5',
                            },{
                                label: 'Check6',
                            }]
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(CheckBox,{
                            theme: 'material',
                            childrens: [{
                                label: 'Check1',
                            },{
                                label: 'Check2',
                            },{
                                label: 'Check3',
                            }]
                        })
                    ]),
                    m('.col-3.my-4',[
                        m(TextBox,{
                            options: {
                                label: 'fly label',
                            },
                            value: '我是初始文字',
                            theme: 'outline',
                        })
                    ])
                ]),
                m('.row', [
                    m('.col-4.my-3', [
                        m(Select,{
                            options: {
                                mobileMode: true
                            },
                            theme: 'native',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            options: {
                                mobileMode: true
                            },
                            theme: 'bottomline',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(Select,{
                            options: {
                                mobileMode: true
                            },
                            theme: 'outline',
                            value: new Object(this.model),
                            childrens: this.childrens
                        })
                    ]),
                ]),
                m('.row', [
                    m('.col-4.my-3', [
                        m(TextBox,{
                            value: '我是初始文字',
                            theme: 'native',
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(TextBox,{
                            value: '我是初始文字',
                            theme: 'bottomline',
                            class: 'w-100'
                        })
                    ]),
                    m('.col-4.my-3', [
                        m(TextBox,{
                            value: '我是初始文字',
                            theme: 'outline',
                            class: 'w-100'
                        })
                    ]),
                ])
            ])
        ])
    }
}
