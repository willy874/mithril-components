import m from 'mithril'
import {
    Carousel
} from '@base'

export default class CarouselPage {
    view() {
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
                    m('.col-12', [
                        m(Carousel,{
                            options:{
                                autoplay: true,
                                playDirection: true,
                            },
                            childrens: [{
                                component: m('img',{src:'./img/banner-1.png'})
                            },{
                                component: m('img',{src:'./img/banner-2.png'})
                            },{
                                component: m('img',{src:'./img/banner-3.png'})
                            }]
                        }),
                        // m(Carousel,{
                        //     options:{
                        //         autoplay: true,
                        //         playDirection: false,
                        //     },
                        //     childrens: [{
                        //         component: m('img',{src:'./img/banner-1.png'})
                        //     },{
                        //         component: m('img',{src:'./img/banner-2.png'})
                        //     },{
                        //         component: m('img',{src:'./img/banner-3.png'})
                        //     }]
                        // }),
                        // m(Carousel,{
                        //     options:{
                        //         autoplay: true,
                        //         playDirection: true,
                        //         carouselScroll: 2
                        //     },
                        //     childrens: [{
                        //         component: m('img',{src:'./img/banner-1.png'})
                        //     },{
                        //         component: m('img',{src:'./img/banner-2.png'})
                        //     },{
                        //         component: m('img',{src:'./img/banner-3.png'})
                        //     }]
                        // }),
                    ])
                ])
            ])
        ])
    }
}