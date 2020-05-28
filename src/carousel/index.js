import m from 'mithril'
import {Component} from '../util-components'
import ArrowComponent from './arrows'
import settings from './default'
import onChangeEvent from './onChangeEvent'
import classNames from 'classnames/bind'
import styles from './styles/carousel.css'
const cx = classNames.bind(styles)

export default class Carousel extends Component {
    constructor(vnode){
        super()
        const {
            events,
            options,
            childrens,
        } = vnode.attrs
        this.method = {}
        this.events = this.checkAttrs(events, ['beforeChange','afterChange'])
        this.options = options
        this.childrens = this.checkAttrs(childrens,['component','disabled'])
        //置入預設設定
        this.state = Object.assign({},settings,this.options)
        //建立panelItem
        this.state.panelItem = []
        this.state.childrens = this.childrens
        this.state.childrens.forEach((el,i) => {
            el.order = i
        })
        this.state.childrens.forEach(el => {
            this.state.panelItem.push(new Object({
                key: this.state.panelItem.length,
                order: el.order,
                component: el.component
            }))
        })
        //追加 panelItem 陣列數以供顯示
        this.childrens.forEach(el => {
            this.state.panelItem.push(new Object({
                key: this.state.panelItem.length,
                order: el.order,
                component: el.component
            }))
        })
        const unshiftItem = []
        this.childrens.forEach(el => unshiftItem.push(el))
        unshiftItem.reverse().forEach(el => {
            this.state.panelItem.unshift(new Object({
                key: this.state.panelItem.length,
                order: el.order,
                component: el.component
            }))
        })
        if(this.state.panelItem.length < this.state.carouselShow + this.state.carouselScroll + this.state.initIndex){
            throw new Error('childrens的設定數量太少')
        }
        //設定 panelItem 的 key
        this.state.panelItem.forEach((el,i) => {
            el.key = i
        })
        //設定 panelItem 的排序
        this.state.panelItem.push(this.state.panelItem.shift())
        //要進入 onChangeEvent 的參數
        this.changeEvent = {
            state: this.state,
            events: this.events,
            onChangeEvent: onChangeEvent
        }
        //執行初始化定位
        this.state.timer = setTimeout(onChangeEvent,0,this.changeEvent)
    }
    oncreate (vnode){
        const dom = vnode.dom
        dom.state = this.state
        this.state.target = dom
        this.method.onChangeEvent = (goToList)=>{
            onChangeEvent(this.changeEvent,goToList)
        }
        dom.onChangeEvent = (goToList)=>{
            onChangeEvent(this.changeEvent,goToList)
        }
        this.state.panel = dom.querySelector(`.${cx('carousel-panel')}`)
        this.state.bannerWidth = dom.offsetWidth
        const carouselItem = dom.querySelectorAll(`.${cx('carousel-panel-item')}`)
        for (let i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.width = `${this.state.bannerWidth}px`
        }
        //觸控滑動事件
        if(this.state.touch){
            this.addEventListenerTouch(dom,{
                leftEvent: (e)=>{
                    onChangeEvent({
                        ...this.changeEvent,
                        touchEvent: e
                    },this.state.order + this.state.carouselScroll)
                },
                rightEvent: (e)=>{
                    onChangeEvent({
                        ...this.changeEvent,
                        touchEvent: e
                    },this.state.order - this.state.carouselScroll)
                }
            })
        }
    }
    onbeforeupdate(vnode){
        this.state = Object.assign(this.state,vnode.attrs.state)
    }
    onupdate(vnode){
        const dom = vnode.dom
        this.state.bannerWidth = dom.offsetWidth
        const carouselItem = dom.querySelectorAll(`.${cx('carousel-panel-item')}`)
        for (let i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.width = `${this.state.bannerWidth}px`
        }
    }
    view(vnode){
        const {
            carouselScroll,
            carouselShow,
            childrens,
            panelItem,
            bannerWidth,
            initIndex,
            arrows,
            dots
        } = this.state
        
        const orderList = initIndex%panelItem.length
        this.state.orderKey = panelItem[carouselScroll + orderList].key
        return m('div',{
            class: cx('carousel'),
            'data-order': this.state.order,
            'data-orderkey': this.state.orderKey,
        },[
            m('div',{
                class: cx('carousel-panel')
            },[
                panelItem.map((item, index , array)=>{
                    
                    return m('div',{
                        style: {
                            width: `${bannerWidth}px`,
                            transform: `translateX(-${childrens.length + orderList}00%)`,
                            maxWidth: `${100/carouselShow}%`,
                        },
                        class: cx('carousel-panel-item'),
                        key: item.key,
                        'data-key': item.key,
                        'data-order': item.order,
                        oncreate: (vd)=>{
                            panelItem[index].dom = vd.dom
                        },
                    },this.handleComponent(item.component))
                })
            ]),

            (arrows)? m(ArrowComponent,{
                ...arrows,
                arrowIcon: arrows.children || m('i',{class: cx('carousel-arrow-icon')}),
                arrowClass: cx('carousel-arrow','carousel-arrow-left'),
                changeEvent: this.changeEvent,
                onChangeEvent:  (e) => {
                    onChangeEvent({
                        ...this.changeEvent,
                        onclickEvent: e
                    },this.state.order - carouselScroll)
                },
            }):'',

            (arrows)? m(ArrowComponent,{
                ...arrows,
                arrowIcon: m('i',{class: cx('carousel-arrow-icon')}),
                arrowClass: cx('carousel-arrow','carousel-arrow-right'),
                changeEvent: this.changeEvent,
                onChangeEvent:  (e) => {
                    onChangeEvent({
                        ...this.changeEvent,
                        onclickEvent: e
                    },this.state.order + carouselScroll)
                },
            }):'',

            (dots)? m('div',{
                class: cx('carousel-dots')
            },[
                childrens.map((item, index) =>{
                    const {
                        dots,
                        dotsClass
                    } = item
                    return m('div',{
                        class: classNames(dotsClass,cx('carousel-dots-item',{
                            active: index == this.state.order
                        })),
                        onclick: (e) => {
                            onChangeEvent({
                                ...this.changeEvent,
                                onclickEvent: e
                            },index)
                        }
                    },this.handleComponent(dots))
                })
            ]):''
        ])
    }
}

/**
 * 待製作功能:
 * 1.RWD
 * 2.滑動
 */