import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'

export default class NativeSelectComponent extends Component {
    view(vnode) {
        const {
            disabled,
            required,
            autofocus,
            size,
            title,
            error,
            success,
            state
        } = vnode.attrs
        
        return m.fragment({},[
            (state.label)?
                this.handleComponent(state.label,'div',{
                class: cx('select-label')
            }): null,
            m('.input-group',[
                (state.groupPrepend)?
                m('.input-group-prepend',[
                    this.handleComponent(state.groupPrepend,'div',{
                        class: 'input-group-text'
                    })
                ]): null,
                m('select.custom-select.browser-default', {
                    disabled,
                    required,
                    autofocus,
                    size,
                    title,
                    class: classNames('form-control',{
                        'is-invalid': error,
                        'is-valid': success
                    }),
                    ...state.getSelectAttrs().select,
                    value: state.getSelectValue()[state.valueKey] || '請選擇',
                }, [
                    m('option',{
                        disabled: true,
                        selected: !state.getSelectValue()[state.valueKey]
                    },'請選擇'),
                    (state.panelPrefix)?
                    this.handleComponent(state.panelPrefix,'option',{
                        disabled: true,
                    }): null,
                    state.childrens.map((item,index) => {
                        if(!item[state.valueKey]){
                            item[state.valueKey] = index + 1
                        }
                        return m('option', {
                            ...state.getSelectOptionAttrs(item),
                            //判斷若沒有設定selected則帶入item.selected
                            selected: (item.selected) ? !state.getSelectValue()[state.valueKey] || item.selected : null
                        }, item[state.textKey])
                    }),
                    (state.panelSuffix)?
                    this.handleComponent(state.panelSuffix,'option',{
                        disabled: true,
                    }): null
                ]),
                (state.groupAppend)?
                m('.input-group-append',[
                    this.handleComponent(state.groupAppend,'div',{
                        class: 'input-group-text'
                    })
                ]): null,
            ]),
            (state.hasError()) ? m('small.invalid-feedback', state.hasError()) : null
        ])
        
        
    }
}