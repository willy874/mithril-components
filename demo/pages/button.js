import m from 'mithril'
import {
    Button,
    IconButton
} from '@base'
import * as Icon from '@base/m2x-icon/core'

export default class ButtonPage {
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
                m('h3.pt-5', 'Button'),
                m('.row.text-center', [
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-primary',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-success',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-danger',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-outline-primary',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-outline-success',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', '一般按鈕'),
                        m(Button, {
                            class: 'btn btn-outline-danger',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', 'disabled按鈕'),
                        m(Button, {
                            disabled: true,
                            class: 'btn btn-primary',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', 'Text Buttons'),
                        m(Button, {
                            class: 'btn-flat',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, 'press me')
                    ]),
                    m('.col-2', [
                        m('h6', 'Icon Buttons'),
                        m(IconButton, {
                            class: 'btn-flat btn-floating',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, [
                            m('i', m(Icon.TextA, {
                                style: {
                                    fill: '#0062cc',
                                    width: '1rem',
                                    height: '1rem'
                                }
                            }))
                        ])
                    ]),
                    m('.col-2', [
                        m('h6', 'Icon Buttons'),
                        m(IconButton, {
                            class: 'btn-flat btn-floating text-danger',
                            onclick: (e) => {
                                console.log('click')
                            }
                        }, [
                            m('i', m(Icon.TextA, {
                                style: {
                                    fill: '#ff3547',
                                    width: '1rem',
                                    height: '1rem'
                                }
                            }))
                        ])
                    ])
                ])
            ])
        ])
    }
}