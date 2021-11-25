let app

let init = () => {
    app = new Vue({
        data:{

        },
        methods:{

        },
        mounted: function() {
            fetch('/status')
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
            })
        }
    })
}


//-- data
//-- -- quelle séquence est la suivante?