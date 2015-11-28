var BossWeapon = {};

BossWeapon.ScatterShot = function (game) {

       Phaser.Group.call(this, game, game.world, 'boss scatter Shot', false, true, Phaser.Physics.ARCADE);

       this.nextFire = 0;
       this.bulletSpeed = 300;
       this.fireRate = 20;

       for (var i = 0; i < 100; i++)
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

   BossWeapon.RingShot = function (game) {

          Phaser.Group.call(this, game, game.world, 'boss ring shot', false, true, Phaser.Physics.ARCADE);

          this.nextFire = 0;
          this.bulletSpeed = 300;
          this.fireRate = 700;

          for (var i = 0; i < 5000; i++)
          {
              this.add(new BossBullet(game, 'bullet5'), true);
          }

          return this;

      };

      BossWeapon.RingShot.prototype = Object.create(Phaser.Group.prototype);
      BossWeapon.RingShot.prototype.constructor = BossWeapon.RingShot;

      BossWeapon.RingShot.prototype.fire = function (source) {

          if (this.game.time.time < this.nextFire) { return; }

          var y = source.y + 16;
          var x = source.x + 5;
          var ang = this.game.rnd.between(30,10);

          for (var n = 0; n < 28; n ++)
          {
            this.getFirstExists(false).fire(x, y, ang, this.bulletSpeed, 0, 0);
            ang += 5;
          }

          this.nextFire = this.game.time.time + this.fireRate;

      };

      BossWeapon.SweepingShot = function (game) {

             Phaser.Group.call(this, game, game.world, 'boss sweeping Shot', false, true, Phaser.Physics.ARCADE);

             this.nextFire = 0;
             this.bulletSpeed = 300;
             this.fireRate = 10;

             this.ang = 170;
             this.diff = -2;
             this.count = 0;
             this.shoot = true;

             for (var i = 0; i < 300; i++)
             {
                 this.add(new BossBullet(game, 'bullet5'), true);
                 //this.game.physics.arcade.enable(BossBullet);
             }

             return this;

         };

         BossWeapon.SweepingShot.prototype = Object.create(Phaser.Group.prototype);
         BossWeapon.SweepingShot.prototype.constructor = BossWeapon.SweepingShot;

         BossWeapon.SweepingShot.prototype.fire = function (source) {
           this.count ++;

             if (this.game.time.time < this.nextFire) { return; }

             var y = source.y + 16;
             var x = source.x + 5;
             //var x = (source.x + source.width / 2) + this.game.rnd.between(-7, 7) - 20;

            if(this.shoot == true){
             this.getFirstExists(false).fire(x, y, this.ang, this.bulletSpeed, 0, 0);
            }
             this.ang += this.diff;
             if(this.ang > 170 || this.ang < 10){
               this.diff = this.diff * -1;
             }
             if(this.count > 60 && this.shoot == true){
               this.shoot = false;
               this.count = 0;
             }

             if(this.count > 10 && this.shoot == false){
               this.shoot = true;
               this.count = 0;
             }



             this.nextFire = this.game.time.time + this.fireRate;

         };
