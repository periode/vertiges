let logger, time

let init = () => {
    logger = document.getElementById("logger")
    log('info', 'ready')
}

let log = (type, msg) => {
    time = new Date()
    let timestamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    let el = document.createElement('li')
    el.setAttribute('class', `logger-msg ${type}`)
    el.innerText = `[${timestamp}] ${msg}`
    logger.prepend(el)
}

let cue = (_cue, _query, _param) => {
    fetch(`/${_cue}?${_query}=${_param}`).then(res => {
        if(res.ok)
            log('info', `/${_cue}?${_query}=${_param} - ${res.status}`)
        else
            log('error', `/${_cue}?${_query}=${_param} - ${res.status}`)
    }).catch(err => {
        log('error', err)
    })
}