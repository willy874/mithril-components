import m from 'mithril'
import {Component} from '../util-components'
import classNames from 'classnames/bind'
import styles from './styles/radio.css'
const cx = classNames.bind(styles)
import createRadio from './state'


export default class Radio extends Component {
    constructor(vnode){
        super()

        //生成state
        this.state = new createRadio({
            state: this,
            attrs: vnode.attrs,
            children: vnode.children
        })
    }
    view(vnode) {
        return m('div',{
            style: this.state.style,
            class: classNames(this.state.class,'radio',cx('radio-group',this.state.validCalss())),
        },[
            this.state.childrens.map((item, index)=>{
                if (this.state.theme === 'material') {
                    return m('div',{
                        class: classNames(cx('radio-list',item.class, this.state.theme)),
                        ...this.state.getAttrs(item).list
                    },[
                        m('input[type="radio"]', {
                            class: classNames('custom-control-input'),
                            ...this.state.getAttrs(item).radio
                        }),
                        m('label', {
                            class: classNames('custom-control-label'),
                            ...this.state.getAttrs(item).label
                        }, [
                            m('div', {
                                class: cx('radio-boxborder')
                            },[
                                (!item.checked)
                                ?m('div', {
                                    class: cx('radio-wave-effect'),
                                    ...this.state.getAttrs(item).waveEffectOn
                                })
                                :m('div', {
                                    class: cx('radio-wave-effect'),
                                    ...this.state.getAttrs(item).waveEffectOff
                                })
                            ]),
                            this.handleComponent(item.label,'span',{})
                        ])
                    ])
                }
                return m('div',{
                    class: classNames('custom-control','custom-radio',item.class,cx('radio-list')),
                    ...this.state.getAttrs(item).list
                },[
                    m('input[type="radio"]', {
                        class: classNames('custom-control-input'),
                        ...this.state.getAttrs(item).radio
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