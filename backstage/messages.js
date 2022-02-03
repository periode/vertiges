const all_messages = {
    "introduction": {
        "name": "introduction",
        "allowed": true,
        "audio": "Just (After Song of Songs)",
        "messages": [
            { type: 'txt', msg: "je me souvient de l'histoire de ce mec qui tombe d'un immeuble de 50 étages. Qu'au fur et à mesure il se disait que l'importance c'était pas la chute...", sender: "performer"},
            { type: 'txt', msg: "mais l'atterissage.", sender: "performer"},
            { type: 'txt', msg: "j'y ai cru longtemps", sender: "performer"},
            { type: 'txt', msg: "mais si en fait l'important c'est la chute.", sender: "performer"},
            { type: 'txt', msg: "qu'à force de focaliser sur le but, la destination, la fin, on en oubliait les moments d'existence.", sender: "performer"},
            // { type: "mp3", msg: "", src: './media/cendres.mp3', sender: "performer"},
            { type: 'txt', msg: "on nous fait croire que tant qu'on survit à la chute, on s'en sortira.", sender: "performer"},
            { type: 'txt', msg: "sans penser aux trajectoires et aux embûches d'un quotidien sclérosé.", sender: "performer"},
            { type: 'txt', msg: "la chute comme métaphore d'une vie sans expérience, qui fonce à toute vitesse", sender: "performer"},
            { type: 'txt', msg: "mais pas du tout.", sender: "performer"},
            { type: 'txt', msg: "tout est dans la chute", sender: "performer"},
            { type: 'txt', msg: "la construction des croyances et des rêves", sender: "performer"},
            { type: 'txt', msg: "et puis leur ébranlement", sender: "performer"},
            { type: 'txt', msg: "et leur reconstruction.", sender: "performer"},
            { type: 'txt', msg: "mon histoire, c'est celle d'un gamin qui rêve d'équité. parce que le monde qu'on lui vend est loin d'être celui qu'il ressent.", sender: "performer"},
            { type: 'txt', msg: "qu'il y a un truc bizarre par rapport à la différence.", sender: "performer"},
            { type: 'txt', msg: "que, pour certaines personnes, s'accepter passe autant par soi que par l'autre", sender: "performer"},
            { type: 'txt', msg: "que si les autres veulent pas accepter, le faire soi-même c'est", sender: "performer"},
            { type: 'txt', msg: "plus compliqué", sender: "performer"},
            { type: 'txt', msg: "alors on fait comme on peut", sender: "performer"},
            { type: 'txt', msg: "au cours de cette chute", sender: "performer"},
            { type: 'txt', msg: "bienvenue. à vous.", sender: "performer"},
            { type: 'txt', msg: "je suis Farid Ayelem Rahmouni", sender: "performer"},
            { type: 'txt', msg: "et ici et maintenant, nous allons", sender: "performer"},
        ],
        "replies": [
            {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                id: "silence",
                txt: "tu te sens investi ?",
                reply: "faut prendre l'habitude de se taire."
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "dominant ou dominé ?",
                reply: "l'un et l'autre, c'est un jeu d'équilbre de ouf."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "famille": { //-- YES roue cyr
        "allowed": true,
        "name": "famille",
        "messages": [
            { type: 'txt', msg: "je me souviens d'une histoire qui commence par:", sender: "performer"},
            { type: 'txt', msg: "Awlidi", sender: "performer"},
            { type: 'txt', msg: "\"c'est le métier qui rentre\"", sender: "performer"},
            { type: 'txt', msg: "un mantra qui résonne après chaque chute.", sender: "performer"},
            { type: 'txt', msg: "Moi, je prenais ça comme un encouragement à se relever. À pleurer, serrer les dents, bloquer la mâchoire", sender: "performer"},
            { type: 'txt', msg: "et avancer.", sender: "performer"},
            { type: 'txt', msg: "parce qu'on ne décolle qu'une fois à terre", sender: "performer"},
            { type: 'txt', msg: "avec une sorte de sourire de sisyphe", sender: "performer"},
        ],
        "replies": [
            {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "arrestation": { //-- nope
        "name": "arrestation",
        "allowed": false,
        "messages": [
            { type: 'txt', msg: "il y a différentes manières de contraindre quelqu'un", sender: "performer"},
            { type: 'txt', msg: "les attentes des gens qui t'entourent", sender: "performer"},
            { type: 'txt', msg: "les attentes des gens qui t'aiment", sender: "performer"},
            { type: 'txt', msg: "tes attentes à toi", sender: "performer"},
            { type: 'txt', msg: "des sortes de liens, en fait", sender: "performer"},
            { type: 'txt', msg: "et puis d'autres types de liens", sender: "performer"},
            { type: 'txt', msg: "genre des menottes", sender: "performer"},
            { type: 'txt', msg: "le genre de contrainte qui te plaquent contre le mur", sender: "performer"},
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                        },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                id: "silence",
                txt: "...",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "prolétaire": { //-- YES
        "name": "prolétaire",
        "allowed": true,
        "audio": "November",
        "messages": [
            { type: 'txt', msg: "parfois je me fais mal", sender: "performer"},
            { type: 'txt', msg: "c'est marrant, plus tu vieillis, plus tu te fais mal quand tu fais un faux-mouvement", sender: "performer"},
            { type: 'txt', msg: "Dans la famille on parle jamais de ça", sender: "performer"},
            { type: 'txt', msg: "j'imagine qu'à l'usine, ils avaient toujours mal, eux.", sender: "performer"},
            { type: 'txt', msg: "leur métier dans la chair", sender: "performer"},
            { type: 'txt', msg: "que la répétition chorégraphique de mon corps n'a aucun rapport avec l'aliénation du leur", sender: "performer"},
            { type: 'txt', msg: "je l'ai échappée belle", sender: "performer"},
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
               id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "embrassade": { //-- YES jumeler avec seduction
        "name": "embrassade",
        "allowed": true,
        "audio": "Whole Lot Money",
        "messages": [
            { type: 'txt', msg: "tes mains sur ma peau", sender: "performer"},
            { type: 'txt', msg: "mes levrès sur tes lèvres", sender: "performer"},
            { type: 'txt', msg: "on se sussure des trucs à l'oreille", sender: "performer"},
            { type: 'txt', msg: "proche, on s'entend respirer", sender: "performer"},
            { type: 'txt', msg: "et puis la main sur le bassin", sender: "performer"},
            { type: 'txt', msg: "ferme, la main", sender: "performer"},
            { type: 'txt', msg: "qui ne laisse pas ton bassin se dégager", sender: "performer"},
            { type: 'txt', msg: "y'a ceux qui aiment ça", sender: "performer"},
            { type: 'txt', msg: "y'a ceux qui trouvent ça bizarre", sender: "performer"},
            { type: 'txt', msg: "Ça nous arrive à tous de jouer ce jeu de con", sender: "performer"},
            { type: 'txt', msg: "des fois j'ai juste besoin de me sentir comprimer", sender: "performer"}
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "silence": { //-- YES danse pop lock
        "name": "silence",
        "allowed": true,
        "audio": "Futo",
        "messages": [
            { type: 'txt', msg: "quand t'es gamin t'as envie de bouger", sender: "performer"},
            { type: 'txt', msg: "mais t'as pas toujours le droit", sender: "performer"},
            { type: 'txt', msg: "quand t'es adulte", sender: "performer"},
            { type: 'txt', msg: "pareil", sender: "performer"},
            { type: 'txt', msg: "sauf que t'as plus forcément envie", sender: "performer"},
            { type: 'txt', msg: "et que même si t'as envie", sender: "performer"},
            { type: 'txt', msg: "t'es pas complètement sûr d'où sont les limites", sender: "performer"},
            { type: 'txt', msg: "ça dépend d'où, de qui, de quand", sender: "performer"},
            { type: 'txt', msg: "c'est jamais toi qui décide", sender: "performer"},
            { type: 'txt', msg: "même pour toi, pour les tiens", sender: "performer"},
            { type: 'txt', msg: "mais donc bon", sender: "performer"},
            { type: 'txt', msg: "t'avance", sender: "performer"},
            { type: 'txt', msg: "un peu à tâtons", sender: "performer"},
            { type: 'txt', msg: "un peu par saccades", sender: "performer"},
            { type: 'txt', msg: "Ça fout quand même bien la rage", sender: "performer"}   
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "oriental": {//-- YES derviche
        "name": "oriental",
        "allowed": true,
        "audio": "Rabbi",
        "messages": [
            { type: 'txt', msg: "même dans la danse, on a des catégories", sender: "performer"},
            { type: 'txt', msg: "moi aussi", sender: "performer"},
            { type: 'txt', msg: "mon corps a des catégories", sender: "performer"},
            { type: 'txt', msg: "Fallait rentrer dans le moule", sender: "performer"},
            { type: 'txt', msg: "autant que dire que je fais pas de ballet", sender: "performer"},
            { type: 'txt', msg: "enfin, si, j'en ai fait, du ballet", sender: "performer"},
            { type: 'txt', msg: "mais tu vois ce que je veux dire", sender: "performer"},
            { type: 'txt', msg: "quand t'es un touche à tout, c'est chaud de se sentir légitime", sender: "performer"},
            { type: 'txt', msg: "souvent imposteur", sender: "performer"},
            { type: 'txt', msg: "jte jure*", sender: "performer"},
            { type: 'txt', msg: "Aujourd'hui j'ai envie de tout mixer", sender: "performer"},
            { type: 'txt', msg: "J'men Balek", sender: "performer"}
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "extase": { //-- YES danse verticale dans la structure, puis enchaine direct sur proletaire
        "name": "extase",
        "allowed": false,
        "messages": [
            { type: 'txt', msg: "Y'a quand même un truc jouissif à contrer l'adversité", sender: "performer"},
            { type: 'txt', msg: "quand tu captes que ça va être compliqué, mais que tu trouves des solutions", sender: "performer"},
            { type: 'txt', msg: "C'est un truc un peu maso, c'est vrai", sender: "performer"},
            { type: 'txt', msg: "C'est libérateur quand dans la douleur et la contrainte", sender: "performer"},
            { type: 'txt', msg: "tu trouves tes réponses", sender: "performer"},
            { type: 'txt', msg: "le kiff absolu", sender: "performer"},
            { type: 'txt', msg: "l'extase ", sender: "performer"},
            { type: 'txt', msg: "tu passes de l'objet au sujet", sender: "performer"}
        ],
        "replies": [
            {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "combat": { //-- pas certain
        "name": "combat",
        "allowed": false,
        "messages": [
            { type: 'txt', msg: "J'aime pas me battre, mais je sais cogner", sender: "performer"},
            { type: 'txt', msg: "jamais j'attaque", sender: "performer"},
            { type: 'txt', msg: "j'esquive, je fuis", sender: "performer"},
            { type: 'txt', msg: "parceque tu sais que si tu te défend, ça va te retomber dessus", sender: "performer"},
            { type: 'txt', msg: "alors t'apprends à être mobile,", sender: "performer"},
            { type: 'txt', msg: "c'est stylé de faire du Parkour maintenant", sender: "performer"},
            { type: 'txt', msg: "de faire de le YAMAKASI", sender: "performer"},
            { type: 'txt', msg: "quand j'étais gosse c'etait surtout le luxe des plus sportif,", sender: "performer"},
            { type: 'txt', msg: "pour éviter les embrouilles, echapper aux flics", sender: "performer"},
            { type: 'txt', msg: "même adulte quand j'arrive quelque part, je repère toujours les endroits inaccessible", sender: "performer"},
            { type: 'txt', msg: "au cas ou je dois me sauver", sender: "performer"}
        ],
        "replies": [
            {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
                
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
            }
        ]
    },
    "séduction": { //-- pas sur
        "name": "séduction",
        "allowed": false,
        "messages": [
            { type: 'txt', msg: "c'est quand même plus simple d'être gay à paris qu'en haute-savoie", sender: "performer"},
            { type: 'txt', msg: "enfin", sender: "performer"},
            { type: 'txt', msg: "\"simple\"", sender: "performer"},
            { type: 'txt', msg: "ça met des messages", sender: "performer"},
            { type: 'txt', msg: "des clins d'oeils", sender: "performer"},
            { type: 'txt', msg: "des gestes", sender: "performer"},
            { type: 'txt', msg: "t'as envie de faire ça avec tout le monde", sender: "performer"},
            { type: 'txt', msg: "enfin, moi j'ai envie de faire ça avec tout le monde", sender: "performer"},
            { type: 'txt', msg: "même si c'est pas toujours très clean", sender: "performer"},
            { type: 'txt', msg: "genre pourquoi", sender: "performer"},
            { type: 'txt', msg: "et pourquoi pas?", sender: "performer"},
        ],
        "replies": [
                        {
                id: "famille",
                txt: "farid Ayelem ?",
                reply: "ouais ça vient de haute-savoie"
            },
            {
                id: "prolétaire",
                txt: "chorégraphe ?",
                reply: "à la base j'étais plutôt pas censé faire ça"
            },
            {
                id: "embrassade",
                txt: "ca va ?",
                reply: "un peu seul en ce moment"
            },
            {
                id: "arrestation",
                txt: "t'as jamais eu de problème ?",
                reply: "si, une fois je me suis fait plaquer"
            },
            {
                 id: "silence",
                txt: "faut prendre l'habitude de se taire.",
                reply: "exactement"
            },
            {
                id: "oriental",
                txt: "et tes origines ?",
                reply: "tu veux dire mes racines ?"
            },
            {
                id: "séduction",
                txt: "t'es pas mal, tu me plais bien.",
                reply: "tu trouves ?"
            },
            {
                id: "extase",
                txt: "t'as des passions ?",
                reply: "ouais, la nuit, je m'amuse."
            },
            {
                id: "combat",
                txt: "ça crée des problèmes, tout ça.",
                reply: "crois-moi, je sais."
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
