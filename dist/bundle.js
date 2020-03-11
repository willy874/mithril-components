'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var m = _interopDefault(require('mithril'));
var stream = _interopDefault(require('mithril/stream'));
var classNames = _interopDefault(require('classnames/bind'));
var uuid = _interopDefault(require('uuid/v4'));
var uuid$1 = _interopDefault(require('uuid'));
require('validate.js');
var moment = _interopDefault(require('moment'));
var classNames$1 = _interopDefault(require('classnames'));

var styles = {"textarea-bottomline":"TTvtC","fly-label":"_2fLMS","flying":"_1mOU2","bottomline-wrapper":"_38Ahm","is-invalid":"_3r6MK","disabled":"_2lD6U","bottomline-grid":"y77Ei","textarea-bottomline-wrapper":"_2btmh","textarea-bottomline-form-control":"_1u3y0","textarea-outline":"_2enu-","outline-fieldset":"SDuP8","outline-wrapper":"_3t9Ye","textarea-outline-grid":"_2jMAt","textarea-outline-wrapper":"_208mO","textarea-outline-form-control":"_3z12Z","textarea-outline-fieldset":"_3-vqD","password-reveal":"_224kN","icon-btn":"lt257","prefix":"_3PFHb","suffix":"_7WCXT"};

const cx = classNames.bind(styles);


const allowAttrs = ['id', 'minlength', 'maxlength', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'cols', 'rows', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required'];
const allowEvents = ['oninput', 'onchange', 'onfocus', 'onblur'];

function filter(raw, allows = []) {
    const filtered = Object.keys(raw) //取出raw所有的key轉化為array
        .filter(key => allows.includes(key)) //判斷raw是否存在於allows設定的key，並回傳出新陣列
        .reduce((obj, key) => { //取出keys轉化為object
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

function checkEvent(options, event) {
    return options.hasOwnProperty(event) && typeof options[event] === 'function'
}

/**
 * TextAreaField
 * 可接受屬性:['id', 'minlength', 'maxlength', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'cols', 'rows', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required','class']
 * 事件:['oninput', 'onchange', 'onfocus', 'onblur']
 * class: 預設為bootstrap classname: 'form-control', 可接受自訂classname
 * 操作設定:
 * showValid: 顯示bootstrap valid狀態
 */

class TextAreaField {
    constructor(vnode) {
        let options = vnode.attrs;

        this.attrs = {};
        this.events = {};

        //操作屬性
        this.hasError = options.hasError || stream(vnode.attrs.error);
        this.hasValue = options.hasValue || stream(vnode.attrs.value);
        //顯示bootstrap valid
        this.showValid = options.showValid === true ? stream(true) : stream(false);

        //初始化
        this.init(options);

    }
    init(options) {
        //過濾多餘的屬性
        this.attrs = filter(options, allowAttrs);
        //過濾事件
        this.events = filter(options, allowEvents);

        if (checkEvent(options, 'validate')) {
            this.events.onchange = (e) => {
                const error = options.validate(e.target.value);
                this.hasError(error);
                if (checkEvent(options, 'onchange')) {
                    options.onchange(e);
                }
            };
        }

        if (checkEvent(options, 'oninput')) {
            this.events.oninput = (e) => {
                options.oninput(e);
                if (e.target.value) {
                    this.hasValue(true);
                } else {
                    this.hasValue(false);
                }
            };
        }
    }

    handleClassNames(classnames) {
        //class 樣式-不打亂
        const validate = classNames({
            'is-valid': this.showValid() && !this.hasError(),
            'is-invalid': this.hasError()
        });
        classnames = classnames || 'form-control';

        //ie edge 密碼
        //css打亂
        return classNames(classnames, validate)
    }
    /**
     * 檢查外部屬性
     * @param {*} attrs vnode.attrs
     */
    checkError(attrs) {
        if (attrs.hasOwnProperty('error')) {
            this.hasError(attrs.error);
        }
    }

    view(vnode) {
        this.checkError(vnode.attrs);
        this.showValid(vnode.attrs.showValid);

        return m('textarea', {
            class: this.handleClassNames(vnode.attrs.class),
            ...this.attrs,
            ...this.events,
            value: vnode.attrs.value
        })
    }
}

const cx$1 = classNames.bind(styles);

class LineTextArea {
    handleLabel(theme, placeholder) {
        const {
            label,
            prefix,
            grid
        } = theme;

        if (typeof label === 'function') {
            return
        }

        let flyLabel = {
            text: '',
            fixed: false
        };

        if (typeof label === 'string') {
            flyLabel.text = label;
            flyLabel.fixed = (placeholder) ? true : false;
        }

        if (typeof label === 'object') {
            flyLabel.text = label.text;
            flyLabel.fixed = (placeholder) ? true : label.fixed;
        }

        if (prefix && !(grid)) {
            flyLabel.fixed = true;
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
        } = vnode.attrs;

        const themeName = theme.type;
        const flyLabel = this.handleLabel(theme, placeholder);
        const disabled = vnode.attrs.disabled;

        return m('div', {
            class: classNames('textarea-line', cx$1(`textarea-${themeName}`, {
                'is-invalid': hasError(),
                'disabled': disabled
            }), theme.class)
        }, [
            (theme.grid) ? [
                m('div', {
                    class: cx$1(`textarea-${themeName}-grid`)
                }, [
                    (theme.prefix) ? m('span', {
                        class: cx$1('prefix')
                    }, theme.prefix) : null,
                    m('div', [
                        m('div', {
                            class: classNames({
                                'is-invalid': hasError()
                            }, cx$1(`textarea-${themeName}-wrapper`))
                        }, [
                            (flyLabel) ? m('label', {
                                class: cx$1('fly-label', {
                                    'flying': hasValue() || flyLabel.fixed === true,
                                    'is-invalid': hasError()
                                })
                            }, flyLabel.text) : null,
                            m(TextAreaField, Object.assign({}, vnode.attrs, {
                                class: cx$1(`textarea-${themeName}-form-control`),
                                hasError,
                                hasValue
                            })),
                            (themeName === 'outline') ? [
                                m('fieldset', {
                                    class: cx$1('textarea-outline-fieldset', {
                                        'flying': hasValue() || flyLabel.fixed === true,
                                    })
                                }, [
                                    m('legend', {
                                        class: cx$1({
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
                    (theme.suffix) ? m('span', {
                        class: cx$1('suffix')
                    }, theme.suffix) : null,
                ]),
                (hasError() && showError) ? m('.invalid-feedback', hasError()) : helper
            ] : [
                (flyLabel) ? m('label', {
                    class: cx$1('fly-label', {
                        'flying': hasValue() || flyLabel.fixed === true || theme.prefix,
                        'is-invalid': hasError()
                    })
                }, flyLabel.text) : null,
                m('div', {
                    class: classNames({
                        'is-invalid': hasError()
                    }, cx$1(`textarea-${themeName}-wrapper`))
                }, [
                    (theme.prefix) ? m('span', {
                        class: cx$1('prefix')
                    }, theme.prefix) : null,
                    m(TextAreaField, Object.assign({}, vnode.attrs, {
                        class: cx$1(`textarea-${themeName}-form-control`),
                        hasError,
                        hasValue
                    })),
                    (theme.suffix) ? m('span', {
                        class: cx$1('suffix')
                    }, theme.suffix) : null,
                    (themeName === 'outline') ? [
                        m('fieldset', {
                            class: cx$1('textarea-outline-fieldset', {
                                'flying': hasValue() || flyLabel.fixed === true,
                            })
                        }, [
                            m('legend', {
                                class: cx$1({
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

const cx$2 = classNames.bind(styles);


/**
 * TextBox參數
 * label: 顯示標籤, type: string, mithril
 * helper: 顯示說明文字, type: string, mithril
 * showError: 顯示錯誤,預設為true
 */
class TextArea {
    constructor(vnode) {
        this.hasError = stream(vnode.attrs.error);
        this.hasValue = stream(vnode.attrs.value);
    }
    handleLabel(label) {
        if (!label) {
            return
        }
        if (typeof label === 'string') {
            return m('label', label)
        }
        if (typeof label === 'function') {
            return m(label)
        }
    }
    handleHelper(helper) {
        if (!helper) {
            return
        }
        if (typeof helper === 'string') {
            return m('small.form-text.text-muted', helper)
        }
        if (typeof helper === 'function') {
            return m(helper)
        }
    }
    view(vnode) {
        let {
            label,
            helper,
            showError,
            group,
            theme
        } = vnode.attrs;

        label = this.handleLabel(label);
        helper = this.handleHelper(helper);
        showError = (showError === false) ? false : true;
        this.hasError(vnode.attrs.error);
        this.hasValue(vnode.attrs.value);

        if (theme) {
            return m(LineTextArea, {
                theme,
                ...vnode.attrs,
                hasError: this.hasError,
                hasValue: this.hasValue,
                showError,
                helper
            })
        }

        //bootstrap group
        if (group) {
            return m('div', {
                class: group.class || 'input-group mb-3'
            }, [
                group.prefix,
                m('.flex-1', {
                    class: classNames({
                        'is-invalid': this.hasError()
                    }),
                }, [
                    m(TextAreaField, Object.assign({}, vnode.attrs, {
                        hasError: this.hasError,
                        hasValue: this.hasValue
                    })),

                ]),
                group.suffix,
                (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper

            ])
        }


        //bootstrap 
        return m.fragment({}, [
            label,
            m(TextAreaField, Object.assign({}, vnode.attrs, {
                hasError: this.hasError,
                hasValue: this.hasValue
            })),
            (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper
        ])
    }
}

var styles$1 = {"textbox-bottomline":"_1Wt6F","fly-label":"_3n7VY","flying":"_2ifm1","bottomline-wrapper":"_1RDJY","is-invalid":"zgGQq","disabled":"_14mIP","bottomline-grid":"_1LJt9","bottomline-form-control":"_1XssW","textbox-outline":"_1dxTf","outline-fieldset":"dgPAR","outline-wrapper":"_2HuSA","outline-grid":"_3iz99","outline-form-control":"_2QPqN","password-reveal":"_3fAcc","icon-btn":"_12v8m","prefix":"_1MlwE","suffix":"Gbfhe"};

var styles$2 = {};

const cx$3 = classNames.bind(styles$2);

class ICON {
    view(vnode) {
        const config = this.config();
        let attrs = {
            ...config,
            ...vnode.attrs
        };
        if (attrs.hasOwnProperty('class') && typeof attrs.class === 'string') {
            attrs.class = cx$3(attrs.class);
        }
        return m('svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]', attrs, [
            m.trust(this.path())
        ])
    }

}

class View extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            `
    }
}

class View$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            `
    }
}

const cx$4 = classNames.bind(styles$1);

//css 部份要補
//disabled, readonly
const allowAttrs$1 = ['id', 'minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required'];

const allowEvents$1 = ['oninput', 'onchange', 'onfocus', 'onblur'];

function filter$1(raw, allows = []) {
    const filtered = Object.keys(raw)//取出raw所有的key轉化為array
        .filter(key => allows.includes(key)) //判斷raw是否存在於allows設定的key，並回傳出新陣列
        .reduce((obj, key) => { //取出keys轉化為object
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

function checkEvent$1(options, event) {
    return options.hasOwnProperty(event) && typeof options[event] === 'function'
}

/**
 * TextField
 * 可接受屬性:['minlength', 'maxlength', 'max', 'min', 'disabled', 'readonly', 'required', 'tabindex', 'pattern', 'size', 'step', 'placeholder', 'autocomplete', 'autofocus', 'title', 'style', 'required', 'class']
 * 事件:['oninput', 'onchange', 'onfocus', 'onblur']
 * class: 預設為bootstrap classname: 'form-control', 可接受自訂classname
 * 操作設定:
 * showValid: 顯示bootstrap valid狀態
 */

class TextField {
    constructor(vnode) {
        let options = vnode.attrs;

        this.type = vnode.attrs.type || 'text';
        this.attrs = {};
        this.events = {};

        //操作屬性
        this.hasError = options.hasError || stream(vnode.attrs.error);
        this.hasValue = options.hasValue || stream(vnode.attrs.value);
        //顯示bootstrap valid
        this.showValid = options.showValid === true ? stream(true) : stream(false);

        //初始化
        this.init(options);

        //密碼使用
        if (this.type === 'password') {
            this.reveal = 'hidden';
        }
    }
    init(options) {
        //過濾多餘的屬性
        this.attrs = filter$1(options, allowAttrs$1);
        //過濾事件
        this.events = filter$1(options, allowEvents$1);

        if (checkEvent$1(options, 'validate')) {
            this.events.onchange = (e) => {
                const error = options.validate(e.target.value);
                this.hasError(error);
                if (checkEvent$1(options, 'onchange')) {
                    options.onchange(e);
                }
            };
        }

        if (checkEvent$1(options, 'oninput')) {
            this.events.oninput = (e) => {
                options.oninput(e);
                if (e.target.value) {
                    this.hasValue(true);
                } else {
                    this.hasValue(false);
                }
            };
        }
    }

    handleClassNames(classnames) {
        //class 樣式-不打亂
        const validate = classNames({
            'is-valid': this.showValid() && !this.hasError(),
            'is-invalid': this.hasError()
        });
        classnames = classnames || 'form-control';

        //ie edge 密碼
        //css打亂
        return classNames(classnames, validate, cx$4({
            'password-reveal': this.reveal
        }))
    }
    /**
     * 檢查外部屬性
     * @param {*} attrs vnode.attrs
     */
    checkError(attrs) {
        if (attrs.hasOwnProperty('error')) {
            this.hasError(attrs.error);
        }
    }

    view(vnode) {
        this.checkError(vnode.attrs);
        this.showValid(vnode.attrs.showValid);

        if (this.reveal) {
            return m('div', {
                class: classNames(cx$4('d-flex'))
            }, [
                m('input', {
                    type: this.type,
                    class: this.handleClassNames(vnode.attrs.class),
                    ...this.attrs,
                    ...this.events,
                    value: vnode.attrs.value
                }),
                m('button[type="button"]', {
                    class: classNames(cx$4('icon-btn')),
                    onclick: (e) => {
                        if (this.reveal === 'hidden') {
                            this.type = 'text';
                            this.reveal = 'visible';
                        } else {
                            this.reveal = 'hidden';
                            this.type = 'password';
                        }
                    }
                }, [
                    (this.reveal == 'hidden') ? m(View$1) : m(View)
                ])
            ])
        }
        return m('input', {
            type: this.type,
            class: this.handleClassNames(vnode.attrs.class),
            ...this.attrs,
            ...this.events,
            value: vnode.attrs.value
        })
    }
}

const cx$5 = classNames.bind(styles$1);

class LineTextBox {
    handleLabel(theme, placeholder) {
        const {
            label,
            prefix,
            grid
        } = theme;

        if (typeof label === 'function') {
            return
        }

        let flyLabel = {
            text: false,
            fixed: false
        };

        if (typeof label === 'string') {
            flyLabel.text = label;
            flyLabel.fixed = (placeholder) ? true : false;
        }

        if (typeof label === 'object') {
            flyLabel.text = label.text;
            flyLabel.fixed = (placeholder) ? true : label.fixed;
        }

        if (prefix && !(grid)) {
            flyLabel.fixed = true;
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
        } = vnode.attrs;

        const themeName = theme.type;
        const flyLabel = this.handleLabel(theme, placeholder);
        const disabled = vnode.attrs.disabled;

        return m('div', {
            class: classNames('textbox-line', cx$5(`textbox-${themeName}`, {
                'is-invalid': hasError(),
                'disabled': disabled
            }), theme.class)
        }, [
            (theme.grid) ? [
                m('div', {
                    class: cx$5(`${themeName}-grid`)
                }, [
                    (theme.prefix) ? m('div', {
                        class: cx$5('prefix')
                    }, theme.prefix) : null,
                    m('div', [
                        m('div', {
                            class: classNames({
                                'is-invalid': hasError()
                            }, cx$5(`${themeName}-wrapper`))
                        }, [
                            (flyLabel.text) ? m('label', {
                                class: cx$5('fly-label', {
                                    'flying': hasValue() || flyLabel.fixed === true,
                                    'is-invalid': hasError()
                                })
                            }, flyLabel.text) : null,
                            m(TextField, Object.assign({}, vnode.attrs, {
                                class: cx$5(`${themeName}-form-control`),
                                hasError,
                                hasValue
                            })),
                            (themeName === 'outline') ? [
                                m('fieldset', {
                                    class: cx$5('outline-fieldset', {
                                        'flying': hasValue() || flyLabel.fixed === true,
                                    })
                                }, [
                                    m('legend', {
                                        class: cx$5({
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
                        class: cx$5('suffix')
                    }, theme.suffix) : null
                ]),
                (hasError() && showError) ? m('.invalid-feedback', hasError()) : helper
            ] : [
                (flyLabel.text) ? m('label', {
                    class: cx$5('fly-label', {
                        'flying': hasValue() || flyLabel.fixed === true,
                        'is-invalid': hasError()
                    })
                }, flyLabel.text) : null,
                m('div', {
                    class: classNames({
                        'is-invalid': hasError()
                    }, cx$5(`${themeName}-wrapper`))
                }, [
                    (theme.prefix) ? m('span', {
                        class: cx$5('prefix')
                    }, theme.prefix) : null,
                    m(TextField, Object.assign({}, vnode.attrs, {
                        class: cx$5(`${themeName}-form-control`),
                        hasError,
                        hasValue
                    })),
                    (theme.suffix) ? m('span', {
                        class: cx$5('suffix')
                    }, theme.suffix) : null,
                    (themeName === 'outline') ? [
                        m('fieldset', {
                            class: cx$5('outline-fieldset', {
                                'flying': hasValue() || flyLabel.fixed === true,
                            })
                        }, [
                            m('legend', {
                                class: cx$5({
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

const cx$6 = classNames.bind(styles$1);


// import LineTextBox from './line'



/**
 * TextBox參數
 * label: 顯示標籤, type: string, mithril
 * helper: 顯示說明文字, type: string, mithril
 * showError: 顯示錯誤,預設為true
 */
class TextBox {
    constructor(vnode) {
        this.hasError = stream(vnode.attrs.error);
        this.hasValue = stream(vnode.attrs.value);
    }
    handleLabel(label) {
        if (!label) {
            return
        }
        if (typeof label === 'string') {
            return m('label', label)
        }
        if (typeof label === 'function') {
            return m(label)
        }
    }
    handleHelper(helper) {
        if (!helper) {
            return
        }
        if (typeof helper === 'string') {
            return m('small.form-text.text-muted', helper)
        }
        if (typeof helper === 'function') {
            return m(helper)
        }
    }
    view(vnode) {
        let {
            label,
            helper,
            showError,
            group,
            theme
        } = vnode.attrs;

        label = this.handleLabel(label);
        helper = this.handleHelper(helper);
        showError = (showError === false) ? false : true;
        this.hasError(vnode.attrs.error);
        this.hasValue(vnode.attrs.value);

        if (theme) {
            return m(LineTextBox, {
                theme,
                ...vnode.attrs,
                hasError: this.hasError,
                hasValue: this.hasValue,
                showError,
                helper
            })
        }

        //bootstrap group
        if (group) {
            return m('div', {
                class: group.class || 'input-group mb-3 align-items-start'
            }, [
                group.prefix,
                m('.flex-1', [
                    m(TextField, Object.assign({}, vnode.attrs, {
                        hasError: this.hasError,
                        hasValue: this.hasValue
                    })),
                    (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper
                ]),
                group.suffix,

            ])
        }


        //bootstrap 
        return m.fragment({}, [
            label,
            m(TextField, Object.assign({}, vnode.attrs, {
                hasError: this.hasError,
                hasValue: this.hasValue
            })),
            (this.hasError() && showError) ? m('.invalid-feedback', this.hasError()) : helper
        ])
    }
}

const config = new WeakMap;

class Config {
    set(value = {}) {
        config.set(this, value);
    }
    get theme() {
        let _config = config.get(this);
        return (_config) ? _config.theme : ''
    }
}

var Config$1 = (new Config);

var styles$3 = {"material":"SnYez","radio":"_3EGkm","success":"_3cv1Y","error":"_1B-KV","disabled":"lh15w","radio-wave-effect-on":"_369ki","radio-wave-effect-off":"_19Exk"};

const cx$7 = classNames.bind(styles$3);

class Radio {
    constructor() {
        this.id = uuid();
    }
    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
            name,
            required
        } = vnode.attrs;

        const classes = vnode.attrs.class;

        const _theme = theme ? theme : Config$1.theme;

        return m('.custom-control.custom-radio', {
            class: [cx$7('radio', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="radio"]', {
                id: this.id,
                onclick,
                checked,
                disabled,
                name,
                required
            }),
            m('label.custom-control-label', {
                for: this.id
            }, [
                m('div', {
                    class: cx$7({
                        'radio-wave-effect-on': checked,
                        //'radio-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

var styles$4 = {"select":"X-tV4","material":"SAooc","success":"_1CIdz","error":"g77gf","disabled":"_3dWwg","select-dropdown":"HLDoM","select-btn":"_3e05s","select-panel":"ncUex","select-line":"njqf5","select-option":"d8p8k","active":"_2f_Ad"};

const cx$8 = classNames.bind(styles$4);
let selectActive = [];
document.body.addEventListener('click', (e) => {
    //全域關閉事件
    for (let i = 0; i < selectActive.length; i++) {
        if (!selectActive[i].active && selectActive[i].btn.uuid == e.target.uuid && !selectActive[i].disabled) {
            selectActive[i].active = true;
        } else {
            selectActive[i].active = false;
            m.redraw();
        }
    }
});


class MaterialSelectComponent {
    constructor(vnode) {
        const {
            selected,
            options
        } = vnode.attrs;
        this.selected = (selected) ? selected : options[0];
        this.active = false;
        this.disabled = vnode.attrs.disabled || false;
        selectActive.push(this);
    }
    oncreate(vnode) {
        this.btn = vnode.dom.querySelector(classNames(`.${cx$8('select-btn')}`));
        this.btn.uuid = uuid$1();
    }
    view(vnode) {
        const {
            selected,
            options,
            onclick,
            disabled,
            error,
            success,
            onchange
        } = vnode.attrs;
        return m('div', {
            class: cx$8('select-dropdown', {
                'active': this.active,
                'disabled': disabled,
            })
        }, [
            m('div', {
                class: cx$8('select-btn'),
                onclick: (e) => {
                    e.preventDefault();
                    const value = this.selected.value;
                    onclick(e,value,{
                        disabled,
                        error,
                        success,
                        options,
                        active: this.active,
                        btn: this.btn
                    });
                },
            }, this.selected.text || this.selected.value || ''),
            m('div', {
                class: cx$8('select-line')
            }),
            m('div', {
                class: cx$8('select-column'),
            }, [
                m('div',{
                    class: cx$8('select-panel'),
                },[
                    m('div', {
                        class: cx$8('select-option'),
                    }, [
                        m('span', this.selected.text || this.selected.value || '') 
                    ]),
                    options.map((item, index) => {
                        return m('div', {
                            class: cx$8('select-option', {
                                'active': item.disabled || (this.selected.value == item.value),
                                'disabled': item.disabled
                            }),
                            onclick: (e) => {
                                e.preventDefault();
                                if (item.disabled) {
                                    return false
                                }
                                this.selected = item;
                                if(onchange){
                                    onchange(e, item.value,{
                                        disabled,
                                        error,
                                        success,
                                        selected,
                                        disabledItem: item.disabled
                                    });
                                }
                            },
                        }, [
                            m('span', item.text)
                        ])
                    })
                ]),
                
            ])
        ])
    }
}

// {
//     selected,
//     onchange,
//     disabled,
//     error,
//     success,
//     required,
//     label,
//     select:{
//         disabled,
//         onchange,
//         required,
//         style,
//         class
//     },
//     options:{
//         style,
//         class,
//         value,
//         disabled,
//         selected
// }

class NativeSelectComponent {
    view(vnode) {
        const {
            selected,
            options,
            onchange,
            disabled,
            error,
            success,
            required,
            select
        } = vnode.attrs;

        const selectClasses = (select) ?( select.class) ? select.class : '' : '';

        return m('select.custom-select.browser-default', {
                disabled,
                onchange,
                required,
                style: (select) ?( select.style) ? select.style : '' : '',
                class: classNames(selectClasses,'form-control',{
                    'is-invalid': error,
                    'is-valid': success
                })
            }, [
                (selected)? m('option', {
                    disabled: true,
                    selected: options.every(item => item.selected != selected),
                    value: 'null'
                }, selected): null,

                options.map(item => {
                    return m('option', {
                        style: (item.style) ? item.style : '',
                        class: (item.class) ? item.class : '',
                        value: (item.value) ? item.value : '',
                        disabled: (item.disabled),
                        selected: (item.selected) ? item.selected : '',
                    }, item.text)
                }),
                
            ]

        )
    }
}


class Select {
    constructor(vnode) {

    }
    view(vnode) {
        const {
            theme,
            selected,
            options,
            select,
            label,
            onchange,
            onclick,
            required,
            error,
            success,
            disabled,
            hasError,
            verification
        } = vnode.attrs;

        const classes = vnode.attrs.class;
        const _theme = theme ? theme : Config$1.theme;

        return m('div', {
            class: classNames(classes,{
                'success': success,
                'error': error
            },cx$8('select', _theme))
        }, [
            (_theme === 'bootstrap') ? [
                (label) ? m('label', label) : null,
                m(NativeSelectComponent, {
                    selected,
                    onchange,
                    disabled,
                    options,
                    error,
                    success,
                    required,
                    label,
                    select,
                    verification
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : [
                (label) ? m('label', label) : null,
                m(MaterialSelectComponent, {
                    selected,
                    onchange,
                    disabled,
                    options,
                    error,
                    success,
                    required,
                    label,
                    select,
                    onclick,
                    verification
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ]
            
        ])
    }
}

var styles$5 = {"material":"_23gbE","switch":"_2TzXj","success":"_2t65r","error":"_1rObM","disabled":"U7Jgc","switch-wave-effect-on":"_13JKH","switch-wave-effect-off":"_37OuF"};

const cx$9 = classNames.bind(styles$5);

class Switch {
    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
        } = vnode.attrs;
        const classes = vnode.attrs.class;
        const id = uuid();
        const _theme = theme ? theme : Config$1.theme;

        return m('.custom-control.custom-switch', {
            class: [cx$9('switch', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="checkbox"]', {
                id,
                onclick,
                checked,
                disabled
            }),
            m('label.custom-control-label', {
                for: id
            }, [
                m('div', {
                    class: cx$9({
                        'switch-wave-effect-on': checked,
                        //'switch-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

var styles$6 = {"success":"_2DghH","material":"_2Lo8J","checkbox":"SxWqM","error":"_1b3dp","disabled":"_3dB1a","select-option":"_1Gbix","select-btn":"_2HVYJ","checkbox-wave-effect-on":"_3DP-O","checkbox-wave-effect-off":"_7UISw"};

const cx$a = classNames.bind(styles$6);



class Checkbox {

    view(vnode) {
        const {
            theme,
            checked,
            onclick,
            label,
            style,
            disabled,
            required
        } = vnode.attrs;

        const classes = vnode.attrs.class;
        const id = uuid();
        const _theme = theme ? theme : Config$1.theme;

        return m('.custom-control.custom-checkbox', {
            class: [cx$a('checkbox', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="checkbox"]', {
                id,
                onclick,
                checked,
                disabled,
                required
            }),
            m('label.custom-control-label', {
                for: id

            }, [
                m('div', {
                    class: cx$a({
                        'checkbox-wave-effect-on': checked,
                        //'checkbox-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

function getCalendar(firstDayOfMonth) {
    const weekday = parseInt(firstDayOfMonth.format('e'));
    const lastMonthDate = parseInt(moment(firstDayOfMonth).add(-1, 'month').daysInMonth());
    const daysOfMonth = parseInt(moment(firstDayOfMonth).daysInMonth());
    const dates = [];
    for (let i = 0; i <= weekday; i++) {
        dates[i] = lastMonthDate - weekday + i + 1;
    }
    for (let i = 0; i < daysOfMonth; i++) {
        dates[i + weekday] = i + 1;
    }
    if (dates.length < 42) {
        let i = 0;
        while (dates.length < 42) {
            dates[dates.length] = ++i;
        }
    }
    return {
        dates,
        weekday,
        daysOfMonth
    }
}

class DateComponent {
    constructor(vnode) {
        let {
            firstDayOfMonth
        } = vnode.attrs;
        this.dates = [];
        this.weekday = 0;
        this.daysOfMonth = 0;
        this.firstDay = firstDayOfMonth.format();
        this.handleDateChange(firstDayOfMonth);
    }
    handleDateChange(firstDayOfMonth) {
        const {
            dates,
            weekday,
            daysOfMonth
        } = getCalendar(firstDayOfMonth);
        this.dates = dates;
        this.weekday = weekday;
        this.daysOfMonth = daysOfMonth;
    }
    onbeforeupdate(vnode) {
        const {
            firstDayOfMonth,
            isCurrent
        } = vnode.attrs;

        if (isCurrent && this.firstDay != firstDayOfMonth.format()) {
            this.handleDateChange(firstDayOfMonth);
            this.firstDay = firstDayOfMonth.format();
        }
    }
    notInMonth(index) {
        return (index < 7 && index < this.weekday) || (index - this.weekday >= this.daysOfMonth)
    }
    isSelected(day, selectedDate, theSameMonth, isInMonth) {
        if (theSameMonth && isInMonth) {
            return day == selectedDate().date()
        }
        return false
    }
    view(vnode) {
        const {
            cx,
            isCurrent,
            direction,
            selectedDate,
            firstDayOfMonth
        } = vnode.attrs;

        const theSameMonth = selectedDate().isSame(firstDayOfMonth, 'month');
        return m('div', {
            class: cx('calendar-content', {
                'calendar-moveToRight': (isCurrent && direction == 'right'),
                'calendar-moveFromLeft': (isCurrent === false && direction == 'right'),
                'calendar-moveToLeft': (isCurrent && direction == 'left'),
                'calendar-moveFromRight': (!isCurrent && direction == 'left'),
            })
        }, [
            this.dates.map((day, index) => {
                const isNotInMonth = this.notInMonth(index, firstDayOfMonth, selectedDate);
                return m('div', {
                    class: cx('calendar-content-cell'),
                }, [
                    m('div', {
                        class: cx('calendar-day', {
                            'not-in-month': isNotInMonth,
                            'selected': this.isSelected(day, selectedDate, theSameMonth, isNotInMonth == false)
                        }),
                        onclick: (e) => {
                            e.preventDefault();
                            if (isNotInMonth) {
                                return false
                            }
                            if (index < 7 && index < this.weekday) {
                                selectedDate(moment(this.firstDay).add(-1, 'month').set('date', day));
                            } else if (index - this.weekday >= this.daysOfMonth) {
                                selectedDate(moment(this.firstDay).add(1, 'month').set('date', day));
                            } else {
                                selectedDate(moment(this.firstDay).set('date', day));
                            }
                        }
                    }, day)
                ])
            })
        ])
    }
}

class YearPicker {
    years() {
        let years = [];
        for (let i = 1950; i < 2050; i++) {
            years.push(i);
        }
        return years
    }
    view(vnode) {
        const {
            cx,
            toggle
        } = vnode.attrs;
        return m('div', {
            class: cx('year-month-picker', 'show')
        }, [
            m('div', {
                class: cx('year-panel')
            }, [
                this.years().map(item => {
                    return m('div', {
                        class: cx('cell'),
                        onclick: (e) => {
                            e.preventDefault();
                            toggle(item);
                        }
                    }, `${item}年`)
                })
            ])
        ])
    }
}

class MonthPicker {
    months() {
        let months = [];
        for (let i = 0; i < 12; i++) {
            months.push(`${i + 1}月`);
        }
        return months
    }
    view(vnode) {
        const {
            cx,
            toggle
        } = vnode.attrs;
        return m('div', {
            class: cx('year-month-picker', 'show')
        }, [
            m('div', {
                class: cx('month-panel')
            }, [
                this.months().map((item, index) => {
                    return m('div', {
                        class: cx('cell'),
                        onclick: (e) => {
                            e.preventDefault();
                            toggle(index);
                        }
                    }, item)
                })
            ])
        ])
    }
}

var style = {"datepicker-popup":"_3aI8P","calendar":"_3ogyK","show":"_1Fs1a","calendar-header":"_2w01a","calendar-controls":"_2PfTw","mat-button":"_1BmuC","mat-icon-button":"cs9TJ","header-year-month":"_1QMMx","calendar-previous-button":"_2MwrD","calendar-next-button":"KZ1Bx","calendar-body":"LlDa6","calendar-weekly":"_10DG8","cell":"_1QDyH","calendar-divider":"ulKpJ","calendar-content":"_2Wop2","calendar-content-cell":"tuQIY","calendar-day":"_38xj6","selected":"mhpwL","not-in-month":"yomK5","perspective":"_3xt8y","calendar-moveToLeft":"_2QHbA","moveToLeft":"_3Rism","calendar-moveFromLeft":"pELb4","moveFromLeft":"_3DWmD","calendar-moveToRight":"_27GER","moveToRight":"_3A1OX","calendar-moveFromRight":"_11Jfs","moveFromRight":"_3Bc1g","year-month-picker":"_2H9Bz","pickerIn":"_3xupt","hide":"_3AIRI","pickerOut":"SLG2v","year-panel":"_230dQ","month-panel":"_1WS88"};

const cx$b = classNames.bind(style);

class Calendar {
    constructor(vnode) {
        //功能
        //初始值開始日期
        //僅顯示年,月
        //國曆,西元曆切換
        //disabled 特殊日期或日期區間
        let {
            selectedDate
        } = vnode.attrs;
        selectedDate = selectedDate || moment();
        this.selectedDate = stream(selectedDate);
        const firstDate = moment(this.selectedDate()).set('date', 1);
        this.months = [firstDate];
        this.changeDirection = null;
        this.toggle = stream(null);
    }
    oncreate(vnode) {
        //判斷位置
        if (vnode.dom) {
            const calendar = vnode.dom.querySelector(`.${cx$b('calendar')}`);
            calendar.classList.add(`${cx$b('show')}`);
        }
    }
    handleChange(currentMonth, direction) {
        if (this.months.length > 1) {
            return
        }
        if (direction == 'prev') {
            this.months.push(moment(currentMonth).add(-1, 'month'));
            this.changeDirection = 'right';

        } else {
            this.months.push(moment(currentMonth).add(1, 'month'));
            this.changeDirection = 'left';
        }

        setTimeout(() => {
            this.changeDirection = null;
            this.months.shift();
            m.redraw();
        }, 500);
    }
    handlePicker(dom, toggle, type) {
        if (toggle()) {
            const picker = dom.querySelector(`.${cx$b('year-month-picker')}`);
            picker.classList.remove(`${cx$b('show')}`);
            picker.classList.add(`${cx$b('hide')}`);
            picker.addEventListener("animationend", () => {
                toggle(false);
                m.redraw();
            });
        } else {
            toggle(type);
        }
    }
    handleYearAndMonth({
        type,
        value
    }) {
        const currentMonth = this.months[0];
        currentMonth.set(type, value);
    }
    view(vnode) {
        const {
            show,
            close
        } = vnode.attrs;

        return m('div', {
            class: cx$b('calendar-popup')
        }, [
            m('div', {
                class: cx$b('calendar')
            }, [
                m('div', {
                    class: cx$b('calendar-header')
                }, [
                    m('div', {
                        //使用flex
                        class: cx$b('calendar-controls')
                    }, [
                        m('div', {
                            class: cx$b('mat-button-wrapper')
                        }, [
                            m('button[type="button"]', {
                                class: cx$b('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'year');
                                }
                            }, [
                                m('span', {
                                    class: cx$b('header-year')
                                }, `${this.months[0].get('year')}年`)
                            ]),
                            m('button[type="button"]', {
                                class: cx$b('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'month');
                                }
                            }, [
                                m('span', {
                                    class: cx$b('header-month')
                                }, `${this.months[0].get('month') + 1}月`)
                            ])
                        ]),
                        m('div', {
                            class: cx$b('mat-button-wrapper'),
                            style: {
                                visibility: this.toggle() ? 'hidden' : 'visible'
                            }
                        }, [
                            m('button[type="button"]', {
                                class: cx$b('mat-icon-button', 'calendar-previous-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'prev');
                                }
                            }),
                            m('button[type="button"]', {
                                class: cx$b('mat-icon-button', 'calendar-next-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'next');
                                }
                            })
                        ])
                    ])
                ]),
                m('div', {
                    class: cx$b('calendar-body', 'perspective')
                }, [
                    m('div', {
                        class: cx$b('calendar-weekly')
                    }, [
                        ['日', '一', '二', '三', '四', '五', '六'].map(item => {
                            return m('div', {
                                class: cx$b('cell')
                            }, item)
                        }),
                    ]),
                    m('hr', {
                        class: cx$b('calendar-divider')
                    }),
                    m('div', {
                        class: cx$b('perspective')
                    }, [
                        this.months.map(month => {
                            return m(DateComponent, {
                                cx: cx$b,
                                key: month,
                                selectedDate: this.selectedDate,
                                //月份的第一天
                                firstDayOfMonth: month,
                                //是否為目前月份
                                isCurrent: this.months[0] == month,
                                direction: this.changeDirection
                            })
                        })
                    ]),
                    (this.toggle() === 'year') ? [
                        m(YearPicker, {
                            cx: cx$b,
                            toggle: (value) => {
                                this.handlePicker(vnode.dom, this.toggle, 'year');
                                this.handleYearAndMonth({
                                    type: 'year',
                                    value
                                });
                            }
                        })
                    ] : null,
                    (this.toggle() === 'month') ? [
                        m(MonthPicker, {
                            cx: cx$b,
                            toggle: (value) => {
                                this.handlePicker(vnode.dom, this.toggle, 'month');
                                this.handleYearAndMonth({
                                    type: 'month',
                                    value
                                });
                            }
                        })
                    ] : null
                ])
            ])
        ])
    }
}

var styles$7 = {"gi-waves-effect":"_IGQO","gi-waves-ripple":"_1sY7L","gi-waves-notransition":"_1-Uht"};

const cx$c = classNames.bind(styles$7);

const isTouchAvailable = 'ontouchstart' in window;

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function convertStyle(styleObj) {
    let style = '';

    for (let prop in styleObj) {
        if (styleObj.hasOwnProperty(prop)) {
            style += (prop + ':' + styleObj[prop] + ';');
        }
    }
    return style;
}

function offset(elem) {
    var docElem, win,
        box = {
            top: 0,
            left: 0
        },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

function attachWave(element, center, e) {

    if (e.button === 2) {
        return false;
    }

    element = element || this;

    // Create ripple
    const ripple = document.createElement('div');
    ripple.classList.add(`${cx$c('gi-waves-ripple')}`, `${cx$c('waves-rippling')}`);
    element.appendChild(ripple);

    const pos = offset(element);

    let relativeY = 0,
        relativeX = 0;

    if ('touches' in e && e.touches.length) {
        relativeY = (e.touches[0].pageY - pos.top);
        relativeX = (e.touches[0].pageX - pos.left);
    }
    //Normal case
    else {
        relativeY = (e.pageY - pos.top);
        relativeX = (e.pageX - pos.left);
    }

    // Support for synthetic events
    relativeX = relativeX >= 0 ? relativeX : 0;
    relativeY = relativeY >= 0 ? relativeY : 0;

    let scale = 'scale(' + ((element.clientWidth / 100) * 2) + ')';

    if (center) {
        scale = 'scale(1)';
    }

    const translate = 'translate(0,0)';

    let top = relativeY + 'px',
        left = relativeX + 'px',
        width,
        height;

    if (center) {
        top = (element.clientHeight / 2) + 'px';
        left = (element.clientWidth / 2) + 'px';
        width = element.clientWidth;
        height = element.clientWidth;
    }

    // Attach data to element
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-x', left);
    ripple.setAttribute('data-y', top);
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-translate', translate);

    // Set ripple position
    let rippleStyle = {
        top,
        left
    };

    if (width && height) {
        ripple.setAttribute('data-width', width);
        ripple.setAttribute('data-height', height);
        rippleStyle.width = width;
        rippleStyle.height = height;
    }

    ripple.classList.add(`${cx$c('gi-waves-notransition')}`);
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.classList.remove(`${cx$c('gi-waves-notransition')}`);

    rippleStyle['-webkit-transform'] = scale + ' ' + translate;
    rippleStyle['-moz-transform'] = scale + ' ' + translate;
    rippleStyle['-ms-transform'] = scale + ' ' + translate;
    rippleStyle['-o-transform'] = scale + ' ' + translate;
    rippleStyle.transform = scale + ' ' + translate;
    rippleStyle.opacity = '0.3';

    const duration = e.type === 'mousemove' ? 2500 : WaveEffect.duration;

    rippleStyle['-webkit-transition-duration'] = duration + 'ms';
    rippleStyle['-moz-transition-duration'] = duration + 'ms';
    rippleStyle['-o-transition-duration'] = duration + 'ms';
    rippleStyle['transition-duration'] = duration + 'ms';

    ripple.setAttribute('style', convertStyle(rippleStyle));
}

function removeWave(element, e) {

    element = element || this;
    const ripples = element.querySelectorAll(`.${cx$c('waves-rippling')}`);

    for (let i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
    }
}

function removeRipple(e, el, ripple) {

    // Check if the ripple still exist
    if (!ripple) {
        return;
    }

    ripple.classList.remove(`${cx$c('waves-rippling')}`);

    const relativeX = ripple.getAttribute('data-x');
    const relativeY = ripple.getAttribute('data-y');
    const scale = ripple.getAttribute('data-scale');
    const translate = ripple.getAttribute('data-translate');

    // Get delay beetween mousedown and mouse leave
    const diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    let delay = 350 - diff;

    if (delay < 0) {
        delay = 0;
    }

    if (e.type === 'mousemove') {
        delay = 150;
    }

    // Fade out ripple after delay
    const duration = e.type === 'mousemove' ? 250 : WaveEffect.duration;

    setTimeout(function () {
        let style = {
            top: relativeY,
            left: relativeX,
            opacity: '0',

            // Duration
            '-webkit-transition-duration': duration + 'ms',
            '-moz-transition-duration': duration + 'ms',
            '-o-transition-duration': duration + 'ms',
            'transition-duration': duration + 'ms',
            '-webkit-transform': scale + ' ' + translate,
            '-moz-transform': scale + ' ' + translate,
            '-ms-transform': scale + ' ' + translate,
            '-o-transform': scale + ' ' + translate,
            'transform': scale + ' ' + translate
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
            try {
                el.removeChild(ripple);
            } catch (e) {
                return false;
            }
        }, duration);

    }, delay);
}
/**
 * 點擊水波紋
 */
const WaveEffect = {
    // Effect duration
    duration: 500,
    // Effect delay (check for scroll before showing effect)
    delay: 200,
    attach: (target, center) => {
        // Disable right click
        target.classList.add(`${cx$c('gi-waves-effect')}`);
        target.addEventListener('mousedown', attachWave.bind(null, target, center), false);
        target.addEventListener('mouseup', removeWave.bind(null, target), false);
        target.addEventListener('mouseout', removeWave.bind(null, target), false);
    },
    destory: (target, center) => {
        if (isTouchAvailable) {
            element.removeEventListener('touchend', removeWave);
            element.removeEventListener('touchcancel', removeWave);
        }
        target.removeEventListener('mousedown', attachWave);
        target.removeEventListener('mouseup', removeWave);
    }
};

const wave = {
    oncreate: (vnode) => {
        // const light = vnode.attrs.effect.light || false
        WaveEffect.attach(vnode.dom);
    },
    onremove: (vnode) => {
        WaveEffect.destory(vnode.dom);
    }
};

class Button {
    constructor(vnode) {
        this.effect = {
            light: true
        };
        if (vnode.attrs.effect === false) {
            this.effect = false;
        }
    }
    view(vnode) {
        const {
            style,
            onclick,
            disabled
        } = vnode.attrs;


        let attrs = {
            class: classNames$1('btn', vnode.attrs.class),
            disabled,
            style,
            onclick
        };

        if (this.effect) {
            attrs = {
                ...attrs,
                ...wave
            };
        }

        return m('button[type="button"]', attrs, vnode.children)
    }
}

var style$1 = {"icon-wave-button":"_2pKgG"};

const cx$d = classNames.bind(style$1);

const wave$1 = {
    oncreate: (vnode) => {
        WaveEffect.attach(vnode.dom, true);
    },
    onremove: (vnode) => {
        WaveEffect.destory(vnode.dom, true);
    }
};

class IconButton {
    constructor(vnode) {
        this.effect = true;
        if (vnode.attrs.effect === false) {
            this.effect = false;
        }
    }
    view(vnode) {
        const {
            style,
            onclick,
            disabled
        } = vnode.attrs;


        let attrs = {
            class: classNames('btn', vnode.attrs.class, cx$d('icon-wave-button')),
            disabled,
            style,
            onclick
        };

        if (this.effect) {
            attrs = {
                ...attrs,
                ...wave$1
            };
        }

        return m('button[type="button"]', attrs, vnode.children)
    }
}

class Pagination {
    constructor(vnode) {
        this.hasFirst = false;
        this.hasMoreNext = false;
        this.hasMorePrev = false;
        this.hasLast = false;
        this.pages = [];
        this.pageRange = 4;
        this.computePages(vnode.attrs);
    }
    getPageRanges(start, end) {

        let ranges = [];
        for (let i = start; i <= end; i++) {
            ranges.push(i);
        }
        this.pages = ranges;
    }
    computePages(attrs) {
        let pageRange = this.pageRange;
        let totalPage = attrs.pageCount;

        let rangeStart = attrs.page - pageRange;

        let rangeEnd = attrs.page + pageRange;

        if (rangeEnd > totalPage) {
            rangeEnd = totalPage;
            rangeStart = totalPage - pageRange * 2;
            rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }
        if (rangeStart <= 1) {
            rangeStart = 1;
            rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }
        this.hasFirst = (rangeStart == 1);
        this.hasLast = (rangeEnd == totalPage);
        this.getPageRanges(rangeStart, rangeEnd);
    }
    onbeforeupdate({
        attrs
    }) {
        this.computePages(attrs);
    }
    view({
        attrs
    }) {
        return [
            (attrs.pageCount > 1) ? [
                m('nav', {
                    class: attrs.nav
                }, [
                    m('ul.pagination', {
                        class: attrs.pagination
                    }, [
                        m('li.page-item', {
                            class: classNames$1({
                                'disabled': this.hasFirst
                            })
                        }, [
                            m('a.page-link', {
                                href: '#',
                                onclick: (e) => {
                                    e.preventDefault();
                                    attrs.pageUrl(1);
                                }
                            }, [
                                m('span', m.trust('&laquo;'))
                            ])
                        ]),
                        this.pages.map((item) => {
                            return [
                                m('li.page-item', {
                                    class: classNames$1({
                                        'active': item == attrs.page
                                    })
                                }, [
                                    m('a.page-link', {

                                        href: '#',
                                        onclick: (e) => {
                                            e.preventDefault();
                                            attrs.pageUrl(item);
                                        }
                                    }, item)
                                ]),
                            ]
                        }),
                        m('li.page-item', {
                            class: classNames$1({
                                'disabled': this.hasLast
                            })
                        }, [
                            m('a.page-link', {
                                href: '#',
                                onclick: (e) => {
                                    e.preventDefault();
                                    attrs.pageUrl(attrs.pageCount);
                                }
                            }, [
                                m('span', m.trust('&raquo;'))
                            ])
                        ])
                    ])
                ])
            ] : ''

        ]
    }
}

class PageItemCount {
    constructor(vnode) {
        this.pageRange = 4;
        this.computeCount(vnode.attrs);
    }
    computeCount(attrs) {
        this.start = (attrs.page == 1) ? 1 : ((attrs.page - 1) * attrs.pageSize + 1);
        this.end = ((this.start + attrs.pageSize) > attrs.total) ? attrs.total : (this.start + attrs.pageSize - 1);
    }
    onbeforeupdate({
        attrs
    }) {
        this.computeCount(attrs);
    }
    view({
        attrs
    }) {
        return [
            m('.d-block', {
                class: attrs.class
            }, [
                (this.start && this.end) ?
                m('.d-inline-block', [
                    `第${this.start}項到${this.end}項,共${attrs.total}項`
                ]) : ''
            ])
        ]
    }
}

exports.Button = Button;
exports.Calendar = Calendar;
exports.CheckBox = Checkbox;
exports.Config = Config$1;
exports.IconButton = IconButton;
exports.PageItemCount = PageItemCount;
exports.Pagination = Pagination;
exports.Radio = Radio;
exports.Select = Select;
exports.Switch = Switch;
exports.TextArea = TextArea;
exports.TextBox = TextBox;
exports.TextField = TextField;
