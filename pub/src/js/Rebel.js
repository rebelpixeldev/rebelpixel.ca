class Rebel{

    constructor(){
        Rebel.getIo();
        this.background = new Background();
        this.setupEvents();
    }

    setupEvents(){
        window.addEventListener('hashchange', evt => {
            console.log('CHANGEd' , evt);
        })
    }

    static getEvents(){
        return {
            CONNECT     : 'CONNECT',
            CONNECT_ALL : 'CONNECT_ALL',
            DISCONNECT  : 'USER_DISCONNECT',
            USER_MOVE   : 'USER_MOVE',
            SET_COLOR   : 'SET_COLOR'
        }
    }

    static getIo(){
        if ( typeof this.io === 'undefined')
            this.io = io.connect('http://localhost:3001');
        return this.io;
    }
}