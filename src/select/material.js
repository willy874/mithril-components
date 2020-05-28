import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
const cx = classNames.bind(styles)

export default class MaterialSelectComponent extends Component {
    view(vnode){
        const {
            title,
            state
        } = vnode.attrs
        return m.fragment({},[
            (state.label)?
                this.handleComponent(state.label,'div',{
                    class: cx('select-label')
            }): null,
            m('div', {
                class: cx('select-dropdown', {
                    'active': state.active,
                    'disabled': state.disabled,
                }),
                ...state.getSelectAttrs().select
            }, [
                m('div', {
                    class: cx('select-btn'),
                }, [
                    m('button[type="text"]',{
                        class: cx('select-btn-button'),
                        title,
                        ...state.getSelectAttrs().button
                    },state.getSelectValue()[state.textKey]),
                    m('input[type="text"]',{
                        class: cx('select-btn-input'),
                        title,
                        ...state.getSelectAttrs().input
                    }),
                    m('div', {
                        class: cx('select-line')
                    }),
                ]),
                (state.active)? m('div',{
                    class: cx('select-panel'),
                    ...state.getSelectAttrs().panel
                },[
                    (state.panelPrefix)?
                    this.handleComponent(state.panelPrefix,'div',{
                        class: cx('select-option')
                    }): null,
                    state.childrens.map((item, index) => {
                        if(!item[state.valueKey]){
                            item[state.valueKey] = index+1
                        }
                        return m('button', {
                            class: cx('select-option',item.class, {
                                'active': (state.selected[state.valueKey] === item[state.valueKey]),
                                'input': state.findIndex === index,
                                'disabled': item.disabled
                            }),
                            ...state.getSelectOptionAttrs(item)
                        }, [
                            m('span',`${item[state.textKey]}`)
                        ])
                    }),
                    (state.panelSuffix)?
                        this.handleComponent(state.panelSuffix,'div',{
                            class: cx('select-option')
                    }): null
                ]):null
            ]),
            (state.hasError) ? m('small.invalid-feedback', state.hasError) : null
        ])
        
    } 
}