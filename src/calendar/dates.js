import m from 'mithril'
import moment from 'moment'

function getCalendar(firstDayOfMonth) {
    const weekday = parseInt(firstDayOfMonth.format('e'))
    const lastMonthDate = parseInt(moment(firstDayOfMonth).add(-1, 'month').daysInMonth())
    const daysOfMonth = parseInt(moment(firstDayOfMonth).daysInMonth())
    const dates = []
    for (let i = 0; i <= weekday; i++) {
        dates[i] = lastMonthDate - weekday + i + 1
    }
    for (let i = 0; i < daysOfMonth; i++) {
        dates[i + weekday] = i + 1;
    }
    if (dates.length < 42) {
        let i = 0;
        while (dates.length < 42) {
            dates[dates.length] = ++i;
        }
    }
    return {
        dates,
        weekday,
        daysOfMonth
    }
}

export default class DateComponent {
    constructor(vnode) {
        let {
            firstDayOfMonth
        } = vnode.attrs
        this.dates = []
        this.weekday = 0
        this.daysOfMonth = 0
        this.firstDay = firstDayOfMonth.format()
        this.handleDateChange(firstDayOfMonth)
    }
    handleDateChange(firstDayOfMonth) {
        const {
            dates,
            weekday,
            daysOfMonth
        } = getCalendar(firstDayOfMonth)
        this.dates = dates
        this.weekday = weekday
        this.daysOfMonth = daysOfMonth
    }
    onbeforeupdate(vnode) {
        const {
            firstDayOfMonth,
            isCurrent
        } = vnode.attrs

        if (isCurrent && this.firstDay != firstDayOfMonth.format()) {
            this.handleDateChange(firstDayOfMonth)
            this.firstDay = firstDayOfMonth.format()
        }
    }
    notInMonth(index) {
        return (index < 7 && index < this.weekday) || (index - this.weekday >= this.daysOfMonth)
    }
    isSelected(day, selectedDate, theSameMonth, isInMonth) {
        if (theSameMonth && isInMonth) {
            return day == selectedDate().date()
        }
        return false
    }
    view(vnode) {
        const {
            cx,
            isCurrent,
            direction,
            selectedDate,
            firstDayOfMonth
        } = vnode.attrs

        const theSameMonth = selectedDate().isSame(firstDayOfMonth, 'month')
        return m('div', {
            class: cx('calendar-content', {
                'calendar-moveToRight': (isCurrent && direction == 'right'),
                'calendar-moveFromLeft': (isCurrent === false && direction == 'right'),
                'calendar-moveToLeft': (isCurrent && direction == 'left'),
                'calendar-moveFromRight': (!isCurrent && direction == 'left'),
            })
        }, [
            this.dates.map((day, index) => {
                const isNotInMonth = this.notInMonth(index, firstDayOfMonth, selectedDate)
                return m('div', {
                    class: cx('calendar-content-cell'),
                }, [
                    m('div', {
                        class: cx('calendar-day', {
                            'not-in-month': isNotInMonth,
                            'selected': this.isSelected(day, selectedDate, theSameMonth, isNotInMonth == false)
                        }),
                        onclick: (e) => {
                            e.preventDefault()
                            if (isNotInMonth) {
                                return false
                            }
                            if (index < 7 && index < this.weekday) {
                                selectedDate(moment(this.firstDay).add(-1, 'month').set('date', day))
                            } else if (index - this.weekday >= this.daysOfMonth) {
                                selectedDate(moment(this.firstDay).add(1, 'month').set('date', day))
                            } else {
                                selectedDate(moment(this.firstDay).set('date', day))
                            }
                        }
                    }, day)
                ])
            })
        ])
    }
}