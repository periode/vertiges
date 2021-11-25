const EventEmitter = require('events')
const Stream = new EventEmitter()

const messages = require('./messages')

const express = require('express')
const app = express()
const port = 4000

app.use(express.static('./public'))

app.listen(port, () => {
    console.log(`vertiges app listening on ${port}`)
})

app.get('/subscribe', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    console.log('found client')

    res.write('data: connected');

    Stream.on("push", (evt) => {
        console.log(`event received: ${evt}`);
        res.write(`data: ${JSON.stringify(messages[evt])}\n\n`)
    })

    res.on('close', () => {
        console.log('lost client')
        res.end()
    })
})

app.get('/cue', (req, res) => {
    let sequence_name = req.query.seqname
    Stream.emit("push", `${sequence_name}`)
    res.send(`Sent ${sequence_name} to event stream\n`)
})