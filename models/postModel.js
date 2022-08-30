class Posts {
        constructor(req) {
                this.Id = req.body;
                this.uname = req.uname;
                this.title = req.title;
                this.content = req.content;
        }
}

module.exports = Posts;
