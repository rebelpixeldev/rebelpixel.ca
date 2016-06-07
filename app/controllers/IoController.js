'use strict';
class IoController{

    constructor(app){
        this.app    = app;
        this.http   = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.http);

        this.sockets = {};

        this.setupEvents();

        this.http.listen(3001, function () {
            console.log('socket.io listening on 3001');
        })
    }

    getRandomColor(){
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }

    setupEvents(){
        let self = this;
        this.io.on('connection', function(socket){
            //self.sockets.push(socket);
            socket.color = self.getRandomColor();

            socket.emit('SET_COLOR', socket.color);

            Object.keys(self.sockets).forEach( s => {
                self.sockets[s].emit('CONNECT', socket.id, socket.color);
            });

            socket.emit('CONNECT_ALL', Object.keys(self.sockets).reduce((ret, s) => {
                console.log(s);
                ret.push({
                    id : s,
                    color : self.sockets[s].color
                });
                return ret;
            }, []));


            self.sockets[socket.id] = socket;

            socket.on('USER_MOVE', function (data) {
                Object.keys(self.sockets).forEach( s => {
                    self.sockets[s].emit('USER_MOVE', {
                        id : data.id,
                        data : data.line
                    });
                })
            });
            
            socket.on('disconnect', function () {
                delete self.sockets[socket.id];
                Object.keys(self.sockets).forEach(s =>{
                    self.sockets[s].emit('USER_DISCONNECT', {id: socket.id});
                })
            })

        })
    }


}

module.exports = IoController;