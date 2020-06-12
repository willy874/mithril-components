import m from 'mithril'
import {
    CheckBox
} from '@base'
import uuid from 'uuid'
import { colorSet,CodeTemplate,TableTemplate,TableRow } from '../tool';
const cs = colorSet

export default class{
    constructor(vnode) {
        this.model = {}
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
                
                m('h3.pt-5',['CheckBox']),
                m('.py-3',[
                    m('span.h5','Model Value： '),
                    m.trust(`this.model: ${JSON.stringify(this.model)}`),
                ]),
                m('.row',[
                    m('.col-12',[
                        m(CheckBox,{
                            value: this.model,
                            childrens: [{
                                label: 'Check1',
                                class: 'd-inline-block'
                            },{
                                label: 'Check2',
                                class: 'd-inline-block'
                            },{
                                label: 'Check3',
                                class: 'd-inline-block'
                            },{
                                label: 'Check4',
                                class: 'd-inline-block'
                            },{
                                disabled: true,
                                label: 'Check5',
                                class: 'd-inline-block'
                            },{
                                checked: true,
                                label: 'Check6',
                                class: 'd-inline-block'
                            }]
                        }),
                        m(CheckBox,{
                            theme: 'material',
                            value: this.model,
                            childrens: [{
                                label: 'Check1',
                            },{
                                label: 'Check2',
                            },{
                                label: 'Check3',
                            },{
                                label: 'Check4',
                            },{
                                disabled: true,
                                label: 'Check5',
                            },{
                                checked: true,
                                label: 'Check6',
                            }]
                        }),
                    ]),
                    m('.col-4',[
                        m(CheckBox,{
                            disabled: true,
                            value: {},
                            childrens: [{
                                label: 'Check1',
                                class: 'd-inline-block'
                            },{
                                label: 'Check2',
                                class: 'd-inline-block'
                            },{
                                label: 'Check3',
                                class: 'd-inline-block'
                            }]
                        })
                    ]),
                    m('.col-4',[
                        m(CheckBox,{
                            disabled: true,
                            theme: 'material',
                            value: {},
                            childrens: [{
                                label: 'Check1',
                            },{
                                label: 'Check2',
                            },{
                                label: 'Check3',
                            }]
                        })
                    ])
                ])
            ])
        ])
    }
}