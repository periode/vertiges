let init = () => {
    let app = new Vue({
        el: '#app',
        data: {
            logger: null,
            logs: [],
            time: null,
            sequences: [],
            history: [],
            pollInterval: null,
            results: {},
            next: null,
            clients: 0
        },
        methods: {
            cue: function (_cue, _query, _param) {
                fetch(`/${_cue}?${_query}=${_param}`,
                    {
                        headers: {
                            'Authorization': 'Basic vertiges'
                        }
                    }).then(res => {
                        if (res.ok){
                            this.log('info', `/${_cue}?${_query}=${_param} - ${res.status}`)
                            this.history.push(_param)
                        }else{
                            this.log('error', `/${_cue}?${_query}=${_param} - ${res.status}`)
                        }
                    }).catch(err => {
                        this.log('error', err)
                    })
            },
            mute_all: function() {
                fetch(`/mute`,
                {
                    headers: {
                        'Authorization': 'Basic vertiges'
                    }
                }).then(res => {
                    if (res.ok)
                        this.log('info', `/mute - ${res.status}`)
                    else
                        this.log('error', `/mute - ${res.status}`)
                }).catch(err => {
                    this.log('error', err)
                })
            },
            play_all: function() {
                fetch(`/play`,
                {
                    headers: {
                        'Authorization': 'Basic vertiges'
                    }
                }).then(res => {
                    if (res.ok)
                        this.log('info', `/play - ${res.status}`)
                    else
                        this.log('error', `/play - ${res.status}`)
                }).catch(err => {
                    this.log('error', err)
                })
            },
            rideau: function() {
                fetch(`/curtain`,
                {
                    headers: {
                        'Authorization': 'Basic vertiges'
                    }
                }).then(res => {
                    if (res.ok)
                        this.log('info', `/curtain - ${res.status}`)
                    else
                        this.log('error', `/curtain - ${res.status}`)
                }).catch(err => {
                    this.log('error', err)
                })
            },
            log: function (_type, _msg) {
                this.time = new Date()
                let timestamp = `${this.time.getHours()}:${this.time.getMinutes()}:${this.time.getSeconds()}`
                this.logs.unshift({ ts: timestamp, type: _type, msg: _msg })
            },
            poll: function () {
                fetch('/poll')
                    .then((res => { return res.json() }))
                    .then(data => this.results = data)
                    .catch(err => this.log('error', JSON.stringify(err)))
            },
            togglePoll: function (_evt) {
                if (!this.pollInterval) {
                    this.pollInterval = setInterval(this.poll, 1000)
                    this.log('info', 'sondage lancé')
                    _evt.target.innerText = 'interrompre'
                } else {
                    clearInterval(this.pollInterval)
                    this.pollInterval = null
                    this.log('info', 'cleared poll interval')
                    _evt.target.innerText = 'lancer sondage'
                }
            },
            setNext: function (_next) {
                if (_next != '') {
                    this.log('info', `prochaine séquence établie: ${_next}`);
                    fetch(`/set?sequence=${_next}`,
                        {
                            headers: {
                                'Authorization': 'Basic vertiges'
                            }
                        })
                        .then(res => {
                            if (res.ok)
                                this.log('info', `succès: ${_next}`)
                            else
                                this.log('error', `erreur établissement séquence: ${res.status}`)
                            this.next = _next
                        })
                } else {
                    this.log('error', `séquence invalide: ${_next}`)
                }

            }
        },
        mounted: function () {
            this.log('info', 'prêt')

            fetch('/get-all').then(res => {
                return res.json()
            }).then(data => {
                this.sequences = data.sequences
                this.next = data.next
                this.clients = data.clients
            })
        }
    })
}