class App{

    constructor(){
        this.createWorld();
        this.players = {};

    }

    createWorld(){
        this.world = new Phaser.Game(window.innerWidth, 600, Phaser.AUTO, '',
            { preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this) });
    }

    preload(){
        window.Rebel.assets.preload.images.forEach(asset => {
            this.world.load.image(asset.split('/').pop().split('.')[0], asset);
        });
        window.Rebel.assets.preload.sprites.forEach(asset => {
            this.world.load.spritesheet(asset.split('/').pop().split('.')[0], asset, 64, 128);
        });
    }

    create(){
        this.world.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.add.sprite(0, 0, 'sky');

          //The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.world.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        let ground = this.platforms.create(0, this.world.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it

        //  Now let's create two ledges
        let ledge = this.platforms.create(400, 400, 'ground');

        ledge = this.platforms.create(-150, 250, 'ground');

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);

        this.registerPlayer();
    }

    update(){

        Object.keys(this.players).forEach(player =>{
            this.players[player].update();
        });
    }

    registerPlayer(){
        this.players[new Date().getTime()] = new Player();
    }


}