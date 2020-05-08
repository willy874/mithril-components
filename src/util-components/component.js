import m from 'mithril'
import stream from 'mithril/stream'

export default class Component {
    constructor(){
        this.stream = stream
    }
    checkAttrs(ops,allows) {
        if(!ops){
            return false
        }
        allows.forEach(key => {
            if(!ops.hasOwnProperty(key)){
                ops[key] = undefined
            }
        })
        return ops
    }
    filterAttrs(ops,allows) {
        return Object.keys(ops)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: ops[key]
            };
        }, {});
    }
    handleComponent(cpo , tag = 'div',attrs = {}) {
        if (!cpo) {
            return
        }
        if (typeof cpo === 'string') {
            return m(tag,attrs,cpo)
        }
        if (typeof cpo === 'object') {
            return cpo
        }
        if (typeof cpo === 'function') {
            return m(cpo)
        }
    }
    checkError(attrs) {
        if (attrs.hasOwnProperty('error')) {
            this.hasError(attrs.error)
        }
    }
}