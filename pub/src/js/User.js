class User{

    constructor(context, id, color='#000000', isMe=false){
        this.context        = context;
        this.io             = Rebel.getIo();
        this.id             = id;
        this.color          = color;
        this.isMe           = isMe;
        this.maxLineLength  = 100;
        this.maxLineLife    = 350;
        this.idle           = new Idle(this.context, this.color);
        this.line           = [];

        this.draw();
        this.setupEvents();
    }

    setupEvents(){
        if ( this.isMe ){
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
        } else {
            Rebel.getIo().on(Rebel.getEvents().USER_MOVE, (data) => {
                if(this.id === data.id ) {
                    this.line = data.data;
                    this.idle.setPosition(data.data[data.data.length-1].x, data.data[data.data.length-1].y);
                }
            });
        }
    }

    draw(){
        let renderTime = new Date().getTime();
        if ( this.line.length === 1 ){
            this.idle.show();
        } else {
            this.idle.hide();
            this.line.forEach((data, i) => {
                if ((data.time + this.maxLineLife) < renderTime) {
                    this.line.splice(0, i);
                    return false;
                }

                let next = typeof this.line[i + 1] === 'undefined' ? i : i + 1;

                this.context.beginPath();
                this.context.moveTo(data.x, data.y);
                this.context.lineTo(this.line[next].x, this.line[next].y);
                this.context.lineCap = 'round';
                this.context.lineJoin = 'round';
                this.context.strokeStyle = this.color;
                this.context.lineWidth = (renderTime - data.time) / 20;
                this.context.shadowColor = 'rgba(0, 0, 0, 0)';
                this.context.stroke();
            });
        }
    }

    render(){
        if ( this.line.length > this.maxLineLength )
            this.line.splice(0,this.maxLineLength);
        this.idle.render();
        this.draw();
    }

    destory(){
        this.idle = [];
    }

    onMouseMove(evt){
        let pos = {
            time    : new Date().getTime(),
            x       : evt.clientX,
            y       : evt.clientY
        };

        this.line.push(pos);
        this.idle.setPosition(pos.x, pos.y);

        Rebel.getIo().emit(Rebel.getEvents().USER_MOVE, {id: this.id, line:this.line});
    }

}