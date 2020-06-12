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
                ...state.getAttrs().select,
            }, [
                (state.panelPrefix)?
                this.handleComponent(state.panelPrefix,'option',{
                    disabled: true,
                }): null,
                state.childrens.map((item,index) => {
                    if(!item.value){
                        item.value = index + 1
                    }
                    return m('option', {
                        ...state.getChildrensAttrs(item),
                        //判斷若沒有設定selected則帶入item.selected
                        selected: (item.selected) ? !state.getComponentValue()[state.valueKey] || item.selected : null
                    }, item.text)
                }),
                (state.panelSuffix)?
                this.handleComponent(state.panelSuffix,'option',{
                    disabled: true,
                }): null
            ]),
                (state.hasError()) ? m('small.text-danger', state.hasError()) : null
        ])
        
        
    }
}