// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
let app, source
function onDeviceReady() {

    app = new Vue({
        el: '#app',
        data: {
            remote: {
                // url: 'vertiges.enframed.net',
                protocol: 'http',
                url: 'localhost:4000',
                endpoint: 'subscribe'
            },
            status: "prologue", // -- prologue, stage, epilogue
            epilogue: "",
            storage: null,
            source: null,
            connectInterval: 5,
            msgInterval: 5000,
            typingInterval: null,
            typingIndicator: '',
            connectionStatus: 'hors ligne',
            hasStarted: false,
            localIndex: 0,
            messages: [],
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

                enableReplies(false)
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
                        this.deactivateTyping()
                    }, this.msgInterval)

                setTimeout(() => { document.getElementById("messages").classList.remove("not-scrollable") }, this.msgInterval * 1.1)
            },
            displayMessages: function (_messages, _replies) {
                if (this.localIndex < _messages.length) {
                    this.activateTyping()

                    _messages[this.localIndex].ts = this.getTimestamp()
                    this.messages.unshift(_messages[this.localIndex])
                    
                    this.localIndex++

                    setTimeout(() => {
                        this.displayMessages(_messages, _replies) 
                        
                        if(this.localIndex == _messages.length)
                            this.deactivateTyping()
                    }, Math.random() * 2000 + this.msgInterval)
                } else {
                    if(_replies.length > 0)
                        enableReplies(true)
                    this.replies = _replies
                    this.localIndex = 0
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

                source.onopen = (data) => {
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
                        let player = document.getElementById(content.id)
                        player.play()
                    } else if (content.curtain) {
                        this.status = 'epilogue'
                        this.epilogue = content.epilogue ? content.epilogue : "Visitez vertiges.enframed.net pour plus d'informations sur le spectacle!"
                        console.warn("Not writing the status change to localStorage")
                    }else if(content.connected){
                        this.msgInterval = content.msg_interval
                        console.log("Setting the message timeout to", this.msgInterval)
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

let enableReplies = (_state) => {
    console.log('setting replies to', _state);
    for (const el of document.getElementsByClassName('reply')) {
        if(_state)
            el.removeAttribute('disabled')
        else
            el.setAttribute('disabled', '')
    }
}