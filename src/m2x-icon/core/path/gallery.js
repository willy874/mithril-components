import ICON from '../icon'

export default class Gallery extends ICON {
    config() {
        return {
            viewBox: `0 0 24 24`
        }
    }
    path() {
        return `<path d="m23.25 18h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m23.25 21h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m23.25 24h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path d="m22.25 15h-20.5c-.965 0-1.75-.785-1.75-1.75v-11.5c0-.965.785-1.75 1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v11.5c0 .965-.785 1.75-1.75 1.75zm-20.5-13.5c-.138 0-.25.112-.25.25v11.5c0 .138.112.25.25.25h20.5c.138 0 .25-.112.25-.25v-11.5c0-.138-.112-.25-.25-.25z"/><path d="m.75 12.9c-.202 0-.403-.081-.551-.241-.281-.304-.263-.778.042-1.06l5.54-5.12c.692-.641 1.759-.62 2.429.05l3.61 3.61c.098.098.262.098.36 0l5.619-5.63c.669-.652 1.72-.68 2.401-.068l3.549 3.159c.31.275.337.75.062 1.06-.274.309-.749.338-1.059.062l-3.55-3.16c-.098-.088-.249-.079-.348.017l-5.613 5.621c-.684.684-1.796.685-2.48 0l-3.611-3.61c-.099-.099-.25-.104-.351-.009l-5.54 5.12c-.144.134-.327.199-.509.199z"/>`
    }
}