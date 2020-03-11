import m from 'mithril'
import classNames from 'classnames/bind'
import TextField from '../textfield'
import style from './styles/textbox.css'
const cx = classNames.bind(style)

export default class LineTextBox {
    handleLabel(theme, placeholder) {
        const {
            label,
            prefix,
            grid
        } = theme

        if (typeof label === 'function') {
            return
        }

        let flyLabel = {
            text: false,
            fixed: false
        }

        if (typeof label === 'string') {
            flyLabel.text = label
            flyLabel.fixed = (placeholder) ? true : false
        }

        if (typeof label === 'object') {
            flyLabel.text = label.text
            flyLabel.fixed = (placeholder) ? true : label.fixed
        }

        if (prefix && !(grid)) {
            flyLabel.fixed = true
        }

        return flyLabel
    }
    view(vnode) {
        const {
            hasError,
            hasValue,
            showError,
            helper,
            placeholder,
            theme
        } = vnode.attrs

        const themeName = theme.type
        const flyLabel = this.handleLabel(theme, placeholder)
        const disabled = vnode.attrs.disabled

        return m('div', {
            class: classNames('textbox-line', cx(`textbox-${themeName}`, {
                'is-invalid': hasError(),
                'disabled': disabled
            }), theme.class)
        }, [
            (theme.grid) ? [
                m('div', {
                    class: cx(`${themeName}-grid`)
                }, [
                    (theme.prefix) ? m('div', {
                        class: cx('prefix')
                    }, theme.prefix) : null,
                    m('div', [
                        m('div', {
                            class: classNames({
                                'is-invalid': hasError()
                            }, cx(`${themeName}-wrapper`))
                        }, [
                            (flyLabel.text) ? m('label', {
                                class: cx('fly-label', {
                                    'flying': hasValue() || flyLabel.fixed === true,
                                    'is-invalid': hasError()
                                })
                            }, flyLabel.text) : null,
                            m(TextField, Object.assign({}, vnode.attrs, {
                                class: cx(`${themeName}-form-control`),
                                hasError,
                                hasValue
                            })),
                            (themeName === 'outline') ? [
                                m('fieldset', {
                                    class: cx('outline-fieldset', {
                                        'flying': hasValue() || flyLabel.fixed === true,
                                    })
                                }, [
                                    m('legend', {
                                        class: cx({
                                            'flying': hasValue() || flyLabel.fixed === true,
                                            'is-invalid': hasError()
                                        })
                                    }, [
                                        (flyLabel.text) ? m('span', flyLabel.text) : null
                                    ])
                                ])
                            ] : null,
                        ])
                    ]),
                    (theme.suffix) ? m('div', {
                        class: cx('suffix')
                    }, theme.suffix) : null
                ]),
                (hasError() && showError) ? m('.invalid-feedback', hasError()) : helper
            ] : [
                (flyLabel.text) ? m('label', {
                    class: cx('fly-label', {
                        'flying': hasValue() || flyLabel.fixed === true,
                        'is-invalid': hasError()
                    })
                }, flyLabel.text) : null,
                m('div', {
                    class: classNames({
                        'is-invalid': hasError()
                    }, cx(`${themeName}-wrapper`))
                }, [
                    (theme.prefix) ? m('span', {
                        class: cx('prefix')
                    }, theme.prefix) : null,
                    m(TextField, Object.assign({}, vnode.attrs, {
                        class: cx(`${themeName}-form-control`),
                        hasError,
                        hasValue
                    })),
                    (theme.suffix) ? m('span', {
                        class: cx('suffix')
                    }, theme.suffix) : null,
                    (themeName === 'outline') ? [
                        m('fieldset', {
                            class: cx('outline-fieldset', {
                                'flying': hasValue() || flyLabel.fixed === true,
                            })
                        }, [
                            m('legend', {
                                class: cx({
                                    'flying': hasValue() || flyLabel.fixed === true,
                                    'is-invalid': hasError()
                                })
                            }, [
                                (flyLabel.text) ? m('span', flyLabel.text) : null
                            ])
                        ])
                    ] : null
                ]),
                (hasError() && showError) ? m('.invalid-feedback', hasError()) : helper
            ]
        ])
    }
}