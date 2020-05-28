import m from 'mithril';
/**
 * @param {*} e 事件參數
 * @param {*} goToList Number 指定onChangeEvent至哪一張幻燈片，goToList === null 為第一次初始化行為。
*/
export default function onChangeEvent (e , goToList = null){
    const {
        panel,
        panelItem,
        childrens,
        cssEase,
        speed,
        autoplay,
        autoplaySpeed,
        carouselScroll,
        carouselShow,
        playDirection
    } = e.state
    //判斷輪播動畫中不可執行 onChangeEvent()
    if (e.state.animation) {
        return
    }
    //執行 beforeChange()
    if(e.events.beforeChange){
        e.events.beforeChange(e)
    }
    //重置定時器
    if(autoplay){
        window.clearTimeout(e.state.timer)
    }
    //禁止動畫中觸發 onChangeEvent()
    e.state.animation = true
    //計算 translateX 執行動畫播放
    panel.style.transition = (goToList === null)?'null':`${speed/1000}s transform ${cssEase}`
    const translateX = (e.state.order - goToList) * (100/carouselShow)
    panel.style.transform = `translateX(${translateX}%)`
    //要執行的完成動畫事件
    const transitionEndEnent = ()=>{
        panel.style.transition = null
        panel.style.transform = `translateX(0)`
        const scroll = Math.abs(e.state.order - goToList)
        for (let i = scroll;i--;){
            if(e.state.order - goToList < 0){
                panelItem.push(panelItem.shift())
            }else{
                panelItem.unshift(panelItem.pop())
            }
        }
        panel.removeEventListener('transitionend',transitionEndEnent)
        m.redraw()
        if(goToList >= childrens.length){
            e.state.order = goToList - childrens.length
        }else if(goToList < 0){
            e.state.order = goToList + childrens.length
        }else if(goToList === null){
            e.state.order = 0
        }else{
            e.state.order = goToList
        }
        
        e.state.animation = false
        //判斷是否自動撥放
        if(autoplay){
            const nextChange = (playDirection)?e.state.order + carouselScroll:e.state.order - carouselScroll
            e.state.timer = setTimeout(e.onChangeEvent , autoplaySpeed, e,nextChange)
        }
        //執行 afterChange()
        if(e.events.afterChange){
            e.events.afterChange(e)
        }    
        
    }
    if(goToList === null){
        transitionEndEnent()
    }else{
        panel.addEventListener('transitionend',transitionEndEnent)
    }
}