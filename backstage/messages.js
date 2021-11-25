const all_messages = {
    "identity": {
        "messages": [
            { txt: "un jour on m'a demandé de me définir", type: "georges" },
            { txt: "quelle connerie", type: "georges" },
            { txt: "je suis", type: "georges" },
            { txt: "jsais pas", type: "georges" },
            { txt: "je suis", type: "georges" },
            { txt: "je suis farid ayelem rahmouni, chorégraphe queer", type: "georges" }
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

module.exports.setPicked = (_sequence) => {
    picked.push(_sequence)
}

module.exports.pick = (_sequence) => {
    let results = []
    let replies = all_messages[_sequence].replies
    
    if(picked.length < replies.length - 3){
        while(results.length < 3){
            let i = Math.floor(Math.random()*replies.length)
            let reply = replies[i]
            if(!picked.includes(reply.id)){
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