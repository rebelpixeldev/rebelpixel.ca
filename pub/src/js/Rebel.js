class Rebel{

    constructor(){
        this.background = new Background();
    }

    setupEvents(){

    }

    static getEvents(){
        return {
            USER_MOVE : 'USER_MOVE'
        }
    }

    static getIo(){
        if ( typeof this.io === 'undefined')
            this.io = io.connect('http://localhost:3001');
        return this.io;
    }
}