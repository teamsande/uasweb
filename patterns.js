var BossWeapon = {};

BossWeapon.ScatterShot = function (game) {

       Phaser.Group.call(this, game, game.world, 'boss scatter Shot', false, true, Phaser.Physics.ARCADE);

       this.nextFire = 0;
       this.bulletSpeed = 300;
       this.fireRate = 20;

       for (var i = 0; i < 400; i++)
       {
           this.add(new BossBullet(game, 'bullet5'), true);
           //this.game.physics.arcade.enable(BossBullet);
       }

       return this;

   };

   BossWeapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
   BossWeapon.ScatterShot.prototype.constructor = BossWeapon.ScatterShot;

   BossWeapon.ScatterShot.prototype.fire = function (source) {

       if (this.game.time.time < this.nextFire) { return; }

       var y = source.y + 16;
       var x = source.x + 5;
       //var x = (source.x + source.width / 2) + this.game.rnd.between(-7, 7) - 20;
       var ang = this.game.rnd.between(170,10);

       this.getFirstExists(false).fire(x, y, ang, this.bulletSpeed, 0, 0);

       this.nextFire = this.game.time.time + this.fireRate;

   };
