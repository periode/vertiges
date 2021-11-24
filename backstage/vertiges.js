const EventEmitter = require('events')
const Stream = new EventEmitter()

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

    Stream.on("push", (evt, data) => {
        console.log(`received from stream event: ${evt} and data ${data}`);
        res.write('data: this is the text\n\n')
    })
    

    res.on('close', () => {
        console.log('lost client')
        res.end()
    })
})

app.get('/publish', (req, res) => {
    Stream.emit("push", "test")
    res.send("sent to stream\n")
})