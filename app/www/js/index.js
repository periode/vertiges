// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
let app, source
function onDeviceReady() {

    app = new Vue({
        el: '#app',
        data: {
            remote: {
                url: 'localhost:4000',
                endpoint: 'subscribe'
            },
            source: null,
            connectInterval: 5000,
            connectionStatus: 'offline',
            index: 0,
            localIndex: 0,
            messages: [
                { msg: "un jour on m'a demandé de me définir", type: "txt", sender: "georges" },
                { msg: "quelle connerie", type: "txt", sender: "georges"},
                { msg: "", type: "img", sender: "georges", src: './img/test.png'},
                { type: "mp3", msg: "", src: './media/03-pnl-chang.mp3', sender: "georges"},
            ],
            replies: [
                { txt: '' },
                { txt: '' },
                { txt: '' }
            ]
        },
        methods: {
            sendReply: function (_reply) {
                this.messages.push({ msg: _reply.txt, sender: "public" })

                toggleReplies()

                fetch(`http://${this.remote.url}/reply?id=${_reply.id}`)
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                setTimeout(() => {
                    this.messages.push({ msg: _reply.reply, sender: "georges", type: 'txt' })
                }, 2000)
            },
            displayMessages: function (_messages, _replies) {
                if (this.localIndex < _messages.length) {
                    this.messages.push({
                        type: 'txt',
                        msg: _messages[this.localIndex].msg,
                        src:_messages[this.localIndex].src
                    })
                    this.localIndex++

                    setTimeout(() => { this.displayMessages(_messages, _replies) }, Math.random() * 2000 + 500)
                } else {
                    toggleReplies()
                    this.replies = _replies
                    this.localIndex = 0
                }
            },
            toggleAudio: function(evt) {
                let player = evt.target.nextElementSibling

                if(!player.paused){
                    player.pause()
                    evt.target.src = './img/play.svg'
                } else {
                    player.play()
                    evt.target.src = './img/pause.svg'
                }                   
            },
            connectToServer: function () {
                console.log(`Connection to server ${this.remote.url}/${this.remote.endpoint}...`);
                source = new EventSource(`http://${this.remote.url}/${this.remote.endpoint}`)

                source.onopen = () => {
                    console.log('...opened connection to remote server!')
                    this.connectionStatus = 'online'
                }

                source.onerror = () => {
                    console.log(`...failed to reach server, retrying.`);
                    this.connectionStatus = 'connecting...'
                    setTimeout(this.connectToServer, this.connectInterval)
                }

                source.onmessage = (event) => {
                    console.log(event)

                    let content = JSON.parse(event.data)
                    console.log(content);
                    if (content.messages) {
                        this.messages.push({ txt: '', type: "separator" })
                        this.displayMessages(content.messages, content.replies)
                    }
                }
            }
        },
        mounted: function () {
            setTimeout(this.connectToServer, this.connectInterval)
        }
    })
}

let toggleReplies = () => {
    Array.from(document.getElementsByClassName('reply'))
        .map((el) => { el.disabled = el.disabled ? false : true })
}