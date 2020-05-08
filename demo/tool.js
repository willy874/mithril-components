import m from 'mithril'
function colorSet (color,text){
    return m('span', {
        style: {
            color: color
        }
    },text)
}

class CodeTemplate {
    view(vnode){
        return m('pre',{
            style: {
                backgroundColor: '#272c34',
                color: '#fff',
                padding: '0.125rem 3rem'
            }
        },[
            m('code',{
                style: { color: '#c9c9c9'}
            },vnode.children)
        ])
    }
}

class TableTemplate {
    view(vnode){
        const {
            colgroup
        } = vnode.attrs
        return m('table',{
            style: {
                width: '100%',
                marginBottom: '1rem',
                
            }
        },[
            m('colgroup',
                colgroup.map(col =>{
                    return m('col', {
                        style: {
                            width: col
                        }
                    })
                })
            ),
            m('tbody',vnode.children)
        ])
    }
}

function TableRow (td,tag = 'td'){
    return m('tr',[
        td.map(text =>{
            return m(tag,{
                style: {
                    border: '1px solid #333',
                    fontSize: (tag === 'th')? '1.125rem': '1rem',
                    padding: '0.25rem',
                    fontWeight: (tag === 'th')? '700' : null
                }
            },text)
        })
    ])
}
export {
    colorSet,
    CodeTemplate,
    TableTemplate,
    TableRow
} 