import m from 'mithril'


export default class YearPicker {
    years() {
        let years = []
        for (let i = 1950; i < 2050; i++) {
            years.push(i)
        }
        return years
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
                class: cx('year-panel')
            }, [
                this.years().map(item => {
                    return m('div', {
                        class: cx('cell'),
                        onclick: (e) => {
                            e.preventDefault()
                            toggle(item)
                        }
                    }, `${item}年`)
                })
            ])
        ])
    }
}