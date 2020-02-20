import m from 'mithril'
import classNames from 'classnames'

class Pagination {
    constructor(vnode) {
        this.hasFirst = false
        this.hasMoreNext = false
        this.hasMorePrev = false
        this.hasLast = false
        this.pages = []
        this.pageRange = 4
        this.computePages(vnode.attrs)
    }
    getPageRanges(start, end) {

        let ranges = []
        for (let i = start; i <= end; i++) {
            ranges.push(i)
        }
        this.pages = ranges
    }
    computePages(attrs) {
        let pageRange = this.pageRange
        let totalPage = attrs.pageCount

        let rangeStart = attrs.page - pageRange

        let rangeEnd = attrs.page + pageRange

        if (rangeEnd > totalPage) {
            rangeEnd = totalPage
            rangeStart = totalPage - pageRange * 2;
            rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }
        if (rangeStart <= 1) {
            rangeStart = 1;
            rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }
        this.hasFirst = (rangeStart == 1)
        this.hasLast = (rangeEnd == totalPage)
        this.getPageRanges(rangeStart, rangeEnd)
    }
    onbeforeupdate({
        attrs
    }) {
        this.computePages(attrs)
    }
    view({
        attrs
    }) {
        return [
            (attrs.pageCount > 1) ? [
                m('nav', {
                    class: attrs.nav
                }, [
                    m('ul.pagination', {
                        class: attrs.pagination
                    }, [
                        m('li.page-item', {
                            class: classNames({
                                'disabled': this.hasFirst
                            })
                        }, [
                            m('a.page-link', {
                                href: '#',
                                onclick: (e) => {
                                    e.preventDefault()
                                    attrs.pageUrl(1)
                                }
                            }, [
                                m('span', m.trust('&laquo;'))
                            ])
                        ]),
                        this.pages.map((item) => {
                            return [
                                m('li.page-item', {
                                    class: classNames({
                                        'active': item == attrs.page
                                    })
                                }, [
                                    m('a.page-link', {

                                        href: '#',
                                        onclick: (e) => {
                                            e.preventDefault()
                                            attrs.pageUrl(item)
                                        }
                                    }, item)
                                ]),
                            ]
                        }),
                        m('li.page-item', {
                            class: classNames({
                                'disabled': this.hasLast
                            })
                        }, [
                            m('a.page-link', {
                                href: '#',
                                onclick: (e) => {
                                    e.preventDefault()
                                    attrs.pageUrl(attrs.pageCount)
                                }
                            }, [
                                m('span', m.trust('&raquo;'))
                            ])
                        ])
                    ])
                ])
            ] : ''

        ]
    }
}

export default Pagination