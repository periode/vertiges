const all_messages = {
    "identité": {
        "name": "identité",
        "messages": [
            { type: 'txt', msg: "un jour on m'a demandé de me définir", sender: "performer"},
            { type: 'txt', msg: "quelle connerie", sender: "performer"},
            { type: 'txt', msg: "je suis", sender: "performer"},
            { type: 'txt', msg: "jsais pas", sender: "performer"},
            { type: 'txt', msg: "je suis", sender: "performer"},
            { type: "mp3", msg: "", src: './media/cendres.mp3', sender: "performer"},
            { type: 'txt', msg: "je suis farid ayelem rahmouni, chorégraphe queer", sender: "performer"}
        ],
        "replies": [
            {
                id: "race",
                txt: "farid ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "class",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "gender",
                txt: "queer ?",
                reply: "tu crois ? on dirait pas pourtant"
            },
            {
                id: "police",
                txt: "tu t'es pas fait casser la gueule?",
                reply: "ouais, si, une fois je me suis fait plaquer"
            }
        ]
    },
    "race": {
        "name": "race",
        "messages": [
            { type: 'txt', msg: "sa race 1", sender: "performer"},
            { type: 'txt', msg: "sa race 2", sender: "performer"},
            { type: 'txt', msg: "sa race 3", sender: "performer"},
            { type: 'txt', msg: "sa race 4", sender: "performer"},
            { type: 'txt', msg: "sa race 5", sender: "performer"},
        ],
        "replies": [
            {
                id: "race",
                txt: "farid ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "class",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "gender",
                txt: "queer ?",
                reply: "tu crois ? on dirait pas pourtant"
            },
            {
                id: "police",
                txt: "tu t'es pas fait casser la gueule?",
                reply: "ouais, si, une fois je me suis fait plaquer"
            }
        ]
    },
    "police": {
        "name": "police",
        "messages": [
            { type: 'txt', msg: "sa police 1", sender: "performer"},
            { type: 'txt', msg: "sa police 2", sender: "performer"},
            { type: 'txt', msg: "sa police 3", sender: "performer"},
            { type: 'txt', msg: "sa police 4", sender: "performer"},
            { type: 'txt', msg: "sa police 5", sender: "performer"},
        ],
        "replies": [
            {
                id: "race",
                txt: "farid ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "class",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "gender",
                txt: "queer ?",
                reply: "tu crois ? on dirait pas pourtant"
            },
            {
                id: "police",
                txt: "tu t'es pas fait casser la gueule?",
                reply: "ouais, si, une fois je me suis fait plaquer"
            }
        ]
    },
    "classe": {
        "name": "classe",
        "messages": [
            { type: 'txt', msg: "la classe 1", sender: "performer"},
            { type: 'txt', msg: "la classe 2", sender: "performer"},
            { type: 'txt', msg: "la classe 3", sender: "performer"},
            { type: 'txt', msg: "la classe 4", sender: "performer"},
            { type: 'txt', msg: "la classe 5", sender: "performer"},
        ],
        "replies": [
            {
                id: "race",
                txt: "farid ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "class",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "gender",
                txt: "queer ?",
                reply: "tu crois ? on dirait pas pourtant"
            },
            {
                id: "police",
                txt: "tu t'es pas fait casser la gueule?",
                reply: "ouais, si, une fois je me suis fait plaquer"
            }
        ]
    },
    "genre": {
        "name": "genre",
        "messages": [
            { type: 'txt', msg: "non mais genre 1", sender: "performer"},
            { type: 'txt', msg: "non mais genre 2", sender: "performer"},
            { type: 'txt', msg: "non mais genre 3", sender: "performer"},
            { type: 'txt', msg: "non mais genre 4", sender: "performer"},
            { type: 'txt', msg: "non mais genre 5", sender: "performer"},
        ],
        "replies": [
            {
                id: "race",
                txt: "farid ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "class",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "gender",
                txt: "queer ?",
                reply: "tu crois ? on dirait pas pourtant"
            },
            {
                id: "police",
                txt: "tu t'es pas fait casser la gueule?",
                reply: "ouais, si, une fois je me suis fait plaquer"
            }
        ]
    },
}

let picked = []

module.exports.getAll = () => {
    return all_messages
}

module.exports.setPicked = (_sequence) => {
    if(_sequence == undefined){
        console.error('You need to set a specific sequence!');
        return
    }
    picked.push(_sequence)
    return picked
}

module.exports.pick = (_sequence) => {
    if(_sequence == undefined){
        console.error('You need to pick a specific sequence!');
        return
    }
    let results = []
    let replies = all_messages[_sequence].replies
    let temp = []
    
    if(picked.length < replies.length - 3){
        while(results.length < 3){
            let i = Math.floor(Math.random()*replies.length)
            let reply = replies[i]
            if(!temp.includes(reply.id) && !picked.includes(reply.id)){
                temp.push(reply.id)
                results.push(reply)
            }
        }
    }else{
        while(results.length <= 3){
            let i = Math.floor(Math.random()*replies.length)
            let reply = replies[i]
            if(!picked.includes(reply.id)){
                results.push(reply)
            }
        }
    }


    return {messages: all_messages[_sequence].messages, replies: results}
}