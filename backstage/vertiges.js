const EventEmitter = require('events')
const Stream = new EventEmitter()

const fs = require('fs')

const messages = require('./messages')
const express = require('express')
const app = express()
const port = 4000

let trace = []
let next_sequence = null

EventEmitter.defaultMaxListeners = 100

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
    res.send(`registered reply: ${req.query.id}`)
})

app.get('/cue', (req, res) => {
    let seq = req.query.sequence

    if(seq == undefined){
        res.status(400).send('the sequence parameter is not defined\n')
        return
    }

    Stream.emit("push", `${seq}`)
    trace.push(`launched cue: ${seq}`)
    res.send(`sent ${seq} to event stream\n`)
})

app.get('/set', (req, res) => {
    let seq = req.query.sequence

    if(seq == undefined){
        res.status(400).send('the sequence parameter is not defined\n')
        return
    }

    trace.push(`armed cue: ${seq}`)
    next_sequence = seq

    fs.writeFile('trace.txt', JSON.stringify(trace), (err) => {
        if(err)
            console.log(`-- error writing trace: ${err}`)
        else
            console.log('- success writing trace to file')
    })

    //-- send SIGINT event to potential public audio
    res.sendStatus(200)
})

//-- for farid to get the next sequence
app.get('/status', (req, res) => {
    res.json({next: next_sequence})
})

app.get('/get-all', (req, res) => {
    let payload = {
        sequences: messages.getAll(),
        next: next_sequence
    }
    res.json(payload)
})

app.get('/poll', (req, res) => {
    res.json(votes)
})

app.get('/reset', (req, res) => {
    votes = []
    res.sendStatus(200)
})