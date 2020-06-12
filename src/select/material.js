import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
const cx = classNames.bind(styles)

export default class MaterialSelectComponent extends Component {
    view(vnode){
        const {
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
                ...state.getAttrs().select
            }, [
                m('div', {
                    class: cx('select-btn'),
                    ...state.events.selectEvents
                }, [
                    m('button[type="text"]',{
                        class: cx('select-btn-button'),
                        ...state.getAttrs().button
                    },state.getComponentValue()[state.textKey]),
                    m('input[type="text"]',{
                        class: cx('select-btn-input'),
                        ...state.getAttrs().input
                    }),
                    m('div', {
                        class: cx('select-line')
                    }),
                ]),
                (state.active)?(()=>{
                    if (state.mobileMode) {
                        return m('div', {
                            class: cx('select-dialog'),
                            ...state.getAttrs().dialog
                        },[
                            m('div',{
                                class: cx('select-panel'),
                            },[
                                (state.panelPrefix)?
                                this.handleComponent(state.panelPrefix,'div',{
                                    class: cx('select-option-prefix')
                                }): null,
                                state.childrens.map((item, index) => {
                                    if(!item.value){
                                        item.value = index+1
                                    }
                                    return m('button', {
                                        class: cx('select-option',item.class, {
                                            'active': (state.selected[state.valueKey] === item.value),
                                            'disabled': item.disabled
                                        }),
                                        ...state.getChildrensAttrs(item)
                                    }, [
                                        m('span',`${item.text}`)
                                    ])
                                }),
                                (state.panelSuffix)?
                                    this.handleComponent(state.panelSuffix,'div',{
                                        class: cx('select-option-suffix')
                                }): null
                            ])
                        ])
                    }else{
                        return m('div',{
                            class: cx('select-panel'),
                            ...state.getAttrs().panel
                        },[
                            (state.panelPrefix)?
                            this.handleComponent(state.panelPrefix,'div',{
                                class: cx('select-option-prefix')
                            }): null,
                            state.childrens.map((item, index) => {
                                if(!item.value){
                                    item.value = index+1
                                }
                                return m('button', {
                                    class: cx('select-option',item.class, {
                                        'active': (state.selected[state.valueKey] === item.value),
                                        'input': state.findIndex === index && !item.disabled,
                                        'disabled': item.disabled
                                    }),
                                    ...state.getChildrensAttrs(item)
                                }, [
                                    m('span',`${item.text}`)
                                ])
                            }),
                            (state.panelSuffix)?
                                this.handleComponent(state.panelSuffix,'div',{
                                    class: cx('select-option-suffix')
                            }): null
                        ])
                    }
                })():null,
            ]),
            (state.hasError()) ? m('small.text-danger', state.hasError()) : null
        ])
        
    } 
}