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

var styles = {"input-outline":"_1r0ZV","input-outline-label":"_2TFdf","input-outline-fieldset":"h7tUP","input-outline-legend":"_1L47j","input-effect-active":"_3fvDY","form-control":"_GTaR","is-invalid":"_3kBzN","input-outline-text":"_3SJGw","input-outline-box":"_2-X4j","input-outline-base":"dnpb8","input-outline-prefix":"_3xQ1u","input-outline-suffix":"_228Yx","input-outline-lockView":"-QgCg","input-outline-feedback":"_1T9za","invalid-feedback":"_287M0","input-bottomline":"_3Wsff","input-bottomline-label":"_3EQKK","input-bottomline-fieldset":"_11Q0z","input-bottomline-text":"_18P7Q","input-bottomline-box":"_391l8","input-bottomline-base":"_2Tnny","input-bottomline-prefix":"_3r9Ad","input-bottomline-suffix":"_1kqw2","input-bottomline-lockView":"_3V5Wp","input-bottomline-feedback":"_2rqsN","input-bottomline-legend":"_1ta2N","disabled":"ISUIj","click-wave-effect-on":"G8XbP","click-wave-effect-off":"_3zS4P"};

var styles$1 = {};

const cx = classNames.bind(styles$1);

class ICON {
    view(vnode) {
        const config = this.config();
        let attrs = {
            ...config,
            ...vnode.attrs
        };
        if (attrs.hasOwnProperty('class') && typeof attrs.class === 'string') {
            attrs.class = cx(attrs.class);
        }
        return m('svg[xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"]', attrs, [
            m.trust(this.path())
        ])
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

const cx$1 = classNames.bind(styles);



function filter(raw, allows = []) {
    const filtered = Object.keys(raw)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

class TextField {
    view(vnode) {
        const {
            type,
            style,
            disabled,
            oninput,
            onchange,
            classes,
            hasValue,
            hasError,
            validate
        } = vnode.attrs;

        const attrs = filter(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value','disabled'],);
        return m('input', {
            ...attrs,
            type: (type)? type : 'text',
            style,
            class: classNames(classes,'form-control', {
                'is-invalid': hasError()
            }),
            oninput: (e) => {
                if (disabled) {
                    return false
                }

                if (oninput) {
                    oninput(e);
                }

                if (hasValue && typeof hasValue === 'function') {
                    if (e.target.value) {
                        hasValue(true);
                    } else {
                        hasValue(false);
                    }
                }
            },
            onchange: (e) => {
                if (validate && typeof validate === 'function') {
                    const error = validate(e.target.value);
                    hasError(error);
                }
            }
        })
    }
}

class TextBox {
    constructor(vnode) {
        this.hasError = stream();
        this.hasValue = stream(vnode.attrs.value);
        if (vnode.attrs.hasError) {
            this.hasError = vnode.attrs.hasError;
        }
        this.hasError(vnode.attrs.error);
        this.labelWidth = 0.01;
        this.prefixWidth = 0;
        this.password = (vnode.attrs.type === 'password');
        this.passwordIcon = View$1;
        this.passwordClick = false;
        this.type = vnode.attrs.type;
    }

    oncreate(vnode){
        if(!vnode.attrs.hasOwnProperty('options')) return
        if(!vnode.attrs.options.hasOwnProperty('theme')) return
        if(vnode.attrs.options.theme === 'outline'){
            this.labelWidth = vnode.dom.querySelector(classNames(`.${cx$1('input-outline-label')}`)).offsetWidth;
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$1('input-outline-prefix')}`)).offsetWidth;
        }
        if(vnode.attrs.options.theme === 'bottomline'){
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$1('input-bottomline-prefix')}`)).offsetWidth;
        }
        m.redraw();
    }

    view(vnode) {
        let {
            oninput,
            onchange,
            validate,
            options,
            type,
            success,
            disabled,
            readonly,
        } = vnode.attrs;

        options = (options) ? options : {};

        let {
            theme,
            style,
            icon,
            label,
            prefix,
            suffix,
            text
        } = options;
        

        const classes = (options.class) ? options.class : '';
        theme = theme ? theme : Config$1.theme;
        const attrs = filter(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value', 'autocomplete','disabled']);
        if (theme === 'outline' || theme === 'bottomline') {
            return m('div', {
                style,
                class: classNames(classes, cx$1(`input-${theme}`,{
                    'input-effect-active': this.hasValue(),
                    'error': this.hasError(),
                    'success': (success)? true : false,
                    'disabled': (disabled || readonly)? true : false,
                }))
            }, [
                (icon) ? icon : null,
                (text) ? m('span',{
                    class: classNames(cx$1(`input-${theme}-text`))
                }, m.trust(text)) : null,
                m('div',{
                    class: classNames(cx$1(`input-${theme}-box`))
                },[
                    m('label', {
                        class: classNames(cx$1(`input-${theme}-label`)),
                        style:{
                            left: (prefix) ? `${this.prefixWidth + 4}px`: null,
                        }
                    }, (label)? m('span',label) : ''),
                    m('div',{
                        class: classNames(cx$1(`input-${theme}-base`))
                    },[
                        m('span',{
                            class: classNames(cx$1(`input-${theme}-prefix`))
                        },(prefix) ? prefix : null) ,

                        m(TextField, {
                            ...attrs,
                            type: this.type,
                            disabled: (disabled || readonly),
                            oninput,
                            onchange,
                            validate,
                            hasValue: this.hasValue,
                            hasError: this.hasError
                        }),

                        m('span',{
                            class: classNames(cx$1(`input-${theme}-suffix`))
                        },[

                            (suffix) ? suffix : null,

                            (this.hasError()) ? m('div',{
                                class: classNames(cx$1(`input-${theme}-warning`)),
                            },m('i',m(Alert))) : null,

                            (vnode.attrs.type === 'password' || this.password ) ? m('div',{
                                class: classNames(cx$1(`input-${theme}-lockView`,{
                                    'click-wave-effect-on': (this.passwordClick),
                                    'click-wave-effect-off': !(this.passwordClick)
                                })),
                                onclick: (e) => {
                                    if(this.type === 'password'){
                                        this.type = 'text';
                                        this.passwordIcon = View;
                                        this.passwordClick = false;
                                    }else{
                                        this.type = 'password';
                                        this.passwordIcon = View$1;
                                        this.passwordClick = true;
                                    }
                                }
                            },m('i',m(this.passwordIcon))) : null,
                            
                        ]),


                        m('fieldset',{
                            class: classNames(cx$1(`input-${theme}-fieldset`)),
                            style: {
                                paddingLeft: (prefix) ? `${this.prefixWidth}px`: null,
                            }
                        },[
                            m('legend',{
                                class: classNames(cx$1(`input-${theme}-legend`)),
                                style:{
                                    maxWidth: (this.labelWidth > 0)? `${this.labelWidth*0.8}px` : false
                                }
                            }),
                        ]),
                    ]),
                    m('div',{
                        class: classNames(cx$1(`input-${theme}-feedback`))
                    },[
                        (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
                    ])
                ]),
            ]) 
        }


        return [
            m(TextField, {
                ...attrs,
                type,
                oninput,
                onchange,
                validate,
                hasValue: this.hasValue,
                hasError: this.hasError,
                classes: (options.class) ? options.class : ''
            }),
            (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
        ]

        
    }
}

var styles$2 = {"input-outline":"kCEV3","input-outline-label":"_35-O6","input-outline-fieldset":"_3Hdcj","input-outline-legend":"_3W0mE","input-effect-active":"_3Gouq","form-control":"_1lMaI","is-invalid":"_3r6MK","input-outline-text":"_2bmXW","input-outline-box":"_21inQ","input-outline-base":"Q8al8","input-outline-prefix":"_3OjQk","input-outline-suffix":"_1Qh3d","input-outline-lockView":"_3jDDh","input-outline-feedback":"oqK-O","invalid-feedback":"_1TyzQ","input-bottomline":"_2vsj7","input-bottomline-label":"_3LkTU","input-bottomline-fieldset":"IYEoZ","input-bottomline-text":"_2ltOa","input-bottomline-box":"_1Nsdq","input-bottomline-base":"_1SYjp","input-bottomline-prefix":"XlAix","input-bottomline-suffix":"_1vF4i","input-bottomline-lockView":"_8OAr0","input-bottomline-feedback":"_2qD44","input-bottomline-legend":"_1DLXF","disabled":"_2lD6U","click-wave-effect-on":"_17BRh","click-wave-effect-off":"b0kFw"};

const cx$2 = classNames.bind(styles$2);



function filter$1(raw, allows = []) {
    const filtered = Object.keys(raw)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

class TextField$1 {
    view(vnode) {
        const {
            style,
            disabled,
            oninput,
            classes,
            hasValue,
            hasError,
            validate
        } = vnode.attrs;

        const attrs = filter$1(vnode.attrs, ['cols', 'maxlength', 'rows', 'wrap', 'readonly', 'required', 'placeholder', 'value','disabled'],);
        return m('textarea', {
            ...attrs,
            style,
            class: classNames(classes,'form-control', {
                'is-invalid': hasError()
            }),
            oninput: (e) => {
                if (disabled) {
                    return false
                }

                if (oninput) {
                    oninput(e);
                }

                if (hasValue && typeof hasValue === 'function') {
                    if (e.target.value) {
                        hasValue(true);
                    } else {
                        hasValue(false);
                    }
                }
            },
            onchange: (e) => {
                if (validate && typeof validate === 'function') {
                    const error = validate(e.target.value);
                    hasError(error);
                }
            }
        })
    }
}

class TextArea {
    constructor(vnode) {
        this.hasError = stream();
        this.hasValue = stream(vnode.attrs.value);
        if (vnode.attrs.hasError) {
            this.hasError = vnode.attrs.hasError;
        }
        this.hasError(vnode.attrs.error);
        this.labelWidth = 0.01;
        this.prefixWidth = 0;
        this.password = (vnode.attrs.type === 'password');
        this.passwordIcon = View$1;
        this.passwordClick = false;
        this.type = vnode.attrs.type;
    }

    oncreate(vnode){
        if(!vnode.attrs.hasOwnProperty('options')) return
        if(!vnode.attrs.options.hasOwnProperty('theme')) return
        if(vnode.attrs.options.theme === 'outline'){
            this.labelWidth = vnode.dom.querySelector(classNames(`.${cx$2('input-outline-label')}`)).offsetWidth;
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$2('input-outline-prefix')}`)).offsetWidth;
        }
        if(vnode.attrs.options.theme === 'bottomline'){
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$2('input-bottomline-prefix')}`)).offsetWidth;
        }
        m.redraw();
    }

    view(vnode) {
        let {
            oninput,
            onchange,
            validate,
            options,
            type,
            success,
            disabled,
            readonly,
        } = vnode.attrs;

        options = (options) ? options : {};

        let {
            theme,
            style,
            icon,
            label,
            prefix,
            suffix,
            text
        } = options;
        

        const classes = (options.class) ? options.class : '';
        theme = theme ? theme : Config$1.theme;
        const attrs = filter$1(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value', 'autocomplete','disabled']);
        if (theme === 'outline' || theme === 'bottomline') {
            return m('div', {
                style,
                class: classNames(classes, cx$2(`input-${theme}`,{
                    'input-effect-active': this.hasValue(),
                    'error': this.hasError(),
                    'success': (success)? true : false,
                    'disabled': (disabled || readonly)? true : false,
                }))
            }, [
                (icon) ? icon : null,
                (text) ? m('span',{
                    class: classNames(cx$2(`input-${theme}-text`))
                }, m.trust(text)) : null,
                m('div',{
                    class: classNames(cx$2(`input-${theme}-box`))
                },[
                    m('label', {
                        class: classNames(cx$2(`input-${theme}-label`)),
                        style:{
                            left: (prefix) ? `${this.prefixWidth + 4}px`: null,
                        }
                    }, (label)? m('span',label) : ''),
                    m('div',{
                        class: classNames(cx$2(`input-${theme}-base`))
                    },[
                        m('span',{
                            class: classNames(cx$2(`input-${theme}-prefix`))
                        },(prefix) ? prefix : null) ,

                        m(TextField$1, {
                            ...attrs,
                            type: this.type,
                            disabled: (disabled || readonly),
                            oninput,
                            onchange,
                            validate,
                            hasValue: this.hasValue,
                            hasError: this.hasError
                        }),

                        m('span',{
                            class: classNames(cx$2(`input-${theme}-suffix`))
                        },[

                            (suffix) ? suffix : null,

                            (this.hasError()) ? m('div',{
                                class: classNames(cx$2(`input-${theme}-warning`)),
                            },m('i',m(Alert))) : null,
                            
                        ]),


                        m('fieldset',{
                            class: classNames(cx$2(`input-${theme}-fieldset`)),
                            style: {
                                paddingLeft: (prefix) ? `${this.prefixWidth}px`: null,
                            }
                        },[
                            m('legend',{
                                class: classNames(cx$2(`input-${theme}-legend`)),
                                style:{
                                    maxWidth: (this.labelWidth > 0)? `${this.labelWidth*0.8}px` : false
                                }
                            }),
                        ]),
                    ]),
                    m('div',{
                        class: classNames(cx$2(`input-${theme}-feedback`))
                    },[
                        (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
                    ])
                ]),
            ]) 
        }


        return [
            m(TextField$1, {
                ...attrs,
                type,
                oninput,
                onchange,
                validate,
                hasValue: this.hasValue,
                hasError: this.hasError,
                classes: (options.class) ? options.class : ''
            }),
            (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
        ]

        
    }
}

var styles$3 = {"input-outline":"_3LtEq","input-outline-label":"_3SSiG","input-outline-fieldset":"_1beTA","input-outline-legend":"_1Cjye","input-effect-active":"Rigl2","form-control":"snllU","is-invalid":"zgGQq","input-outline-text":"y3076","input-outline-box":"WppCl","input-outline-base":"_3AvDG","input-outline-prefix":"OYmDn","input-outline-suffix":"_1aAb2","input-outline-lockView":"_1ocFB","input-outline-feedback":"_3qF6D","invalid-feedback":"_1AI9D","input-bottomline":"_2VXcc","input-bottomline-label":"_2IIVq","input-bottomline-fieldset":"_3ipji","input-bottomline-text":"_3IjJj","input-bottomline-box":"qmT1E","input-bottomline-base":"_3rdO1","input-bottomline-prefix":"_1UP5m","input-bottomline-suffix":"Z4Krn","input-bottomline-lockView":"_29npt","input-bottomline-feedback":"_3JoVZ","input-bottomline-legend":"_2C1Kt","disabled":"_14mIP","click-wave-effect-on":"_3sw_T","click-wave-effect-off":"_32n9x"};

const cx$3 = classNames.bind(styles$3);



function filter$2(raw, allows = []) {
    const filtered = Object.keys(raw)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

class TextField$2 {
    view(vnode) {
        const {
            type,
            style,
            disabled,
            oninput,
            onchange,
            classes,
            hasValue,
            hasError,
            validate
        } = vnode.attrs;

        const attrs = filter$2(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value','disabled'],);
        return m('input', {
            ...attrs,
            type: (type)? type : 'text',
            style,
            class: classNames(classes,'form-control', {
                'is-invalid': hasError()
            }),
            oninput: (e) => {
                if (disabled) {
                    return false
                }

                if (oninput) {
                    oninput(e);
                }

                if (hasValue && typeof hasValue === 'function') {
                    if (e.target.value) {
                        hasValue(true);
                    } else {
                        hasValue(false);
                    }
                }
            },
            onchange: (e) => {
                if (validate && typeof validate === 'function') {
                    const error = validate(e.target.value);
                    hasError(error);
                }
            }
        })
    }
}

class TextBox$1 {
    constructor(vnode) {
        this.hasError = stream();
        this.hasValue = stream(vnode.attrs.value);
        if (vnode.attrs.hasError) {
            this.hasError = vnode.attrs.hasError;
        }
        this.hasError(vnode.attrs.error);
        this.labelWidth = 0.01;
        this.prefixWidth = 0;
        this.password = (vnode.attrs.type === 'password');
        this.passwordIcon = View$1;
        this.passwordClick = false;
        this.type = vnode.attrs.type;
    }

    oncreate(vnode){
        if(!vnode.attrs.hasOwnProperty('options')) return
        if(!vnode.attrs.options.hasOwnProperty('theme')) return
        if(vnode.attrs.options.theme === 'outline'){
            this.labelWidth = vnode.dom.querySelector(classNames(`.${cx$3('input-outline-label')}`)).offsetWidth;
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$3('input-outline-prefix')}`)).offsetWidth;
        }
        if(vnode.attrs.options.theme === 'bottomline'){
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$3('input-bottomline-prefix')}`)).offsetWidth;
        }
        m.redraw();
    }

    view(vnode) {
        let {
            oninput,
            onchange,
            validate,
            options,
            type,
            success,
            disabled,
            readonly,
        } = vnode.attrs;

        options = (options) ? options : {};

        let {
            theme,
            style,
            icon,
            label,
            prefix,
            suffix,
            text
        } = options;
        

        const classes = (options.class) ? options.class : '';
        theme = theme ? theme : Config$1.theme;
        const attrs = filter$2(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value', 'autocomplete','disabled']);
        if (theme === 'outline' || theme === 'bottomline') {
            return m('div', {
                style,
                class: classNames(classes, cx$3(`input-${theme}`,{
                    'input-effect-active': this.hasValue(),
                    'error': this.hasError(),
                    'success': (success)? true : false,
                    'disabled': (disabled || readonly)? true : false,
                }))
            }, [
                (icon) ? icon : null,
                (text) ? m('span',{
                    class: classNames(cx$3(`input-${theme}-text`))
                }, m.trust(text)) : null,
                m('div',{
                    class: classNames(cx$3(`input-${theme}-box`))
                },[
                    m('label', {
                        class: classNames(cx$3(`input-${theme}-label`)),
                        style:{
                            left: (prefix) ? `${this.prefixWidth + 4}px`: null,
                        }
                    }, (label)? m('span',label) : ''),
                    m('div',{
                        class: classNames(cx$3(`input-${theme}-base`))
                    },[
                        m('span',{
                            class: classNames(cx$3(`input-${theme}-prefix`))
                        },(prefix) ? prefix : null) ,

                        m(TextField$2, {
                            ...attrs,
                            type: this.type,
                            disabled: (disabled || readonly),
                            oninput,
                            onchange,
                            validate,
                            hasValue: this.hasValue,
                            hasError: this.hasError
                        }),

                        m('span',{
                            class: classNames(cx$3(`input-${theme}-suffix`))
                        },[

                            (suffix) ? suffix : null,

                            (this.hasError()) ? m('div',{
                                class: classNames(cx$3(`input-${theme}-warning`)),
                            },m('i',m(Alert))) : null,

                            (vnode.attrs.type === 'password' || this.password ) ? m('div',{
                                class: classNames(cx$3(`input-${theme}-lockView`,{
                                    'click-wave-effect-on': (this.passwordClick),
                                    'click-wave-effect-off': !(this.passwordClick)
                                })),
                                onclick: (e) => {
                                    if(this.type === 'password'){
                                        this.type = 'text';
                                        this.passwordIcon = View;
                                        this.passwordClick = false;
                                    }else{
                                        this.type = 'password';
                                        this.passwordIcon = View$1;
                                        this.passwordClick = true;
                                    }
                                }
                            },m('i',m(this.passwordIcon))) : null,
                            
                        ]),


                        m('fieldset',{
                            class: classNames(cx$3(`input-${theme}-fieldset`)),
                            style: {
                                paddingLeft: (prefix) ? `${this.prefixWidth}px`: null,
                            }
                        },[
                            m('legend',{
                                class: classNames(cx$3(`input-${theme}-legend`)),
                                style:{
                                    maxWidth: (this.labelWidth > 0)? `${this.labelWidth*0.8}px` : false
                                }
                            }),
                        ]),
                    ]),
                    m('div',{
                        class: classNames(cx$3(`input-${theme}-feedback`))
                    },[
                        (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
                    ])
                ]),
            ]) 
        }


        return [
            m(TextField$2, {
                ...attrs,
                type,
                oninput,
                onchange,
                validate,
                hasValue: this.hasValue,
                hasError: this.hasError,
                classes: (options.class) ? options.class : ''
            }),
            (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
        ]

        
    }
}

var styles$4 = {"input-outline":"PyjzR","input-outline-label":"_1KoMW","input-outline-fieldset":"_3q5S2","input-outline-legend":"_1P1y3","input-effect-active":"NhM6w","form-control":"JtuGy","is-invalid":"pYu5H","input-outline-text":"_2mX2E","input-outline-box":"_2dIAB","input-outline-base":"_2F7kU","input-outline-prefix":"_2ApgP","input-outline-suffix":"_26gUj","input-outline-lockView":"_34gMC","input-outline-feedback":"uLFKz","invalid-feedback":"_2rmn0","input-bottomline":"_2WMgp","input-bottomline-label":"_1eG1D","input-bottomline-fieldset":"_1N3xH","input-bottomline-text":"JdIgw","input-bottomline-box":"_37GDm","input-bottomline-base":"_2akRF","input-bottomline-prefix":"_325As","input-bottomline-suffix":"_253oD","input-bottomline-lockView":"_1jPL5","input-bottomline-feedback":"_2dzYr","input-bottomline-legend":"_2Qjtd","disabled":"hWy0-","click-wave-effect-on":"_30_ah","click-wave-effect-off":"meZ1A"};

const cx$4 = classNames.bind(styles$4);



function filter$3(raw, allows = []) {
    const filtered = Object.keys(raw)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});
    return filtered
}

class TextField$3 {
    view(vnode) {
        const {
            type,
            style,
            disabled,
            oninput,
            onchange,
            classes,
            hasValue,
            hasError,
            validate
        } = vnode.attrs;

        const attrs = filter$3(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value','disabled'],);
        return m('input', {
            ...attrs,
            type: (type)? type : 'text',
            style,
            class: classNames(classes,'form-control', {
                'is-invalid': hasError()
            }),
            oninput: (e) => {
                if (disabled) {
                    return false
                }

                if (oninput) {
                    oninput(e);
                }

                if (hasValue && typeof hasValue === 'function') {
                    if (e.target.value) {
                        hasValue(true);
                    } else {
                        hasValue(false);
                    }
                }
            },
            onchange: (e) => {
                if (validate && typeof validate === 'function') {
                    const error = validate(e.target.value);
                    hasError(error);
                }
            }
        })
    }
}

class TextBox$2 {
    constructor(vnode) {
        this.hasError = stream();
        this.hasValue = stream(vnode.attrs.value);
        if (vnode.attrs.hasError) {
            this.hasError = vnode.attrs.hasError;
        }
        this.hasError(vnode.attrs.error);
        this.labelWidth = 0.01;
        this.prefixWidth = 0;
        this.password = (vnode.attrs.type === 'password');
        this.passwordIcon = View$1;
        this.passwordClick = false;
        this.type = vnode.attrs.type;
    }

    oncreate(vnode){
        if(!vnode.attrs.hasOwnProperty('options')) return
        if(!vnode.attrs.options.hasOwnProperty('theme')) return
        if(vnode.attrs.options.theme === 'outline'){
            this.labelWidth = vnode.dom.querySelector(classNames(`.${cx$4('input-outline-label')}`)).offsetWidth;
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$4('input-outline-prefix')}`)).offsetWidth;
        }
        if(vnode.attrs.options.theme === 'bottomline'){
            this.prefixWidth = vnode.dom.querySelector(classNames(`.${cx$4('input-bottomline-prefix')}`)).offsetWidth;
        }
        m.redraw();
    }

    view(vnode) {
        let {
            oninput,
            onchange,
            validate,
            options,
            type,
            success,
            disabled,
            readonly,
        } = vnode.attrs;

        options = (options) ? options : {};

        let {
            theme,
            style,
            icon,
            label,
            prefix,
            suffix,
            text
        } = options;
        

        const classes = (options.class) ? options.class : '';
        theme = theme ? theme : Config$1.theme;
        const attrs = filter$3(vnode.attrs, ['max', 'maxlength', 'min', 'pattern', 'readonly', 'required', 'size', 'step', 'placeholder', 'value', 'autocomplete','disabled']);
        if (theme === 'outline' || theme === 'bottomline') {
            return m('div', {
                style,
                class: classNames(classes, cx$4(`input-${theme}`,{
                    'input-effect-active': this.hasValue(),
                    'error': this.hasError(),
                    'success': (success)? true : false,
                    'disabled': (disabled || readonly)? true : false,
                }))
            }, [
                (icon) ? icon : null,
                (text) ? m('span',{
                    class: classNames(cx$4(`input-${theme}-text`))
                }, m.trust(text)) : null,
                m('div',{
                    class: classNames(cx$4(`input-${theme}-box`))
                },[
                    m('label', {
                        class: classNames(cx$4(`input-${theme}-label`)),
                        style:{
                            left: (prefix) ? `${this.prefixWidth + 4}px`: null,
                        }
                    }, (label)? m('span',label) : ''),
                    m('div',{
                        class: classNames(cx$4(`input-${theme}-base`))
                    },[
                        m('span',{
                            class: classNames(cx$4(`input-${theme}-prefix`))
                        },(prefix) ? prefix : null) ,

                        m(TextField$3, {
                            ...attrs,
                            type: this.type,
                            disabled: (disabled || readonly),
                            oninput,
                            onchange,
                            validate,
                            hasValue: this.hasValue,
                            hasError: this.hasError
                        }),

                        m('span',{
                            class: classNames(cx$4(`input-${theme}-suffix`))
                        },[

                            (suffix) ? suffix : null,

                            (this.hasError()) ? m('div',{
                                class: classNames(cx$4(`input-${theme}-warning`)),
                            },m('i',m(Alert))) : null,

                            (vnode.attrs.type === 'password' || this.password ) ? m('div',{
                                class: classNames(cx$4(`input-${theme}-lockView`,{
                                    'click-wave-effect-on': (this.passwordClick),
                                    'click-wave-effect-off': !(this.passwordClick)
                                })),
                                onclick: (e) => {
                                    if(this.type === 'password'){
                                        this.type = 'text';
                                        this.passwordIcon = View;
                                        this.passwordClick = false;
                                    }else{
                                        this.type = 'password';
                                        this.passwordIcon = View$1;
                                        this.passwordClick = true;
                                    }
                                }
                            },m('i',m(this.passwordIcon))) : null,
                            
                        ]),


                        m('fieldset',{
                            class: classNames(cx$4(`input-${theme}-fieldset`)),
                            style: {
                                paddingLeft: (prefix) ? `${this.prefixWidth}px`: null,
                            }
                        },[
                            m('legend',{
                                class: classNames(cx$4(`input-${theme}-legend`)),
                                style:{
                                    maxWidth: (this.labelWidth > 0)? `${this.labelWidth*0.8}px` : false
                                }
                            }),
                        ]),
                    ]),
                    m('div',{
                        class: classNames(cx$4(`input-${theme}-feedback`))
                    },[
                        (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
                    ])
                ]),
            ]) 
        }


        return [
            m(TextField$3, {
                ...attrs,
                type,
                oninput,
                onchange,
                validate,
                hasValue: this.hasValue,
                hasError: this.hasError,
                classes: (options.class) ? options.class : ''
            }),
            (this.hasError()) ? m('small.invalid-feedback', this.hasError()) : null
        ]

        
    }
}

var styles$5 = {"success":"_2DghH","material":"_2Lo8J","checkbox":"SxWqM","error":"_1b3dp","disabled":"_3dB1a","select-option":"_1Gbix","select-btn":"_2HVYJ","checkbox-wave-effect-on":"_3DP-O","checkbox-wave-effect-off":"_7UISw"};

const cx$5 = classNames.bind(styles$5);



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
            class: [cx$5('checkbox', _theme), classes].join(' '),
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
                    class: cx$5({
                        'checkbox-wave-effect-on': checked,
                        'checkbox-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

var styles$6 = {"material":"SnYez","radio":"_3EGkm","success":"_3cv1Y","error":"_1B-KV","disabled":"lh15w","radio-wave-effect-on":"_369ki","radio-wave-effect-off":"_19Exk"};

const cx$6 = classNames.bind(styles$6);

class Radio {
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
        const id = uuid();
        const _theme = theme ? theme : Config$1.theme;

        return m('.custom-control.custom-radio', {
            class: [cx$6('radio', _theme), classes].join(' '),
            style
        }, [
            m('input.custom-control-input[type="radio"]', {
                id,
                onclick,
                checked,
                disabled,
                name,
                required
            }),
            m('label.custom-control-label', {
                for: id
            }, [
                m('div', {
                    class: cx$6({
                        'radio-wave-effect-on': checked,
                        'radio-wave-effect-off': !checked,
                    })
                }),
                m('span', label)
            ])
        ])

    }
}

var styles$7 = {"waves-effect":"_3SPtb","waves-light":"_351tE","waves-ripple":"_1F4HU"};

const cx$7 = classNames.bind(styles$7);

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

function attachWave(element, velocity, e) {

    if (e.button === 2) {
        return false;
    }

    element = element || this;

    // Create ripple
    const ripple = document.createElement('div');
    ripple.classList.add(`${cx$7('waves-ripple')}`, `${cx$7('waves-rippling')}`);
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

    const scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
    const translate = 'translate(0,0)';

    if (velocity) {
        translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
    }

    // Attach data to element
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-x', relativeX);
    ripple.setAttribute('data-y', relativeY);
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-translate', translate);

    // Set ripple position
    const rippleStyle = {
        top: relativeY + 'px',
        left: relativeX + 'px'
    };

    ripple.classList.add(`${cx$7('waves-notransition')}`);
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.classList.remove(`${cx$7('waves-notransition')}`);

    rippleStyle['-webkit-transform'] = scale + ' ' + translate;
    rippleStyle['-moz-transform'] = scale + ' ' + translate;
    rippleStyle['-ms-transform'] = scale + ' ' + translate;
    rippleStyle['-o-transform'] = scale + ' ' + translate;
    rippleStyle.transform = scale + ' ' + translate;
    rippleStyle.opacity = '1';

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
    const duration = e.type === 'mousemove' ? 2500 : WaveEffect.duration;

    setTimeout(function () {
        let style = {
            top: relativeY + 'px',
            left: relativeX + 'px',
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
    duration: 750,
    // Effect delay (check for scroll before showing effect)
    delay: 200,
    attach: (target, velocity) => {
        // Disable right click
        target.classList.add(`${cx$7('waves-effect')}`, `${cx$7('waves-light')}`);
        target.addEventListener('mousedown', attachWave.bind(null, target, velocity), false);
        target.addEventListener('mouseup', removeWave.bind(null, target), false);
    },
    destory: (target) => {
        if (isTouchAvailable) {
            element.removeEventListener('touchend', removeWave);
            element.removeEventListener('touchcancel', removeWave);
        }
        target.removeEventListener('mousedown', attachWave);
        target.removeEventListener('mouseup', removeWave);
    }
};

var styles$8 = {"select":"X-tV4","material":"SAooc","success":"_1CIdz","error":"g77gf","disabled":"_3dWwg","select-dropdown":"HLDoM","select-btn":"_3e05s","select-panel":"ncUex","select-line":"njqf5","select-option":"d8p8k","active":"_2f_Ad"};

const cx$8 = classNames.bind(styles$8);


let selectActive = [];
document.body.addEventListener('click', (e) => {
    //全域關閉事件
    for (let i = 0; i < selectActive.length; i++) {
        if (!selectActive[i].active && selectActive[i].btn.uuid == e.target.uuid) {
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
        selectActive.push(this);
    }
    oncreate(vnode) {
        this.btn = vnode.dom.querySelector(classNames(`.${cx$8('select-btn')}`));
        this.btn.uuid = uuid$1();
    }
    view(vnode) {
        const {
            label,
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
                    onclick(e);
                    if (disabled) {
                        return false
                    }
                    // if (this.active) {
                    //     this.active = false
                    // } else {
                    //     this.active = true
                    // }
                },
            }, this.selected.text),
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
                        m('span', this.selected.text)
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
                                if(onchange)onchange(e, item.value);
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
                })
            ]

        )
    }
}


class Select {
    constructor(vnode) {
        this.selected = vnode.attrs.selected;
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
            disabled,
            required,
            error,
            success
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
                m(NativeSelectComponent, {
                    selected,
                    onchange,
                    disabled,
                    options,
                    error,
                    success,
                    required,
                    label,
                    select
                }),
                (error) ? m('.invalid-feedback', error) : null
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
                }),
                (error) ? m('.invalid-feedback', error) : null
            ]
        ])
    }
}

var styles$9 = {"material":"_23gbE","switch":"_2TzXj","success":"_2t65r","error":"_1rObM","disabled":"U7Jgc","switch-wave-effect-on":"_13JKH","switch-wave-effect-off":"_37OuF"};

const cx$9 = classNames.bind(styles$9);

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
                        'switch-wave-effect-off': !checked,
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

const cx$a = classNames.bind(style);

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
        this.selectedDate = stream(moment('2019-01-02'));
        const firstDate = moment(this.selectedDate()).set('date', 1);
        this.months = [firstDate];
        this.changeDirection = null;
        this.toggle = stream(null);
    }
    oncreate(vnode) {
        //判斷位置
        if (vnode.dom) {
            const calendar = vnode.dom.querySelector(`.${cx$a('calendar')}`);
            calendar.classList.add(`${cx$a('show')}`);
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
            const picker = dom.querySelector(`.${cx$a('year-month-picker')}`);
            picker.classList.remove(`${cx$a('show')}`);
            picker.classList.add(`${cx$a('hide')}`);
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
            class: cx$a('calendar-popup')
        }, [
            m('div', {
                class: cx$a('calendar')
            }, [
                m('div', {
                    class: cx$a('calendar-header')
                }, [
                    m('div', {
                        //使用flex
                        class: cx$a('calendar-controls')
                    }, [
                        m('div', {
                            class: cx$a('mat-button-wrapper')
                        }, [
                            m('button[type="button"]', {
                                class: cx$a('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'year');
                                }
                            }, [
                                m('span', {
                                    class: cx$a('header-year')
                                }, `${this.months[0].get('year')}年`)
                            ]),
                            m('button[type="button"]', {
                                class: cx$a('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault();
                                    this.handlePicker(vnode.dom, this.toggle, 'month');
                                }
                            }, [
                                m('span', {
                                    class: cx$a('header-month')
                                }, `${this.months[0].get('month') + 1}月`)
                            ])
                        ]),
                        m('div', {
                            class: cx$a('mat-button-wrapper'),
                            style: {
                                visibility: this.toggle() ? 'hidden' : 'visible'
                            }
                        }, [
                            m('button[type="button"]', {
                                class: cx$a('mat-icon-button', 'calendar-previous-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'prev');
                                }
                            }),
                            m('button[type="button"]', {
                                class: cx$a('mat-icon-button', 'calendar-next-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'next');
                                }
                            })
                        ])
                    ])
                ]),
                m('div', {
                    class: cx$a('calendar-body', 'perspective')
                }, [
                    m('div', {
                        class: cx$a('calendar-weekly')
                    }, [
                        ['日', '一', '二', '三', '四', '五', '六'].map(item => {
                            return m('div', {
                                class: cx$a('cell')
                            }, item)
                        }),
                    ]),
                    m('hr', {
                        class: cx$a('calendar-divider')
                    }),
                    m('div', {
                        class: cx$a('perspective')
                    }, [
                        this.months.map(month => {
                            return m(DateComponent, {
                                cx: cx$a,
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
                            cx: cx$a,
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
                            cx: cx$a,
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

class Button {
    view(vnode) {
        const {
            style,
            onclick,
            disabled
        } = vnode.attrs;

        const classes = vnode.attrs.class;

        return m('button[type="button"].btn', {
            class: classes,
            disabled,
            style,
            oncreate: (vnode) => {
                WaveEffect.attach(vnode.dom);
            },
            onremove: (vnode) => {
                WaveEffect.destory(vnode.dom);
            },
            onclick
        }, vnode.children)
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
exports.Checkbox = Checkbox;
exports.Config = Config$1;
exports.InputBox = TextBox;
exports.PageItemCount = PageItemCount;
exports.Pagination = Pagination;
exports.Radio = Radio;
exports.Select = Select;
exports.Switch = Switch;
exports.TextArea = TextArea;
exports.TextBox = TextBox$1;
exports.TextInput = TextBox$2;
