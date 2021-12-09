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
            status: "prologue", // -- prologue, stage, epilogue
            epilogue: "",
            storage: null,
            source: null,
            connectInterval: 5,
            typingInterval: null,
            typingIndicator: '',
            connectionStatus: 'hors ligne',
            hasStarted: false,
            localIndex: 0,
            vibrate_time: 250,
            messages: [
                // { msg: "enfin", type: "txt", sender: "performer" },
                // { msg: "non mais vraiment", type: "txt", sender: "performer" },
                // { msg: "quelle connerie", type: "txt", sender: "performer" },
                // { type: "mp3", msg: "", src: './media/cendres.mp3', sender: "performer" },
                // { msg: "un jour on m'a demandé de me définir", type: "txt", sender: "performer" },
                // { msg: "t'as vu jsuis stylé hein", type: "txt", sender: "performer" },
                // { msg: "", type: "img", sender: "performer", src: './img/test.png' },
                // { msg: "salut moi c'est farid", type: "txt", sender: "performer" },
            ],
            replies: [
                { txt: '', id: 'identity' },
                { txt: '', id: 'class' },
                { txt: '', id: 'police' }
            ]
        },
        methods: {
            start: function () {
                this.status = 'stage'
                // this.storage['status'] = this.status
                console.warn("Not writing the status change to localStorage")
            },
            sendReply: function (_reply) {
                this.messages.unshift({ msg: _reply.txt, sender: "public", ts: this.getTimestamp() })

                toggleReplies()
                this.replies = [{txt:'', id:''},{txt:'', id:''},{txt:'', id:''}]

                this.activateTyping()

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
                        this.messages.unshift({ msg: _reply.reply, sender: "performer", type: 'txt', ts: this.getTimestamp() })
                        navigator.vibrate(this.vibrate_time)
                        this.deactivateTyping()
                    }, 2000)

                setTimeout(() => { document.getElementById("messages").classList.remove("not-scrollable") }, 2500)
            },
            displayMessages: function (_messages, _replies) {
                if (this.localIndex < _messages.length) {
                    this.activateTyping()

                    _messages[this.localIndex].ts = this.getTimestamp()
                    this.messages.unshift(_messages[this.localIndex])
                    
                    navigator.vibrate(this.vibrate_time)
                    this.localIndex++

                    setTimeout(() => { this.displayMessages(_messages, _replies) }, Math.random() * 2000 + 2500)
                } else {
                    toggleReplies()
                    this.replies = _replies
                    this.localIndex = 0

                    this.deactivateTyping()
                }
            },
            getTimestamp: function () {
                let d = new Date()
                let h = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours()
                let m = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes()
                let ts = `${h}:${m}`
                return ts
            },
            activateTyping: function() {
                this.connectionStatus = 'compose...'
                if(this.typingInterval) return;

                this.typingInterval = setInterval(() => {
                    switch (this.typingIndicator.length) {
                        case 0:
                            this.typingIndicator = '.'
                            break;
                        case 1:
                            this.typingIndicator = '..'
                            break;
                        case 2:
                            this.typingIndicator = '...'
                            break;
                        case 3:
                            this.typingIndicator = '.'
                            break;
                        default:
                            break;
                    }
                }, 500)
            },
            deactivateTyping: function() {
                clearInterval(this.typingInterval)
                this.typingInterval = null
                this.typingIndicator = ''
                this.connectionStatus = 'en ligne'
            },
            toggleAudio: function (evt) {
                let player = evt.target.nextElementSibling
                let timeline = player.nextElementSibling

                player.ontimeupdate = (evt) => {
                    let progress = (evt.timeStamp / 10) / player.duration
                    timeline.children[1].style.left = `${progress}%`
                }

                player.oneneded = () => {
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
                if (source && source.readyState != 2) {
                    console.log('Event source already exists,')
                    return
                }

                source = new EventSource(`${this.remote.protocol}://${this.remote.url}/${this.remote.endpoint}`)

                source.onopen = () => {
                    console.log('...opened connection to remote server!')
                    this.connectionStatus = 'en ligne'
                }

                source.onerror = (err) => {
                    console.log(`...failed to reach server (${err.message}), retrying.`);
                    this.connectionStatus = 'tentative de connexion...'
                    setTimeout(this.connectToServer, this.connectInterval * 1000)
                }

                source.onmessage = (event) => {
                    console.log(event)

                    let content = JSON.parse(event.data)
                    console.log(content);
                    // console.log(content);
                    if (content.messages) {
                        document.getElementById("messages").classList.add("not-scrollable")
                        this.messages.unshift({ txt: '', type: "separator" })
                        this.displayMessages(content.messages, content.replies)
                    } else if (content.mute) {
                        let players = document.querySelectorAll('audio')
                        for (let player of players) {
                            player.pause()
                            player.src = ''
                        }
                    } else if (content.play) {
                        let players = document.querySelectorAll('audio')
                        players[players.length - 1].play()
                    } else if (content.curtain) {
                        this.status = 'epilogue'
                        this.epilogue = content.epilogue ? content.epilogue : "Visitez vertiges.enframed.net pour plus d'informations sur le spectacle!"
                        console.warn("Not writing the status change to localStorage")
                    }
                }
            }
        },
        mounted: function () {
            console.log(`${this.getTimestamp()} - VERTIGES`);

            this.connectToServer()
            if (this.storage == null)
                this.storage = window.localStorage

            // this.status = this.storage['status'] ? this.storage['status'] : 'prologue'
        }
    })
}

let toggleReplies = () => {
    Array.from(document.getElementsByClassName('reply'))
        .map((el) => { el.disabled = el.disabled ? false : true })
}