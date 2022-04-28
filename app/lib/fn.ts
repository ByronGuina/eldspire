export function debounce(func, wait = 150, immediate = true) {
    let timeout
    return function () {
        let context = this,
            args = arguments
        let later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

export function throttle(func: () => void, duration: number) {
    let shouldWait = false
    return function (...args: any) {
        if (!shouldWait) {
            func.apply(this, args)
            shouldWait = true
            setTimeout(function () {
                shouldWait = false
            }, duration)
        }
    }
}
