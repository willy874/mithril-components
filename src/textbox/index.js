import m from 'mithril'
import {
    Component
} from '../util-components'
import classNames from 'classnames/bind'
import styles from './styles/textbox.css'
const cx = classNames.bind(styles)
import TextField from '../textfield'
import InputComponent from '../textfield/component'

export default class TextBox extends Component {
    constructor(vnode) {
        super()
        this.attrs = this.checkAttrs(vnode.attrs, ['events', 'options'])
        this.inputAttrs = vnode.attrs.inputAttrs ||
            this.filterAttrs(vnode.attrs, ['id', 'minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required'])
        this.options = this.checkAttrs(vnode.attrs.options, ['validateText', 'validate'])
        this.events = this.checkAttrs(vnode.attrs.events, ['onfocus', 'onblur'])

        this.validate = this.options.validate
        this.validateText = this.options.validateText
        this.groupPrepend = this.options.groupPrepend
        this.groupAppend = this.options.groupAppend
        this.prefix = this.options.prefix
        this.suffix = this.options.suffix
        this.label = this.options.label
        this.class = vnode.attrs.class
        this.type = vnode.attrs.type
        this.value = vnode.attrs.value
        this.theme = vnode.attrs.theme
        

        //生成state
        this.state = new InputComponent(this)
    }
    view(vnode) {
        //bootstrap
        if (this.state.theme === 'native') {
            return m.fragment({}, [
                this.handleComponent(this.state.label, 'div', {
                    class: 'input-group-text'
                }),
                m(TextField, {
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
                    class: classNames(this.state.class, 'input-group')
                }, [
                    (this.state.groupPrepend) ?
                    m('.input-group-prepend', [
                        this.handleComponent(this.state.groupPrepend, 'div', {
                            class: 'input-group-text'
                        })
                    ]) : null,
                    m('.flex-1', [
                        m(TextField, {
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
                class: classNames('textbox-line', this.state.class,cx('textbox-bottomline',this.state.textboxValidCalss()))
            }, [
                m('div', {
                    class: cx('bottomline-grid')
                }, [
                    (this.state.groupPrepend) ? m('div', {
                        class: cx('group-prepend')
                    }, this.state.groupPrepend) : null,
                    m('div', {
                        class: classNames({
                            'is-invalid': this.state.hasError()
                        }, cx('bottomline-wrapper'))
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
                        m(TextField, {
                            class: 'bottomline-form-control',
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
                class: classNames('textbox-line', this.state.class,cx('textbox-outline',this.state.textboxValidCalss()))
            }, [
                m('div', {
                    class: cx('outline-grid')
                }, [
                    (this.state.groupPrepend) ? m('div', {
                        class: cx('group-prepend')
                    }, this.state.groupPrepend) : null,
                    m('div', {
                        class: classNames({
                            'is-invalid': this.state.hasError()
                        }, cx('outline-wrapper'))
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
                        m(TextField, {
                            class: 'bottomline-form-control',
                            state: this.state
                        }),
                        (this.state.suffix) ? m('div', {
                            class: cx('suffix')
                        }, this.state.suffix) : null,

                        m('fieldset', {
                            class: cx('outline-fieldset', {
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
            m(TextField, {
                state: this.state
            }),
            (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
        ])

    }
}