import m from 'mithril'
import stream from 'mithril/stream'

/**
 * @function (vnode) constructor 建立StateComponent的初始化
 * @param {Function} stream 管理資料流，以保存物件在Component空間。
 * @param {Function} checkAttrs 建立物件空間，防止找不到key而產生錯誤。
 * @param {Function} filterAttrs 排除為設定的屬性，以保護不傳入多餘屬性。
 * @param {Function} excludeAttrs 排除為設定的屬性，以保護不傳入特定屬性。
 * @param {Function} checkEvent 為所有事件添加額外參數與this.method。
 * @param {Function} handleComponent 判斷組件為何種類型，以正確讀取。
 * @param {Function} checkError 傳入hasError物件參數判斷當中的[error]是否錯誤。
 * @param {Function} addEventListenerTouch 建立一個觸控裝置滑動事件，可監聽四個方向的滑動。
 * @param {Function} isMobileDevice 判斷使用者當前是否使用行動設備。
 * @param {Function} createMethod 將 method 放入 options.method 的物件。
 * @param {Function} getCoordinateBox 取得絕對位置的box座標。
 */
export default class Component {
    constructor(vnode = {}){
        this.attrs = this.checkAttrs(vnode.attrs, ['options', 'childrens','events'])
        if (this.attrs) {
            this.options = this.checkAttrs(this.attrs.options, ['validate'])
            
            this.childrens = this.attrs.childrens
            this.events = this.checkAttrs(this.attrs.events, ['onclick','oninput', 'onchange','onfocus', 'onblur'])
        }
    }
/**
 * 管理資料流，以保存物件在Component空間。
 * @param {*} value any 任何要進行資料管理的變數
 */
    stream(value){
        return stream(value)
    }
/**
 * 建立物件空間，防止找不到key而產生錯誤。
 * @param {*} ops Object 進行處理的物件
 * @param {*} allows Array 要被建立的屬性
 * @return {*} Object
 */
    checkAttrs(ops,allows = []) {
        if(!ops){
            return new Object
        }
        allows.forEach(key => {
            if(!ops.hasOwnProperty(key)){
                ops[key] = undefined
            }
        })
        return ops
    }
/**
 * 排除為設定的屬性，以保護不傳入多餘屬性。
 * @param {*} ops Object 進行篩選的物件
 * @param {*} allows Array 要被列入的屬性(filterAttrs)
 * @return {*} Object
 */
    filterAttrs(ops = {},allows = []) {
        return Object.keys(ops)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: ops[key]
            };
        }, {});
    }
/**
 * 排除為設定的屬性，以保護不傳入特定屬性。
 * @param {*} ops Object 進行篩選的物件
 * @param {*} allows Array 要被排除的屬性
 * @return {*} Object
 */
    excludeAttrs(ops = {},allows = []) {
        return Object.keys(ops)
        .filter(key => !allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: ops[key]
            };
        }, {});
    }
    /**
     * 為所有事件添加額外參數與this.method。
     * @param {*} event Object 進行參數代入的物件
     * @return {*} Object
     */
    checkEvent(event) {
        if(!event){
            return false
        }
        const check = {}
        Object.keys(event).forEach(key => {
            if(typeof event[key] === 'function'){
                check[key] = (e,method = this.method,item = {}) => {
                    event[key](e,method,item)
                }
            }
        })
        return check
    }
/**
 * 判斷實體組件為何種類型，以正確讀取。
 * @param {*} cpo string vnode class 要傳入的組件
 * @param {string} tag 需要被 mithril 格式化的字串
 * @param {*} attrs Object 傳入組件的參數
 * @return {*} vnode
 */
    handleComponent(cpo , tag = 'div',attrs = {}) {
        if (!cpo) {
            return
        }
        if (typeof cpo === 'string') {
            return m(tag,attrs,m.trust(cpo))
        }
        if (typeof cpo === 'function' && cpo.prototype.hasOwnProperty('view')) {
            return m(cpo)
        }
        if (typeof cpo === 'object') {
            if(cpo.hasOwnProperty('dom')){
                return cpo
            }
            if(cpo instanceof HTMLElement){
                return Object.assign(m(cpo.localName),{
                    dom: cpo,
                    attrs
                })
            }
        }
    } 
    checkError(value,validateText) {
        if(!value){
            return validateText
        }
        return false
    }
/**
 * 建立一個觸控裝置滑動事件，可監聽四個方向的滑動。
 * @param {HTMLElement} dom HTMLElement 要被加入事件的元素
 * @param {*} event Object 可傳入事件的物件
 * @param {*} event.topEvent function
 * @param {*} event.leftEvent function
 * @param {*} event.rightEvent function
 * @param {*} event.bottomEvent function
 */
    addEventListenerTouch(dom,event = {}){
        if (typeof event != 'object') {
            throw new Error('傳入的event參數必須是個object')
        }
        const {
            topEvent,
            leftEvent,
            rightEvent,
            bottomEvent
        } = event
        if (dom instanceof HTMLElement) {
            dom.addEventListener('touchstart',(e)=>{
                this.startX = e.touches[0].pageX
                this.startY = e.touches[0].pageY
            }, false)
            dom.addEventListener('touchend',(e)=>{
                this.endX = e.changedTouches[0].pageX
                this.endY = e.changedTouches[0].pageY
                const direction = (function (startX, startY, endX, endY){
                    const dy = startY - endY;
                    const dx = endX - startX;
                    let result = 0;
                    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                        return result;
                    }
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    if(angle >= -45 && angle < 45) {
                        result = 4;
                    }else if (angle >= 45 && angle < 135) {
                        result = 1;
                    }else if (angle >= -135 && angle < -45) {
                        result = 2;
                    }
                    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                        result = 3;
                    }
                    return result;
                })(this.startX, this.startY, this.endX, this.endY)
                switch(direction) {
                    case 0: 
                    break;
                    case 1: if(topEvent) topEvent(e)
                        break;
                    case 2: if(bottomEvent) bottomEvent(e)
                        break;
                    case 3: if(leftEvent) leftEvent(e)
                        break;
                    case 4: if(rightEvent) rightEvent(e)
                        break;
                    default:           
                }
            }, false)
        }else{
            throw new Error('傳入的dom參數必須是個HTMLElement')
        }
    }
    /**
     * 判斷使用者當前是否使用行動設備
     * @return {*} boolen
     */
    isMobileDevice() {
        const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
        return  mobileDevice.some(e => navigator.userAgent.match(e))
    }
    /**
     * 將 method 放入 options.method 的物件
     * @param {*} method Object 要建立的 method
     */
    createMethod(method){
        this.method = method
        if(this.options.method){
            if (typeof this.options.method !== 'object') {
                throw new Error('method應該是一個object')
            }
            Object.assign(this.options.method,this.method)
        }
    }
    /**
     * 取得絕對位置的box座標
     * @param {*} target 要傳入的偵測DOM
     * @return box = { x , y , path }
     */
    getCoordinateBox(target){
        const box = {
            y: 0,
            x: 0,
            path: []
        }
        function boxCount(dom){
            const offsetParent = dom.offsetParent
            box.y = box.y + ((dom.offsetTop)?dom.offsetTop:0)
            box.x = box.x + ((dom.offsetLeft)?dom.offsetLeft:0)
            if (dom === document.body) {
                return document
            }
            box.path.push(offsetParent) 
            return boxCount(offsetParent)
        }
        box.path.push(boxCount (target))
        return box
    }
}

// if(process.env.NODE_ENV !== 'production'){
//     console.warn('');
// }