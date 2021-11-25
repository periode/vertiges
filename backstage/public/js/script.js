let init = () => {
    let app = new Vue({
        el: '#app',
        data: {
            logger: null,
            logs: [],
            time: null,
            sequences: [],
            pollInterval: null,
            results: []
        },
        methods: {
            cue: function (_cue, _query, _param) {
                fetch(`/${_cue}?${_query}=${_param}`).then(res => {
                    if(res.ok)
                        this.log('info', `/${_cue}?${_query}=${_param} - ${res.status}`)
                    else
                        this.log('error', `/${_cue}?${_query}=${_param} - ${res.status}`)
                }).catch(err => {
                    this.log('error', err)
                })
            },
            log: function (_type, _msg) {
                this.time = new Date()
                let timestamp = `${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`
                this.logs.push({ts: timestamp, type: _type, msg: _msg})
            },
            poll: function() {
                fetch('/poll')
                .then((res => {return res.json()}))
                .then(data => this.results = data)
                .catch(err => this.log('error', JSON.stringify(err)))
            },
            startPoll: function() {
                this.pollInterval = setInterval(this.poll, 1000)
                this.log('info', 'started polling')
            },
            endPoll: function() {
                clearInterval(this.pollInterval)
                this.log('info', 'cleared poll interval')
            }
        },
        mounted: function() {
            this.log('info', 'ready')

            fetch('/get-all').then(res => {
                return res.json()
            }).then(data => {
                this.sequences = data
            })
        }
    })
}