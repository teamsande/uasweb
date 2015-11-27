
var BossBullet = function (game, key) {

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

        this.tracking = false;
        this.scaleSpeed = 0;

    };

       BossBullet.prototype = Object.create(Phaser.Sprite.prototype);
   BossBullet.prototype.constructor = BossBullet;

   BossBullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

       gx = gx || 0;
       gy = gy || 0;

       this.reset(x, y);
       this.scale.set(3);

       this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

       this.angle = angle;

       this.body.gravity.set(gx, gy);

   };

   BossBullet.prototype.update = function () {

      //this.game.physics.arcade.collide(this,PhaserGame.player,PhaserGame.player.kill())

       if (this.tracking)
       {
           this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
       }

       if (this.scaleSpeed > 0)
       {
           this.scale.x += this.scaleSpeed;
           this.scale.y += this.scaleSpeed;
       }

   };
