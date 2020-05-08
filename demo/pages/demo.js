import m from 'mithril'

export default class{
    constructor(vnode) {
    }
    view(vnode) {
        return m('.main',[
            m.trust(``),
            m('.header.bg-light.navbar.navbar-light',{
                style: {
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    backgroundColor: '#cceecc',
                    zIndex: 1,
                }
            },[
                m('a.navbar-brand',{
                    href: '#!/'
                },'miix-components')
            ]),
            m('.container.py-5'),
            m('.container',[
                
                m('h3.pt-5',['DemoPage']),
                
            ])
        ])
    }
}