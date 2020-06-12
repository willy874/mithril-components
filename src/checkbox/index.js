import m from 'mithril'
import {Component} from '../util-components'
import classNames from 'classnames/bind'
import styles from './styles/checkbox.css'
const cx = classNames.bind(styles)
import createCheckbox from './state'


export default class Checkbox extends Component {
    constructor(vnode){
        super()

        //生成state
        this.state = new createCheckbox({
            state: this,
            attrs: vnode.attrs,
            children: vnode.children
        })
    }
    view(vnode) {
        return m('div',{
            style: this.state.style,
            class: classNames(this.state.class,'checkbox',cx('checkbox-group',this.state.checkboxValidCalss())),
        },[
            this.state.childrens.map((item, index)=>{
                if (this.state.theme === 'material') {
                    return m('div',{
                        class: classNames(cx('checkbox-list',item.class, this.state.theme)),
                        ...this.state.getAttrs(item).list
                    },[
                        m('input[type="checkbox"]', {
                            class: classNames('custom-control-input'),
                            ...this.state.getAttrs(item).checkbox
                        }),
                        m('label', {
                            class: classNames('custom-control-label'),
                            ...this.state.getAttrs(item).label
                        }, [
                            m('div', {
                                class: cx('checkbox-boxborder')
                            },[
                                (!item.checked)
                                ?m('div', {
                                    class: cx('checkbox-wave-effect'),
                                    key: 'on',
                                    ...this.state.getAttrs(item).waveEffectOn
                                })
                                :m('div', {
                                    class: cx('checkbox-wave-effect'),
                                    key: 'off',
                                    ...this.state.getAttrs(item).waveEffectOff
                                })
                            ]),
                            this.handleComponent(item.label,'span',{})
                        ])
                    ])
                }
                return m('div',{
                    class: classNames('custom-control','custom-checkbox',item.class,cx('checkbox-list')),
                    ...this.state.getAttrs(item).list
                },[
                    m('input[type="checkbox"]', {
                        class: classNames('custom-control-input'),
                        ...this.state.getAttrs(item).checkbox
                    }),
                    this.handleComponent(item.label,'label',{
                        class: classNames('custom-control-label'),
                        ...this.state.getAttrs(item).label
                    })
                ])
            }),
            m('.feeback',[
                (this.state.hasError()) ? m('small.text-danger', this.state.hasError()) : null
            ])
            
        ])
    }
}