const config = new WeakMap

class Config {
    set(value = {}) {
        config.set(this, value)
    }
    get theme() {
        let _config = config.get(this)
        return (_config) ? _config.theme : ''
    }
}

export default (new Config)