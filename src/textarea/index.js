import m from 'mithril'
import {Component} from '../util-components'
import classNames from 'classnames/bind'
import styles from './styles/textarea.css'
const cx = classNames.bind(styles)
import TextAreaField from './field'
import createTextArea from './state'

export default class Textarea extends Component {
    constructor(vnode) {
        super()
        
        //生成state
        this.state = new createTextArea({
            state: this,
            attrs: vnode.attrs
        })
    }
    view(vnode) {
        //bootstrap
        if (this.state.theme === 'native') {
            return m.fragment({}, [
                this.handleComponent(this.state.label, 'div', {
                    style: this.state.style,
                    class: 'input-group-text'
                }),
                m(TextAreaField, {
                    state: this.state
                }),
                (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
            ])
        }
        
        //bootstrap group
        if (this.state.theme === 'group') {
            return m.fragment({}, [
                this.handleComponent(this.state.label, 'label', {
                    class: 'input-group-text'
                }),
                m('div', {
                    style: this.state.style,
                    class: classNames(this.state.class, 'input-group')
                }, [
                    (this.state.groupPrepend) ?
                    m('.input-group-prepend', [
                        this.handleComponent(this.state.groupPrepend, 'div', {
                            class: 'input-group-text'
                        })
                    ]) : null,
                    m('div', [
                        m(TextAreaField, {
                            state: this.state
                        }),
                    ]),
                    (this.state.groupAppend) ?
                    m('.input-group-append', [
                        this.handleComponent(this.state.groupAppend, 'div', {
                            class: 'input-group-text'
                        })
                    ]) : null,

                ]),
                (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
            ])

        }
        //bottomline
        if (this.state.theme === 'bottomline') {
            return m('div', {
                style: this.state.style,
                class: classNames('textarea-line', this.state.class,cx('textarea-bottomline',this.state.getValidCalss()))
            }, [
                m('div', {
                    class: cx('textarea-grid')
                }, [
                    (this.state.groupPrepend) ? m('div', {
                        class: cx('group-prepend')
                    }, this.state.groupPrepend) : null,
                    m('div', {
                        class: classNames({
                            'is-invalid': this.state.hasError()
                        }, cx('textarea-bottomline-wrapper'))
                    }, [
                        (this.state.prefix) ? m('div', {
                            class: cx('prefix')
                        }, this.state.prefix) : null,
                        (this.state.label) ? m('label', {
                            class: cx('fly-label', {
                                'is-invalid': this.state.hasError(),
                                'flying': this.state.flylabel(),
                            })
                        }, this.state.label) : null,
                        m(TextAreaField, {
                            state: this.state
                        }),
                        (this.state.suffix) ? m('div', {
                            class: cx('suffix')
                        }, this.state.suffix) : null
                    ]),
                    (this.state.groupAppend) ? m('div', {
                        class: cx('group-append')
                    }, this.state.groupAppend) : null
                ]),
                (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
            ])
        }
        
        //outline
        if (this.state.theme === 'outline') {
            return m('div', {
                style: this.state.style,
                class: classNames('textarea-line', this.state.class,cx('textarea-outline',this.state.getValidCalss()))
            }, [
                m('div', {
                    class: cx('textarea-grid')
                }, [
                    (this.state.groupPrepend) ? m('div', {
                        class: cx('group-prepend')
                    }, this.state.groupPrepend) : null,
                    m('div', {
                        class: classNames({
                            'is-invalid': this.state.hasError()
                        }, cx('textarea-outline-wrapper'))
                    }, [
                        (this.state.prefix) ? m('div', {
                            class: cx('prefix')
                        }, this.state.prefix) : null,
                        (this.state.label) ? m('label', {
                            class: cx('fly-label', {
                                'is-invalid': this.state.hasError(),
                                'flying': this.state.flylabel(),
                            })
                        }, this.state.label) : null,
                        m(TextAreaField, {
                            state: this.state
                        }),
                        (this.state.suffix) ? m('div', {
                            class: cx('suffix')
                        }, this.state.suffix) : null,

                        m('fieldset', {
                            class: cx('textarea-outline-fieldset', {
                                'flying': this.state.flylabel(),
                            })
                        }, [
                            m('legend', {
                                class: cx({
                                    'flying': this.state.flylabel(),
                                    'is-invalid': this.state.hasError()
                                })
                            }, [
                                (this.state.label) ? m('span', this.state.label) : null
                            ])
                        ])
                    ]),
                    (this.state.groupAppend) ? m('div', {
                        class: cx('group-append')
                    }, this.state.groupAppend) : null
                ]),
                (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
            ])
        }
        

        //bootstrap 
        return m.fragment({}, [
            this.handleComponent(this.state.label, 'div', {
                class: 'input-group-text'
            }),
            m(TextAreaField, {
                state: this.state
            }),
            (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
        ])

    }
}