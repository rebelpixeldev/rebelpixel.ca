class Idle{

    constructor(context, color='#000'){
        this.color              = color;
        this.context            = context;
        this.visibility         = false;
        this.pos                = {x:0, y:0};
        this.defaultDiameter    = 10;
        this.maxDiameter        = 15;
        this.minDiameter        = 10;
        this.growing            = true;
        this.growIncrement      = 0.15;
        this.diameter           = this.defaultDiameter;
    }

    render(){
        if ( this.visibility ) {

            if ( this.growing ){
                if ( this.diameter > this.maxDiameter ){
                    this.growing = false;
                    this.diameter -= this.growIncrement;
                } else {
                    this.diameter += this.growIncrement;
                }
            } else {
                if ( this.diameter < this.minDiameter ){
                    this.growing = true;
                    this.diameter += this.growIncrement;
                } else {
                    this.diameter -= this.growIncrement;
                }
            }

            this.context.beginPath();
            this.context.arc(this.pos.x, this.pos.y, this.diameter, 0, Math.PI * 2, true);
            this.context.fillStyle = this.color;
            this.context.shadowColor = this.color;
            this.context.shadowBlur = 20;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.fill();
        } else {
            this.diameter = this.defaultDiameter;
        }
    }

    show(){this.visibility = true;}
    hide(){this.visibility = false;}

    setPosition(x, y){
        this.pos = {
            x,
            y
        }
    }

}