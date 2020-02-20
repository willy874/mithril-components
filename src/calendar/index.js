import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'
import classNames from 'classnames/bind'
import DateComponent from './dates'
import YearPicker from './years'
import MonthPicker from './months'
import style from './styles/calendar.css'
const cx = classNames.bind(style)

export default class Calendar {
    constructor(vnode) {
        //功能
        //初始值開始日期
        //僅顯示年,月
        //國曆,西元曆切換
        //disabled 特殊日期或日期區間
        let {
            selectedDate
        } = vnode.attrs
        this.selectedDate = stream(moment('2019-01-02'))
        const firstDate = moment(this.selectedDate()).set('date', 1)
        this.months = [firstDate]
        this.changeDirection = null
        this.toggle = stream(null)
    }
    oncreate(vnode) {
        //判斷位置
        if (vnode.dom) {
            const calendar = vnode.dom.querySelector(`.${cx('calendar')}`)
            calendar.classList.add(`${cx('show')}`)
        }

    }
    handleChange(currentMonth, direction) {
        if (this.months.length > 1) {
            return
        }
        if (direction == 'prev') {
            this.months.push(moment(currentMonth).add(-1, 'month'))
            this.changeDirection = 'right'

        } else {
            this.months.push(moment(currentMonth).add(1, 'month'))
            this.changeDirection = 'left'
        }

        setTimeout(() => {
            this.changeDirection = null
            this.months.shift()
            m.redraw()
        }, 500);
    }
    handlePicker(dom, toggle, type) {
        if (toggle()) {
            const picker = dom.querySelector(`.${cx('year-month-picker')}`)
            picker.classList.remove(`${cx('show')}`)
            picker.classList.add(`${cx('hide')}`)
            picker.addEventListener("animationend", () => {
                toggle(false)
                m.redraw()
            })
        } else {
            toggle(type)
        }
    }
    handleYearAndMonth({
        type,
        value
    }) {
        const currentMonth = this.months[0]
        currentMonth.set(type, value)
    }
    view(vnode) {
        const {
            show,
            close
        } = vnode.attrs

        return m('div', {
            class: cx('calendar-popup')
        }, [
            m('div', {
                class: cx('calendar')
            }, [
                m('div', {
                    class: cx('calendar-header')
                }, [
                    m('div', {
                        //使用flex
                        class: cx('calendar-controls')
                    }, [
                        m('div', {
                            class: cx('mat-button-wrapper')
                        }, [
                            m('button[type="button"]', {
                                class: cx('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault()
                                    this.handlePicker(vnode.dom, this.toggle, 'year')
                                }
                            }, [
                                m('span', {
                                    class: cx('header-year')
                                }, `${this.months[0].get('year')}年`)
                            ]),
                            m('button[type="button"]', {
                                class: cx('mat-button'),
                                onclick: (e) => {
                                    e.preventDefault()
                                    this.handlePicker(vnode.dom, this.toggle, 'month')
                                }
                            }, [
                                m('span', {
                                    class: cx('header-month')
                                }, `${this.months[0].get('month') + 1}月`)
                            ])
                        ]),
                        m('div', {
                            class: cx('mat-button-wrapper'),
                            style: {
                                visibility: this.toggle() ? 'hidden' : 'visible'
                            }
                        }, [
                            m('button[type="button"]', {
                                class: cx('mat-icon-button', 'calendar-previous-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'prev')
                                }
                            }),
                            m('button[type="button"]', {
                                class: cx('mat-icon-button', 'calendar-next-button'),
                                onclick: (e) => {
                                    this.handleChange(this.months[0], 'next')
                                }
                            })
                        ])
                    ])
                ]),
                m('div', {
                    class: cx('calendar-body', 'perspective')
                }, [
                    m('div', {
                        class: cx('calendar-weekly')
                    }, [
                        ['日', '一', '二', '三', '四', '五', '六'].map(item => {
                            return m('div', {
                                class: cx('cell')
                            }, item)
                        }),
                    ]),
                    m('hr', {
                        class: cx('calendar-divider')
                    }),
                    m('div', {
                        class: cx('perspective')
                    }, [
                        this.months.map(month => {
                            return m(DateComponent, {
                                cx,
                                key: month,
                                selectedDate: this.selectedDate,
                                //月份的第一天
                                firstDayOfMonth: month,
                                //是否為目前月份
                                isCurrent: this.months[0] == month,
                                direction: this.changeDirection
                            })
                        })
                    ]),
                    (this.toggle() === 'year') ? [
                        m(YearPicker, {
                            cx,
                            toggle: (value) => {
                                this.handlePicker(vnode.dom, this.toggle, 'year')
                                this.handleYearAndMonth({
                                    type: 'year',
                                    value
                                })
                            }
                        })
                    ] : null,
                    (this.toggle() === 'month') ? [
                        m(MonthPicker, {
                            cx,
                            toggle: (value) => {
                                this.handlePicker(vnode.dom, this.toggle, 'month')
                                this.handleYearAndMonth({
                                    type: 'month',
                                    value
                                })
                            }
                        })
                    ] : null
                ])
            ])
        ])
    }
}