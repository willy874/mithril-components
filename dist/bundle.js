'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var m = _interopDefault(require('mithril'));
var stream = _interopDefault(require('mithril/stream'));
var classNames = _interopDefault(require('classnames/bind'));
var uuid = _interopDefault(require('uuid/v4'));
var uuid$1 = _interopDefault(require('uuid'));
var moment = _interopDefault(require('moment'));
var classNames$1 = _interopDefault(require('classnames'));
var Sortable = _interopDefault(require('sortablejs'));

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

class ViewFill{
    view(){
        return m('i',[
            m.trust(`
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        `)
        ])
        
    }
}
class ViewDisable {
    view(){
        return m('i',[
            m.trust(`
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
        </svg>
        `)
        ])
        
    }
}

const cx$3 = classNames.bind(styles$1);

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
        this.showValid = options && options.showValid === true ? stream(true) : stream(false);

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
        return classNames(classnames, validate, cx$3({
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
                class: classNames(cx$3('d-flex'))
            }, [
                m('input', {
                    type: this.type,
                    class: this.handleClassNames(vnode.attrs.class),
                    ...this.attrs,
                    ...this.events,
                    value: vnode.attrs.value
                }),
                m('button[type="button"]', {
                    class: classNames(cx$3('icon-btn')),
                    onclick: (e) => {
                        if (this.reveal === 'hidden') {
                            this.type = 'text';
                            this.reveal = 'visible';
                        } else {
                            this.type = 'password';
                            this.reveal = 'hidden';
                        }
                    }
                }, [
                    (this.reveal == 'hidden') ? m(ViewFill) : m(ViewDisable)
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

const cx$4 = classNames.bind(styles$1);

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
            class: classNames('textbox-line', cx$4(`textbox-${themeName}`, {
                'is-invalid': hasError(),
                'disabled': disabled
            }), theme.class)
        }, [
            (theme.grid) ? [
                m('div', {
                    class: cx$4(`${themeName}-grid`)
                }, [
                    (theme.prefix) ? m('div', {
                        class: cx$4('prefix')
                    }, theme.prefix) : null,
                    m('div', [
                        m('div', {
                            class: classNames({
                                'is-invalid': hasError()
                            }, cx$4(`${themeName}-wrapper`))
                        }, [
                            (flyLabel.text) ? m('label', {
                                class: cx$4('fly-label', {
                                    'flying': hasValue() || flyLabel.fixed === true,
                                    'is-invalid': hasError()
                                })
                            }, flyLabel.text) : null,
                            m(TextField, Object.assign({}, vnode.attrs, {
                                class: cx$4(`${themeName}-form-control`),
                                hasError,
                                hasValue
                            })),
                            (themeName === 'outline') ? [
                                m('fieldset', {
                                    class: cx$4('outline-fieldset', {
                                        'flying': hasValue() || flyLabel.fixed === true,
                                    })
                                }, [
                                    m('legend', {
                                        class: cx$4({
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
                        class: cx$4('suffix')
                    }, theme.suffix) : null
                ]),
                (hasError() && showError) ? m('.invalid-feedback', hasError()) : helper
            ] : [
                (flyLabel.text) ? m('label', {
                    class: cx$4('fly-label', {
                        'flying': hasValue() || flyLabel.fixed === true,
                        'is-invalid': hasError()
                    })
                }, flyLabel.text) : null,
                m('div', {
                    class: classNames({
                        'is-invalid': hasError()
                    }, cx$4(`${themeName}-wrapper`))
                }, [
                    (theme.prefix) ? m('span', {
                        class: cx$4('prefix')
                    }, theme.prefix) : null,
                    m(TextField, Object.assign({}, vnode.attrs, {
                        class: cx$4(`${themeName}-form-control`),
                        hasError,
                        hasValue
                    })),
                    (theme.suffix) ? m('span', {
                        class: cx$4('suffix')
                    }, theme.suffix) : null,
                    (themeName === 'outline') ? [
                        m('fieldset', {
                            class: cx$4('outline-fieldset', {
                                'flying': hasValue() || flyLabel.fixed === true,
                            })
                        }, [
                            m('legend', {
                                class: cx$4({
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

const cx$5 = classNames.bind(styles$1);


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

var styles$2 = {"material":"SnYez","radio":"_3EGkm","success":"_3cv1Y","error":"_1B-KV","disabled":"lh15w","radio-wave-effect-on":"_369ki","radio-wave-effect-off":"_19Exk"};

const cx$6 = classNames.bind(styles$2);

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
            class: [cx$6('radio', _theme), classes].join(' '),
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
                    class: cx$6({
                        'radio-wave-effect-on': checked,
                        //'radio-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

var styles$3 = {"gi-waves-effect":"_IGQO","gi-waves-ripple":"_1sY7L","gi-waves-notransition":"_1-Uht"};

const cx$7 = classNames.bind(styles$3);

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
    ripple.classList.add(`${cx$7('gi-waves-ripple')}`, `${cx$7('waves-rippling')}`);
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

    ripple.classList.add(`${cx$7('gi-waves-notransition')}`);
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.classList.remove(`${cx$7('gi-waves-notransition')}`);

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
    const ripples = element.querySelectorAll(`.${cx$7('waves-rippling')}`);

    for (let i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
    }
}

function removeRipple(e, el, ripple) {

    // Check if the ripple still exist
    if (!ripple) {
        return;
    }

    ripple.classList.remove(`${cx$7('waves-rippling')}`);

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
        target.classList.add(`${cx$7('gi-waves-effect')}`);
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

class Component {
    constructor(){
        this.stream = stream;
    }
    checkAttrs(ops,allows) {
        if(!ops){
            return false
        }
        allows.forEach(key => {
            if(!ops.hasOwnProperty(key)){
                ops[key] = undefined;
            }
        });
        return ops
    }
    filterAttrs(ops,allows) {
        return Object.keys(ops)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: ops[key]
            };
        }, {});
    }
    handleComponent(cpo , tag = 'div',attrs = {}) {
        if (!cpo) {
            return
        }
        if (typeof cpo === 'string') {
            return m(tag,attrs,cpo)
        }
        if (typeof cpo === 'object') {
            return cpo
        }
        if (typeof cpo === 'function') {
            return m(cpo)
        }
    }
    checkError(attrs) {
        if (attrs.hasOwnProperty('error')) {
            this.hasError(attrs.error);
        }
    }
}

var styles$4 = {"select":"X-tV4","material":"SAooc","disabled":"_3dWwg","select-dropdown":"HLDoM","active":"_2f_Ad","select-btn":"_3e05s","select-btn-input":"_1ZnqD","select-btn-button":"vJFNo","select-line":"njqf5","select-panel":"ncUex","transition-3":"_1G0Is","input":"_1dFfh","select-option":"d8p8k"};

class NativeSelectComponent extends Component {
    constructor(vnode) {
        super();
        const {
            selected,
            options,
            events,
            hasError,
            hasValue,
            childrens
        } = vnode.attrs;

        this.hasError = hasError;
        this.hasValue = hasValue;
        //確認需要的屬性，防範Key為未定義
        this.options = this.checkAttrs(options,['textKey','valueKey','panelPrefix','panelSuffix']);
        const textKey = this.options.textKey || 'text';
        const valueKey = this.options.valueKey || 'value';
        this.childrens = [];
        if(childrens){
            childrens.forEach((el,i) => {
                this.childrens[i] = this.checkAttrs(el,[textKey,valueKey,'disabled','selected','style','class']);
            });
        }
        this.selected = (this.hasValue())
        ?Object.assign(this.checkAttrs(this.hasValue(),[textKey,valueKey]),this.checkAttrs(selected,[textKey,valueKey])) 
        :this.checkAttrs(selected,[textKey,valueKey]);
        this.events = this.checkAttrs(events,['onchange','onfocus','onblur','onclick']);
        
        //預設selected的值
        const defaultSelected = {
            [textKey]: this.childrens[0][textKey] || '請選擇',
            [valueKey]: this.childrens[0][valueKey] || null,
        };
        const selectedChildren = this.childrens.filter(item => item.selected)[0] || {
            [textKey]: undefined,
            [valueKey]: undefined
        };
        if(typeof this.selected ==='object'){
            this.selected[textKey] = selectedChildren[textKey] || this.selected[textKey] || '請選擇';
            this.selected[valueKey] = selectedChildren[valueKey] || this.selected[valueKey] || null;
        }else if(childrens){
            this.selected = selectedChildren || defaultSelected;
        }else{
            this.selected = defaultSelected;
        }
        
    }
    oncreate() {
        m.redraw();
    }
    view(vnode) {
        this.checkError(vnode.attrs);
        const {
            childrens,
            disabled,
            required,
            autofocus,
            size,
            title,
            error,
            success,
            validate
        } = vnode.attrs;
        const {
            panelPrefix,
            panelSuffix
        } = this.options;
        const textKey = this.options.textKey || 'text';
        const valueKey = this.options.valueKey || 'value';
        const { 
            onchange,
            onfocus,
            onblur,
            onclick,
        } = this.events;
        

        return m('select.custom-select.browser-default', {
                disabled,
                required,
                onfocus,
                onblur,
                onclick,
                autofocus,
                size,
                title,
                onchange: (e)=>{
                    this.value = e.target.value;
                    console.log('e.target.value',e.target.value);
                    //判斷this.value是否有符合childrens選項
                    this.childrens.forEach(item=>{
                            if (this.value == item[valueKey] || this.value == item[textKey]) {
                                this.selected.value = item[valueKey];
                                this.selected.text = item[textKey];
                            }
                        });

                    this.hasValue(this.selected);
                    console.log('hasValue',this.hasValue());
                    const error = validate(this.selected[valueKey]);
                    this.hasError(error);
                    const v = this.selected;
                    if(onchange){
                        onchange(e,v,{
                            ...vnode.attrs
                        });
                    }
                },
                value: this.selected[valueKey] || '請選擇',
                class: classNames('form-control',{
                    'is-invalid': error,
                    'is-valid': success
                })
            }, [
                m('option[disabled]','請選擇'),
                (panelPrefix)?
                this.handleComponent(panelPrefix,'option',{
                    disabled: true,
                }): null,
                this.childrens.map((item,index) => {
                    if(!item[valueKey]){
                        item[valueKey] = index;
                    }
                    
                    return m('option', {
                        style: item.style || null,
                        class: item.class || null,
                        value: item[valueKey],
                        disabled: item.disabled,
                        //判斷若沒有設定selected則帶入item.selected
                        selected: (item.selected) ? this.selected[valueKey] == item.selected[valueKey] : (item.selected) || null,
                    }, item[textKey])
                }),
                (panelSuffix)?
                this.handleComponent(panelSuffix,'option',{
                    disabled: true,
                }): null
            ]

        )
    }
}

const cx$8 = classNames.bind(styles$4);

/**
 * 每次在body進行onclick行為時，會針對全域class MaterialSelectComponent執行迴圈，
 * 該事件判斷是否進行開啟或關閉，並也同時監測onfocus防止重複操作。
 */
let selectActive = [];
document.body.addEventListener('click', (e) => {
    //全域關閉事件
    for (let i = 0; i < selectActive.length; i++) {
        if (!(selectActive[i].active) 
            && selectActive[i].btn == e.target
            && !(selectActive[i].disabled)
            && !(selectActive[i].readonly)
            ) {
            selectActive[i].active = true;
        } else {
            if(selectActive[i].focusEvent){
                selectActive[i].active = false;
                m.redraw();
            }else{
                selectActive[i].focusEvent = true;
            }
        }
    }
});
/**
 * 採用自定義Select Component
 * @param MaterialSelectComponent
 */
class MaterialSelectComponent extends Component  {
    constructor(vnode) {
        super();
        const {
            options,
            selected,
            childrens,
            events,
            hasError,
            hasValue,
        } = vnode.attrs;
        this.hasError = hasError;
        this.hasValue = hasValue;
        //確認需要的屬性，防範Key為未定義
        this.options = this.checkAttrs(options,['input','panelHeight','panelPrefix','panelSuffix','textKey','valueKey']);
        const textKey = this.options.textKey || 'text';
        const valueKey = this.options.valueKey || 'value';
        this.childrens = [];
        if(childrens){
            childrens.forEach((el,i) => {
                this.childrens[i] = this.checkAttrs(el,[textKey,valueKey,'disabled','selected','style','class']);
            });
        }
        this.selected = (this.hasValue())
        ?Object.assign(this.checkAttrs(this.hasValue(),[textKey,valueKey]),this.checkAttrs(selected,[textKey,valueKey])) 
        :this.checkAttrs(selected,[textKey,valueKey]);
        this.events = this.checkAttrs(events,['onchange','onfocus','onblur','oninput','onclick']);
        
        //預設selected的值
        const defaultSelected = {
            [textKey]: this.childrens[0][textKey] || '請選擇',
            [valueKey]: this.childrens[0][valueKey] || null,
        };
        const selectedChildren = this.childrens.filter(item => item.selected)[0] || {
            [textKey]: undefined,
            [valueKey]: undefined
        };
        if(typeof this.selected ==='object'){
            this.selected[textKey] = selectedChildren[textKey] || this.selected[textKey] || '請選擇';
            this.selected[valueKey] = selectedChildren[valueKey] || this.selected[valueKey] || null;
        }else if(childrens){
            this.selected = selectedChildren || defaultSelected;
        }else{
            this.selected = defaultSelected;
        }
        this.active = false;
        this.disabled = vnode.attrs.disabled || false;
        selectActive.push(this);
        
    }
    oncreate(vnode) {
        //當建立Select時，在this.btn和this.input紀錄這個Select的input實體
        this.btn = vnode.dom.querySelectorAll(`.${cx$8('select-btn-button')}`)[0];
        this.input = vnode.dom.querySelectorAll(`.${cx$8('select-btn-input')}`)[0];
        this.btn.uuid = uuid$1();
        /** 控制鍵盤能用上下鍵來進行操作
         * 38:ArrowUp
         * 40:ArrowDown
        */   
        window.addEventListener('keydown',(e)=>{
            const activeElement = document.activeElement;
            if(this.active){ 
                if(e.keyCode == 38 || e.keyCode == 40){
                    if(activeElement==this.input || activeElement==this.btn) {
                        this.panel.children[0].focus();
                    }else if(e.keyCode == 38){
                        activeElement.previousElementSibling.focus();
                    }else if(e.keyCode == 40){
                        activeElement.nextElementSibling.focus();
                    }
                }
            }
        });
    }
    onbeforeremove(){   
        //當移除Select時，移除全域監聽事件
        const indexOf = selectActive.map((el)=> el.btn.uuid).indexOf(this.btn.uuid);
        if(indexOf !== -1){
            selectActive.splice(indexOf,1);
        }
    }
    view(vnode) {
        this.checkError(vnode.attrs);
        const {
            disabled,
            readonly,
            validate,
            title
        } = vnode.attrs;
        const { 
            onchange,
            oninput,
            onfocus,
            onblur,
            onclick,
        } = this.events;
        const { 
            input,
            panelHeight,
            panelPrefix,
            panelSuffix,
        } = this.options;
        const textKey = this.options.textKey || 'text';
        const valueKey = this.options.valueKey || 'value';
        //判斷panel要避開window邊界的變數
        const maxPanelHeight = panelHeight || 320;
        const _panelHeight = this.panel && this.panel.offsetHeight;
        const btnOffsetHeight = this.btn && this.btn.offsetHeight || 0;
        const panelBottom = window.innerHeight - this.clientY < _panelHeight + btnOffsetHeight;
        const panelTop = this.clientY < _panelHeight + btnOffsetHeight;

        return m('div', {
            class: cx$8('select-dropdown', {
                'active': this.active,
                'disabled': disabled,
            })
        }, [
            m('div', {
                class: cx$8('select-btn'),
            }, [
                m('button[type="text"]',{
                    class: cx$8('select-btn-button'),
                    style: {display: (this.active && input)?'none':null},
                    onclick: (e) => {
                        e.preventDefault();
                        if (readonly || disabled) {
                            return
                        }
                        setTimeout(() => {
                            this.input.focus();
                        }, 0);
                        if(this.focus){
                            this.active = false;
                        }
                        // this.clientY 紀錄滑鼠點擊的位置，判斷panel要往上或往下來打開
                        this.clientY = e.clientY;
                        // v 將value傳遞給自定義onclick事件
                        const v =  this.selected;
                        if(onclick){
                            onclick(e,v,{
                                ...vnode.attrs
                            });
                        }
                    },
                },this.value
                    || (document.activeElement!==this.input && this.selected[textKey]) 
                    || !(input) && this.selected[textKey]
                    || '',),
                m('input[type="text"]',{
                    class: cx$8('select-btn-input'),
                    style: {display: (this.active && input)?null:'none'},
                    readonly: !(input),
                    title: title,
                    oninput: (e) => {
                        this.value = e.target.value;
                        if(oninput){
                            oninput(e,this.value,{
                                ...vnode.attrs
                            });
                        }
                    },
                    onchange: (e) => {
                        //如果oninput合乎value或text則直接選取對象
                        const v = this.value;
                        let _find = false;
                        let _findIndex = 0;
                        this.childrens.forEach((item,index) => {
                                if(item[valueKey] == v){
                                    _find = true;
                                    _findIndex = index;
                                }
                                if(item[textKey] == v){
                                    _find = true;
                                    _findIndex = index;
                                }
                                if (_find) {
                                    return
                                }
                            });
                        
                        if(_findIndex === 0 && /^[0-9] .?[0-9]*/.test(item.value)){
                            if(this.panel.querySelectorAll('button')[this.value]){
                                this.panel.querySelectorAll('button')[this.value].focus();
                            }
                        }else{
                            this.panel.querySelectorAll('button')[_findIndex].focus();
                        }
                        
                        this.value = false;
                    },
                    onfocus: (e) => {
                        if (readonly || disabled || vnode.attrs.focusEvent) {
                            return
                        }
                        if(onfocus){
                            onfocus(e,{
                                ...vnode.attrs
                            });
                        }
                    },
                    onblur: (e) => {
                        //判斷離開Select時，則onblur
                        if (readonly || disabled || vnode.attrs.focusEvent) {
                            return
                        }
                        if(this.panel && !this.panel.contains(e.relatedTarget)){
                            this.active = false;
                            this.value = null;
                            if(onblur){
                                onblur(e,{
                                    ...vnode.attrs
                                });
                            }
                        }
                    }, 
                    onclick: (e) => {}
                }),
                m('div', {
                    class: cx$8('select-line')
                }),
            ]),
            
            (this.active)? m('div',{
                class: cx$8('select-panel'),
                style: {
                    //判斷panel要避開window邊界
                    maxHeight: `${maxPanelHeight}px`,
                    bottom: (panelBottom && !panelTop)?'100%':null,
                    top: (panelTop)?'100%':null
                },
                oncreate: (vd)=>{
                    //執行打開panel的動畫
                    this.panel = vd.dom;//.querySelectorAll(`.${cx('select-panel')}`)[0]
                    const clientHeight = this.panel.clientHeight;
                    this.panel.style.height = 0;
                    this.panel.classList.add(cx$8('transition-3'));
                    window.requestAnimationFrame(()=>{
                        this.panel.style.height = `${clientHeight}px`;
                    });
                },
                onbeforeremove: ()=> {
                    //執行關閉panel的動畫
                    this.panel.style.height = 0;
                    return new Promise((resolve)=> {
                        this.panel.addEventListener('transitionend',resolve);
                    })
                },
            },[
                (panelPrefix)?
                this.handleComponent(panelPrefix,'div',{
                    class: cx$8('select-option')
                }): null,
                this.childrens.map((item, index) => {
                    if(!item[valueKey]){
                        item[valueKey] = index;
                    }
                    return m('button', {
                        style: item.style || null,
                        class: cx$8('select-option',item.class, {
                            'active': item.disabled || (this.selected[valueKey] === item[valueKey]),
                            'input': (this.value === item[valueKey]) || (this.value === item[textKey]) || (this.value === index) ,
                            'disabled': item.disabled
                        }),
                        onblur: (e) => {
                            //判斷離開Select時，則onblur
                            if(!this.panel.contains(e.relatedTarget)){
                                this.active = false;
                                this.value = null;
                                setTimeout(() => {
                                    this.btn.focus();
                                }, 0);
                                if(onblur){
                                    onblur(e,{
                                        ...vnode.attrs
                                    });
                                }
                            }
                        },
                        onclick: (e) => {
                            e.preventDefault();
                            if (item.disabled) {
                                return false
                            }
                            //將資料傳遞至selected物件中
                            this.selected[textKey] = item[textKey];
                            this.selected[valueKey] = item[valueKey];
                            this.selected.data = item.data;
                            this.hasValue(this.selected);
                            const error = validate(this.selected[valueKey]);
                            const v = this.hasValue() || this.selected || null;
                            this.hasError(error);
                            if(onchange){
                                onchange(e,v,{
                                    ...attrs,
                                    children: item
                                });
                            }
                            this.active = false;
                        },
                    }, [
                        m('span', item[textKey])
                    ])
                }),
                (panelSuffix)?
                    this.handleComponent(panelSuffix,'div',{
                        class: cx$8('select-option')
                }): null
            ]):null
        ])
    }
}

const cx$9 = classNames.bind(styles$4);


/**
 * @param Select
 * 如果要傳遞model，將selected之物件傳進value。
 * 可使用options.textKey、options.valueKey參數來修改model的參數KeyName
 */
class Select extends Component  {
    constructor(vnode) {
        super();
        const {
            childrens,
            selected
        } = vnode.attrs;
        this.hasError = stream(vnode.attrs.error);
        this.hasValue = stream(vnode.attrs.value);

        //判斷childrens是否有正確填寫
        if (childrens){
            if(!Array.isArray(childrens)){
                throw new Error('childrens必須是個陣列')
            }
        }
        //判斷selected是否有正確填寫
        if(selected){
            if (typeof selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('selected應該是一個object')
            }
        }
        //判斷value是否有正確填寫
        if(this.hasValue()){
            if (typeof selected !== 'object' && typeof this.hasValue() !== 'object') {
                throw new Error('value應該是一個object')
            }
        }
    }
    view(vnode) {
        const {
            theme,
            error,
            success,
            disabled,
            options,
            validate
        } = vnode.attrs;
        let {
            hasError,
            showError
        } = vnode.attrs;
        const _theme = theme || 'native';
        
        showError = (showError === false) ? false : true;
        this.hasError(vnode.attrs.error);
        this.hasValue(vnode.attrs.value);
        vnode.attrs.hasError = this.hasError;
        vnode.attrs.hasValue = this.hasValue;
        if(!validate){
            vnode.attrs.validate = () => {
                if (options && options.validateText) {
                    this.error =  options.validateText || '選擇的內容有誤';
                    return options.validateText || '選擇的內容有誤'
                }
                return this.error = ''
            };
        }
        
        return m('div', {
            class: classNames(vnode.attrs.class,{
                'success': success,
                'error': error,
                'disabled': disabled
            },cx$9('select', _theme))
        }, [
            /**
             * theme: 'native'
             * size
             * autofocus
             */
            (_theme === 'native') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx$9('select-label')
                }): null,
                m(NativeSelectComponent, {
                    ...vnode.attrs
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null,
            /**
             * theme: 'group'
             * options : {
             *      groupPrepend
             *      groupAppend
             * }
             */
            (_theme === 'group') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx$9('select-label')
                }): null,
                m('.input-group',[
                    (options && options.groupPrepend)?
                    m('.input-group-prepend',[
                        this.handleComponent(options.groupPrepend,'div',{
                            class: 'input-group-text'
                        })
                    ]): null,
                    m(NativeSelectComponent, {
                        ...vnode.attrs
                    }),
                    (options && options.groupAppend)?
                    m('.input-group-append',[
                        this.handleComponent(options.groupAppend,'div',{
                            class: 'input-group-text'
                        })
                    ]): null,
                ]),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null,
            /** 
             * theme: 'material'
             * oninput
             * options: {
             *      panelHeight
             *      input
             * }
            */
            (_theme === 'material') ? [
                (options && options.label)?
                    this.handleComponent(options.label,'div',{
                        class: cx$9('select-label')
                }): null,
                m(MaterialSelectComponent, {
                    ...vnode.attrs
                }),
                (hasError) ? m('small.invalid-feedback', hasError) : null
            ] : null
        ])
    }
}
/** 
 * 可使用的屬性
 * theme
 * options: {
 *      label
 *      validateText
 *      title
 * }
 * selected: {
 *      text
 *      value
 *      data
 * }
 * childrens: {
 *      panelPrefix
 *      panelSuffix
 *      text
 *      value
 *      disabled
 *      selected
 *      style
 *      class
 *      data
 * }
 * value
 * class
 * onchange
 * oninput
 * onclick
 * onfocus
 * onblur
 * disabled
 * error
 * success
 * validate
*/

var styles$5 = {"material":"_23gbE","switch":"_2TzXj","success":"_2t65r","error":"_1rObM","disabled":"U7Jgc","switch-wave-effect-on":"_13JKH","switch-wave-effect-off":"_37OuF"};

const cx$a = classNames.bind(styles$5);

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
            class: [cx$a('switch', _theme), classes].join(' '),
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
                    class: cx$a({
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

const cx$b = classNames.bind(styles$6);



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
            class: [cx$b('checkbox', _theme), classes].join(' '),
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
                    class: cx$b({
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

const cx$c = classNames.bind(style);

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
            const calendar = vnode.dom.querySelector(`.${cx$c('calendar')}`);
            calendar.classList.add(`${cx$c('show')}`);
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
            const picker = dom.querySelector(`.${cx$c('year-month-picker')}`);
            picker.classList.remove(`${cx$c('show')}`);
            picker.classList.add(`${cx$c('hide')}`);
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
            class: cx$c('calendar-popup')
        }, [
            m('div', {
                class: cx$c('calendar')
            }, [
                m('div', {
                    class: cx$c('calendar-header')
                }, [
                    m('div', {
                        //使用flex
                        class: cx$c('calendar-controls')
                    }, [
                        m('div', {
                            class: cx$c('mat-button-wrapper')
                        }, [
                            m('button[type="button"]', {
                                class: cx$c('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'year');
                                }
                            }, [
                                m('span', {
                                    class: cx$c('header-year')
                                }, `${this.months[0].get('year')}年`)
                            ]),
                            m('button[type="button"]', {
                                class: cx$c('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'month');
                                }
                            }, [
                                m('span', {
                                    class: cx$c('header-month')
                                }, `${this.months[0].get('month') + 1}月`)
                            ])
                        ]),
                        m('div', {
                            class: cx$c('mat-button-wrapper'),
                            style: {
                                visibility: this.toggle() ? 'hidden' : 'visible'
                            }
                        }, [
                            m('button[type="button"]', {
                                class: cx$c('mat-icon-button', 'calendar-previous-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'prev');
                                }
                            }),
                            m('button[type="button"]', {
                                class: cx$c('mat-icon-button', 'calendar-next-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'next');
                                }
                            })
                        ])
                    ])
                ]),
                m('div', {
                    class: cx$c('calendar-body', 'perspective')
                }, [
                    m('div', {
                        class: cx$c('calendar-weekly')
                    }, [
                        ['日', '一', '二', '三', '四', '五', '六'].map(item => {
                            return m('div', {
                                class: cx$c('cell')
                            }, item)
                        }),
                    ]),
                    m('hr', {
                        class: cx$c('calendar-divider')
                    }),
                    m('div', {
                        class: cx$c('perspective')
                    }, [
                        this.months.map(month => {
                            return m(DateComponent, {
                                cx: cx$c,
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
                            cx: cx$c,
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
                            cx: cx$c,
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
        this.type = vnode.attrs.type || 'button';
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
            type: this.type,
            class: classNames$1('btn', vnode.attrs.class),
            accept: this.type === 'file' ? vnode.attrs.accept : undefined,
            multiple: this.type === 'file' ? (vnode.attrs.multiple ? true : undefined) : undefined,
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

        return m('button', attrs, vnode.children)
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
            class: classNames(vnode.attrs.class, cx$d('icon-wave-button')),
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

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bundle = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var m$1 = _interopDefault(m);
var classNames$1 = _interopDefault(classNames);

var styles = {};

const cx = classNames$1.bind(styles);

class ICON {
    constructor(vnode){
        this.theme = vnode.attrs.theme;
        this.color = vnode.attrs.color;
    }
    view(vnode) {
        const config = this.config();
        let attrs = {
            ...config,
            ...vnode.attrs
        };
        if (attrs.hasOwnProperty('class') && typeof attrs.class === 'string') {
            attrs.class = cx(attrs.class);
        }
        return m$1('svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]', attrs, [
            m$1.trust(this.path())
        ])
    }

}

class Accessibility extends ICON {
    config() {
        return {
            viewBox: `0 0 60 60`
        }
    }
    path() {
        return `
        <path d="M30,0 C13.4314575,-1.01453063e-15 2.02906125e-15,13.4314575 0,30 C-2.02906125e-15,46.5685425 13.4314575,60 30,60 C46.5685425,60 60,46.5685425 60,30 C59.981263,13.4392249 46.5607751,0.0187370435 30,0 Z M30,58 C14.536027,58 2,45.463973 2,30 C2,14.536027 14.536027,2 30,2 C45.463973,2 58,14.536027 58,30 C57.9823655,45.4566626 45.4566626,57.9823655 30,58 Z"/>
        <path d="M30,4 C15.6405965,4 4,15.6405965 4,30 C4,44.3594035 15.6405965,56 30,56 C44.3594035,56 56,44.3594035 56,30 C55.983468,15.6474499 44.3525501,4.01653204 30,4 Z M30,54 C16.745166,54 6,43.254834 6,30 C6,16.745166 16.745166,6 30,6 C43.254834,6 54,16.745166 54,30 C53.9845705,43.2484376 43.2484376,53.9845705 30,54 Z"/>
        <path d="M30,21 C33.3137085,21 36,18.3137085 36,15 C36,11.6862915 33.3137085,9 30,9 C26.6862915,9 24,11.6862915 24,15 C24.0033074,18.3123376 26.6876624,20.9966926 30,21 Z M30,11 C32.209139,11 34,12.790861 34,15 C34,17.209139 32.209139,19 30,19 C27.790861,19 26,17.209139 26,15 C26,12.790861 27.790861,11 30,11 Z"/>
        <path d="M43.927,22.008 L43.911,22.008 L33.411,22.951 C33.053,22.9836667 32.6946667,23 32.336,23 L27.664,23 C27.306,23 26.9483333,22.984 26.591,22.952 L16.073,22.008 C14.4211163,21.8782131 12.9767869,23.1121163 12.847,24.764 C12.7172131,26.4158837 13.9511163,27.8602131 15.603,27.99 L24.09,28.76 C24.6049502,28.8065341 24.999513,29.2379517 25,29.755 L25,32.055 C25.0003524,32.5549913 24.9067272,33.0505945 24.724,33.516 L19.912,45.771 C19.2412502,47.2864694 19.9260306,49.0587502 21.4415,49.7295 C22.9569694,50.4002498 24.7292502,49.7154694 25.4,48.2 L29.986,36.987 L34.615,48.23 C35.3052861,49.7074001 37.0492941,50.3628403 38.5417645,49.7057727 C40.034235,49.0487051 40.7285204,47.319794 40.105,45.813 L35.276,33.513 C35.0937471,33.0481548 35.0001344,32.5532967 35,32.054 L35,29.754 C35.000487,29.2369517 35.3950498,28.8055341 35.91,28.759 L44.383,27.99 C46.0351598,27.864079 47.2724208,26.4226598 47.1464999,24.7705 C47.020579,23.1183402 45.5791598,21.8810791 43.927,22.007 L43.927,22.008 Z M44.216,26 L35.729,26.77 C34.181153,26.903227 32.994277,28.2014405 33,29.755 L33,32.055 C32.9996019,32.8055551 33.1403827,33.5494884 33.415,34.248 L38.261,46.587 C38.4965494,47.0865416 38.2825416,47.6824506 37.783,47.918 C37.2834584,48.1535494 36.6875494,47.9395416 36.452,47.44 L31.833,36.227 C31.5266513,35.4847868 30.8029508,35.0005712 30,35.0005712 C29.1970492,35.0005712 28.4733487,35.4847868 28.167,36.227 L23.561,47.41 C23.4177952,47.7503309 23.0987074,47.9840573 22.7310323,48.017937 C22.3633573,48.0518168 22.0069313,47.8803363 21.8039457,47.5719054 C21.6009602,47.2634745 21.5844493,46.8682879 21.761,46.544 L26.59,34.244 C26.8627455,33.5461569 27.001829,32.8032475 27,32.054 L27,29.754 C27.0067669,28.1996736 25.8196157,26.9002889 24.271,26.767 L15.77,26 C15.2177153,25.9610639 14.8015639,25.4817847 14.8405,24.9295 C14.8794361,24.3772153 15.3587153,23.9610639 15.911,24 L26.411,24.943 C26.827,24.9803333 27.244,24.999 27.662,24.999 L32.334,24.999 C32.752,24.999 33.169,24.9803333 33.585,24.943 L44.08,24 C44.344286,23.9790735 44.6059809,24.0645905 44.8069115,24.237541 C45.007842,24.4104915 45.1313571,24.6565431 45.15,24.921 C45.1717311,25.1885073 45.0850194,25.4535218 44.9093653,25.6564455 C44.7337112,25.8593693 44.4838602,25.9831676 44.216,26 Z"/>
        `
    }
}

class AccessibilityFill extends ICON {
    config() {
        return {
            viewBox: `0 0 56 56`
        }
    }
    path() {
        return `<path d="M28,56 C43.463973,56 56,43.463973 56,28 C56,12.536027 43.463973,-6.21724894e-15 28,-7.10542736e-15 C12.536027,-7.99360578e-15 1.77635684e-15,12.536027 0,28 C0.0176345439,43.4566626 12.5433374,55.9823655 28,56 Z M28,2 C42.3594035,2 54,13.6405965 54,28 C54,42.3594035 42.3594035,54 28,54 C13.6405965,54 2,42.3594035 2,28 C2.01653204,13.6474499 13.6474499,2.01653204 28,2 Z"/>
        <path d="M28,52 C41.254834,52 52,41.254834 52,28 C52,14.745166 41.254834,4 28,4 C14.745166,4 4,14.745166 4,28 C4.01542952,41.2484376 14.7515624,51.9845705 28,52 Z M28,7 C31.3137085,7 34,9.6862915 34,13 C34,16.3137085 31.3137085,19 28,19 C24.6862915,19 22,16.3137085 22,13 C22.0033074,9.68766243 24.6876624,7.00330738 28,7 Z M14.073,20.008 L24.591,20.952 C24.9476667,20.984 25.3053333,21 25.664,21 L30.336,21 C30.694,21 31.0516667,20.984 31.409,20.952 L41.909,20.009 L41.925,20.009 C43.5771598,19.8830791 45.018579,21.1203402 45.1445,22.7725 C45.2704209,24.4246598 44.0331598,25.8660791 42.381,25.992 L33.908,26.761 C33.3930498,26.8075341 32.998487,27.2389517 32.998,27.756 L32.998,30.056 C32.9977596,30.5563054 33.0913788,31.0522156 33.274,31.518 L38.103,43.818 C38.7265204,45.324794 38.032235,47.0537051 36.5397645,47.7107727 C35.0472941,48.3678403 33.3032861,47.7124001 32.613,46.235 L27.983,34.988 L23.4,46.2 C22.9775349,47.1978975 22.0497522,47.8904043 20.9729111,48.0116048 C19.89607,48.1328052 18.8375637,47.6638589 18.2038478,46.7848365 C17.5701319,45.9058141 17.4597165,44.7533581 17.915,43.77 L22.727,31.514 C22.9085788,31.0487099 23.001183,30.553464 23,30.054 L23,27.754 C22.999513,27.2369517 22.6049502,26.8055341 22.09,26.759 L13.6,25.99 C11.9481163,25.8602131 10.7142131,24.4158837 10.8440001,22.764 C10.973787,21.1121163 12.4181163,19.8782131 14.07,20.008 L14.073,20.008 Z"/>
        `
    }
}

class AccountCircle extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        `
    }
}

class Apartment extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2
		V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z"/>`
    }
}

class Alert extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
        C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
        c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"/>
        <path d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877
            C276,137.831,267.046,128.877,256,128.877z"/>
            <circle cx="256" cy="349.16" r="27"/>`
    }
}

class AddFile extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="m192 256h40v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h40c13.255 0 24-10.745 24-24s-10.745-24-24-24h-40v-40c0-13.255-10.745-24-24-24s-24 10.745-24 24v40h-40c-13.255 0-24 10.745-24 24s10.745 24 24 24z"/><path d="m366.828 12.887c-8.31-8.311-19.359-12.887-31.112-12.887h-251.716c-24.262 0-44 19.738-44 44v424c0 24.262 19.738 44 44 44h344c24.262 0 44-19.738 44-44v-331.716c0-11.753-4.576-22.802-12.887-31.112zm39.231 107.113h-54.059v-54.059zm-102.059-72v76c0 24.262 19.738 44 44 44h76v208h-336v-328zm-216 416v-40h336v40z"/>`
    }
}

class AddPost extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="M17,19.22H5V7h7V5H5C3.9,5,3,5.9,3,7v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-7h-2V19.22z"/>
		<path d="M19,2h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V7h3V5h-3V2z"/>
		<rect x="7" y="9" width="8" height="2"/>
		<polygon points="7,12 7,14 15,14 15,12 12,12"/>
        <rect x="7" y="15" width="8" height="2"/>
        <rect fill="none" width="24" height="24"/>`
    }
}

class BooksStack extends ICON {
    config() {
        return {
            viewBox: `0 0 335.08 335.079`
        }
    }
    path() {
        return `<path d="M311.175,115.775c-1.355-10.186-1.546-27.73,7.915-33.621c0.169-0.108,0.295-0.264,0.443-0.398
        c7.735-2.474,13.088-5.946,8.886-10.618l-114.102-34.38L29.56,62.445c0,0-21.157,3.024-19.267,35.894
        c1.026,17.89,6.637,26.676,11.544,31l-15.161,4.569c-4.208,4.672,1.144,8.145,8.88,10.615c0.147,0.138,0.271,0.293,0.443,0.401
        c9.455,5.896,9.273,23.438,7.913,33.626c-33.967,9.645-21.774,12.788-21.774,12.788l7.451,1.803
        c-5.241,4.736-10.446,13.717-9.471,30.75c1.891,32.864,19.269,35.132,19.269,35.132l120.904,39.298l182.49-44.202
        c0,0,12.197-3.148-21.779-12.794c-1.366-10.172-1.556-27.712,7.921-33.623c0.174-0.105,0.301-0.264,0.442-0.396
        c7.736-2.474,13.084-5.943,8.881-10.615l-7.932-2.395c5.29-3.19,13.236-11.527,14.481-33.183
        c0.859-14.896-3.027-23.62-7.525-28.756l15.678-3.794C332.949,128.569,345.146,125.421,311.175,115.775z M158.533,115.354
        l30.688-6.307l103.708-21.312l15.451-3.178c-4.937,9.036-4.73,21.402-3.913,29.35c0.179,1.798,0.385,3.44,0.585,4.688
        L288.14,122.8l-130.897,32.563L158.533,115.354z M26.71,147.337l15.449,3.178l99.597,20.474l8.701,1.782l0,0l0,0l26.093,5.363
        l1.287,40.01L43.303,184.673l-13.263-3.296c0.195-1.25,0.401-2.89,0.588-4.693C31.44,168.742,31.651,156.373,26.71,147.337z
         M20.708,96.757c-0.187-8.743,1.371-15.066,4.52-18.28c2.004-2.052,4.369-2.479,5.991-2.479c0.857,0,1.474,0.119,1.516,0.119
        l79.607,25.953l39.717,12.949l-1.303,40.289L39.334,124.07l-5.88-1.647c-0.216-0.061-0.509-0.103-0.735-0.113
        C32.26,122.277,21.244,121.263,20.708,96.757z M140.579,280.866L23.28,247.98c-0.217-0.063-0.507-0.105-0.733-0.116
        c-0.467-0.031-11.488-1.044-12.021-25.544c-0.19-8.754,1.376-15.071,4.519-18.288c2.009-2.052,4.375-2.479,5.994-2.479
        c0.859,0,1.474,0.115,1.519,0.115c0,0,0.005,0,0,0l119.316,38.908L140.579,280.866z M294.284,239.459
        c0.185,1.804,0.391,3.443,0.591,4.693l-147.812,36.771l1.292-40.01l31.601-6.497l4.667,1.129l17.492-5.685l80.631-16.569
        l15.457-3.18C293.261,219.146,293.466,231.517,294.284,239.459z M302.426,185.084c-0.269,0.006-0.538,0.042-0.791,0.122
        l-11.148,3.121l-106.148,29.764l-1.298-40.289l34.826-11.359l84.327-27.501c0.011-0.005,4.436-0.988,7.684,2.315
        c3.144,3.214,4.704,9.537,4.52,18.28C313.848,184.035,302.827,185.053,302.426,185.084z"/>`
    }
}

class BackArrow extends ICON {
    config() {
        return {
            viewBox: `0 0 459 459`
        }
    }
    path() {
        return `
        <path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z"/>
        `
    }
}

class BackArrowMirro extends ICON {
    config() {
        return {
            viewBox: `0 0 459 459`
        }
    }
    path() {
        return `
        <path d="M0,420.8c63.8-89.3,153-130,280.5-130v104.5L459,216.8L280.5,38.3v102C102,165.8,25.5,293.3,0,420.8z"/>
        `
    }
}

class BlockQuote extends ICON {
    config() {
        return {
            viewBox: `0 0 409.294 409.294`
        }
    }
    path() {
        return `<path d="m0 204.647v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941v-58.471c-96.728 0-175.412 78.684-175.412 175.412z"/>
        <path d="m409.294 87.706v-58.471c-96.728 0-175.412 78.684-175.412 175.412v175.412h175.412v-175.412h-116.941c0-64.48 52.461-116.941 116.941-116.941z"/>`
    }
}
//transform: 'matrix(0.75,0,0,0.75,50,50)'

class BlockHR extends ICON {
    config() {
        return {
            viewBox: `0 0 50 50`
        }
    }
    path() {
        return `
        <rect x="0" y="22.5" height="4" width="50"/>
        <polygon points="17,0 33,0 33,4 27,4 27,20 23,20 23,4 17,4"/>
        <polygon points="17,30 33,30 33,34 27,34 27,50 23,50 23,34 17,34"/>`
    }
}

class CapitolBuilding extends ICON {
    config() {
        return {
            viewBox: `0 0 53.251 53.251`
        }
    }
    path() {
        return `
        <path d="M12.61,21.022h28.03c0.644,0,1.168-0.523,1.168-1.168c0-0.642-0.524-1.167-1.168-1.167h-0.06
        c-0.528-6.41-5.371-11.588-11.619-12.637v-1.67h-2.044V0.292C26.917,0.133,26.786,0,26.625,0s-0.292,0.133-0.292,0.292v4.087
        H24.29v1.67c-6.248,1.049-11.09,6.227-11.621,12.637H12.61c-0.644,0-1.167,0.525-1.167,1.167
        C11.443,20.499,11.966,21.022,12.61,21.022z"/>
        <path d="M46.48,50.332h-1.46V36.9h1.46c0.808,0,1.46-0.65,1.46-1.46c0-0.803-0.652-1.46-1.46-1.46H6.771
        c-0.806,0-1.46,0.657-1.46,1.46c0,0.81,0.654,1.46,1.46,1.46h1.46v13.432h-1.46c-0.806,0-1.46,0.656-1.46,1.459
        c0,0.811,0.654,1.46,1.46,1.46H46.48c0.808,0,1.46-0.649,1.46-1.46C47.94,50.99,47.288,50.332,46.48,50.332z M40.932,50.332H38.48
        V36.9h2.452V50.332z M25.399,36.9h2.452v13.432h-2.452V36.9z M21.312,50.332h-2.453V36.9h2.453V50.332z M31.94,36.9h2.452v13.432
        H31.94V36.9z M12.318,36.9h2.452v13.432h-2.452V36.9z"/>
        <path d="M10.859,25.986h1.471c0,0.022-0.012,0.042-0.012,0.058v6.302h2.92v-6.302c0-0.021-0.011-0.042-0.011-0.058h1.387
        c0,0.022-0.011,0.042-0.011,0.058v6.302h2.919v-6.302c0-0.021-0.011-0.042-0.011-0.058h1.387c0,0.022-0.011,0.042-0.011,0.058
        v6.302h2.92v-6.302c0-0.021-0.012-0.042-0.012-0.058h1.387c0,0.022-0.012,0.042-0.012,0.058v6.302h2.92v-6.302
        c0-0.021-0.012-0.042-0.012-0.058h1.387c0,0.022-0.012,0.042-0.012,0.058v6.302h2.92v-6.302c0-0.021-0.011-0.042-0.011-0.058
        h1.387c0,0.022-0.012,0.042-0.012,0.058v6.302h2.92v-6.302c0-0.021-0.012-0.042-0.012-0.058h1.387
        c0,0.022-0.011,0.042-0.011,0.058v6.302h2.92v-6.302c0-0.021-0.012-0.042-0.012-0.058h1.471c0.808,0,1.46-0.651,1.46-1.46
        c0-0.807-0.652-1.46-1.46-1.46H10.868c-0.805,0-1.46,0.653-1.46,1.46C9.408,25.331,10.052,25.986,10.859,25.986z"/>
        `
    }
}

class Close extends ICON {
    config() {
        return {
            viewBox: `0 0 52 52`
        }
    }
    path() {
        return `<g>
        <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
            S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
        <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
            s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
            s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
            c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"/>
    </g>`
    }
}

class CheckMark extends ICON {
    config() {
        return {
            viewBox: `0 0 45.701 45.7`
        }
    }
    path() {
        return `
        <path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504
	c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0
	c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>
        `
    }
}

class ChechSelect extends ICON {
    config() {
        return {
            viewBox: `0 0 148.961 148.961`
        }
    }
    path() {
        return `<path d="M146.764,17.379c-2.93-2.93-7.679-2.929-10.606,0.001L68.852,84.697L37.847,53.691c-2.93-2.929-7.679-2.93-10.606-0.001
		c-2.93,2.929-2.93,7.678-0.001,10.606l36.309,36.311c1.407,1.407,3.314,2.197,5.304,2.197c1.989,0,3.897-0.79,5.304-2.197
		l72.609-72.622C149.693,25.057,149.693,20.308,146.764,17.379z"/>
	<path d="M130.57,65.445c-4.142,0-7.5,3.357-7.5,7.5v55.57H15V20.445h85.57c4.143,0,7.5-3.357,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5
		H7.5c-4.142,0-7.5,3.357-7.5,7.5v123.07c0,4.143,3.358,7.5,7.5,7.5h123.07c4.143,0,7.5-3.357,7.5-7.5v-63.07
		C138.07,68.803,134.713,65.445,130.57,65.445z"/>`
    }
}

class Chat extends ICON {
    config() {
        return {
            viewBox: `0 0 36.427 36.427`
        }
    }
    path() {
        return `
        <path d="M5.036,5.036H29.32V23.249H6.811L5.036,25.025V5.036M5.036,2a3.032,3.032,0,0,0-3.02,3.036L2,32.356l6.071-6.071H29.32a3.045,3.045,0,0,0,3.036-3.036V5.036A3.045,3.045,0,0,0,29.32,2ZM8.071,17.178H20.214v3.036H8.071Zm0-4.553H26.285V15.66H8.071Zm0-4.553H26.285v3.036H8.071Z" transform="translate(1.036 1.036)"/>`
    }
}

class ChevronLeft extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>`
    }
}

class ChevronRight extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>`
    }
}

class colorText extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <path d="M14.1,10.8h-3.8l-0.7,2l3.1,0c0,0,1.3-2,2.9-3.6l-2.3-6.4h-2l-5,14h2l4-11.2L14.1,10.8z"/>
        <path d="M16.3,11.2c0,0-3.6,3.8-3.6,6.3s2.1,3.7,3.6,3.7s3.6-0.9,3.7-3.6C20,17.6,20.3,15.7,16.3,11.2z"/>
        `
    
    }
}

class CodeInterfaceSymbol extends ICON {
    config() {
        return {
            viewBox: `0 0 543.232 543.232`
        }
    }
    path() {
        return `<g>
        <path d="M85.972,416.447c5.838,9.139,15.716,14.133,25.814,14.133c5.637,0,11.347-1.555,16.444-4.816
        c14.241-9.102,18.409-28.023,9.309-42.26L66.915,272.953l70.631-110.54c9.1-14.241,4.933-33.158-9.309-42.258
        c-14.248-9.095-33.158-4.933-42.259,9.309L4.815,256.478c-6.42,10.043-6.42,22.907,0,32.95L85.972,416.447z"/>
        <path d="M415.002,425.756c5.104,3.264,10.808,4.816,16.444,4.816c10.092,0,19.976-4.986,25.813-14.131l81.158-127.014
        c6.42-10.043,6.42-22.907,0-32.95l-81.151-127.014c-9.095-14.248-28.03-18.416-42.259-9.309
        c-14.241,9.1-18.409,28.023-9.309,42.258l70.631,110.54l-70.637,110.545C396.593,397.732,400.761,416.656,415.002,425.756z"/>
        <path d="M165.667,492.6c4.272,2.043,8.776,3.018,13.213,3.018c11.401,0,22.35-6.402,27.613-17.375L391.979,91.452
        c7.307-15.239,0.881-33.519-14.357-40.82c-15.245-7.307-33.52-0.881-40.821,14.357L151.309,451.779
        C144.002,467.018,150.428,485.299,165.667,492.6z"/>
    </g>`
    }
}

class DropFill extends ICON {
    config() {
        return {
            viewBox: `0 0 248.151 248.151`
        }
    }
    path() {
        return `
        <path d="M134.475,8.551c-6.8-11.6-14-11.2-20.8,0c-31.2,46.4-78.4,116-78.4,150.8c0,24.4,10,46.8,26,62.8s38.4,26,62.8,26
        c24.4,0,46.8-10,62.8-26s26-38.4,26-62.8C212.875,124.151,165.675,54.951,134.475,8.551z M188.075,198.951
        c-6.4,10.4-15.6,19.6-26.8,26c-5.2,2.8-11.6,1.2-14.4-4c-3.2-5.6-1.2-12,4-14.8c8-4.4,14.4-10.8,19.2-18.4
        c4.8-7.6,7.6-16.4,8-25.6c0.4-6,5.2-10.4,11.2-10c6,0.4,10.4,5.2,10,11.2C198.475,176.151,194.475,188.151,188.075,198.951z"/>
        `
    
    }
}

class Delete extends ICON {
    config() {
        return {
            viewBox: `0 0 348.333 348.334`
        }
    }
    path() {
        return `<path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
		c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
		c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
		l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
		L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>`
    }
}

class Dashboard extends ICON {
    config() {
        return {
            viewBox: `0 0 384 384`
        }
    }
    path() {
        return `<g>
        <rect x="213.333" y="0" width="170.667" height="128"/>
        <rect x="0" y="0" width="170.667" height="213.333"/>
        <rect x="0" y="256" width="170.667" height="128"/>
        <rect x="213.333" y="170.667" width="170.667" height="213.333"/>
    </g>`
    }
}

class Erase extends ICON {
    config() {
        return {
            viewBox: `0 0 512.067 512.067`
        }
    }
    path() {
        return `<path d="M499.575,187.784c16.656-16.661,16.656-43.669,0-60.331L384.887,12.509c-16.661-16.656-43.669-16.656-60.331,0
        L96.034,241.117l-83.541,83.2c-16.656,16.661-16.656,43.669,0,60.331L127.18,499.592c6.299,6.231,14.381,10.347,23.125,11.776
        c1.052,0.448,2.184,0.681,3.328,0.683h274.859c4.713,0,8.533-3.821,8.533-8.533s-3.82-8.533-8.533-8.533H192.034l17.067-17.067
        h174.933c4.713,0,8.533-3.82,8.533-8.533s-3.82-8.533-8.533-8.533H226.252l17.067-17.067h140.715c4.713,0,8.533-3.82,8.533-8.533
        s-3.82-8.533-8.533-8.533H260.386l10.667-10.581L499.575,187.784z M352.325,45.241c0.016-0.017,0.033-0.033,0.049-0.049
        c3.319-3.346,8.722-3.368,12.068-0.049c0.017,0.016,0.033,0.033,0.049,0.049l102.4,102.4c3.346,3.319,3.368,8.722,0.049,12.068
        c-0.016,0.017-0.033,0.033-0.049,0.049c-3.319,3.346-8.722,3.368-12.068,0.049c-0.017-0.016-0.033-0.033-0.049-0.049l-102.4-102.4
        C349.029,53.99,349.007,48.587,352.325,45.241z M175.394,487.474c-10.095,9.655-26.001,9.655-36.096,0L24.61,372.786
        c-9.926-9.985-9.926-26.111,0-36.096l77.824-77.483L252.876,409.65L175.394,487.474z"/>`
    }
}

class Envelope extends ICON {
    config() {
        return {
            viewBox: `0 0 24 19.2`
        }
    }
    path() {
        return `<g transform="translate(-2 -4)"><path d="M23.6,4H4.4A2.4,2.4,0,0,0,2.012,6.4L2,20.8a2.407,2.407,0,0,0,2.4,2.4H23.6A2.407,2.407,0,0,0,26,20.8V6.4A2.407,2.407,0,0,0,23.6,4Zm0,16.8H4.4V8.8l9.6,6,9.6-6ZM14,12.4l-9.6-6H23.6Z"/></g>`
    }
}

class FirstIndent extends ICON {
    config() {
        return {
            viewBox: `0 0 190 190`
        }
    }
    path() {
        return `
        <polygon points="40.5,66 89.5,33 40.5,0 40.5,17 7.5,17 7.5,50 40.5,50"/>
        <rect x="7.5" y="215" width="232" height="33"/>
        <rect x="7.5" y="150" width="232" height="33"/>
        <rect x="7.5" y="83" width="232" height="33"/>
        <rect x="106.5" y="17" width="133" height="33"/>
        `
    }
}

class FileType extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    /*
    * theme == string => file type = theme
    * theme == false => file type = other
    * color == true => color
    * color === true => currentColor
    * color == false => default color
    */
    path(vnode) {
        const theme = (this.hasOwnProperty('theme'))? this.theme : false;
        const color = (this.hasOwnProperty('color'))? this.color : false;
        if(theme && theme === 'doc'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#2a5599'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M7.78,18.48a3.45,3.45,0,0,1-1,2.64A4,4,0,0,1,4,22H2v-7H4.18a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,7.78,18.48Zm-1.54,0q0-2.25-2-2.25H3.47v4.55H4.1C5.53,20.82,6.24,20.05,6.24,18.52Z" />
                <path fill="#fff"
                    d="M15.56,18.54a3.78,3.78,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.21,3.21,0,0,1-2.47-.93,3.81,3.81,0,0,1-.85-2.67,3.72,3.72,0,0,1,.86-2.66A3.21,3.21,0,0,1,12.25,15a3.17,3.17,0,0,1,2.46.93A3.83,3.83,0,0,1,15.56,18.54Zm-5.09,0a2.87,2.87,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.57,1.57,0,0,0-1.34.6A2.94,2.94,0,0,0,10.47,18.54Z" />
                <path fill="#fff"
                    d="M20,16.19a1.52,1.52,0,0,0-1.3.63,3,3,0,0,0-.45,1.75c0,1.56.58,2.33,1.75,2.33a5.65,5.65,0,0,0,1.78-.36v1.24a5,5,0,0,1-1.92.35,2.91,2.91,0,0,1-2.33-.92,3.89,3.89,0,0,1-.81-2.65,4.4,4.4,0,0,1,.4-1.91,2.82,2.82,0,0,1,1.14-1.25A3.36,3.36,0,0,1,20,15a4.77,4.77,0,0,1,2,.49l-.48,1.21a6,6,0,0,0-.79-.33A2.37,2.37,0,0,0,20,16.19Z" />
            </g>`
        }
        if(theme && theme === 'docx'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#2a5599'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M5.9,18.5a2.75,2.75,0,0,1-.78,2.1,3.2,3.2,0,0,1-2.25.73H1.29V15.77H3a2.93,2.93,0,0,1,2.11.72A2.65,2.65,0,0,1,5.9,18.5Zm-1.22,0c0-1.2-.53-1.79-1.58-1.79H2.47v3.62H3C4.11,20.36,4.68,19.75,4.68,18.53Z" />
                <path fill="#fff"
                    d="M12.1,18.54a3,3,0,0,1-.68,2.12,2.53,2.53,0,0,1-2,.74,2.52,2.52,0,0,1-2-.74,3,3,0,0,1-.68-2.13,3,3,0,0,1,.69-2.12,2.57,2.57,0,0,1,2-.73,2.53,2.53,0,0,1,2,.74A3,3,0,0,1,12.1,18.54ZM8,18.54a2.27,2.27,0,0,0,.36,1.4,1.22,1.22,0,0,0,1,.48c.94,0,1.41-.63,1.41-1.88s-.46-1.88-1.4-1.88a1.24,1.24,0,0,0-1.06.48A2.27,2.27,0,0,0,8,18.54Z" />
                <path fill="#fff"
                    d="M15.61,16.67a1.22,1.22,0,0,0-1,.5,2.34,2.34,0,0,0-.36,1.39c0,1.24.46,1.86,1.39,1.86A4.26,4.26,0,0,0,17,20.13v1a3.9,3.9,0,0,1-1.53.28,2.33,2.33,0,0,1-1.85-.73A3.11,3.11,0,0,1,13,18.56,3.44,3.44,0,0,1,13.32,17a2.21,2.21,0,0,1,.91-1,2.67,2.67,0,0,1,1.38-.35,3.75,3.75,0,0,1,1.63.39l-.38,1a5.59,5.59,0,0,0-.63-.26A1.93,1.93,0,0,0,15.61,16.67Z" />
                <path fill="#fff"
                    d="M22.71,21.33H21.36l-1.29-2.1-1.29,2.1H17.51l1.85-2.87-1.73-2.69h1.3l1.2,2,1.18-2h1.27l-1.75,2.76Z" />
            </g>
            `
        }
        if(theme && theme === 'odt'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#2a5599'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M8.69,18.54a3.78,3.78,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93A3.21,3.21,0,0,1,2.9,21.2a3.81,3.81,0,0,1-.85-2.67,3.72,3.72,0,0,1,.86-2.66A3.21,3.21,0,0,1,5.38,15a3.17,3.17,0,0,1,2.46.93A3.83,3.83,0,0,1,8.69,18.54Zm-5.09,0A2.87,2.87,0,0,0,4,20.3a1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.57,1.57,0,0,0-1.34.6A2.94,2.94,0,0,0,3.6,18.54Z" />
                <path fill="#fff"
                    d="M15.92,18.48a3.41,3.41,0,0,1-1,2.64,4,4,0,0,1-2.83.92h-2v-7h2.19A3.71,3.71,0,0,1,15,16,3.34,3.34,0,0,1,15.92,18.48Zm-1.53,0c0-1.5-.67-2.25-2-2.25h-.79v4.55h.64C13.67,20.82,14.39,20.05,14.39,18.52Z" />
                <path fill="#fff" d="M20.06,22H18.58V16.29H16.69V15.06H22v1.23H20.06Z" />
            </g>
            `
        }
        if(theme && theme === 'xls'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#1e6d40'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M10,22H8.31L6.69,19.4,5.07,22H3.48L5.8,18.44,3.63,15.06H5.26l1.51,2.51,1.47-2.51H9.83L7.64,18.52Z" />
                <path fill="#fff" d="M10.88,22v-7h1.48v5.75h2.83V22Z" />
                <path fill="#fff"
                    d="M20.52,20.1a1.82,1.82,0,0,1-.68,1.49,3,3,0,0,1-1.89.54,4.44,4.44,0,0,1-2-.42V20.33a8.59,8.59,0,0,0,1.2.45,3.3,3.3,0,0,0,.89.13,1.24,1.24,0,0,0,.75-.19.64.64,0,0,0,.26-.55A.61.61,0,0,0,19,19.8a1.42,1.42,0,0,0-.33-.31c-.15-.09-.45-.25-.91-.47a4.84,4.84,0,0,1-1-.57,2.29,2.29,0,0,1-.51-.65,1.91,1.91,0,0,1-.19-.86,1.79,1.79,0,0,1,.63-1.45A2.58,2.58,0,0,1,18.41,15a3.9,3.9,0,0,1,1,.13,5.77,5.77,0,0,1,1,.36L20,16.6a6.93,6.93,0,0,0-.93-.32,2.94,2.94,0,0,0-.71-.09,1,1,0,0,0-.65.19.64.64,0,0,0-.22.51.65.65,0,0,0,.09.35,1,1,0,0,0,.29.28,9.69,9.69,0,0,0,.93.49,3.81,3.81,0,0,1,1.35.93A1.86,1.86,0,0,1,20.52,20.1Z" />            
            </g>
            `
        }
        if(theme && theme === 'xlsx'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#1e6d40'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M7.16,21.64H5.66L4.22,19.3,2.78,21.64H1.38l2.05-3.19-1.92-3H3l1.33,2.23L5.6,15.45H7L5.07,18.52Z" />
                <path fill="#fff" d="M7.94,21.64V15.45H9.25v5.11h2.52v1.08Z" />
                <path fill="#fff"
                    d="M16.5,19.92a1.61,1.61,0,0,1-.61,1.32,2.63,2.63,0,0,1-1.68.49,3.92,3.92,0,0,1-1.75-.38V20.13a7.43,7.43,0,0,0,1.06.4,3.4,3.4,0,0,0,.79.11,1.17,1.17,0,0,0,.67-.16.59.59,0,0,0,.23-.5.6.6,0,0,0-.1-.32,1.35,1.35,0,0,0-.3-.27A7,7,0,0,0,14,19a4.13,4.13,0,0,1-.86-.51,2,2,0,0,1-.45-.57,1.71,1.71,0,0,1-.17-.77,1.6,1.6,0,0,1,.56-1.29,2.32,2.32,0,0,1,1.54-.47,3.46,3.46,0,0,1,.92.12,5.62,5.62,0,0,1,.92.32l-.43,1a6.43,6.43,0,0,0-.82-.29,2.79,2.79,0,0,0-.63-.08.86.86,0,0,0-.58.18.56.56,0,0,0-.2.45.49.49,0,0,0,.09.3.74.74,0,0,0,.25.25,9,9,0,0,0,.83.44,3.16,3.16,0,0,1,1.19.83A1.6,1.6,0,0,1,16.5,19.92Z" />
                <path fill="#fff"
                    d="M22.62,21.64h-1.5L19.68,19.3l-1.44,2.34h-1.4l2.05-3.19-1.92-3h1.45l1.33,2.23,1.31-2.23h1.42l-1.95,3.07Z" />
            </g>
            `
        }
        if(theme && theme === 'ods'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#1e6d40'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M8.92,18.54a3.74,3.74,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.17,3.17,0,0,1-2.46-.93,3.81,3.81,0,0,1-.86-2.67,3.76,3.76,0,0,1,.86-2.66A3.24,3.24,0,0,1,5.61,15a3.17,3.17,0,0,1,2.46.93A3.78,3.78,0,0,1,8.92,18.54Zm-5.09,0a2.94,2.94,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.55,1.55,0,0,0-1.33.6A2.87,2.87,0,0,0,3.83,18.54Z" />
                <path fill="#fff"
                    d="M16.16,18.48a3.45,3.45,0,0,1-1,2.64,4,4,0,0,1-2.84.92h-2v-7h2.19a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,16.16,18.48Zm-1.54,0c0-1.5-.66-2.25-2-2.25h-.78v4.55h.63C13.91,20.82,14.62,20.05,14.62,18.52Z" />
                <path fill="#fff"
                    d="M21.72,20.1A1.81,1.81,0,0,1,21,21.59a3,3,0,0,1-1.89.54,4.47,4.47,0,0,1-2-.42V20.34a7.31,7.31,0,0,0,1.2.44,3.3,3.3,0,0,0,.89.13,1.3,1.3,0,0,0,.75-.18.66.66,0,0,0,.26-.56.58.58,0,0,0-.12-.36,1.1,1.1,0,0,0-.33-.31,7.42,7.42,0,0,0-.91-.47,4.42,4.42,0,0,1-.95-.58,2.12,2.12,0,0,1-.52-.64,1.94,1.94,0,0,1-.19-.86,1.81,1.81,0,0,1,.63-1.46A2.64,2.64,0,0,1,19.62,15a4.34,4.34,0,0,1,1,.13,8.61,8.61,0,0,1,1,.36l-.48,1.15a7.38,7.38,0,0,0-.92-.32,3.08,3.08,0,0,0-.72-.09,1,1,0,0,0-.65.2.7.7,0,0,0-.13.85,1,1,0,0,0,.29.28A7.38,7.38,0,0,0,20,18a3.75,3.75,0,0,1,1.34.94A1.84,1.84,0,0,1,21.72,20.1Z" />
            </g>
            `
        }
        if(theme && theme === 'ppt'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#d24625'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M8.39,17.23A2.11,2.11,0,0,1,7.69,19a3,3,0,0,1-2,.6H5.05V22H3.57v-7H5.8a3,3,0,0,1,1.93.54A2,2,0,0,1,8.39,17.23ZM5.05,18.34h.49a1.63,1.63,0,0,0,1-.27,1,1,0,0,0,.34-.79,1,1,0,0,0-.29-.76,1.3,1.3,0,0,0-.89-.25H5.05Z" />
                <path fill="#fff"
                    d="M14.53,17.23A2.12,2.12,0,0,1,13.82,19a3,3,0,0,1-2,.6h-.63V22H9.71v-7h2.23a3,3,0,0,1,1.93.54A2,2,0,0,1,14.53,17.23Zm-3.34,1.11h.48a1.59,1.59,0,0,0,1-.27.94.94,0,0,0,.34-.79,1,1,0,0,0-.28-.76,1.31,1.31,0,0,0-.89-.25h-.67Z" />
                <path fill="#fff" d="M18.54,22H17.06V16.29h-1.9V15.06h5.27v1.23H18.54Z" />
            </g>
            `
        }
        if(theme && theme === 'pptx'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#d24625'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M5.83,17.38a1.92,1.92,0,0,1-.62,1.53,2.69,2.69,0,0,1-1.77.52H2.87v2.2H1.56V15.46h2a2.64,2.64,0,0,1,1.71.48A1.75,1.75,0,0,1,5.83,17.38Zm-3,1h.44a1.42,1.42,0,0,0,.9-.24,1,1,0,0,0,0-1.37,1.17,1.17,0,0,0-.79-.22h-.6Z" />
                <path fill="#fff"
                    d="M11.26,17.38a1.89,1.89,0,0,1-.62,1.53,2.65,2.65,0,0,1-1.77.52H8.31v2.2H7V15.46H9a2.64,2.64,0,0,1,1.71.48A1.75,1.75,0,0,1,11.26,17.38Zm-2.95,1h.43a1.42,1.42,0,0,0,.9-.24,1,1,0,0,0,0-1.37,1.17,1.17,0,0,0-.79-.22H8.31Z" />
                <path fill="#fff" d="M14.81,21.63H13.5V16.55H11.83V15.46h4.66v1.09H14.81Z" />
                <path fill="#fff"
                    d="M22.44,21.63h-1.5L19.5,19.3l-1.43,2.33H16.66l2.05-3.18-1.92-3h1.45l1.33,2.22,1.31-2.22h1.41l-1.94,3.06Z" />
            </g>
            `
        }
        if(theme && theme === 'odp'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#d24625'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M8.57,18.54a3.74,3.74,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.17,3.17,0,0,1-2.46-.93,3.76,3.76,0,0,1-.86-2.67,3.76,3.76,0,0,1,.86-2.66A3.23,3.23,0,0,1,5.26,15a3.17,3.17,0,0,1,2.46.93A3.78,3.78,0,0,1,8.57,18.54Zm-5.09,0a2.94,2.94,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.55,1.55,0,0,0-1.33.6A2.87,2.87,0,0,0,3.48,18.54Z" />
                <path fill="#fff"
                    d="M15.81,18.48a3.45,3.45,0,0,1-1,2.64A4,4,0,0,1,12,22H10v-7h2.19a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,15.81,18.48Zm-1.54,0c0-1.5-.66-2.25-2-2.25H11.5v4.55h.63C13.56,20.82,14.27,20.05,14.27,18.52Z" />
                <path fill="#fff"
                    d="M22.07,17.24a2.13,2.13,0,0,1-.7,1.72,3,3,0,0,1-2,.6h-.64V22H17.25v-7h2.23a2.92,2.92,0,0,1,1.93.55A2,2,0,0,1,22.07,17.24Zm-3.34,1.11h.49a1.63,1.63,0,0,0,1-.27,1.12,1.12,0,0,0,.05-1.56,1.35,1.35,0,0,0-.89-.25h-.67Z" />
            </g>
            `
        }
        if(theme && theme === 'pdf'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#da1113'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M8.13,17.23A2.11,2.11,0,0,1,7.43,19a3,3,0,0,1-2,.6H4.79V22H3.31v-7H5.54a3,3,0,0,1,1.93.54A2,2,0,0,1,8.13,17.23ZM4.79,18.34h.49a1.59,1.59,0,0,0,1-.27.94.94,0,0,0,.34-.79,1,1,0,0,0-.28-.76,1.31,1.31,0,0,0-.89-.25H4.79Z" />
                <path fill="#fff"
                    d="M15.24,18.48a3.46,3.46,0,0,1-1,2.64,4,4,0,0,1-2.83.91h-2v-7h2.19a3.71,3.71,0,0,1,2.66.9A3.31,3.31,0,0,1,15.24,18.48Zm-1.54,0q0-2.25-2-2.25h-.79v4.54h.64C13,20.81,13.7,20.05,13.7,18.52Z" />
                <path fill="#fff" d="M18.14,22H16.69v-7h4v1.21H18.14v1.8h2.37v1.2H18.14Z" />
            </g>
            `
        }
        if(theme && theme === 'rar'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#f9b721'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff"
                    d="M3.6,19.37v2.68H2.12v-7h2a3.42,3.42,0,0,1,2.1.52,1.83,1.83,0,0,1,.69,1.57,1.91,1.91,0,0,1-.34,1.1,2.36,2.36,0,0,1-1,.75c1.05,1.56,1.73,2.58,2.05,3H6.05L4.38,19.37Zm0-1.2h.47a1.79,1.79,0,0,0,1-.24.83.83,0,0,0,.33-.73.76.76,0,0,0-.34-.71A2.08,2.08,0,0,0,4,16.28H3.6Z" />
                <path fill="#fff"
                    d="M13.84,22.05l-.51-1.66H10.79l-.51,1.66H8.69l2.46-7H13l2.47,7ZM13,19.14c-.47-1.5-.73-2.35-.79-2.55s-.1-.35-.13-.47c-.1.41-.4,1.42-.9,3Z" />
                <path fill="#fff"
                    d="M17.79,19.37v2.68H16.31v-7h2a3.47,3.47,0,0,1,2.11.52,2.07,2.07,0,0,1,.34,2.67,2.29,2.29,0,0,1-1,.75l2.05,3H20.24l-1.66-2.68Zm0-1.2h.48a1.78,1.78,0,0,0,1-.24.83.83,0,0,0,.34-.73.79.79,0,0,0-.34-.71,2.08,2.08,0,0,0-1.06-.21h-.45Z" />
            </g>
            `
        }
        if(theme && theme === 'zip'){
            return `
            <g transform="translate(0,-4.5)">
                <path
                    d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
                <path fill="#fff"
                    d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
                <rect fill="${(color)?((color === true)?'currentColor':color):'#f90'}" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
                <path fill="#fff" d="M10,22H4.82v-1l3.35-4.79H4.91V15.06h5v1l-3.34,4.8H10Z" />
                <path fill="#fff" d="M11.13,22v-7H12.6v7Z" />
                <path fill="#fff"
                    d="M19.18,17.23a2.14,2.14,0,0,1-.7,1.72,3,3,0,0,1-2,.6h-.63V22H14.36v-7h2.23a3,3,0,0,1,1.93.54A2,2,0,0,1,19.18,17.23Zm-3.34,1.11h.49a1.63,1.63,0,0,0,1-.27,1,1,0,0,0,.34-.79,1,1,0,0,0-.29-.76,1.3,1.3,0,0,0-.89-.25h-.67Z" />
            </g>
            `
        }
        return `
            <path d="M16.7,0H3.14A2.1,2.1,0,0,0,1,2.1H1V21.38a2.1,2.1,0,0,0,2.1,2.1H19.82a2.1,2.1,0,0,0,2.1-2.1h0V5Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6h2Z"/>
            <path fill="#fff" d="M20.87,6V21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6Z"/>
            <rect fill="${(color)?((color === true)?'currentColor':color):'#a5a9af'}" x="3.98" y="4.72" width="9.5" height="1.5" rx="0.75"/>
            <rect fill="${(color)?((color === true)?'currentColor':color):'#a5a9af'}" x="3.98" y="8.67" width="14.87" height="1.5" rx="0.75"/>
            <rect fill="${(color)?((color === true)?'currentColor':color):'#a5a9af'}" x="3.98" y="12.63" width="14.87" height="1.5" rx="0.75"/>
            <rect fill="${(color)?((color === true)?'currentColor':color):'#a5a9af'}" x="3.98" y="16.58" width="14.87" height="1.5" rx="0.75"/>
        `
    }
}

class FileOther extends ICON {
    config() {
        return {
            viewBox: `0 0 22.96 23.48`
        }
    }
    path() {
        return `
        <path d="M16.7,0H3.14A2.1,2.1,0,0,0,1,2.1H1V21.38a2.1,2.1,0,0,0,2.1,2.1H19.82a2.1,2.1,0,0,0,2.1-2.1h0V5Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6h2Z"/>
        <path fill="#fff" d="M20.87,6V21.38a1.06,1.06,0,0,1-1.05,1.06H3.14a1.06,1.06,0,0,1-1.05-1.06V2.1A1.06,1.06,0,0,1,3.14,1H15.65V2.83A3.19,3.19,0,0,0,18.83,6Z"/>
        <rect fill="#a5a9af" x="3.98" y="4.72" width="9.5" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="8.67" width="14.87" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="12.63" width="14.87" height="1.5" rx="0.75"/>
        <rect fill="#a5a9af" x="3.98" y="16.58" width="14.87" height="1.5" rx="0.75"/>
        `
    }
}

class FileDOC extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#2a5599" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M7.78,18.48a3.45,3.45,0,0,1-1,2.64A4,4,0,0,1,4,22H2v-7H4.18a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,7.78,18.48Zm-1.54,0q0-2.25-2-2.25H3.47v4.55H4.1C5.53,20.82,6.24,20.05,6.24,18.52Z" />
            <path fill="#fff"
                d="M15.56,18.54a3.78,3.78,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.21,3.21,0,0,1-2.47-.93,3.81,3.81,0,0,1-.85-2.67,3.72,3.72,0,0,1,.86-2.66A3.21,3.21,0,0,1,12.25,15a3.17,3.17,0,0,1,2.46.93A3.83,3.83,0,0,1,15.56,18.54Zm-5.09,0a2.87,2.87,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.57,1.57,0,0,0-1.34.6A2.94,2.94,0,0,0,10.47,18.54Z" />
            <path fill="#fff"
                d="M20,16.19a1.52,1.52,0,0,0-1.3.63,3,3,0,0,0-.45,1.75c0,1.56.58,2.33,1.75,2.33a5.65,5.65,0,0,0,1.78-.36v1.24a5,5,0,0,1-1.92.35,2.91,2.91,0,0,1-2.33-.92,3.89,3.89,0,0,1-.81-2.65,4.4,4.4,0,0,1,.4-1.91,2.82,2.82,0,0,1,1.14-1.25A3.36,3.36,0,0,1,20,15a4.77,4.77,0,0,1,2,.49l-.48,1.21a6,6,0,0,0-.79-.33A2.37,2.37,0,0,0,20,16.19Z" />
        </g>
        `
    }
}

class FileDOCX extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#2a5599" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M5.9,18.5a2.75,2.75,0,0,1-.78,2.1,3.2,3.2,0,0,1-2.25.73H1.29V15.77H3a2.93,2.93,0,0,1,2.11.72A2.65,2.65,0,0,1,5.9,18.5Zm-1.22,0c0-1.2-.53-1.79-1.58-1.79H2.47v3.62H3C4.11,20.36,4.68,19.75,4.68,18.53Z" />
            <path fill="#fff"
                d="M12.1,18.54a3,3,0,0,1-.68,2.12,2.53,2.53,0,0,1-2,.74,2.52,2.52,0,0,1-2-.74,3,3,0,0,1-.68-2.13,3,3,0,0,1,.69-2.12,2.57,2.57,0,0,1,2-.73,2.53,2.53,0,0,1,2,.74A3,3,0,0,1,12.1,18.54ZM8,18.54a2.27,2.27,0,0,0,.36,1.4,1.22,1.22,0,0,0,1,.48c.94,0,1.41-.63,1.41-1.88s-.46-1.88-1.4-1.88a1.24,1.24,0,0,0-1.06.48A2.27,2.27,0,0,0,8,18.54Z" />
            <path fill="#fff"
                d="M15.61,16.67a1.22,1.22,0,0,0-1,.5,2.34,2.34,0,0,0-.36,1.39c0,1.24.46,1.86,1.39,1.86A4.26,4.26,0,0,0,17,20.13v1a3.9,3.9,0,0,1-1.53.28,2.33,2.33,0,0,1-1.85-.73A3.11,3.11,0,0,1,13,18.56,3.44,3.44,0,0,1,13.32,17a2.21,2.21,0,0,1,.91-1,2.67,2.67,0,0,1,1.38-.35,3.75,3.75,0,0,1,1.63.39l-.38,1a5.59,5.59,0,0,0-.63-.26A1.93,1.93,0,0,0,15.61,16.67Z" />
            <path fill="#fff"
                d="M22.71,21.33H21.36l-1.29-2.1-1.29,2.1H17.51l1.85-2.87-1.73-2.69h1.3l1.2,2,1.18-2h1.27l-1.75,2.76Z" />
        </g>
        `
    }
}

class FileODT extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#2a5599" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M8.69,18.54a3.78,3.78,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93A3.21,3.21,0,0,1,2.9,21.2a3.81,3.81,0,0,1-.85-2.67,3.72,3.72,0,0,1,.86-2.66A3.21,3.21,0,0,1,5.38,15a3.17,3.17,0,0,1,2.46.93A3.83,3.83,0,0,1,8.69,18.54Zm-5.09,0A2.87,2.87,0,0,0,4,20.3a1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.57,1.57,0,0,0-1.34.6A2.94,2.94,0,0,0,3.6,18.54Z" />
            <path fill="#fff"
                d="M15.92,18.48a3.41,3.41,0,0,1-1,2.64,4,4,0,0,1-2.83.92h-2v-7h2.19A3.71,3.71,0,0,1,15,16,3.34,3.34,0,0,1,15.92,18.48Zm-1.53,0c0-1.5-.67-2.25-2-2.25h-.79v4.55h.64C13.67,20.82,14.39,20.05,14.39,18.52Z" />
            <path fill="#fff" d="M20.06,22H18.58V16.29H16.69V15.06H22v1.23H20.06Z" />
        </g>
        `
    }
}

class FileXLSX extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#1e6d40" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M10,22H8.31L6.69,19.4,5.07,22H3.48L5.8,18.44,3.63,15.06H5.26l1.51,2.51,1.47-2.51H9.83L7.64,18.52Z" />
            <path fill="#fff" d="M10.88,22v-7h1.48v5.75h2.83V22Z" />
            <path fill="#fff"
                d="M20.52,20.1a1.82,1.82,0,0,1-.68,1.49,3,3,0,0,1-1.89.54,4.44,4.44,0,0,1-2-.42V20.33a8.59,8.59,0,0,0,1.2.45,3.3,3.3,0,0,0,.89.13,1.24,1.24,0,0,0,.75-.19.64.64,0,0,0,.26-.55A.61.61,0,0,0,19,19.8a1.42,1.42,0,0,0-.33-.31c-.15-.09-.45-.25-.91-.47a4.84,4.84,0,0,1-1-.57,2.29,2.29,0,0,1-.51-.65,1.91,1.91,0,0,1-.19-.86,1.79,1.79,0,0,1,.63-1.45A2.58,2.58,0,0,1,18.41,15a3.9,3.9,0,0,1,1,.13,5.77,5.77,0,0,1,1,.36L20,16.6a6.93,6.93,0,0,0-.93-.32,2.94,2.94,0,0,0-.71-.09,1,1,0,0,0-.65.19.64.64,0,0,0-.22.51.65.65,0,0,0,.09.35,1,1,0,0,0,.29.28,9.69,9.69,0,0,0,.93.49,3.81,3.81,0,0,1,1.35.93A1.86,1.86,0,0,1,20.52,20.1Z" />
        </g>
        `
    }
}

class FileODS extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#1e6d40" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M7.16,21.64H5.66L4.22,19.3,2.78,21.64H1.38l2.05-3.19-1.92-3H3l1.33,2.23L5.6,15.45H7L5.07,18.52Z" />
            <path fill="#fff" d="M7.94,21.64V15.45H9.25v5.11h2.52v1.08Z" />
            <path fill="#fff"
                d="M16.5,19.92a1.61,1.61,0,0,1-.61,1.32,2.63,2.63,0,0,1-1.68.49,3.92,3.92,0,0,1-1.75-.38V20.13a7.43,7.43,0,0,0,1.06.4,3.4,3.4,0,0,0,.79.11,1.17,1.17,0,0,0,.67-.16.59.59,0,0,0,.23-.5.6.6,0,0,0-.1-.32,1.35,1.35,0,0,0-.3-.27A7,7,0,0,0,14,19a4.13,4.13,0,0,1-.86-.51,2,2,0,0,1-.45-.57,1.71,1.71,0,0,1-.17-.77,1.6,1.6,0,0,1,.56-1.29,2.32,2.32,0,0,1,1.54-.47,3.46,3.46,0,0,1,.92.12,5.62,5.62,0,0,1,.92.32l-.43,1a6.43,6.43,0,0,0-.82-.29,2.79,2.79,0,0,0-.63-.08.86.86,0,0,0-.58.18.56.56,0,0,0-.2.45.49.49,0,0,0,.09.3.74.74,0,0,0,.25.25,9,9,0,0,0,.83.44,3.16,3.16,0,0,1,1.19.83A1.6,1.6,0,0,1,16.5,19.92Z" />
            <path fill="#fff"
                d="M22.62,21.64h-1.5L19.68,19.3l-1.44,2.34h-1.4l2.05-3.19-1.92-3h1.45l1.33,2.23,1.31-2.23h1.42l-1.95,3.07Z" />
        </g>
        `
    }
}

class FileODS$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#1e6d40" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M8.92,18.54a3.74,3.74,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.17,3.17,0,0,1-2.46-.93,3.81,3.81,0,0,1-.86-2.67,3.76,3.76,0,0,1,.86-2.66A3.24,3.24,0,0,1,5.61,15a3.17,3.17,0,0,1,2.46.93A3.78,3.78,0,0,1,8.92,18.54Zm-5.09,0a2.94,2.94,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.55,1.55,0,0,0-1.33.6A2.87,2.87,0,0,0,3.83,18.54Z" />
            <path fill="#fff"
                d="M16.16,18.48a3.45,3.45,0,0,1-1,2.64,4,4,0,0,1-2.84.92h-2v-7h2.19a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,16.16,18.48Zm-1.54,0c0-1.5-.66-2.25-2-2.25h-.78v4.55h.63C13.91,20.82,14.62,20.05,14.62,18.52Z" />
            <path fill="#fff"
                d="M21.72,20.1A1.81,1.81,0,0,1,21,21.59a3,3,0,0,1-1.89.54,4.47,4.47,0,0,1-2-.42V20.34a7.31,7.31,0,0,0,1.2.44,3.3,3.3,0,0,0,.89.13,1.3,1.3,0,0,0,.75-.18.66.66,0,0,0,.26-.56.58.58,0,0,0-.12-.36,1.1,1.1,0,0,0-.33-.31,7.42,7.42,0,0,0-.91-.47,4.42,4.42,0,0,1-.95-.58,2.12,2.12,0,0,1-.52-.64,1.94,1.94,0,0,1-.19-.86,1.81,1.81,0,0,1,.63-1.46A2.64,2.64,0,0,1,19.62,15a4.34,4.34,0,0,1,1,.13,8.61,8.61,0,0,1,1,.36l-.48,1.15a7.38,7.38,0,0,0-.92-.32,3.08,3.08,0,0,0-.72-.09,1,1,0,0,0-.65.2.7.7,0,0,0-.13.85,1,1,0,0,0,.29.28A7.38,7.38,0,0,0,20,18a3.75,3.75,0,0,1,1.34.94A1.84,1.84,0,0,1,21.72,20.1Z" />
        </g>
        `
    }
}

class FilePPTX extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#d24625" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M8.39,17.23A2.11,2.11,0,0,1,7.69,19a3,3,0,0,1-2,.6H5.05V22H3.57v-7H5.8a3,3,0,0,1,1.93.54A2,2,0,0,1,8.39,17.23ZM5.05,18.34h.49a1.63,1.63,0,0,0,1-.27,1,1,0,0,0,.34-.79,1,1,0,0,0-.29-.76,1.3,1.3,0,0,0-.89-.25H5.05Z" />
            <path fill="#fff"
                d="M14.53,17.23A2.12,2.12,0,0,1,13.82,19a3,3,0,0,1-2,.6h-.63V22H9.71v-7h2.23a3,3,0,0,1,1.93.54A2,2,0,0,1,14.53,17.23Zm-3.34,1.11h.48a1.59,1.59,0,0,0,1-.27.94.94,0,0,0,.34-.79,1,1,0,0,0-.28-.76,1.31,1.31,0,0,0-.89-.25h-.67Z" />
            <path fill="#fff" d="M18.54,22H17.06V16.29h-1.9V15.06h5.27v1.23H18.54Z" />
        </g>
        `
    }
}

class FileODP extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#d24625" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M5.83,17.38a1.92,1.92,0,0,1-.62,1.53,2.69,2.69,0,0,1-1.77.52H2.87v2.2H1.56V15.46h2a2.64,2.64,0,0,1,1.71.48A1.75,1.75,0,0,1,5.83,17.38Zm-3,1h.44a1.42,1.42,0,0,0,.9-.24,1,1,0,0,0,0-1.37,1.17,1.17,0,0,0-.79-.22h-.6Z" />
            <path fill="#fff"
                d="M11.26,17.38a1.89,1.89,0,0,1-.62,1.53,2.65,2.65,0,0,1-1.77.52H8.31v2.2H7V15.46H9a2.64,2.64,0,0,1,1.71.48A1.75,1.75,0,0,1,11.26,17.38Zm-2.95,1h.43a1.42,1.42,0,0,0,.9-.24,1,1,0,0,0,0-1.37,1.17,1.17,0,0,0-.79-.22H8.31Z" />
            <path fill="#fff" d="M14.81,21.63H13.5V16.55H11.83V15.46h4.66v1.09H14.81Z" />
            <path fill="#fff"
                d="M22.44,21.63h-1.5L19.5,19.3l-1.43,2.33H16.66l2.05-3.18-1.92-3h1.45l1.33,2.22,1.31-2.22h1.41l-1.94,3.06Z" />
        </g>
        `
    }
}

class FileODP$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#d24625" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M8.57,18.54a3.74,3.74,0,0,1-.86,2.66,3.17,3.17,0,0,1-2.46.93,3.17,3.17,0,0,1-2.46-.93,3.76,3.76,0,0,1-.86-2.67,3.76,3.76,0,0,1,.86-2.66A3.23,3.23,0,0,1,5.26,15a3.17,3.17,0,0,1,2.46.93A3.78,3.78,0,0,1,8.57,18.54Zm-5.09,0a2.94,2.94,0,0,0,.44,1.76,1.55,1.55,0,0,0,1.33.59c1.18,0,1.77-.78,1.77-2.35s-.59-2.36-1.76-2.36a1.55,1.55,0,0,0-1.33.6A2.87,2.87,0,0,0,3.48,18.54Z" />
            <path fill="#fff"
                d="M15.81,18.48a3.45,3.45,0,0,1-1,2.64A4,4,0,0,1,12,22H10v-7h2.19a3.68,3.68,0,0,1,2.65.9A3.35,3.35,0,0,1,15.81,18.48Zm-1.54,0c0-1.5-.66-2.25-2-2.25H11.5v4.55h.63C13.56,20.82,14.27,20.05,14.27,18.52Z" />
            <path fill="#fff"
                d="M22.07,17.24a2.13,2.13,0,0,1-.7,1.72,3,3,0,0,1-2,.6h-.64V22H17.25v-7h2.23a2.92,2.92,0,0,1,1.93.55A2,2,0,0,1,22.07,17.24Zm-3.34,1.11h.49a1.63,1.63,0,0,0,1-.27,1.12,1.12,0,0,0,.05-1.56,1.35,1.35,0,0,0-.89-.25h-.67Z" />
        </g>
        `
    }
}

class FilePDF extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#da1113" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M8.13,17.23A2.11,2.11,0,0,1,7.43,19a3,3,0,0,1-2,.6H4.79V22H3.31v-7H5.54a3,3,0,0,1,1.93.54A2,2,0,0,1,8.13,17.23ZM4.79,18.34h.49a1.59,1.59,0,0,0,1-.27.94.94,0,0,0,.34-.79,1,1,0,0,0-.28-.76,1.31,1.31,0,0,0-.89-.25H4.79Z" />
            <path fill="#fff"
                d="M15.24,18.48a3.46,3.46,0,0,1-1,2.64,4,4,0,0,1-2.83.91h-2v-7h2.19a3.71,3.71,0,0,1,2.66.9A3.31,3.31,0,0,1,15.24,18.48Zm-1.54,0q0-2.25-2-2.25h-.79v4.54h.64C13,20.81,13.7,20.05,13.7,18.52Z" />
            <path fill="#fff" d="M18.14,22H16.69v-7h4v1.21H18.14v1.8h2.37v1.2H18.14Z" />
        </g>
        `
    }
}

class FileRAR extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#f9b721" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff"
                d="M3.6,19.37v2.68H2.12v-7h2a3.42,3.42,0,0,1,2.1.52,1.83,1.83,0,0,1,.69,1.57,1.91,1.91,0,0,1-.34,1.1,2.36,2.36,0,0,1-1,.75c1.05,1.56,1.73,2.58,2.05,3H6.05L4.38,19.37Zm0-1.2h.47a1.79,1.79,0,0,0,1-.24.83.83,0,0,0,.33-.73.76.76,0,0,0-.34-.71A2.08,2.08,0,0,0,4,16.28H3.6Z" />
            <path fill="#fff"
                d="M13.84,22.05l-.51-1.66H10.79l-.51,1.66H8.69l2.46-7H13l2.47,7ZM13,19.14c-.47-1.5-.73-2.35-.79-2.55s-.1-.35-.13-.47c-.1.41-.4,1.42-.9,3Z" />
            <path fill="#fff"
                d="M17.79,19.37v2.68H16.31v-7h2a3.47,3.47,0,0,1,2.11.52,2.07,2.07,0,0,1,.34,2.67,2.29,2.29,0,0,1-1,.75l2.05,3H20.24l-1.66-2.68Zm0-1.2h.48a1.78,1.78,0,0,0,1-.24.83.83,0,0,0,.34-.73.79.79,0,0,0-.34-.71,2.08,2.08,0,0,0-1.06-.21h-.45Z" />
        </g>
        `
    }
}

class RAR extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `
        <path
            d="m471.839844 0h-456.78125c-8.316406 0-15.058594 6.742188-15.058594 15.0625v481.875c0 8.320312 6.742188 15.0625 15.058594 15.0625h456.78125c8.316406 0 15.058594-6.742188 15.058594-15.0625v-481.875c0-8.320312-6.742188-15.0625-15.058594-15.0625zm0 0"
            fill="#97d85d" />
        <path
            d="m471.871094 10.085938h-223.65625v501.914062h223.65625c8.300781 0 15.03125-6.609375 15.03125-14.765625v-472.382813c-.003906-8.15625-6.730469-14.765624-15.03125-14.765624zm0 0"
            fill="#71b22d" />
        <path
            d="m471.8125 161.867188h-455.789062c-8.332032 0-15.089844 6.753906-15.089844 15.089843v174.140625h485.96875v-174.140625c-.003906-8.335937-6.757813-15.089843-15.089844-15.089843zm0 0"
            fill="#fc4f4f" />
        <path
            d="m471.8125 0h-455.789062c-8.332032 0-15.089844 6.140625-15.089844 13.71875v158.324219h485.96875v-158.324219c-.003906-7.578125-6.757813-13.71875-15.089844-13.71875zm0 0"
            fill="#4a60e5" />
        <g fill="#ffd561">
            <path
                d="m112.472656 380.847656h-51.304687c-8.332031 0-15.085938 6.757813-15.085938 15.089844v73.21875c0 8.335938 6.753907 15.089844 15.085938 15.089844h51.304687c8.332032 0 15.089844-6.753906 15.089844-15.089844v-73.21875c0-8.332031-6.757812-15.089844-15.089844-15.089844zm0 0" />
            <path
                d="m112.472656 209.871094h-51.304687c-8.332031 0-15.085938 6.753906-15.085938 15.089844v73.21875c0 8.335937 6.753907 15.089843 15.085938 15.089843h51.304687c8.332032 0 15.089844-6.753906 15.089844-15.089843v-73.21875c0-8.335938-6.757812-15.089844-15.089844-15.089844zm0 0" />
            <path
                d="m112.472656 33.863281h-51.304687c-8.332031 0-15.085938 6.753907-15.085938 15.089844v73.21875c0 8.332031 6.753907 15.089844 15.085938 15.089844h51.304687c8.332032 0 15.089844-6.757813 15.089844-15.089844v-73.21875c0-8.335937-6.757812-15.089844-15.089844-15.089844zm0 0" />
        </g>
        <path
            d="m471.8125 0h-223.597656v172.042969h238.683594v-158.324219c0-7.578125-6.753907-13.71875-15.085938-13.71875zm0 0"
            fill="#2a4bd8" />
        <path d="m248.214844 161.867188h238.683594v189.230468h-238.683594zm0 0" fill="#e53535" />
        <path
            d="m305.050781 512c8.332031 0 15.089844-6.742188 15.089844-15.0625v-481.875c0-8.320312-6.757813-15.0625-15.089844-15.0625h-128.761719v512zm0 0"
            fill="#ffbe69" />
        <path d="m176.289062 192.390625h143.851563v126.75h-143.851563zm0 0" fill="#ff9852" />
        <path
            d="m248.214844 166.238281c-8.332032 0-15.089844 6.757813-15.089844 15.089844v46.273437c0 8.332032 6.757812 15.085938 15.089844 15.085938 8.332031 0 15.089844-6.753906 15.089844-15.085938v-46.273437c0-8.332031-6.757813-15.089844-15.089844-15.089844zm0 0"
            fill="#ff8a33" />
        <path d="m248.214844 0h71.925781v512h-71.925781zm0 0" fill="#f4b04d" />
        <path d="m248.214844 192.390625h71.925781v126.75h-71.925781zm0 0" fill="#ff8a33" />
        <path
            d="m248.214844 166.238281v76.449219c8.332031 0 15.089844-6.753906 15.089844-15.085938v-46.273437c0-8.332031-6.757813-15.089844-15.089844-15.089844zm0 0"
            fill="#f96e10" />
        `
    }
}

class FileZIP extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `
        <g transform="translate(0,-4.5)">
            <path
                d="M17.22,4.76H3.66a2.1,2.1,0,0,0-2.1,2.1V26.14a2.1,2.1,0,0,0,2.1,2.1H20.34a2.1,2.1,0,0,0,2.1-2.1V9.72Zm4.17,21.38a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17h2Z" />
            <path fill="#fff"
                d="M21.39,10.76V26.14a1.06,1.06,0,0,1-1.05,1.06H3.66a1.06,1.06,0,0,1-1.05-1.06V6.86A1.06,1.06,0,0,1,3.66,5.8H16.17V7.59a3.18,3.18,0,0,0,3.18,3.17Z" />
            <rect fill="#f90" x="0.52" y="12.8" width="22.96" height="11.48" rx="2.49" />
            <path fill="#fff" d="M10,22H4.82v-1l3.35-4.79H4.91V15.06h5v1l-3.34,4.8H10Z" />
            <path fill="#fff" d="M11.13,22v-7H12.6v7Z" />
            <path fill="#fff"
                d="M19.18,17.23a2.14,2.14,0,0,1-.7,1.72,3,3,0,0,1-2,.6h-.63V22H14.36v-7h2.23a3,3,0,0,1,1.93.54A2,2,0,0,1,19.18,17.23Zm-3.34,1.11h.49a1.63,1.63,0,0,0,1-.27,1,1,0,0,0,.34-.79,1,1,0,0,0-.29-.76,1.3,1.3,0,0,0-.89-.25h-.67Z" />
        </g>
        `
    }
}

class Grid01 extends ICON {
    config() {
        return {
            viewBox: `0 0 341.333 341.333`
        }
    }
    path() {
        return `<g>
        <rect x="128" y="128" width="85.333" height="85.333"/>
        <rect x="0" y="0" width="85.333" height="85.333"/>
        <rect x="128" y="256" width="85.333" height="85.333"/>
        <rect x="0" y="128" width="85.333" height="85.333"/>
        <rect x="0" y="256" width="85.333" height="85.333"/>
        <rect x="256" y="0" width="85.333" height="85.333"/>
        <rect x="128" y="0" width="85.333" height="85.333"/>
        <rect x="256" y="128" width="85.333" height="85.333"/>
        <rect x="256" y="256" width="85.333" height="85.333"/>
    </g>`
    }
}

class Grid02 extends ICON {
    config() {
        return {
            viewBox: `0 0 362.667 362.667`
        }
    }
    path() {
        return `<g>
        <rect x="0" y="42.667" width="106.667" height="128"/>
        <rect x="0" y="192" width="106.667" height="128"/>
        <rect x="128" y="192" width="106.667" height="128"/>
        <rect x="256" y="192" width="106.667" height="128"/>
        <rect x="256" y="42.667" width="106.667" height="128"/>
        <rect x="128" y="42.667" width="106.667" height="128"/>
    </g>`
    }
}

class GlobalBold extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="m256 0c-141.160156 0-256 114.839844-256 256s114.839844 256 256 256 256-114.839844 256-256-114.839844-256-256-256zm-15 125.65625c-22.820312-.980469-45.410156-4.1875-66.980469-9.402344 3.445313-8.164062 7.183594-16.003906 11.214844-23.433594 16.539063-30.476562 36.84375-51.863281 55.765625-59.609374zm0 30.023438v85.320312h-93.691406c1.320312-33.300781 6.996094-66.359375 16.382812-96.429688 24.875 6.265626 50.988282 10.058594 77.308594 11.109376zm0 115.320312v85.320312c-26.320312 1.050782-52.433594 4.84375-77.308594 11.109376-9.386718-30.070313-15.0625-63.128907-16.382812-96.429688zm0 115.34375v92.445312c-18.921875-7.746093-39.226562-29.132812-55.765625-59.609374-4.03125-7.429688-7.769531-15.269532-11.214844-23.433594 21.570313-5.214844 44.15625-8.421875 66.980469-9.402344zm30 0c22.820312.980469 45.410156 4.1875 66.980469 9.402344-3.445313 8.164062-7.183594 16.003906-11.214844 23.433594-16.539063 30.476562-36.84375 51.863281-55.765625 59.609374zm0-30.023438v-85.320312h93.691406c-1.320312 33.300781-6.996094 66.359375-16.382812 96.429688-24.875-6.265626-50.988282-10.058594-77.308594-11.109376zm0-115.320312v-85.320312c26.320312-1.050782 52.433594-4.84375 77.308594-11.109376 9.386718 30.070313 15.0625 63.128907 16.382812 96.429688zm0-115.34375v-92.445312c18.921875 7.746093 39.226562 29.132812 55.765625 59.609374 4.03125 7.429688 7.769531 15.269532 11.214844 23.433594-21.570313 5.214844-44.160157 8.421875-66.980469 9.402344zm82.132812-47.144531c-7.511718-13.84375-15.671874-26.046875-24.273437-36.457031 29.992187 10.242187 57.160156 26.628906 80.007813 47.644531-13.03125 6.980469-27.074219 13.042969-41.847657 18.109375-4.191406-10.179688-8.824219-19.972656-13.886719-29.296875zm-194.265624 0c-5.0625 9.324219-9.695313 19.117187-13.886719 29.296875-14.773438-5.066406-28.816407-11.132813-41.847657-18.109375 22.847657-21.015625 50.015626-37.402344 80.007813-47.644531-8.601563 10.410156-16.757813 22.609374-24.273437 36.457031zm-24.035157 57.492187c-10.238281 32.753906-16.257812 68.460938-17.554687 104.996094h-86.765625c3.210937-48.753906 21.933593-93.339844 51.292969-128.832031 16.292968 9.34375 34.136718 17.335937 53.027343 23.835937zm-17.554687 134.996094c1.296875 36.539062 7.316406 72.242188 17.554687 104.996094-18.890625 6.5-36.734375 14.492187-53.027343 23.835937-29.359376-35.492187-48.082032-80.078125-51.292969-128.832031zm27.703125 133.191406c4.191406 10.179688 8.824219 19.972656 13.886719 29.296875 7.515624 13.84375 15.671874 26.046875 24.273437 36.457031-29.992187-10.242187-57.160156-26.628906-80.003906-47.644531 13.023437-6.976562 27.070312-13.042969 41.84375-18.109375zm208.152343 29.296875c5.0625-9.324219 9.695313-19.117187 13.886719-29.296875 14.773438 5.066406 28.816407 11.132813 41.847657 18.109375-22.847657 21.015625-50.015626 37.402344-80.007813 47.644531 8.601563-10.410156 16.757813-22.609374 24.273437-36.457031zm24.035157-57.492187c10.238281-32.753906 16.257812-68.460938 17.554687-104.996094h86.765625c-3.210937 48.753906-21.933593 93.339844-51.292969 128.832031-16.292968-9.34375-34.136718-17.335937-53.027343-23.835937zm17.554687-134.996094c-1.296875-36.539062-7.316406-72.242188-17.554687-104.996094 18.890625-6.5 36.734375-14.492187 53.027343-23.835937 29.359376 35.492187 48.082032 80.078125 51.292969 128.832031zm0 0"/>`
    }
}

class Gallery extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="m241 507.355469v-108.84375c-27.257812 1.039062-54.253906 4.882812-79.941406 11.253906 4.136718 9.996094 8.664062 19.570313 13.566406 28.609375 19.566406 36.054688 43.882812 60.976562 66.375 68.980469zm0 0"/><path d="m337.375 438.375c4.902344-9.035156 9.429688-18.613281 13.566406-28.609375-25.6875-6.371094-52.683594-10.214844-79.941406-11.253906v108.84375c22.492188-8.003907 46.808594-32.925781 66.375-68.980469zm0 0"/><path d="m241 368.492188v-99.816407h-109.390625c1.367187 38.96875 8.015625 77.710938 19.148437 112.785157 28.980469-7.433594 59.496094-11.875 90.242188-12.96875zm0 0"/><path d="m241 238.679688v-99.816407c-30.746094-1.09375-61.261719-5.535156-90.242188-12.964843-11.132812 35.074218-17.78125 73.8125-19.148437 112.78125zm0 0"/><path d="m379.953125 89.128906c18.246094-6.152344 35.542969-13.640625 51.449219-22.347656-27.929688-26.230469-61.714844-46.300781-99.167969-57.984375 11.21875 12.675781 21.832031 28.050781 31.503906 45.875 5.941407 10.941406 11.347657 22.464844 16.214844 34.457031zm0 0"/><path d="m174.625 68.980469c-4.902344 9.039062-9.429688 18.613281-13.566406 28.609375 25.6875 6.371094 52.683594 10.214844 79.941406 11.253906v-108.84375c-22.492188 8.003906-46.808594 32.925781-66.375 68.980469zm0 0"/><path d="m271 268.675781v99.816407c30.75 1.097656 61.261719 5.535156 90.242188 12.96875 11.132812-35.074219 17.78125-73.816407 19.152343-112.785157zm0 0"/><path d="m271 138.863281v99.816407h109.390625c-1.367187-38.96875-8.015625-77.707032-19.148437-112.78125-28.980469 7.429687-59.492188 11.871093-90.242188 12.964843zm0 0"/><path d="m121.878906 390.039062c-11.992187-37.757812-18.960937-79.082031-20.300781-121.363281h-101.578125c3.285156 56.679688 25.058594 108.472657 59.367188 149.433594 19.109374-11.089844 40.175781-20.503906 62.511718-28.070313zm0 0"/><path d="m379.953125 418.226562c-4.871094 11.992188-10.277344 23.515626-16.214844 34.460938-9.671875 17.824219-20.285156 33.195312-31.503906 45.871094 37.453125-11.683594 71.238281-31.753906 99.171875-57.984375-15.910156-8.707031-33.207031-16.195313-51.453125-22.347657zm0 0"/><path d="m132.046875 418.226562c-18.246094 6.152344-35.542969 13.640626-51.449219 22.347657 27.929688 26.234375 61.714844 46.300781 99.167969 57.988281-11.214844-12.679688-21.828125-28.050781-31.503906-45.875-5.941407-10.945312-11.347657-22.46875-16.214844-34.460938zm0 0"/><path d="m390.121094 117.316406c11.992187 37.757813 18.960937 79.082032 20.300781 121.363282h101.578125c-3.285156-56.679688-25.058594-108.46875-59.367188-149.429688-19.109374 11.089844-40.175781 20.5-62.511718 28.066406zm0 0"/><path d="m390.121094 390.039062c22.335937 7.566407 43.402344 16.976563 62.511718 28.066407 34.308594-40.960938 56.082032-92.753907 59.367188-149.429688h-101.578125c-1.339844 42.28125-8.308594 83.605469-20.300781 121.363281zm0 0"/><path d="m271 0v108.84375c27.257812-1.039062 54.253906-4.882812 79.941406-11.25-4.136718-10-8.660156-19.574219-13.566406-28.613281-19.566406-36.054688-43.882812-60.976563-66.375-68.980469zm0 0"/><path d="m121.878906 117.316406c-22.335937-7.566406-43.402344-16.976562-62.511718-28.066406-34.3125 40.960938-56.082032 92.753906-59.367188 149.429688h101.578125c1.339844-42.28125 8.308594-83.605469 20.300781-121.363282zm0 0"/><path d="m132.046875 89.128906c4.871094-11.992187 10.277344-23.515625 16.214844-34.457031 9.671875-17.828125 20.285156-33.199219 31.503906-45.875-37.453125 11.683594-71.238281 31.753906-99.171875 57.984375 15.910156 8.707031 33.207031 16.195312 51.453125 22.347656zm0 0"/>`
    }
}

class Gallery$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="m23.25 18h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m23.25 21h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m23.25 24h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m22.25 15h-20.5c-.965 0-1.75-.785-1.75-1.75v-11.5c0-.965.785-1.75 1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v11.5c0 .965-.785 1.75-1.75 1.75zm-20.5-13.5c-.138 0-.25.112-.25.25v11.5c0 .138.112.25.25.25h20.5c.138 0 .25-.112.25-.25v-11.5c0-.138-.112-.25-.25-.25z"/><path d="m.75 12.9c-.202 0-.403-.081-.551-.241-.281-.304-.263-.778.042-1.06l5.54-5.12c.692-.641 1.759-.62 2.429.05l3.61 3.61c.098.098.262.098.36 0l5.619-5.63c.669-.652 1.72-.68 2.401-.068l3.549 3.159c.31.275.337.75.062 1.06-.274.309-.749.338-1.059.062l-3.55-3.16c-.098-.088-.249-.079-.348.017l-5.613 5.621c-.684.684-1.796.685-2.48 0l-3.611-3.61c-.099-.099-.25-.104-.351-.009l-5.54 5.12c-.144.134-.327.199-.509.199z"/>`
    }
}

class ImageCenter extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="M0,448h512v64H0V448z"/>
                <path d="M0,0h512v64H0V0z"/>
                <path d="M128,394.6h256c17.7,0,32-14.3,32-32v-224c0-17.7-14.3-32-32-32H128c-17.7,0-32,14.3-32,32v224
                C96,380.2,110.3,394.6,128,394.6L128,394.6z M160,170.6h192v160l-96-96l-96,96L160,170.6z"/>
                `
    }
}

class ImageLeft extends ICON {
    config() {
        return {
            viewBox: `0 0 467.765 467.765`
        }
    }
    path() {
        return `<path d="m321.588 175.412h146.176v58.471h-146.176z"/>
                <path d="m0 292.353h467.765v58.471h-467.765z"/>
                <path d="m0 409.294h350.824v58.471h-350.824z"/>
                <path d="m321.588 58.471h146.176v58.471h-146.176z"/>
                <path d="m29.235 263.118h233.882c16.145 0 29.235-13.09 29.235-29.235v-204.648c.001-16.145-13.089-29.235-29.234-29.235h-233.883c-16.145 0-29.235 13.09-29.235 29.235v204.647c0 16.145 13.09 29.236 29.235 29.236zm29.236-204.647h175.412v146.176l-87.706-87.706-87.706 87.706z"/>
                `
    }
}

class ImageRight extends ICON {
    config() {
        return {
            viewBox: `0 0 467.765 467.765`
        }
    }
    path() {
        return `<path d="m0 175.412h146.176v58.471h-146.176z"/>
                <path d="m0 292.353h467.765v58.471h-467.765z"/>
                <path d="m0 409.294h350.824v58.471h-350.824z"/>
                <path d="m0 58.471h146.176v58.471h-146.176z"/>
                <path d="m438.529 0h-233.882c-16.145 0-29.235 13.09-29.235 29.235v204.647c0 16.145 13.09 29.235 29.235 29.235h233.882c16.145 0 29.235-13.09 29.235-29.235v-204.647c.001-16.145-13.09-29.235-29.235-29.235zm-29.235 204.647-87.706-87.706-87.706 87.706v-146.176h175.412z"/>
                `
    }
}

class Image extends ICON {
    config() {
        return {
            viewBox: `0 0 19 19`
        }
    }
    path() {
        return `
                <path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z"/>
                `
    }
}

class InsertTable extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
                <path d="M3 6v3h4V6H3zm0 4v3h4v-3H3zm0 4v3h4v-3H3zm5 3h4v-3H8v3zm5 0h4v-3h-4v3zm4-4v-3h-4v3h4zm0-4V6h-4v3h4zm1.5 8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V4c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13zM12 13v-3H8v3h4zm0-4V6H8v3h4z"/>
                `
    }
}

class Information extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<g>
        <circle cx="256" cy="378.5" r="25"/>
        <path d="M256,0C114.516,0,0,114.497,0,256c0,141.484,114.497,256,256,256c141.484,0,256-114.497,256-256
            C512,114.516,397.503,0,256,0z M256,472c-119.377,0-216-96.607-216-216c0-119.377,96.607-216,216-216
            c119.377,0,216,96.607,216,216C472,375.377,375.393,472,256,472z"/>
        <path d="M256,128.5c-44.112,0-80,35.888-80,80c0,11.046,8.954,20,20,20s20-8.954,20-20c0-22.056,17.944-40,40-40
            c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40c-11.046,0-20,8.954-20,20v50c0,11.046,8.954,20,20,20
            c11.046,0,20-8.954,20-20v-32.531c34.466-8.903,60-40.26,60-77.469C336,164.388,300.112,128.5,256,128.5z"/>
    </g>`
    }
}

class Incomes extends ICON {
    config() {
        return {
            viewBox: `0 0 32 32`
        }
    }
    path() {
        return `<path d="M32,22.327c0-1.705-1.387-3.093-3.092-3.093c-0.637,0-1.227,0.199-1.717,0.528h-0.002c0,0.003-0.002,0.003-0.002,0.005
        c-0.207,0.142-0.398,0.301-0.566,0.485l0.008,0.008c-0.641,0.576-1.666,1.543-2.41,2.423c-0.16-0.412-0.404-0.787-0.717-1.093
        c-3.053-2.688-6.723-3.78-10.93-3.78c-1.377,0-2.705,0.149-3.961,0.424c-0.037-0.457-0.063-0.735-0.063-0.735H0.359
        c0,0-0.359,2.998-0.359,6.694c0,3.697,0.359,6.694,0.359,6.694h8.189c0,0,0.072-0.78,0.15-1.893
        c1.219-0.205,2.465,0.116,3.908,1.012c1.828,1.195,4.08,1.902,6.518,1.902c2.472,0,4.594-0.729,6.36-1.955l0.002,0.002
        c0.019-0.015,0.041-0.031,0.068-0.052c0.5-0.353,0.973-0.741,1.413-1.168c0.347-0.354,0.814-0.807,1.519-1.495
        c2.361-2.32,2.652-2.781,2.652-2.781s-0.007,0.002-0.009,0.002C31.668,23.909,32,23.159,32,22.327z M30.121,23.54
        c-0.414,0.41-2.166,2.215-2.639,2.678c-1.229,1.207-1.801,1.771-2.072,2.084l-0.004-0.006c-0.188,0.168-0.385,0.322-0.586,0.47
        c-1.584,1.071-3.557,1.711-5.695,1.711c-2.158,0-4.146-0.647-5.736-1.735h-0.012c-1.375-0.841-2.988-1.354-4.584-1.197
        c0.063-1.103,0.115-2.312,0.115-3.349c0-1.44-0.1-3.211-0.193-4.567c1.215-0.274,2.512-0.428,3.857-0.428
        c4.12,0,7.762,1.362,9.995,3.495c0.263,0.293,0.429,0.679,0.429,1.101c0,0.916-0.744,1.658-1.658,1.658
        c-0.035,0-0.067-0.009-0.103-0.011l-0.004,0.021c-0.854-0.03-2.188-0.389-4.442-1.25l-0.513,1.34
        c2.384,0.91,3.953,1.318,5.066,1.347v-0.01c1.395-0.005,2.572-0.933,2.955-2.201v0.002c0.482-0.801,2.287-2.472,3.312-3.383
        l0.002,0.002c0.011-0.011,0.021-0.019,0.027-0.026c0.19-0.171,0.354-0.313,0.473-0.416c0.216-0.136,0.44-0.193,0.798-0.193
        c0.914,0,1.655,0.744,1.655,1.656C30.564,22.786,30.363,23.219,30.121,23.54z"/>
    <path d="M21.973,18.611c5.105,0,9.26-4.153,9.26-9.259s-4.152-9.26-9.26-9.26c-5.106,0-9.26,4.154-9.26,9.26
        S16.865,18.611,21.973,18.611z M21.973,1.706c4.215,0,7.646,3.432,7.646,7.646c0,4.214-3.432,7.646-7.646,7.646
        c-4.217,0-7.646-3.432-7.646-7.646C14.327,5.137,17.756,1.706,21.973,1.706z"/>
    <path d="M19.545,9.04c0.197,0.23,0.48,0.441,0.848,0.637c0.365,0.193,0.855,0.338,1.467,0.43
        c0.174,0.029,0.348,0.066,0.521,0.115c0.178,0.045,0.338,0.109,0.486,0.188c0.146,0.08,0.268,0.176,0.361,0.287
        c0.094,0.109,0.141,0.242,0.141,0.393c0,0.18-0.09,0.324-0.27,0.438c-0.184,0.111-0.406,0.166-0.682,0.166
        c-0.209,0-0.396-0.016-0.559-0.049c-0.158-0.031-0.309-0.082-0.439-0.15c-0.132-0.068-0.262-0.154-0.389-0.26
        c-0.125-0.104-0.254-0.227-0.385-0.371h-1.51v2.266h1.51v-0.338c0.072,0.037,0.146,0.072,0.225,0.104
        c0.072,0.033,0.15,0.066,0.229,0.102v0.885h1.51v-0.681c0.324-0.021,0.625-0.09,0.9-0.205c0.277-0.113,0.518-0.266,0.719-0.453
        c0.201-0.186,0.359-0.404,0.475-0.652s0.174-0.516,0.174-0.803c0-0.15-0.025-0.346-0.082-0.588
        c-0.053-0.24-0.178-0.486-0.371-0.734c-0.191-0.248-0.477-0.477-0.846-0.689c-0.371-0.213-0.869-0.365-1.494-0.459
        c-1.008-0.15-1.51-0.459-1.51-0.926c0-0.166,0.078-0.32,0.24-0.465c0.162-0.143,0.396-0.215,0.695-0.215
        c0.209,0,0.391,0.018,0.545,0.053c0.154,0.037,0.297,0.09,0.426,0.156c0.129,0.068,0.252,0.154,0.367,0.26
        c0.115,0.104,0.232,0.225,0.355,0.361h1.52V5.577h-1.508V5.9c-0.18-0.109-0.383-0.195-0.605-0.26V4.82H21.1v0.713
        c-0.295,0.043-0.564,0.129-0.812,0.254s-0.463,0.283-0.646,0.475c-0.185,0.189-0.326,0.408-0.427,0.652
        c-0.103,0.244-0.151,0.502-0.151,0.777c0,0.186,0.031,0.4,0.092,0.641C19.219,8.572,19.348,8.81,19.545,9.04z"/>`
    }
}

class Home extends ICON {
    config() {
        return {
            viewBox: `0 0 576 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M541 229.16l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v51.33L308.19 39.14a32.16 32.16 0 0 0-40.38 0L35 229.16a8 8 0 0 0-1.16 11.24l10.1 12.41a8 8 0 0 0 11.2 1.19L96 220.62v243a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-128l64 .3V464a16 16 0 0 0 16 16l128-.33a16 16 0 0 0 16-16V220.62L520.86 254a8 8 0 0 0 11.25-1.16l10.1-12.41a8 8 0 0 0-1.21-11.27zm-93.11 218.59h.1l-96 .3V319.88a16.05 16.05 0 0 0-15.95-16l-96-.27a16 16 0 0 0-16.05 16v128.14H128V194.51L288 63.94l160 130.57z" class=""></path>`
    }
}

class Lock extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<path d="M437.333,192h-32v-42.667C405.333,66.99,338.344,0,256,0S106.667,66.99,106.667,149.333V192h-32
        C68.771,192,64,196.771,64,202.667v266.667C64,492.865,83.135,512,106.667,512h298.667C428.865,512,448,492.865,448,469.333
        V202.667C448,196.771,443.229,192,437.333,192z M287.938,414.823c0.333,3.01-0.635,6.031-2.656,8.292
        c-2.021,2.26-4.917,3.552-7.948,3.552h-42.667c-3.031,0-5.927-1.292-7.948-3.552c-2.021-2.26-2.99-5.281-2.656-8.292l6.729-60.51
        c-10.927-7.948-17.458-20.521-17.458-34.313c0-23.531,19.135-42.667,42.667-42.667s42.667,19.135,42.667,42.667
        c0,13.792-6.531,26.365-17.458,34.313L287.938,414.823z M341.333,192H170.667v-42.667C170.667,102.281,208.948,64,256,64
        s85.333,38.281,85.333,85.333V192z"/>`
    }
}

class Login extends ICON {
    config() {
        return {
            viewBox: `0 0 95.667 95.667`
        }
    }
    path() {
        return `<path d="M39.173,72.344l39.447-22.777c0.619-0.356,1-1.018,1-1.731s-0.381-1.375-1-1.732L39.173,23.324
        c-0.619-0.357-1.381-0.357-2,0c-0.619,0.357-1,1.018-1,1.732v10.605H2.121c-1.104,0-2,0.896-2,2v20.344c0,1.104,0.896,2,2,2
        h34.053v10.604c0,0.716,0.381,1.375,1,1.732c0.31,0.18,0.655,0.268,1,0.268C38.519,72.609,38.864,72.521,39.173,72.344z"/>
        <path d="M80.775,0H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c2.632,0,4.771,2.141,4.771,4.771v66.125
        c0,2.631-2.141,4.771-4.771,4.771H40.026c-1.104,0-2,0.896-2,2v6c0,1.104,0.896,2,2,2h40.749c8.146,0,14.771-6.627,14.771-14.771
        V14.772C95.546,6.627,88.92,0,80.775,0z"/>
        `
    }
}

class Link extends ICON {
    config() {
        return {
            viewBox: `0 0 54.971 54.971`
        }
    }
    path() {
        return `<path d="M51.173,3.801c-5.068-5.068-13.315-5.066-18.384,0l-9.192,9.192c-0.781,0.781-0.781,2.047,0,2.828
		c0.781,0.781,2.047,0.781,2.828,0l9.192-9.192c1.691-1.69,3.951-2.622,6.363-2.622c2.413,0,4.673,0.932,6.364,2.623
		s2.623,3.951,2.623,6.364c0,2.412-0.932,4.672-2.623,6.363L36.325,31.379c-3.51,3.508-9.219,3.508-12.729,0
		c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.048,0,2.828c2.534,2.534,5.863,3.801,9.192,3.801s6.658-1.267,9.192-3.801
        l12.021-12.021c2.447-2.446,3.795-5.711,3.795-9.192C54.968,9.512,53.62,6.248,51.173,3.801z"/>
        <path d="M27.132,40.57l-7.778,7.778c-1.691,1.691-3.951,2.623-6.364,2.623c-2.412,0-4.673-0.932-6.364-2.623
		c-3.509-3.509-3.509-9.219,0-12.728L17.94,24.306c1.691-1.69,3.951-2.622,6.364-2.622c2.412,0,4.672,0.932,6.363,2.622
		c0.781,0.781,2.047,0.781,2.828,0s0.781-2.047,0-2.828c-5.067-5.067-13.314-5.068-18.384,0L3.797,32.793
		c-2.446,2.446-3.794,5.711-3.794,9.192c0,3.48,1.348,6.745,3.795,9.191c2.446,2.447,5.711,3.795,9.191,3.795
		c3.481,0,6.746-1.348,9.192-3.795l7.778-7.778c0.781-0.781,0.781-2.047,0-2.828S27.913,39.789,27.132,40.57z"/>
        `
    }
}

class Like extends ICON {
    config() {
        return {
            viewBox: `0 0 478.2 478.2`
        }
    }
    path() {
        return `<path d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5
		c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1
		c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7
		c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61
		c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3
		c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3
		c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1
		c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4
		c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8
		c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2
		c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9
		c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7
		c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3
		c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3
		C444.875,295.3,440.675,304.4,431.975,313.4z"/>`
    }
}

class ListOrderDecimal extends ICON {
    config() {
        return {
            viewBox: `0 0 511.994 511.994`
        }
    }
    path() {
        return `
        <path d="M35.537,292.171l-0.225-0.863l14.613-15.857c9.495-10.333,16.006-18.227,19.544-23.469
        c3.533-5.241,5.301-11.326,5.301-18.148c0-10.135-3.326-18.146-9.974-23.984c-6.65-5.831-15.909-8.761-27.775-8.761
        c-11.174,0-20.149,3.467-26.923,10.412c-6.774,6.945-10.038,15.306-9.789,25.294l0.15,0.339h24.473v0.002
        c0-4.403,1.076-8.909,3.227-12.097c2.151-3.19,5.105-4.731,8.863-4.731c4.202,0,7.355,1.261,9.457,3.731
        c2.1,2.474,3.152,5.801,3.152,9.955c0,2.917-1.039,6.36-3.115,10.313c-2.076,3.956-5.719,8.458-10.122,13.501L1.28,294.304v15.478
        h74.847v-17.611H35.537z"/>
        <path d="M73.066,427.032c-3.265-4.33-7.789-7.542-13.574-9.668c5.092-2.325,9.16-5.55,12.2-9.677
        c3.042-4.128,4.561-8.643,4.561-13.534c0-9.84-3.511-17.442-10.531-22.806c-7.02-5.367-16.389-8.046-28.109-8.046
        c-10.087,0-18.665,2.67-25.736,8.011c-7.071,5.341-10.459,12.695-10.161,21.298l0.15,0.83h24.327c0-4.403,1.233-5.774,3.707-7.654
        c2.472-1.88,5.341-3.009,8.603-3.009c4.154,0,7.317,1.065,9.495,3.39c2.175,2.325,3.262,5.142,3.262,8.555
        c0,4.301-1.211,7.868-3.632,10.291c-2.424,2.424-5.884,3.837-10.384,3.837H25.495v17.611h11.749c4.995,0,8.863,1.475,11.608,3.872
        c2.745,2.399,4.117,6.358,4.117,11.597c0,3.76-1.312,6.943-3.929,9.415c-2.622,2.472-6.133,3.74-10.534,3.74
        c-3.857,0-7.13-1.662-9.827-4.009c-2.697-2.347-4.042-4.803-4.042-9.206H0.159l-0.147,0.951
        c-0.247,10.087,3.423,18.042,11.013,23.357c7.59,5.314,16.453,8.099,26.588,8.099c11.769,0,21.435-2.765,29.001-8.427
        c7.566-5.66,11.346-13.406,11.346-23.295C77.96,436.522,76.331,431.36,73.066,427.032z"/>
        <polygon points="51.911,127.068 51.911,37.719 1.28,45.283 1.28,63.228 25.495,63.228 25.495,127.068 1.28,127.068 1.28,146.88 
        76.126,146.88 76.126,127.068"/>
        <rect x="148.767" y="362.606" width="363.227" height="72.645"/>
        <rect x="148.767" y="219.517" width="363.227" height="72.645"/>
        <rect x="148.767" y="72.034" width="363.227" height="72.645"/>
    `
    }
}

class ListUnsequenceDisc extends ICON {
    config() {
        return {
            viewBox: `0 0 60.123 60.123`
        }
    }
    path() {
        return `
        <path d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"/>
        <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3 C60.124,31.719,58.781,33.062,57.124,33.062z"/>
        <path d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"/>
        <circle cx="4.029" cy="11.463" r="4.029"/>
        <circle cx="4.029" cy="30.062" r="4.029"/>
        <circle cx="4.029" cy="48.661" r="4.029"/>
    `
    }
}

class ManUser extends ICON {
    config() {
        return {
            viewBox: `0 0 297 297`
        }
    }
    path() {
        return `
        <path d="M46.169,61.873c3.286,2.507,7.98,1.876,10.488-1.408c22.071-28.917,55.546-45.5,91.843-45.5s69.772,16.584,91.843,45.5   c1.473,1.929,3.7,2.942,5.954,2.942c1.582,0,3.179-0.5,4.534-1.534c3.284-2.508,3.914-7.203,1.408-10.488   C227.312,18.729,189.501,0,148.5,0S69.688,18.729,44.762,51.385C42.255,54.67,42.885,59.365,46.169,61.873z"/>
	    <path d="M228.037,101.786c0,12.885 10.484,23.369 23.369,23.369s23.369-10.484 23.369-23.369-10.484-23.369-23.369-23.369-23.369,10.483-23.369,23.369z"/>
	    <path d="M275.322,132.91c-0.054-0.018-5.942-1.825-5.942-1.825-2.132-0.651-4.448-0.25-6.233,1.086l-11.741,8.791-11.741-8.791c-1.786-1.337-4.103-1.738-6.233-1.086 0,0-5.888,1.807-5.942,1.825-9.474,3.159-15.839,11.99-15.839,21.976v35.329c0,1.363 0.398,2.696 1.148,3.834l11.848,18.031v47.352c0,3.857 3.126,6.983 6.983,6.983h39.553c3.857,0 6.983-3.126 6.983-6.983v-47.352l11.848-18.031c0.749-1.139 1.148-2.472 1.148-3.834v-35.329c-5.68434e-14-9.986-6.366-18.817-15.84-21.976z"/>
	    <path d="M69.51,132.91c-0.054-0.018-5.942-1.825-5.942-1.825-2.133-0.651-4.447-0.25-6.233,1.086l-11.741,8.791-11.741-8.791c-1.785-1.337-4.103-1.738-6.233-1.086 0,0-5.888,1.807-5.942,1.825-9.474,3.159-15.839,11.99-15.839,21.976v35.329c0,1.363 0.398,2.696 1.148,3.834l11.848,18.031v47.352c0,3.857 3.126,6.983 6.983,6.983h39.552c3.857,0 6.983-3.126 6.983-6.983v-47.352l11.848-18.031c0.749-1.139 1.148-2.472 1.148-3.834v-35.329c0-9.986-6.366-18.817-15.839-21.976z"/>
	    <path d="M45.594,125.155c12.885,0 23.369-10.484 23.369-23.369s-10.484-23.369-23.369-23.369-23.37,10.483-23.37,23.369 10.484,23.369 23.37,23.369z"/>
	    <path d="M178.642,68.851c0-16.62-13.522-30.142-30.142-30.142s-30.142,13.522-30.142,30.142c0,16.621 13.522,30.142 30.142,30.142s30.142-13.521 30.142-30.142z"/>
        <path d="M181.607,113.601l-.05-.016-8.603-2.64c-1.357-0.417-2.807,0.301-3.295,1.64l-18.09,49.635c-1.044,2.863-5.093,2.863-6.137,0l-18.09-49.635c-0.394-1.081-1.414-1.759-2.508-1.759-0.259,0-9.38,2.755-9.38,2.755-10.99,3.662-18.332,13.85-18.332,25.37v52.506c0,0.521 0.153,1.031 0.439,1.467l18.876,28.724v72.68c0,1.476 1.196,2.672 2.672,2.672h58.783c1.476,0 2.672-1.196 2.672-2.672v-72.68l18.876-28.724c0.286-0.436 0.439-0.946 0.439-1.467v-52.644c-0.001-11.47-7.372-21.641-18.272-25.212z"/>
        <path d="M155.568,112.556c-0.747-0.814-1.84-1.224-2.946-1.224h-8.245c-1.105,0-2.198,0.41-2.946,1.224-1.157,1.261-1.325,3.082-0.504,4.505l4.407,6.644-2.063,17.405 4.063,10.808c0.396,1.087 1.933,1.087 2.33,0l4.063-10.808-2.063-17.405 4.407-6.644c0.822-1.423 0.654-3.244-0.503-4.505z"/>
        `
    }
}

class MarkunreadMailbox extends ICON {
    config() {
        return {
            viewBox: `0 0 33.937 33.937`
        }
    }
    path() {
        return `<path d="M27.453,8.484H13.312v2.828h14.14V28.281H4.828V11.312H7.656v5.656h2.828V5.656h8.484V0H7.656V8.484H4.828A2.836,2.836,0,0,0,2,11.312V28.281a2.836,2.836,0,0,0,2.828,2.828H27.453a2.836,2.836,0,0,0,2.828-2.828V11.312A2.836,2.836,0,0,0,27.453,8.484Z" transform="translate(0.828)"/>`
    }
}

class ManUser$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 350 350`
        }
    }
    path() {
        return `<path d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
		C104.535,132.855,136.084,171.173,175,171.173z"/>
	<path d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"/>
	<path d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"/>
	<path d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
		s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
		c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
		c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"/>`
    }
}

class PlusBlackSymbol extends ICON {
    config() {
        return {
            viewBox: `0 0 401.994 401.994`
        }
    }
    path() {
        return `<path d="M394,154.175c-5.331-5.33-11.806-7.994-19.417-7.994H255.811V27.406c0-7.611-2.666-14.084-7.994-19.414
		C242.488,2.666,236.02,0,228.398,0h-54.812c-7.612,0-14.084,2.663-19.414,7.993c-5.33,5.33-7.994,11.803-7.994,19.414v118.775
		H27.407c-7.611,0-14.084,2.664-19.414,7.994S0,165.973,0,173.589v54.819c0,7.618,2.662,14.086,7.992,19.411
		c5.33,5.332,11.803,7.994,19.414,7.994h118.771V374.59c0,7.611,2.664,14.089,7.994,19.417c5.33,5.325,11.802,7.987,19.414,7.987
		h54.816c7.617,0,14.086-2.662,19.417-7.987c5.332-5.331,7.994-11.806,7.994-19.417V255.813h118.77
		c7.618,0,14.089-2.662,19.417-7.994c5.329-5.325,7.994-11.793,7.994-19.411v-54.819C401.991,165.973,399.332,159.502,394,154.175z"
		/>`
    }
}

class PencilEdit extends ICON {
    config() {
        return {
            viewBox: `0 0 528.899 528.899`
        }
    }
    path() {
        return `<path fill="currentColor" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"/>`
    }
}

class Question extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="M21,5l-9-4L3,5v6c0,5.55,3.84,10.74,9,12c2.3-0.56,4.33-1.9,5.88-3.71l-3.12-3.12c-1.94,1.29-4.58,1.07-6.29-0.64
        c-1.95-1.95-1.95-5.12,0-7.07c1.95-1.95,5.12-1.95,7.07,0c1.71,1.71,1.92,4.35,0.64,6.29l2.9,2.9C20.29,15.69,21,13.38,21,11V5z"/>
    <circle cx="12" cy="12" r="3"/>`
    }
}

class PowerSupply extends ICON {
    config() {
        return {
            viewBox: `0 0 24.303 24.303`
        }
    }
    path() {
        return `<path d="M10.269,11.298V1.883C10.269,0.844,11.113,0,12.152,0s1.883,0.844,1.883,1.883v9.415
		c0,1.039-0.844,1.883-1.883,1.883S10.269,12.337,10.269,11.298z M19.616,2.761c-0.61-0.483-1.5-0.377-1.983,0.234
		c-0.483,0.612-0.378,1.5,0.234,1.984c2.24,1.767,3.524,4.413,3.524,7.261c0,5.094-4.145,9.239-9.238,9.239
		c-5.094,0-9.239-4.145-9.239-9.239c0-2.847,1.283-5.492,3.521-7.258c0.612-0.483,0.717-1.371,0.234-1.984
		c-0.483-0.612-1.37-0.716-1.984-0.234C1.764,5.069,0.089,8.523,0.089,12.24c0,6.652,5.412,12.063,12.063,12.063
		s12.063-5.412,12.063-12.063C24.215,8.521,22.538,5.067,19.616,2.761z"/>`
    }
}

class Question$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 31.357 31.357`
        }
    }
    path() {
        return `<path d="M15.255,0c5.424,0,10.764,2.498,10.764,8.473c0,5.51-6.314,7.629-7.67,9.62c-1.018,1.481-0.678,3.562-3.475,3.562
		c-1.822,0-2.712-1.482-2.712-2.838c0-5.046,7.414-6.188,7.414-10.343c0-2.287-1.522-3.643-4.066-3.643
		c-5.424,0-3.306,5.592-7.414,5.592c-1.483,0-2.756-0.89-2.756-2.584C5.339,3.683,10.084,0,15.255,0z M15.044,24.406
		c1.904,0,3.475,1.566,3.475,3.476c0,1.91-1.568,3.476-3.475,3.476c-1.907,0-3.476-1.564-3.476-3.476
		C11.568,25.973,13.137,24.406,15.044,24.406z"/>`
    }
}

class Question$2 extends ICON {
    config() {
        return {
            viewBox: `0 0 438.533 438.533`
        }
    }
    path() {
        return `<path d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
		c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
		c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
		s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
		C438.533,179.485,428.732,142.795,409.133,109.203z M255.82,356.309c0,2.662-0.862,4.853-2.573,6.563
		c-1.704,1.711-3.895,2.567-6.557,2.567h-54.823c-2.664,0-4.854-0.856-6.567-2.567c-1.714-1.711-2.57-3.901-2.57-6.563v-54.823
		c0-2.662,0.855-4.853,2.57-6.563c1.713-1.708,3.903-2.563,6.567-2.563h54.823c2.662,0,4.853,0.855,6.557,2.563
		c1.711,1.711,2.573,3.901,2.573,6.563V356.309z M325.338,187.574c-2.382,7.043-5.044,12.804-7.994,17.275
		c-2.949,4.473-7.187,9.042-12.709,13.703c-5.51,4.663-9.891,7.996-13.135,9.998c-3.23,1.995-7.898,4.713-13.982,8.135
		c-6.283,3.613-11.465,8.326-15.555,14.134c-4.093,5.804-6.139,10.513-6.139,14.126c0,2.67-0.862,4.859-2.574,6.571
		c-1.707,1.711-3.897,2.566-6.56,2.566h-54.82c-2.664,0-4.854-0.855-6.567-2.566c-1.715-1.712-2.568-3.901-2.568-6.571v-10.279
		c0-12.752,4.993-24.701,14.987-35.832c9.994-11.136,20.986-19.368,32.979-24.698c9.13-4.186,15.604-8.47,19.41-12.847
		c3.812-4.377,5.715-10.188,5.715-17.417c0-6.283-3.572-11.897-10.711-16.849c-7.139-4.947-15.27-7.421-24.409-7.421
		c-9.9,0-18.082,2.285-24.555,6.855c-6.283,4.565-14.465,13.322-24.554,26.263c-1.713,2.286-4.093,3.431-7.139,3.431
		c-2.284,0-4.093-0.57-5.424-1.709L121.35,145.89c-4.377-3.427-5.138-7.422-2.286-11.991
		c24.366-40.542,59.672-60.813,105.922-60.813c16.563,0,32.744,3.903,48.541,11.708c15.796,7.801,28.979,18.842,39.546,33.119
		c10.554,14.272,15.845,29.787,15.845,46.537C328.904,172.824,327.71,180.529,325.338,187.574z"/>`
    }
}

class ReloadSymbol extends ICON {
    config() {
        return {
            viewBox: `0 0 102.455 102.455`
        }
    }
    path() {
        return `<path d="M61.977,17.156L48.277,30.855c-0.789,0.79-2.074,0.79-2.866,0l-0.197-0.202V20.568
        c-16.543,1.156-29.65,14.975-29.65,31.806c0,11.82,6.487,22.617,16.937,28.175c2.631,1.402,3.631,4.671,2.233,7.31
        c-1.403,2.635-4.671,3.634-7.306,2.231c-13.983-7.44-22.67-21.889-22.67-37.716c0-22.792,17.953-41.47,40.457-42.641V0.792
        l0.197-0.199c0.792-0.79,2.077-0.79,2.866,0l13.699,13.696C62.771,15.083,62.771,16.369,61.977,17.156z
        M54.174,101.861L40.477,88.166c-0.792-0.79-0.792-2.074,0-2.864l13.697-13.695c0.791-0.794,2.074-0.794,2.868,0z"/>
        <path d="M54.174,101.861L40.477,88.166c-0.792-0.79-0.792-2.074,0-2.864l13.697-13.695c0.791-0.794,2.074-0.794,2.868,0
        l0.191,0.198l0.007,10.082C73.776,80.733,86.89,66.918,86.89,50.084c0-11.82-6.491-22.614-16.939-28.175
        c-2.635-1.4-3.635-4.675-2.234-7.31c1.406-2.635,4.678-3.634,7.312-2.231c13.979,7.44,22.669,21.892,22.669,37.716
        c0,22.794-17.953,41.469-40.457,42.636v8.942l-0.198,0.198C56.248,102.652,54.965,102.652,54.174,101.861z"/>
        `
    }
}

class Report extends ICON {
    config() {
        return {
            viewBox: `-1 0 460 460`
        }
    }
    path() {
        return `<path d="m7.515625 460h333.941406c4.417969 0 7.542969-4.078125 7.542969-8.5v-172.628906l106.921875-106.929688c3.148437-3.09375 3.195313-8.152344.105469-11.304687l-42.546875-42.601563c-3.199219-3.121094-8.304688-3.125-11.507813-.007812l-52.972656 52.652344v-81.230469c.085938-2.09375-.679688-4.132813-2.117188-5.660157l-80.835937-81.199218c-1.429687-1.570313-3.425781-2.5039065-5.546875-2.589844h-252.984375c-4.414063 0-7.515625 4.078125-7.515625 8.496094v443.007812c0 4.417969 3.101562 8.496094 7.515625 8.496094zm255.398437-173.386719 24.648438 24.648438-37.027344 12.378906zm39.441407 16.8125-31.609375-31.605469 101.515625-101.289062 31.382812 31.382812zm105.519531-168.425781 31.300781 31.300781-24.234375 24.289063-31.351562-31.359375zm-138.875-107.191406 53.144531 53.191406h-53.144531zm-253-11.808594h237v73.449219c-.09375 2.023437.660156 3.992187 2.089844 5.425781 1.425781 1.4375 3.386718 2.207031 5.410156 2.125h72.5v89.644531l-79.453125 79.5c-.839844.820313-1.464844 1.832031-1.820313 2.949219l-11.28125 33.90625h-172.746093c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h167.402343l-4.820312 14.601562c-.960938 2.84375-.210938 5.992188 1.929688 8.097657.5625.5625 1.199218 1.300781 1.875 1.300781h-166.386719c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h213.003906c4.421875 0 8-3.582031 8-8s-3.578125-8-8-8h-38.691406l62.886719-20.847656c1.105468-.363282 2.105468-1 2.902343-1.84375l25.199219-25.402344v149.09375h-317zm0 0"/>
        <path d="m280.703125 383h-213.003906c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h213.003906c4.421875 0 8-3.582031 8-8s-3.578125-8-8-8zm0 0"/>
        <path d="m67.699219 279h113.003906c4.421875 0 8-3.582031 8-8s-3.578125-8-8-8h-113.003906c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8zm0 0"/>
        `
    }
}

class RubbishBin extends ICON {
    config() {
        return {
            viewBox: `0 0 408.483 408.483`
        }
    }
    path() {
        return `<path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
        H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
        c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
        c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
        c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
        c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/>
        <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
        c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/>
        `
    }
}

class Undo extends ICON {
    config() {
        return {
            viewBox: `0 0 20.697 20.697`
        }
    }
    path() {
        return `<path d="M0.358,16.978C0.148,16.934,0,16.752,0,16.542c0-7.253,8.61-8.798,10.61-9.059V4.155
        c0-0.164,0.09-0.314,0.235-0.393c0.147-0.076,0.321-0.065,0.456,0.024l9.202,6.194c0.121,0.082,0.194,0.218,0.194,0.369
        c0,0.147-0.073,0.284-0.194,0.366l-9.197,6.193c-0.137,0.09-0.313,0.1-0.457,0.023c-0.146-0.078-0.236-0.229-0.236-0.394v-3.58
        c-1.447,0.009-2.645,0.073-3.642,0.193c-4.785,0.567-6.064,3.44-6.116,3.563l0,0c-0.071,0.165-0.233,0.271-0.41,0.271
        C0.415,16.986,0.385,16.984,0.358,16.978z"/>`
    }
}

class Select extends ICON {
    config() {
        return {
            viewBox: `0 0 507.451 507.45`
        }
    }
    path() {
        return `<path d="M440.813,280.5c0-7.65,2.55-15.3,2.55-25.5s0-17.85-2.55-25.5l53.55-43.35c5.1-5.1,5.1-10.2,2.55-15.3l-51-89.25
        c-2.55-2.55-7.649-5.1-15.3-2.55l-63.75,25.5c-12.75-10.2-28.05-17.85-43.35-25.5l-10.2-66.3C315.863,5.1,308.212,0,303.113,0
        h-102c-5.101,0-12.75,5.1-12.75,10.2l-10.2,68.85c-15.3,5.1-28.05,15.3-43.35,25.5l-61.2-25.5c-7.65-2.55-12.75,0-17.851,5.1
        l-51,89.25c-2.55,2.55,0,10.2,5.1,15.3l53.55,40.8c0,7.65-2.55,15.3-2.55,25.5s0,17.85,2.55,25.5l-53.55,43.35
        c-5.1,5.101-5.1,10.2-2.55,15.301l51,89.25c2.55,2.55,7.649,5.1,15.3,2.55l63.75-25.5c12.75,10.2,28.05,17.85,43.35,25.5
        l10.2,66.3c0,5.1,5.1,10.2,12.75,10.2h102c5.101,0,12.75-5.101,12.75-10.2l10.2-66.3c15.3-7.65,30.6-15.3,43.35-25.5l63.75,25.5
        c5.101,2.55,12.75,0,15.301-5.101l51-89.25c2.55-5.1,2.55-12.75-2.551-15.3L440.813,280.5z M252.113,344.25
        c-48.45,0-89.25-40.8-89.25-89.25s40.8-89.25,89.25-89.25s89.25,40.8,89.25,89.25S300.563,344.25,252.113,344.25z"/>`
    }
}

class Select$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 41.826 41.608`
        }
    }
    path() {
        return `<g transform="translate(0.487 11.648) rotate(-9)"><path d="M2.957,4.458,14.007,9.2,2.943,7.724l.015-3.266m11.035,12.83L2.943,22.026V18.759l11.05-1.471M.015,0,0,10.3l22.07,2.943L0,16.184l.015,10.3L30.9,13.242Z" transform="translate(-0.567 7.804) rotate(-30)"/></g>`
    }
}

class Select$2 extends ICON {
    config() {
        return {
            viewBox: `-10 0 511 511.97867`
        }
    }
    path() {
        return `<path d="m21.824219 106.667969c-11.777344 0-21.335938-9.558594-21.335938-21.335938v-21.332031c0-35.285156 28.714844-64 64-64h21.335938c11.773437 0 21.332031 9.558594 21.332031 21.332031 0 11.777344-9.558594 21.335938-21.332031 21.335938h-21.335938c-11.753906 0-21.332031 9.578125-21.332031 21.332031v21.332031c0 11.777344-9.558594 21.335938-21.332031 21.335938zm0 0"/><path d="m405.824219 106.667969c-11.777344 0-21.335938-9.558594-21.335938-21.335938v-21.332031c0-11.753906-9.578125-21.332031-21.332031-21.332031h-21.332031c-11.777344 0-21.335938-9.558594-21.335938-21.335938 0-11.773437 9.558594-21.332031 21.335938-21.332031h21.332031c35.285156 0 64 28.714844 64 64v21.332031c0 11.777344-9.558594 21.335938-21.332031 21.335938zm0 0"/><path d="m256.488281 42.667969h-85.332031c-11.777344 0-21.332031-9.558594-21.332031-21.335938 0-11.773437 9.554687-21.332031 21.332031-21.332031h85.332031c11.777344 0 21.335938 9.558594 21.335938 21.332031 0 11.777344-9.558594 21.335938-21.335938 21.335938zm0 0"/><path d="m213.824219 426.667969h-42.667969c-11.777344 0-21.332031-9.558594-21.332031-21.335938 0-11.773437 9.554687-21.332031 21.332031-21.332031h42.667969c11.773437 0 21.332031 9.558594 21.332031 21.332031 0 11.777344-9.558594 21.335938-21.332031 21.335938zm0 0"/><path d="m85.824219 426.667969h-21.335938c-35.285156 0-64-28.714844-64-64v-21.335938c0-11.773437 9.558594-21.332031 21.335938-21.332031 11.773437 0 21.332031 9.558594 21.332031 21.332031v21.335938c0 11.753906 9.578125 21.332031 21.332031 21.332031h21.335938c11.773437 0 21.332031 9.558594 21.332031 21.332031 0 11.777344-9.558594 21.335938-21.332031 21.335938zm0 0"/><path d="m21.824219 277.332031c-11.777344 0-21.335938-9.554687-21.335938-21.332031v-85.332031c0-11.777344 9.558594-21.335938 21.335938-21.335938 11.773437 0 21.332031 9.558594 21.332031 21.335938v85.332031c0 11.777344-9.558594 21.332031-21.332031 21.332031zm0 0"/><path d="m405.824219 234.667969c-11.777344 0-21.335938-9.558594-21.335938-21.335938v-42.664062c0-11.777344 9.558594-21.335938 21.335938-21.335938 11.773437 0 21.332031 9.558594 21.332031 21.335938v42.664062c0 11.777344-9.558594 21.335938-21.332031 21.335938zm0 0"/><path d="m486.804688 397.3125-201.238282-201.238281c-2.625-2.625-6.101562-4.074219-9.835937-4.074219-7.679688 0-13.90625 6.230469-13.90625 13.910156v292.160156c0 7.679688 6.226562 13.910157 13.90625 13.910157 3.757812 0 7.296875-1.472657 10.007812-4.246094l83.5625-86.65625h107.710938c7.679687 0 13.910156-6.230469 13.910156-13.910156 0-3.667969-1.492187-7.253907-4.117187-9.855469zm0 0"/>`
    }
}

class TextAlignCenter extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `<path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm2.286 4c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75z"/>`
    }
}

class TextAlignJustify extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `
        <path d="M286.9,160.5h224v40h-224V160.5z"/>
        <path d="M286.9,295.9h224v40h-224V295.9z"/>
        <path d="M297.9,425.2h213v40h-213V425.2z"/>
        <path d="M286.9,28.1h224v40h-224V28.1z"/>
        <path d="M0,292.9h224v40H0V292.9z"/>
        <path d="M0,160.5h224v40H0V160.5z"/>
        <path d="M0,28.1h226.2v40H0L0,28.1z"/>
        <path d="M0,425.2h224v40H0V425.2z"/>
        `
    }
}

class TextAlignLeft extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 4c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75z"/>
        `
    }
}

class TextAlignRight extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M18 3.75a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 8a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 4a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75zm0-8a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75z"/>
        `
    }
}

class TextBold extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/>
        `
    }
}

class TextItalic extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M9.586 14.633l.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z"/>
        `
    }
}

class TextLineThrough extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M7 16.4c-.8-.4-1.5-.9-2.2-1.5a.6.6 0 0 1-.2-.5l.3-.6h1c1 1.2 2.1 1.7 3.7 1.7 1 0 1.8-.3 2.3-.6.6-.4.6-1.2.6-1.3.2-1.2-.9-2.1-.9-2.1h2.1c.3.7.4 1.2.4 1.7v.8l-.6 1.2c-.6.8-1.1 1-1.6 1.2a6 6 0 0 1-2.4.6c-1 0-1.8-.3-2.5-.6zM6.8 9L6 8.3c-.4-.5-.5-.8-.5-1.6 0-.7.1-1.3.5-1.8.4-.6 1-1 1.6-1.3a6.3 6.3 0 0 1 4.7 0 4 4 0 0 1 1.7 1l.3.7c0 .1.2.4-.2.7-.4.2-.9.1-1 0a3 3 0 0 0-1.2-1c-.4-.2-1-.3-2-.4-.7 0-1.4.2-2 .6-.8.6-1 .8-1 1.5 0 .8.5 1 1.2 1.5.6.4 1.1.7 1.9 1H6.8z"/>
        <path d="M3 10.5V9h14v1.5z"/>
        `
    }
}

class TextUnderline extends ICON {
    config() {
        return {
            viewBox: `0 0 20 20`
        }
    }
    path() {
        return `
        <path d="M3 18v-1.5h14V18zM5.2 10V3.6c0-.4.4-.6.8-.6.3 0 .7.2.7.6v6.2c0 2 1.3 2.8 3.2 2.8 1.9 0 3.4-.9 3.4-2.9V3.6c0-.3.4-.5.8-.5.3 0 .7.2.7.5V10c0 2.7-2.2 4-4.9 4-2.6 0-4.7-1.2-4.7-4z"/>
        `
    }
}

class Text extends ICON {
    config() {
        return {
            viewBox: `0 0 467.765 467.765`
        }
    }
    path() {
        return `
        <path d="M58.471 0v87.706h58.471v-29.235h87.706v350.824h-58.471v58.471h175.412v-58.471h-58.471v-350.824h87.706v29.235h58.471v-87.706z"/>
        `
    }
}

class TextA extends ICON {
    config() {
        return {
            viewBox: `0  0 475.082 475.082`
        }
    }
    path() {
        return `
        <path d="M473.371,433.11c-10.657-3.997-20.458-6.563-29.407-7.706c-8.945-0.767-15.516-2.95-19.701-6.567
		c-2.475-1.529-5.808-6.95-9.996-16.279c-7.806-15.604-13.989-29.786-18.555-42.537c-7.427-20.181-13.617-35.789-18.565-46.829
		c-10.845-25.311-19.982-47.678-27.401-67.092c-4.001-10.466-15.797-38.731-35.405-84.796L255.813,24.265l-3.142-5.996h-15.129
		h-21.414l-79.94,206.704L68.523,400.847c-5.33,9.896-9.9,16.372-13.706,19.417c-3.996,2.848-14.466,5.805-31.405,8.843
		c-11.042,2.102-18.654,3.812-22.841,5.141L0,456.812h5.996c16.37,0,32.264-1.334,47.679-3.997l13.706-2.279
		c53.868,3.806,87.082,5.708,99.642,5.708c0.381-1.902,0.571-4.476,0.571-7.706c0-5.715-0.094-11.231-0.287-16.563
		c-3.996-0.568-7.851-1.143-11.561-1.711c-3.711-0.575-6.567-1.047-8.565-1.431c-1.997-0.373-3.284-0.568-3.855-0.568
		c-14.657-2.094-24.46-5.14-29.407-9.134c-3.236-2.282-4.854-6.375-4.854-12.278c0-3.806,2.19-11.796,6.567-23.982
		c14.277-39.776,24.172-65.856,29.692-78.224l128.483,0.568l26.269,65.096l13.411,32.541c1.144,3.241,1.711,6.283,1.711,9.138
		s-1.14,5.428-3.426,7.707c-2.285,1.905-8.753,4.093-19.417,6.563l-37.404,7.994c-0.763,6.283-1.136,13.702-1.136,22.271
		l16.56-0.575l57.103-3.138c10.656-0.38,23.51-0.575,38.547-0.575c18.264,0,36.251,0.763,53.957,2.282
		c21.313,1.523,39.588,2.283,54.819,2.283c0.192-2.283,0.281-4.754,0.281-7.423C475.082,445.957,474.513,440.537,473.371,433.11z
		 M251.245,270.941c-2.666,0-7.662-0.052-14.989-0.144c-7.327-0.089-18.649-0.233-33.973-0.425
		c-15.321-0.195-29.93-0.383-43.824-0.574l48.535-128.477c7.424,15.037,16.178,35.117,26.264,60.242
		c11.425,27.79,20.179,50.727,26.273,68.809L251.245,270.941z"/>
        `
    }
}

class TextBackground extends ICON {
    config() {
        return {
            viewBox: `0 0 60 60`
        }
    }
    path() {
        return `
        <path d="M0,0.5v59h60v-59H0z M50,15.5c0,1.654-1.346,3-3,3s-3-1.346-3-3H33v30h2c1.654,0,3,1.346,3,3s-1.346,3-3,3H25
		c-1.654,0-3-1.346-3-3s1.346-3,3-3h2v-30H16c0,1.654-1.346,3-3,3s-3-1.346-3-3v-3.145c0-1.574,1.281-2.855,2.855-2.855h34.289
		C48.719,9.5,50,10.781,50,12.355V15.5z"/>
        `
    }
}

class Trash extends ICON {
	config() {
		return {
			viewBox: `0 0 486.4 486.4`
		}
	}
	path() {
		return `<g>
		<path fill="currentColor" d="M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5
			S32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5
			S453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2
			c0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z"/>
		<path fill="currentColor" d="M243.2,411c7.5,0,13.5-6,13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v238.5
			C229.7,404.9,235.7,411,243.2,411z"/>
		<path fill="currentColor" d="M155.1,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9
			C141.6,390.1,147.7,396.1,155.1,396.1z"/>
		<path fill="currentColor" d="M331.3,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9
			C317.8,390.1,323.8,396.1,331.3,396.1z"/>
	</g>`
	}
}

class Undo$1 extends ICON {
    config() {
        return {
            viewBox: `0 0 26.676 26.676`
        }
    }
    path() {
        return `<path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
		c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
		C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
		c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
		C26.18,21.891,26.141,21.891,26.105,21.891z"/>`
    }
}

class Upload extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        return `<g>
        <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
            c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
            z"/>
        <path d="M271.085,112.915c-0.008-0.008-0.016-0.014-0.023-0.021c-0.49-0.488-1.004-0.952-1.54-1.392
            c-0.248-0.204-0.509-0.38-0.764-0.571c-0.302-0.226-0.598-0.461-0.913-0.671c-0.304-0.204-0.62-0.38-0.932-0.566
            c-0.285-0.17-0.564-0.349-0.857-0.506c-0.318-0.17-0.646-0.315-0.971-0.468c-0.306-0.145-0.607-0.297-0.921-0.428
            c-0.315-0.13-0.637-0.236-0.957-0.35c-0.337-0.121-0.669-0.25-1.013-0.354c-0.32-0.097-0.646-0.168-0.969-0.249
            c-0.351-0.089-0.698-0.187-1.055-0.258c-0.375-0.074-0.753-0.118-1.13-0.173c-0.311-0.044-0.617-0.104-0.933-0.135
            c-1.4-0.138-2.811-0.138-4.211,0c-0.315,0.031-0.621,0.09-0.933,0.135c-0.377,0.054-0.756,0.098-1.13,0.173
            c-0.358,0.071-0.704,0.169-1.055,0.258c-0.324,0.081-0.649,0.152-0.969,0.249c-0.344,0.104-0.677,0.233-1.013,0.354
            c-0.32,0.115-0.642,0.22-0.957,0.35c-0.314,0.13-0.615,0.283-0.921,0.428c-0.325,0.153-0.653,0.297-0.971,0.468
            c-0.293,0.157-0.572,0.336-0.857,0.506c-0.312,0.186-0.628,0.363-0.932,0.566c-0.315,0.211-0.611,0.445-0.913,0.671
            c-0.255,0.191-0.516,0.368-0.764,0.571c-0.535,0.439-1.05,0.903-1.54,1.392c-0.008,0.007-0.016,0.014-0.023,0.021l-85.333,85.333
            c-8.331,8.331-8.331,21.839,0,30.17s21.839,8.331,30.17,0l48.915-48.915V384c0,11.782,9.551,21.333,21.333,21.333
            s21.333-9.551,21.333-21.333V179.503l48.915,48.915c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17
            L271.085,112.915z"/>
    </g>`
    }
}

class View extends ICON {
    config() {
        return {
            viewBox: `0 0 511.999 511.999`
        }
    }
    path() {
        return `
        <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
            c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
            C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
            c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
            C447.361,287.923,358.746,385.406,255.997,385.406z"/>
        <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
			s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
            s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
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
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            `
    }
}

class View$2 extends ICON {
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

class Write extends ICON {
    config() {
        return {
            viewBox: `0 -1 401.52289 401`
        }
    }
    path() {
        return `<path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>`
    }
}

class Warning extends ICON {
    config() {
        return {
            viewBox: `0 0 488.451 488.451`
        }
    }
    path() {
        return `<path d="M484.125,412.013l-212.2-367.6c-12.3-21.3-43.1-21.3-55.4,0l-212.2,367.6c-12.3,21.3,3.1,48,27.7,48h424.4
		C481.025,460.013,496.425,433.313,484.125,412.013z M244.525,157.613c13.6,0,24.6,11.3,24.2,24.9l-4,139.6
		c-0.3,11-9.3,19.7-20.3,19.7s-20-8.8-20.3-19.7l-3.9-139.6C219.925,168.913,230.825,157.613,244.525,157.613z M244.225,410.113
		c-13.9,0-25.2-11.3-25.2-25.2c0-13.9,11.3-25.2,25.2-25.2s25.2,11.3,25.2,25.2S258.125,410.113,244.225,410.113z"/>`
    }
}

class YoutubeSymbol extends ICON {
    config() {
        return {
            viewBox: `0 0 96.875 96.875`
        }
    }
    path() {
        return `<path d="M95.201,25.538c-1.186-5.152-5.4-8.953-10.473-9.52c-12.013-1.341-24.172-1.348-36.275-1.341 c-12.105-0.007-24.266,0-36.279,1.341c-5.07,0.567-9.281,4.368-10.467,9.52C0.019,32.875,0,40.884,0,48.438   C0,55.992,0,64,1.688,71.336c1.184,5.151,5.396,8.952,10.469,9.52c12.012,1.342,24.172,1.349,36.277,1.342 c12.107,0.007,24.264,0,36.275-1.342c5.07-0.567,9.285-4.368,10.471-9.52c1.689-7.337,1.695-15.345,1.695-22.898 C96.875,40.884,96.889,32.875,95.201,25.538z M35.936,63.474c0-10.716,0-21.32,0-32.037c10.267,5.357,20.466,10.678,30.798,16.068 C56.434,52.847,46.23,58.136,35.936,63.474z"/>`
    }
}

class Page extends ICON {
    config() {
        return {
            viewBox: `0 0 384 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16z" class=""></path>`
    }
}

class Folder extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path(vnode) {
        const theme = (this.hasOwnProperty('theme'))? this.theme : false;
        if(theme && theme === 'color'){
            return `<path fill="currentColor" stroke="#000000" stroke-miterlimit="10" stroke-width="4" d="M51.5,44.8c-24.9,0-45.1,21.5-45.1,48v288c0,26.5,20.2,48,45.1,48h390.5c24.9,0,45.1-21.5,45.1-48v-224
            c0-26.5-20.2-48-45.1-48H261.7l-51.3-54.6c-5.6-6-13.3-9.4-21.2-9.4C189.2,44.8,51.5,44.8,51.5,44.8z"/>`
        }
        return `<path fill="currentColor" d="M194.74 96l54.63 54.63c6 6 14.14 9.37 22.63 9.37h192c8.84 0 16 7.16 16 16v224c0 8.84-7.16 16-16 16H48c-8.84 0-16-7.16-16-16V112c0-8.84 7.16-16 16-16h146.74M48 64C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48z" class=""></path>`
    }
}

class FolderOpen extends ICON {
    config() {
        return {
            viewBox: `0 0 576 512`
        }
    }
    path() {
        const theme = (this.hasOwnProperty('theme'))? this.theme : false;
        if(theme && theme === 'color'){
            return `<path fill="currentColor" stroke="#000000" stroke-miterlimit="10" stroke-width="4" d="M525.6,224.3h-47.5v-47.5c0-26.2-21.3-47.5-47.5-47.5H272.2l-63.4-63.4H50.4c-26.2,0-47.5,21.3-47.5,47.5
            v285.1c0,26.2,21.3,47.5,47.5,47.5h381.2c27.8,0,53.6-14.6,67.9-38.5l66.8-111.3C585.2,264.7,562.5,224.3,525.6,224.3z"/>
            <path fill="currentColor" stroke="#000000" stroke-miterlimit="10" stroke-width="4" d="M525.6,224.3h-47.5l-327.7-5.4L2.9,398.6c0,26.2,21.3,47.5,47.5,47.5h381.2c27.8,0,53.6-14.6,67.9-38.5
		    l66.8-111.3C585.2,264.7,562.5,224.3,525.6,224.3z"/>`
        }
        return `<path fill="currentColor" d="M527.95 224H480v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h385.057c28.068 0 54.135-14.733 68.599-38.84l67.453-112.464C588.24 264.812 565.285 224 527.95 224zM48 96h146.745l64 64H432c8.837 0 16 7.163 16 16v48H171.177c-28.068 0-54.135 14.733-68.599 38.84L32 380.47V112c0-8.837 7.163-16 16-16zm493.695 184.232l-67.479 112.464A47.997 47.997 0 0 1 433.057 416H44.823l82.017-136.696A48 48 0 0 1 168 256h359.975c12.437 0 20.119 13.568 13.72 24.232z" class=""></path>`
    }
}

class Copy extends ICON {
    config() {
        return {
            viewBox: `0 0 448 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z" class=""></path>`
    }
}

class Bars extends ICON {
    config() {
        return {
            viewBox: `0 0 448 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" class=""></path>`
    }
}

class Save extends ICON {
    config() {
        return {
            viewBox: `0 0 448 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM288 64v96H96V64h192zm128 368c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h16v104c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24V64.491a15.888 15.888 0 0 1 7.432 4.195l83.882 83.882A15.895 15.895 0 0 1 416 163.882V432zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 144c-30.879 0-56-25.121-56-56s25.121-56 56-56 56 25.121 56 56-25.121 56-56 56z" class=""></path>`
    }
}

class SaveSolid extends ICON {
    config() {
        return {
            viewBox: `0 0 448 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" class=""></path>`
    }
}

class CalendarAlt extends ICON {
    config() {
        return {
            viewBox: `0 0 448 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"></path>`
    }
}

class CloudDownload extends ICON {
    config() {
        return {
            viewBox: `0 0 640 512`
        }
    }
    path() {
        return `<path fill="currentColor" d="M571.7 238.8c2.8-9.9 4.3-20.2 4.3-30.8 0-61.9-50.1-112-112-112-16.7 0-32.9 3.6-48 10.8-31.6-45-84.3-74.8-144-74.8-94.4 0-171.7 74.5-175.8 168.2C39.2 220.2 0 274.3 0 336c0 79.6 64.4 144 144 144h368c70.7 0 128-57.2 128-128 0-47-25.8-90.8-68.3-113.2zM512 448H144c-61.9 0-112-50.1-112-112 0-56.8 42.2-103.7 97-111-.7-5.6-1-11.3-1-17 0-79.5 64.5-144 144-144 60.3 0 111.9 37 133.4 89.6C420 137.9 440.8 128 464 128c44.2 0 80 35.8 80 80 0 18.5-6.3 35.6-16.9 49.2C573 264.4 608 304.1 608 352c0 53-43 96-96 96zM405.2 254.5c-4.7-4.7-12.3-4.7-17 0L320 322.7V172c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v150.7l-68.2-68.2c-4.7-4.7-12.3-4.7-17 0l-5.7 5.7c-4.7 4.7-4.7 12.3 0 17l98.3 98.3c4.7 4.7 12.3 4.7 17 0l98.3-98.3c4.7-4.7 4.7-12.3 0-17l-5.5-5.7z" class=""></path>`
    }
}

exports.Accessibility = Accessibility;
exports.AccessibilityFill = AccessibilityFill;
exports.AccountCircle = AccountCircle;
exports.AddFile = AddFile;
exports.AddPost = AddPost;
exports.Alert = Alert;
exports.Apartment = Apartment;
exports.BackArrow = BackArrow;
exports.BackArrowMirro = BackArrowMirro;
exports.Bars = Bars;
exports.BlockHR = BlockHR;
exports.BlockQuote = BlockQuote;
exports.BooksStack = BooksStack;
exports.CalendarAlt = CalendarAlt;
exports.CapitolBuilding = CapitolBuilding;
exports.Chat = Chat;
exports.CheckMark = CheckMark;
exports.CheckSelect = ChechSelect;
exports.ChevronLeft = ChevronLeft;
exports.ChevronRight = ChevronRight;
exports.Close = Close;
exports.CloudDownload = CloudDownload;
exports.CodeInterfaceSymbol = CodeInterfaceSymbol;
exports.ColorText = colorText;
exports.Copy = Copy;
exports.Dashboard = Dashboard;
exports.Delete = Delete;
exports.DropFill = DropFill;
exports.Envelope = Envelope;
exports.Erase = Erase;
exports.FileDOC = FileDOC;
exports.FileDOCX = FileDOCX;
exports.FileODP = FileODP$1;
exports.FileODS = FileODS$1;
exports.FileODT = FileODT;
exports.FileOther = FileOther;
exports.FilePDF = FilePDF;
exports.FilePPT = FilePPTX;
exports.FilePPTX = FileODP;
exports.FileRAR = FileRAR;
exports.FileType = FileType;
exports.FileXLS = FileXLSX;
exports.FileXLSX = FileODS;
exports.FileZIP = FileZIP;
exports.FirstIndent = FirstIndent;
exports.Folder = Folder;
exports.FolderOpen = FolderOpen;
exports.Gallery = Gallery$1;
exports.GlobalBold = GlobalBold;
exports.GlobalFill = Gallery;
exports.Grid01 = Grid01;
exports.Grid02 = Grid02;
exports.Home = Home;
exports.Icon = ICON;
exports.Image = Image;
exports.ImageCenter = ImageCenter;
exports.ImageLeft = ImageLeft;
exports.ImageRight = ImageRight;
exports.Incomes = Incomes;
exports.Information = Information;
exports.InsertTable = InsertTable;
exports.Like = Like;
exports.Link = Link;
exports.ListOrderDecimal = ListOrderDecimal;
exports.ListUnsequenceDisc = ListUnsequenceDisc;
exports.Lock = Lock;
exports.Login = Login;
exports.ManGroup = ManUser;
exports.ManUser = ManUser$1;
exports.MarkunreadMailbox = MarkunreadMailbox;
exports.Page = Page;
exports.PencilEdit = PencilEdit;
exports.PlusBlackSymbol = PlusBlackSymbol;
exports.Policy = Question;
exports.PowerSupply = PowerSupply;
exports.Question = Question$2;
exports.QuestionMark = Question$1;
exports.RAR = RAR;
exports.Redo = Undo;
exports.ReloadSymbol = ReloadSymbol;
exports.Report = Report;
exports.RubbishBin = RubbishBin;
exports.Save = Save;
exports.SaveSolid = SaveSolid;
exports.Select = Select$2;
exports.Send = Select$1;
exports.SettingsCogwheel = Select;
exports.Text = Text;
exports.TextA = TextA;
exports.TextAlignCenter = TextAlignCenter;
exports.TextAlignJustify = TextAlignJustify;
exports.TextAlignLeft = TextAlignLeft;
exports.TextAlignRight = TextAlignRight;
exports.TextBackground = TextBackground;
exports.TextBold = TextBold;
exports.TextItalic = TextItalic;
exports.TextLineThrough = TextLineThrough;
exports.TextUnderline = TextUnderline;
exports.Trash = Trash;
exports.Undo = Undo$1;
exports.Upload = Upload;
exports.View = View;
exports.ViewDisable = View$1;
exports.ViewFill = View$2;
exports.Warning = Warning;
exports.Write = Write;
exports.YoutubeSymbol = YoutubeSymbol;
});

unwrapExports(bundle);
var bundle_1 = bundle.Accessibility;
var bundle_2 = bundle.AccessibilityFill;
var bundle_3 = bundle.AccountCircle;
var bundle_4 = bundle.AddFile;
var bundle_5 = bundle.AddPost;
var bundle_6 = bundle.Alert;
var bundle_7 = bundle.Apartment;
var bundle_8 = bundle.BackArrow;
var bundle_9 = bundle.BackArrowMirro;
var bundle_10 = bundle.Bars;
var bundle_11 = bundle.BlockHR;
var bundle_12 = bundle.BlockQuote;
var bundle_13 = bundle.BooksStack;
var bundle_14 = bundle.CalendarAlt;
var bundle_15 = bundle.CapitolBuilding;
var bundle_16 = bundle.Chat;
var bundle_17 = bundle.CheckMark;
var bundle_18 = bundle.CheckSelect;
var bundle_19 = bundle.ChevronLeft;
var bundle_20 = bundle.ChevronRight;
var bundle_21 = bundle.Close;
var bundle_22 = bundle.CloudDownload;
var bundle_23 = bundle.CodeInterfaceSymbol;
var bundle_24 = bundle.ColorText;
var bundle_25 = bundle.Copy;
var bundle_26 = bundle.Dashboard;
var bundle_27 = bundle.Delete;
var bundle_28 = bundle.DropFill;
var bundle_29 = bundle.Envelope;
var bundle_30 = bundle.Erase;
var bundle_31 = bundle.FileDOC;
var bundle_32 = bundle.FileDOCX;
var bundle_33 = bundle.FileODP;
var bundle_34 = bundle.FileODS;
var bundle_35 = bundle.FileODT;
var bundle_36 = bundle.FileOther;
var bundle_37 = bundle.FilePDF;
var bundle_38 = bundle.FilePPT;
var bundle_39 = bundle.FilePPTX;
var bundle_40 = bundle.FileRAR;
var bundle_41 = bundle.FileType;
var bundle_42 = bundle.FileXLS;
var bundle_43 = bundle.FileXLSX;
var bundle_44 = bundle.FileZIP;
var bundle_45 = bundle.FirstIndent;
var bundle_46 = bundle.Folder;
var bundle_47 = bundle.FolderOpen;
var bundle_48 = bundle.Gallery;
var bundle_49 = bundle.GlobalBold;
var bundle_50 = bundle.GlobalFill;
var bundle_51 = bundle.Grid01;
var bundle_52 = bundle.Grid02;
var bundle_53 = bundle.Home;
var bundle_54 = bundle.Icon;
var bundle_55 = bundle.Image;
var bundle_56 = bundle.ImageCenter;
var bundle_57 = bundle.ImageLeft;
var bundle_58 = bundle.ImageRight;
var bundle_59 = bundle.Incomes;
var bundle_60 = bundle.Information;
var bundle_61 = bundle.InsertTable;
var bundle_62 = bundle.Like;
var bundle_63 = bundle.Link;
var bundle_64 = bundle.ListOrderDecimal;
var bundle_65 = bundle.ListUnsequenceDisc;
var bundle_66 = bundle.Lock;
var bundle_67 = bundle.Login;
var bundle_68 = bundle.ManGroup;
var bundle_69 = bundle.ManUser;
var bundle_70 = bundle.MarkunreadMailbox;
var bundle_71 = bundle.Page;
var bundle_72 = bundle.PencilEdit;
var bundle_73 = bundle.PlusBlackSymbol;
var bundle_74 = bundle.Policy;
var bundle_75 = bundle.PowerSupply;
var bundle_76 = bundle.Question;
var bundle_77 = bundle.QuestionMark;
var bundle_78 = bundle.RAR;
var bundle_79 = bundle.Redo;
var bundle_80 = bundle.ReloadSymbol;
var bundle_81 = bundle.Report;
var bundle_82 = bundle.RubbishBin;
var bundle_83 = bundle.Save;
var bundle_84 = bundle.SaveSolid;
var bundle_85 = bundle.Select;
var bundle_86 = bundle.Send;
var bundle_87 = bundle.SettingsCogwheel;
var bundle_88 = bundle.Text;
var bundle_89 = bundle.TextA;
var bundle_90 = bundle.TextAlignCenter;
var bundle_91 = bundle.TextAlignJustify;
var bundle_92 = bundle.TextAlignLeft;
var bundle_93 = bundle.TextAlignRight;
var bundle_94 = bundle.TextBackground;
var bundle_95 = bundle.TextBold;
var bundle_96 = bundle.TextItalic;
var bundle_97 = bundle.TextLineThrough;
var bundle_98 = bundle.TextUnderline;
var bundle_99 = bundle.Trash;
var bundle_100 = bundle.Undo;
var bundle_101 = bundle.Upload;
var bundle_102 = bundle.View;
var bundle_103 = bundle.ViewDisable;
var bundle_104 = bundle.ViewFill;
var bundle_105 = bundle.Warning;
var bundle_106 = bundle.Write;
var bundle_107 = bundle.YoutubeSymbol;

var styles$7 = {"gi-editor-attachs":"_2uDx1","gi-editor-header":"_3Sjkk","gi-editor-attachs-content":"QO435","gi-editor-attach-item":"xcnuV","close":"_35375","gi-editor-attach-icon":"_2Q8MW","gi-editor-attach-title":"_1M5hn","gi-editor-attach-size":"_1VxEi","gi-editor-attach-filename":"_3yH-y","gi-editor-attach-tooltip":"_1jer7","editing":"_13XOT","blue-background-class":"_2NOJe","gi-editor-attach-upload":"_1NDny"};

const cx$e = classNames.bind(styles$7);

function getFileExtension(filename) {
    const ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    return ext ? ext[0] : undefined
}

function getIcon(ext) {
    const exts = ['doc', 'docx', 'odp', 'ods', 'odt', 'pdf', 'ppt', 'pptx', 'rar', 'xls', 'xlsx', 'zip'];
    if (exts.indexOf(ext.toLowerCase()) > -1) {
        return m('i', m(bundle_41, {
            theme: ext
        }))
    }
    return m('i', m(bundle_36))
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function fileSelectHandler(files, storage) {

    for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.size) {
            alert(`您的檔案[ ${files[i].name} ]超過${this.size / 1000000}MB,無法上傳.`);
            return
        }
        if (this.extension) {
            const pattern = this.extension;
            if (!pattern.test(files[i].name)) {
                alert('檔案類型不符合,無法上傳');
                return
            }
        }

        const found = this.attachs.find(item => {
            return item.filename == files[i].name
        });
        if (!found) {
            this.attachs.push({
                id: uuid$1(),
                filename: files[i].name,
                size: files[i].size,
                caption: files[i].name.split('.').slice(0, -1).join('.'),
                mimetype: files[i].type,
                dateOfUpload: new Date(),
                file: files[i],
                path: storage + files[i].name
            });
            this.export(this.attachs);
        }
    }
}

function initSortable() {
    this.sortable = Sortable.create(this.content, {
        ghostClass: `${cx$e('blue-background-class')}`,
        onChoose: (evt) => {
            const items = document.querySelectorAll(`.${cx$e('gi-editor-attach-item')}`);
            if (items) {
                items.forEach(item => {
                    item.classList.add(`${cx$e('editing')}`);
                });
            }
        },
        onEnd: (evt) => {
            this.attachs.splice(evt.newIndex, 0, this.attachs.splice(evt.oldIndex, 1)[0]);
            const items = document.querySelectorAll(`.${cx$e('gi-editor-attach-item')}`);
            if (items) {
                items.forEach(item => {
                    item.classList.remove(`${cx$e('editing')}`);
                });
            }
            this.export(this.attachs);
        }
    });
}

class Attachs {
    constructor(vnode) {
        this.attachs = vnode.attrs.files || [];
        this.size = vnode.attrs.size || 50000000;
        this.accept = vnode.attrs.accept || "image/*,.pdf,.odt,.odp,.ods,.zip";
        this.extension = vnode.attrs.extension || /(\.pdf)|(\.odt)|(\.odp)|(\.ods)|(\.zip)|(\.jpg)|(\.jpeg)|(\.png)/i;
        this.export = vnode.attrs.export || function () {};
    }
    oncreate(vnode) {
        document.addEventListener('click', (e) => {
            const editing = vnode.dom.querySelector(`.${cx$e('gi-editor-attach-title')}[data-edit]`);
            if (editing && e.target != editing && !editing.contains(e.target)) {
                let isEditing = false;
                this.attachs.map(item => {
                    if (item.caption == '') {
                        alert('檔案標題不可空白');
                        isEditing = true;
                        item.editable = true;
                    } else {
                        isEditing = isEditing ? true : false;
                        item.editable = false;
                    }
                });

                if (!isEditing) {
                    initSortable.call(this);
                    this.export(this.attachs);
                    m.redraw();
                }
            }
        });

        this.content = vnode.dom.querySelector(`.${cx$e('gi-editor-attachs-content')}`);
        initSortable.call(this);
    }
    onremove(vnode) {
        if (this.sortable) {
            this.sortable.destroy();
        }
    }
    view(vnode) {
        let {
            storage,
            files,
            note
        } = vnode.attrs;

        files = files || [];

        if (this.attachs.length == 0) {
            this.attachs = files;
        }
        storage = storage || '.';

        return m('div.gi-attachs', {
            class: cx$e('gi-editor-attachs')
        }, [
            m('div.gi-attachs-header', {
                class: cx$e('gi-editor-header')
            }, [
                m('h6', [
                    '附件檔案',
                    note
                ]),
                m('button[type="button"]', {
                    class: cx$e('gi-editor-attach-upload'),
                    onclick: (e) => {
                        vnode.dom.querySelector('#attach_upload').click();
                    }
                }, '選擇檔案'),
                m('input#attach_upload[type="file"]', {
                    style: {
                        display: 'none'
                    },
                    multiple: true,
                    accept: this.accept,
                    onchange: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fileSelectHandler.call(this, e.target.files, storage);
                    }
                })
            ]),
            m('div.gi-attachs-content', {
                class: cx$e('gi-editor-attachs-content'),
                ondragover: (e) => {
                    e.preventDefault();
                },
                ondrop: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileSelectHandler.call(this, e.dataTransfer.files, storage);
                }
            }, [
                this.attachs.map((item, index) => {
                    const ext = getFileExtension(item.filename);
                    return m('div.gi-attachs-item', {
                        key: item.id,
                        class: cx$e('gi-editor-attach-item', {
                            'editing': item.editable
                        }),
                        style: {
                            'align-self': 'flex-start'
                        },
                        draggable: (!item.editable) ? true : false,
                        ondragstart: (e) => {
                            e.dataTransfer.setData("text/html", `<a href="${storage}/${item.filename}" title="檔案下載，檔案為${item.filename}，另開新視窗" download="${item.filename}">${item.caption}</a>`);
                        }
                    }, [
                        m('div', {
                            class: cx$e('gi-editor-attach-filename')
                        }, [
                            m('div', {
                                class: cx$e('gi-editor-attach-tooltip')
                            }, `檔案: ${item.filename}`)
                        ]),
                        m('div', {
                            class: cx$e('gi-editor-attach-icon')
                        }, getIcon(ext)),
                        (item.editable) ? [
                            m('div', {
                                class: cx$e('gi-editor-attach-title'),
                                'data-edit': item.editable
                            }, [
                                m('input[type="text"]', {
                                    oninput: (e) => {
                                        item.caption = e.target.value;
                                    },
                                    onkeyup: (e) => {
                                        if (e.keyCode == 13) {
                                            e.preventDefault();
                                            if (item.caption == '') {
                                                alert('檔案標題不可空白');
                                                return false
                                            }
                                            item.editable = false;
                                            initSortable.call(this);
                                            this.export(this.attachs);
                                        }
                                    },

                                    value: item.caption
                                })
                            ])
                        ] : [
                            m('div', {
                                class: cx$e('gi-editor-attach-title'),
                                ondblclick: (e) => {
                                    this.attachs.map(item => {
                                        item.editable = false;
                                    });
                                    item.editable = true;
                                    this.temp = item.caption;
                                    this.sortable.destroy();
                                }
                            }, item.caption)
                        ],
                        m('div', {
                            class: cx$e('gi-editor-attach-size')
                        }, bytesToSize(item.size)),
                        m('button[type="button"]', {
                            class: cx$e('close'),
                            onclick: (e) => {
                                e.preventDefault();
                                this.attachs.splice(index, 1);
                                this.export(this.attachs);
                            }
                        }, m.trust('&times;'))
                    ])
                })
            ])
        ])
    }
}

var styles$8 = {"carousel":"_1TU4e","carousel-panel":"_34jyM","carousel-panel-item":"_32ZPT"};

const cx$f = classNames.bind(styles$8);

class Carousel extends Component {
    constructor(vnode){
        super();
        const {
            events,
            options,
            childrens
        } = vnode.attrs;
        this.events = this.checkAttrs(events, ['beforeChange','afterChange']);
        this.options = this.checkAttrs(options, [
            'initIndex','autoplay','autoplaySpeed','playDirection','cssEase','infinite','carouselScroll','carouselShow','speed'
        ]);
        this.childrens = this.checkAttrs(childrens,['component','disabled']);
        this.panelItem = this.childrens.slice();
        // this.childrens.unshift(this.childrens[this.childrens.length-1])
        // this.childrens.push(this.childrens[0])
        console.log('this.childrens',this.childrens);
        this.state = {
            order: this.options.initIndex || 0,
            autoplaySpeed: this.options.autoplaySpeed || 5000,
            autoplay: this.options.autoplay || false,
            playDirection: (this.options.playDirection)? this.options.playDirection : true,
            infinite: (this.options.infinite)? this.options.infinite : true,
            cssEase: this.options.cssEase || 'linear',
            carouselScroll: this.options.carouselScroll || 1,
            carouselShow: this.options.carouselShow || 1,
            speed: this.options.speed || 600,
            childrens: this.childrens || [],
            panelItem: this.panelItem || []
        };
        const changeEvent = {
            state: this.state,
            events: this.events,
            goToList: null,
            timer: this.timer,
            noChangeEvent: this.noChangeEvent
        };
        
        if(this.state.autoplay){
            this.timer = setTimeout(this.noChangeEvent , this.state.autoplaySpeed,changeEvent);
        }
        this.init = true;
    }
    noChangeEvent(e){
            
        if(e.events.beforeChange){
            e.events.beforeChange(e);
        }
        if(this.timer){
            window.clearTimeout(e.timer);
        }
        console.log('noChangeEvent',e);
        
        if(e.state.playDirection){
            e.state.order++;
            if(e.state.order > e.state.panelItem.length - 1){
                e.state.order = 0;
            }
            m.redraw();
        }else{
            e.state.order--;
            if(e.state.order < 0){
                e.state.order = e.state.panelItem.length - 1;
            }
            
            m.redraw();
        }
        console.log(e.state.order);
        if(e.state.autoplay){
            e.timer = setTimeout(e.noChangeEvent , e.state.autoplaySpeed,e);
        }
        if(e.events.afterChange){
            e.events.afterChange(e);
        }
    }

    oncreate (vnode){
        this.init = false;
        this.state.target = vnode.dom;
        this.state.target.noChangeEvent = this.noChangeEvent;
        this.state.panel = vnode.dom.querySelectorAll(`.${cx$f('carousel-panel')}`)[0];
        this.state.bannerWidth = this.state.target.offsetWidth;
        const carouselItem = vnode.dom.querySelectorAll(`.${cx$f('carousel-panel-item')}`);
        for (let i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.width = `${this.state.bannerWidth}px`;
        }
    }
    view(vnode){
        const {
            order,
            autoplaySpeed,
            autoplay,
            playDirection,
            infinite,
            cssEase,
            carouselScroll,
            carouselShow,
            speed,
            childrens,
            panelItem,
            bannerWidth
        } = this.state;
        return m('div',{
            class: cx$f('carousel'),
        },[
            m('div',{
                class: cx$f('carousel-panel')
            },[
                panelItem.map((item, index , array)=>{
                    const prev = (order -1 < 0)?array.length -1:order -1;
                    const next = (order +1 > array.length -1)? 0:order +1;
                    console.log(prev,order,next);
                    return (/*prev === index ||*/ order === index || next === index)? m('div',{
                        style: {
                            width: `${bannerWidth}px`,
                            transform: `translateX(0)`,
                            order: (order === index)? 2 : 3
                        },
                        class: cx$f('carousel-panel-item'),
                        oncreate: (vd)=>{
                            const dom = vd.dom;
                            panelItem[index].dom = dom;
                        },
                        onbeforeremove: (vd)=>{
                            const dom = vd.dom;
                            panelItem[index].dom = null;
                            const panel = this.state.panel;
                            panel.style.transition = `${speed/1000}s transform ${cssEase}`;
                            dom.style.order = 1;
                            window.requestAnimationFrame(()=>{
                                this.animation = true;
                                panel.style.transform = `translateX(-100%)`;
                            });
                            return new Promise((resolve)=> {
                                panel.addEventListener('transitionend',()=>{
                                    this.animation = false;
                                    panel.style.transition = null;
                                    panel.style.transform = `translateX(0)`;
                                    resolve();
                                });
                            })
                        }
                    },item.component) :null
                })
            ])
        ])
    }
}

exports.Attach = Attachs;
exports.Button = Button;
exports.Calendar = Calendar;
exports.Carousel = Carousel;
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
