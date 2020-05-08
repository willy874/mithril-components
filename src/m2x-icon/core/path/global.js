import ICON from '../icon'

export default class Gallery extends ICON {
    config() {
        return {
            viewBox: `0 0 512 512`
        }
    }
    path() {
        if(this.theme === 'bold'){
            return `
            <path d="m256 0c-141.160156 0-256 114.839844-256 256s114.839844 256 256 256 256-114.839844 256-256-114.839844-256-256-256zm-15 125.65625c-22.820312-.980469-45.410156-4.1875-66.980469-9.402344 3.445313-8.164062 7.183594-16.003906 11.214844-23.433594 16.539063-30.476562 36.84375-51.863281 55.765625-59.609374zm0 30.023438v85.320312h-93.691406c1.320312-33.300781 6.996094-66.359375 16.382812-96.429688 24.875 6.265626 50.988282 10.058594 77.308594 11.109376zm0 115.320312v85.320312c-26.320312 1.050782-52.433594 4.84375-77.308594 11.109376-9.386718-30.070313-15.0625-63.128907-16.382812-96.429688zm0 115.34375v92.445312c-18.921875-7.746093-39.226562-29.132812-55.765625-59.609374-4.03125-7.429688-7.769531-15.269532-11.214844-23.433594 21.570313-5.214844 44.15625-8.421875 66.980469-9.402344zm30 0c22.820312.980469 45.410156 4.1875 66.980469 9.402344-3.445313 8.164062-7.183594 16.003906-11.214844 23.433594-16.539063 30.476562-36.84375 51.863281-55.765625 59.609374zm0-30.023438v-85.320312h93.691406c-1.320312 33.300781-6.996094 66.359375-16.382812 96.429688-24.875-6.265626-50.988282-10.058594-77.308594-11.109376zm0-115.320312v-85.320312c26.320312-1.050782 52.433594-4.84375 77.308594-11.109376 9.386718 30.070313 15.0625 63.128907 16.382812 96.429688zm0-115.34375v-92.445312c18.921875 7.746093 39.226562 29.132812 55.765625 59.609374 4.03125 7.429688 7.769531 15.269532 11.214844 23.433594-21.570313 5.214844-44.160157 8.421875-66.980469 9.402344zm82.132812-47.144531c-7.511718-13.84375-15.671874-26.046875-24.273437-36.457031 29.992187 10.242187 57.160156 26.628906 80.007813 47.644531-13.03125 6.980469-27.074219 13.042969-41.847657 18.109375-4.191406-10.179688-8.824219-19.972656-13.886719-29.296875zm-194.265624 0c-5.0625 9.324219-9.695313 19.117187-13.886719 29.296875-14.773438-5.066406-28.816407-11.132813-41.847657-18.109375 22.847657-21.015625 50.015626-37.402344 80.007813-47.644531-8.601563 10.410156-16.757813 22.609374-24.273437 36.457031zm-24.035157 57.492187c-10.238281 32.753906-16.257812 68.460938-17.554687 104.996094h-86.765625c3.210937-48.753906 21.933593-93.339844 51.292969-128.832031 16.292968 9.34375 34.136718 17.335937 53.027343 23.835937zm-17.554687 134.996094c1.296875 36.539062 7.316406 72.242188 17.554687 104.996094-18.890625 6.5-36.734375 14.492187-53.027343 23.835937-29.359376-35.492187-48.082032-80.078125-51.292969-128.832031zm27.703125 133.191406c4.191406 10.179688 8.824219 19.972656 13.886719 29.296875 7.515624 13.84375 15.671874 26.046875 24.273437 36.457031-29.992187-10.242187-57.160156-26.628906-80.003906-47.644531 13.023437-6.976562 27.070312-13.042969 41.84375-18.109375zm208.152343 29.296875c5.0625-9.324219 9.695313-19.117187 13.886719-29.296875 14.773438 5.066406 28.816407 11.132813 41.847657 18.109375-22.847657 21.015625-50.015626 37.402344-80.007813 47.644531 8.601563-10.410156 16.757813-22.609374 24.273437-36.457031zm24.035157-57.492187c10.238281-32.753906 16.257812-68.460938 17.554687-104.996094h86.765625c-3.210937 48.753906-21.933593 93.339844-51.292969 128.832031-16.292968-9.34375-34.136718-17.335937-53.027343-23.835937zm17.554687-134.996094c-1.296875-36.539062-7.316406-72.242188-17.554687-104.996094 18.890625-6.5 36.734375-14.492187 53.027343-23.835937 29.359376 35.492187 48.082032 80.078125 51.292969 128.832031zm0 0"/>
            `
        }
        if(this.theme === 'fill'){
            return `
            <path d="m241 507.355469v-108.84375c-27.257812 1.039062-54.253906 4.882812-79.941406 11.253906 4.136718 9.996094 8.664062 19.570313 13.566406 28.609375 19.566406 36.054688 43.882812 60.976562 66.375 68.980469zm0 0"/><path d="m337.375 438.375c4.902344-9.035156 9.429688-18.613281 13.566406-28.609375-25.6875-6.371094-52.683594-10.214844-79.941406-11.253906v108.84375c22.492188-8.003907 46.808594-32.925781 66.375-68.980469zm0 0"/><path d="m241 368.492188v-99.816407h-109.390625c1.367187 38.96875 8.015625 77.710938 19.148437 112.785157 28.980469-7.433594 59.496094-11.875 90.242188-12.96875zm0 0"/><path d="m241 238.679688v-99.816407c-30.746094-1.09375-61.261719-5.535156-90.242188-12.964843-11.132812 35.074218-17.78125 73.8125-19.148437 112.78125zm0 0"/><path d="m379.953125 89.128906c18.246094-6.152344 35.542969-13.640625 51.449219-22.347656-27.929688-26.230469-61.714844-46.300781-99.167969-57.984375 11.21875 12.675781 21.832031 28.050781 31.503906 45.875 5.941407 10.941406 11.347657 22.464844 16.214844 34.457031zm0 0"/><path d="m174.625 68.980469c-4.902344 9.039062-9.429688 18.613281-13.566406 28.609375 25.6875 6.371094 52.683594 10.214844 79.941406 11.253906v-108.84375c-22.492188 8.003906-46.808594 32.925781-66.375 68.980469zm0 0"/><path d="m271 268.675781v99.816407c30.75 1.097656 61.261719 5.535156 90.242188 12.96875 11.132812-35.074219 17.78125-73.816407 19.152343-112.785157zm0 0"/><path d="m271 138.863281v99.816407h109.390625c-1.367187-38.96875-8.015625-77.707032-19.148437-112.78125-28.980469 7.429687-59.492188 11.871093-90.242188 12.964843zm0 0"/><path d="m121.878906 390.039062c-11.992187-37.757812-18.960937-79.082031-20.300781-121.363281h-101.578125c3.285156 56.679688 25.058594 108.472657 59.367188 149.433594 19.109374-11.089844 40.175781-20.503906 62.511718-28.070313zm0 0"/><path d="m379.953125 418.226562c-4.871094 11.992188-10.277344 23.515626-16.214844 34.460938-9.671875 17.824219-20.285156 33.195312-31.503906 45.871094 37.453125-11.683594 71.238281-31.753906 99.171875-57.984375-15.910156-8.707031-33.207031-16.195313-51.453125-22.347657zm0 0"/><path d="m132.046875 418.226562c-18.246094 6.152344-35.542969 13.640626-51.449219 22.347657 27.929688 26.234375 61.714844 46.300781 99.167969 57.988281-11.214844-12.679688-21.828125-28.050781-31.503906-45.875-5.941407-10.945312-11.347657-22.46875-16.214844-34.460938zm0 0"/><path d="m390.121094 117.316406c11.992187 37.757813 18.960937 79.082032 20.300781 121.363282h101.578125c-3.285156-56.679688-25.058594-108.46875-59.367188-149.429688-19.109374 11.089844-40.175781 20.5-62.511718 28.066406zm0 0"/><path d="m390.121094 390.039062c22.335937 7.566407 43.402344 16.976563 62.511718 28.066407 34.308594-40.960938 56.082032-92.753907 59.367188-149.429688h-101.578125c-1.339844 42.28125-8.308594 83.605469-20.300781 121.363281zm0 0"/><path d="m271 0v108.84375c27.257812-1.039062 54.253906-4.882812 79.941406-11.25-4.136718-10-8.660156-19.574219-13.566406-28.613281-19.566406-36.054688-43.882812-60.976563-66.375-68.980469zm0 0"/><path d="m121.878906 117.316406c-22.335937-7.566406-43.402344-16.976562-62.511718-28.066406-34.3125 40.960938-56.082032 92.753906-59.367188 149.429688h101.578125c1.339844-42.28125 8.308594-83.605469 20.300781-121.363282zm0 0"/><path d="m132.046875 89.128906c4.871094-11.992187 10.277344-23.515625 16.214844-34.457031 9.671875-17.828125 20.285156-33.199219 31.503906-45.875-37.453125 11.683594-71.238281 31.753906-99.171875 57.984375 15.910156 8.707031 33.207031 16.195312 51.453125 22.347656zm0 0"/>
            `
        }
        return `<path xmlns="http://www.w3.org/2000/svg" d="m240 0c-132.546875 0-240 107.453125-240 240s107.453125 240 240 240 240-107.453125 240-240c-.148438-132.484375-107.515625-239.851562-240-240zm207.566406 324.078125-68.253906 11.777344c7.8125-28.652344 12.03125-58.164063 12.558594-87.855469h71.929687c-.902343 26.117188-6.398437 51.871094-16.234375 76.078125zm-431.367187-76.078125h71.929687c.527344 29.691406 4.746094 59.203125 12.558594 87.855469l-68.253906-11.777344c-9.835938-24.207031-15.332032-49.960937-16.234375-76.078125zm16.234375-92.078125 68.253906-11.777344c-7.8125 28.652344-12.03125 58.164063-12.558594 87.855469h-71.929687c.902343-26.117188 6.398437-51.871094 16.234375-76.078125zm215.566406-27.472656c28.746094.367187 57.421875 2.984375 85.761719 7.832031l28.238281 4.871094c8.675781 29.523437 13.34375 60.078125 13.878906 90.847656h-127.878906zm88.488281-7.9375c-29.238281-4.996094-58.828125-7.695313-88.488281-8.0625v-96c45.863281 4.40625 85.703125 46.398437 108.28125 107.511719zm-104.488281-8.0625c-29.660156.367187-59.242188 3.066406-88.480469 8.0625l-19.800781 3.425781c22.578125-61.128906 62.417969-103.136719 108.28125-107.523438zm-85.753906 23.832031c28.335937-4.847656 57.007812-7.464844 85.753906-7.832031v103.550781h-127.878906c.535156-30.769531 5.203125-61.324219 13.878906-90.847656zm-42.125 111.71875h127.878906v103.550781c-28.746094-.367187-57.421875-2.984375-85.761719-7.832031l-28.238281-4.871094c-8.675781-29.523437-13.34375-60.078125-13.878906-90.847656zm39.390625 111.488281c29.238281 5.003907 58.824219 7.714844 88.488281 8.105469v96c-45.863281-4.410156-85.703125-46.402344-108.28125-107.515625zm104.488281 8.105469c29.660156-.390625 59.242188-3.101562 88.480469-8.105469l19.800781-3.425781c-22.578125 61.128906-62.417969 103.136719-108.28125 107.523438zm85.753906-23.875c-28.335937 4.847656-57.007812 7.464844-85.753906 7.832031v-103.550781h127.878906c-.535156 30.769531-5.203125 61.324219-13.878906 90.847656zm58.117188-111.71875c-.527344-29.691406-4.746094-59.203125-12.558594-87.855469l68.253906 11.777344c9.835938 24.207031 15.332032 49.960937 16.234375 76.078125zm47.601562-93.710938-65.425781-11.289062c-11.761719-38.371094-33.765625-72.808594-63.648437-99.601562 55.878906 18.648437 102.21875 58.457031 129.074218 110.890624zm-269.871094-110.890624c-29.882812 26.792968-51.886718 61.230468-63.648437 99.601562l-65.425781 11.289062c26.855468-52.433593 73.195312-92.242187 129.074218-110.890624zm-129.074218 314.3125 65.425781 11.289062c11.761719 38.371094 33.765625 72.808594 63.648437 99.601562-55.878906-18.648437-102.21875-58.457031-129.074218-110.890624zm269.871094 110.890624c29.882812-26.792968 51.886718-61.230468 63.648437-99.601562l65.425781-11.289062c-26.855468 52.433593-73.195312 92.242187-129.074218 110.890624zm0 0"/>`
    }
}