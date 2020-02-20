const config = new WeakMap

export default class Config {
    static set(value = {}) {
        return config.set(this, value)
    }
    static get theme() {
        const _config = config.get(this)
        if (!_config.theme) {
            _config.theme = 'bootstrap'
        }
        return _config.theme
    }
}