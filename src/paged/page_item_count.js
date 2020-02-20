import m from 'mithril'

class PageItemCount {
    constructor(vnode) {
        this.pageRange = 4
        this.computeCount(vnode.attrs)
    }
    computeCount(attrs) {
        this.start = (attrs.page == 1) ? 1 : ((attrs.page - 1) * attrs.pageSize + 1)
        this.end = ((this.start + attrs.pageSize) > attrs.total) ? attrs.total : (this.start + attrs.pageSize - 1)
    }
    onbeforeupdate({
        attrs
    }) {
        this.computeCount(attrs)
    }
    view({
        attrs
    }) {
        return [
            m('.d-block', {
                class: attrs.class
            }, [
                (this.start && this.end) ?
                m('.d-inline-block', [
                    `第${this.start}項到${this.end}項,共${attrs.total}項`
                ]) : ''
            ])
        ]
    }
}

export default PageItemCount