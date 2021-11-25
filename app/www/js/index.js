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
            messages: [
            ],
            replies: [
            ]
        },
        methods: {
            sendReply: function(_reply){
                this.messages.push({txt: _reply, type: "public"})
            },
            connectToServer: function() {
                console.log(`Connection to server ${this.remote.url}/${this.remote.endpoint}...`);
                source = new EventSource(`http://${this.remote.url}/${this.remote.endpoint}`)

                source.onopen = () => {
                    console.log('...opened connection to remote server.')
                }
    
                source.onerror = () => {
                    console.log(`...failed to reach server, retrying.`);
                    setTimeout(this.connectToServer, connectInterval)
                }
    
                source.onmessage = (event) => {
                    console.log(event)
                }   
            }
        },
        mounted: function(){
            setTimeout(this.connectToServer, connectInterval)
        }
    })
}
