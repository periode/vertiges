const all_messages = {
    "identity": {
        "name": "identity",
        "messages": [
            { type: 'txt', msg: "un jour on m'a demandé de me définir", sender: "georges"},
            { type: 'txt', msg: "quelle connerie", sender: "georges"},
            { type: 'txt', msg: "je suis", sender: "georges"},
            { type: 'txt', msg: "jsais pas", sender: "georges"},
            { type: 'txt', msg: "je suis", sender: "georges"},
            { type: "mp3", msg: "", src: './media/03-pnl-chang.mp3', sender: "georges"},
            { type: 'txt', msg: "je suis farid ayelem rahmouni, chorégraphe queer", sender: "georges"}
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
    }
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