import m from 'mithril'
import {
    Carousel
} from '@base'
import { colorSet,CodeTemplate,TableTemplate,TableRow } from '../tool';
const cs = colorSet

export default class CarouselPage {
    view() {
        const Carousel_01 = m(Carousel,{
            childrens: [{
                component: m('img',{src:'./img/banner-1.png'})
            },{
                component: m('img',{src:'./img/banner-2.png'})
            },{
                component: m('img',{src:'./img/banner-3.png'})
            }]
        })
        
        return m('.main', [
            m('.header.bg-light.navbar.navbar-light', {
                style: {
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    backgroundColor: '#cceecc',
                    zIndex: 1,
                }
            }, [
                m('a.navbar-brand', {
                    href: '#!/'
                }, 'miix-components')
            ]),
            m('.container.pt-5', [
                m('h3.pt-5', 'Carousel'),
                m('.row.text-center', [
                    m('.col-12.py-3', [
                        m(Carousel,{
                            childrens: [{
                                component: m('img',{src:'./img/banner-1.png'})
                            },{
                                component: m('img',{src:'./img/banner-2.png'})
                            },{
                                component: m('img',{src:'./img/banner-3.png'})
                            }]
                        })
                    ]),
                    m('.col-12.my-3.text-left',[
                        m(CodeTemplate,[`
`,cs('#c188bb','import'),` {`,cs('#96d8fb','Carousel'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#dadbaf','m'),`(`,cs('#96d8fb','Carousel'),`,{
    `,cs('#96d8fb','childrens'),`: [{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-1.png'`),`})
    },{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-2.png'`),`})
    },{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-3.png'`),`})
    }]
})\n
`
                        ]),
                    ]),
                    m('.col-12.py-3',[
                        m(Carousel,{
                            options:{
                                autoplay: true,
                                carouselShow: 3,
                            },
                            childrens: [{
                                component: m('img',{src:'./img/banner-1.png'})
                            },{
                                component: m('img',{src:'./img/banner-2.png'})
                            },{
                                component: m('img',{src:'./img/banner-3.png'})
                            }]
                        })
                    ]),
                    m('.col-12.py-3',[
                        m(Carousel,{
                            options:{
                                autoplay: true,
                                playDirection: false,
                                carouselScroll: 2,
                                initIndex: 1,
                            },
                            childrens: [{
                                component: m('img',{src:'./img/banner-1.png'})
                            },{
                                component: m('img',{src:'./img/banner-2.png'})
                            },{
                                component: m('img',{src:'./img/banner-3.png'})
                            }]
                        })
                    ]),
                    m('.col-12.py-3', [
                        m('.py-3',[
                            m('button',{
                                onclick: ()=>{
                                    Carousel_01.state.method.onChangeEvent(0)
                                }
                            },'onChangeEvent goToList 01'),
                            m('button',{
                                onclick: ()=>{
                                    Carousel_01.state.method.onChangeEvent(1)
                                }
                            },'onChangeEvent goToList 02'),
                            m('button',{
                                onclick: ()=>{
                                    Carousel_01.state.method.onChangeEvent(2)
                                }
                            },'onChangeEvent goToList 03'),
                        ]),
                        Carousel_01,
                    ]),
                
                    m('.col-12.my-3.text-left',[
                        m(CodeTemplate,[`
`,cs('#6AAF4E','//可呼叫函式的方法'),`\n
`,cs('#c188bb','import'),` {`,cs('#96d8fb','Carousel'),`} `,cs('#c188bb','from'),` `,cs('#cb917b',`'miix-components'`),`\n
`,cs('#579cd5','const'),` `,cs('#50c8af','CarouselVnode'),` = `,cs('#dadbaf','m'),`(`,cs('#96d8fb','Carousel'),`,{
    `,cs('#96d8fb','childrens'),`: [{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-1.png'`),`})
    },{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-2.png'`),`})
    },{
        `,cs('#96d8fb','component'),`: `,cs('#dadbaf','m'),`(`,cs('#cb917b',`'img'`),`,{`,cs('#96d8fb','src'),`:`,cs('#cb917b',`'./img/banner-3.png'`),`})
    }]
})\n
`,cs('#dadbaf','m'),`(`,cs('#cb917b',`'div'`),`, `,cs('#50c8af','CarouselVnode'),`)\n
`,cs('#6AAF4E','//可使用vnode來呼叫方法'),`
`,cs('#50c8af','CarouselVnode'),`.`,cs('#96d8fb','state'),`.`,cs('#96d8fb','method'),`.`,cs('#dadbaf','onChangeEvent'),`(`,cs('#96d8fb','gotolist'),`)
`,cs('#6AAF4E','//可針對HTMLElement對象來呼叫方法'),`
`,cs('#50c8af','HTMLElement'),`.`,cs('#dadbaf','onChangeEvent'),`(`,cs('#96d8fb','gotolist'),`)
\n
`                       ]),
                    ]),
                ]),

                m('.h4','JS接口'),
                m(TableTemplate,{
                    colgroup: ['20%','12%','7%','auto']
                },[
TableRow(['Attributes'             ,'Type'          ,'Default','Description'],'th'),
TableRow(['options.initIndex'      ,'number'        ,'0'      ,'進入畫面時初始為第幾張幻燈片(第一張為0)']),
TableRow(['options.autoplay'       ,'boolen'        ,'false'  ,'是否自動輪播']),
TableRow(['options.autoplaySpeed'  ,'number'        ,'5000'   ,'自動輪播的等待間隔']),
TableRow(['options.playDirection'  ,'boolen'        ,'true'   ,'自動輪播時的方向']),
TableRow(['options.carouselScroll' ,'number'        ,'1'      ,'每次滑動的數量']),
TableRow(['options.carouselShow'   ,'number'        ,'1'      ,'顯示在可見範圍的幻燈片數']),
TableRow(['options.speed'          ,'number'        ,'300'    ,'滑動的速度']),
TableRow(['options.cssEase'        ,'string'        ,'linear' ,'滑動的CSS緩動貝賽爾曲線']),
TableRow(['options.arrows'         ,'boolen object' ,'true'   ,'是否要左右箭頭']),
TableRow(['options.arrows.children','string mithril','default','箭頭內的元素']),
TableRow(['options.arrows.onclick' ,'function'      ,'null'   ,'點擊箭頭前額外觸發的事件']),
TableRow(['options.dots'           ,'boolen'        ,'true'   ,'是否要輪播序的提示點圖形']),
TableRow(['options.touch'          ,'boolen'        ,'true'   ,'是否在觸控設備可以被滑動']),
TableRow(['events.beforeChange'    ,'function'      ,'null'   ,'在點擊事件後準備更換下一張幻燈片前']),
TableRow(['events.afterChange'     ,'function'      ,'null'   ,'更換下一張幻燈片後']),
TableRow(['childrens.component'    ,'array'         ,'null'   ,'幻燈片內要放置的元素']),
TableRow(['childrens.dots'         ,'string mithril','null'   ,'輪播序的提示點圖形內要追加的元素']),
TableRow(['childrens.dotsClass'    ,'string'        ,'null'   ,'輪播序的提示點圖形要附加的cssClassName']),
                ]),
                m('.h4','JS Method'),
                m(TableTemplate,{
                    colgroup: ['15%','20%','auto']
                },[
TableRow(['Method','Argument','Description'],'th'),
TableRow(['onChangeEvent',
            `number gotolist = null`,
            `設定要前進至哪一張幻燈片`]),

                ]),
            ])
        ])
    }
}