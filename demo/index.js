import m from 'mithril'
import * as Components from '@src'
import * as Icon from '@src/m2x-icon/core'
import * as Page from './pages'



export default class Demo {
    constructor() {
        this.toggle = false
        this.error = ''
        this.value = 'abc@abc.com.tw'
        this.IconArray = []
        for (let path in Icon) {
            if(path != 'Icon') 
                this.IconArray.push({
                    path: Icon[path],
                    name: path
                })
        }
    }
    

    view(vnode) {
        
        return m('.body', {
            style: {
                width: '100%',
                backgroundColor: '#cceecc',
            }
        }, [
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
            m('.container', [
                m('.row',[
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','SVG'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','TextInput'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/inputPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX '),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3',[
                        m('.card',[
                            m('.card-header','XXX'),
                            m('.card-body',[
                                m('.card-text'),
                                m('a.btn.btn-primary',{
                                    href: '#!/svgPage'
                                },'看範例')
                            ])
                        ])
                    ]),
                ]),

                

                m('h3.pt-5',['TextArea Bottomline']),
                m('.row',[
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                prefix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                suffix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                text: 'TextBox:',
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                icon: m('i',m(Icon.TextA)),
                                text: 'TextBox:',
                                theme: 'bottomline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
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
                        m(Components.TextArea,{
                            
                            options: {
                                class: 'error',
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            success: true,
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            disabled: true,
                            options: {
                                theme: 'bottomline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                ]),
                m('.row',[
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                prefix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                suffix: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                text: 'TextBox:',
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            options: {
                                icon: m('i',m(Icon.TextA)),
                                text: 'TextBox:',
                                theme: 'outline',
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
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
                        m(Components.TextArea,{
                            
                            options: {
                                class: 'error',
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA)),
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            success: true,
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                    m('.col-3',[
                        m(Components.TextArea,{
                            disabled: true,
                            options: {
                                theme: 'outline',
                                label: 'TextBox',
                                icon: m('i',m(Icon.TextA))
                            }
                        })
                    ]),
                ]),




                m('.py-5'),

                m('div', [
                    m('h3', 'Calendar'),
                    m('h4', 'example：'),
                    m('div', [
                        m(Components.Calendar)
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),
                m('div', [
                    m('h3', 'Checkbox'),
                    m('h4', 'example：'),
                    m('div', [
                        m(Components.Checkbox, {
                            class: '',
                            theme: 'material',
                            checked: this.checked,
                            onclick: (e) => {
                                if (this.checked) {
                                    this.checked = false
                                } else {
                                    this.checked = true
                                }
                            },
                            label: `checkbox`,
                            //disabled: true
                        })
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),
                m('div', [
                    m('h3', 'Radio'),
                    m('h4', 'example：'),
                    m('div', [
                        m(Components.Radio, {
                            theme: 'material',
                            class: '',
                            checked: this.radio,
                            onclick: (e) => {
                                if (this.radio) {
                                    this.radio = false
                                } else {
                                    this.radio = true
                                }
                            },
                            label: `radio-${this.radio}`
                        }),
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),
                // m('div', [
                //     m('h3', 'Slider'),
                //     m('h4', 'example：'),
                //     m('div', [
                //         m(Components.Slider)
                //     ]),
                //     m('pre', [
                //         m('code', [
                //             ''
                //         ])
                //     ]),
                // ]),
                m('div', [
                    m('h3', 'Select'),
                    m('h4', 'Native Select:'),
                    m('.row',[
                        m('.col-6.py-2', [
                            m(Components.Select, {
                                theme: 'bootstrap',
                                onchange: (e) => {
                                    this.selected = e.target.value
                                },
                                options: [{
                                    value: 1,
                                    text: 'One',
                                    selected: (this.selected == 1)
                                }, {
                                    value: 2,
                                    text: 'Two',
                                    selected: (this.selected == 2)
                                }, {
                                    value: 3,
                                    text: 'Three',
                                    selected: (this.selected == 3)
                                }],
                            })
                        ]),
                        m('.col-6.py-2', [
                            m(Components.Select, {
                                theme: 'bootstrap',
                                onchange: (e) => {
                                    this.selected = e.target.value
                                },
                                options: [{
                                    value: 1,
                                    text: 'One',
                                    selected: (this.selected == 3)
                                }, {
                                    value: 2,
                                    text: 'Two',
                                    selected: (this.selected == 2)
                                }, {
                                    value: 3,
                                    text: 'Three',
                                    selected: (this.selected == 3)
                                }],
                                label: '請選擇'
                            })
                        ]),
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),
                m('div', [
                    m('h3', 'Select'),
                    m('h4', 'Material Select:'),
                    m('div', [
                        m(Components.Select, {
                            theme: 'material',
                            label: '選項',
                            onclick: (e, value) => {},
                            selected: {
                                value: 0,
                                text: '請選擇'
                            },
                            // disabled: true,
                            options: [{
                                value: 1,
                                text: 'One'
                            }, {
                                value: 2,
                                text: 'Two'
                            }, {
                                value: 3,
                                text: 'Three'
                            }]
                        })
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),
                m('div', [
                    m('h3', 'Switch'),
                    m('h4', 'example：'),
                    m('div', [
                        m(Components.Switch, {
                            theme: 'material',
                            class: '',
                            checked: this.switch,
                            onclick: (e) => {
                                if (this.switch) {
                                    this.switch = false
                                } else {
                                    this.switch = true
                                }
                            },
                            label: `switch-${this.switch}`
                        })
                    ]),
                    m('pre', [
                        m('code', [
                            ''
                        ])
                    ]),
                ]),

            ])
        ])
    }
}

m.route(document.body, '/',{
    '/': Demo,
    '/svgPage': Page.SvgPage,
    '/inputPage': Page.InputPage
})