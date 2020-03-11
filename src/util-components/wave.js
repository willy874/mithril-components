import classNames from 'classnames/bind'
import styles from './styles/wave-effect.css'
const cx = classNames.bind(styles)

const isTouchAvailable = 'ontouchstart' in window;

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function convertStyle(styleObj) {
    let style = '';

    for (let prop in styleObj) {
        if (styleObj.hasOwnProperty(prop)) {
            style += (prop + ':' + styleObj[prop] + ';');
        }
    }
    return style;
}

function offset(elem) {
    var docElem, win,
        box = {
            top: 0,
            left: 0
        },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

function attachWave(element, center, e) {

    if (e.button === 2) {
        return false;
    }

    element = element || this;

    // Create ripple
    const ripple = document.createElement('div')
    ripple.classList.add(`${cx('gi-waves-ripple')}`, `${cx('waves-rippling')}`)
    element.appendChild(ripple)

    const pos = offset(element);

    let relativeY = 0,
        relativeX = 0

    if ('touches' in e && e.touches.length) {
        relativeY = (e.touches[0].pageY - pos.top)
        relativeX = (e.touches[0].pageX - pos.left)
    }
    //Normal case
    else {
        relativeY = (e.pageY - pos.top)
        relativeX = (e.pageX - pos.left)
    }

    // Support for synthetic events
    relativeX = relativeX >= 0 ? relativeX : 0
    relativeY = relativeY >= 0 ? relativeY : 0

    let scale = 'scale(' + ((element.clientWidth / 100) * 2) + ')'

    if (center) {
        scale = 'scale(1)'
    }

    const translate = 'translate(0,0)'

    let top = relativeY + 'px',
        left = relativeX + 'px',
        width,
        height

    if (center) {
        top = (element.clientHeight / 2) + 'px'
        left = (element.clientWidth / 2) + 'px'
        width = element.clientWidth
        height = element.clientWidth
    }

    // Attach data to element
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-x', left);
    ripple.setAttribute('data-y', top);
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-translate', translate);

    // Set ripple position
    let rippleStyle = {
        top,
        left
    };

    if (width && height) {
        ripple.setAttribute('data-width', width);
        ripple.setAttribute('data-height', height);
        rippleStyle.width = width
        rippleStyle.height = height
    }

    ripple.classList.add(`${cx('gi-waves-notransition')}`);
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.classList.remove(`${cx('gi-waves-notransition')}`);

    rippleStyle['-webkit-transform'] = scale + ' ' + translate;
    rippleStyle['-moz-transform'] = scale + ' ' + translate;
    rippleStyle['-ms-transform'] = scale + ' ' + translate;
    rippleStyle['-o-transform'] = scale + ' ' + translate;
    rippleStyle.transform = scale + ' ' + translate;
    rippleStyle.opacity = '0.3';

    const duration = e.type === 'mousemove' ? 2500 : WaveEffect.duration;

    rippleStyle['-webkit-transition-duration'] = duration + 'ms';
    rippleStyle['-moz-transition-duration'] = duration + 'ms';
    rippleStyle['-o-transition-duration'] = duration + 'ms';
    rippleStyle['transition-duration'] = duration + 'ms';

    ripple.setAttribute('style', convertStyle(rippleStyle));
}

function removeWave(element, e) {

    element = element || this;
    const ripples = element.querySelectorAll(`.${cx('waves-rippling')}`)

    for (let i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
    }
}

function removeRipple(e, el, ripple) {

    // Check if the ripple still exist
    if (!ripple) {
        return;
    }

    ripple.classList.remove(`${cx('waves-rippling')}`);

    const relativeX = ripple.getAttribute('data-x');
    const relativeY = ripple.getAttribute('data-y');
    const scale = ripple.getAttribute('data-scale');
    const translate = ripple.getAttribute('data-translate');

    // Get delay beetween mousedown and mouse leave
    const diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    let delay = 350 - diff;

    if (delay < 0) {
        delay = 0;
    }

    if (e.type === 'mousemove') {
        delay = 150;
    }

    // Fade out ripple after delay
    const duration = e.type === 'mousemove' ? 250 : WaveEffect.duration;

    setTimeout(function () {
        let style = {
            top: relativeY,
            left: relativeX,
            opacity: '0',

            // Duration
            '-webkit-transition-duration': duration + 'ms',
            '-moz-transition-duration': duration + 'ms',
            '-o-transition-duration': duration + 'ms',
            'transition-duration': duration + 'ms',
            '-webkit-transform': scale + ' ' + translate,
            '-moz-transform': scale + ' ' + translate,
            '-ms-transform': scale + ' ' + translate,
            '-o-transform': scale + ' ' + translate,
            'transform': scale + ' ' + translate
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
            try {
                el.removeChild(ripple);
            } catch (e) {
                return false;
            }
        }, duration);

    }, delay);
}
/**
 * 點擊水波紋
 */
const WaveEffect = {
    // Effect duration
    duration: 500,
    // Effect delay (check for scroll before showing effect)
    delay: 200,
    attach: (target, center) => {
        // Disable right click
        target.classList.add(`${cx('gi-waves-effect')}`)
        target.addEventListener('mousedown', attachWave.bind(null, target, center), false)
        target.addEventListener('mouseup', removeWave.bind(null, target), false)
        target.addEventListener('mouseout', removeWave.bind(null, target), false)
    },
    destory: (target, center) => {
        if (isTouchAvailable) {
            element.removeEventListener('touchend', removeWave);
            element.removeEventListener('touchcancel', removeWave);
        }
        target.removeEventListener('mousedown', attachWave)
        target.removeEventListener('mouseup', removeWave)
    }
}

export default WaveEffect