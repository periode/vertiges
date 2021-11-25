const EventEmitter = require('events')
EventEmitter.defaultMaxListeners = 100
const Stream = new EventEmitter()

const messages = require('./messages')
const express = require('express')
const app = express()
const port = 4000

app.use(express.static('./public'))

app.listen(port, () => {
    console.log(`VERTIGES\n- listening on ${port}`)
})

app.get('/subscribe', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    console.log('- found client')

    res.write(`data: ${JSON.stringify({connected: true})}\n\n`);

    Stream.on("push", (evt) => {
        console.log(`- event received: ${evt}`);
        let payload = messages.pick(evt)
        res.write(`data: ${JSON.stringify(payload)}\n\n`)
    })

    res.on('close', () => {
        console.log('- lost client')
        res.end()
    })
})

let votes = {}

app.get('/reply', (req, res) => {
    console.log(`- received reply: ${req.query.id}`);

    if(votes[req.query.id] == null)
        votes[req.query.id] = 1
    else
        votes[req.query.id] += 1

    console.log(`- vote: ${JSON.stringify(votes)}`);
    res.send('registered reply')
})

app.get('/cue', (req, res) => {
    let sequence_name = req.query.seqname
    Stream.emit("push", `${sequence_name}`)
    res.send(`- sent ${sequence_name} to event stream\n`)
})

app.get('/get-all', (req, res) => {
    res.json(messages.getAll())
})

app.get('/poll', (req, res) => {
    res.json(votes)
})