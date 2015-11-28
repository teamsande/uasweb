var Weapon = {};

Weapon.ScatterShot = function (game) {

       Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

       this.nextFire = 0;
       this.bulletSpeed = 500;
       this.fireRate = 50;

       for (var i = 0; i < 400; i++)
       {
           this.add(new Bullet(game, 'bullet5'), true);
       }

       return this;

   };

   Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
   Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

   Weapon.ScatterShot.prototype.fire = function (source) {

       if (this.game.time.time < this.nextFire) { return; }

       var y = source.y + 16;
       var x = source.x + 5;
       //var x = (source.x + source.width / 2) + this.game.rnd.between(-7, 7) - 20;
       var ang = this.game.rnd.between(265,275);

       this.getFirstExists(false).fire(x, y, ang, this.bulletSpeed, 0, 0);

       this.nextFire = this.game.time.time + this.fireRate;

   };