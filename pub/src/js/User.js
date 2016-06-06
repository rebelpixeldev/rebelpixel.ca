class User{

    constructor(context, isMe=false){
        this.context        = context;
        this.maxLineLength  = 100;
        this.maxLineLife    = 350;
        this.line = [];
        this.draw();

        if ( isMe ){
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
        }
    }

    draw(){
        let renderTime = new Date().getTime();
        //this.context.beginPath();
        //this.context.fillStyle = 'rgb(0, 0, 0)';
        //this.context.lineCap = 'round';
        //this.context.lineJoin = 'round';
        //this.context.lineWidth = 20;
        //this.context.shadowBlur = 30;
        ////this.context.lineWidth = (renderTime - data.time) / 20;
        ////this.context.shadowBlur = (renderTime - data.time) / 30;
        //this.context.shadowColor = 'rgb(0, 0, 0)';
        this.line.forEach((data, i) => {
            if ( (data.time + this.maxLineLife) < renderTime ){
                this.line.splice(0,i);
                return false;
            }
            let next = typeof this.line[i+1] === 'undefined' ? i : i+1;

            //this.context

            //if ( i === 0 )
            //    this.context.moveTo(data.x, data.y);
            //else
            //    this.context.lineTo(data.x, data.y);


            //this.context.beginPath();
            //this.context.rect(data.x,data.y, (data.x - this.line[next].x) ,5);
            //this.context.fill();

            this.context.beginPath();
            this.context.moveTo(data.x, data.y);
            this.context.lineTo(this.line[next].x, this.line[next].y);
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.context.lineWidth = (renderTime - data.time) / 20;
            //this.context.shadowBlur = (renderTime - data.time) / 30;
            //this.context.shadowColor = 'rgb(0, 0, 0)';
            this.context.stroke();


        });
    }

    render(){
        if ( this.line.length > this.maxLineLength )
            this.line.splice(0,this.maxLineLength);
        this.draw();
    }

    onMouseMove(evt){

        this.line.push({
            time    : new Date().getTime(),
            x       : evt.clientX,
            y       : evt.clientY
        });

        Rebel.getIo().emit(Rebel.getEvents().USER_MOVE, this.line);
    }

}