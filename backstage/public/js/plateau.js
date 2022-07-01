let app

let init = () => {
    app = new Vue({
        el: '#app',
        data:{
            status: {
                state: "aucun message en cours d'envoi",
                messages: [],
                next: "introduction"
            },
            error: '',
            log: '',
        },
        methods:{
            updateStatus: function() {
                fetch('/status')
                .then(res => {
                    if(res.ok)
                        return res.json()
                    else
                        this.error = `Problème de connexion au serveur: ${res.status}`
    
                })
                .then(data => {
                    this.status = data.status
                    this.log = `dernière requête: ${this.getTimestamp()}`
                })
            },
            getTimestamp: function() {
                let d = new Date()
                let h = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours()
                let m = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes()
                let s = d.getSeconds().toString().length == 1 ? '0'+d.getSeconds() : d.getSeconds()
                let ts = `${h}:${m}:${s}`
                return ts
            }
        },
        mounted: function() {
            setTimeout(this.updateStatus, 1000)
        }
    })
}


//-- data
//-- -- quelle séquence est la suivante?