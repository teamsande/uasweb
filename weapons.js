var Weapon = {};

Weapon.ScatterShot = function (game) {

       Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

       this.nextFire = 0;
       this.bulletSpeed = 500;
       this.fireRate = 100;
       this.bullets = game.add.physicsGroup();
       this.currentBullet = 0;
       this.maxBullet = 100;

       for (var i = 0; i < this.maxBullet; i++)
       {
           this.bullets.add(new Bullet(game, 'bullet'), true);
       }

       return this;

   };

   Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
   Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

   Weapon.ScatterShot.prototype.fire = function (source) {

       if (this.game.time.time < this.nextFire) { return; }

       var y = source.y - 5;
       var x = source.x + 5;
       //var x = (source.x + source.width / 2) + this.game.rnd.between(-7, 7) - 20;
       var ang = this.game.rnd.between(265,275);
       var tinter;

       if (damage == 1){
         tinter = 0xffff00;
       }
       if (damage == 2){
         tinter = 0x00ff00;
       }
       if (damage == 3){
         tinter = 0xff00ff;
       }
       if (damage > 3){
         tinter = 0x0000ff;
       }

       this.bullets.children[this.currentBullet].fire(x, y, ang, this.bulletSpeed, 0, 0, tinter);
       this.currentBullet ++;
       if (this.currentBullet >= this.maxBullet){
         this.currentBullet = 0;
       }

       this.nextFire = this.game.time.time + this.fireRate;

   };
