class Player extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, leftKey, rightKey, jumpKey, playerSpeed, acceleration, drag, jumpVelocity) {
        super(scene, x, y, texture, frame);

        this.left = leftKey;
        this.right = rightKey;
        this.jump = jumpKey;
        this.playerSpeed = playerSpeed;
        this.JUMP_VELOCITY = jumpVelocity;
        this.DRAG = drag;
        this.ACCELERATION = acceleration;


        scene.add.existing(this);
        //this.setCollideWorldBounds(true);

        return this;
    }

    update() {
        this.setMaxVelocity(500,1000);
        //console.log(this.body.velocity.x)
       if(this.left.isDown) {
            if (this.body.velocity.x >= 50){
                this.setVelocityX(-50);
            }
            this.setAccelerationX(-this.ACCELERATION);
            
            this.resetFlip();
            this.anims.play('walk', true);

           /*  this.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);
            this.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (this.body.blocked.down) {

                this.walking.start();

            } */

        } else if(this.right.isDown) {
            if (this.body.velocity.x <= -50){
                this.setVelocityX(50);
            }
             this.setAccelerationX(this.ACCELERATION);

            this.setFlip(true, false);
            this.anims.play('walk', true);

        } else {
             this.setAccelerationX(0);
        this.setDragX(this.DRAG);

            this.anims.play('idle');
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            this.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(this.jump)) {
              this.setVelocityY(this.JUMP_VELOCITY);

        }
    }

}