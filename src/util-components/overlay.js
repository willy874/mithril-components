import m from 'mithril'

//背景透明遮罩元件
export default class Overlay {
    view() {
        return m('div', {
            class: cx('overlay'),
            onclick: (e) => {
                e.preventDefault()
                //close 元件
            }
        })
    }
}