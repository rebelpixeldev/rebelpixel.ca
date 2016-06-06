class Background{

    constructor(){
        this.canvas = document.getElementById('background');
        this.context = this.canvas.getContext('2d');
        this.width = window.innerWidth || document.body.clientWidth;
        this.height = window.innerHeight || document.body.clientHeight;

        console.log(this.width);

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.users = [];

        this.users.push(new User(this.context, true));

        window.requestAnimationFrame(this.render.bind(this));

        //document.addEventListener('keydown', (evt) =>{
        //    console.log('HI');
        //    debugger;
        //})
    }



    render(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.users.forEach( u => u.render.call(u));

        window.requestAnimationFrame(this.render.bind(this));
    }

}