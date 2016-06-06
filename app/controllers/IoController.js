'use strict';
class IoController{

    constructor(app){
        this.app    = app;
        this.http   = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.http);

        this.setupEvents();

        this.http.listen(3001, function () {
            console.log('socket.io listening on 3001');
        })
    }

    setupEvents(){
        this.io.on('connection', function (socket) {
            console.log('A client connected');


            socket.on('USER_MOVE', function (data) {
                console.log(arguments);
            })

        })
    }


}

module.exports = IoController;