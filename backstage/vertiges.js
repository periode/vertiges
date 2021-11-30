const EventEmitter = require('events')
const Stream = new EventEmitter()

const fs = require('fs')

const messages = require('./messages')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

let trace = []
let next_sequence = null
let total_clients = 0

const AUTH_PW = 'vertiges'
const DEBUG = true

EventEmitter.defaultMaxListeners = 100

app.use(express.static('./public'))
app.use('*', cors());


app.listen(port, () => {
    console.log('VERTIGES\n')
    log('info', `listening on ${port}`)
})

app.get('/subscribe', (req, res) => {
    log('info', `GET /subscribe`)
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()
    
    total_clients++
    log('debug', `new client, total: ${total_clients}`)

    res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

    Stream.on("push", (evt) => {
        log('debug', `writing SSE: ${evt}`);
        let payload = messages.pick(evt)
        try {
            if(!res.writeableFinished && !res.writableEnded)    
	            res.write(`data: ${JSON.stringify(payload)}\n\n`)
        } catch (error) {
            log('error', 'attempting to write to closed connection, skipping.')   
        }
    })

    Stream.on("mute", () => {
        log('debug', `writing SSE: mute`);
	    try {
            if(!res.writeableFinished && !res.writableEnded)
	            res.write(`data: ${JSON.stringify({mute: true})}\n\n`)
        } catch {
            log('error', 'attempting to mute closed connection, skipping.')
        }
    })

    Stream.on("play", () => {
        log('debug', `writing SSE: play`);
	    try {
            if(!res.writeableFinished && !res.writableEnded)
	            res.write(`data: ${JSON.stringify({play: true})}\n\n`)
        } catch {
            log('error', 'attempting to play closed connection, skipping.')
        }
    })

    Stream.on("curtain", () => {
        log('debug', `writing SSE: curtain`);
	    try {
            if(!res.writeableFinished && !res.writableEnded)
	            res.write(`data: ${JSON.stringify({curtain: true})}\n\n`)
        } catch {
            log('error', 'attempting to play closed connection, skipping.')
        }
    })

    res.on('close', () => {
        total_clients--
        log('debug', `lost client, total: ${total_clients}`)
        res.end()
    })
})

let votes = {}

app.get('/reply', (req, res) => {
    log('info', `GET /reply`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    log('debug', `received reply: ${req.query.id}`);

    if (!(req.query.id in votes)){
	    let new_entry = {}
	    new_entry[req.query.id] = 1
	    votes = {...votes, ...new_entry}
    }else{
        votes[req.query.id] += 1
    }

    log('debug', `total votes: ${JSON.stringify(votes)}`);
    res.send(`registered reply: ${req.query.id}`)
})

app.get('/cue', (req, res) => {
    log('info', `GET /cue`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    let seq = req.query.sequence

    if (seq == undefined) {
        log('error', `sequence name is undefined`)
        res.status(400).send('the sequence parameter is not defined\n')
        return
    }
    log('debug', `next cue: ${seq}`)

    Stream.emit("push", `${seq}`)
    trace.push(`launched cue: ${seq}`)
    votes = []
    res.send(`sent ${seq} to event stream\n`)
})

app.get('/set', (req, res) => {
    log('info', `GET /set`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    let seq = req.query.sequence

    if (seq == undefined) {
        log('error', `sequence name is undefined`)
        res.status(400).send('the sequence parameter is not defined\n')
        return
    }
    log('debug', `next sequence: ${seq}`)

    trace.push(`armed cue: ${seq}`)
    next_sequence = seq

    fs.writeFile('trace.txt', JSON.stringify(trace), (err) => {
        if (err)
            log('error', `error writing trace: ${err}`)
        else
            log('info', 'success writing trace to file')
    })

    //-- send SIGINT event to potential public audio
    res.sendStatus(200)
})

//-- for farid to get the next sequence
app.get('/status', (req, res) => {
    log('info', `GET /status`)
    res.json({ next: next_sequence })
})

app.get('/get-all', (req, res) => {
    log('info', `GET /get-all`)
    let payload = {
        sequences: messages.getAll(),
        next: next_sequence,
        clients: total_clients
    }
    res.json(payload)
})

app.get('/poll', (req, res) => {
    log('info', `GET /poll`)
    res.json(votes)
})

app.get('/mute', (req, res) => {
    log('info', `GET /mute`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    Stream.emit("mute")
    res.sendStatus(200)
})

app.get('/play', (req, res) => {
    log('info', `GET /play`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    Stream.emit("play")
    res.sendStatus(200)
})

app.get('/curtain', (req, res) => {
    log('info', `GET /curtain`)
    if (!isAuthorized(req)) {
        res.sendStatus(403)
        return
    }

    Stream.emit("curtain")
    res.sendStatus(200)
})

let isAuthorized = (req) => {
    if (!req.get('Authorization')){
        log('debug', `No Authentication header found`)    
        return false
    }
        

    let pw = req.get('Authorization').split("Basic")[1].trim()
    log('debug', `authenticating with pw: ${pw}`)

    if (!pw)
        return false
    else if (pw === AUTH_PW)
        return true
}

let log = (_level, _msg) => {
    if(DEBUG && _level == 'debug')
        console.log(`[${getTimestamp()}] [${_level}] ${_msg}`)
    else if(_level == 'info' || _level =='error')
        console.log(`[${getTimestamp()}] [${_level}] ${_msg}`)
}

let getTimestamp = () => {
    let d = new Date()
    let h = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours()
    let m = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes()
    let s = d.getSeconds().toString().length == 1 ? '0'+d.getSeconds() : d.getSeconds()
    let ts = `${h}:${m}:${s}`
    return ts
}
