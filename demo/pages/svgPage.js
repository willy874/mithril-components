import m from 'mithril'
import * as Icon from '@src/m2x-icon/core'

export default class{
    constructor(vnode) {
        this.IconArray = []
        for (let path in Icon) {
            if(path != 'Icon') 
                this.IconArray.push({
                    path: Icon[path],
                    name: path
                })
        }
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
                
                m('h3.pt-5',['SVG']),
                m('.row',[
                    this.IconArray.map(item =>{
                        return m('.text-center',{
                            style:{
                                flex: '0 0 12.5%',
                                maxWidth: '12.5%',
                                padding: '15px'
                            }
                        },[
                            m('i',m(item.path)),
                            m('span.py-2.d-inline-block',item.name)
                        ])
                    })
                    
                ]),
                m('pre',{
                    style: {
                        backgroundColor: '#272c34',
                        color: '#fff'
                    }
                },[
                    m('code',[
`
    <style>
        i{
            display: block,
            width: `,m('span[style="color:#e6db74;"]','1rem'),`,
            height: `,m('span[style="color:#e6db74;"]','1rem'),`,
        }
        svg{
            display: block,
            width: `,m('span[style="color:#e6db74;"]','1rem'),`,
            height: `,m('span[style="color:#e6db74;"]','1rem'),`,
            fill: `,m('span[style="color:#e6db74;"]','#fff'),`
        }

    <style>

    <--Version ECMAScript6-->

    <script>
        import * as Icon from 'm2x-icon/core'
        m('i',m(Icon.`,m('span[style="color:#e6db74;"]','Name'),`))

    </script>

`
                    ])
                ]),
                m.trust(`
            <div style="max-width:1130px;margin:auto">
                <h4>JS接口</h4>
                <table class="table"style="width:100%">
                    <tbody>
                        <tr>
                            <td style="width:150px">Attributes</td>
                            <td style="width:100px">Option</td>
                            <td style="width:100px">Type</td>
                            <td style="width:100px">Default</td>
                            <td>Description</td>
                        </tr>
                        <tr>
                            <td>Icon[Name]</td>
                            <td>config</td>
                            <td>object</td>
                            <td>-</td>
                            <td>要放入svg的Attributes</td>
                        </tr>
                        <tr>
                            <td>config / attrs</td>
                            <td>viewBox</td>
                            <td>string</td>
                            <td>-</td>
                            <td>設定svg的viewBox</td>
                        </tr>
                        <tr>
                            <td>Icon[Name]</td>
                            <td>path</td>
                            <td>string</td>
                            <td>-</td>
                            <td>要放入svg的向量值</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                `),

            ])
        ])
    }
}