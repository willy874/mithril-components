import m from 'mithril'
import * as Components from '@src'
import * as Page from './pages'


export default class Demo {
    constructor() {
        this.toggle = false
        this.error = ''
        this.value = 'abc@abc.com.tw'
    }


    view(vnode) {

        return m('.body', {
            style: {
                width: '100%',
                backgroundColor: '#cceecc',
            }
        }, [
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
                m('.row', [
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'SVG'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/svgPage'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'Button'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/button'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'TextBox'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/inputPage'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'TextArea'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/textarea'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'Attach'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/attach'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'Select'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/select'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'XXX'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/svgPage'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'XXX'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/svgPage'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'XXX '),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/svgPage'
                                }, '看範例')
                            ])
                        ])
                    ]),
                    m('.col-3.py-3', [
                        m('.card', [
                            m('.card-header', 'Carousel'),
                            m('.card-body', [
                                m('.card-text'),
                                m('a.btn.btn-primary', {
                                    href: '#!/carousel'
                                }, '看範例')
                            ])
                        ])
                    ]),
                ]),




            ])
        ])
    }
}

m.route(document.body, '/', {
    '/': Demo,
    '/svgPage': Page.SvgPage,
    '/inputPage': Page.InputPage,
    '/button': Page.ButtonPage,
    '/textarea': Page.TextAreaPage,
    '/attach': Page.AttachPage,
    '/select': Page.SelectPage,
    '/carousel': Page.CarouselPage
})