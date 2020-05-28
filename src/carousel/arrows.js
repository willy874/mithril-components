import m from 'mithril'
import {Component} from '../util-components'
import classNames from 'classnames'

export default class ArrowComponent extends Component{
    constructor(vnode){
        super()
        this.arrow = this.filterAttrs(vnode.attrs,[
            'children','onChangeEvent','changeEvent','arrowClass','arrowIcon','onclick'
        ])
    }
    view(vnode){
        const {
            //內部參數
            onChangeEvent,
            changeEvent,
            arrowClass,
            arrowIcon,
            //外部參數 arrows
            children,
            onclick,
        } = this.arrow
        return m('div',{
            class: classNames(arrowClass),
            onclick: (e)=>{
                if (onclick) {
                    onclick({
                        state: changeEvent.state,
                        onclickEvent: e
                    })
                }
                onChangeEvent(e)
            }
        },[
            this.handleComponent(children || arrowIcon)
        ])
    }
}


