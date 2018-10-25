var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        newPost: [],
        userId: '',
        id: '',
        title: '',
        body: '',
        selected: '',
        currentSort:'id',
        currentSortDir:'asc',
        pageSize:100,
        currentPage:1,
        sliderValue:1,
        width: 1
    },
    created(){
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(json=>{
            console.log(json);
            this.posts = json;

        })


    },
    methods:{
        remove : function(post){
            let target = app.posts.filter(function (p) {
                return p.id === post.id;
            })[0];

            app.posts.splice(app.posts.indexOf(target), 1);

        },
        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        },
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.posts.length) this.currentPage++;
        },
        prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
        },
        getFormValues (submitEvent) {

                this.userId = submitEvent.target.elements.userId.value,
                this.id = submitEvent.target.elements.id.value,
                this.title = submitEvent.target.elements.title.value,
                this.body = submitEvent.target.elements.body.value,
            console.log(this.newPostUserId + this.id + this.title + this.body);

            this.posts.push({
                userId: this.userId,
                id: this.id,
                title: this.title,
                body: this.body
            });
            this.newPost = ''


        },


        getSelectValues (submitEvent) {
            this.selected = submitEvent.target.elements.selected.value,
                console.log(this.selected);
        },
        changeWidth(post){


            /* cia turbut buvo galima ir zmoniskai aprasyt */
            this.width = this.sliderValue;
            // console.log(this.width.length);
            //
            let i;
            for (i = 0; i < this.width.length; i++) {
                if(this.width == i++){
                    this.currenPage = this.width;
                    this.pagesize = 10;
                }
                else{
                    this.currentPage = 1;
                    this.pageSize = 120;
                    this.width = 'all';
                }

            }
            // if(this.width == 1){
            //     this.pageSize = 10;
            //     this.currentPage = 1;
            // }
            // else if(this.width == 2){
            //     this.pageSize = 10;
            //     this.currentPage = 2;
            // }
            // else if(this.width == 3){
            //     this.pageSize = 10;
            //     this.currentPage = 3;
            // }
            // else if(this.width == 4){
            //     this.pageSize = 10;
            //     this.currentPage = 4;
            // }
            // else if(this.width == 5){
            //     this.pageSize = 10;
            //     this.currentPage = 5;
            // }
            // else if(this.width == 6){
            //     this.pageSize = 10;
            //     this.currentPage = 6;
            // }
            // else if(this.width == 7){
            //     this.pageSize = 10;
            //     this.currentPage = 7;
            // }
            // else if(this.width == 8){
            //     this.pageSize = 10;
            //     this.currentPage = 8;
            // }
            // else if(this.width == 9){
            //     this.pageSize = 10;
            //     this.currentPage = 9;
            // }
            // else if(this.width == 10){
            //     this.pageSize = 10;
            //     this.currentPage = 10;
            // }
            // else{
            //     this.pageSize = 110;
            //     this.currentPage = 1;
            //     this.width = 'all';
            // }

        },
    },
    computed:{
        sortedPosts:function() {
            return this.posts.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage-1)*this.pageSize;
                let end = this.currentPage*this.pageSize;
                if(index >= start && index < end) return true;
            });
        },
        computedWidth(){

            return this.width;

        },
        computedColor(){

                return `rgba(${this.width},${this.width * 10},${this.width * 1})`


        },



    }
});

