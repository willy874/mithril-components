import m from 'mithril'


export default class MonthPicker {
    months() {
        let months = []
        for (let i = 0; i < 12; i++) {
            months.push(`${i + 1}月`)
        }
        return months
    }
    view(vnode) {
        const {
            cx,
            toggle
        } = vnode.attrs
        return m('div', {
            class: cx('year-month-picker', 'show')
        }, [
            m('div', {
                class: cx('month-panel')
            }, [
                this.months().map((item, index) => {
                    return m('div', {
                        class: cx('cell'),
                        onclick: (e) => {
                            e.preventDefault()
                            toggle(index)
                        }
                    }, item)
                })
            ])
        ])
    }
}