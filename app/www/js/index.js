// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    let app = new Vue({
        el: '#app',
        data: {
            messages: [
                {txt: "un jour on m'a demandé de me définir", type: "georges"},
                {txt: "quelle connerie", type: "georges"},
                {txt: "je suis", type: "georges"},
                {txt: "jsais pas", type: "georges"},
                {txt: "je suis", type: "georges"},
                {txt: "je suis farid ayelem rahmouni, chorégraphe queer", type: "georges"},
            ],
            replies: [
                "farid?",
                "chorégraphe?",
                "queer?"
            ]
        },
        methods: {
            sendReply: function(_reply){
                this.messages.push({txt: _reply, type: "public"})
            }
        },
        mounted: function(){
            console.log('vue is ready');
        }
    })
}
