class Player{

    constructor(options){
        this.world = Rebel.app.world;
        this.allowedToJump = true;
        this.setup();
        this.buildPlayer();
    }

    setup(){
        this.cursors = this.world.input.keyboard.createCursorKeys();
    }

    buildPlayer(){
        this.me = this.world.add.sprite(32, 150, 'dude');
        this.me.anchor.setTo(0.5, 0.5);
        this.world.physics.arcade.enable(this.me);
        this.me.body.bounce.y = 0;
        this.me.body.gravity.y = 600;
        this.me.body.colliderWorldBounds = true;

        this.me.animations.add('left', [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29.30,31], 40, true);
        this.me.animations.add('right', [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29.30,31], 40, true);
        this.me.animations.add('up', [32,33,34], 30, false);
        this.me.animations.add('down', [35,36], 30, false);

    }

    update(){
        this.world.physics.arcade.collide(this.me, Rebel.app.platforms);
        this.me.body.velocity.x = 0;

        if (this.cursors.up.isUp) {
            this.allowedToJump = true;
        }

        if (this.cursors.left.isDown){
            //  Move to the left
            this.me.scale.setTo(1,1);
            this.me.body.velocity.x = -200;

            this.me.animations.play('left');
        } else if (this.cursors.right.isDown){
            this.me.scale.setTo(-1,1);
            //  Move to the right
            this.me.body.velocity.x = 200;

            this.me.animations.play('right');
        } else {
            //  Stand still
            this.me.animations.stop();

            this.me.frame = 0;
        }

        if ( !this.me.body.touching.down && this.me.body.velocity.y < 0   )
            this.me.animations.play('down');

        if ( !this.me.body.touching.down && this.me.body.velocity.y > 0 )
            this.me.animations.play('up');



        console.log(this.me.body.touching.down && this.me.body.velocity.y === 0 );


        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.me.body.touching.down && this.allowedToJump )
        {
            this.me.body.velocity.y = -450;
        }
    }
}