import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/select.css'
import NativeSelectComponent from './native'
import GroupSelectComponent from './group'
import MaterialSelectComponent from './material'
import createSelect from './state'
const cx = classNames.bind(styles)

/**
 * @param Select
 */
export default class Select extends Component  {
    constructor(vnode) {
        super()

        //生成state
        this.state = createSelect({
            state: this,
            attrs: vnode.attrs
        })
    }
    childrensUpdate(init = false){}
    onbeforeupdate(vnode){
        this.state.onBeforeUpdate(vnode)
    }
    view(vnode) {
        return m('div', {
            style: this.state.style,
            class: classNames(this.state.class,'select-line',cx('select', this.state.theme,this.state.getValidCalss()))
        }, [
            /**
             * theme: 'native'
             */
            (this.state.theme === 'native') 
            ? m(NativeSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title','required','autofocus','size','error','success'])
            }) : null,
            /**
             * theme: 'group'
             */
            (this.state.theme === 'group') 
            ? m(GroupSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title','required','autofocus','size','error','success'])
            }) : null,
            /** 
             * theme: material bottomlime outline
            */
            (this.state.theme === 'material' || this.state.theme === 'bottomline' || this.state.theme === 'outline') 
            ? m(MaterialSelectComponent,{
                state: this.state,
                ...this.filterAttrs(vnode.attrs,['title'])
            }) : null,
        ])
    }
}