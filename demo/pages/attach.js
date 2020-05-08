import m from 'mithril'
import {
    Attach
} from '@base'

export default class AttachPage {
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
                m('h3.pt-5', 'Attach'),
                m('.row.text-center', [
                    m('.col-12', [
                        m(Attach, {
                            attachs: []
                        })
                    ])
                ])
            ])
        ])
    }
}