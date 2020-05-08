import m from 'mithril'
import classNames from 'classnames/bind'
import {Component} from '../util-components'
import styles from './styles/carousel.css'
const cx = classNames.bind(styles)

export default class Carousel extends Component {
    constructor(vnode){
        super()
        const {
            events,
            options,
            childrens
        } = vnode.attrs
        this.events = this.checkAttrs(events, ['beforeChange','afterChange'])
        this.options = this.checkAttrs(options, [
            'initIndex','autoplay','autoplaySpeed','playDirection','cssEase','infinite','carouselScroll','carouselShow','speed'
        ])
        this.childrens = this.checkAttrs(childrens,['component','disabled'])
        this.panelItem = []
        this.childrens.forEach((el,i) => {
            el.order = i
        })
        this.childrens.forEach(el => {
            this.panelItem.push(new Object({
                key: this.panelItem.length,
                order: el.order,
                component: el.component
            }))
        })
        this.state = {
            initIndex: this.options.initIndex || 1,
            order: this.options.initIndex || 1,
            autoplaySpeed: this.options.autoplaySpeed || 5000,
            autoplay: this.options.autoplay || false,
            playDirection: this.options.playDirection,
            infinite: (this.options.infinite)? this.options.infinite : true,
            cssEase: this.options.cssEase || 'linear',
            carouselScroll: this.options.carouselScroll || 1,
            carouselShow: this.options.carouselShow || 1,
            speed: this.options.speed || 600,
            childrens: this.childrens || [],
            panelItem: this.panelItem || []
        }
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
            throw new Error('carouselShow的設定數量過多')
        }
        //設定 panelItem 的 key
        this.state.panelItem.forEach((el,i) => {
            el.key = i
        })
        //設定 panelItem 的排序
        this.state.panelItem.push(this.state.panelItem.shift())
        //要進入 noChangeEvent 的參數
        this.changeEvent = {
            state: this.state,
            events: this.events,
            noChangeEvent: this.noChangeEvent
        }
        //執行第一次循環播放
        if(this.state.autoplay){
            this.state.timer = setTimeout(this.noChangeEvent , this.state.autoplaySpeed,this.changeEvent)
        }
    }
    /**
     * @param {noChangeEvent(goToList)}
     * goToList === true，下一張；
     * goToList === false，上一張；
     * goToList 指定至哪一張；
    */
    noChangeEvent(e , goToList = null){
        const {
            panel,
            panelItem,
            childrens,
            cssEase,
            speed,
            autoplay,
            autoplaySpeed,
            carouselScroll,
            carouselShow,
            playDirection
        } = e.state
        //判斷方向或使用goToList
        const direction = (goToList === null)? playDirection : goToList
        //判斷輪播動畫中不可執行 noChangeEvent()
        if (e.state.animation) {
            return
        }
        //執行 beforeChange()
        if(e.events.beforeChange){
            e.events.beforeChange(e)
        }
        //重置定時器
        if(autoplay){
            window.clearTimeout(e.state.timer)
        }
        //禁止動畫中觸發 noChangeEvent()
        e.state.animation = true
        //計算 translateX 執行動畫播放
        panel.style.transition = `${speed/1000}s transform ${cssEase}`
        const translateX = (goToList && typeof goToList!=='boolean')
        ? (e.state.order - goToList) * (100/carouselShow)
        : carouselScroll * (100 / carouselShow)
        panel.style.transform = `translateX(${(direction?-1:1) * translateX}%)`
        //要執行的完成動畫事件
        const transitionEndEnent = ()=>{
            panel.style.transition = null
            panel.style.transform = `translateX(0)`
            if(goToList && typeof goToList!=='boolean'){
                console.log('goToList',goToList,'order',e.state.order);
                const scroll = Math.abs(e.state.order - goToList)
                for (let i = scroll;i--;){
                    if(e.state.order - goToList > 0){
                        panelItem.push(panelItem.shift())
                    }else{
                        panelItem.unshift(panelItem.pop())
                    }
                }
            }else{
                for (let i = carouselScroll;i--;){
                    if(direction){
                        panelItem.push(panelItem.shift())
                    }else{
                        panelItem.unshift(panelItem.pop())
                    }
                }
            }
            panel.removeEventListener('transitionend',transitionEndEnent)
            m.redraw()
            if(goToList && goToList<childrens.length){
                e.state.order = (goToList !== true)? goToList : e.state.order
            }
            e.state.animation = false
            //判斷是否自動撥放
            if(autoplay){
                e.state.timer = setTimeout(e.noChangeEvent , autoplaySpeed, e)
            }
            //執行 afterChange()
            if(e.events.afterChange){
                e.events.afterChange(e)
            }    
            
        }
        panel.addEventListener('transitionend',transitionEndEnent)
    }

    oncreate (vnode){
        const dom = vnode.dom
        dom.state = this.state
        this.state.target = dom
        dom.noChangeEvent = (goToList)=>{
            this.noChangeEvent(this.changeEvent,goToList)
        }
        this.state.panel = dom.querySelectorAll(`.${cx('carousel-panel')}`)[0]
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
            initIndex
        } = this.state
        const orderList = initIndex%panelItem.length
        this.state.order = panelItem[carouselScroll + orderList].order
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
                            transform: `translateX(-${carouselScroll + orderList}00%)`,
                        },
                        class: cx('carousel-panel-item'),
                        key: item.key,
                        'data-key': item.key,
                        'data-order': item.order,
                        oncreate: (vd)=>{
                            panelItem[index].dom = vd.dom
                        },
                    },item.component)
                })
            ]),
            m('div',{
                class: cx('carousel-arrow','carousel-arrow-left'),
                onclick: (e) => {
                    this.noChangeEvent({
                        ...this.changeEvent,
                        onclickEvent: e
                    },false)
                }
            },[
                m('i',{
                    class: cx('carousel-arrow-icon'),
                })
            ]),
            m('div',{
                class: cx('carousel-arrow','carousel-arrow-right'),
                onclick: (e) => {
                    this.noChangeEvent({
                        ...this.changeEvent,
                        onclickEvent: e
                    },true)
                }
            },[
                m('i',{
                    class: cx('carousel-arrow-icon'),
                })
            ]),
            m('div',{
                class: cx('carousel-dots')
            },[
                childrens.map((item, index) =>{
                    return m('div',{
                        class: cx('carousel-dots-item',{
                            active: index == this.state.order
                        }),
                        onclick: (e) => {
                            this.noChangeEvent({
                                ...this.changeEvent,
                                onclickEvent: e
                            },index)
                        }
                    })
                })
            ])
        ])
    }
}