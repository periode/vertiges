// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
let app, source
function onDeviceReady() {

    app = new Vue({
        el: '#app',
        data: {
            remote: {
                url: 'vertiges.enframed.net',
                protocol: 'https',
                // url: 'localhost:4000',
                endpoint: 'subscribe'
            },
            source: null,
            connectInterval: 5,
            connectionStatus: 'offline',
            hasStarted: false,
            localIndex: 0,
            vibrate_time: 250,
            messages: [
                { msg: "un jour on m'a demandé de me définir", type: "txt", sender: "georges" },
                { msg: "quelle connerie", type: "txt", sender: "georges" },
                { msg: "", type: "img", sender: "georges", src: './img/test.png' },
                { type: "mp3", msg: "", src: './media/03-pnl-chang.mp3', sender: "georges" },
            ],
            replies: [
                { txt: '', id: 'identity' },
                { txt: '', id: 'class' },
                { txt: '', id: 'police' }
            ]
        },
        methods: {
            sendReply: function (_reply) {
                this.messages.push({ msg: _reply.txt, sender: "public", ts: this.getTimestamp() })

                toggleReplies()

                this.connectionStatus = 'typing...'

                fetch(`${this.remote.protocol}://${this.remote.url}/reply?id=${_reply.id}`,
                    {
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Basic vertiges',
                            'Access-Control-Allow-Origin': '*',
                        }
                    })
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })

                if (_reply.reply)
                    setTimeout(() => {
                        this.messages.push({ msg: _reply.reply, sender: "georges", type: 'txt', ts: this.getTimestamp() })
                        this.connectionStatus = 'online'
                    }, 2000)
            },
            displayMessages: function (_messages, _replies) {
                if (this.localIndex < _messages.length) {
                    this.connectionStatus = 'typing...'
                    _messages[this.localIndex].ts = this.getTimestamp()
                    this.messages.push(_messages[this.localIndex])
                    navigator.vibrate(this.vibrate_time)
                    this.localIndex++

                    setTimeout(() => { this.displayMessages(_messages, _replies) }, Math.random() * 2000 + 2500)
                } else {
                    toggleReplies()
                    this.replies = _replies
                    this.localIndex = 0

                    this.connectionStatus = 'online'
                }
            },
            getTimestamp: function () {
                let d = new Date()
                let h = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours()
                let m = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes()
                let ts = `${h}:${m}`
                return ts
            },
            toggleAudio: function (evt) {
                let player = evt.target.nextElementSibling
                let timeline = player.nextElementSibling

                player.ontimeupdate = (evt) => {
                    // console.log(evt.timeStamp);
                    let progress  = (evt.timeStamp/10) / player.duration
                    timeline.children[1].style.left = `${progress}%`
                }

                player.oneneded  = () => {
                    player.src = ''
                }

                if (!player.paused) {
                    player.pause()
                    evt.target.src = './img/play.svg'
                } else {
                    player.play()
                    evt.target.src = './img/pause.svg'
                }
            },
            connectToServer: function () {
                console.log(`Connection to server ${this.remote.url}/${this.remote.endpoint}...`);
                if(source && source.readyState != 2){
                    console.log('Event source already exists,')
                    return
                }

                source = new EventSource(`${this.remote.protocol}://${this.remote.url}/${this.remote.endpoint}`)

                source.onopen = () => {
                    console.log('...opened connection to remote server!')
                    this.connectionStatus = 'online'
                }

                source.onerror = (err) => {
                    console.log(`...failed to reach server (${err.message}), retrying.`);
                    this.connectionStatus = 'connecting...'
                    setTimeout(this.connectToServer, this.connectInterval * 1000)
                }

                source.onmessage = (event) => {
                    console.log(event)

                    let content = JSON.parse(event.data)
                    console.log(content);
                    // console.log(content);
                    if (content.messages) {
                        this.messages.push({ txt: '', type: "separator" })
                        this.displayMessages(content.messages, content.replies)
                    }else if(content.mute){
                        let players = document.querySelectorAll('audio')
                        for(let player of players){
                            player.pause()
                            player.src = ''
                        }       
                    }else if(content.play){
                        let players = document.querySelectorAll('audio')
                        for(let player of players){
                            player.play()
                        }  
                    }
                }
            }
        },
        mounted: function () {
            this.connectToServer()
            console.log(`${this.getTimestamp()} - VERTIGES`);
        }
    })
}

let toggleReplies = () => {
    Array.from(document.getElementsByClassName('reply'))
        .map((el) => { el.disabled = el.disabled ? false : true })
}