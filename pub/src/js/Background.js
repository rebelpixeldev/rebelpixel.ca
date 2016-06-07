class Background{

    constructor(){
        let self        = this;
        this.canvas     = document.getElementById('background');
        this.context    = this.canvas.getContext('2d');
        this.width      = window.innerWidth || document.body.clientWidth;
        this.height     = window.innerHeight || document.body.clientHeight;


        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.users = {};

        let io = Rebel.getIo();

        io.on(Rebel.getEvents().SET_COLOR, color => {
            self.users[Rebel.getIo().id] = new User(self.context, '/#'+io.id, color,  true);
        });

        window.requestAnimationFrame(this.render.bind(this));

        Rebel.getIo().on(Rebel.getEvents().CONNECT, (socket, color) =>{
            //@TODO figure out why I need '/#' before the ids to get them the same as the server ids.
            this.users[socket] = new User(this.context, socket, color);
        });

        Rebel.getIo().on(Rebel.getEvents().CONNECT_ALL, (sockets) =>{
            //@TODO figure out why I need '/#' before the ids to get them the same as the server ids.
            sockets.forEach(s => {
                this.users[s.id] = new User(this.context, s.id, s.color);
            })
        });

        Rebel.getIo().on(Rebel.getEvents().DISCONNECT, (socket) =>{
            this.users[socket.id].destory();
            delete this.users[socket.id];
        });

    }



    render(){
        this.context.clearRect(0, 0, this.width, this.height);
        Object.keys(this.users).forEach( u => {
            this.users[u].render.call(this.users[u])
        });

        window.requestAnimationFrame(this.render.bind(this));
    }

}