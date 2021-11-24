let logger, time

let init = () => {
    logger = document.getElementById("logger")
}

let log = (type, msg) => {
    time = new Date()
    let timestamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    let el = document.createElement('li')
    el.setAttribute('class', `logger-msg ${type}`)
    el.innerText = `[${timestamp}] ${msg}`
    logger.prepend(el)
}

let start = () => {
    fetch('/publish').then(data => {
        log('info', data)
    })
}